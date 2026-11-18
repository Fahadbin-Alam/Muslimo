#!/usr/bin/env python3
"""
Translates the app into a new language with Claude, then checks every line a second time.

Made for Indonesian (id). The new language stays hidden in the app until a native speaker has checked it
(see PREVIEW_LANGUAGE_OPTIONS in src/i18n.ts).

Reads the API key from MUSLIMO_CLAUDE_KEY (never from a file, never written anywhere). Work files go to --work,
by default /mnt/project-files/indonesian/. Every API call's cost is added to spend.json there, and no command
starts work that would take the total past --budget (dollars).

  python3 -I scripts/i18n/translate_language.py plan --upto 400000      # requests and rough cost
  python3 -I scripts/i18n/translate_language.py pilot --n 2             # a few requests now, real cost
  python3 -I scripts/i18n/translate_language.py submit --upto 400000    # screens + first lessons, as a batch
  python3 -I scripts/i18n/translate_language.py status
  python3 -I scripts/i18n/translate_language.py collect                 # translated-id.jsonl
  python3 -I scripts/i18n/translate_language.py check-submit            # second look at every line
  python3 -I scripts/i18n/translate_language.py check-collect
  python3 -I scripts/i18n/translate_language.py apply                   # writes src/translations/{ui,content}/id.json

--upto counts English characters of lesson text, in app order, so the first lessons a new learner meets come first.

Rules (Fahad's): the meaning stays the English meaning, nothing is added or left out. Arabic text (ayah, hadith,
du'a) is copied exactly as it is. Lines that carry the meaning of an ayah, hadith or du'a are translated word for
word and listed for a person to check against an approved Indonesian translation. {placeholders}, digits and ﷺ stay.
"""
import argparse
import difflib
import json
import os
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / "scripts/i18n/content-source.json"
MODEL = "claude-opus-5-5"
LANG, LANG_NAME = "id", "Indonesian"
PRICE = {"batch": (2.0, 10.0, 0.20, 2.5), "now": (4.0, 20.0, 0.40, 5.0)}  # in, out, cache read, cache write per M
CHUNK_CHARS = 5000
SKIP_DONE = False  # --skip-done: leave out lines the app already has in Indonesian (a later part of the work)
ARABIC = re.compile(r"[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]+(?:[\s؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]*[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]+)?")
PLACEHOLDER = re.compile(r"\{\w+\}")

GLOSSARY = """Allah (never "Tuhan" for Allah's name), Nabi Muhammad ﷺ, Rasulullah ﷺ, nabi, rasul, sahabat, \
Al-Qur'an, ayat, surah, hadis, sunah, salat (not "sembahyang"), wudu, tayamum, azan, iqamah, puasa, Ramadan, sahur, \
iftar / berbuka puasa, zakat, sedekah, haji, umrah, Ka'bah, Makkah, Madinah, masjid, doa, zikir, iman, takwa, \
akhlak, surga (Jannah), neraka (Jahannam), hari kiamat, Idulfitri, Iduladha, malaikat, Jibril, Iblis, setan, \
syahadat, tauhid, syirik, halal, haram, Bismillah, Alhamdulillah, Subhanallah, Assalamu'alaikum. \
Names: use the spelling Indonesian Muslims use: Abu Bakar, Umar bin Khattab, Utsman bin Affan, Ali bin Abi Thalib, \
Aisyah, Khadijah, Fatimah, Bilal, Ibrahim, Ismail, Ishaq, Yaqub, Yusuf, Musa, Harun, Isa, Maryam, Nuh, Adam, Hawa, \
Sulaiman, Dawud, Yunus, Ayyub, Zakaria, Yahya, Luth, Hud, Shaleh, Syuaib, Idris, Ilyas, Ilyasa, Dzulkifli. \
Book names stay as written (Sahih al-Bukhari, Sahih Muslim, Sunan Abi Dawud, Jami' at-Tirmidhi, ...)."""

