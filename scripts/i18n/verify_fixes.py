#!/usr/bin/env python3
"""
Second check of the fixes check_translations.py found: a fresh look at each (English, old, fix) and a yes/no.
Only fixes marked "accept" go into the app. Key from MUSLIMO_CLAUDE_KEY (never written anywhere).

  python3 scripts/i18n/verify_fixes.py submit     # Message Batch over findings-*.jsonl fixes that pass safe_fix
  python3 scripts/i18n/verify_fixes.py status
  python3 scripts/i18n/verify_fixes.py collect    # writes verified-<lang>.jsonl (accepted fixes only)
"""
import argparse
import importlib.util
import json
import time
from pathlib import Path

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location("ct", HERE / "check_translations.py")
ct = importlib.util.module_from_spec(spec)
spec.loader.exec_module(ct)

GROUP = 40

SYSTEM = """You are the second reviewer of proposed fixes to {lang} translations in Muslimo, an app that teaches \
Islam (Quran, hadith, Seerah, Prophets, manners, prayer) to all ages, including young children. For each item you get \
the English line, the current {lang} line, a proposed new {lang} line, and the first reviewer's reason.

Answer "accept" ONLY if all are true:
- The current line really has the problem (meaning differs from the English, part missing, something added, wrong term, \
untranslated English, or clearly broken or confusing wording).
- The new line means exactly the English, adds nothing the English does not say (no extra honorifics, explanations or \
religious content), drops nothing, and is natural, correct {lang} that a child could read.
- The new line is clearly better than the current one, not just a different acceptable wording.
Otherwise answer "reject". When unsure, reject. Most fixes are fine, but be strict."""

SCHEMA = {
    "type": "object",
    "properties": {
        "verdicts": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {"n": {"type": "integer"}, "verdict": {"type": "string", "enum": ["accept", "reject"]}},
                "required": ["n", "verdict"],
                "additionalProperties": False,
            },
        }
    },
    "required": ["verdicts"],
    "additionalProperties": False,
}


def candidates(work, lang):
    out = []
    for line in open(work / f"findings-{lang}.jsonl", encoding="utf-8"):
        issue = json.loads(line)
        if issue["type"] == "quote" or ct.safe_fix(issue):
            continue
        out.append(issue)
    return out


def params(lang, group):
    items = "\n".join(
        json.dumps({"n": n, "en": i["en"], "current": i["old"], "proposed": i["fix"].strip(), "reason": i["problem"]},
                   ensure_ascii=False, separators=(",", ":"))
        for n, i in enumerate(group))
    return {
        "model": ct.MODEL,
        "max_tokens": 16000,
        "system": [{"type": "text", "text": SYSTEM.format(lang=ct.LANGS[lang]), "cache_control": {"type": "ephemeral"}}],
        "output_config": {"effort": "medium", "format": {"type": "json_schema", "schema": SCHEMA}},
        "messages": [{"role": "user", "content": f"Judge these {len(group)} proposed fixes:\n{items}"}],
    }


def cmd_submit(args):
    from anthropic.types.messages.batch_create_params import Request

    c = ct.client()
    work = Path(args.work)
    state = []
    for lang in args.lang.split(","):
        cands = candidates(work, lang)
        groups = [cands[k:k + GROUP] for k in range(0, len(cands), GROUP)]
        with open(work / f"verify-groups-{lang}.json", "w", encoding="utf-8") as f:
            json.dump(groups, f, ensure_ascii=False)
        batch = c.messages.batches.create(requests=[Request(custom_id=f"{lang}-{n}", params=params(lang, g)) for n, g in enumerate(groups)])
        state.append({"lang": lang, "id": batch.id, "requests": len(groups), "fixes": len(cands),
                      "created": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())})
        print(f"{lang}: batch {batch.id}, {len(groups)} requests, {len(cands)} fixes")
    with open(work / "verify-batches.json", "w") as f:
        json.dump(state, f, indent=2)


def cmd_status(args):
    c = ct.client()
    for b in ct.load_json(Path(args.work) / "verify-batches.json"):
        r = c.messages.batches.retrieve(b["id"])
        print(b["lang"], b["id"], r.processing_status, dict(r.request_counts))


def cmd_collect(args):
    c = ct.client()
    work = Path(args.work)
    spent = 0.0
    for b in ct.load_json(work / "verify-batches.json"):
        lang = b["lang"]
        groups = ct.load_json(work / f"verify-groups-{lang}.json")
        accepted, rejected, unjudged = [], [], 0
        for res in c.messages.batches.results(b["id"]):
            group = groups[int(res.custom_id.split("-")[1])]
            if res.result.type != "succeeded":
                unjudged += len(group)
                continue
            msg = res.result.message
            spent += ct.cost(msg.usage, "batch")
            text = next((x.text for x in msg.content if x.type == "text"), "")
            try:
                verdicts = {v["n"]: v["verdict"] for v in json.loads(text)["verdicts"]} if msg.stop_reason == "end_turn" else {}
            except (ValueError, KeyError):
                verdicts = {}
            for n, issue in enumerate(group):
                v = verdicts.get(n)
                if v == "accept":
                    accepted.append(issue)
                elif v == "reject":
                    rejected.append(issue)
                else:
                    unjudged += 1
        for name, rows in (("verified", accepted), ("rejected", rejected)):
            with open(work / f"{name}-{lang}.jsonl", "w", encoding="utf-8") as f:
                for issue in rows:
                    f.write(json.dumps(issue, ensure_ascii=False) + "\n")
        print(f"{lang}: accepted {len(accepted)}, rejected {len(rejected)}, not judged {unjudged}")
    print(f"spent ${spent:.2f}")


def main():
    p = argparse.ArgumentParser()
    p.add_argument("command", choices=["submit", "status", "collect"])
    p.add_argument("--lang", default="bn,ur,ar")
    p.add_argument("--work", default="/mnt/project-files/translation-check")
    args = p.parse_args()
    globals()[f"cmd_{args.command}"](args)


if __name__ == "__main__":
    main()
