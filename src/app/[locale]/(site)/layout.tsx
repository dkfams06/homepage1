import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import { QuickInquiry } from "@/components/QuickInquiry";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { MobileCtaBar } from "@/components/MobileCtaBar";
import { FloatingContact } from "@/components/FloatingContact";

export default async function PublicLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = await getDictionary(locale);
  return <>
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
  </>;
}
