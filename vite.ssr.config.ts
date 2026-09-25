import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/*
 * Yalnızca build-zamanı prerender paketi için (scripts/prerender.mjs).
 * Cloudflare eklentisi burada YOK: bu paket Worker'a değil, build
 * makinesindeki Node'a gidiyor ve deploy edilmiyor.
 */
export default defineConfig({
  plugins: [react()],
  build: {
    ssr: "src/entry-server.tsx",
    outDir: "dist-ssr",
    emptyOutDir: true,
  },
  ssr: {
    // lucide-react ve motion ESM olarak Node'da doğrudan çalışıyor, ama
    // paketlemek sürüm/koşul farklarından doğacak sürprizleri kapatıyor.
    noExternal: ["lucide-react", "motion", "framer-motion", "motion-dom", "motion-utils"],
  },
});
