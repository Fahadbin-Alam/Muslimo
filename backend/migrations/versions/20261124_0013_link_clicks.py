"""Short tracking links: a click count per source, day and phone type (no personal data)."""

import sqlalchemy as sa
from alembic import op


revision = "20261124_0013"
down_revision = "20261117_0012"
branch_labels = None
depends_on = None


def upgrade() -> None:
    tables = sa.inspect(op.get_bind()).get_table_names()
    # The initial migration builds tables from the current models, so a fresh database already has it.
    if "link_clicks" not in tables:
        op.create_table(
            "link_clicks",
            sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
            sa.Column("day", sa.Date(), nullable=False),
            sa.Column("source", sa.String(length=32), nullable=False),
            sa.Column("platform", sa.String(length=10), nullable=False),
            sa.Column("clicks", sa.Integer(), server_default="0", nullable=False),
            sa.UniqueConstraint("day", "source", "platform", name="uq_link_clicks_day_source_platform"),
        )
        op.create_index("ix_link_clicks_day", "link_clicks", ["day"])


def downgrade() -> None:
    op.drop_index("ix_link_clicks_day", table_name="link_clicks")
    op.drop_table("link_clicks")
