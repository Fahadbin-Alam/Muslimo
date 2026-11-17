import { chromium } from "playwright";
import { pathToFileURL } from "node:url"; import { writeFileSync, readFileSync, mkdirSync, existsSync } from "node:fs";
const R = process.env.MUSLIMO_ROOT ?? "C:/Users/Mihad/Desktop/Islamic-Learning-Duolingo-Style"; const S = process.cwd().replaceAll("\\", "/");
mkdirSync(`${S}/out`, { recursive: true });
mkdirSync(`${S}/frames`, { recursive: true });
const u = p => pathToFileURL(`${R}/${p}`).href;
const css = `
@font-face{font-family:Baloo;src:url(${u("node_modules/@expo-google-fonts/baloo-bhaijaan-2/800ExtraBold/BalooBhaijaan2_800ExtraBold.ttf")})}
@font-face{font-family:Nun;src:url(${u("node_modules/@expo-google-fonts/nunito/800ExtraBold/Nunito_800ExtraBold.ttf")})}
@font-face{font-family:NunB;src:url(${u("node_modules/@expo-google-fonts/nunito/700Bold/Nunito_700Bold.ttf")})}
@font-face{font-family:Naskh;src:url(${u("node_modules/@expo-google-fonts/noto-naskh-arabic/700Bold/NotoNaskhArabic_700Bold.ttf")})}
.saw{font-family:Naskh;font-size:1.05em}
*{margin:0;box-sizing:border-box} body{width:1080px;height:1920px;overflow:hidden;position:relative;font-family:Nun;color:#fff}
.sun{background:linear-gradient(180deg,#FFC65A 0%,#FF9F45 60%,#FF8A3D 100%)} .cream{background:#FFF6E6;color:#3B2A1A}
.pad{position:absolute;inset:0;padding:260px 80px 0;display:flex;flex-direction:column}
h1{font:120px/1.05 Baloo} h2{font:84px/1.08 Baloo} p{font:48px/1.3 Nun}
.tag{display:inline-block;border-radius:999px;padding:12px 30px;font:38px Nun;align-self:flex-start;background:#FF9F45;color:#fff}
.opt{background:#fff;color:#3B2A1A;border:5px solid #E7DCCB;border-bottom-width:12px;border-radius:34px;padding:36px 40px;font:50px Nun;margin-top:30px;display:flex;gap:28px;align-items:center}
.opt b{display:inline-flex;width:76px;height:76px;border-radius:20px;background:#F1E8DA;align-items:center;justify-content:center;font:44px Baloo;color:#9a7a55;flex:none}
.opt.ok{border-color:#58CC02;background:#E9FBD9}.opt.ok b{background:#58CC02;color:#fff} .opt.dim{opacity:.4}
.quote{font:54px/1.32 NunB;background:#fff;border-left:14px solid #FF9F45;border-radius:24px;padding:44px 48px;margin-top:44px;color:#3B2A1A}
.src{font:38px/1.3 NunB;margin-top:30px;color:#8a6a45}
.foot{position:absolute;left:80px;right:80px;bottom:300px;display:flex;align-items:center;gap:22px;font:40px Nun;color:#8a6a45}
.foot img{width:96px;height:96px;border-radius:24px}`;
const foot = `<div class="foot"><img src="${u("store/graphics/google-play/icon-512.png")}">Muslimo · free on Android</div>`;
const QUIZZES = {
  "": { kind: "hadith", tag: "Hadith quiz", Q: "Who should you greet with salam?", OPTS: ["Only people you know", "People you know and people you don't", "Only people older than you"], OK: 1,
    intro: "A man asked the Prophet ﷺ which deeds of Islam are best. He said:", quote: "“To feed (the poor) and greet those whom you know and those whom you don't know.”",
    src: "Sahih al-Bukhari 28 · narrated by Abdullah ibn Amr" },
  // src/data/sahabaUnits.ts, Bilal unit
  "b-": { kind: "Sahabah", tag: "Sahabah quiz", Q: "Who freed Bilal?", OPTS: ["Umar", "Abu Bakr", "Uthman"], OK: 1,
    intro: "Umar ibn al-Khattab used to say:", quote: "“Abu Bakr is our master, and he freed our master,” meaning Bilal.",
    src: "Sahih al-Bukhari 3754 · narrated by Jabir ibn Abdullah" },
};
const frames = {};
for (const [p, z] of Object.entries(QUIZZES)) {
const opts = st => z.OPTS.map((o, i) => `<div class="opt ${st === "reveal" ? (i === z.OK ? "ok" : "dim") : ""}"><b>${"ABC"[i]}</b>${o}</div>`).join("");
Object.assign(frames, {
  [p + "hook"]: `<body class="sun"><div class="pad" style="align-items:center;text-align:center;justify-content:center;padding-top:0">
   <h1 style="margin-top:-520px">Can you answer<br>in 5 seconds?</h1><p style="margin-top:40px">A ${z.kind} quiz from Muslimo</p></div>
   <img src="${u("store/graphics/source/cover/camel.png")}" style="position:absolute;width:620px;left:230px;bottom:150px"></body>`,
  [p + "q"]: `<body class="cream"><div class="pad"><span class="tag">${z.tag}</span><h2 style="margin-top:56px">${z.Q}</h2>${opts()}</div>${foot}</body>`,
  [p + "reveal"]: `<body class="cream"><div class="pad"><span class="tag" style="background:#58CC02">Answer</span><h2 style="margin-top:56px">${z.Q}</h2>${opts("reveal")}</div>${foot}</body>`,
  [p + "quote"]: `<body class="cream"><div class="pad"><span class="tag" style="background:#58CC02">The hadith</span>
   <p style="margin-top:56px;color:#3B2A1A">${z.intro}</p>
   <div class="quote">${z.quote}</div>
   <div class="src">${z.src}</div></div>${foot}</body>`,
});
}
Object.assign(frames, {
  cta: `<body class="sun"><div class="pad" style="align-items:center;text-align:center;justify-content:center;padding-top:0">
   <img src="${u("store/graphics/google-play/icon-512.png")}" style="width:340px;border-radius:80px;border:8px solid #fff">
   <h2 style="margin-top:70px">Learn one every day</h2><p style="margin-top:30px">Free on Google Play<br>Link in bio</p></div></body>`,
});
const b = await chromium.launch({ channel: "chrome", args: ["--allow-file-access-from-files"] });
const pg = await b.newPage({ viewport: { width: 1080, height: 1920 } });
for (const [k, body] of Object.entries(frames)) {
  writeFileSync(`${S}/t.html`, `<html><head><meta charset="utf-8"><style>${css}</style></head>${body.replaceAll("ﷺ", '<span class="saw">ﷺ</span>')}</html>`);
  await pg.goto(pathToFileURL(`${S}/t.html`).href); await pg.evaluate(() => document.fonts.ready); await pg.waitForTimeout(150);
  await pg.screenshot({ path: `${S}/frames/${k}.png` });
}
const ph = f => pathToFileURL(`${R}/store/graphics/google-play/phone/${f}.png`).href, fr = k => pathToFileURL(`${S}/frames/${k}.png`).href;
const quizReel = p => [{ src: fr(p + "hook"), d: 2.2 }, { src: fr(p + "q"), d: 5, timer: true }, { src: fr(p + "reveal"), d: 2.5 }, { src: fr(p + "quote"), d: 5 }, { src: fr("cta"), d: 3 }];
const REELS = {
  "reel-4-bilal-quiz": quizReel("b-"),
  "reel-1-salam-quiz": [{ src: fr("hook"), d: 2.2 }, { src: fr("q"), d: 5, timer: true }, { src: fr("reveal"), d: 2.5 }, { src: fr("quote"), d: 5 }, { src: fr("cta"), d: 3 }],
  "reel-2-app-tour": [{ src: ph("01-learn"), d: 2.4 }, { src: ph("02-path"), d: 2.4 }, { src: ph("03-question"), d: 2.4 }, { src: ph("04-feedback"), d: 2.4 }, { src: ph("05-complete"), d: 2.4 }, { src: ph("06-topics"), d: 2.4 }, { src: fr("cta"), d: 3 }],
};
// Reel 3 uses the frames duo.mjs writes; run `node duo.mjs out2` first.
const d3 = k => pathToFileURL(`${S}/out2/frames/${k}.png`).href;
if (existsSync(`${S}/out2/frames/r3-end.png`))
  REELS["reel-3-camel-misses-you"] = [{ src: d3("r3-0"), d: 2.5 }, { src: d3("r3-1"), d: 2.5 }, { src: d3("r3-2"), d: 2.5 }, { src: d3("r3-3"), d: 3.5 }, { src: d3("r3-end"), d: 3 }];
