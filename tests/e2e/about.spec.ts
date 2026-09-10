import { test, expect } from "@playwright/test";
import ko from "../../src/i18n/dictionaries/ko.json";
import en from "../../src/i18n/dictionaries/en.json";
import zh from "../../src/i18n/dictionaries/zh.json";
import ja from "../../src/i18n/dictionaries/ja.json";

for (const [locale, d] of Object.entries({ ko, en, zh, ja })) {
  test(`${locale}: chief profile, team dialogs and shared contact`, async ({ page }) => {
    await page.goto(`/${locale}/about`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(d.aboutMedical.heading);
    await expect(page.locator("main > section, main > div#location")).toHaveCount(4);
    await expect(page.locator("#chief-doctor")).toContainText(d.doctors[0].name);
    await expect(page.locator("#chief-doctor")).toContainText(d.aboutMedical.notice);
    for (const field of ["education", "career", "publications", "liveSurgery"] as const) {
      await expect(page.locator("#chief-doctor").getByRole("heading", { name: d.aboutMedical[field], exact: true })).toBeVisible();
    }
    const cards = page.locator('#affiliated-doctors button[aria-haspopup="dialog"]');
    await expect(cards).toHaveCount(2);
    for (let i = 0; i < 2; i++) {
      await cards.nth(i).click();
      const dialog = page.getByRole("dialog", { name: d.doctors[i + 1].name, exact: true });
      await expect(dialog).toBeVisible();
      await expect(dialog).toContainText(d.aboutMedical.notice);
      for (const field of ["education", "career", "publications", "liveSurgery"] as const) {
        await expect(dialog.getByRole("heading", { name: d.aboutMedical[field], exact: true })).toBeAttached();
      }
      const close = dialog.getByRole("button", { name: d.aboutMedical.close });
      await expect(close).toBeFocused();
      await page.keyboard.press("Tab");
      await expect(close).toBeFocused();
      await page.keyboard.press("Shift+Tab");
      await expect(close).toBeFocused();
      expect(await page.evaluate(() => document.body.style.overflow)).toBe("hidden");
      await page.keyboard.press("Escape");
      await expect(dialog).not.toBeVisible();
      await expect(cards.nth(i)).toBeFocused();
      await cards.nth(i).click();
      await close.click();
      await expect(dialog).not.toBeVisible();
    }
    await cards.first().click();
    await page.mouse.click(2, 2);
    await expect(page.locator("dialog[open]")).toHaveCount(0);
    await expect(cards.first()).toBeFocused();
    await expect(page.locator("#contact")).toHaveCount(1);
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await expect(page.locator("#contact dt")).toHaveCount(8);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}
