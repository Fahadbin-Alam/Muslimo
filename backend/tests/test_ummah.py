from __future__ import annotations

from backend.tests.test_friends_and_daily_progress import register, sync


def ummah(trophies=0, nickname="Brave Falcon 42", joined=True, **extra):
    return {"trophies": trophies, "best": trophies, "battles": 1, "wins": 1, "nickname": nickname, "joined": joined, **extra}


def test_ranking_shows_only_joined_learners_by_nickname_and_trophies(client):
    _, aisha = register(client, "Aisha")
    _, omar = register(client, "Omar")
    _, hidden = register(client, "Hidden")
    client.post("/api/ummah/rankings", headers=aisha, json={"ummah": ummah(300, "Kind Dove 15")})
    client.post("/api/ummah/rankings", headers=hidden, json={"ummah": ummah(900, "Wise Owl 77", joined=False)})

    response = client.post("/api/ummah/rankings", headers=omar, json={"ummah": ummah(120, "Swift Eagle 31", icon="moon", icons=["moon"])})

    assert response.status_code == 200, response.text
    body = response.json()
    nicknames = [row["nickname"] for row in body["top"]]
    assert nicknames.index("Kind Dove 15") < nicknames.index("Swift Eagle 31")
    assert "Wise Owl 77" not in nicknames
    me = body["me"]
    assert me["nickname"] == "Swift Eagle 31" and me["you"] is True and me["icon"] == "moon"
    # Nothing but the nickname, an icon and trophies.
    assert all(set(row) <= {"rank", "nickname", "trophies", "icon", "you"} for row in body["top"])


def test_typed_names_and_unknown_icons_never_reach_the_ranking(client):
    _, headers = register(client, "Yusuf")

    body = client.post("/api/ummah/rankings", headers=headers, json={"ummah": ummah(50, "Yusuf Ahmed", icon="photo", icons=["photo"])}).json()

    assert body["me"] is None
    assert all(row["nickname"] != "Yusuf Ahmed" for row in body["top"])
    saved = client.get("/api/session", headers=headers).json()["user"]["ummah"]
    assert saved["joined"] is False and "nickname" not in saved and saved["icons"] == [] and "icon" not in saved


def test_ummah_follows_the_learner_through_user_sync(client):
    _, headers = register(client, "Maryam")

    user = sync(client, headers, ummah=ummah(260, "Gentle Gazelle 18", secrets=["secret-charity"], hints=["secret-intentions"], hadith=["hadith-one-body"]))

    assert user["ummah"]["trophies"] == 260
    assert user["ummah"]["secrets"] == ["secret-charity"]
    assert user["ummah"]["hadith"] == ["hadith-one-body"]
    assert user["ummah"]["joined"] is True


def test_ranking_needs_a_session(client):
    assert client.post("/api/ummah/rankings", json={"ummah": ummah()}).status_code == 401


def test_ranking_order_ties_and_total_come_from_sql(client):
    """Rank, ties and total are counted by the database now; they must match the old sort-everything-in-Python rule."""
    _, older = register(client, "Older")
    _, newer = register(client, "Newer")
    _, leader = register(client, "Leader")
    first = client.post("/api/ummah/rankings", headers=older, json={"ummah": ummah(4321, "Kind Dove 15")}).json()
    second = client.post("/api/ummah/rankings", headers=newer, json={"ummah": ummah(4321, "Wise Owl 77")}).json()

    # Same trophies: the older account stays ahead, and one more learner joined.
    assert second["me"]["rank"] == first["me"]["rank"] + 1
    assert second["total"] == first["total"] + 1

    ahead = client.post("/api/ummah/rankings", headers=leader, json={"ummah": ummah(4322, "Swift Eagle 31")}).json()
    after = client.post("/api/ummah/rankings", headers=older, json={}).json()
    assert ahead["me"]["rank"] == first["me"]["rank"]
    assert after["me"]["rank"] == first["me"]["rank"] + 1
    # The top list is in rank order with no gaps, and agrees with "me" when the caller is on it.
    ranks = [row["rank"] for row in after["top"]]
    assert ranks == list(range(1, len(ranks) + 1))
    trophies = [row["trophies"] for row in after["top"]]
    assert trophies == sorted(trophies, reverse=True)
    mine = [row for row in after["top"] if row.get("you")]
    assert not mine or mine[0]["rank"] == after["me"]["rank"]


def test_leaving_the_ranking_takes_the_learner_off_it(client):
    _, headers = register(client, "Leaver")
    joined = client.post("/api/ummah/rankings", headers=headers, json={"ummah": ummah(77, "Gentle Gazelle 18")}).json()

    left = client.post("/api/ummah/rankings", headers=headers, json={"ummah": ummah(77, "Gentle Gazelle 18", joined=False)}).json()

    assert joined["me"] is not None
    assert left["me"] is None
    assert left["total"] == joined["total"] - 1


def test_user_sync_also_updates_the_ranking_columns(client):
    _, headers = register(client, "Synced")
    sync(client, headers, ummah=ummah(345, "Brave Falcon 42"))

    body = client.post("/api/ummah/rankings", headers=headers, json={}).json()

    assert body["me"] is not None and body["me"]["trophies"] == 345


def test_ranking_columns_follow_every_ummah_json_assignment():
    from backend.app.models import User, ummah_rank_fields

    user = User(ummah_json={"trophies": 12, "joined": True, "nickname": "Kind Dove 15"})
    assert (user.ummah_trophies, user.ummah_ranked) == (12, True)
    user.ummah_json = {"trophies": 12, "joined": True}
    assert (user.ummah_trophies, user.ummah_ranked) == (12, False)
    assert ummah_rank_fields(None) == (0, False)
    assert ummah_rank_fields({"trophies": True, "joined": True, "nickname": "x"}) == (0, True)
    assert ummah_rank_fields({"trophies": -5}) == (0, False)
