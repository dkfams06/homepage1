import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { AssetImage } from "@/components/ui/AssetImage";
import { CtaLink } from "@/components/ui/Button";
import { InquiryButton } from "@/components/ui/InquiryButton";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

/**
 * 문의하기 — MAIN_PAGE_PLAN.md §6.10
 * 메인 CTA는 빠른 상담 패널을 열고, 상세 문의는 독립 페이지로 연결한다.
 */
export function InquireCta({
  content,
  site,
  locale,
}: {
  content: Dictionary["home"]["inquire"];
  site: Dictionary["site"];
  locale: Locale;
}) {
  return (
    <Section id="inquire" tone="blush">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-20">
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
              <p className="max-w-[44ch] text-[15px] leading-[1.9] text-ink-muted">
                {content.description}
              </p>
            </Reveal>

            <Reveal delay={130} className="flex flex-wrap items-center gap-3">
              <InquiryButton variant="primary">{content.primaryCta.label}</InquiryButton>
              <CtaLink href={content.secondaryCta.href} locale={locale} variant="secondary">
                {content.secondaryCta.label}
              </CtaLink>
            </Reveal>

            <Reveal delay={190}>
              <p className="text-[13px] leading-relaxed text-ink-muted">
                {content.phoneLabel}{" "}
                <a href={site.phoneHref} className="text-rose underline underline-offset-4">
                  {site.phone}
                </a>
                <br />
                {content.hoursNotice}
              </p>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <AssetImage
              magnetic
              src={content.image.src}
              alt={content.image.alt}
              ratio="4/5"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
