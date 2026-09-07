"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** 순차 등장을 위한 지연 시간(ms) */
  delay?: number;
};

/**
 * 스크롤 진입 시 페이드 인 + 부드러운 세로 이동. (MAIN_PAGE_PLAN.md §4 모션 방향)
 * 모션 감소 설정에서는 globals.css의 미디어 쿼리가 전환을 제거한다.
 */
export function Reveal({ children, as: Tag = "div", className = "", delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches || !window.IntersectionObserver) return;
    const animations: Animation[] = [];
    const show = () => {
      el.dataset.visible = "true";
      animations.forEach((animation) => animation.finish());
    };
    motion.addEventListener("change", show);
    el.addEventListener("focusin", show);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.visible = "true";
          if (!motion.matches) {
            const heading = el.querySelector("h1, h2");
            const lines = heading ? Array.from(heading.children) : [];
            const targets = lines.length ? lines : heading ? [heading] : [];
            targets.forEach((target, index) => {
              animations.push(target.animate(
                [{ opacity: 0, transform: "translateY(12px)" }, { opacity: 1, transform: "translateY(0)" }],
                { duration: 700, delay: Math.min(delay, 200) + index * 75, easing: "cubic-bezier(0.22, 0.61, 0.36, 1)", fill: "backwards" },
              ));
            });
          }
          observer.unobserve(el);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -5% 0px" },
    );

    if (el.getBoundingClientRect().top > window.innerHeight * 0.95) el.dataset.visible = "false";
    observer.observe(el);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", show);
      el.removeEventListener("focusin", show);
      animations.forEach((animation) => animation.cancel());
    };
  }, [delay]);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
