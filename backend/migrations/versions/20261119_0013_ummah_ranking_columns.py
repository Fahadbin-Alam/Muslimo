"""Ummah ranking in SQL: copy trophies and "joined with a nickname" out of ummah_json into indexed columns."""

import sqlalchemy as sa
from alembic import op


revision = "20261119_0013"
down_revision = "20261117_0012"
branch_labels = None
depends_on = None

INDEX_NAME = "ix_users_ummah_ranking"


def ummah_rank_fields(ummah):
    """A frozen copy of backend.app.models.ummah_rank_fields, so later model changes can't change this migration."""
    if not isinstance(ummah, dict):
        return 0, False
    trophies = ummah.get("trophies")
    count = trophies if isinstance(trophies, int) and not isinstance(trophies, bool) and trophies > 0 else 0
    return count, bool(ummah.get("joined")) and bool(ummah.get("nickname"))


def upgrade() -> None:
    bind = op.get_bind()
    inspector = sa.inspect(bind)
    existing = {column["name"] for column in inspector.get_columns("users")}

    # The initial migration builds tables from the current models, so a fresh database already has these.
    added = False
    with op.batch_alter_table("users") as batch:
        if "ummah_trophies" not in existing:
            batch.add_column(sa.Column("ummah_trophies", sa.Integer(), nullable=False, server_default="0"))
            added = True
        if "ummah_ranked" not in existing:
            batch.add_column(sa.Column("ummah_ranked", sa.Boolean(), nullable=False, server_default=sa.false()))
            added = True

    if added:
        # Fill the new columns from each learner's saved Ummah state, with the rule User._copy_ummah_rank_fields uses.
        users = sa.table("users", sa.column("id", sa.Integer()), sa.column("ummah_json", sa.JSON()),
                         sa.column("ummah_trophies", sa.Integer()), sa.column("ummah_ranked", sa.Boolean()))
        for user_id, ummah in bind.execute(sa.select(users.c.id, users.c.ummah_json)).all():
            trophies, ranked = ummah_rank_fields(ummah)
            if trophies or ranked:
                bind.execute(users.update().where(users.c.id == user_id).values(ummah_trophies=trophies, ummah_ranked=ranked))

    if INDEX_NAME not in {index["name"] for index in sa.inspect(bind).get_indexes("users")}:
        op.create_index(INDEX_NAME, "users", ["ummah_ranked", sa.text("ummah_trophies DESC"), "id"])


def downgrade() -> None:
    op.drop_index(INDEX_NAME, table_name="users")
    with op.batch_alter_table("users") as batch:
        batch.drop_column("ummah_ranked")
        batch.drop_column("ummah_trophies")
