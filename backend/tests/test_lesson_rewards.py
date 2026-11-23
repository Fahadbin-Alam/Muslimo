"""The normalized learning routes: POST /api/lessons/{slug}/completion and POST /api/questions/{id}/attempts."""
from __future__ import annotations

from sqlalchemy import select

from backend.app.db.session import SessionLocal
from backend.app.models import Branch, Lesson, Question


def lesson_with_question():
    with SessionLocal() as session:
        question = session.scalar(select(Question).order_by(Question.id))
        lesson = session.get(Lesson, question.lesson_id)
        branch = session.get(Branch, lesson.branch_id)
        return {"slug": lesson.slug, "id": lesson.id, "xp": lesson.xp_reward, "question": question.id, "branch": branch.id, "topic": branch.topic_id}


def total_xp(client, headers) -> int:
    return client.get("/api/profile/me", headers=headers).json()["user"]["totalXp"]


def test_finishing_a_lesson_again_pays_no_more_xp(client, auth_headers):
    lesson = lesson_with_question()

    first = client.post(f"/api/lessons/{lesson['slug']}/completion", json={}, headers=auth_headers)
    for _ in range(5):
        client.post(f"/api/lessons/{lesson['slug']}/completion", json={}, headers=auth_headers)

    assert first.status_code == 200
    assert first.json()["xpGained"] == lesson["xp"]
    assert total_xp(client, auth_headers) == lesson["xp"]


def test_a_lesson_never_pays_more_than_its_reward(client, auth_headers):
    lesson = lesson_with_question()

    response = client.post(f"/api/lessons/{lesson['slug']}/completion", json={"xpEarned": 99_999}, headers=auth_headers)

    assert response.status_code == 200
    assert total_xp(client, auth_headers) == lesson["xp"]


def test_a_partial_score_can_be_topped_up_once(client, auth_headers):
    lesson = lesson_with_question()
    partial = max(1, lesson["xp"] // 2)

    client.post(f"/api/lessons/{lesson['slug']}/completion", json={"xpEarned": partial}, headers=auth_headers)
    better = client.post(f"/api/lessons/{lesson['slug']}/completion", json={"xpEarned": lesson["xp"]}, headers=auth_headers)

    assert better.json()["xpGained"] == lesson["xp"] - partial
    assert total_xp(client, auth_headers) == lesson["xp"]


def test_a_lesson_in_progress_pays_nothing_and_is_not_finished(client, auth_headers):
    lesson = lesson_with_question()

    response = client.post(f"/api/lessons/{lesson['slug']}/completion", json={"status": "in_progress"}, headers=auth_headers)
    user = client.get("/api/profile/me", headers=auth_headers).json()["user"]

    assert response.status_code == 200
    assert response.json()["xpGained"] == 0
    assert user["totalXp"] == 0
    assert lesson["slug"] not in user["completedLessonIds"]


def test_completion_rejects_out_of_range_values(client, auth_headers):
    slug = lesson_with_question()["slug"]

    for body in ({"xpEarned": -50}, {"masteryScore": 101}, {"bestScore": -1}, {"status": "x" * 41}, {"status": ""}):
        response = client.post(f"/api/lessons/{slug}/completion", json=body, headers=auth_headers)
        assert response.status_code == 422, body


def test_an_attempt_is_filed_under_the_questions_own_lesson(client, auth_headers):
    lesson = lesson_with_question()
    # Ids that don't match the question (or don't exist at all) used to be stored as sent.
    bogus = {"lessonId": 987654, "topicId": 987654, "branchId": 987654, "isCorrect": False}

    response = client.post(f"/api/questions/{lesson['question']}/attempts", json=bogus, headers=auth_headers)
    queue = client.get("/api/review-queue", headers=auth_headers).json()

    assert response.status_code == 200
    assert queue[0]["lessonId"] == lesson["id"]
    assert queue[0]["branchId"] == lesson["branch"]
    assert queue[0]["topicId"] == lesson["topic"]


def test_an_attempt_needs_no_lesson_id(client, auth_headers):
    question = lesson_with_question()["question"]

    response = client.post(f"/api/questions/{question}/attempts", json={"isCorrect": True}, headers=auth_headers)

    assert response.status_code == 200


def test_an_attempt_rejects_negative_timings(client, auth_headers):
    question = lesson_with_question()["question"]

    response = client.post(f"/api/questions/{question}/attempts", json={"isCorrect": True, "responseTimeMs": -5}, headers=auth_headers)

    assert response.status_code == 422
