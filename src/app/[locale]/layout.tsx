import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cormorant_Garamond, Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import { QuickInquiry } from "@/components/QuickInquiry";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { MobileCtaBar } from "@/components/MobileCtaBar";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, locales } from "@/i18n/config";
import "../globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-cormorant",
  display: "swap",
});

const serifKr = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-serif-kr",
  display: "swap",
});

const sansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-sans-kr",
  display: "swap",
});

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
      className={`${cormorant.variable} ${serifKr.variable} ${sansKr.variable}`}
    >
      <body>
        <Header locale={locale} site={dictionary.site} nav={dictionary.nav} ui={dictionary.ui.header} />
        <main id="main">{children}</main>
        <Footer
          locale={locale}
          site={dictionary.site}
          nav={dictionary.nav}
          categories={dictionary.categories}
          ui={dictionary.ui.footer}
        />
        <MobileCtaBar site={dictionary.site} ui={dictionary.ui.mobileCta} />
        <QuickInquiry
          locale={locale}
          site={dictionary.site}
          categories={dictionary.categories}
          ui={dictionary.ui.quickInquiry}
        />
      </body>
    </html>
  );
}
