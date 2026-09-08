import { test, expect } from "@playwright/test";
import ko from "../../src/i18n/dictionaries/ko.json";
import en from "../../src/i18n/dictionaries/en.json";
import zh from "../../src/i18n/dictionaries/zh.json";
import ja from "../../src/i18n/dictionaries/ja.json";

const dictionaries = { ko, en, zh, ja };

for (const locale of ["ko", "en", "zh", "ja"] as const) {
  const d = dictionaries[locale];
  test(`${locale}: policy links resolve and clearly disclose preparation status`, async ({ page }) => {
    await page.goto(`/${locale}`);
    for (const kind of ["privacy", "terms"] as const) {
      await page.locator(`footer a[href="/${locale}/${kind}"]`).click();
      await expect(page).toHaveURL(new RegExp(`/${locale}/${kind}$`));
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(d.legal[kind].title);
      await expect(page.getByText(d.legal.notice, { exact: true })).toBeVisible();
      const response = await page.request.get(`/${locale}/${kind}`);
      expect(response.status()).toBe(200);
    }
  });

  test(`${locale}: inquiry is unavailable, traps focus, restores it, and links privacy`, async ({ page }) => {
    await page.goto(`/${locale}`);
    // Use the hero CTA, present on desktop and mobile.
    const trigger = page.locator('#hero').getByRole('button', { name: d.home.hero.primaryCta.label, exact: true });
    await trigger.click();
    const dialog = page.getByRole("dialog", { name: d.ui.quickInquiry.dialogLabel });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("status")).toContainText(d.inquiryAvailability.body);
    await expect(dialog.locator('input[name="name"]')).toBeDisabled();
    await expect(dialog.locator('button[type="submit"]')).toBeDisabled();
    const close = dialog.getByRole("button", { name: d.ui.quickInquiry.closeLabel, exact: true });
    const policy = dialog.locator(`a[href="/${locale}/privacy"]`);
    await expect(close).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(policy).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(close).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(trigger).toBeFocused();
    expect(await page.locator('[inert] [role="dialog"]').count()).toBe(1);
    await trigger.click();
    await policy.click();
    await expect(page).toHaveURL(new RegExp(`/${locale}/privacy$`));
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(d.legal.privacy.title);
  });

  test(`${locale}: navigation stays localized and contact is merged`, async ({ page, isMobile }) => {
    await page.goto(`/${locale}/about`);
    if (isMobile) await page.locator('button[aria-controls="mobile-menu"]').click();
    const menu = isMobile ? "home-sections-mobile" : "home-sections-desktop";
    await page.locator(`button[aria-controls="${menu}"]`).click();
    await expect(page.locator(`#${menu} a`)).toHaveCount(5);
    await page.locator(`#${menu} a[href$="#contact"]`).click();
    await expect(page).toHaveURL(new RegExp(`/${locale}#contact$`));
    await expect(page.locator("main section")).toHaveCount(12);
    await expect(page.locator("section#location")).toHaveCount(0);
    await expect(page.locator("#contact dt")).toHaveCount(7);
    await expect.poll(() => page.locator("#contact").evaluate(el => Math.round(el.getBoundingClientRect().top))).toBe(80);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.locator('header button[aria-haspopup="menu"]').click();
    const nextLocale = locale === "ko" ? "en" : "ko";
    await page.locator(`header a[hreflang="${nextLocale}"]`).click();
    await expect(page.locator("html")).toHaveAttribute("lang", nextLocale);
  });

  test(`${locale}: unknown routes return localized 404`, async ({ page }) => {
    for (const path of ["missing-page", "service/missing-treatment", "missing.html"]) {
      const response = await page.goto(`/${locale}/${path}`);
      expect(response?.status()).toBe(404);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(d.feedback.notFoundTitle);
      await page.evaluate(() => document.fonts.ready);
      expect(await page.locator("h1").evaluate(el => getComputedStyle(el).fontFamily)).toMatch(/noto/i);
      await expect(page.getByRole("link", { name: d.feedback.home })).toHaveAttribute("href", `/${locale}`);
    }
  });
}

test("comparison supports keyboard and pointer dragging", async ({ page }) => {
  await page.goto("/en");
  const slider = page.locator('#comparison input[type="range"]');
  await slider.scrollIntoViewIfNeeded();
  await slider.focus();
  await slider.press("ArrowRight");
  await expect(slider).toHaveValue("51");
  await slider.press("Home");
  await expect(slider).toHaveValue("0");
  await slider.press("End");
  await expect(slider).toHaveValue("100");
  const box = (await slider.boundingBox())!;
  await page.mouse.move(box.x + box.width * 0.5, box.y + box.height * 0.5);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.25, box.y + box.height * 0.5, { steps: 5 });
  await page.mouse.up();
  expect(Number(await slider.inputValue())).toBeGreaterThanOrEqual(20);
  expect(Number(await slider.inputValue())).toBeLessThanOrEqual(30);
});

test("marquee respects reduced motion and preserves localized links", async ({ page }) => {
  await page.goto("/en");
  const pause = page.locator("#categories button");
  await expect(pause).toBeDisabled();
  await expect(pause).toHaveText(en.ui.marquee.reduced);
  const scroller = page.locator("#categories .overflow-x-auto");
  const start = await scroller.evaluate(el => el.scrollLeft);
  await page.waitForTimeout(250);
  expect(await scroller.evaluate(el => el.scrollLeft)).toBe(start);
  await expect(page.locator('#categories a:not([aria-hidden="true"])').first()).toHaveAttribute("href", "/en/service/eyes");
});

test("marquee pause control stops automatic movement", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/en");
  const pause = page.locator("#categories button");
  await pause.scrollIntoViewIfNeeded();
  await expect(pause).toBeEnabled();
  await pause.click();
  await expect(pause).toHaveAttribute("aria-pressed", "true");
  const scroller = page.locator("#categories .overflow-x-auto");
  const start = await scroller.evaluate(el => el.scrollLeft);
  await page.waitForTimeout(250);
  expect(await scroller.evaluate(el => el.scrollLeft)).toBe(start);
  await pause.click();
  await expect(pause).toHaveAttribute("aria-pressed", "false");
  await expect.poll(() => scroller.evaluate(el => el.scrollLeft)).toBeGreaterThan(start);
});
