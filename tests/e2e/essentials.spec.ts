import { test, expect } from "@playwright/test";
import ko from "../../src/i18n/dictionaries/ko.json";
import en from "../../src/i18n/dictionaries/en.json";
import zh from "../../src/i18n/dictionaries/zh.json";
import ja from "../../src/i18n/dictionaries/ja.json";

for (const [locale, d] of Object.entries({ ko, en, zh, ja })) {
  test(`${locale}: essential information and unavailable channels stay honest`, async ({ page }) => {
    for (const route of ["", "/about", "/inquire", "/about/faq"]) {
      await page.goto(`/${locale}${route}`);
      await expect(page.locator('a[href=""], a[href="#"], a[href^="tel:"], a[href*="map.naver.com/p/search/"]')).toHaveCount(0);
      await expect(page.locator("body")).not.toContainText("02-0000-0000");
      if (route === "/about") {
        const section = page.locator("#clinic-information");
        await expect(section.getByRole("heading", { level: 3 })).toHaveCount(3);
        await expect(section).toContainText(d.clinicEssentials.notice);
        await section.locator("a").click();
        await expect(page).toHaveURL(new RegExp(`/${locale}/about/faq$`));
      }
      if (route === "/inquire") {
        await expect(page.locator("main")).toContainText(d.home.inquire.description);
        await expect(page.locator("main")).not.toContainText("상담은 무료이며");
        await expect(page.locator("#contact")).toHaveCount(1);
        await expect(page.locator("section#location")).toHaveCount(0);
        await expect(page.locator("main")).toContainText(d.home.inquire.responseNotice);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
  });
}
