/*
 * Entegrasyon rozetleri için sadeleştirilmiş platform simgeleri.
 * Bunlar resmî marka varlıkları değil; ilgili platformların renk ve
 * biçim dilinden esinlenen, elle çizilmiş temsillerdir.
 */

import type { ReactElement } from "react";

type MarkProps = { className?: string };

export function GoogleAdsMark({ className = "" }: MarkProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden focusable="false">
      <rect x="3" y="9" width="7" height="20" rx="3.5" fill="#FBBC04" transform="rotate(-30 6.5 19)" />
      <rect x="22" y="9" width="7" height="20" rx="3.5" fill="#4285F4" transform="rotate(30 25.5 19)" />
      <circle cx="16" cy="24.5" r="4.5" fill="#34A853" />
    </svg>
  );
}

export function MetaMark({ className = "" }: MarkProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden focusable="false">
      <path
        d="M4 19.5c0-4.9 2.6-9.5 6-9.5 2.3 0 3.8 1.6 6 5.3 2.2-3.7 3.7-5.3 6-5.3 3.4 0 6 4.6 6 9.5 0 2.7-1.4 4.5-3.6 4.5-2 0-3.4-1.4-5.3-4.6l-1.6-2.7c-.5-.9-1-1.6-1.5-1.6s-1 .7-1.5 1.6l-1.6 2.7C11.4 22.6 10 24 8 24c-2.2 0-4-1.8-4-4.5Zm4.6 1.1c.8 0 1.5-.7 2.7-2.6l1-1.7c-1.3-2.2-2.1-3-3-3-1.3 0-2.4 2.3-2.4 4.8 0 1.6.7 2.5 1.7 2.5Zm14.8 0c1 0 1.7-.9 1.7-2.5 0-2.5-1.1-4.8-2.4-4.8-.9 0-1.7.8-3 3l1 1.7c1.2 1.9 1.9 2.6 2.7 2.6Z"
        fill="#0866FF"
      />
    </svg>
  );
}

export function Ga4Mark({ className = "" }: MarkProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden focusable="false">
      <rect x="22" y="4" width="6.5" height="24" rx="3.25" fill="#F9AB00" />
      <rect x="13" y="12" width="6.5" height="16" rx="3.25" fill="#E37400" />
      <circle cx="7" cy="24.5" r="3.5" fill="#E37400" />
    </svg>
  );
}

export function SearchConsoleMark({ className = "" }: MarkProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden focusable="false">
      <circle cx="14" cy="14" r="8.5" fill="none" stroke="#4285F4" strokeWidth="3" />
      <path d="M14 5.5a8.5 8.5 0 0 1 8.5 8.5" fill="none" stroke="#EA4335" strokeWidth="3" strokeLinecap="round" />
      <path d="M22.5 14a8.5 8.5 0 0 1-4.3 7.4" fill="none" stroke="#FBBC04" strokeWidth="3" strokeLinecap="round" />
      <path d="M20.6 20.6 27 27" stroke="#34A853" strokeWidth="3.4" strokeLinecap="round" />
    </svg>
  );
}

export function LinkedInMark({ className = "" }: MarkProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden focusable="false">
      <rect width="32" height="32" rx="7" fill="#0A66C2" />
      <circle cx="9.5" cy="9.5" r="2.4" fill="#fff" />
      <rect x="7.4" y="13.4" width="4.2" height="11.2" rx="1" fill="#fff" />
      <path
        d="M14.4 13.4h4v1.6c.7-1.1 2-1.9 3.7-1.9 3 0 4.5 1.9 4.5 5.3v6.2h-4.2v-5.6c0-1.6-.6-2.5-1.9-2.5s-2.1 1-2.1 2.5v5.6h-4V13.4Z"
        fill="#fff"
      />
    </svg>
  );
}

export function TikTokMark({ className = "" }: MarkProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden focusable="false">
      <path
        d="M20 4h3.6c.4 2.8 2 4.7 4.8 5v3.6c-1.9.1-3.6-.4-5.1-1.4v7.6c0 4.9-3.6 8.2-8 8.2-4.3 0-7.6-3.2-7.6-7.4 0-4.4 3.5-7.6 8.2-7.2v3.8c-.6-.1-1-.2-1.5-.2-2 0-3.4 1.5-3.4 3.5s1.4 3.5 3.4 3.5c2.1 0 3.6-1.5 3.6-4V4Z"
        fill="#25F4EE"
        transform="translate(-1.4 -0.6)"
      />
      <path
        d="M20 4h3.6c.4 2.8 2 4.7 4.8 5v3.6c-1.9.1-3.6-.4-5.1-1.4v7.6c0 4.9-3.6 8.2-8 8.2-4.3 0-7.6-3.2-7.6-7.4 0-4.4 3.5-7.6 8.2-7.2v3.8c-.6-.1-1-.2-1.5-.2-2 0-3.4 1.5-3.4 3.5s1.4 3.5 3.4 3.5c2.1 0 3.6-1.5 3.6-4V4Z"
        fill="#FE2C55"
        transform="translate(1.4 0.6)"
      />
      <path
        d="M20 4h3.6c.4 2.8 2 4.7 4.8 5v3.6c-1.9.1-3.6-.4-5.1-1.4v7.6c0 4.9-3.6 8.2-8 8.2-4.3 0-7.6-3.2-7.6-7.4 0-4.4 3.5-7.6 8.2-7.2v3.8c-.6-.1-1-.2-1.5-.2-2 0-3.4 1.5-3.4 3.5s1.4 3.5 3.4 3.5c2.1 0 3.6-1.5 3.6-4V4Z"
        fill="#0B0B0F"
      />
    </svg>
  );
}

export function ShopifyMark({ className = "" }: MarkProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden focusable="false">
      <path d="M7 11c0-2.8 2.3-5 5-5h8c2.7 0 5 2.2 5 5v14a3 3 0 0 1-3 3H10a3 3 0 0 1-3-3V11Z" fill="#95BF47" />
      <path
        d="M12 11a4 4 0 0 1 8 0"
        fill="none"
        stroke="#5E8E3E"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="16" cy="19" r="4" fill="#fff" />
      <path d="M14.3 19h3.4M16 17.3v3.4" stroke="#5E8E3E" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Entegrasyon durumu.
 *
 * "live" = panelde çalışan bir veri sürücüsü var.
 * "soon" = tasarımı yapıldı, sürücüsü henüz yazılmadı.
 *
 * Bu ayrım siteye TAŞINIYOR: altı platformu da ayrımsız listelemek,
 * ziyaretçiye bugün LinkedIn Ads raporu alabileceğini söylemek olurdu.
 * Satış görüşmesinde ortaya çıkan böyle bir boşluk, en baştan "yakında"
 * demenin maliyetinden çok daha pahalıya mal olur.
 */
export type PlatformStatus = "live" | "soon";

export type Platform = {
  name: string;
  Mark: (props: MarkProps) => ReactElement;
  status: PlatformStatus;
};

export const platforms: Platform[] = [
  { name: "Google Ads", Mark: GoogleAdsMark, status: "live" },
  { name: "Meta Ads", Mark: MetaMark, status: "live" },
  { name: "GA4", Mark: Ga4Mark, status: "live" },
  { name: "Search Console", Mark: SearchConsoleMark, status: "soon" },
  { name: "LinkedIn Ads", Mark: LinkedInMark, status: "soon" },
  { name: "TikTok Ads", Mark: TikTokMark, status: "soon" },
  { name: "Shopify", Mark: ShopifyMark, status: "soon" },
];
