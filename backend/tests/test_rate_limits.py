"""The in-memory limiter in backend/app/core/rate_limit.py (conftest.py turns it off for the other tests)."""
from __future__ import annotations

from types import SimpleNamespace

import pytest
from fastapi import HTTPException

from backend.app.core import rate_limit
from backend.app.core.config import settings
from backend.app.core.rate_limit import RateLimiter, check_rate, limiter


@pytest.fixture()
def clock(monkeypatch):
    """A clock the test moves by hand, so no test has to sleep."""
    now = {"t": 1_000.0}
    monkeypatch.setattr(rate_limit, "time", SimpleNamespace(monotonic=lambda: now["t"]))
    return now


def test_allows_up_to_the_limit_then_refuses(clock):
    limits = RateLimiter()

    assert [limits.allow("login:a@example.com", 3, 60) for _ in range(4)] == [True, True, True, False]


def test_each_key_has_its_own_count(clock):
    limits = RateLimiter()
    for _ in range(3):
        limits.allow("login:a@example.com", 3, 60)

    assert limits.allow("login:b@example.com", 3, 60) is True


def test_the_window_slides(clock):
    limits = RateLimiter()
    for _ in range(3):
        limits.allow("code:7", 3, 60)

    clock["t"] += 61

    assert limits.allow("code:7", 3, 60) is True


def test_keys_unused_for_an_hour_are_forgotten(clock):
    limits = RateLimiter()
    limits.allow("code:7", 3, 60)

    clock["t"] += 3_601
    limits.allow("code:8", 3, 60)

    assert "code:7" not in limits._hits


def test_check_rate_answers_429_once_the_limit_is_reached(monkeypatch):
    monkeypatch.setattr(settings, "rate_limit_enabled", True)
    limiter.reset()
    try:
        check_rate("test-action", "user-1", 2, 60)
        check_rate("test-action", "user-1", 2, 60)
        with pytest.raises(HTTPException) as refused:
            check_rate("test-action", "user-1", 2, 60)
        assert refused.value.status_code == 429
    finally:
        limiter.reset()


def test_check_rate_does_nothing_when_turned_off_or_without_a_key(monkeypatch):
    monkeypatch.setattr(settings, "rate_limit_enabled", False)
    for _ in range(5):
        check_rate("test-action", "user-1", 1, 60)

    monkeypatch.setattr(settings, "rate_limit_enabled", True)
    for _ in range(5):
        check_rate("test-action", None, 1, 60)
