// Profile banners for X and Reddit, in the same sunset-and-camel look as the app cover.
// node marketing/social/banners.mjs  -> writes x-banner.png and reddit-banner.png next to this script.
import { chromium } from "playwright";
import { pathToFileURL, fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { writeFileSync, rmSync } from "node:fs";
// Copy this script into a folder with playwright installed if needed; REPO and OUT_DIR then point back here.
const HERE = process.env.OUT_DIR || dirname(fileURLToPath(import.meta.url));
const R = process.env.REPO || `${HERE}/../..`;
const u = p => pathToFileURL(`${R}/${p}`).href;
const css = `
@font-face{font-family:Baloo;src:url(${u("node_modules/@expo-google-fonts/baloo-bhaijaan-2/800ExtraBold/BalooBhaijaan2_800ExtraBold.ttf")})}
@font-face{font-family:Nun;src:url(${u("node_modules/@expo-google-fonts/nunito/800ExtraBold/Nunito_800ExtraBold.ttf")})}
*{margin:0;box-sizing:border-box}
body{overflow:hidden;position:relative;background:linear-gradient(180deg,#FFC65A 0%,#FF9F45 60%,#FF8A3D 100%)}
.sun{position:absolute;border-radius:50%;background:#FFE58A;box-shadow:0 0 0 40px rgba(255,229,138,.35)}
.dune{position:absolute;border-radius:50%;background:#F7D58A}
img{position:absolute}
.txt{position:absolute;color:#fff;display:flex;flex-direction:column;justify-content:center}
h1{font-family:Baloo;line-height:1;text-shadow:0 4px 0 rgba(0,0,0,.12)}
p{font-family:Nun;line-height:1.15}
.chips{display:flex;flex-wrap:wrap;gap:12px}
.chip{background:rgba(255,255,255,.2);border:2px solid rgba(255,255,255,.4);color:#fff;font-family:Nun;padding:7px 18px;border-radius:999px}
`;
const chips = (fs) => `<div class="chips" style="margin-top:22px">${["Quran","Salah","Sahabah","Hadith","Manners"].map(c=>`<span class="chip" style="font-size:${fs}px">${c}</span>`).join("")}</div>`;
const banners = {
  // X: 1500x500. The round profile photo sits over the bottom-left, so text starts further right.
  "x-banner": [1500, 500, `
    <div class="sun" style="width:360px;height:360px;left:1060px;top:30px"></div>
    <div class="dune" style="left:700px;right:-400px;top:390px;height:420px"></div>
    <img src="${u("store/graphics/source/cover/palm.png")}" style="width:160px;left:1310px;top:240px">
    <img src="${u("store/graphics/source/cover/camel.png")}" style="width:440px;left:960px;top:90px">
    <div class="txt" style="left:400px;top:0;bottom:60px;width:600px">
      <h1 style="font-size:96px">Muslimo</h1>
      <p style="font-size:40px;margin-top:14px">Learn Islam a little every day</p>
      ${chips(22)}
      <p style="font-size:24px;margin-top:22px;opacity:.95">Coming soon to Android &amp; iPhone</p></div>`],
  // Reddit profile banner: wide and short; Reddit crops the edges on small screens, so keep it centred.
  "reddit-banner": [1920, 384, `
    <div class="sun" style="width:300px;height:300px;left:1170px;top:20px"></div>
    <div class="dune" style="left:800px;right:-300px;top:300px;height:380px"></div>
    <img src="${u("store/graphics/source/cover/palm.png")}" style="width:130px;left:1390px;top:190px">
    <img src="${u("store/graphics/source/cover/camel.png")}" style="width:320px;left:1110px;top:50px">
    <div class="txt" style="left:500px;top:0;bottom:0;width:600px">
      <h1 style="font-size:84px">Muslimo</h1>
      <p style="font-size:34px;margin-top:10px">Learn Islam a little every day</p>
      ${chips(20)}</div>`],
  // LinkedIn company cover: 1128x191 (rendered at 2x). The square logo overlaps the bottom-left.
  "linkedin-cover": [1128, 191, `
    <div class="sun" style="width:160px;height:160px;left:840px;top:10px"></div>
    <div class="dune" style="left:560px;right:-200px;top:150px;height:240px"></div>
    <img src="${u("store/graphics/source/cover/palm.png")}" style="width:72px;left:975px;top:88px">
    <img src="${u("store/graphics/source/cover/camel.png")}" style="width:180px;left:820px;top:18px">
    <div class="txt" style="left:300px;top:0;bottom:0;width:500px">
      <h1 style="font-size:54px">Muslimo</h1>
      <p style="font-size:22px;margin-top:4px">Learn Islam a little every day</p>
      <p style="font-size:15px;margin-top:10px;opacity:.95">Quran · Salah · Sahabah · Hadith · Manners</p></div>`, 2],
};
const browser = await chromium.launch({ channel: "chrome" });
const only = process.argv[2];
for (const [name, [w, h, body, scale = 1]] of Object.entries(banners)) {
  if (only && name !== only) continue;
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: scale });
  // Load from a file so the file:// fonts and images are allowed.
  const tmp = `${HERE}/_${name}.html`;
  writeFileSync(tmp, `<html><head><meta charset="utf-8"><style>${css}</style></head><body style="width:${w}px;height:${h}px">${body}</body></html>`);
  await page.goto(pathToFileURL(tmp).href);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${HERE}/${name}.png` });
  await page.close();
  rmSync(tmp);
}
await browser.close();
