"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { ImageFrame } from "@/components/ui/ImageFrame";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizeHref, type Locale } from "@/i18n/config";

/**
 * 핵심 시술 분야 탭 — MAIN_PAGE_PLAN.md §6.3
 * 메인에서는 요약만 제공하고 전문 설명은 개별 Service 페이지가 담당한다.
 */
export function ServiceExplorerTabs({
  readyMap,
  categories,
  locale,
  ui,
}: {
  readyMap: Record<string, boolean>;
  categories: Dictionary["categories"];
  locale: Locale;
  ui: Dictionary["ui"]["services"];
}) {
  const [activeId, setActiveId] = useState(categories[0].id);
  const baseId = useId();
  const active = categories.find((category) => category.id === activeId) ?? categories[0];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.36fr)_minmax(0,1fr)] lg:gap-16">
      {/* 카테고리 세로 메뉴. 모바일에서는 가로 스크롤 탭으로 전환된다. */}
      <div
        role="tablist"
        aria-label={ui.tabLabel}
        aria-orientation="horizontal"
        className="-mx-6 flex snap-x gap-2 overflow-x-auto px-6 pb-2 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0"
      >
        {categories.map((category) => {
          const selected = category.id === active.id;
          return (
            <button
              key={category.id}
              type="button"
              role="tab"
              id={`${baseId}-tab-${category.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${category.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(category.id)}
              onKeyDown={(event) => {
                if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
                event.preventDefault();
                const index = categories.findIndex((c) => c.id === active.id);
                const next =
                  event.key === "ArrowRight"
                    ? (index + 1) % categories.length
                    : (index - 1 + categories.length) % categories.length;
                setActiveId(categories[next].id);
                document.getElementById(`${baseId}-tab-${categories[next].id}`)?.focus();
              }}
              className={`shrink-0 snap-start border px-5 py-3 text-left text-[15px] whitespace-nowrap transition-colors duration-300 lg:w-full lg:border-0 lg:border-b lg:border-line lg:px-0 lg:py-5 ${
                selected
                  ? "border-rose bg-rose-tint text-rose-deep lg:bg-transparent lg:text-rose"
                  : "border-line text-ink-muted hover:text-ink"
              }`}
            >
              <span className="flex items-baseline gap-3">
                <span className="font-serif">{category.name}</span>
                <span className="font-display text-[11px] tracking-[0.18em] uppercase opacity-60">
                  {category.nameEn}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* 선택된 카테고리 상세 */}
      <div
        role="tabpanel"
        id={`${baseId}-panel-${active.id}`}
        aria-labelledby={`${baseId}-tab-${active.id}`}
        className="grid gap-8 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] sm:items-center sm:gap-12"
      >
        <ImageFrame
          key={active.id}
          ready={readyMap[active.image] ?? false}
          src={active.image}
          alt={`${active.name} ${ui.imageSuffix}`}
          ratio="3/4"
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 40vw, 100vw"
        />

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h3 className="font-serif text-2xl md:text-[1.75rem]">{active.lead}</h3>
            <p className="text-[15px] leading-[1.9] text-ink-muted">{active.description}</p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-[13px] tracking-wide text-ink-muted/80">{ui.concerns}</p>
            <ul className="flex flex-wrap gap-2">
              {active.concerns.map((concern) => (
                <li
                  key={concern}
                  className="bg-rose-tint px-3.5 py-1.5 text-[13px] text-rose-deep"
                >
                  {concern}
                </li>
              ))}
            </ul>
          </div>

          <Link
            href={localizeHref(locale, active.href)}
            className="mt-1 self-start border-b border-rose/40 pb-1 text-sm tracking-wide text-rose transition-colors hover:border-rose"
          >
            {locale === "ko" ? `${active.name} ${ui.detailsSuffix}` : `${ui.detailsSuffix}: ${active.name}`}
          </Link>
        </div>
      </div>
    </div>
  );
}
