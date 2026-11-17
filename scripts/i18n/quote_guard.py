#!/usr/bin/env python3
"""
Third step: of the verified fixes, find the ones whose line holds the original wording of an ayah, hadith, du'a or
dhikr (in Arabic letters or written out in Bengali/Urdu letters). Those are never changed by the model: they move to
guarded-<lang>.jsonl for a person to check against the source. The rest go to safe-<lang>.jsonl.

  python3 scripts/i18n/quote_guard.py submit | status | collect
"""
import argparse, importlib.util, json, time
from pathlib import Path

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location("ct", HERE / "check_translations.py")
ct = importlib.util.module_from_spec(spec); spec.loader.exec_module(ct)
GROUP = 60

SYSTEM = """Muslimo is an app that teaches Islam. For each item you get an English line, its current {lang} line and a \
proposed new {lang} line. Mark "sacred": true when the current or proposed {lang} line contains, wholly or partly, the \
ORIGINAL Arabic wording of a Quran ayah, a hadith, a du'a, a dhikr or another fixed Arabic phrase from the sources \
(in Arabic letters, or written out in {lang} letters as a transliteration), so that the change would alter that \
original wording. A {lang} explanation or translation of the meaning is NOT sacred, even if it is about an ayah or \
hadith. Single well-known names and terms (Allah, salah, wudu, surah names) are not sacred. When unsure, mark true."""

SCHEMA = {"type": "object", "properties": {"items": {"type": "array", "items": {"type": "object", "properties": {
    "n": {"type": "integer"}, "sacred": {"type": "boolean"}}, "required": ["n", "sacred"], "additionalProperties": False}}},
    "required": ["items"], "additionalProperties": False}


def params(lang, group):
    items = "\n".join(json.dumps({"n": n, "en": i["en"], "current": i["old"], "proposed": i["fix"].strip()},
                                 ensure_ascii=False, separators=(",", ":")) for n, i in enumerate(group))
    return {"model": ct.MODEL, "max_tokens": 16000,
            "system": [{"type": "text", "text": SYSTEM.format(lang=ct.LANGS[lang]), "cache_control": {"type": "ephemeral"}}],
            "output_config": {"effort": "low", "format": {"type": "json_schema", "schema": SCHEMA}},
            "messages": [{"role": "user", "content": f"Mark these {len(group)} items:\n{items}"}]}


def cmd_submit(a):
    from anthropic.types.messages.batch_create_params import Request
    c, work, state = ct.client(), Path(a.work), []
    for lang in a.lang.split(","):
        rows = [json.loads(x) for x in open(work / f"verified-{lang}.jsonl", encoding="utf-8")]
        groups = [rows[k:k + GROUP] for k in range(0, len(rows), GROUP)]
        json.dump(groups, open(work / f"guard-groups-{lang}.json", "w", encoding="utf-8"), ensure_ascii=False)
        b = c.messages.batches.create(requests=[Request(custom_id=f"{lang}-{n}", params=params(lang, g)) for n, g in enumerate(groups)])
        state.append({"lang": lang, "id": b.id, "requests": len(groups), "created": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())})
        print(lang, b.id, len(groups))
    json.dump(state, open(work / "guard-batches.json", "w"), indent=2)


def cmd_status(a):
    c = ct.client()
    for b in ct.load_json(Path(a.work) / "guard-batches.json"):
        r = c.messages.batches.retrieve(b["id"]); print(b["lang"], r.processing_status, dict(r.request_counts))


def cmd_collect(a):
    c, work, spent = ct.client(), Path(a.work), 0.0
    for b in ct.load_json(work / "guard-batches.json"):
        lang = b["lang"]; groups = ct.load_json(work / f"guard-groups-{lang}.json")
        safe, guarded = [], []
        for res in c.messages.batches.results(b["id"]):
            group = groups[int(res.custom_id.split("-")[1])]
            marks = {}
            if res.result.type == "succeeded" and res.result.message.stop_reason == "end_turn":
                msg = res.result.message; spent += ct.cost(msg.usage, "batch")
                try:
                    marks = {m["n"]: m["sacred"] for m in json.loads(next(x.text for x in msg.content if x.type == "text"))["items"]}
                except (ValueError, KeyError, StopIteration):
                    marks = {}
            for n, issue in enumerate(group):
                (safe if marks.get(n) is False else guarded).append(issue)
        for name, rows in (("safe", safe), ("guarded", guarded)):
            with open(work / f"{name}-{lang}.jsonl", "w", encoding="utf-8") as f:
                for r in rows: f.write(json.dumps(r, ensure_ascii=False) + "\n")
        print(f"{lang}: safe {len(safe)}, guarded {len(guarded)}")
    print(f"spent ${spent:.2f}")


if __name__ == "__main__":
    p = argparse.ArgumentParser(); p.add_argument("command", choices=["submit", "status", "collect"])
    p.add_argument("--lang", default="bn,ur,ar"); p.add_argument("--work", default="/mnt/project-files/translation-check")
    a = p.parse_args(); globals()[f"cmd_{a.command}"](a)
