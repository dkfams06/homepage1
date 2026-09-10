import "server-only";

import type { Locale } from "./config";
import ko from "./dictionaries/ko.json";
import { contactDetails } from "@/content/contact";

export type Dictionary = typeof ko;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  ko: async () => ko,
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  zh: () => import("./dictionaries/zh.json").then((module) => module.default),
  ja: () => import("./dictionaries/ja.json").then((module) => module.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const dictionary = await dictionaries[locale]();
  return {
    ...dictionary,
    site: {
      ...dictionary.site,
      phoneHref: contactDetails.channels.phone,
      phone: contactDetails.channels.phone ? dictionary.site.phone : dictionary.contact.pending,
      social: dictionary.site.social.map((item, index) => ({
        ...item,
        href: [contactDetails.channels.instagram, contactDetails.channels.naver, contactDetails.channels.kakao][index] || "",
      })),
    },
  };
}
