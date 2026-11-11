"""Request bodies over settings.max_request_body_bytes are refused with 413 before a route reads them."""
from __future__ import annotations

from fastapi import FastAPI, Request
from fastapi.testclient import TestClient

from backend.app.core.body_limit import BodySizeLimitMiddleware
from backend.app.core.config import settings


def small_app(limit: int) -> TestClient:
    app = FastAPI()
    app.add_middleware(BodySizeLimitMiddleware, max_bytes=limit)

    @app.post("/echo")
    async def echo(request: Request):
        return {"size": len(await request.body())}

    @app.get("/ping")
    def ping():
        return {"ok": True}

    return TestClient(app)


def test_the_real_app_refuses_a_body_over_the_limit(client):
    assert settings.max_request_body_bytes > 0
    huge = b'{"name": "' + b"x" * (settings.max_request_body_bytes + 1) + b'"}'

    response = client.post("/api/auth/register", content=huge, headers={"Content-Type": "application/json"})

    assert response.status_code == 413


def test_bodies_up_to_the_limit_reach_the_route():
    test_client = small_app(100)

    assert test_client.post("/echo", content=b"x" * 100).json() == {"size": 100}
    assert test_client.post("/echo", content=b"").json() == {"size": 0}
    assert test_client.get("/ping").json() == {"ok": True}


def test_a_large_content_length_is_refused():
    assert small_app(100).post("/echo", content=b"x" * 101).status_code == 413


def test_a_chunked_body_without_content_length_is_counted():
    def chunks():
        for _ in range(5):
            yield b"x" * 40

    response = small_app(100).post("/echo", content=chunks())

    assert response.status_code == 413


def test_a_chunked_body_under_the_limit_arrives_whole():
    def chunks():
        for _ in range(2):
            yield b"x" * 40

    assert small_app(100).post("/echo", content=chunks()).json() == {"size": 80}


def test_zero_turns_the_limit_off():
    assert small_app(0).post("/echo", content=b"x" * 5000).json() == {"size": 5000}
