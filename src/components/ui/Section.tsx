import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/** 본문 최대 폭 — §10 데스크톱 여백 기준 */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1280px] px-6 md:px-10 ${className}`}>
      {children}
    </div>
  );
}

/**
 * 섹션 제목 블록.
 * §12 SEO — 섹션 제목은 H2, 하위 항목은 H3로 계층화한다.
 */
export function SectionHeading({
  kicker,
  heading,
  description,
  align = "left",
  className = "",
}: {
  kicker?: string;
  heading: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const alignment = align === "center" ? "items-center text-center" : "items-start";

  return (
    <Reveal className={`flex flex-col gap-5 ${alignment} ${className}`}>
      {kicker ? <p className="kicker">{kicker}</p> : null}
      <h2 className="font-serif text-3xl leading-[1.35] font-medium text-balance sm:text-4xl md:text-[2.75rem]">
        {heading}
      </h2>
      {description ? (
        <p
          className={`max-w-[46ch] text-[15px] leading-[1.85] text-ink-muted ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}

/** 섹션 래퍼 — 상하 여백과 배경 톤을 통일한다. */
export function Section({
  id,
  tone = "base",
  className = "",
  children,
}: {
  id?: string;
  tone?: "base" | "blush" | "surface";
  className?: string;
  children: ReactNode;
}) {
  const tones = {
    base: "bg-bg",
    blush: "bg-bg-blush",
    surface: "bg-surface",
  } as const;

  return (
    <section id={id} className={`${tones[tone]} py-20 md:py-28 lg:py-32 ${className}`}>
      {children}
    </section>
  );
}
