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
