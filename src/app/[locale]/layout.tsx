import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fontVariables } from "../fonts";
import { QuickInquiry } from "@/components/QuickInquiry";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { MobileCtaBar } from "@/components/MobileCtaBar";
import { FloatingContact } from "@/components/FloatingContact";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, locales } from "@/i18n/config";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.meta.title,
    description: dictionary.meta.description,
    openGraph: {
      type: "website",
      locale: dictionary.meta.ogLocale,
      siteName: dictionary.site.name,
      title: dictionary.meta.title,
      description: dictionary.meta.description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dictionary = await getDictionary(locale);

  return (
    <html
      lang={locale}
      className={fontVariables}
    >
      <body>
        <Header locale={locale} site={dictionary.site} nav={dictionary.nav} ui={dictionary.ui.header} homeNavigation={dictionary.homeNavigation} />
        <main id="main" tabIndex={-1}>{children}</main>
        <Footer
          locale={locale}
          site={dictionary.site}
          nav={dictionary.nav}
          categories={dictionary.categories}
          ui={dictionary.ui.footer}
        />
        <MobileCtaBar site={dictionary.site} ui={dictionary.ui.mobileCta} />
        <FloatingContact content={dictionary.contact} />
        <QuickInquiry
          locale={locale}
          availability={dictionary.inquiryAvailability}
          categories={dictionary.categories}
          contact={dictionary.contact}
          site={dictionary.site}
          ui={dictionary.ui.quickInquiry}
        />
      </body>
    </html>
  );
}
