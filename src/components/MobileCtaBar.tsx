"use client";

import { openQuickInquiry } from "./QuickInquiry";
import type { Dictionary } from "@/i18n/dictionaries";

/**
 * 모바일 하단 고정 상담 바 — MAIN_PAGE_PLAN.md §13
 * 전화, 온라인 상담, 길찾기 중 핵심 행동을 빠르게 선택할 수 있게 한다.
 * 안전 영역을 확보해 콘텐츠를 가리지 않도록 한다. (§10)
 */
export function MobileCtaBar({
  site,
  ui,
}: {
  site: Dictionary["site"];
  ui: Dictionary["ui"]["mobileCta"];
}) {
  const mapSearch = `https://map.naver.com/p/search/${encodeURIComponent(site.address)}`;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg/95 backdrop-blur-sm pb-[env(safe-area-inset-bottom)] md:hidden">
      <div className="grid grid-cols-3">
        <a
          href={site.phoneHref}
          className="flex min-h-14 items-center justify-center border-r border-line text-[13px] tracking-wide"
        >
          {ui.phone}
        </a>
        <a
          href={mapSearch}
          className="flex min-h-14 items-center justify-center border-r border-line text-[13px] tracking-wide"
        >
          {ui.directions}
        </a>
        <button
          type="button"
          onClick={openQuickInquiry}
          className="flex min-h-14 items-center justify-center bg-rose text-[13px] tracking-wide text-white"
        >
          {ui.consult}
        </button>
      </div>
    </div>
  );
}
