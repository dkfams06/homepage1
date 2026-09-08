"use client";

import Link from "next/link";
import { HomeNavigation } from "@/components/HomeNavigation";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { openQuickInquiry } from "@/components/QuickInquiry";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizeHref, locales, switchLocalePath, type Locale } from "@/i18n/config";

/**
 * 글로벌 헤더 — MAIN_PAGE_PLAN.md §5
 * 히어로 위에서는 투명, 스크롤 후에는 밝은 단색 배경의 고정 헤더로 전환한다.
 */
export function Header({
  locale,
  site,
  nav,
  ui,
  homeNavigation,
}: {
  locale: Locale;
  site: Dictionary["site"];
  nav: Dictionary["nav"];
  ui: Dictionary["ui"]["header"];
  homeNavigation: Dictionary["homeNavigation"];
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setLanguageOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;
  const solid = !isHome || scrolled || menuOpen;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:bg-surface focus:px-5 focus:py-3 focus:text-sm"
      >
        {ui.skip}
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ease-[var(--ease-soft)] ${
          solid ? "border-b border-line bg-bg/95 backdrop-blur-sm" : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-18 w-full max-w-[1280px] items-center justify-between px-6 md:h-20 md:px-10">
          <Link
            href={`/${locale}`}
            className={`font-display text-xl tracking-[0.18em] uppercase transition-colors ${
              solid ? "text-ink" : "text-white"
            }`}
          >
            {site.nameEn.split(" ")[0]}
          </Link>

          <nav aria-label={ui.mainNav} className="hidden items-center gap-5 xl:gap-9 lg:flex">
            <HomeNavigation locale={locale} content={homeNavigation} solid={solid} />
            {nav.map((item) => (
              <Link
                key={item.href}
                href={localizeHref(locale, item.href)}
                className={`group flex flex-col items-center gap-0.5 text-[13px] tracking-[0.14em] uppercase transition-colors ${
                  solid ? "text-ink hover:text-rose" : "text-white/90 hover:text-white"
                }`}
              >
                {item.label}
                <span className={`text-[10px] tracking-normal ${solid ? "text-ink-muted" : "text-white/60"}`}>
                  {item.subLabel}
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                type="button"
                onClick={() => setLanguageOpen((value) => !value)}
                aria-expanded={languageOpen}
                aria-haspopup="menu"
                aria-label={ui.language}
                className={`flex min-h-11 items-center gap-1.5 px-2 text-[11px] tracking-[0.14em] transition-colors ${
                  solid ? "text-ink-muted hover:text-ink" : "text-white/80 hover:text-white"
                }`}
              >
                {locale.toUpperCase()}
                <span aria-hidden="true" className={`text-[9px] transition-transform ${languageOpen ? "rotate-180" : ""}`}>
                  ▾
                </span>
              </button>
              <div
                hidden={!languageOpen}
                role="menu"
                aria-label={ui.language}
                className="absolute top-full right-0 min-w-36 border border-line bg-surface p-1.5 text-ink shadow-lg"
              >
                {locales.map((optionLocale) => (
                  <Link
                    key={optionLocale}
                    href={switchLocalePath(pathname, optionLocale)}
                    hrefLang={optionLocale}
                    role="menuitem"
                    aria-current={optionLocale === locale ? "page" : undefined}
                    onClick={() => {
                      document.cookie = `locale=${optionLocale};path=/;max-age=31536000;samesite=lax`;
                      setLanguageOpen(false);
                      setMenuOpen(false);
                    }}
                    className={`flex items-center justify-between gap-5 px-3 py-2.5 text-[12px] whitespace-nowrap transition-colors hover:bg-rose-tint ${
                      optionLocale === locale ? "text-rose" : "text-ink-muted"
                    }`}
                  >
                    <span>{ui.languages[optionLocale]}</span>
                    <span className="text-[10px] tracking-wider uppercase opacity-60">{optionLocale}</span>
                  </Link>
                ))}
              </div>
            </div>
            <a
              href={site.phoneHref}
              className={`hidden text-[13px] tracking-wide transition-colors md:block ${
                solid ? "text-ink-muted hover:text-ink" : "text-white/80 hover:text-white"
              }`}
            >
              {site.phone}
            </a>
            <button
              type="button"
              onClick={openQuickInquiry}
              className="hidden bg-rose px-5 py-2.5 text-[13px] tracking-wide text-white transition-colors hover:bg-rose-deep sm:block"
            >
              {ui.consult}
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? ui.closeMenu : ui.openMenu}
              className={`-mr-2 flex size-11 flex-col items-center justify-center gap-1.5 lg:hidden ${
                solid ? "text-ink" : "text-white"
              }`}
            >
              <span
                className={`h-px w-6 bg-current transition-transform duration-300 ${
                  menuOpen ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-6 bg-current transition-transform duration-300 ${
                  menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* 모바일 전체 화면 메뉴 — §5 헤더 동작 */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="fixed inset-0 z-30 flex flex-col overflow-y-auto bg-bg pt-22 pb-16 lg:hidden"
      >
        <nav aria-label={ui.mobileNav} className="flex flex-1 flex-col gap-2 px-8 pb-6">
          <HomeNavigation locale={locale} content={homeNavigation} mobile onNavigate={() => setMenuOpen(false)} />
          {nav.map((item) => (
            <Link
              key={item.href}
              href={localizeHref(locale, item.href)}
              onClick={() => setMenuOpen(false)}
              className="flex items-baseline gap-4 border-b border-line py-5"
            >
              <span className="font-display text-3xl tracking-[0.1em] uppercase">{item.label}</span>
              <span className="text-[13px] text-ink-muted">{item.subLabel}</span>
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3 px-8 pb-10">
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              openQuickInquiry();
            }}
            className="bg-rose px-6 py-4 text-sm tracking-wide text-white"
          >
            {ui.consult}
          </button>
          <a
            href={site.phoneHref}
            className="border border-ink/20 px-6 py-4 text-center text-sm tracking-wide"
          >
            {ui.phone} {site.phone}
          </a>
        </div>
      </div>
    </>
  );
}
