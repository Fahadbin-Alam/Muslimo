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


def first_branch_slug(client) -> str:
    topic = client.get("/api/topics").json()[0]["slug"]
    return client.get(f"/api/topics/{topic}/branches").json()[0]["slug"]


def test_branch_lessons_are_paged_in_order(client):
    slug = first_branch_slug(client)

    page = client.get(f"/api/branches/{slug}/lessons", params={"offset": 0, "limit": 3}).json()
    shifted = client.get(f"/api/branches/{slug}/lessons", params={"offset": 1, "limit": 3}).json()

    assert 0 < len(page) <= 3
    assert [lesson["orderIndex"] for lesson in page] == sorted(lesson["orderIndex"] for lesson in page)
    if len(page) > 1:
        assert shifted[0]["slug"] == page[1]["slug"]


def test_branch_lessons_reject_bad_paging_and_unknown_branches(client):
    slug = first_branch_slug(client)

    assert client.get(f"/api/branches/{slug}/lessons", params={"limit": 101}).status_code == 422
    assert client.get(f"/api/branches/{slug}/lessons", params={"offset": -1}).status_code == 422
    assert client.get("/api/branches/not-a-branch/lessons").status_code == 404


def test_lesson_detail_has_its_questions_in_order(client):
    lesson_slug = client.get(f"/api/branches/{first_branch_slug(client)}/lessons").json()[0]["slug"]

    detail = client.get(f"/api/lessons/{lesson_slug}")
    resources = client.get(f"/api/lessons/{lesson_slug}/resources")

    assert detail.status_code == 200
    body = detail.json()
    assert body["slug"] == lesson_slug and body["questions"]
    assert [question["orderIndex"] for question in body["questions"]] == sorted(question["orderIndex"] for question in body["questions"])
    assert resources.status_code == 200
    assert resources.json() == body["resources"]


def test_unknown_lesson_detail_is_404(client):
    assert client.get("/api/lessons/not-a-lesson").status_code == 404
    assert client.get("/api/lessons/not-a-lesson/resources").status_code == 404
