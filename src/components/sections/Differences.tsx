import { differences } from "@/content/home";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/** 병원의 차별점 — MAIN_PAGE_PLAN.md §6.7 */
export function Differences() {
  return (
    <Section tone="base">
      <Container>
        <SectionHeading
          kicker={differences.kicker}
          heading={differences.heading}
          align="center"
          className="mx-auto max-w-[36ch]"
        />

        <ul className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 md:mt-20">
          {differences.items.map((item, index) => (
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
            본 내용은 진료 원칙에 대한 안내이며, 시술 결과와 회복 과정은 개인에 따라 달라질 수 있습니다.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
