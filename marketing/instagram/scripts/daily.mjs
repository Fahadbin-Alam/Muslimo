// Daily posts from the Dec-Jan calendar (instagram-calendar/muslimo-instagram-dec-jan.md), rendered into
// marketing/instagram/daily/YYYY-MM-DD/ as 1.png, 2.png ... plus caption.txt (and pinned.txt for comment quizzes).
//   node daily.mjs            (needs playwright; uses the installed Google Chrome)
// Every hadith uses the app's own checked wording in src/data. Captions say "search Muslimo on Google Play"
// because the bio link can only be set from the phone. Never mention AI.
import { chromium } from "playwright";
import { pathToFileURL } from "node:url"; import { writeFileSync, mkdirSync } from "node:fs";
const R = process.env.MUSLIMO_ROOT ?? "C:/Users/Mihad/Desktop/Islamic-Learning-Duolingo-Style";
const OUT = `${R}/marketing/instagram/daily`;
const u = p => pathToFileURL(`${R}/${p}`).href;
const css = `
@font-face{font-family:Baloo;src:url(${u("node_modules/@expo-google-fonts/baloo-bhaijaan-2/800ExtraBold/BalooBhaijaan2_800ExtraBold.ttf")})}
@font-face{font-family:Nun;src:url(${u("node_modules/@expo-google-fonts/nunito/800ExtraBold/Nunito_800ExtraBold.ttf")})}
@font-face{font-family:NunB;src:url(${u("node_modules/@expo-google-fonts/nunito/700Bold/Nunito_700Bold.ttf")})}
@font-face{font-family:Naskh;src:url(${u("node_modules/@expo-google-fonts/noto-naskh-arabic/700Bold/NotoNaskhArabic_700Bold.ttf")})}
.saw{font-family:Naskh;font-size:1.05em;font-weight:700}
*{margin:0;box-sizing:border-box}
body{width:1080px;height:1350px;overflow:hidden;position:relative;font-family:Nun;color:#fff}
.sun{background:linear-gradient(180deg,#FFC65A 0%,#FF9F45 60%,#FF8A3D 100%)}
.green{background:linear-gradient(160deg,#2CC57A 0%,#14A95F 60%,#0E8F4F 100%)}
.night{background:linear-gradient(180deg,#1F2A5C 0%,#3B3F86 55%,#6B5BA8 100%)}
.winter{background:linear-gradient(180deg,#DDEEFF 0%,#B9DCFF 100%);color:#16324F}
.cream{background:#FFF6E6;color:#3B2A1A}
h1{font:104px/1.02 Baloo;text-shadow:0 5px 0 rgba(0,0,0,.10)}
h2{font:72px/1.08 Baloo}
p{font:42px/1.3 Nun}
.pad{position:absolute;inset:0;padding:90px 80px;display:flex;flex-direction:column}
.tag{display:inline-block;border-radius:999px;padding:10px 28px;font:34px Nun;align-self:flex-start;background:#FF9F45;color:#fff}
.foot{position:absolute;left:80px;right:80px;bottom:60px;display:flex;align-items:center;gap:18px;font:34px Nun}
.foot img{width:76px;height:76px;border-radius:20px;border:3px solid rgba(255,255,255,.9)}
.cream .foot,.winter .foot{color:#8a6a45}
.opt{background:#fff;color:#3B2A1A;border:4px solid #E7DCCB;border-bottom-width:10px;border-radius:30px;padding:28px 36px;font:44px Nun;margin-top:24px;display:flex;gap:26px;align-items:center}
.opt b{display:inline-flex;width:66px;height:66px;border-radius:18px;background:#F1E8DA;align-items:center;justify-content:center;font:38px Baloo;color:#9a7a55;flex:none}
.opt.ok{border-color:#58CC02;background:#E9FBD9}.opt.ok b{background:#58CC02;color:#fff}
.quote{font:50px/1.3 NunB;background:#fff;border-left:12px solid #FF9F45;border-radius:22px;padding:42px 46px;margin-top:40px;color:#3B2A1A}
.night .quote,.green .quote{background:rgba(255,255,255,.14);border-left-color:#FFE58A;color:#fff}
.src{font:34px/1.3 NunB;margin-top:26px;opacity:.85}
.phone{position:absolute;left:50%;transform:translateX(-50%);border-radius:44px;box-shadow:0 24px 60px rgba(0,0,0,.28)}
.camel{position:absolute;width:420px;right:40px;bottom:120px}`;
const icon = u("store/graphics/google-play/icon-512.png"), camel = u("store/graphics/source/cover/camel.png");
const foot = (t = "Muslimo · free on Android") => `<div class="foot"><img src="${icon}">${t}</div>`;
const shot = (f, top = 400, w = 600) => `<img class="phone" style="top:${top}px;width:${w}px" src="${u(`store/graphics/google-play/phone/${f}.png`)}">`;
const opts = (list, ok = -1) => list.map((o, i) => `<div class="opt ${i === ok ? "ok" : ""}"><b>${"ABCD"[i]}</b>${o}</div>`).join("");
const tail = "📲 Free on Android: search “Muslimo” on Google Play. iPhone coming soon.";

