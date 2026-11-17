from __future__ import annotations

import uuid

import pytest

from backend.app.core import brevo
from backend.app.core.config import settings
from backend.app.core.security import hash_token
from backend.app.db.session import SessionLocal
from backend.app.models import NewsletterSubscriber, User
from sqlalchemy import select


@pytest.fixture()
def sent(monkeypatch):
    """Pretends Brevo is connected and records what would have gone out."""
    box = {"emails": [], "added": [], "removed": []}
    monkeypatch.setattr(settings, "brevo_api_key", "test-key")
    monkeypatch.setattr(brevo, "send_email", lambda to, subject, html, text, unsubscribe_url=None: box["emails"].append((to, html)) or True)
    monkeypatch.setattr(brevo, "add_contact", lambda email, language: box["added"].append(email) or True)
    monkeypatch.setattr(brevo, "remove_contact", lambda email: box["removed"].append(email) or True)
    return box


def _email():
    return f"reader-{uuid.uuid4().hex[:10]}@example.com"


def _token_from(html: str, kind: str) -> str:
    start = html.index(f"newsletter.html?{kind}=") + len(f"newsletter.html?{kind}=")
    return html[start:].split('"')[0]


def _row(email: str):
    with SessionLocal() as db:
        return db.scalar(select(NewsletterSubscriber).where(NewsletterSubscriber.email == email))


def test_website_signup_waits_for_confirm_then_joins(client, sent):
    email = _email()
    response = client.post("/api/newsletter/subscribe", json={"email": email.upper(), "language": "bn", "ageConfirmed": True})
    assert response.status_code == 200, response.text
    assert _row(email).status == "pending"
    assert _row(email).language == "bn"
    to, html = sent["emails"][-1]
    assert to == email
    token = _token_from(html, "confirm")
    assert _row(email).token_hash == hash_token(token)  # only the hash is kept

    assert client.post("/api/newsletter/confirm", json={"token": token}).json()["status"] == "subscribed"
    assert sent["added"] == [email]

    assert client.post("/api/newsletter/unsubscribe", json={"token": token}).json()["status"] == "unsubscribed"
    assert sent["removed"] == [email]
    assert _row(email).status == "unsubscribed"


def test_website_signup_needs_the_age_box_and_ignores_bots(client, sent):
    email = _email()
    assert client.post("/api/newsletter/subscribe", json={"email": email}).status_code == 422
    assert client.post("/api/newsletter/subscribe", json={"email": email, "ageConfirmed": True, "website": "spam.example"}).status_code == 200
    assert _row(email) is None
    assert sent["emails"] == []


def test_same_answer_for_someone_already_on_the_list(client, sent):
    email = _email()
    first = client.post("/api/newsletter/subscribe", json={"email": email, "ageConfirmed": True})
    client.post("/api/newsletter/confirm", json={"token": _token_from(sent["emails"][-1][1], "confirm")})
    again = client.post("/api/newsletter/subscribe", json={"email": email, "ageConfirmed": True})
    assert first.json() == again.json()
    assert len(sent["emails"]) == 1  # no second email to someone already on the list


def test_without_brevo_signups_are_saved_and_wait(client, monkeypatch):
    monkeypatch.setattr(settings, "brevo_api_key", "")
    email = _email()
    assert client.post("/api/newsletter/subscribe", json={"email": email, "ageConfirmed": True}).status_code == 200
    row = _row(email)
    assert row.status == "pending" and row.confirm_sent_at is None


def test_bad_token(client):
    assert client.post("/api/newsletter/confirm", json={"token": "not-a-real-token-at-all"}).status_code == 404


def test_app_account_is_not_added_until_it_ticks_the_box(client, auth_headers, sent):
    me = client.get("/api/newsletter/me", headers=auth_headers).json()
    assert me == {"subscribed": False, "canJoin": True}

    on = client.put("/api/newsletter/me", json={"subscribed": True}, headers=auth_headers)
    assert on.json()["subscribed"] is True
    assert len(sent["added"]) == 1
    assert sent["emails"] == []  # their own signed-in email: no confirm email needed

    off = client.put("/api/newsletter/me", json={"subscribed": False}, headers=auth_headers)
    assert off.json()["subscribed"] is False
    assert sent["removed"] == sent["added"]


def test_kid_accounts_cannot_join(client, auth_headers, sent):
    with SessionLocal() as db:
        token_user = db.scalars(select(User).order_by(User.id.desc())).first()
        token_user.account_role = "child"
        db.commit()
    assert client.get("/api/newsletter/me", headers=auth_headers).json()["canJoin"] is False
    assert client.put("/api/newsletter/me", json={"subscribed": True}, headers=auth_headers).status_code == 403


def test_deleting_the_account_takes_the_email_off_the_list(client, auth_headers, sent):
    client.put("/api/newsletter/me", json={"subscribed": True}, headers=auth_headers)
    email = sent["added"][-1]
    assert client.delete("/api/profile/me", headers=auth_headers).status_code == 200
    assert _row(email) is None


def test_owner_counts_and_export(client, auth_headers, sent, monkeypatch):
    monkeypatch.setattr(settings, "admin_key", "owner-secret-123")
    client.put("/api/newsletter/me", json={"subscribed": True}, headers=auth_headers)
    assert client.get("/api/admin/newsletter").status_code == 401
    counts = client.get("/api/admin/newsletter", headers={"X-Admin-Key": "owner-secret-123"}).json()
    assert counts["subscribed"] >= 1 and counts["fromApp"] >= 1 and counts["emailServiceConnected"] is True
    assert len(counts["series"]["days"]) == 28 and counts["series"]["joined"][-1] >= 1
    export = client.get("/api/admin/newsletter/export.csv", headers={"X-Admin-Key": "owner-secret-123"})
    assert export.status_code == 200
    assert export.text.startswith("EMAIL,LANGUAGE,SOURCE,JOINED")
    assert sent["added"][-1] in export.text


def test_owner_sends_confirm_emails_that_waited(client, sent, monkeypatch):
    monkeypatch.setattr(settings, "admin_key", "owner-secret-123")
    monkeypatch.setattr(settings, "brevo_api_key", "")
    email = _email()
    client.post("/api/newsletter/subscribe", json={"email": email, "ageConfirmed": True})
    monkeypatch.setattr(settings, "brevo_api_key", "test-key")
    result = client.post("/api/admin/newsletter/send-confirmations", headers={"X-Admin-Key": "owner-secret-123"}).json()
    assert result["sent"] >= 1
    assert any(to == email for to, _ in sent["emails"])
    assert _row(email).confirm_sent_at is not None
