import Link from "next/link";
import type { ReactNode } from "react";
import { localizeHref, type Locale } from "@/i18n/config";

/**
 * CTA 강도 — MAIN_PAGE_PLAN.md §13
 * 모든 CTA를 동일한 강도로 강조하지 않는다.
 */
export type CtaVariant = "primary" | "secondary" | "quiet";

const base =
  "inline-flex items-center justify-center gap-2 transition-colors duration-300 ease-[var(--ease-soft)]";

const variants: Record<CtaVariant, string> = {
  primary:
    "bg-rose px-7 py-3.5 text-sm tracking-wide text-white hover:bg-rose-deep",
  secondary:
    "border border-ink/25 px-7 py-3.5 text-sm tracking-wide text-ink hover:border-ink/60 hover:bg-ink/5",
  quiet:
    "border-b border-rose/40 pb-1 text-sm tracking-wide text-rose hover:border-rose",
};

export function CtaLink({
  href,
  variant = "primary",
  className = "",
  children,
  locale,
}: {
  href: string;
  variant?: CtaVariant;
  className?: string;
  children: ReactNode;
  locale?: Locale;
}) {
  return (
    <Link
      href={locale ? localizeHref(locale, href) : href}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

export const ctaClass = (variant: CtaVariant) => `${base} ${variants[variant]}`;
