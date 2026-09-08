import { test, expect } from "@playwright/test";

test("hero video plays muted inline and can be paused and resumed", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/en");
  const video = page.locator("#hero video");
  await expect(video).toHaveJSProperty("muted", true);
  await expect(video).toHaveJSProperty("playsInline", true);
  await expect(video).toHaveJSProperty("loop", true);
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.currentTime)).toBeGreaterThan(0);
  await page.getByRole("button", { name: "Pause video", exact: true }).click();
  await expect(video).toHaveJSProperty("paused", true);
  await page.getByRole("button", { name: "Play video", exact: true }).click();
  await expect(video).toHaveJSProperty("paused", false);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(video).toHaveJSProperty("paused", false);
});

test("hero defaults to continuous playback even with reduced motion enabled", async ({ page }) => {
  await page.goto("/ja");
  const video = page.locator("#hero video");
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.currentTime)).toBeGreaterThan(0);
  await expect(video).toHaveCSS("opacity", "1");
  await video.evaluate((el: HTMLVideoElement) => { el.currentTime = el.duration - 0.2; });
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.currentTime)).toBeLessThan(2);
  await expect(video).toHaveJSProperty("paused", false);
});

test("video failure retains the photograph and usable hero content", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.route("**/videos/hero.mp4", route => route.abort());
  const requested = page.waitForRequest("**/videos/hero.mp4");
  await page.goto("/en");
  await requested;
  await expect(page.locator("#hero img")).toBeVisible();
  await expect(page.locator("#hero video")).toHaveCount(0);
  await expect(page.locator("#hero h1")).toBeVisible();
});
