import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { AssetImage } from "@/components/ui/AssetImage";
import { CtaLink } from "@/components/ui/Button";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

/** 병원의 철학 — MAIN_PAGE_PLAN.md §6.2 */
export function Philosophy({
  content,
  locale,
}: {
  content: Dictionary["home"]["philosophy"];
  locale: Locale;
}) {
  return (
    <Section id="philosophy" tone="base">
      <Container>
        <div className="grid items-center gap-12 md:gap-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-24">
          <Reveal className="order-2 lg:order-1">
            <AssetImage
              magnetic
              src={content.image.src}
              alt={content.image.alt}
              ratio="4/5"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </Reveal>

          <div className="order-1 flex flex-col gap-8 lg:order-2">
            <Reveal className="flex flex-col gap-5">
              <p className="kicker">{content.kicker}</p>
              <h2 className="font-serif text-3xl leading-[1.38] font-medium text-balance sm:text-4xl md:text-[2.6rem]">
                {content.heading.map((line) => (
                  <span key={line} className="block">
                    {line}{" "}
                  </span>
                ))}
              </h2>
            </Reveal>

            <Reveal className="flex flex-col gap-5" delay={120}>
              {content.paragraphs.map((paragraph) => (
                <p key={paragraph} className="max-w-[52ch] text-[15px] leading-[1.95] text-ink-muted">
                  {paragraph}
                </p>
              ))}
            </Reveal>

            <Reveal delay={200}>
              <ul className="flex flex-col gap-3.5 border-t border-line pt-8">
                {content.principles.map((principle) => (
                  <li key={principle} className="flex items-start gap-3.5 text-[14px] leading-relaxed">
                    <span aria-hidden="true" className="mt-2.5 block h-px w-5 shrink-0 bg-champagne" />
                    {principle}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={260}>
              <CtaLink href={content.cta.href} locale={locale} variant="quiet">
                {content.cta.label}
              </CtaLink>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
