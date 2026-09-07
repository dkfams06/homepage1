import { inquire } from "@/content/home";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { AssetImage } from "@/components/ui/AssetImage";
import { CtaLink } from "@/components/ui/Button";
import { InquiryButton } from "@/components/ui/InquiryButton";
import { site } from "@/content/site";

/**
 * 문의하기 — MAIN_PAGE_PLAN.md §6.10
 * 메인 CTA는 빠른 상담 패널을 열고, 상세 문의는 독립 페이지로 연결한다.
 */
export function InquireCta() {
  return (
    <Section id="inquire" tone="blush">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-20">
          <div className="flex flex-col gap-8">
            <Reveal className="flex flex-col gap-5">
              <p className="kicker">{inquire.kicker}</p>
              <h2 className="font-serif text-3xl leading-[1.38] font-medium text-balance sm:text-4xl md:text-[2.6rem]">
                {inquire.heading.map((line) => (
                  <span key={line} className="block">
                    {line}{" "}
                  </span>
                ))}
              </h2>
              <p className="max-w-[44ch] text-[15px] leading-[1.9] text-ink-muted">
                {inquire.description}
              </p>
            </Reveal>

            <Reveal delay={130} className="flex flex-wrap items-center gap-3">
              <InquiryButton variant="primary">{inquire.primaryCta.label}</InquiryButton>
              <CtaLink href={inquire.secondaryCta.href} variant="secondary">
                {inquire.secondaryCta.label}
              </CtaLink>
            </Reveal>

            <Reveal delay={190}>
              <p className="text-[13px] leading-relaxed text-ink-muted">
                전화 상담{" "}
                <a href={site.phoneHref} className="text-rose underline underline-offset-4">
                  {site.phone}
                </a>
                <br />
                진료 시간 내에 연결되며, 이후 접수 건은 다음 영업일에 순차 안내드립니다.
              </p>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <AssetImage
              src={inquire.image.src}
              alt={inquire.image.alt}
              ratio="4/5"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
