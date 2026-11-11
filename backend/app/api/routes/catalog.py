from __future__ import annotations

from fastapi import APIRouter, HTTPException, Query
from sqlalchemy import func, select
from sqlalchemy.orm import selectinload

from backend.app.api.deps import DbSession
from backend.app.models import Branch, Lesson, Topic
from backend.app.schemas import BranchRead, LessonDetailRead, LessonSummaryRead, ResourceRead, TopicRead


router = APIRouter(tags=["catalog"])


@router.get("/topics", response_model=list[TopicRead])
def list_topics(db: DbSession):
    topics = db.scalars(select(Topic).order_by(Topic.order_index.asc())).all()
    # Two GROUP BY queries for every topic at once, instead of two COUNT queries per topic (an N+1 pattern).
    branch_counts = dict(db.execute(select(Branch.topic_id, func.count(Branch.id)).group_by(Branch.topic_id)).all())
    lesson_counts = dict(
        db.execute(
            select(Branch.topic_id, func.count(Lesson.id)).select_from(Branch).join(Lesson, Lesson.branch_id == Branch.id).group_by(Branch.topic_id)
        ).all()
    )
    return [
        TopicRead(id=topic.id, title=topic.title, slug=topic.slug, description=topic.description, icon=topic.icon, colorTheme=topic.color_theme, orderIndex=topic.order_index, branchCount=branch_counts.get(topic.id, 0), lessonCount=lesson_counts.get(topic.id, 0))
        for topic in topics
    ]


@router.get("/topics/{topic_slug}/branches", response_model=list[BranchRead])
def list_branches(topic_slug: str, db: DbSession):
    topic = db.scalar(select(Topic).where(Topic.slug == topic_slug))
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found.")
    branches = db.scalars(select(Branch).where(Branch.topic_id == topic.id).order_by(Branch.order_index.asc())).all()
    # One grouped count for the topic's branches instead of one query per branch.
    lesson_counts = dict(
        db.execute(
            select(Lesson.branch_id, func.count(Lesson.id)).join(Branch, Lesson.branch_id == Branch.id).where(Branch.topic_id == topic.id).group_by(Lesson.branch_id)
        ).all()
    )
    return [
        BranchRead(
            id=branch.id,
            topicId=branch.topic_id,
            title=branch.title,
            slug=branch.slug,
            description=branch.description,
            orderIndex=branch.order_index,
            difficultyStart=branch.difficulty_start,
            difficultyEnd=branch.difficulty_end,
            lessonCount=lesson_counts.get(branch.id, 0),
            sourceReferences=branch.source_references_json or [],
        )
        for branch in branches
    ]


@router.get("/branches/{branch_slug}/lessons", response_model=list[LessonSummaryRead])
def list_lessons(branch_slug: str, db: DbSession, offset: int = Query(default=0, ge=0), limit: int = Query(default=40, ge=1, le=100)):
    branch = db.scalar(select(Branch).where(Branch.slug == branch_slug))
    if not branch:
        raise HTTPException(status_code=404, detail="Branch not found.")
    lessons = db.scalars(
        select(Lesson).where(Lesson.branch_id == branch.id).order_by(Lesson.order_index.asc()).offset(offset).limit(limit)
    ).all()
    return [
        LessonSummaryRead(
            id=lesson.id,
            branchId=lesson.branch_id,
            title=lesson.title,
            slug=lesson.slug,
            description=lesson.description,
            orderIndex=lesson.order_index,
            difficulty=lesson.difficulty,
            isPremium=lesson.is_premium,
            xpReward=lesson.xp_reward,
            lessonType=lesson.lesson_type,
            estimatedMinutes=lesson.estimated_minutes,
            masteryTestEligible=lesson.mastery_test_eligible,
            surahName=lesson.surah_name,
            ayahRange=lesson.ayah_range,
        )
        for lesson in lessons
    ]


@router.get("/lessons/{lesson_slug}", response_model=LessonDetailRead)
def get_lesson(lesson_slug: str, db: DbSession):
    lesson = db.scalar(
        select(Lesson)
        .where(Lesson.slug == lesson_slug)
        .options(selectinload(Lesson.questions), selectinload(Lesson.resources))
    )
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found.")
    return LessonDetailRead(
        id=lesson.id,
        branchId=lesson.branch_id,
        title=lesson.title,
        slug=lesson.slug,
        description=lesson.description,
        contentBody=lesson.content_body,
        orderIndex=lesson.order_index,
        difficulty=lesson.difficulty,
        isPremium=lesson.is_premium,
        xpReward=lesson.xp_reward,
        lessonType=lesson.lesson_type,
        unlockRule=lesson.unlock_rule,
        estimatedMinutes=lesson.estimated_minutes,
        masteryTestEligible=lesson.mastery_test_eligible,
        surahName=lesson.surah_name,
        ayahRange=lesson.ayah_range,
        questions=[
            {
                "id": question.id,
                "lessonId": question.lesson_id,
                "type": question.type,
                "prompt": question.prompt,
                "optionsJson": question.options_json,
                "correctAnswerJson": question.correct_answer_json,
                "explanationShort": question.explanation_short,
                "explanationLong": question.explanation_long,
                "tagsJson": question.tags_json,
                "difficulty": question.difficulty,
                "orderIndex": question.order_index,
            }
            for question in sorted(lesson.questions, key=lambda item: item.order_index)
        ],
        resources=[
            ResourceRead(
                id=resource.id,
                lessonId=resource.lesson_id,
                title=resource.title,
                url=resource.url,
                sourceType=resource.source_type,
                speaker=resource.speaker,
                notes=resource.notes,
                reviewStatus=resource.review_status,
                isSunniApproved=resource.is_sunni_approved,
            )
            for resource in lesson.resources
        ],
    )


@router.get("/lessons/{lesson_slug}/resources", response_model=list[ResourceRead])
def get_lesson_resources(lesson_slug: str, db: DbSession):
    lesson = db.scalar(select(Lesson).where(Lesson.slug == lesson_slug).options(selectinload(Lesson.resources)))
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found.")
    return [
        ResourceRead(
            id=resource.id,
            lessonId=resource.lesson_id,
            title=resource.title,
            url=resource.url,
            sourceType=resource.source_type,
            speaker=resource.speaker,
            notes=resource.notes,
            reviewStatus=resource.review_status,
            isSunniApproved=resource.is_sunni_approved,
        )
        for resource in lesson.resources
    ]
