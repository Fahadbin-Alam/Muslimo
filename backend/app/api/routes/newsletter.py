"""The Muslimo newsletter list.

- Website: POST /newsletter/subscribe saves the email as "pending" and emails a confirm link (double opt-in, so
  nobody can put someone else's email on the list). The link opens site/newsletter.html, which confirms it.
- App: GET/PUT /newsletter/me lets a signed-in grown-up tick "Email me Muslimo news". Kid accounts can't join.
- Every email has an unsubscribe link (site/newsletter.html?unsubscribe=..., which calls POST /newsletter/unsubscribe).
- The owner sees counts and downloads the list from the stats page (X-Admin-Key, like /admin/stats).

Nobody is added just for making an account: an account is not a yes to newsletters.
"""
from __future__ import annotations

import csv
import io
import secrets
from datetime import datetime, timedelta, timezone
from html import escape
from typing import Annotated, Any, Dict, Optional

from fastapi import APIRouter, BackgroundTasks, Depends, Header, HTTPException
from fastapi.responses import Response
from pydantic import BaseModel, EmailStr, Field
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from backend.app.api.deps import DbSession, current_user
from backend.app.api.routes.admin import require_admin
from backend.app.core import brevo
from backend.app.core.config import settings
from backend.app.core.rate_limit import check_rate
from backend.app.core.security import hash_token
from backend.app.models import NewsletterSubscriber, User
from backend.app.service_layer import normalize_email


router = APIRouter(tags=["newsletter"])

LANGUAGES = {"en", "bn", "ur", "ar"}
# Brevo's free plan sends 300 emails a day; keep confirm emails well under that even if a bot finds the form.
CONFIRM_EMAILS_PER_HOUR = 60


class SubscribeInput(BaseModel):
    email: EmailStr
    language: str = "en"
    # The website asks "I am 13 or older" (or a parent signing up with their own email).
    ageConfirmed: bool = False
    # Hidden box people never see; bots fill it in.
    website: str = ""


class TokenInput(BaseModel):
    token: str = Field(min_length=10, max_length=200)


class MeInput(BaseModel):
    subscribed: bool


def _now() -> datetime:
    return datetime.now(timezone.utc)


def _language(value: Optional[str]) -> str:
    return value if value in LANGUAGES else "en"


def _new_token(row: NewsletterSubscriber) -> str:
    token = secrets.token_urlsafe(32)
    row.token_hash = hash_token(token)
    return token


def _find_by_token(db: Session, token: str) -> NewsletterSubscriber:
    row = db.scalar(select(NewsletterSubscriber).where(NewsletterSubscriber.token_hash == hash_token(token)))
    if row is None:
        raise HTTPException(status_code=404, detail="This link is old or wrong.")
    return row


def _site_link(kind: str, token: str) -> str:
    return f"{settings.site_url.rstrip('/')}/newsletter.html?{kind}={token}"


def send_confirm_email(row: NewsletterSubscriber) -> bool:
    """Gives the row a fresh token and emails its confirm link. The caller commits."""
    token = _new_token(row)
    confirm = _site_link("confirm", token)
    unsubscribe = _site_link("unsubscribe", token)
    html = f"""<div style="font-family:Arial,sans-serif;font-size:16px;line-height:1.5;color:#1f2937;max-width:520px">
<h2 style="color:#58a700">Assalamu alaikum!</h2>
<p>Someone (we hope you) asked to get the Muslimo newsletter at this email: a short note now and then with new
lessons, Ramadan and Eid ideas, and app news.</p>
<p><a href="{escape(confirm)}" style="display:inline-block;background:#58cc02;color:#fff;padding:12px 22px;border-radius:12px;text-decoration:none;font-weight:bold">Yes, sign me up</a></p>
<p>If this wasn't you, just ignore this email. You won't hear from us again.</p>
<p style="font-size:13px;color:#6b7280">Muslimo: Learn Islam Daily, by Fahad Alam. <a href="{escape(unsubscribe)}">Unsubscribe</a></p>
</div>"""
    text = (
        "Assalamu alaikum!\n\nSomeone (we hope you) asked to get the Muslimo newsletter at this email.\n\n"
        f"Yes, sign me up: {confirm}\n\nIf this wasn't you, just ignore this email.\n\nUnsubscribe: {unsubscribe}\n"
    )
    sent = brevo.send_email(row.email, "Please confirm your Muslimo newsletter sign-up", html, text, unsubscribe)
    if sent:
        row.confirm_sent_at = _now()
    return sent


