"use client";

import { FailurePage, useFailureLocale } from "@/components/FailurePage";
import "./globals.css";
import { fontVariables } from "./fonts";

export default function GlobalError({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  const locale = useFailureLocale();
  return <html lang={locale} className={fontVariables}><body><FailurePage locale={locale} kind="error" retry={retry} /></body></html>;
}
