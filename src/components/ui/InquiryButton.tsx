"use client";

import type { ReactNode } from "react";
import { openQuickInquiry } from "@/components/QuickInquiry";
import { ctaClass, type CtaVariant } from "./Button";

/** 빠른 상담 패널을 여는 CTA. (§6.10) */
export function InquiryButton({
  variant = "primary",
  className = "",
  children,
}: {
  variant?: CtaVariant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <button type="button" onClick={openQuickInquiry} className={`${ctaClass(variant)} ${className}`}>
      {children}
    </button>
  );
}
