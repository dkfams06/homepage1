import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { AssetImage } from "@/components/ui/AssetImage";
import { CtaLink } from "@/components/ui/Button";
import { InquiryButton } from "@/components/ui/InquiryButton";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

/**
 * 바디 시술 소개 — MAIN_PAGE_PLAN.md §6.6
 * 얼굴 중심의 앞부분과 시각적 리듬을 바꾸기 위해 이미지를 크게 쓰고 좌우를 교차한다.
 */
export function BodySection({
  content,
  locale,
}: {
  content: Dictionary["home"]["body"];
  locale: Locale;
}) {
  return (
    <Section id="body" tone="blush">
      <Container>
        <div className="grid items-center gap-12 md:gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-24">
          <div className="flex flex-col gap-8">
            <Reveal className="flex flex-col gap-5">
              <p className="kicker">{content.kicker}</p>
              <h2 className="font-serif text-3xl leading-[1.38] font-medium text-balance sm:text-4xl md:text-[2.6rem]">
                {content.heading.map((line) => (
                  <span key={line} className="block">
                    {line}{" "}
                  </span>
                ))}
              </h2>
              <p className="max-w-[46ch] text-[15px] leading-[1.9] text-ink-muted">
                {content.description}
              </p>
            </Reveal>

            <Reveal delay={140} className="flex flex-col gap-5">
              <h3 className="font-serif text-xl">{content.lead}</h3>
              <ul className="flex flex-wrap gap-2">
                {content.areas.map((area) => (
                  <li
                    key={area}
                    className="border border-champagne/50 bg-bg px-4 py-2 text-[13px] tracking-wide text-ink-muted"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={200} className="flex flex-wrap items-center gap-3">
              <InquiryButton variant="primary">{content.primaryCta.label}</InquiryButton>
              <CtaLink href={content.secondaryCta.href} locale={locale} variant="secondary">
                {content.secondaryCta.label}
              </CtaLink>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <AssetImage
              magnetic
              src={content.image.src}
              alt={content.image.alt}
              ratio="4/5"
              sizes="(min-width: 1024px) 42vw, 100vw"
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