SYSTEM = f"""You translate Muslimo, a Duolingo-style app that teaches Islam (Quran, hadith, Seerah, Prophets, manners, \
prayer) to all ages, including young children, from English into {LANG_NAME} (Bahasa Indonesia).

Each input line is JSON with an "id", a "kind" and the English "en". Lines come in app order, so nearby lines are from \
the same lesson: use them for context. Return every id exactly once, with "text": the {LANG_NAME} line.

How to write:
- Standard, natural Bahasa Indonesia as a good Indonesian Islamic teacher would write for children and families: \
simple, warm, clear. Address the learner as "kamu". Short like the English; same tone (buttons stay short).
- The meaning stays EXACTLY the English meaning: add nothing, leave nothing out, no extra respect phrases or \
religious content the English does not have (do not add SWT, AS, RA unless the English has them).
- Copy exactly as they are: every {{placeholder}}, every digit and number, the ﷺ sign, emoji, and ALL Arabic-script \
text (an ayah, hadith or du'a in Arabic is never changed, re-voweled or shortened).
- Transliterated Arabic words a learner is meant to say (As-salamu alaykum, Bismillah, SubhanAllah, Allahu Akbar, \
surah names) keep their sound; use the common Indonesian spelling where there is one.
- If the line gives the MEANING of a Quran ayah, a hadith (words of the Prophet ﷺ) or a du'a, translate it closely \
and literally, word for word in sense, never paraphrased or improved, and set "scripture": true. Otherwise false.
- Glossary: {GLOSSARY}
- A source line like "Sahih al-Bukhari 6227" or "Quran 2:255" keeps the book name and numbers ("Quran" becomes \
"Al-Qur'an")."""

SCHEMA = {
    "type": "object",
    "properties": {
        "lines": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {"id": {"type": "integer"}, "text": {"type": "string"}, "scripture": {"type": "boolean"}},
                "required": ["id", "text", "scripture"],
                "additionalProperties": False,
            },
        }
    },
    "required": ["lines"],
    "additionalProperties": False,
}

CHECK_SYSTEM = f"""You check a new {LANG_NAME} translation of Muslimo, a Duolingo-style app that teaches Islam to all \
ages, including young children. Each line is the English and its {LANG_NAME} translation, in app order.

Report ONLY real problems a {LANG_NAME} reader would notice:
- "wrong": the meaning differs from the English, a fact/name/number changed, a negation flipped, a part is missing, \
or something was added (including respect phrases or religious words the English does not have).
- "english": English words left untranslated (names and transliterated Arabic words are fine).
- "unclear": broken grammar, a wrong or odd word, or wording a child would find confusing.
- "term": a wrong or non-standard Islamic term or name spelling for Indonesian Muslims.
Most lines are fine; an empty list is a normal answer. Do NOT report style preferences or acceptable synonyms.

For each problem give "fix": the whole corrected {LANG_NAME} line, meaning exactly the English. Keep every \
{{placeholder}}, digit, the ﷺ sign and every piece of Arabic-script text exactly as in the English line.
Glossary: {GLOSSARY}
Write "problem" in one short plain English sentence."""