const DAYS = {
  // Calendar "Tue Dec 1": winter series kickoff. Sahih al-Bukhari 4474 (Abu Sa'id ibn al-Mu'alla).
  "2026-11-22": {
    slides: [
      `<body class="winter"><div class="pad"><span class="tag" style="background:#3B82F6">❄️ New: learn something every day</span>
        <h1 style="margin-top:60px;color:#16324F">Quiz #1</h1><h2 style="margin-top:30px;color:#16324F">Which surah did the Prophet ﷺ call the greatest in the Quran?</h2>
        <p style="margin-top:40px;color:#36597d">Swipe for the choices →</p></div><img class="camel" src="${camel}">${foot("Muslimo · swipe →")}</body>`,
      `<body class="cream"><div class="pad"><span class="tag">Pick one</span><h2 style="margin-top:44px">Which surah is the greatest?</h2>
        ${opts(["Ya-Sin", "Al-Fatihah", "Al-Ikhlas", "Al-Baqarah"])}<p style="margin-top:40px;font-size:38px;color:#8a6a45">⏳ Comment your pick before you swipe!</p></div>${foot()}</body>`,
      `<body class="cream"><div class="pad"><span class="tag" style="background:#58CC02">Answer</span>
        ${opts(["Al-Fatihah"], 0).replace(">A<", ">B<")}
        <div class="quote">The Prophet ﷺ said: “I will teach you the greatest surah in the Quran: Alhamdulillahi Rabbil-'alamin, the seven repeated ayahs.”</div>
        <div class="src" style="color:#8a6a45">Sahih al-Bukhari 4474 · narrated by Abu Sa'id ibn al-Mu'alla</div></div>${foot()}</body>`,
      `<body class="sun"><div class="pad" style="align-items:center;text-align:center;justify-content:center">
        <img src="${icon}" style="width:260px;border-radius:60px;border:8px solid #fff"><h2 style="margin-top:50px">See you tomorrow<br>for something new! 🐪</h2>
        <p style="margin-top:30px">5-minute lessons, every answer explained with its source</p><p style="margin-top:40px;font:46px Baloo">📲 Free on Android</p></div></body>`,
    ],
    caption: `❄️ New series: learn something new with us every day this winter!

🐪 We ask, you answer, and we all learn together.

❓ Quiz #1: Which surah did the Prophet ﷺ call the greatest in the Quran?
👉 Swipe for the answer

💬 Comment your answer BEFORE you swipe!
🔔 Follow so you don't miss tomorrow's post.
📖 Source: Sahih al-Bukhari 4474 · sunnah.com/bukhari:4474
${tail}

#muslimo #learnislam #islamicquiz #quran #muslimkids #muslimfamily`,
  },
  // Calendar "Wed Dec 2". Sahih al-Bukhari 6465 (Aishah).
  "2026-11-23": {
    slides: [
      `<body class="green"><div class="pad"><span class="tag" style="background:rgba(255,255,255,.22)">📖 Daily hadith</span>
        <p style="margin-top:60px">Asked which deeds Allah loves most, the Prophet ﷺ said:</p>
        <div class="quote">“The most regular constant deeds even though they may be few.”</div>
        <div class="src">Sahih al-Bukhari 6465 · narrated by Aishah</div></div>${foot("Muslimo · swipe →")}</body>`,
      `<body class="sun"><div class="pad"><span class="tag" style="background:rgba(255,255,255,.25)">💡 Today's takeaway</span>
        <h1 style="margin-top:60px">Pick ONE small good deed.</h1><h2 style="margin-top:30px">Keep it up every day.</h2>
        <p style="margin-top:40px">🌱 Regular and small, loved by Allah.</p></div><img class="camel" src="${camel}">${foot()}</body>`,
    ],
    caption: `🌱 Small but steady wins.

📖 The Prophet ﷺ was asked which deeds Allah loves most. He said: the most regular, constant deeds, even if few. (Sahih al-Bukhari 6465 · sunnah.com/bukhari:6465)

✅ Pick one tiny good deed today.
🔁 Keep it going tomorrow, and the day after.

💬 What small deed will you keep this winter? Tell us below 👇
${tail}

#muslimo #hadith #sunnah #islamicreminders #learnislam #muslimfamily`,
  },
  // Calendar "Sun Dec 6": comment quiz. Sahih al-Bukhari 6224 (Abu Hurairah).
  "2026-11-24": {
    slides: [
      `<body class="sun"><div class="pad"><span class="tag" style="background:rgba(255,255,255,.25)">🤧 Comment your answer 👇</span>
        <h2 style="margin-top:50px">After sneezing, what should a Muslim say first?</h2>
        ${opts(["Alhamdulillah", "Nothing", "Good luck"])}</div><img class="camel" style="width:340px;bottom:110px" src="${camel}">${foot("Muslimo · answer in the comments")}</body>`,
    ],
    caption: `🤧 Quick manners quiz for the whole family!

❓ After sneezing, what should a Muslim say first?
A) Alhamdulillah
B) Nothing
C) Good luck

💬 Comment A, B or C 👇 The answer is in the pinned comment.
👨‍👩‍👧 Ask your kids too and see who answers first!
${tail}

#muslimo #islamicquiz #sunnah #muslimkids #muslimfamily #hadith`,
    pinned: `✅ Answer: A) Alhamdulillah! Whoever sneezes says Alhamdulillah, and the one who hears says Yarhamuk Allah. 📖 Sahih al-Bukhari 6224 · sunnah.com/bukhari:6224`,
  },
  // Calendar "Sat Dec 5": app feature, real screenshots.
  "2026-11-25": {
    slides: [
      `<body class="green"><div class="pad"><h2>🔥 Your daily streak starts here</h2><p style="margin-top:20px">A short lesson a day keeps it going</p></div>${shot("02-path")}</body>`,
      `<body class="green"><div class="pad"><h2>⭐ Earn XP with every lesson</h2><p style="margin-top:20px">Finish a lesson, collect your stars</p></div>${shot("05-complete")}</body>`,
      `<body class="green"><div class="pad"><h2>✅ Every answer explained</h2><p style="margin-top:20px">With the source one tap away</p></div>${shot("04-feedback")}</body>`,
      `<body class="green"><div class="pad"><h2>📚 Pick what you want to learn</h2><p style="margin-top:20px">Prayer, Quran, manners, fasting and more</p></div>${shot("06-topics")}</body>`,
      `<body class="sun"><div class="pad" style="align-items:center;text-align:center;justify-content:center">
        <img src="${icon}" style="width:260px;border-radius:60px;border:8px solid #fff"><h2 style="margin-top:50px">Free on Android</h2>
        <p style="margin-top:24px">Search “Muslimo” on Google Play</p><p style="margin-top:40px;font-size:36px">🍎 iPhone coming soon</p></div></body>`,
    ],
    caption: `🔥 Want to keep learning between our posts?

🐪 In Muslimo you can:
🔥 Build a daily streak
⭐ Earn XP and stars with every 5-minute lesson
✅ See every answer explained, with its source one tap away
📚 Pick topics: prayer, Quran, manners, fasting and more

💬 Tag the friend you'd start a streak with 👇
${tail}

#muslimo #learnislam #islamicquiz #muslimkids #muslimfamily #islamicapp`,
  },
  // Calendar "Fri Dec 4": Jumu'ah. Jami at-Tirmidhi 3247 (An-Nu'man bin Bashir).
  "2026-11-27": {
    slides: [
      `<body class="night"><div class="pad"><span class="tag" style="background:rgba(255,255,255,.2)">🕌 Jumu'ah reminder</span>
        <p style="margin-top:60px">The Prophet ﷺ said:</p><div class="quote">“Supplication is the worship.”</div>
        <div class="src">Jami at-Tirmidhi 3247 · narrated by An-Nu'man bin Bashir</div></div>${foot("Muslimo · swipe →")}</body>`,
      `<body class="night"><div class="pad"><p style="margin-top:20px">Then he ﷺ recited:</p>
        <h2 style="margin-top:40px">“Call upon Me, I will answer you.”</h2>
        <p style="margin-top:60px">🤲 Take a moment today to make dua, big or small.</p></div><img class="camel" src="${camel}">${foot()}</body>`,
    ],
    caption: `🤲 Jumu'ah reminder

📖 The Prophet ﷺ said: Supplication is the worship. Then he recited: Call upon Me, I will answer you. (Jami at-Tirmidhi 3247 · sunnah.com/tirmidhi:3247)

💭 Dua is not only for hard times. It is worship.
✨ Ask Allah for something today, big or small.

💬 Share this with someone you love 💛
${tail}

#muslimo #jumuah #hadith #dua #islamicreminders #learnislam`,
  },
};

const b = await chromium.launch({ channel: "chrome" }); const pg = await b.newPage({ viewport: { width: 1080, height: 1350 } });
for (const [day, d] of Object.entries(DAYS)) {
  const dir = `${OUT}/${day}`; mkdirSync(dir, { recursive: true });
  for (const [i, body] of d.slides.entries()) {
    writeFileSync(`${OUT}/t.html`, `<html><head><meta charset="utf-8"><style>${css}</style></head>${body.replaceAll("ﷺ", '<span class="saw">ﷺ</span>')}</html>`);
    await pg.goto(pathToFileURL(`${OUT}/t.html`).href); await pg.evaluate(() => document.fonts.ready); await pg.waitForTimeout(150);
    await pg.screenshot({ path: `${dir}/${i + 1}.png` });
  }
  writeFileSync(`${dir}/caption.txt`, d.caption);
  if (d.pinned) writeFileSync(`${dir}/pinned.txt`, d.pinned);
  console.log(day, d.slides.length);
}
await b.close();
