"""Migration 20261119_0013 on a database from before it: the new ranking columns are filled from ummah_json."""

from __future__ import annotations

import importlib.util
import json
from pathlib import Path

import sqlalchemy as sa
from alembic.migration import MigrationContext
from alembic.operations import Operations

MIGRATION = Path(__file__).resolve().parents[1] / "migrations" / "versions" / "20261119_0013_ummah_ranking_columns.py"


def load_migration():
    spec = importlib.util.spec_from_file_location("ummah_ranking_migration", MIGRATION)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def run_upgrade(engine) -> None:
    migration = load_migration()
    with engine.begin() as connection:
        with Operations.context(MigrationContext.configure(connection)):
            migration.upgrade()


def test_upgrade_backfills_ranking_columns_and_adds_the_index(tmp_path):
    engine = sa.create_engine(f"sqlite:///{(tmp_path / 'old.db').as_posix()}")
    with engine.begin() as connection:
        connection.execute(sa.text("CREATE TABLE users (id INTEGER PRIMARY KEY, ummah_json JSON NOT NULL DEFAULT '{}')"))
        rows = [
            {"id": 1, "ummah_json": json.dumps({"trophies": 90, "joined": True, "nickname": "Kind Dove 15"})},
            {"id": 2, "ummah_json": json.dumps({"trophies": 40, "joined": False, "nickname": "Wise Owl 77"})},
            {"id": 3, "ummah_json": json.dumps({})},
        ]
        connection.execute(sa.text("INSERT INTO users (id, ummah_json) VALUES (:id, :ummah_json)"), rows)

    run_upgrade(engine)
    # A second run (or a fresh database built by the initial migration) finds everything there and changes nothing.
    run_upgrade(engine)

    with engine.connect() as connection:
        values = connection.execute(sa.text("SELECT id, ummah_trophies, ummah_ranked FROM users ORDER BY id")).all()
    assert [(row[0], row[1], bool(row[2])) for row in values] == [(1, 90, True), (2, 40, False), (3, 0, False)]
    assert "ix_users_ummah_ranking" in {index["name"] for index in sa.inspect(engine).get_indexes("users")}
    engine.dispose()
