import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/i18n/dictionaries";

/**
 * 상담 절차 — FEATURE_ROADMAP.md §4.1 (F-01)
 * 레퍼런스 3사가 다루지 않는 구간으로, 문의 전 심리적 부담을 낮추는 것이 목적이다.
 * 단계 번호는 장식이므로 스크린 리더에서는 ol의 순서로만 전달한다.
 */
export function Process({ content }: { content: Dictionary["home"]["process"] }) {
  return (
    <Section id="process" tone="surface">
      <Container>
        <SectionHeading
          kicker={content.kicker}
          heading={content.heading}
          description={content.description}
        />

        <ol className="mt-14 border-b border-line md:mt-20">
          {content.steps.map((step, index) => (
            <Reveal
              as="li"
              key={step.id}
              delay={index * 80}
              className="grid gap-4 border-t border-line py-8 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.5fr)] md:gap-12 md:py-10"
            >
              <div className="flex items-baseline gap-5">
                <span aria-hidden="true" className="font-display text-sm tracking-[0.2em] text-champagne">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif text-xl leading-snug">{step.title}</h3>
              </div>
              <div className="flex flex-col gap-3 md:pt-1">
                <p className="max-w-[52ch] text-[14px] leading-[1.9] text-ink-muted">
                  {step.description}
                </p>
                <p className="text-[13px] tracking-wide text-rose">{step.note}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={160}>
          <p className="mt-8 text-[13px] leading-relaxed text-ink-muted/80">{content.notice}</p>
        </Reveal>
      </Container>
    </Section>
  );
}
