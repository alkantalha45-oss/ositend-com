import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { AppRoutes } from "./App";

/*
 * createRoot, hydrateRoot DEĞİL — bilerek. #root içinde build-zamanında
 * üretilmiş HTML var (scripts/prerender.mjs), ama o HTML yalnızca JavaScript
 * çalıştırmayan okuyucular için: tarayıcılar, güvenlik tarayıcıları, sosyal
 * kart üreticileri. Hydrate etmek, çerez bandı (localStorage) ve hareket
 * tercihi (matchMedia) gibi sunucuda bilinemeyen durumlarda uyumsuzluk
 * hatası üretirdi. createRoot içeriği sessizce baştan çiziyor; ziyaretçinin
 * gördüğü sonuç prerender'dan önceki davranışla aynı.
 */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>,
);