writeFileSync(`${S}/enc.html`, `<html><body><canvas id=c width=1080 height=1920></canvas></body></html>`);
await pg.goto(pathToFileURL(`${S}/enc.html`).href);
await pg.addScriptTag({ content: readFileSync(`${S}/node_modules/mp4-muxer/build/mp4-muxer.js`, "utf8") });
// Sound: the app's own effects from assets/sounds (no music, on purpose). [time in s, file, volume]
const SFX = {
  "reel-4-bilal-quiz": [[0, "camel", 0.9], [2.2, "whoosh", 0.6], ...[3, 4, 5, 6].map(t => [t + 0.2, "node_tap", 0.7]), [7.2, "correct", 1], [9.7, "whoosh", 0.6], [14.7, "lesson_complete", 1]],
  "reel-1-salam-quiz": [[0, "camel", 0.9], [2.2, "whoosh", 0.6], ...[3, 4, 5, 6].map(t => [t + 0.2, "node_tap", 0.7]), [7.2, "correct", 1], [9.7, "whoosh", 0.6], [14.7, "lesson_complete", 1]],
  "reel-2-app-tour": [[0, "camel", 0.9], [2.4, "whoosh", 0.6], [4.8, "node_tap", 0.8], [7.2, "correct", 1], [9.6, "lesson_complete", 1], [12, "pop", 0.8], [14.4, "sparkle", 1]],
  "reel-3-camel-misses-you": [[0.2, "pop", 0.9], [2.6, "pop", 0.9], [5.1, "pop", 0.9], [7.6, "sad", 0.8], [11, "camel", 1], [11.3, "sparkle", 0.8]],
};
const wav = n => readFileSync(`${R}/assets/sounds/${n}.wav`).toString("base64");
const ONLY = process.argv.slice(2);
for (const [name, scenes] of Object.entries(REELS)) {
  if (ONLY.length && !ONLY.includes(name)) continue;
  const sfx = (SFX[name] ?? []).map(([t, f, g]) => ({ t, g, b64: wav(f) }));
  const b64 = await pg.evaluate(async ([scenes, sfx]) => {
    const FPS = 30, W = 1080, H = 1920, FADE = 0.3;
    const imgs = await Promise.all(scenes.map(s => new Promise((r, j) => { const i = new Image(); i.onload = () => r(i); i.onerror = j; i.src = s.src; })));
    const c = document.getElementById("c"), x = c.getContext("2d");
    const SR = 48000, total0 = scenes.reduce((a, s) => a + s.d, 0);
    const muxer = new Mp4Muxer.Muxer({ target: new Mp4Muxer.ArrayBufferTarget(), video: { codec: "avc", width: W, height: H },
      audio: { codec: "aac", numberOfChannels: 2, sampleRate: SR }, fastStart: "in-memory" });
    let err = null;
    // Mix the sound effects, then encode them as AAC.
    const oc = new OfflineAudioContext(2, Math.ceil(total0 * SR), SR);
    for (const e of sfx) {
      const bytes = Uint8Array.from(atob(e.b64), c => c.charCodeAt(0));
      const buf = await oc.decodeAudioData(bytes.buffer);
      const src = oc.createBufferSource(), g = oc.createGain(); g.gain.value = e.g;
      src.buffer = buf; src.connect(g); g.connect(oc.destination); src.start(e.t);
    }
    const mix = await oc.startRendering();
    { let pk = 0; for (let c = 0; c < 2; c++) for (const v of mix.getChannelData(c)) pk = Math.max(pk, Math.abs(v));
      const k = pk > 0 ? 0.89 / pk : 1; for (let c = 0; c < 2; c++) { const a = mix.getChannelData(c); for (let i = 0; i < a.length; i++) a[i] *= k; } } // loud enough for phones
    const aenc = new AudioEncoder({ output: (ch, m) => muxer.addAudioChunk(ch, m), error: e => { err = e; } });
    aenc.configure({ codec: "mp4a.40.2", sampleRate: SR, numberOfChannels: 2, bitrate: 128000 });
    const L = mix.getChannelData(0), Rr = mix.getChannelData(1), CH = 1024;
    for (let i = 0; i < L.length; i += CH) {
      const n = Math.min(CH, L.length - i), d = new Float32Array(n * 2); d.set(L.subarray(i, i + n), 0); d.set(Rr.subarray(i, i + n), n);
      const ad = new AudioData({ format: "f32-planar", sampleRate: SR, numberOfFrames: n, numberOfChannels: 2, timestamp: Math.round(i * 1e6 / SR), data: d });
      aenc.encode(ad); ad.close();
    }
    await aenc.flush();
    if (err) throw err;
    const enc = new VideoEncoder({ output: (ch, m) => muxer.addVideoChunk(ch, m), error: e => { err = e; } });
    enc.configure({ codec: "avc1.640033", width: W, height: H, bitrate: 3_500_000, framerate: FPS });
    const total = scenes.reduce((a, s) => a + s.d, 0); const N = Math.round(total * FPS);
    for (let n = 0; n < N; n++) {
      const t = n / FPS;
      let acc = 0, i = 0; while (i < scenes.length - 1 && t >= acc + scenes[i].d) acc += scenes[i++].d;
      const lt = t - acc, s = scenes[i];
      const zoom = 1 + 0.03 * (lt / s.d);
      const draw = (img, a, z) => { x.globalAlpha = a; const w = W * z, h = H * z; x.drawImage(img, (W - w) / 2, (H - h) / 2, w, h); };
      x.globalAlpha = 1; x.fillStyle = "#000"; x.fillRect(0, 0, W, H);
      if (i > 0 && lt < FADE) { draw(imgs[i - 1], 1, 1.03); draw(imgs[i], lt / FADE, zoom); } else draw(imgs[i], 1, zoom);
      x.globalAlpha = 1;
      if (s.timer) {
        const left = Math.max(0, s.d - lt); x.fillStyle = "#F1E8DA"; x.fillRect(80, 1290, 920, 34);
        x.fillStyle = left < 2 ? "#FF4B4B" : "#58CC02"; x.fillRect(80, 1290, 920 * (left / s.d), 34);
        x.font = "800 96px Nunito, Arial, sans-serif"; x.fillStyle = "#3B2A1A"; x.textAlign = "center"; x.fillText(String(Math.ceil(left)), 540, 1430);
      }
      const f = new VideoFrame(c, { timestamp: Math.round(n * 1e6 / FPS), duration: Math.round(1e6 / FPS) });
      enc.encode(f, { keyFrame: n % 60 === 0 }); f.close();
      while (enc.encodeQueueSize > 8) await new Promise(r => setTimeout(r, 5));
      if (err) throw err;
    }
    await enc.flush(); muxer.finalize();
    const buf = new Uint8Array(muxer.target.buffer); let s2 = ""; for (let k = 0; k < buf.length; k += 0x8000) s2 += String.fromCharCode(...buf.subarray(k, k + 0x8000));
    return btoa(s2);
  }, [scenes, sfx]);
  writeFileSync(`${S}/out/${name}.mp4`, Buffer.from(b64, "base64")); console.log(name, Math.round(b64.length * 0.75 / 1024), "KB");
}
await b.close();
