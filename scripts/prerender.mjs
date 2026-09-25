/*
 * Build-zamanı prerender: her rotayı statik HTML olarak dist/client'a yazar.
 *
 * Çalışma sırası (package.json "build"): önce normal vite build (tarayıcı
 * paketi + Worker), sonra vite.ssr.config.ts ile Node paketi, en son bu
 * betik. Üretilenler:
 *   /                → dist/client/index.html (üzerine yazılır)
 *   /hizmetler vb.   → dist/client/hizmetler.html
 *                      (Cloudflare varlık katmanı /hizmetler isteğine
 *                      yönlendirmesiz olarak hizmetler.html'i sunar)
 *   bilinmeyen yol   → dist/client/404.html
 *                      (wrangler.jsonc: not_found_handling "404-page" —
 *                      bilinmeyen her yol GERÇEK 404 durum koduyla döner;
 *                      önceden her şeye 200 dönülüyordu, ki bu da
 *                      tarayıcıların "her yola cevap veren site" sinyali)
 *
 * NEDEN: bkz. src/entry-server.tsx üst yorumu.
 */
import { readFile, writeFile, rm } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const clientDir = path.join(root, "dist", "client");
const ssrEntry = path.join(root, "dist-ssr", "entry-server.js");
const siteUrl = "https://ositend.com";

const { render, prerenderPaths } = await import(pathToFileURL(ssrEntry).href);
const template = await readFile(path.join(clientDir, "index.html"), "utf8");

if (!template.includes('<div id="root"></div>')) {
  throw new Error("index.html içinde boş <div id=\"root\"></div> bulunamadı — şablon değişmiş.");
}

const attr = (s) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const text = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Bir meta etiketinin content değerini değiştirir; etiket yoksa hata verir. */
function setMeta(html, key, value) {
  const re = new RegExp(`(<meta\\s+(?:name|property)="${key}"\\s+content=")[^"]*(")`);
  const reMulti = new RegExp(`(<meta\\s+(?:name|property)="${key}"\\s*\\n\\s*content=")[^"]*(")`);
  if (re.test(html)) return html.replace(re, `$1${attr(value)}$2`);
  if (reMulti.test(html)) return html.replace(reMulti, `$1${attr(value)}$2`);
  throw new Error(`index.html içinde ${key} meta etiketi bulunamadı.`);
}

function page(url) {
  const { html, seo } = render(url);
  if (!seo) throw new Error(`${url} useSeo çağırmıyor — prerender başlığı bilinemez.`);

  /*
   * motion, animasyonlu bölümleri sunucuda başlangıç karesiyle yazıyor:
   * style="opacity:0;transform:translateY(24px)". JS çalıştırmayan okuyucu
   * için bu, içeriğin görünmez olması demek — güvenlik tarayıcılarının
   * "gizli içerik" diye işaretlediği şeyin ta kendisi. Tarayıcıda bu HTML
   * zaten createRoot ile baştan çiziliyor, animasyon aynen çalışıyor.
   */
  const body = html.replace(/ style="opacity:0;transform:translateY\(\d+px\)"/g, "");

  const url_ = `${siteUrl}${seo.path === "/" ? "/" : seo.path}`;
  let out = template.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${text(seo.title)}</title>`);
  out = setMeta(out, "description", seo.description);
  out = setMeta(out, "og:title", seo.title);
  out = setMeta(out, "og:description", seo.description);
  out = setMeta(out, "og:url", url_);
  out = setMeta(out, "twitter:title", seo.title);
  out = setMeta(out, "twitter:description", seo.description);

  if (seo.noindex) {
    // 404 sayfası: canonical yok, dizine girmesin.
    out = out.replace(/\s*<link rel="canonical" href="[^"]*" \/>/, "");
    out = out.replace("</title>", '</title>\n    <meta name="robots" content="noindex, follow" />');
  } else {
    out = out.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url_}$2`);
  }
  return out;
}

for (const p of prerenderPaths) {
  const file = p === "/" ? "index.html" : `${p.slice(1)}.html`;
  await writeFile(path.join(clientDir, file), page(p), "utf8");
  console.log(`prerender: ${p} → ${file}`);
}
await writeFile(path.join(clientDir, "404.html"), page("/__bulunamadi"), "utf8");
console.log("prerender: 404 → 404.html");

// Node paketi yalnızca bu betik içindi; deploy edilmiyor.
await rm(path.join(root, "dist-ssr"), { recursive: true, force: true });
