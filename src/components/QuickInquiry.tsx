"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { categories } from "@/content/categories";
import { site } from "@/content/site";

export const OPEN_INQUIRY_EVENT = "open-quick-inquiry";

/** 어디서든 빠른 상담 패널을 연다. (§6.10 — 사용자가 CTA를 선택했을 때만 열린다) */
export function openQuickInquiry() {
  window.dispatchEvent(new CustomEvent(OPEN_INQUIRY_EVENT));
}

type Status = "idle" | "submitting" | "done";

/**
 * 빠른 상담 슬라이드 패널 — MAIN_PAGE_PLAN.md §6.10
 * 항목: 이름, 연락처, 관심 시술, 상담 방식, 개인정보 동의
 * 자동으로 반복 노출하지 않는다.
 */
export function QuickInquiry() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    setStatus("idle");
    restoreFocusRef.current?.focus();
  }, []);

  useEffect(() => {
    const onOpen = () => {
      restoreFocusRef.current = document.activeElement as HTMLElement | null;
      setOpen(true);
    };
    window.addEventListener(OPEN_INQUIRY_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_INQUIRY_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      // §11 접근성 — 패널 안에서 포커스가 순환하도록 유지한다.
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO(연동): 상담 접수 API 또는 알림 채널을 연결한다.
    // 엔드포인트 연결 전까지 실제 전송은 이루어지지 않는다.
    setStatus("submitting");
    window.setTimeout(() => setStatus("done"), 400);
  };

  return (
    <div aria-hidden={!open} className={open ? "" : "pointer-events-none"}>
      <div
        onClick={close}
        className={`fixed inset-0 z-50 bg-ink/40 transition-opacity duration-400 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="빠른 상담 신청"
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-[440px] flex-col bg-surface shadow-2xl transition-transform duration-500 ease-[var(--ease-soft)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-start justify-between border-b border-line px-7 py-6">
          <div className="flex flex-col gap-1.5">
            <p className="kicker">Quick Inquiry</p>
            <h2 className="font-serif text-xl">빠른 상담 신청</h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="상담 패널 닫기"
            className="-mr-2 -mt-1 p-2 text-2xl leading-none text-ink-muted transition-colors hover:text-ink"
          >
            &times;
          </button>
        </div>

        {status === "done" ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <p className="font-serif text-2xl">상담 신청이 접수되었습니다</p>
            <p className="text-sm leading-relaxed text-ink-muted">
              진료 시간 기준 영업일 1일 이내에 담당자가 연락드립니다.
              <br />
              급하신 경우 {site.phone}로 문의해 주세요.
            </p>
            <button
              type="button"
              onClick={close}
              className="mt-2 border-b border-rose/40 pb-1 text-sm text-rose"
            >
              닫기
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-1 flex-col gap-5 overflow-y-auto px-7 py-7">
            <Field label="이름" htmlFor="qi-name">
              <input
                id="qi-name"
                name="name"
                required
                autoComplete="name"
                className={inputClass}
                placeholder="성함을 입력해 주세요"
              />
            </Field>

            <Field label="연락처" htmlFor="qi-phone">
              <input
                id="qi-phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                inputMode="numeric"
                className={inputClass}
                placeholder="010-0000-0000"
              />
            </Field>

            <Field label="관심 시술" htmlFor="qi-category">
              <select id="qi-category" name="category" className={inputClass} defaultValue="">
                <option value="">아직 정하지 않았어요</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </Field>

            <fieldset className="flex flex-col gap-3">
              <legend className="mb-1 text-[13px] tracking-wide text-ink-muted">
                상담 방식
              </legend>
              <div className="flex flex-wrap gap-2">
                {["전화 상담", "카카오톡 상담", "내원 상담"].map((method, index) => (
                  <label
                    key={method}
                    className="cursor-pointer border border-line px-4 py-2.5 text-[13px] transition-colors has-checked:border-rose has-checked:bg-rose-tint has-checked:text-rose-deep"
                  >
                    <input
                      type="radio"
                      name="method"
                      value={method}
                      defaultChecked={index === 0}
                      className="sr-only"
                    />
                    {method}
                  </label>
                ))}
              </div>
            </fieldset>

            <Field label="간단한 문의 내용" htmlFor="qi-message" optional>
              <textarea
                id="qi-message"
                name="message"
                rows={3}
                className={`${inputClass} resize-none`}
                placeholder="고민하시는 부분을 자유롭게 적어 주세요"
              />
            </Field>

            <label className="mt-1 flex items-start gap-3 text-[13px] leading-relaxed text-ink-muted">
              <input
                type="checkbox"
                name="consent"
                required
                className="mt-0.5 size-4 shrink-0 accent-[var(--color-rose)]"
              />
              <span>
                상담을 위한 개인정보 수집 및 이용에 동의합니다.{" "}
                <a href="/privacy" className="text-rose underline underline-offset-2">
                  자세히 보기
                </a>
                <br />
                수집 항목: 이름, 연락처, 관심 시술 · 보유 기간: 상담 완료 후 1년
              </span>
            </label>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-auto bg-rose px-7 py-4 text-sm tracking-wide text-white transition-colors hover:bg-rose-deep disabled:opacity-60"
            >
              {status === "submitting" ? "접수 중..." : "상담 신청하기"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

const inputClass =
  "w-full border border-line bg-bg px-4 py-3 text-[14px] text-ink transition-colors placeholder:text-ink-muted/60 focus:border-rose focus:outline-none";

function Field({
  label,
  htmlFor,
  optional = false,
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-[13px] tracking-wide text-ink-muted">
        {label}
        {optional ? <span className="ml-1.5 text-ink-muted/60">(선택)</span> : null}
      </label>
      {children}
    </div>
  );
}
