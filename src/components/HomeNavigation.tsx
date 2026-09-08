"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export function HomeNavigation({ locale, content, solid = true, mobile = false, onNavigate }: {
  locale: Locale; content: Dictionary["homeNavigation"]; solid?: boolean; mobile?: boolean; onNavigate?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const id = mobile ? "home-sections-mobile" : "home-sections-desktop";
  useEffect(() => {
    if (!open) return;
    const outside = (e: PointerEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false); };
    const escape = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); toggle.current?.focus(); } };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", escape); };
  }, [open]);
  const navigate = () => { setOpen(false); onNavigate?.(); };
  return (
    <div ref={root} className={`relative ${mobile ? "border-b border-line" : ""}`} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false); }}>
      <div className={`flex items-center ${mobile ? "justify-between py-3" : ""}`}>
        <Link href={`/${locale}`} onClick={navigate} className={mobile ? "flex items-baseline gap-4" : `flex flex-col items-center text-[13px] tracking-[0.14em] uppercase ${solid ? "text-ink" : "text-white"}`}>
          <span className={mobile ? "font-display text-3xl tracking-[0.1em] uppercase" : ""}>{content.label}</span>
          <span className={mobile ? "text-[13px] text-ink-muted" : `text-[10px] tracking-normal ${solid ? "text-ink-muted" : "text-white/60"}`}>{content.subLabel}</span>
        </Link>
        <button ref={toggle} type="button" aria-label={content.toggle} aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)} className={`flex min-h-11 min-w-8 items-center justify-center ${solid ? "text-ink" : "text-white"}`}>
          <FaChevronDown size={10} aria-hidden="true" className={`transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
      </div>
      <div id={id} hidden={!open} className={mobile ? "grid grid-cols-2 gap-1 pb-5" : "absolute top-full left-0 grid max-h-[calc(100dvh-100px)] w-72 grid-cols-1 overflow-y-auto border border-line bg-bg p-3 text-ink shadow-sm"}>
        {content.sections.map((section) => (
          <Link key={section.id} href={`/${locale}#${section.id}`} onClick={navigate} className="flex min-h-11 items-center px-3 py-2 text-[13px] leading-relaxed text-ink-muted transition-colors hover:bg-rose-tint hover:text-rose">
            {section.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