def _mark_subscribed(row: NewsletterSubscriber, background: BackgroundTasks) -> None:
    row.status = "subscribed"
    row.confirmed_at = row.confirmed_at or _now()
    row.unsubscribed_at = None
    background.add_task(brevo.add_contact, row.email, row.language)


def _mark_unsubscribed(row: NewsletterSubscriber, background: BackgroundTasks) -> None:
    was_on_list = row.status == "subscribed"
    row.status = "unsubscribed"
    row.unsubscribed_at = _now()
    if was_on_list:
        background.add_task(brevo.remove_contact, row.email)


@router.post("/newsletter/subscribe")
def subscribe(payload: SubscribeInput, db: DbSession) -> Dict[str, Any]:
    # Same answer whatever happened, so the form never tells anyone whether an email is already on the list.
    answer = {"ok": True, "message": "Check your inbox and tap the link to confirm."}
    if payload.website.strip():
        return answer
    if not payload.ageConfirmed:
        raise HTTPException(status_code=422, detail="Please tick the box to say you are 13 or older.")
    email = normalize_email(payload.email)
    check_rate("newsletter-email", email, 3, 60 * 60)

    row = db.scalar(select(NewsletterSubscriber).where(NewsletterSubscriber.email == email))
    if row is not None and row.status == "subscribed":
        return answer
    if row is None:
        row = NewsletterSubscriber(email=email, status="pending", source="website", language=_language(payload.language))
        _new_token(row)
        db.add(row)
    else:
        # Someone who left (or never confirmed) asks again: they confirm again.
        row.status = "pending"
        row.language = _language(payload.language)
    db.flush()
    if brevo.enabled():
        check_rate("newsletter-confirm-emails", "all", CONFIRM_EMAILS_PER_HOUR, 60 * 60)
        send_confirm_email(row)
    db.commit()
    return answer


@router.post("/newsletter/confirm")
def confirm(payload: TokenInput, db: DbSession, background: BackgroundTasks) -> Dict[str, Any]:
    row = _find_by_token(db, payload.token)
    if row.status != "subscribed":
        _mark_subscribed(row, background)
        db.commit()
    return {"ok": True, "status": row.status}


@router.post("/newsletter/unsubscribe")
def unsubscribe(payload: TokenInput, db: DbSession, background: BackgroundTasks) -> Dict[str, Any]:
    row = _find_by_token(db, payload.token)
    if row.status != "unsubscribed":
        _mark_unsubscribed(row, background)
        db.commit()
    return {"ok": True, "status": row.status}


def _row_for_user(db: Session, user: User) -> Optional[NewsletterSubscriber]:
    row = db.scalar(select(NewsletterSubscriber).where(NewsletterSubscriber.user_id == user.id))
    if row is None:
        row = db.scalar(select(NewsletterSubscriber).where(NewsletterSubscriber.email == normalize_email(user.email)))
    return row


def _can_join(user: User) -> bool:
    # Kid accounts never join; Apple and Sign in with Apple "hide my email" relay addresses still work.
    return user.account_role != "child" and "@" in (user.email or "")


@router.get("/newsletter/me")
def my_newsletter(db: DbSession, user: User = Depends(current_user)) -> Dict[str, Any]:
    row = _row_for_user(db, user)
    return {"subscribed": bool(row and row.status == "subscribed"), "canJoin": _can_join(user)}


@router.put("/newsletter/me")
def set_my_newsletter(payload: MeInput, db: DbSession, background: BackgroundTasks, user: User = Depends(current_user)) -> Dict[str, Any]:
    row = _row_for_user(db, user)
    if payload.subscribed:
        if not _can_join(user):
            raise HTTPException(status_code=403, detail="Kid accounts can't join the newsletter.")
        if row is None:
            row = NewsletterSubscriber(email=normalize_email(user.email), source="app", language=_language(user.preferred_language))
            _new_token(row)
            db.add(row)
        row.user_id = user.id
        # Their own signed-in email, ticked by them in the app: that is the confirmation.
        if row.status != "subscribed":
            _mark_subscribed(row, background)
    elif row is not None and row.status != "unsubscribed":
        _mark_unsubscribed(row, background)
    db.commit()
    return {"subscribed": bool(row and row.status == "subscribed"), "canJoin": _can_join(user)}


def forget_newsletter(db: Session, user: User) -> None:
    """Deleting an account also takes its email off the newsletter list (called before the user row goes)."""
    for row in db.scalars(select(NewsletterSubscriber).where(NewsletterSubscriber.user_id == user.id)).all():
        if row.status == "subscribed":
            brevo.remove_contact(row.email)
        db.delete(row)


