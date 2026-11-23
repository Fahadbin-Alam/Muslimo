from __future__ import annotations

from pathlib import Path
from typing import List

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


ROOT_DIR = Path(__file__).resolve().parents[3]
DEFAULT_SQLITE_PATH = ROOT_DIR / "backend" / "data" / "sira_path.db"


class Settings(BaseSettings):
    app_name: str = "Muslimo API"
    api_prefix: str = "/api"
    environment: str = "development"
    database_url: str = Field(default=f"sqlite:///{DEFAULT_SQLITE_PATH.as_posix()}")
    session_ttl_hours: int = 24 * 30
    cors_origins_raw: str = "http://localhost:8082,http://localhost:19006,http://localhost:3000"
    # Sign in with Google: the OAuth client ids an id token may be issued for (comma separated). The
    # app asks for tokens with its web client id, so that one is enough. Empty turns Google off.
    google_client_ids_raw: str = ""
    # Sign in with Apple: tokens from the iOS app are issued for its bundle id.
    apple_client_ids_raw: str = "com.islamiclearning.muslimo"
    # Shared secret RevenueCat sends in the Authorization header of every webhook call.
    revenuecat_webhook_auth: str = ""
    # Owner's password for the stats page (GET /api/admin/stats, header X-Admin-Key). Empty turns the route off.
    admin_key: str = ""
    # Newsletter emails go out through Brevo (free plan). Empty key: sign-ups are still saved, and website
    # sign-ups wait as "pending" until the key is set and the owner sends their confirm emails.
    brevo_api_key: str = ""
    # The Brevo contact list confirmed subscribers are copied into (0 = don't copy).
    brevo_list_id: int = 0
    # Must be a sender verified in Brevo.
    newsletter_sender_email: str = "oneworldrelief.fma@gmail.com"
    newsletter_sender_name: str = "Muslimo"
    # The public website, for the links in confirm emails (site/newsletter.html).
    site_url: str = "https://fahadbin-alam.github.io/Muslimo"
    # Slows down guessing of passwords and codes (see core/rate_limit.py). Tests turn it off.
    rate_limit_enabled: bool = True
    # Largest request body accepted, in bytes; bigger ones get 413 before any route reads them (core/body_limit.py).
    # A full profile sync is the biggest legitimate body (up to 256 KB of extra state plus the rest). 0 turns it off.
    max_request_body_bytes: int = 1024 * 1024

    model_config = SettingsConfigDict(
        env_file=".env",
        env_prefix="SIRA_",
        case_sensitive=False,
        extra="ignore"
    )

    @field_validator("database_url")
    @classmethod
    def use_psycopg_driver(cls, value: str) -> str:
        # Render, Railway and Heroku hand out postgres:// URLs; SQLAlchemy needs the psycopg driver named.
        for prefix in ("postgres://", "postgresql://"):
            if value.startswith(prefix):
                return "postgresql+psycopg://" + value[len(prefix):]
        return value

    @property
    def cors_origins(self) -> List[str]:
        return [origin.strip() for origin in self.cors_origins_raw.split(",") if origin.strip()]

    @property
    def google_client_ids(self) -> List[str]:
        return [value.strip() for value in self.google_client_ids_raw.split(",") if value.strip()]

    @property
    def apple_client_ids(self) -> List[str]:
        return [value.strip() for value in self.apple_client_ids_raw.split(",") if value.strip()]

    @property
    def is_sqlite(self) -> bool:
        return self.database_url.startswith("sqlite")


settings = Settings()

