"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ImageFrame } from "@/components/ui/ImageFrame";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizeHref, type Locale } from "@/i18n/config";

const SPEED_DESKTOP = 0.45; // px per frame
const SPEED_MOBILE = 0.28; // §10 모바일 — 자동 애니메이션 속도를 낮춘다

/**
 * 시술 카테고리 자동 슬라이드 — MAIN_PAGE_PLAN.md §6.4
 * 우측에서 좌측으로 천천히 자동 이동하고, 끊김 없이 반복된다.
 * 마우스 오버·포커스·터치 중에는 일시 정지하며 드래그와 스와이프를 지원한다.
 * 모션 감소 설정에서는 자동 이동을 끄고 수동 탐색만 제공한다.
 */
export function CategoryMarqueeTrack({
  readyMap,
  categories,
  locale,
  ui,
}: {
  readyMap: Record<string, boolean>;
  categories: Dictionary["categories"];
  locale: Locale;
  ui: Dictionary["ui"]["marquee"];
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  // 자동 이동을 멈춰야 하는 상태들. 하나라도 참이면 이동하지 않는다.
  const holdRef = useRef({ hover: false, focus: false, dragging: false });
  const playingRef = useRef(true);

  // 렌더 중에 ref를 건드리지 않도록 상태 변화 후에 동기화한다.
  useEffect(() => {
    playingRef.current = playing && !reducedMotion;
  }, [playing, reducedMotion]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || reducedMotion) return;

    const speed = window.matchMedia("(max-width: 767px)").matches
      ? SPEED_MOBILE
      : SPEED_DESKTOP;

    let frame = 0;
    const step = () => {
      const hold = holdRef.current;
      if (playingRef.current && !hold.hover && !hold.focus && !hold.dragging) {
        scroller.scrollLeft += speed;
      }
      // 목록을 두 벌 렌더링하므로 절반을 지나면 되돌려 무한 루프처럼 보이게 한다.
      const half = scroller.scrollWidth / 2;
      if (half > 0 && scroller.scrollLeft >= half) {
        scroller.scrollLeft -= half;
      }
      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [reducedMotion]);

  // 마우스 드래그 탐색
  const dragState = useRef({ startX: 0, startScroll: 0, moved: 0 });

  const onPointerDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return; // 터치는 네이티브 스와이프에 맡긴다
    const scroller = scrollerRef.current;
    if (!scroller) return;
    holdRef.current.dragging = true;
    dragState.current = { startX: event.clientX, startScroll: scroller.scrollLeft, moved: 0 };
    scroller.setPointerCapture(event.pointerId);
  }, []);

  const onPointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (!holdRef.current.dragging) return;
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const delta = event.clientX - dragState.current.startX;
    dragState.current.moved = Math.abs(delta);
    scroller.scrollLeft = dragState.current.startScroll - delta;
  }, []);

  const endDrag = useCallback(() => {
    holdRef.current.dragging = false;
  }, []);

  const items = [...categories, ...categories];

  return (
    <div className="flex flex-col gap-5">
      <div
        ref={scrollerRef}
        onMouseEnter={() => (holdRef.current.hover = true)}
        onMouseLeave={() => {
          holdRef.current.hover = false;
          endDrag();
        }}
        onTouchStart={() => (holdRef.current.dragging = true)}
        onTouchEnd={() => (holdRef.current.dragging = false)}
        onFocusCapture={() => (holdRef.current.focus = true)}
        onBlurCapture={() => (holdRef.current.focus = false)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="flex touch-pan-y gap-4 overflow-x-auto overscroll-x-contain px-6 [scrollbar-width:none] select-none md:gap-6 md:px-10 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((category, index) => (
          <Link
            key={`${category.id}-${index}`}
            href={localizeHref(locale, category.href)}
            aria-hidden={index >= categories.length}
            tabIndex={index >= categories.length ? -1 : undefined}
            onClick={(event) => {
              // 드래그로 끝난 포인터 조작은 이동으로 처리하지 않는다.
              if (dragState.current.moved > 8) event.preventDefault();
            }}
            className="group relative w-[220px] shrink-0 md:w-[280px]"
          >
            <ImageFrame
              ready={readyMap[category.image] ?? false}
              src={category.image}
              alt={`${category.name} ${ui.imageSuffix}`}
              ratio="3/4"
              sizes="(min-width: 768px) 280px, 220px"
              className="transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-[1.02]"
            />
            <div className="mt-4 flex flex-col gap-1">
              <span className="font-display text-[11px] tracking-[0.2em] text-champagne uppercase">
                {category.nameEn}
              </span>
              <span className="font-serif text-lg transition-colors group-hover:text-rose">
                {category.name}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* §11 접근성 — 자동 이동 콘텐츠에는 정지 수단을 제공한다 */}
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10">
        <button
          type="button"
          onClick={() => setPlaying((value) => !value)}
          aria-pressed={!playing}
          disabled={reducedMotion}
          className="border border-line px-4 py-2 text-[12px] tracking-wide text-ink-muted transition-colors hover:border-ink/40 hover:text-ink disabled:opacity-45"
        >
          {reducedMotion
            ? ui.reduced
            : playing
              ? ui.pause
              : ui.play}
        </button>
      </div>
    </div>
  );
}
