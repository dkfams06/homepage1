"use client";

import { useCallback, useRef, useState } from "react";
import { ImageFrame } from "@/components/ui/ImageFrame";
import type { Dictionary } from "@/i18n/dictionaries";

/**
 * Before & After 드래그 비교 — MAIN_PAGE_PLAN.md §6.5
 * 왼쪽 Before, 오른쪽 After. 마우스·터치·키보드 조작을 모두 지원한다.
 * 접근성을 위해 range 입력을 실제 조작 요소로 사용한다. (§11)
 */
export function BeforeAfterCompare({
  beforeReady,
  afterReady,
  content,
  ui,
}: {
  beforeReady: boolean;
  afterReady: boolean;
  content: Dictionary["home"]["beforeAfter"];
  ui: Dictionary["ui"]["beforeAfter"];
}) {
  const [position, setPosition] = useState(50);
  const frameRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    const ratio = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, Math.round(ratio))));
  }, []);

  return (
    <figure className="flex flex-col gap-5">
      <div
        ref={frameRef}
        onPointerDown={(event) => {
          draggingRef.current = true;
          event.currentTarget.setPointerCapture(event.pointerId);
          updateFromClientX(event.clientX);
        }}
        onPointerMove={(event) => {
          if (!draggingRef.current) return;
          updateFromClientX(event.clientX);
        }}
        onPointerUp={() => (draggingRef.current = false)}
        onPointerCancel={() => (draggingRef.current = false)}
        className="relative touch-pan-y overflow-hidden select-none"
        style={{ aspectRatio: "4/5" }}
      >
        {/* After — 아래층 전체 노출 */}
        <ImageFrame
          ready={afterReady}
          src={content.after.src}
          alt={content.after.alt}
          ratio="4/5"
          sizes={content.isIllustration ? "(min-width: 1024px) 90vw, 200vw" : "(min-width: 1024px) 45vw, 100vw"}
          className="absolute inset-0"
          objectPosition={content.isIllustration ? "right center" : "center"}
        />

        {/* Before — 위층을 좌측부터 position%까지만 보여준다 */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <ImageFrame
            ready={beforeReady}
            src={content.before.src}
            alt={content.before.alt}
            ratio="4/5"
            sizes={content.isIllustration ? "(min-width: 1024px) 90vw, 200vw" : "(min-width: 1024px) 45vw, 100vw"}
            className="absolute inset-0"
            objectPosition={content.isIllustration ? "left center" : "center"}
          />
        </div>

        {content.isIllustration && <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[8%] min-h-14 bg-bg" />}
        <span className="absolute top-4 left-4 bg-ink/70 px-3 py-1.5 text-[12px] tracking-[0.14em] text-white uppercase">
          {ui.before}
        </span>
        <span className="absolute top-4 right-4 bg-rose/85 px-3 py-1.5 text-[12px] tracking-[0.14em] text-white uppercase">
          {ui.after}
        </span>

        {/* 중앙 구분선과 핸들 */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 w-px bg-white/90 shadow-[0_0_12px_rgba(0,0,0,0.25)]"
          style={{ left: `${position}%` }}
        >
          <span className="absolute top-1/2 left-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/90 text-ink shadow-lg md:size-11">
            <svg width="22" height="12" viewBox="0 0 22 12" fill="none" aria-hidden="true">
              <path d="M7 1 2 6l5 5M15 1l5 5-5 5" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </span>
        </div>

        {/* 실제 조작 요소. 키보드 좌우 키로 조절된다. */}
        <input
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-label={ui.sliderLabel}
          aria-valuetext={ui.valueText
            .replace("{before}", String(position))
            .replace("{after}", String(100 - position))}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
        {content.isIllustration && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-ink px-4 py-5 text-center text-[13px] leading-relaxed text-white">
            {content.notice}
          </div>
        )}
      </div>

      {/* §11 접근성 — 이미지에만 의존하지 않고 현재 상태를 텍스트로 제공한다 */}
      <p aria-live="polite" className="text-[13px] text-ink-muted">
        {ui.status
          .replace("{before}", String(position))
          .replace("{after}", String(100 - position))}
      </p>
    </figure>
  );
}
