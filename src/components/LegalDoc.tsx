import type { ReactNode } from "react";
import { Section } from "./bits";
import { billing, contact, legalEntity } from "../lib/site";

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

/**
 * Veri sorumlusu künyesi — dört metinde de aynı blok.
 *
 * GERÇEK KİŞİ künyesi: ortada bir tüzel kişilik yok, hizmet serbest
 * çalışan olarak veriliyor. Daha önce burada ticaret unvanı ve MERSİS
 * numarası için yer tutucular vardı; olmayan bir şirketin künyesini
 * doldurmayı beklemek yerine gerçek durum yazıldı.
 *
 * Adres yalnızca src/lib/site.ts'te doldurulmuşsa görünüyor.
 */
export function DataControllerBlock() {
  return (
    <div className="mt-4 rounded-xl border border-line-soft bg-surface p-5">
      <dl className="grid gap-x-6 gap-y-2 text-[0.9375rem] sm:grid-cols-[10rem_1fr]">
        <dt className="text-muted-ink">Veri sorumlusu</dt>
        <dd className="text-ink">{legalEntity.name}</dd>
        <dt className="text-muted-ink">Statü</dt>
        <dd className="text-ink">{legalEntity.status}</dd>
        {legalEntity.address && (
          <>
            <dt className="text-muted-ink">Adres</dt>
            <dd className="text-ink">{legalEntity.address}</dd>
          </>
        )}
        <dt className="text-muted-ink">Faturalama</dt>
        <dd className="text-ink">
          {billing.what},{" "}
          <a
            href={billing.url}
            target="_blank"
            rel="noreferrer"
            className="text-brand underline"
          >
            {billing.name}
          </a>{" "}
          üzerinden
        </dd>
        <dt className="text-muted-ink">E-posta</dt>
        <dd>
          <a href={`mailto:${contact.email}`} className="text-brand underline">
            {contact.email}
          </a>
        </dd>
        <dt className="text-muted-ink">Telefon</dt>
        <dd className="tnum text-ink">{contact.phone}</dd>
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
