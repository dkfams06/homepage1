"use client";

import { usePathname } from "next/navigation";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { feedback } from "@/i18n/feedback";

export function useFailureLocale(): Locale {
  const segment = usePathname()?.split("/")[1] ?? "";
  return isLocale(segment) ? segment : defaultLocale;
}

export function FailurePage({ locale, kind, retry }: { locale: Locale; kind: "notFound" | "error"; retry?: () => void }) {
  const copy = feedback[locale];
  const title = kind === "notFound" ? copy.notFoundTitle : copy.errorTitle;
  return (
    <div className="mx-auto flex min-h-[75svh] max-w-3xl flex-col items-start justify-center px-6 pt-32 pb-24 md:px-10">
      <title>{title}</title>
      <p className="mb-5 font-display text-5xl text-rose">{kind === "notFound" ? "404" : "500"}</p>
      <h1 className="font-serif text-3xl leading-relaxed md:text-4xl">{title}</h1>
      <p className="mt-6 text-base leading-loose text-ink-muted">{kind === "notFound" ? copy.notFoundBody : copy.errorBody}</p>
      <div className="mt-8 flex flex-wrap gap-4">
        {retry && <button type="button" onClick={retry} className="bg-rose px-6 py-3 text-sm text-white hover:bg-rose-deep">{copy.retry}</button>}
        <a href={`/${locale}`} className="border border-line px-6 py-3 text-sm hover:border-rose">{copy.home}</a>
      </div>
    </div>
  );
}
