from __future__ import annotations

from fastapi import APIRouter, Depends

from backend.app.api.deps import DbSession, current_user
from backend.app.core.rate_limit import check_rate
from backend.app.models import EventLog, User
from backend.app.schemas import EventLogInput


router = APIRouter(tags=["analytics"])


@router.post("/analytics/events")
def track_event(payload: EventLogInput, db: DbSession, user: User = Depends(current_user)):
    # 600 an hour (ten a minute) is plenty for real use, and stops one account from filling event_logs.
    check_rate("analytics", str(user.id), 600, 60 * 60)
    db.add(EventLog(user_id=user.id, event_type=payload.event_type, payload_json=payload.payload_json))
    db.commit()
    return {"ok": True}
