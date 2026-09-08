import {
  Cormorant_Garamond,
  Noto_Sans_JP,
  Noto_Sans_KR,
  Noto_Sans_SC,
  Noto_Serif_JP,
  Noto_Serif_KR,
  Noto_Serif_SC,
} from "next/font/google";
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

const serifSc = Noto_Serif_SC({
  weight: ["400", "600"],
  variable: "--font-serif-sc",
  display: "swap",
  preload: false,
});

const sansSc = Noto_Sans_SC({
  weight: ["400", "500"],
  variable: "--font-sans-sc",
  display: "swap",
  preload: false,
});

const serifJp = Noto_Serif_JP({
  weight: ["400", "600"],
  variable: "--font-serif-jp",
  display: "swap",
  preload: false,
});

const sansJp = Noto_Sans_JP({
  weight: ["400", "500"],
  variable: "--font-sans-jp",
  display: "swap",
  preload: false,
});

export const fontVariables = `${cormorant.variable} ${serifKr.variable} ${sansKr.variable} ${serifSc.variable} ${sansSc.variable} ${serifJp.variable} ${sansJp.variable}`;
