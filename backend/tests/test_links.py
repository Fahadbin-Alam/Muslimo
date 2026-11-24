from __future__ import annotations

from backend.app.core.config import settings
from backend.app.core.rate_limit import limiter

KEY = {"X-Admin-Key": "owner-secret-123"}


def _stats(client):
    response = client.get("/api/admin/links", headers=KEY)
    assert response.status_code == 200, response.text
    return response.json()


def _source(body, name):
    return next((item for item in body["sources"] if item["source"] == name), None)


def test_clicks_count_per_source_and_phone(client, monkeypatch):
    monkeypatch.setattr(settings, "admin_key", "owner-secret-123")
    for platform in ("android", "android", "ios", "other"):
        assert client.post(f"/api/links/click?s=reddit-test&p={platform}").status_code == 204
    entry = _source(_stats(client), "reddit-test")
    assert entry == {"source": "reddit-test", "today": 4, "last7": 4, "last28": 4, "total": 4, "android": 2, "ios": 1, "other": 1}
    body = _stats(client)
    assert len(body["series"]["days"]) == 28 == len(body["series"]["clicks"])
    assert body["series"]["clicks"][-1] >= 4


def test_bad_sources_and_phones_are_not_kept(client, monkeypatch):
    monkeypatch.setattr(settings, "admin_key", "owner-secret-123")
    for bad in ("", "Has Space", "<script>", "x" * 40, "-dash"):
        assert client.post("/api/links/click", params={"s": bad}).status_code == 204
    assert client.post("/api/links/click?s=weird-phone-test&p=toaster").status_code == 204
    body = _stats(client)
    assert {item["source"] for item in body["sources"]}.isdisjoint({"has space", "<script>", "x" * 40, "-dash"})
    assert _source(body, "weird-phone-test")["other"] == 1


def test_one_phone_tapping_again_counts_once(client, monkeypatch):
    monkeypatch.setattr(settings, "admin_key", "owner-secret-123")
    monkeypatch.setattr(settings, "rate_limit_enabled", True)
    limiter.reset()
    for _ in range(5):
        client.post("/api/links/click?s=repeat-test&p=android")
    limiter.reset()
    assert _source(_stats(client), "repeat-test")["total"] == 1


def test_link_numbers_are_owner_only(client, monkeypatch):
    monkeypatch.setattr(settings, "admin_key", "")
    assert client.get("/api/admin/links", headers=KEY).status_code == 404
    monkeypatch.setattr(settings, "admin_key", "owner-secret-123")
    assert client.get("/api/admin/links").status_code == 401
