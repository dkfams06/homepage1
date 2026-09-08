import Image from "next/image";
import { Container } from "@/components/ui/Section";
import { CtaLink } from "@/components/ui/Button";
import { InquiryButton } from "@/components/ui/InquiryButton";
import { assetExists } from "@/lib/assets";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

/**
 * 히어로 — MAIN_PAGE_PLAN.md §6.1
 * 확정 이미지 hero.png(1672×941)를 와이드로 사용한다.
 * 텍스트는 좌측 꽃 영역 위에 배치해 얼굴을 가리지 않는다.
 * 모바일에서는 object-position을 따로 지정해 얼굴이 잘리지 않게 한다.
 */
export function Hero({
  content,
  locale,
}: {
  content: Dictionary["home"]["hero"];
  locale: Locale;
}) {
  const ready = assetExists(content.image.src);

  return (
    <section id="hero" className="relative isolate flex min-h-[88svh] flex-col justify-end overflow-hidden md:min-h-[92svh]">
      {ready ? (
        <Image
          src={content.image.src}
          alt={content.image.alt}
          fill
          priority
          sizes="100vw"
          quality={90}
          className="-z-20 object-cover object-[64%_center] md:object-[center_38%]"
        />
      ) : (
        <div className="placeholder-weave absolute inset-0 -z-20" aria-hidden="true" />
      )}

      {/* 텍스트 가독성을 위한 약한 그라데이션 오버레이 — §6.1 이미지 배치 주의사항 */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/65 via-ink/25 to-ink/10 md:bg-gradient-to-r md:from-ink/60 md:via-ink/20 md:to-transparent"
      />

      <Container className="pt-32 pb-12 md:pt-40 md:pb-20">
        <div className="flex max-w-[640px] flex-col gap-7">
          <p className="kicker text-white/80">{content.kicker}</p>

          <h1 className="font-serif text-[2.1rem] leading-[1.32] font-medium text-white text-balance sm:text-5xl md:text-[3.4rem] md:leading-[1.24]">
            {content.headline.map((line) => (
              <span key={line} className="block">
                {line}{" "}
              </span>
            ))}
          </h1>

          <p className="max-w-[44ch] text-[15px] leading-[1.9] text-white/85">
            {content.description}
          </p>

          <div className="mt-1 flex flex-wrap items-center gap-3">
            <InquiryButton variant="primary">{content.primaryCta.label}</InquiryButton>
            <CtaLink
              href={content.secondaryCta.href}
              locale={locale}
              variant="secondary"
              className="border-white/40 text-white hover:border-white hover:bg-white/10"
            >
              {content.secondaryCta.label}
            </CtaLink>
          </div>
        </div>
      </Container>

      {/* 하단 신뢰 요소 — §6.1 구성 */}
      <div className="relative border-t border-white/15 bg-ink/25 backdrop-blur-[2px]">
        <Container>
          <ul className="flex flex-col divide-y divide-white/12 sm:flex-row sm:divide-x sm:divide-y-0">
            {content.trust.map((item) => (
              <li
                key={item}
                className="flex-1 py-4 text-[13px] tracking-wide text-white/85 sm:px-6 sm:py-5 sm:text-center sm:first:pl-0 sm:last:pr-0"
              >
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}
