import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Security } from "./pages/Security";
import { Privacy } from "./pages/Privacy";
import { Kvkk } from "./pages/Kvkk";
import { Terms } from "./pages/Terms";
import { Dpa } from "./pages/Dpa";
import { NotFound } from "./pages/NotFound";

/*
 * Rota tablosu — tarayıcı (main.tsx) ve build-zamanı prerender
 * (entry-server.tsx) AYNI tabloyu kullanıyor. İki ayrı liste olsaydı yeni
 * bir sayfa birine eklenip ötekine unutulurdu; prerender edilmeyen sayfa da
 * bota yine boş <div id="root"> olarak görünürdü.
 */
export const prerenderPaths = [
  "/",
  "/hizmetler",
  "/hakkimizda",
  "/iletisim",
  "/guvenlik",
  "/gizlilik",
  "/kvkk-aydinlatma",
  "/kosullar",
  "/veri-isleme-sozlesmesi",
] as const;

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/hizmetler" element={<Services />} />
        <Route path="/hakkimizda" element={<About />} />
        <Route path="/iletisim" element={<Contact />} />
        <Route path="/guvenlik" element={<Security />} />
        <Route path="/gizlilik" element={<Privacy />} />
        <Route path="/kvkk-aydinlatma" element={<Kvkk />} />
        <Route path="/kosullar" element={<Terms />} />
        <Route path="/veri-isleme-sozlesmesi" element={<Dpa />} />
        {/* Bilinmeyen yollar: sunucu 404.html'i (bu bileşenin prerender
            edilmiş hâli) 404 durum koduyla döndürüyor; tarayıcı tarafında da
            aynı bileşen render ediliyor. */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
