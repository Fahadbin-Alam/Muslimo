#!/usr/bin/env python3
"""
Checks the Bengali, Urdu and Arabic lesson text with Claude and fixes what is wrong.

Reads the API key from MUSLIMO_CLAUDE_KEY (never from a file, never written anywhere).
Work files (requests, batch ids, findings) go to --work, by default /mnt/project-files/translation-check/.

  python3 scripts/i18n/check_translations.py plan              # how many requests, rough cost
  python3 scripts/i18n/check_translations.py pilot --lang bn --n 3   # a few requests now, prints real cost
  python3 scripts/i18n/check_translations.py submit --lang bn,ur,ar  # the whole check as Message Batches (half price)
  python3 scripts/i18n/check_translations.py status
  python3 scripts/i18n/check_translations.py collect           # findings-<lang>.jsonl + cost so far
  python3 scripts/i18n/check_translations.py apply --lang bn   # writes safe fixes into src/translations/content/bn.json

Rules the check follows (Fahad's): the meaning must stay the English meaning, nothing is added; Quran and hadith
wording in a translation is never rewritten by the model (quotes are only flagged, for a person to check against the
source); book names and numbers stay; every {placeholder} and the ﷺ honorific stay.
"""
import argparse
import json
import os
import re
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / "scripts/i18n/content-source.json"
CONTENT = ROOT / "src/translations/content"
MODEL = "claude-opus-5-5"
LANGS = {"bn": "Bengali", "ur": "Urdu", "ar": "Arabic"}
SCRIPT = {"bn": re.compile(r"[ঀ-৿]"), "ur": re.compile(r"[؀-ۿ]"), "ar": re.compile(r"[؀-ۿ]")}
# Batch prices per million tokens for claude-opus-5-5 (half of $4 in / $20 out).
PRICE = {"batch": (2.0, 10.0, 0.20), "now": (4.0, 20.0, 0.40)}  # input, output, cache read
CHUNK_CHARS = 5000  # English characters per request

SYSTEM = """You review translations for Muslimo, a Duolingo-style app that teaches Islam (Quran, hadith, Seerah, \
Prophets, manners, prayer) to all ages, including young children. Each line is English app text and its {lang} \
translation. Lines come in app order, so nearby lines are from the same lesson: use them for context.

Report ONLY real problems a {lang} reader would notice:
- "wrong": the meaning differs from the English, a fact/name/number/word changed, a negation flipped, a part is \
missing, or something was added.
- "english": English words left untranslated (names of people, places and books written in {lang} script are fine).
- "unclear": broken grammar, a wrong or garbled word, or wording a {lang} speaker would find confusing or hard \
for a child.
- "term": a wrong or non-standard Islamic term, or wrong respect wording for Allah, a Prophet, or a Companion.
Do NOT report style preferences, acceptable synonyms, small punctuation choices, or a different but correct \
word order. Most lines are fine; an empty list is a normal answer.

For each problem give "fix": the whole corrected {lang} line, meaning exactly the English, same tone, short like \
the original. Keep every {{placeholder}}, digit and the ﷺ sign exactly. Never add religious content the English \
does not have.

Quran and hadith wording: lines with kind "quote" (and any line whose translation is Arabic Quran or hadith text) \
may hold the original Arabic words of an ayah or hadith. NEVER rewrite that original Arabic; if it looks wrong, \
report it with type "quote" and an empty "fix" so a person can check it against the source.

Write "problem" in short plain English (one sentence)."""

SCHEMA = {
    "type": "object",
    "properties": {
        "issues": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "id": {"type": "integer"},
                    "type": {"type": "string", "enum": ["wrong", "english", "unclear", "term", "quote"]},
                    "problem": {"type": "string"},
                    "fix": {"type": "string"},
                },
                "required": ["id", "type", "problem", "fix"],
                "additionalProperties": False,
            },
        }
    },
    "required": ["issues"],
    "additionalProperties": False,
}


