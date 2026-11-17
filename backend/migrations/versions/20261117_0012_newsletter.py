"""Newsletter list: emails that asked for Muslimo news, from the website box or the app's tick box."""

import sqlalchemy as sa
from alembic import op


revision = "20261117_0012"
down_revision = "20261103_0011"
branch_labels = None
depends_on = None


def upgrade() -> None:
    tables = sa.inspect(op.get_bind()).get_table_names()
    # The initial migration builds tables from the current models, so a fresh database already has it.
    if "newsletter_subscribers" not in tables:
        op.create_table(
            "newsletter_subscribers",
            sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
            sa.Column("email", sa.String(length=255), nullable=False),
            sa.Column("status", sa.String(length=20), server_default="pending", nullable=False),
            sa.Column("source", sa.String(length=20), server_default="website", nullable=False),
            sa.Column("language", sa.String(length=16), server_default="en", nullable=False),
            sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=True),
            sa.Column("token_hash", sa.String(length=128), nullable=False),
            sa.Column("confirm_sent_at", sa.DateTime(timezone=True), nullable=True),
            sa.Column("confirmed_at", sa.DateTime(timezone=True), nullable=True),
            sa.Column("unsubscribed_at", sa.DateTime(timezone=True), nullable=True),
            sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
            sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        )
        op.create_index("ix_newsletter_subscribers_email", "newsletter_subscribers", ["email"], unique=True)
        op.create_index("ix_newsletter_subscribers_status", "newsletter_subscribers", ["status"])
        op.create_index("ix_newsletter_subscribers_user_id", "newsletter_subscribers", ["user_id"])
        op.create_index("ix_newsletter_subscribers_token_hash", "newsletter_subscribers", ["token_hash"], unique=True)


def downgrade() -> None:
    op.drop_index("ix_newsletter_subscribers_token_hash", table_name="newsletter_subscribers")
    op.drop_index("ix_newsletter_subscribers_user_id", table_name="newsletter_subscribers")
    op.drop_index("ix_newsletter_subscribers_status", table_name="newsletter_subscribers")
    op.drop_index("ix_newsletter_subscribers_email", table_name="newsletter_subscribers")
    op.drop_table("newsletter_subscribers")
