from __future__ import annotations

from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select

from backend.app.api.deps import DbSession, current_user
from backend.app.models import Branch, Lesson, Question, QuestionAttempt, ReviewQueueItem, Topic, User, UserProgress
from backend.app.schemas import LessonCompletionInput, QuestionAttemptInput, ReviewQueueRead


router = APIRouter(tags=["learning"])


@router.post("/questions/{question_id}/attempts")
def record_question_attempt(question_id: int, payload: QuestionAttemptInput, db: DbSession, user: User = Depends(current_user)):
    question = db.get(Question, question_id)
    if not question:
        raise HTTPException(status_code=404, detail="Question not found.")

    # Where the question sits comes from the catalog, not from the request: an attempt can never be filed under
    # another lesson, or point at a topic or branch id that doesn't exist (a foreign-key error on Postgres).
    lesson = db.get(Lesson, question.lesson_id)
    branch = db.get(Branch, lesson.branch_id) if lesson else None

    attempt = QuestionAttempt(
        user_id=user.id,
        question_id=question.id,
        lesson_id=question.lesson_id,
        selected_answer_json=payload.selected_answer_json,
        is_correct=payload.is_correct,
        response_time_ms=payload.response_time_ms,
        confidence_rating=payload.confidence_rating,
    )
    db.add(attempt)

    queue_item = db.scalar(select(ReviewQueueItem).where(ReviewQueueItem.user_id == user.id, ReviewQueueItem.question_id == question.id))
    if payload.is_correct:
        if queue_item:
            queue_item.priority = max(1, queue_item.priority - 1)
            queue_item.last_reviewed_at = datetime.now(timezone.utc)
            queue_item.next_review_at = datetime.now(timezone.utc) + timedelta(days=3)
    else:
        if not queue_item:
            queue_item = ReviewQueueItem(
                user_id=user.id,
                topic_id=branch.topic_id if branch else None,
                branch_id=branch.id if branch else None,
                lesson_id=question.lesson_id,
                question_id=question.id,
                priority=3,
                failure_count=1,
                next_review_at=datetime.now(timezone.utc) + timedelta(days=1),
                last_reviewed_at=datetime.now(timezone.utc),
            )
            db.add(queue_item)
        else:
            queue_item.failure_count += 1
            queue_item.priority = min(10, queue_item.priority + 1)
            queue_item.last_reviewed_at = datetime.now(timezone.utc)
            queue_item.next_review_at = datetime.now(timezone.utc) + timedelta(days=1)

    db.commit()
    return {"ok": True}


@router.post("/lessons/{lesson_slug}/completion")
def complete_lesson(lesson_slug: str, payload: LessonCompletionInput, db: DbSession, user: User = Depends(current_user)):
    lesson = db.scalar(select(Lesson).where(Lesson.slug == lesson_slug))
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found.")

    branch = db.get(Branch, lesson.branch_id)
    topic = db.get(Topic, branch.topic_id) if branch else None
    progress = db.scalar(select(UserProgress).where(UserProgress.user_id == user.id, UserProgress.lesson_id == lesson.id))
    if not progress:
        progress = UserProgress(user_id=user.id, topic_id=topic.id if topic else None, branch_id=branch.id if branch else None, lesson_id=lesson.id, xp_earned=0, best_score=0)
        db.add(progress)

    now = datetime.now(timezone.utc)
    progress.status = payload.status
    progress.mastery_score = payload.mastery_score
    progress.best_score = max(progress.best_score, payload.best_score)
    progress.last_seen_at = now

    gained = 0
    if payload.status == "completed":
        # The lesson's own reward is the most it can pay, and only a first (or better) finish pays. Before, every
        # call added xpEarned again, so one request in a loop could top the league and friend rankings.
        earned = min(payload.xp_earned or lesson.xp_reward, lesson.xp_reward)
        gained = max(0, earned - (progress.xp_earned or 0))
        progress.xp_earned = (progress.xp_earned or 0) + gained
        progress.completed_at = now
        completed_lessons = set(user.completed_lesson_ids_json or [])
        completed_lessons.add(lesson.slug)
        user.completed_lesson_ids_json = sorted(completed_lessons)
        user.total_xp = (user.total_xp or 0) + gained
    user.last_learning_at = now

    db.add(user)
    db.commit()
    return {"ok": True, "progressId": progress.id, "xpGained": gained}


@router.get("/review-queue", response_model=list[ReviewQueueRead])
def get_review_queue(db: DbSession, user: User = Depends(current_user)):
    items = db.scalars(
        select(ReviewQueueItem)
        .where(ReviewQueueItem.user_id == user.id)
        .order_by(ReviewQueueItem.priority.desc(), ReviewQueueItem.next_review_at.asc())
    ).all()
    return [
        ReviewQueueRead(
            id=item.id,
            topicId=item.topic_id,
            branchId=item.branch_id,
            lessonId=item.lesson_id,
            questionId=item.question_id,
            priority=item.priority,
            failureCount=item.failure_count,
            nextReviewAt=item.next_review_at,
            lastReviewedAt=item.last_reviewed_at,
        )
        for item in items
    ]