CHECK_SCHEMA = {
    "type": "object",
    "properties": {
        "issues": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "id": {"type": "integer"},
                    "type": {"type": "string", "enum": ["wrong", "english", "unclear", "term"]},
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


def load(path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def save(path, data):
    tmp = Path(str(path) + ".tmp")
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=1)
    tmp.replace(path)


def read_jsonl(path):
    if not Path(path).exists():
        return []
    with open(path, encoding="utf-8") as f:
        return [json.loads(line) for line in f if line.strip()]


def ui_strings():
    out = subprocess.run(["node", str(ROOT / "scripts/i18n/ui-strings.cjs"), "--json"], capture_output=True, text=True, check=True)
    return json.loads(out.stdout)


def entries(upto, ranked=None):
    """(key, kind, english): screens first (key "ui:N"), then lesson text in the order a new learner meets it.

    With a ranked source (lines tagged with how far along a topic's path they first appear: 0 for topic and unit
    names and the placement questions, n for a topic's n-th lesson), every line up to rank `upto` is taken.
    Without one, lesson text is taken in catalog order up to `upto` English characters."""
    out = [(f"ui:{i}", "ui", text) for i, text in enumerate(ui_strings())]
    seen = {text for _, _, text in out}
    if SKIP_DONE:
        done = set(load(ROOT / f"src/translations/ui/{LANG}.json")) | set(load(ROOT / f"src/translations/content/{LANG}.json"))
        out = [e for e in out if e[2] not in done]
        seen |= done
    source = load(ranked) if ranked else load(SOURCE)
    if ranked:
        order = sorted(range(len(source)), key=lambda i: source[i]["rank"])
        pick = [i for i in order if source[i]["rank"] <= upto]
    else:
        pick, size = [], 0
        for i, e in enumerate(source):
            if size >= upto:
                break
            pick.append(i)
            size += len(e["text"])
    for i in pick:
        e = source[i]
        if e["text"] in seen:
            continue
        seen.add(e["text"])
        out.append((f"c:{i}", e["kind"], e["text"]))
    return out


def chunked(items, size_of):
    out, cur, size = [], [], 0
    for item in items:
        cur.append(item)
        size += size_of(item)
        if size >= CHUNK_CHARS:
            out.append(cur)
            cur, size = [], 0
    if cur:
        out.append(cur)
    return out


def translate_params(chunk):
    lines = "\n".join(json.dumps({"id": n, "kind": kind, "en": en}, ensure_ascii=False) for n, (_, kind, en) in enumerate(chunk))
    return {
        "model": MODEL,
        "max_tokens": 32000,
        "system": [{"type": "text", "text": SYSTEM, "cache_control": {"type": "ephemeral"}}],
        "output_config": {"effort": "low", "format": {"type": "json_schema", "schema": SCHEMA}},
        "messages": [{"role": "user", "content": f"Translate these {len(chunk)} lines:\n{lines}"}],
    }


def check_params(chunk):
    lines = "\n".join(json.dumps({"id": n, "en": en, LANG: tr}, ensure_ascii=False) for n, (_, en, tr) in enumerate(chunk))
    return {
        "model": MODEL,
        "max_tokens": 32000,
        "system": [{"type": "text", "text": CHECK_SYSTEM, "cache_control": {"type": "ephemeral"}}],
        "output_config": {"effort": "low", "format": {"type": "json_schema", "schema": CHECK_SCHEMA}},
        "messages": [{"role": "user", "content": f"Check these {len(chunk)} lines:\n{lines}"}],
    }


def client():
    import anthropic

    key = os.environ.get("MUSLIMO_CLAUDE_KEY")
    if not key:
        sys.exit("MUSLIMO_CLAUDE_KEY is not set.")
    return anthropic.Anthropic(api_key=key, base_url="https://api.anthropic.com", max_retries=4)


def cost(usage, mode):
    pin, pout, pread, pwrite = PRICE[mode]
    cw = getattr(usage, "cache_creation_input_tokens", 0) or 0
    cr = getattr(usage, "cache_read_input_tokens", 0) or 0
    return (usage.input_tokens * pin + usage.output_tokens * pout + cr * pread + cw * pwrite) / 1e6


class Ledger:
    def __init__(self, work, budget):
        self.path = work / "spend.json"
        self.data = load(self.path) if self.path.exists() else {"spent": {}, "reserved": {}}
        self.budget = budget

    def total(self):
        return sum(self.data["spent"].values()) + sum(self.data["reserved"].values())

    def reserve(self, name, usd):
        if self.total() + usd > self.budget:
            sys.exit(f"Stopped: {name} would need ~${usd:.2f}; spent+reserved ${self.total():.2f} of ${self.budget:.2f}.")
        self.data["reserved"][name] = usd
        save(self.path, self.data)

    def spend(self, name, usd, add=True):
        """add=False for a batch's total, which collecting again must not count twice."""
        self.data["reserved"].pop(name, None)
        self.data["spent"][name] = round((self.data["spent"].get(name, 0) if add else 0) + usd, 4)
        save(self.path, self.data)


def estimate(chunks, mode="batch", out_ratio=1.6):
    """Rough dollars: input ~ English/3.6 chars per token + JSON; output ~ out_ratio times the English tokens."""
    pin, pout, _, _ = PRICE[mode]
    usd = 0.0
    for chunk in chunks:
        chars = sum(len(e[2]) for e in chunk) + 40 * len(chunk)
        tin = 1300 + chars / 3.6
        usd += (tin * pin + tin * out_ratio * pout) / 1e6
    return usd


def guard(english, text):
    """Why a translated line cannot be used, or None."""
    if not text.strip():
        return "empty"
    if sorted(PLACEHOLDER.findall(english)) != sorted(PLACEHOLDER.findall(text)):
        return "placeholder"
    if "ﷺ" in english and "ﷺ" not in text:
        return "honorific"
    for arabic in ARABIC.findall(english):
        if arabic not in text:
            return "arabic changed"
    if ARABIC.search(text) and not ARABIC.search(english):
        return "arabic added"
    if re.sub(r"\D", "", english) and sorted(re.findall(r"\d+", english)) != sorted(re.findall(r"\d+", text)):
        return "numbers"
    return None


def cmd_plan(a, work):
    items = entries(a.upto, a.ranked)
    ch = chunked(items, lambda e: len(e[2]))
    ui = sum(1 for e in items if e[1] == "ui")
    print(f"{len(items)} lines ({ui} screen, {len(items) - ui} lesson), {len(ch)} requests, ~${estimate(ch):.2f} to translate (batch)")
    print(f"second look ~${estimate(ch, out_ratio=0.15) * 2.2:.2f} (batch)")


def cmd_pilot(a, work):
    ledger = Ledger(work, a.budget)
    ch = chunked(entries(a.upto, a.ranked), lambda e: len(e[2]))[: a.n]
    ledger.reserve("pilot", estimate(ch, "now") * 1.5)
    c, spent = client(), 0.0
    out = []
    for chunk in ch:
        with c.messages.stream(**translate_params(chunk)) as stream:
            msg = stream.get_final_message()
        spent += cost(msg.usage, "now")
        data = json.loads(next(b.text for b in msg.content if b.type == "text"))
        for line in data["lines"]:
            key, kind, en = chunk[line["id"]]
            out.append({"key": key, "kind": kind, "en": en, LANG: line["text"], "scripture": line["scripture"], "guard": guard(en, line["text"])})
        print(msg.usage)
    ledger.spend("pilot", spent)
    with open(work / "pilot.jsonl", "w", encoding="utf-8") as f:
        for row in out:
            f.write(json.dumps(row, ensure_ascii=False) + "\n")
    chars = sum(len(e[2]) for chunk in ch for e in chunk)
    print(f"pilot ${spent:.3f} for {chars} English chars -> ${spent / chars * 1e6 / 2:.2f} per million chars at batch price")


def submit(work, ledger, name, requests, usd):
    ledger.reserve(name, usd)
    batch = client().messages.batches.create(requests=requests)
    batches = load(work / "batches.json") if (work / "batches.json").exists() else {}
    batches[name] = batch.id
    save(work / "batches.json", batches)
    print(name, batch.id, len(requests), f"reserved ${usd:.2f}")


def cmd_submit(a, work):
    ledger = Ledger(work, a.budget)
    items = entries(a.upto, a.ranked)
    ch = chunked(items, lambda e: len(e[2]))
    save(work / "chunks.json", [[list(e) for e in chunk] for chunk in ch])
    requests = [{"custom_id": f"t{n}", "params": translate_params(chunk)} for n, chunk in enumerate(ch)]
    submit(work, ledger, "translate", requests, estimate(ch) * 1.25)


def cmd_status(a, work):
    c = client()
    for name, bid in load(work / "batches.json").items():
        b = c.messages.batches.retrieve(bid)
        print(name, bid, b.processing_status, b.request_counts)


def results(work, name):
    c = client()
    bid = load(work / "batches.json")[name]
    b = c.messages.batches.retrieve(bid)
    if b.processing_status != "ended":
        sys.exit(f"{name} not done: {b.request_counts}")
    spent, out, failed = 0.0, {}, []
    for r in c.messages.batches.results(bid):
        if r.result.type != "succeeded":
            failed.append(r.custom_id)
            continue
        msg = r.result.message
        spent += cost(msg.usage, "batch")
        try:
            out[r.custom_id] = json.loads(next(x.text for x in msg.content if x.type == "text"))
        except Exception:
            failed.append(r.custom_id)
    return spent, out, failed


def cmd_collect(a, work):
    ledger = Ledger(work, a.budget)
    spent, out, failed = results(work, "translate")
    ch = load(work / "chunks.json")
    rows, missing = [], []
    for n, chunk in enumerate(ch):
        got = {line["id"]: line for line in out.get(f"t{n}", {}).get("lines", []) if 0 <= line["id"] < len(chunk)}
        for i, (key, kind, en) in enumerate(chunk):
            line = got.get(i)
            if not line:
                missing.append(key)
                continue
            rows.append({"key": key, "kind": kind, "en": en, LANG: line["text"], "scripture": line["scripture"], "guard": guard(en, line["text"])})
    ledger.spend("translate", spent, add=False)
    with open(work / "translated.jsonl", "w", encoding="utf-8") as f:
        for row in rows:
            f.write(json.dumps(row, ensure_ascii=False) + "\n")
    bad = sum(1 for r in rows if r["guard"])
    print(f"translate ${spent:.2f}; {len(rows)} lines, {bad} failed the guard, {len(missing)} missing, {len(failed)} failed requests")


def cmd_check_submit(a, work):
    ledger = Ledger(work, a.budget)
    rows = [r for r in read_jsonl(work / "translated.jsonl") if not r["guard"]]
    ch = chunked([(r["key"], r["en"], r[LANG]) for r in rows], lambda e: len(e[1]))
    save(work / "check-chunks.json", [[list(e) for e in chunk] for chunk in ch])
    requests = [{"custom_id": f"k{n}", "params": check_params(chunk)} for n, chunk in enumerate(ch)]
    usd = sum((1200 + sum(len(e[1]) + len(e[2]) + 30 for e in chunk) / 3.4) * 2.0 / 1e6 + 400 * 10 / 1e6 for chunk in ch) * 1.5
    submit(work, ledger, "check", requests, usd)


def realign(chunk, issue):
    """The line an issue is about. In long requests the model often gives a neighbour's id, so the line whose
    translation the fix most resembles wins; an issue that resembles no line is dropped."""
    if not issue["fix"]:
        return None
    scores = [difflib.SequenceMatcher(None, issue["fix"].lower(), tr.lower()).ratio() for _, _, tr in chunk]
    best = max(range(len(chunk)), key=lambda j: scores[j])
    said = issue["id"] if 0 <= issue["id"] < len(chunk) else None
    if best == said and scores[best] >= 0.45:
        return best
    if scores[best] >= 0.6:
        return best
    return None


def cmd_check_collect(a, work):
    ledger = Ledger(work, a.budget)
    spent, out, failed = results(work, "check")
    ch = load(work / "check-chunks.json")
    fixes = []
    for n, chunk in enumerate(ch):
        for issue in out.get(f"k{n}", {}).get("issues", []):
            line = realign(chunk, issue)
            if line is None:
                continue
            key, en, tr = chunk[line]
            if issue["fix"] == tr:
                continue
            fixes.append({"key": key, "en": en, "was": tr, "type": issue["type"], "problem": issue["problem"], "fix": issue["fix"], "guard": guard(en, issue["fix"])})
    ledger.spend("check", spent, add=False)
    with open(work / "check-fixes.jsonl", "w", encoding="utf-8") as f:
        for row in fixes:
            f.write(json.dumps(row, ensure_ascii=False) + "\n")
    print(f"check ${spent:.2f}; {len(fixes)} fixes ({sum(1 for x in fixes if not x['guard'])} usable), {len(failed)} failed requests")


def cmd_apply(a, work):
    rows = {r["key"]: r for r in read_jsonl(work / "translated.jsonl") if not r["guard"]}
    for fix in read_jsonl(work / "check-fixes.jsonl"):
        if not fix["guard"] and fix["key"] in rows:
            rows[fix["key"]][LANG] = fix["fix"]
            rows[fix["key"]]["fixed"] = True
    ui, content = {}, {}
    for r in rows.values():
        if r["kind"] == "ui":
            ui[r["en"]] = r[LANG]
        elif r["kind"] != "source" or r[LANG] != r["en"]:
            content[r["en"]] = r[LANG]
    for half, data in (("ui", ui), ("content", content)):
        path = ROOT / f"src/translations/{half}/{LANG}.json"
        if SKIP_DONE and path.exists():
            data = {**load(path), **data}
        with open(path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
            f.write("\n")
        print(path.relative_to(ROOT), len(data))
    scripture = [r for r in rows.values() if r["scripture"]]
    with open(work / "scripture-lines.jsonl", "a" if SKIP_DONE else "w", encoding="utf-8") as f:
        for r in scripture:
            f.write(json.dumps({"en": r["en"], LANG: r[LANG]}, ensure_ascii=False) + "\n")
    print(f"{len(scripture)} ayah/hadith/du'a meaning lines listed for a person in scripture-lines.jsonl")


def main():
    p = argparse.ArgumentParser()
    p.add_argument("command", choices=["plan", "pilot", "submit", "status", "collect", "check-submit", "check-collect", "apply"])
    p.add_argument("--upto", type=int, default=400_000, help="English characters of lesson text, in app order")
    p.add_argument("--ranked", help="ranked source (see entries); then --upto is the last lesson rank to take")
    p.add_argument("--n", type=int, default=2)
    p.add_argument("--budget", type=float, default=40.0)
    p.add_argument("--work", default="/mnt/project-files/indonesian")
    p.add_argument("--skip-done", action="store_true", help="only lines the app does not have in Indonesian yet")
    a = p.parse_args()
    globals()["SKIP_DONE"] = a.skip_done
    work = Path(a.work)
    work.mkdir(parents=True, exist_ok=True)
    globals()["cmd_" + a.command.replace("-", "_")](a, work)


if __name__ == "__main__":
    main()
