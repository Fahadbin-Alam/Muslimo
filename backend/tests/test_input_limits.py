"""Requests that would store oversized values, or grant premium outside development, are refused."""
from __future__ import annotations

from backend.app.core.config import settings


def test_an_analytics_event_is_saved(client, auth_headers):
    response = client.post("/api/analytics/events", json={"eventType": "lesson_opened", "payloadJson": {"lesson": "wudu-001"}}, headers=auth_headers)

    assert response.status_code == 200


def test_analytics_needs_an_account(client):
    assert client.post("/api/analytics/events", json={"eventType": "lesson_opened"}).status_code == 401


def test_analytics_refuses_oversized_events(client, auth_headers):
    long_name = client.post("/api/analytics/events", json={"eventType": "x" * 121}, headers=auth_headers)
    empty_name = client.post("/api/analytics/events", json={"eventType": ""}, headers=auth_headers)
    big_payload = client.post("/api/analytics/events", json={"eventType": "dump", "payloadJson": {"blob": "x" * 20_000}}, headers=auth_headers)

    assert long_name.status_code == 422
    assert empty_name.status_code == 422
    assert big_payload.status_code == 422


def test_client_subscription_sync_is_blocked_outside_development(client, auth_headers, monkeypatch):
    # Only "development" and "test" may let the app report its own purchase; "staging" (or a typo) must not.
    monkeypatch.setattr(settings, "environment", "staging")

    response = client.post(
        "/api/subscriptions/sync",
        json={"provider": "app", "planType": "premium_monthly", "status": "active", "entitlementName": "premium"},
        headers=auth_headers,
    )

    assert response.status_code == 403
    assert client.get("/api/profile/me", headers=auth_headers).json()["user"]["activeSubscriptionId"] is None


def test_the_social_hub_takes_its_two_lists_within_limits(client, auth_headers):
    from backend.app.schemas import SOCIAL_HUB_MAX_ITEMS

    ok = client.put("/api/me/social", json={"socialHub": {"connections": [{"id": "c1"}], "battleHistory": []}}, headers=auth_headers)
    other_key = client.put("/api/me/social", json={"socialHub": {"dump": "x"}}, headers=auth_headers)
    not_a_list = client.put("/api/me/social", json={"socialHub": {"connections": "everyone"}}, headers=auth_headers)
    not_objects = client.put("/api/me/social", json={"socialHub": {"connections": [1, 2, 3]}}, headers=auth_headers)
    too_many = client.put("/api/me/social", json={"socialHub": {"connections": [{}] * (SOCIAL_HUB_MAX_ITEMS + 1)}}, headers=auth_headers)
    too_big = client.put("/api/me/social", json={"socialHub": {"connections": [{"blob": "x" * 70_000}]}}, headers=auth_headers)

    assert ok.status_code == 200
    assert [response.status_code for response in (other_key, not_a_list, not_objects, too_many, too_big)] == [422] * 5
    # The refused requests changed nothing.
    assert client.get("/api/session", headers=auth_headers).json()["socialHub"] == {"connections": [{"id": "c1"}], "battleHistory": []}


def test_sign_up_checks_the_social_hub_too(client):
    response = client.post(
        "/api/auth/register",
        json={
            "name": "Big Hub",
            "email": "big-hub@example.com",
            "password": "correct-horse-battery",
            "user": {"totalXp": 0},
            "socialHub": {"connections": [{"blob": "x" * 70_000}]},
        },
    )

    assert response.status_code == 422
