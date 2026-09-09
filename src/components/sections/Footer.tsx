import Link from "next/link";
import { Container } from "@/components/ui/Section";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizeHref, type Locale } from "@/i18n/config";

/** 푸터 — MAIN_PAGE_PLAN.md §6.13 */
export function Footer({
  locale,
  site,
  nav,
  categories,
  ui,
}: {
  locale: Locale;
  site: Dictionary["site"];
  nav: Dictionary["nav"];
  categories: Dictionary["categories"];
  ui: Dictionary["ui"]["footer"];
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-bg pt-16 pb-28 md:pt-20 md:pb-14">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)] lg:gap-20">
          <div className="flex flex-col gap-5">
            <p className="font-display text-2xl tracking-[0.18em] uppercase">
              {site.nameEn.split(" ")[0]}
            </p>
            <p className="max-w-[34ch] text-[14px] leading-[1.9] text-ink-muted">
              {site.tagline}
            </p>
            <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
              {site.social.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-[13px] text-ink-muted underline-offset-4 transition-colors hover:text-rose hover:underline"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            <FooterColumn title={ui.menu}>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={localizeHref(locale, item.href)} className="transition-colors hover:text-rose">
                    {item.subLabel}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={localizeHref(locale, "/about/faq")} className="transition-colors hover:text-rose">
                  {ui.faq}
                </Link>
              </li>
              <li>
                <Link
                  href={`${localizeHref(locale, "/")}#location`}
                  className="transition-colors hover:text-rose"
                >
                  {ui.location}
                </Link>
              </li>
            </FooterColumn>

            <FooterColumn title={ui.service}>
              {categories.map((category) => (
                <li key={category.id}>
                  <Link href={localizeHref(locale, category.href)} className="transition-colors hover:text-rose">
                    {category.name}
                  </Link>
                </li>
              ))}
            </FooterColumn>

            <FooterColumn title={ui.contact}>
              <li>
                <a href={site.phoneHref} className="transition-colors hover:text-rose">
                  {site.phone}
                </a>
              </li>
              <li className="leading-relaxed">{site.address}</li>
              {site.hours.map((entry) => (
                <li key={entry.day} className="text-ink-muted/80">
                  {entry.day} {entry.time}
                </li>
              ))}
            </FooterColumn>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-line pt-8 md:mt-16">
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-[12px] text-ink-muted">
            <li>{site.name}</li>
            <li>{site.business.ceo}</li>
            <li>{site.business.registration}</li>
            <li>{site.business.manager}</li>
          </ul>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[12px]">
              <li>
                <Link href={localizeHref(locale, "/privacy")} className="font-medium transition-colors hover:text-rose">
                  {ui.privacy}
                </Link>
              </li>
              <li>
                <Link href={localizeHref(locale, "/terms")} className="text-ink-muted transition-colors hover:text-rose">
                  {ui.terms}
                </Link>
              </li>
            </ul>
            <p className="text-[12px] text-ink-muted/70">
              &copy; {year} {site.nameEn}. All rights reserved.
            </p>
          </div>
          <p className="text-[12px] leading-relaxed text-ink-muted/70">
            {ui.disclaimer}
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-display text-[11px] tracking-[0.2em] text-champagne uppercase">
        {title}
      </p>
      <ul className="flex flex-col gap-2.5 text-[14px] text-ink-muted">{children}</ul>
    </div>
  );
}
