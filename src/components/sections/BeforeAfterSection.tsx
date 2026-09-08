import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CtaLink } from "@/components/ui/Button";
import { assetExists } from "@/lib/assets";
import { BeforeAfterCompare } from "./BeforeAfterCompare";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

/** 얼굴 시술 소개 및 Before & After — MAIN_PAGE_PLAN.md §6.5 */
export function BeforeAfterSection({
  content,
  locale,
  ui,
}: {
  content: Dictionary["home"]["beforeAfter"];
  locale: Locale;
  ui: Dictionary["ui"]["beforeAfter"];
}) {
  return (
    <Section id="comparison" tone="base">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-center lg:gap-20">
          <Reveal>
            <BeforeAfterCompare
              content={content}
              beforeReady={assetExists(content.before.src)}
              afterReady={assetExists(content.after.src)}
              ui={ui}
            />
          </Reveal>

          <div className="flex flex-col gap-8">
            <Reveal className="flex flex-col gap-5">
              <p className="kicker">{content.kicker}</p>
              <h2 className="font-serif text-3xl leading-[1.38] font-medium text-balance sm:text-4xl md:text-[2.5rem]">
                {content.heading}
              </h2>
              <p className="max-w-[46ch] text-[15px] leading-[1.9] text-ink-muted">
                {content.description}
              </p>
            </Reveal>

            {/* §6.5 콘텐츠 조건 — 시술명, 촬영 시점, 촬영 기준을 함께 표기한다 */}
            <Reveal delay={120}>
              <dl className="grid gap-px border border-line bg-line sm:grid-cols-3">
                {[
                  { term: ui.procedure, value: content.procedure },
                  { term: ui.timing, value: content.timing },
                  { term: ui.condition, value: content.condition },
                ].map((item) => (
                  <div key={item.term} className="flex flex-col gap-2 bg-bg p-5">
                    <dt className="text-[12px] tracking-wide text-ink-muted/80">{item.term}</dt>
                    <dd className="text-[14px] leading-relaxed">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={180} className="flex flex-col gap-5">
              <p className="border-l-2 border-champagne pl-4 text-[13px] leading-[1.85] text-ink-muted">
                {content.disclaimer}
              </p>
              <CtaLink href={content.cta.href} locale={locale} variant="quiet" className="self-start">
                {content.cta.label}
              </CtaLink>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
