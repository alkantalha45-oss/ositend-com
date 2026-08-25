import type { ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { Section } from "./bits";
import { legalEntity, legalEntityReady } from "../lib/site";

/**
 * Hukuki metinler için ortak çerçeve.
 *
 * Tek yerde toplanmasının sebebi tutarlılık: dört metin de aynı veri
 * sorumlusu künyesini, aynı güncelleme tarihini ve aynı okunabilirlik
 * genişliğini kullanmalı. Künye üç ayrı sayfaya elle yazılsaydı, unvan
 * değiştiğinde ikisi güncellenip biri eski kalırdı.
 */

/** Metinlerin yürürlük tarihi. Esaslı bir değişiklikte elle güncellenmeli. */
export const LEGAL_UPDATED = "25 Ağustos 2026";

export function LegalDoc({
  title,
  lede,
  children,
}: {
  title: string;
  lede: string;
  children: ReactNode;
}) {
  return (
    <Section className="py-14 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-[clamp(1.875rem,4.4vw,2.75rem)]">{title}</h1>
        <p className="mt-4 text-base leading-relaxed text-muted-ink">{lede}</p>
        <p className="mt-3 text-sm text-muted-ink">Son güncelleme: {LEGAL_UPDATED}</p>

        {/*
          Künye tamamlanmadan bu metinler KVKK m.10 anlamında eksik: veri
          sorumlusunun kimliği zorunlu bir unsur. Uyarıyı gizlemek yerine
          görünür bırakıyoruz — böylece eksik hâliyle yayına çıkarsa fark
          edilmemesi mümkün olmuyor.
        */}
        {!legalEntityReady && (
          <div className="mt-8 rounded-lg border border-warning/50 bg-warning/10 p-4">
            <p className="flex items-start gap-2.5 text-sm leading-relaxed text-ink">
              <AlertTriangle className="mt-0.5 size-4 shrink-0" />
              <span>
                <strong>Bu metin henüz tamamlanmadı.</strong> Veri sorumlusunun ticaret unvanı, açık
                adresi ve sicil bilgisi eklenmeden metin hukuken eksiktir. Sorularınız için{" "}
                <a href="mailto:info@ositend.com" className="underline">
                  info@ositend.com
                </a>
                .
              </span>
            </p>
          </div>
        )}

        <div className="legal-prose mt-10">{children}</div>
      </div>
    </Section>
  );
}

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-10 border-t border-line-soft pt-8 font-display text-xl font-medium first:mt-0 first:border-0 first:pt-0">
      {children}
    </h2>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted-ink">{children}</p>;
}

export function UL({ children }: { children: ReactNode }) {
  return <ul className="mt-4 space-y-2.5">{children}</ul>;
}

export function LI({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3 text-[0.9375rem] leading-relaxed text-muted-ink">
      <span aria-hidden className="mt-2.5 size-1 shrink-0 rounded-full bg-brand" />
      <span>{children}</span>
    </li>
  );
}

/** Veri sorumlusu künyesi — dört metinde de aynı blok. */
export function DataControllerBlock() {
  return (
    <div className="mt-4 rounded-xl border border-line-soft bg-surface p-5">
      <dl className="grid gap-x-6 gap-y-2 text-[0.9375rem] sm:grid-cols-[10rem_1fr]">
        <dt className="text-muted-ink">Veri sorumlusu</dt>
        <dd className="text-ink">{legalEntity.title}</dd>
        <dt className="text-muted-ink">Adres</dt>
        <dd className="text-ink">{legalEntity.address}</dd>
        <dt className="text-muted-ink">Sicil / VKN</dt>
        <dd className="tnum text-ink">{legalEntity.registryNo}</dd>
        <dt className="text-muted-ink">E-posta</dt>
        <dd>
          <a href="mailto:info@ositend.com" className="text-brand underline">
            info@ositend.com
          </a>
        </dd>
      </dl>
    </div>
  );
}

/**
 * Tablo sarmalayıcı — dar ekranda taşan tabloyu SAYFAYI değil kendini
 * kaydırtır. Hukuki metinlerdeki aktarım tabloları mobilde bunsuz
 * yatay kaydırma yaratıyor.
 */
export function TableWrap({ children }: { children: ReactNode }) {
  return <div className="mt-4 overflow-x-auto">{children}</div>;
}
