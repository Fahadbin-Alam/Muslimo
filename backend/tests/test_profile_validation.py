"""A profile save with a wrong type or an out-of-range number keeps the saved value instead of failing.

SQLite (used by these tests) stores anything in any column, but Postgres refuses a string in an INTEGER column, a
number past 2,147,483,647, or text longer than String(n), and the whole save failed with a 500. These checks make
both databases behave the same.
"""
from __future__ import annotations

import uuid


def register(client, **user_fields):
    email = f"check-{uuid.uuid4().hex[:10]}@example.com"
    user = {"totalXp": 0, "streakDays": 0, "hearts": {"current": 5, "max": 5, "unlimited": False}, **user_fields}
    response = client.post("/api/auth/register", json={"name": "Check", "email": email, "password": "correct-horse-battery", "user": user})
    assert response.status_code == 201, response.text
    return response.json()["user"], {"Authorization": f"Bearer {response.json()['token']}"}


def sync(client, headers, **user_fields):
    response = client.put("/api/me/user", headers=headers, json={"user": user_fields})
    assert response.status_code == 200, response.text
    return response.json()["user"]


def test_wrong_types_keep_the_saved_values(client):
    _, headers = register(client)
    sync(client, headers, gems=300, dailyGoalXp=50, streakDays=3, hearts={"current": 4, "max": 5},
         soundEffectsEnabled=False, preferredLanguage="ar", accountRole="parent")

    user = sync(client, headers, gems="lots", dailyGoalXp=-5, streakDays=2**40, hearts={"current": "full", "max": None},
                soundEffectsEnabled="yes", preferredLanguage="x" * 50, accountRole="admin")

    assert user["gems"] == 300
    assert user["dailyGoalXp"] == 50
    assert user["streakDays"] == 3
    assert user["hearts"]["current"] == 4 and user["hearts"]["max"] == 5
    assert user["soundEffectsEnabled"] is False
    assert user["preferredLanguage"] == "ar"
    assert user["accountRole"] == "parent"


def test_hearts_that_are_not_an_object_are_ignored(client):
    _, headers = register(client)

    user = sync(client, headers, hearts=[1, 2, 3])

    assert user["hearts"]["current"] == 5


def test_a_bad_reminder_save_cannot_break_the_session(client):
    _, headers = register(client)
    sync(client, headers, reminderPreferences={"enabled": True})

    sync(client, headers, reminderPreferences=["not", "an", "object"], learnerProfile="nope")
    session = client.get("/api/session", headers=headers)

    assert session.status_code == 200, session.text
    assert session.json()["account"]["reminderPreferences"] == {"enabled": True}


def test_last_streak_date_is_a_date_or_cleared(client):
    _, headers = register(client)

    assert sync(client, headers, streakDays=2, lastStreakDate="2026-11-05T08:00:00Z")["lastStreakDate"] == "2026-11-05"
    assert sync(client, headers, streakDays=2, lastStreakDate="not-a-date")["lastStreakDate"] == "2026-11-05"
    assert sync(client, headers, streakDays=0, lastStreakDate=None)["lastStreakDate"] is None


def test_sign_up_with_wrong_types_uses_the_defaults(client):
    user, _ = register(client, preferredLanguage=5, soundEffectsEnabled="no", gems=-10, dailyGoalXp="forty")

    assert user["preferredLanguage"] == "en"
    assert user["soundEffectsEnabled"] is True
    assert user["gems"] == 120
    assert user["dailyGoalXp"] == 40


def test_good_values_still_save(client):
    _, headers = register(client)

    user = sync(client, headers, gems=0, dailyGoalXp=20, preferredLanguage="bn", reducedSoundEffects=True, accountRole="child")

    assert user["gems"] == 0
    assert user["dailyGoalXp"] == 20
    assert user["preferredLanguage"] == "bn"
    assert user["reducedSoundEffects"] is True
    assert user["accountRole"] == "child"
