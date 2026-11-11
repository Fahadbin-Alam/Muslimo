"""Routes the other test files didn't reach: log out, the social hub save, and the entitlements list."""
from __future__ import annotations


def test_logout_ends_that_session_only(client, auth_headers):
    me = client.get("/api/profile/me", headers=auth_headers).json()
    second = client.post("/api/auth/login", json={"email": me["account"]["email"], "password": "correct-horse-battery"})
    other_phone = {"Authorization": f"Bearer {second.json()['token']}"}

    response = client.post("/api/auth/logout", headers=auth_headers)

    assert response.status_code == 200
    assert client.get("/api/session", headers=auth_headers).status_code == 401
    assert client.get("/api/session", headers=other_phone).status_code == 200


def test_logout_without_a_token_is_harmless(client):
    assert client.post("/api/auth/logout").json() == {"ok": True}


def test_the_social_hub_is_saved_and_returned(client, auth_headers):
    hub = {"connections": [{"id": "c1", "name": "Omar"}], "battleHistory": []}

    saved = client.put("/api/me/social", json={"socialHub": hub}, headers=auth_headers)
    session = client.get("/api/session", headers=auth_headers).json()

    assert saved.status_code == 200
    assert session["socialHub"] == hub


def test_a_new_learner_has_no_entitlements(client, auth_headers):
    assert client.get("/api/subscriptions/entitlements", headers=auth_headers).json() == []
    assert client.get("/api/subscriptions/entitlements").status_code == 401
