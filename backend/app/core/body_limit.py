"""Refuse request bodies over a size limit (settings.max_request_body_bytes) before any route parses them.

Without it, one request could make the server read and json-parse an arbitrarily large body into memory. The
largest legitimate body is a profile sync: the app's whole profile, with up to 256 KB of extra state
(EXTRA_STATE_MAX_BYTES in service_layer.py), so the default of 1 MiB leaves room for that and nothing silly.

The body is checked twice: a too-large Content-Length is refused without reading anything, and the bytes that
actually arrive are counted too, since a chunked request has no Content-Length and a client can send a wrong one.
Every route here takes a small JSON body, so the body is read in full (up to the limit) and then handed on.
"""
from __future__ import annotations

from typing import Any, Awaitable, Callable, Dict

from starlette.responses import JSONResponse

Message = Dict[str, Any]
Receive = Callable[[], Awaitable[Message]]
Send = Callable[[Message], Awaitable[None]]


class BodySizeLimitMiddleware:
    def __init__(self, app: Callable[..., Awaitable[None]], max_bytes: int) -> None:
        self.app = app
        self.max_bytes = max_bytes

    async def __call__(self, scope: Dict[str, Any], receive: Receive, send: Send) -> None:
        if scope["type"] != "http" or self.max_bytes <= 0:
            await self.app(scope, receive, send)
            return

        for name, value in scope.get("headers") or []:
            if name == b"content-length":
                try:
                    declared = int(value)
                except ValueError:
                    declared = -1
                if declared > self.max_bytes:
                    await self.reject(scope, receive, send)
                    return

        body = bytearray()
        while True:
            message = await receive()
            if message["type"] != "http.request":
                # The client went away before sending the whole body: nothing to answer.
                return
            body.extend(message.get("body", b""))
            if len(body) > self.max_bytes:
                await self.reject(scope, receive, send)
                return
            if not message.get("more_body", False):
                break

        replayed = False

        async def replay() -> Message:
            nonlocal replayed
            if not replayed:
                replayed = True
                return {"type": "http.request", "body": bytes(body), "more_body": False}
            # After the body, the route only ever waits for the client to disconnect.
            return await receive()

        await self.app(scope, replay, send)

    async def reject(self, scope: Dict[str, Any], receive: Receive, send: Send) -> None:
        response = JSONResponse({"detail": f"Request body is larger than {self.max_bytes} bytes"}, status_code=413)
        await response(scope, receive, send)
