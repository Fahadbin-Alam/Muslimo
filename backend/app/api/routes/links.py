"""Short tracking links on the website (site/links.json builds /go/reddit, /go/instagram, ...).

The link page sends the visitor on to the store straight away and, without waiting, tells this route which link
it was. The free server may be asleep, so nobody ever waits on it. Only a count per source, day and phone type is
kept; the internet address is used for a few minutes in memory to stop one person inflating a count, never stored.
"""
from __future__ import annotations

import re
from collections import defaultdict
from datetime import date, datetime, timedelta, timezone
from typing import Annotated, Any, Dict, Optional

from fastapi import APIRouter, Header, Request, Response
from sqlalchemy import func, select
from sqlalchemy.exc import IntegrityError

from backend.app.api.deps import DbSession
from backend.app.api.routes.admin import require_admin
from backend.app.core.config import settings
from backend.app.core.rate_limit import limiter
from backend.app.models import LinkClick


router = APIRouter(tags=["links"])

SOURCE_PATTERN = re.compile(r"^[a-z0-9][a-z0-9-]{0,31}$")
PLATFORMS = ("android", "ios", "other")
# One phone opening the same link again and again within 10 minutes still counts once.
REPEAT_WINDOW_SECONDS = 600
# Made-up sources (someone typing /go/anything at the server) stop being added past this many.
MAX_SOURCES = 200
SERIES_DAYS = 28


def _today() -> date:
    return datetime.now(timezone.utc).date()


@router.post("/links/click", status_code=204)
def count_click(request: Request, db: DbSession, s: str = "", p: str = "other") -> Response:
    source = s.strip().lower()
    platform = p if p in PLATFORMS else "other"
    done = Response(status_code=204)
    if not SOURCE_PATTERN.match(source):
        return done
    visitor = request.client.host if request.client else ""
    if settings.rate_limit_enabled and visitor and not limiter.allow(f"link:{source}:{visitor}", 1, REPEAT_WINDOW_SECONDS):
        return done

    known = db.scalar(select(func.count()).select_from(LinkClick).where(LinkClick.source == source))
    if not known and db.scalar(select(func.count(func.distinct(LinkClick.source)))) >= MAX_SOURCES:
        return done

    today = _today()
    for _ in range(2):
        row = db.scalar(select(LinkClick).where(LinkClick.day == today, LinkClick.source == source, LinkClick.platform == platform))
        if row is None:
            db.add(LinkClick(day=today, source=source, platform=platform, clicks=1))
        else:
            row.clicks += 1
        try:
            db.commit()
            break
        except IntegrityError:
            # Two clicks made the day's row at the same moment; add to the one that won.
            db.rollback()
    return done


@router.get("/admin/links")
def admin_links(db: DbSession, x_admin_key: Annotated[Optional[str], Header()] = None) -> Dict[str, Any]:
    require_admin(x_admin_key)
    today = _today()
    days = [(today - timedelta(days=offset)) for offset in range(SERIES_DAYS - 1, -1, -1)]
    per_day = {day: 0 for day in days}
    totals: Dict[str, Dict[str, int]] = defaultdict(lambda: {"today": 0, "last7": 0, "last28": 0, "total": 0, "android": 0, "ios": 0, "other": 0})
    for day, source, platform, clicks in db.execute(select(LinkClick.day, LinkClick.source, LinkClick.platform, LinkClick.clicks)).all():
        entry = totals[source]
        entry["total"] += clicks
        entry[platform if platform in PLATFORMS else "other"] += clicks
        age = (today - day).days
        if age == 0:
            entry["today"] += clicks
        if 0 <= age < 7:
            entry["last7"] += clicks
        if 0 <= age < SERIES_DAYS:
            entry["last28"] += clicks
        if day in per_day:
            per_day[day] += clicks
    sources = sorted(({"source": source, **counts} for source, counts in totals.items()), key=lambda item: (-item["last28"], -item["total"], item["source"]))
    return {
        "series": {"days": [day.isoformat() for day in days], "clicks": [per_day[day] for day in days]},
        "sources": sources,
        "total": sum(item["total"] for item in sources),
    }