# ---- Owner only (stats page) ----


@router.get("/admin/newsletter")
def admin_newsletter(db: DbSession, x_admin_key: Annotated[Optional[str], Header()] = None) -> Dict[str, Any]:
    require_admin(x_admin_key)
    counts = dict(db.execute(select(NewsletterSubscriber.status, func.count()).group_by(NewsletterSubscriber.status)).all())
    sources = dict(
        db.execute(
            select(NewsletterSubscriber.source, func.count())
            .where(NewsletterSubscriber.status == "subscribed")
            .group_by(NewsletterSubscriber.source)
        ).all()
    )
    waiting = db.scalar(
        select(func.count()).select_from(NewsletterSubscriber).where(
            NewsletterSubscriber.status == "pending", NewsletterSubscriber.confirm_sent_at.is_(None)
        )
    )
    # Sign-ups that said yes, per day for the last 28 days (by the day they confirmed), for the stats page chart.
    today = _now().date()
    days = [(today - timedelta(days=offset)).isoformat() for offset in range(27, -1, -1)]
    per_day = {day: 0 for day in days}
    for joined in db.scalars(select(NewsletterSubscriber.confirmed_at).where(NewsletterSubscriber.status == "subscribed")).all():
        if joined is not None:
            key = (joined if joined.tzinfo else joined.replace(tzinfo=timezone.utc)).date().isoformat()
            if key in per_day:
                per_day[key] += 1
    return {
        "series": {"days": days, "joined": [per_day[day] for day in days]},
        "subscribed": counts.get("subscribed", 0),
        "pending": counts.get("pending", 0),
        "unsubscribed": counts.get("unsubscribed", 0),
        "fromWebsite": sources.get("website", 0),
        "fromApp": sources.get("app", 0),
        "waitingForConfirmEmail": waiting or 0,
        "emailServiceConnected": brevo.enabled(),
    }


@router.get("/admin/newsletter/export.csv")
def admin_newsletter_export(db: DbSession, x_admin_key: Annotated[Optional[str], Header()] = None) -> Response:
    """Everyone who said yes, ready to import into Brevo (or any email service)."""
    require_admin(x_admin_key)
    rows = db.scalars(
        select(NewsletterSubscriber).where(NewsletterSubscriber.status == "subscribed").order_by(NewsletterSubscriber.id)
    ).all()
    out = io.StringIO()
    writer = csv.writer(out)
    writer.writerow(["EMAIL", "LANGUAGE", "SOURCE", "JOINED"])
    for row in rows:
        joined = row.confirmed_at or row.created_at
        writer.writerow([row.email, row.language, row.source, joined.date().isoformat() if joined else ""])
    return Response(
        out.getvalue(),
        media_type="text/csv",
        headers={"Content-Disposition": 'attachment; filename="muslimo-newsletter.csv"'},
    )


@router.post("/admin/newsletter/send-confirmations")
def admin_send_confirmations(db: DbSession, x_admin_key: Annotated[Optional[str], Header()] = None) -> Dict[str, Any]:
    """Emails the confirm link to website sign-ups that came in before Brevo was connected (up to 200 at a time)."""
    require_admin(x_admin_key)
    if not brevo.enabled():
        raise HTTPException(status_code=409, detail="Connect Brevo first (SIRA_BREVO_API_KEY on Render).")
    rows = db.scalars(
        select(NewsletterSubscriber)
        .where(NewsletterSubscriber.status == "pending", NewsletterSubscriber.confirm_sent_at.is_(None))
        .order_by(NewsletterSubscriber.id)
        .limit(200)
    ).all()
    sent = sum(1 for row in rows if send_confirm_email(row))
    db.commit()
    return {"sent": sent, "tried": len(rows)}


@router.post("/admin/newsletter/sync")
def admin_sync(db: DbSession, x_admin_key: Annotated[Optional[str], Header()] = None) -> Dict[str, Any]:
    """Copies everyone who said yes into the Brevo list (for people who joined before Brevo was connected)."""
    require_admin(x_admin_key)
    if not brevo.enabled():
        raise HTTPException(status_code=409, detail="Connect Brevo first (SIRA_BREVO_API_KEY on Render).")
    rows = db.scalars(select(NewsletterSubscriber).where(NewsletterSubscriber.status == "subscribed")).all()
    copied = sum(1 for row in rows if brevo.add_contact(row.email, row.language))
    return {"copied": copied, "tried": len(rows)}
