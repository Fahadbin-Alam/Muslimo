"""The catalog routes: counts match the rows, and the slugs the routes look up by are unique."""
from __future__ import annotations

from collections import Counter

from sqlalchemy import select

from backend.app.db.session import SessionLocal
from backend.app.models import Branch, Lesson, Topic


def test_topic_counts_match_the_rows(client):
    topics = {topic["slug"]: topic for topic in client.get("/api/topics").json()}

    with SessionLocal() as session:
        for topic in session.scalars(select(Topic)).all():
            assert topics[topic.slug]["branchCount"] == len(topic.branches)
            assert topics[topic.slug]["lessonCount"] == sum(len(branch.lessons) for branch in topic.branches)


def test_branch_lesson_counts_match_the_rows(client):
    slug = client.get("/api/topics").json()[0]["slug"]
    branches = client.get(f"/api/topics/{slug}/branches").json()

    with SessionLocal() as session:
        for branch in branches:
            row = session.get(Branch, branch["id"])
            assert branch["lessonCount"] == len(row.lessons)


def test_branch_and_lesson_slugs_are_unique_across_topics():
    # /api/branches/{slug}/lessons and /api/lessons/{slug} look a row up by slug alone, but the database only makes
    # a branch slug unique inside its topic (uq_branch_topic_slug). This keeps the seeded catalog from relying on luck.
    with SessionLocal() as session:
        branch_slugs = Counter(session.scalars(select(Branch.slug)).all())
        lesson_slugs = Counter(session.scalars(select(Lesson.slug)).all())

    assert [slug for slug, count in branch_slugs.items() if count > 1] == []
    assert [slug for slug, count in lesson_slugs.items() if count > 1] == []
