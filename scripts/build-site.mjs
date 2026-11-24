// Builds the public support, privacy, terms and account deletion pages into _site/.
// Values in site/site.config.json replace {{KEY}} placeholders; the build fails while any is blank
// so a page with placeholder text can never be published. {{> name}} pastes in site/partials/name.html
// (the shared top bar and footer), and links to the page being built are marked aria-current="page".
import { copyFileSync, cpSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const siteDir = join(root, "site");
const outDir = join(root, "_site");
const config = JSON.parse(readFileSync(join(siteDir, "site.config.json"), "utf8"));

const blank = Object.entries(config).filter(([, value]) => !String(value).trim()).map(([key]) => key);
if (blank.length > 0) {
  console.error(`Fill in ${blank.join(", ")} in site/site.config.json before building the site.`);
  process.exit(1);
}

const escapeHtml = (value) =>
  String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const partialsDir = join(siteDir, "partials");
const partial = (file, name) => {
  try {
    return readFileSync(join(partialsDir, `${name}.html`), "utf8").trimEnd();
  } catch {
    console.error(`${file} uses {{> ${name}}}, but site/partials/${name}.html does not exist.`);
    process.exit(1);
  }
};

for (const file of readdirSync(siteDir)) {
  if (file === "site.config.json" || file === "partials" || file === "links.json") {
    continue;
  }

  if (statSync(join(siteDir, file)).isDirectory()) {
    cpSync(join(siteDir, file), join(outDir, file), { recursive: true });
    continue;
  }

  if (!file.endsWith(".html")) {
    copyFileSync(join(siteDir, file), join(outDir, file));
    continue;
  }

  const self = file === "index.html" ? "./" : file;
  const withPartials = readFileSync(join(siteDir, file), "utf8")
    .replace(/\{\{>\s*(\w+)\s*\}\}/g, (match, name) => partial(file, name))
    .replace(/<a ([^>]*?)href="([^"]+)"/g, (match, before, href) =>
      href === self && !before.includes("aria-current") ? `<a ${before}href="${href}" aria-current="page"` : match
    );
  const html = withPartials.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    if (!(key in config)) {
      console.error(`${file} uses {{${key}}}, which is not in site/site.config.json.`);
      process.exit(1);
    }
    return escapeHtml(config[key]);
  });
  writeFileSync(join(outDir, file), html);
}

buildTrackingLinks();

copyFileSync(join(root, "assets", "icon.png"), join(outDir, "icon.png"));
copyFileSync(join(root, "assets", "favicon.png"), join(outDir, "favicon.png"));
writeFileSync(join(outDir, ".nojekyll"), "");

// Short tracking links from site/links.json: go/<name>/index.html sends the visitor to the store at once
// (Google Play with utm tags, so Play Console shows installs per source) and, without waiting, asks the server
// to count one click. iPhones go to the App Store link once it is filled in, else the home page's "coming soon".
function buildTrackingLinks() {
  const links = JSON.parse(readFileSync(join(siteDir, "links.json"), "utf8"));
  const names = Object.keys(links.sources || {});
  const bad = names.filter((name) => !/^[a-z0-9][a-z0-9-]{0,31}$/.test(name));
  if (bad.length > 0) {
    console.error(`site/links.json: use only lowercase letters, numbers and dashes in link names (${bad.join(", ")}).`);
    process.exit(1);
  }
  const published = { playStoreUrl: links.playStoreUrl, appStoreUrl: links.appStoreUrl, links: [] };
  for (const name of names) {
    const { medium = "social", label = name } = links.sources[name];
    const referrer = `utm_source=${name}&utm_medium=${medium}&utm_campaign=muslimo-link`;
    const play = `${links.playStoreUrl}&referrer=${encodeURIComponent(referrer)}`;
    let iphone = links.iphoneSoonPage;
    if (String(links.appStoreUrl || "").trim()) {
      const appStore = new URL(links.appStoreUrl);
      appStore.searchParams.set("ct", name);
      appStore.searchParams.set("mt", "8");
      iphone = appStore.toString();
    }
    const target = { play, iphone, api: `${links.clickApi}?s=${name}` };
    const page = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex">
  <title>Muslimo: Learn Islam Daily</title>
  <meta property="og:title" content="Muslimo: Learn Islam Daily">
  <meta property="og:description" content="Learn the Quran, hadith, the Prophets and Islamic history in a few minutes a day. Free.">
  <meta property="og:image" content="https://fahadbin-alam.github.io/Muslimo/icon.png">
  <link rel="icon" href="../../favicon.png">
  <noscript><meta http-equiv="refresh" content="0; url=${escapeHtml(play)}"></noscript>
  <script>
    (function () {
      var t = ${JSON.stringify(target)};
      var ua = navigator.userAgent || "";
      var ios = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
      var phone = ios ? "ios" : /Android/i.test(ua) ? "android" : "other";
      var ping = t.api + "&p=" + phone;
      // Count the click without waiting: the browser sends it even after the page has moved on.
      try { if (!(navigator.sendBeacon && navigator.sendBeacon(ping))) throw 0; }
      catch (e) { try { fetch(ping, { method: "POST", mode: "no-cors", keepalive: true }); } catch (e2) {} }
      location.replace(ios ? t.iphone : t.play);
    })();
  </script>
</head>
<body style="font-family:system-ui,sans-serif;text-align:center;padding:48px 16px">
  <p>Opening Muslimo…</p>
  <p><a href="${escapeHtml(play)}">Get it on Google Play</a></p>
</body>
</html>
`;
    mkdirSync(join(outDir, "go", name), { recursive: true });
    writeFileSync(join(outDir, "go", name, "index.html"), page);
    published.links.push({ name, label, medium, path: `go/${name}` });
  }
  // The stats page reads this list to show every link with a copy button.
  writeFileSync(join(outDir, "links.json"), JSON.stringify(published, null, 2));
}

console.log(`Built ${readdirSync(outDir).length} files into _site/`);