def load_json(path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def chunks(lang):
    """Requests for one language: lists of (id, kind, english, translation), in app order."""
    source = load_json(SOURCE)
    catalog = load_json(CONTENT / f"{lang}.json")
    out, cur, size = [], [], 0
    for i, entry in enumerate(source):
        tr = catalog.get(entry["text"])
        if tr is None:
            continue
        cur.append((i, entry["kind"], entry["text"], tr))
        size += len(entry["text"])
        if size >= CHUNK_CHARS:
            out.append(cur)
            cur, size = [], 0
    if cur:
        out.append(cur)
    return out


def params(lang, chunk):
    lines = "\n".join(json.dumps({"id": i, "kind": k, "en": en, lang: tr}, ensure_ascii=False, separators=(",", ":")) for i, k, en, tr in chunk)
    return {
        "model": MODEL,
        "max_tokens": 32000,
        "system": [{"type": "text", "text": SYSTEM.format(lang=LANGS[lang]), "cache_control": {"type": "ephemeral"}}],
        "output_config": {"effort": "low", "format": {"type": "json_schema", "schema": SCHEMA}},
        "messages": [{"role": "user", "content": f"Check these {len(chunk)} lines:\n{lines}"}],
    }


def client():
    import anthropic

    key = os.environ.get("MUSLIMO_CLAUDE_KEY")
    if not key:
        sys.exit("MUSLIMO_CLAUDE_KEY is not set.")
    return anthropic.Anthropic(api_key=key, base_url="https://api.anthropic.com", max_retries=4)


def cost(usage, mode):
    pin, pout, pcache = PRICE[mode]
    cw = getattr(usage, "cache_creation_input_tokens", 0) or 0
    cr = getattr(usage, "cache_read_input_tokens", 0) or 0
    return (usage.input_tokens * pin + cw * pin * 1.25 + cr * pcache + usage.output_tokens * pout) / 1e6


def parse(message):
    if message.stop_reason != "end_turn":
        return None, f"stop_reason {message.stop_reason}"
    text = next((b.text for b in message.content if b.type == "text"), "")
    try:
        return json.loads(text)["issues"], None
    except (ValueError, KeyError) as error:
        return None, f"bad json: {error}"


def cmd_plan(args):
    total = 0
    for lang in args.lang.split(","):
        cs = chunks(lang)
        en = sum(len(c[2]) for ch in cs for c in ch)
        tr = sum(len(c[3]) for ch in cs for c in ch)
        # Rough: English ~4 chars/token, Bengali ~1.6, Urdu/Arabic ~2.2; JSON framing ~25%; thinking+answer ~2.5k/request.
        tin = (en / 4 + tr / (1.6 if lang == "bn" else 2.2)) * 1.25 + len(cs) * 900
        tout = len(cs) * 2500
        usd = (tin * PRICE["batch"][0] + tout * PRICE["batch"][1]) / 1e6
        total += usd
        print(f"{lang}: {len(cs)} requests, {en:,} English chars, ~{tin/1e6:.1f}M in / ~{tout/1e6:.1f}M out tokens, ~${usd:.0f}")
    print(f"all: ~${total:.0f} (batch prices)")


def cmd_pilot(args):
    c = client()
    work = Path(args.work)
    work.mkdir(parents=True, exist_ok=True)
    spent = 0.0
    for lang in args.lang.split(","):
        cs = chunks(lang)
        step = max(1, len(cs) // args.n)
        for n in range(0, len(cs), step)[: args.n]:
            msg = c.messages.create(**params(lang, cs[n]))
            issues, err = parse(msg)
            usd = cost(msg.usage, "now")
            spent += usd
            print(f"{lang}-{n}: {len(cs[n])} lines, in {msg.usage.input_tokens} out {msg.usage.output_tokens}, ${usd:.3f}, "
                  f"{'ERROR ' + err if err else str(len(issues)) + ' issues'}")
            with open(work / f"pilot-{lang}.jsonl", "a", encoding="utf-8") as f:
                for issue in issues or []:
                    f.write(json.dumps(with_text(issue, cs[n], lang), ensure_ascii=False) + "\n")
    print(f"pilot spent ${spent:.2f} (full price; batch is half)")


def with_text(issue, chunk, lang):
    row = next((c for c in chunk if c[0] == issue["id"]), None)
    if row:
        issue.update({"kind": row[1], "en": row[2], "old": row[3], "lang": lang})
    return issue


def cmd_submit(args):
    from anthropic.types.messages.batch_create_params import Request

    c = client()
    work = Path(args.work)
    work.mkdir(parents=True, exist_ok=True)
    state_path = work / "batches.json"
    state = load_json(state_path) if state_path.exists() else []
    for lang in args.lang.split(","):
        cs = chunks(lang)
        if args.limit:
            cs = cs[: args.limit]
        # Keep each language's chunks so results can be matched back after the source file changes.
        with open(work / f"chunks-{lang}.json", "w", encoding="utf-8") as f:
            json.dump(cs, f, ensure_ascii=False)
        batch = c.messages.batches.create(requests=[Request(custom_id=f"{lang}-{n}", params=params(lang, ch)) for n, ch in enumerate(cs)])
        state.append({"lang": lang, "id": batch.id, "requests": len(cs), "created": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())})
        print(f"{lang}: batch {batch.id}, {len(cs)} requests")
        with open(state_path, "w") as f:
            json.dump(state, f, indent=2)


def cmd_status(args):
    c = client()
    for b in load_json(Path(args.work) / "batches.json"):
        r = c.messages.batches.retrieve(b["id"])
        print(b["lang"], b["id"], r.processing_status, dict(r.request_counts))


def cmd_collect(args):
    c = client()
    work = Path(args.work)
    spent, failed = 0.0, []
    for b in load_json(work / "batches.json"):
        lang = b["lang"]
        r = c.messages.batches.retrieve(b["id"])
        if r.processing_status != "ended":
            print(lang, "not finished yet")
            continue
        cs = load_json(work / f"chunks-{lang}.json")
        n_issues = 0
        with open(work / f"findings-{lang}.jsonl", "w", encoding="utf-8") as f:
            for res in c.messages.batches.results(b["id"]):
                if res.result.type != "succeeded":
                    failed.append(res.custom_id)
                    continue
                msg = res.result.message
                spent += cost(msg.usage, "batch")
                issues, err = parse(msg)
                if err:
                    failed.append(f"{res.custom_id} ({err})")
                    continue
                chunk = cs[int(res.custom_id.split("-")[1])]
                for issue in issues:
                    f.write(json.dumps(with_text(issue, chunk, lang), ensure_ascii=False) + "\n")
                    n_issues += 1
        print(f"{lang}: {n_issues} issues")
    print(f"spent ${spent:.2f}; failed: {failed[:20]}{' ...' if len(failed) > 20 else ''} ({len(failed)})")


def safe_fix(issue):
    """Why a fix may not go in by itself, or None when it is safe."""
    lang, en, old, new = issue.get("lang"), issue.get("en"), issue.get("old"), issue.get("fix", "").strip()
    if not en or not old:
        return "line not found"
    if issue["type"] == "quote" or issue.get("kind") == "quote":
        return "Quran/hadith quote: check by hand against the source"
    if not new or new == old:
        return "no fix given"
    holders = lambda s: sorted(re.findall(r"\{\w+\}", s))
    if holders(new) != holders(en):
        return "placeholders changed"
    if "ﷺ" in old and "ﷺ" not in new:
        return "dropped ﷺ"
    if re.findall(r"\d+", new) != re.findall(r"\d+", old) and re.findall(r"\d+", new) != re.findall(r"\d+", en):
        return "numbers changed"
    if not SCRIPT[lang].search(new):
        return "not in the language's script"
    if len(re.findall(r"[A-Za-z]{3,}", new)) > len(re.findall(r"[A-Za-z]{3,}", old)):
        return "adds English"
    # Long runs of fully voweled Arabic (an ayah or hadith) are never changed by the model.
    if re.search(r"(?:[ء-ي][ً-ْ]){6,}", old):
        return "holds voweled Arabic (ayah/hadith): check by hand"
    if len(new) > 2.2 * len(old) + 20:
        return "fix much longer than the line"
    return None


def cmd_apply(args):
    work = Path(args.work)
    for lang in args.lang.split(","):
        path = CONTENT / f"{lang}.json"
        catalog = load_json(path)
        applied, held = 0, []
        types = set(args.types.split(","))
        for line in open(work / f"findings-{lang}.jsonl", encoding="utf-8"):
            issue = json.loads(line)
            if issue["type"] not in types:
                continue
            why = safe_fix(issue)
            if not why and catalog.get(issue["en"]) != issue["old"]:
                why = "line changed since the check"
            if why:
                held.append({**issue, "held": why})
                continue
            catalog[issue["en"]] = issue["fix"].strip()
            applied += 1
        with open(path, "w", encoding="utf-8") as f:
            f.write(json.dumps(catalog, ensure_ascii=False, indent=2) + "\n")
        with open(work / f"held-{lang}.jsonl", "w", encoding="utf-8") as f:
            for issue in held:
                f.write(json.dumps(issue, ensure_ascii=False) + "\n")
        print(f"{lang}: applied {applied}, held for a person {len(held)}")


def main():
    p = argparse.ArgumentParser()
    p.add_argument("command", choices=["plan", "pilot", "submit", "status", "collect", "apply"])
    p.add_argument("--lang", default="bn,ur,ar")
    p.add_argument("--n", type=int, default=3)
    p.add_argument("--limit", type=int, default=0)
    p.add_argument("--types", default="wrong,english,unclear,term")
    p.add_argument("--work", default="/mnt/project-files/translation-check")
    args = p.parse_args()
    globals()[f"cmd_{args.command}"](args)


if __name__ == "__main__":
    main()
