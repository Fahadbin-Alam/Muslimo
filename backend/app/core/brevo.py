"""The few Brevo calls the newsletter needs: send one email, and keep a contact on (or off) the newsletter list.

Brevo (brevo.com) is the free email service that sends Muslimo's newsletter. Without SIRA_BREVO_API_KEY every call
here does nothing and answers False, so the list still fills up and nothing breaks.
"""
from __future__ import annotations

import json
import logging
import urllib.error
import urllib.request
from typing import Any, Dict, Optional

from backend.app.core.config import settings


logger = logging.getLogger(__name__)

API = "https://api.brevo.com/v3"


def enabled() -> bool:
    return bool(settings.brevo_api_key.strip())


def _call(method: str, path: str, body: Optional[Dict[str, Any]] = None) -> bool:
    if not enabled():
        return False
    request = urllib.request.Request(
        f"{API}{path}",
        data=json.dumps(body).encode("utf-8") if body is not None else None,
        method=method,
        headers={"api-key": settings.brevo_api_key.strip(), "accept": "application/json", "content-type": "application/json"},
    )
    try:
        with urllib.request.urlopen(request, timeout=15) as response:
            return 200 <= response.status < 300
    except urllib.error.HTTPError as error:
        logger.warning("Brevo %s %s failed: %s %s", method, path, error.code, error.read()[:300])
    except (urllib.error.URLError, TimeoutError) as error:
        logger.warning("Brevo %s %s failed: %s", method, path, error)
    return False


def send_email(to: str, subject: str, html: str, text: str, unsubscribe_url: Optional[str] = None) -> bool:
    body: Dict[str, Any] = {
        "sender": {"email": settings.newsletter_sender_email, "name": settings.newsletter_sender_name},
        "to": [{"email": to}],
        "subject": subject,
        "htmlContent": html,
        "textContent": text,
    }
    if unsubscribe_url:
        body["headers"] = {"List-Unsubscribe": f"<{unsubscribe_url}>"}
    return _call("POST", "/smtp/email", body)


def add_contact(email: str, language: str) -> bool:
    """Puts a confirmed subscriber on the Brevo list (and takes them off Brevo's block list if they came back)."""
    body: Dict[str, Any] = {"email": email, "updateEnabled": True, "emailBlacklisted": False, "attributes": {"LANGUAGE": language}}
    if settings.brevo_list_id:
        body["listIds"] = [settings.brevo_list_id]
    return _call("POST", "/contacts", body)


def remove_contact(email: str) -> bool:
    """Blocks newsletter email to someone who left, so a campaign sent from Brevo skips them too."""
    from urllib.parse import quote

    return _call("PUT", f"/contacts/{quote(email)}", {"emailBlacklisted": True})
