import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { AppRoutes, prerenderPaths } from "./App";
import { beginSeoCapture, takeSeoCapture } from "./lib/seo";

/*
 * Build-zamanı prerender girişi. Yalnızca scripts/prerender.mjs tarafından
 * Node'da çağrılır, tarayıcı paketine girmez.
 *
 * NEDEN: site bir SPA'ydı; JavaScript çalıştırmayan her okuyucu tüm
 * sayfalarda aynı boş <div id="root"></div>'i görüyordu. IPQS gibi otomatik
 * phishing tarayıcıları "genç alan adı + içeriksiz sayfa + dış betik"
 * kalıbını oltalama sitesi olarak sınıflandırıyor; ositend.com IPQS'te
 * 97/100 risk ve "Phishing" işaretiyle göründü, ScamAdviser skoru da
 * (8/100) büyük ölçüde bu işaretten geliyor — TikTok Developer reddinin
 * gerekçesi de bu skor.
 */
export function render(url: string) {
  beginSeoCapture();
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>,
  );
  return { html, seo: takeSeoCapture() };
}

export { prerenderPaths };
