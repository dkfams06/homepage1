import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/i18n/dictionaries";

/** 병원의 차별점 — MAIN_PAGE_PLAN.md §6.7 */
export function Differences({ content }: { content: Dictionary["home"]["differences"] }) {
  return (
    <Section id="differences" tone="base">
      <Container>
        <SectionHeading
          kicker={content.kicker}
          heading={content.heading}
          align="center"
          className="mx-auto max-w-[36ch]"
        />

        <ul className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 md:mt-20">
          {content.items.map((item, index) => (
            <Reveal
              as="li"
              key={item.title}
              delay={index * 90}
              className="flex flex-col gap-4 bg-bg p-8 md:p-11"
            >
              <span className="font-display text-sm tracking-[0.2em] text-champagne">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-serif text-xl leading-snug">{item.title}</h3>
              <p className="text-[14px] leading-[1.9] text-ink-muted">{item.description}</p>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={160}>
          <p className="mt-8 text-[13px] leading-relaxed text-ink-muted/80">
            {content.notice}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
