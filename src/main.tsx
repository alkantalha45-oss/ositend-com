import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import { Layout } from "./components/Layout";
import { AstraHome as Home } from "./pages/AstraHome";
import { Services } from "./pages/Services";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Security } from "./pages/Security";
import { Privacy } from "./pages/Privacy";
import { Kvkk } from "./pages/Kvkk";
import { Terms } from "./pages/Terms";
import { Dpa } from "./pages/Dpa";
import { NotFound } from "./pages/NotFound";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
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
          {/* Bilinmeyen yollar: sunucu SPA kuralıyla index.html döndürdüğü
              için buraya düşer. Önceden hiçbir rota eşleşmediğinde boş
              sayfa görünüyordu. */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
