import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import { site } from "@/content/site";
import { QuickInquiry } from "@/components/QuickInquiry";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { MobileCtaBar } from "@/components/MobileCtaBar";
import "./globals.css";

/* 타이포그래피 — MAIN_PAGE_PLAN.md §4 타이포그래피 방향 */
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

/**
 * TODO(SEO): 도메인 연결 후 metadataBase, canonical, openGraph 이미지, robots를 확정한다.
 * 구조화 데이터(의료기관·의료진·FAQ)도 실제 정보 확정 후 적용한다. (§12)
 */
export const metadata: Metadata = {
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description:
    "개인의 얼굴과 신체 비율을 존중하는 맞춤 설계. 성형외과 전문의가 상담부터 수술, 회복까지 직접 함께합니다.",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: site.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${cormorant.variable} ${serifKr.variable} ${sansKr.variable}`}>
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileCtaBar />
        <QuickInquiry />
      </body>
    </html>
  );
}
