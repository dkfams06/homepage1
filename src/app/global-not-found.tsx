import { headers } from "next/headers";
import { FailurePage } from "@/components/FailurePage";
import { defaultLocale, isLocale } from "@/i18n/config";
import "./globals.css";
import { fontVariables } from "./fonts";

export default async function GlobalNotFound() {
  const candidate = (await headers()).get("x-site-locale") ?? "";
  const locale = isLocale(candidate) ? candidate : defaultLocale;
  return <html lang={locale} className={fontVariables}><body><FailurePage locale={locale} kind="notFound" /></body></html>;
}
