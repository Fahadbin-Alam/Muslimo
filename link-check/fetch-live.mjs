// Fetches the live texts Muslimo's source links open, so every highlight can be checked against what the page shows.
// Run: node fetch-live.mjs   (Node 18+). Resumable: re-run to continue. Writes out/*.json
import fs from "node:fs";
import zlib from "node:zlib";
const OUT = "out";
fs.mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const UA = { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36", Accept: "text/html,application/json" };
async function get(url, json) {
  for (let i = 0; i < 6; i++) {
    try {
      const res = await fetch(url, { headers: UA });
      if (res.status === 429 || res.status >= 500) { await sleep(3000 * (i + 1)); continue; }
      if (!res.ok) return { error: res.status };
      return json ? await res.json() : await res.text();
    } catch (e) { await sleep(2000 * (i + 1)); }
  }
  return { error: "failed" };
}
function load(name) { try { return JSON.parse(fs.readFileSync(`${OUT}/${name}.json`, "utf8")); } catch { return {}; } }
function save(name, data) { fs.writeFileSync(`${OUT}/${name}.json`, JSON.stringify(data)); }
async function pool(items, n, fn) { let i = 0; await Promise.all(Array.from({ length: n }, async () => { while (i < items.length) { const it = items[i++]; await fn(it); } })); }

// 1. Sunnah.com pages (raw HTML of the hadith part).
const sunnahUrls = JSON.parse(fs.readFileSync("sunnah-urls.json", "utf8"));
const sunnah = load("sunnah");
let done = 0;
await pool(sunnahUrls.filter((u) => !sunnah[u] || sunnah[u].error), 3, async (u) => {
  const html = await get(u, false);
  if (typeof html === "string") {
    const start = html.indexOf('class="book_info"') >= 0 ? html.indexOf('class="book_info"') : html.indexOf("<body");
    const end = html.indexOf('id="footer"') > 0 ? html.indexOf('id="footer"') : html.length;
    sunnah[u] = { html: html.slice(start, end) };
  } else sunnah[u] = html;
  if (++done % 100 === 0) { save("sunnah", sunnah); console.log("sunnah", done); }
  await sleep(250);
});
save("sunnah", sunnah);
console.log("sunnah done", Object.values(sunnah).filter((x) => x.error).length, "errors");

// 2. Quran.com: chapter verse counts, Saheeh International translation, and the two tafsirs by ayah (one call per group).
const chapters = (await get("https://api.quran.com/api/v4/chapters", true)).chapters;
if (!chapters) { console.log("api.quran.com not reachable"); process.exit(1); }
const trans = load("trans");
for (const c of chapters) {
  if (trans[c.id]) continue;
  const d = await get(`https://api.quran.com/api/v4/quran/translations/20?chapter_number=${c.id}`, true);
  trans[c.id] = d.translations ? d.translations.map((t) => t.text) : d;
  await sleep(200);
}
save("trans", trans);
console.log("translations done");
for (const [name, id] of [["kathir", 169], ["saadi", 91]]) {
  const taf = load(name);
  for (const c of chapters) {
    let a = 1;
    while (a <= c.verses_count) {
      const key = `${c.id}:${a}`;
      if (taf[key]) { a = (taf[key].to ?? a) + 1; continue; }
      const d = await get(`https://api.quran.com/api/v4/tafsirs/${id}/by_ayah/${key}`, true);
      const t = d.tafsir;
      if (!t) { taf[key] = { error: d.error ?? "none", to: a }; a++; continue; }
      const keys = Object.keys(t.verses ?? {}).map((k) => Number(k.split(":")[1])).filter((n) => n >= a);
      const to = keys.length ? Math.max(...keys) : a;
      taf[key] = { text: t.text, from: keys.length ? Math.min(a, ...keys) : a, to };
      for (let b = a + 1; b <= to; b++) taf[`${c.id}:${b}`] = { same: key, to };
      a = to + 1;
      await sleep(150);
    }
    save(name, taf);
    console.log(name, c.id);
  }
}
for (const n of ["sunnah", "trans", "kathir", "saadi"]) fs.writeFileSync(`${OUT}/${n}.json.gz`, zlib.gzipSync(fs.readFileSync(`${OUT}/${n}.json`)));
console.log("ALL DONE");
