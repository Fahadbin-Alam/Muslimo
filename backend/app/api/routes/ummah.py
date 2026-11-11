from __future__ import annotations

from typing import Any, Dict, Optional

from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy import and_, func, or_, select, true

from backend.app.api.deps import DbSession, current_user
from backend.app.models import User
from backend.app.service_layer import clean_ummah


router = APIRouter(tags=["ummah"])

RANKING_SIZE = 50


class RankingsInput(BaseModel):
    ummah: Optional[Dict[str, Any]] = None


def row(user: User, rank: int, me: User) -> Dict[str, Any]:
    """A ranking row: the nickname, the icon and trophies only. Never a name, email or photo."""
    ummah = user.ummah_json or {}
    payload: Dict[str, Any] = {"rank": rank, "nickname": ummah.get("nickname"), "trophies": user.ummah_trophies}
    if ummah.get("icon"):
        payload["icon"] = ummah["icon"]
    if user.id == me.id:
        payload["you"] = True
    return payload


@router.post("/ummah/rankings")
def rankings(body: RankingsInput, db: DbSession, user: User = Depends(current_user)):
    """Saves the caller's Ummah state from the app, then ranks everyone who joined by trophies."""
    if body.ummah is not None:
        user.ummah_json = clean_ummah(body.ummah, user.ummah_json or {})
        db.add(user)
        db.commit()
        db.refresh(user)

    # ummah_ranked and ummah_trophies mirror ummah_json (see User._copy_ummah_rank_fields), so the database sorts,
    # cuts to the top rows and counts on ix_users_ummah_ranking; no user rows are loaded beyond those shown.
    # Ties go to the one who got there first (the older account).
    top_members = db.scalars(
        select(User)
        .where(User.ummah_ranked == true())
        .order_by(User.ummah_trophies.desc(), User.id.asc())
        .limit(RANKING_SIZE)
    ).all()
    total = db.scalar(select(func.count()).select_from(User).where(User.ummah_ranked == true())) or 0

    me = None
    if user.ummah_ranked:
        # Everyone ahead of the caller: more trophies, or the same and an older account.
        ahead = db.scalar(
            select(func.count())
            .select_from(User)
            .where(
                User.ummah_ranked == true(),
                or_(
                    User.ummah_trophies > user.ummah_trophies,
                    and_(User.ummah_trophies == user.ummah_trophies, User.id < user.id),
                ),
            )
        ) or 0
        me = row(user, ahead + 1, user)

    return {
        "top": [row(member, index + 1, user) for index, member in enumerate(top_members)],
        "me": me,
        "total": total,
    }
