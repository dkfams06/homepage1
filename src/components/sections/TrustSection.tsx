import { trust } from "@/content/home";
import { reviews, trustFacts } from "@/content/reviews";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/**
 * 후기 및 신뢰 정보 — MAIN_PAGE_PLAN.md §6.9
 * 수치는 산정 기준을 함께 표기한다.
 */
export function TrustSection() {
  return (
    <Section tone="base">
      <Container>
        <SectionHeading
          kicker={trust.kicker}
          heading={trust.heading}
          description={trust.description}
          align="center"
          className="mx-auto max-w-[46ch]"
        />

        <dl className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 md:mt-18 lg:grid-cols-4">
          {trustFacts.map((fact, index) => (
            <Reveal
              key={fact.label}
              delay={index * 80}
              className="flex flex-col items-center gap-2 bg-bg px-6 py-9 text-center"
            >
              <dt className="text-[13px] tracking-wide text-ink-muted">{fact.label}</dt>
              <dd className="font-display text-4xl text-rose">{fact.value}</dd>
              <p className="text-[11px] leading-relaxed text-ink-muted/70">{fact.basis}</p>
            </Reveal>
          ))}
        </dl>

        <ul className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <Reveal
              as="li"
              key={review.id}
              delay={index * 90}
              className="flex flex-col justify-between gap-6 border border-line bg-surface p-8"
            >
              <blockquote className="font-serif text-[17px] leading-[1.85]">
                &ldquo;{review.quote}&rdquo;
              </blockquote>
              <footer className="flex items-center gap-3 text-[13px] text-ink-muted">
                <span aria-hidden="true" className="block h-px w-6 bg-champagne" />
                <span>
                  {review.author} · {review.meta}
                </span>
              </footer>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={140}>
          <p className="mt-8 text-center text-[12px] leading-relaxed text-ink-muted/75">
            게시된 후기는 작성자의 동의를 받아 일부만 발췌한 내용이며, 개인에 따라 경과와 만족도는 달라질 수 있습니다.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
