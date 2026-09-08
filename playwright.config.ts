import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : 2,
  reporter: [["list"], ["html", { open: "never" }]],
  use: { baseURL: "http://127.0.0.1:4330", trace: "retain-on-failure" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], reducedMotion: "reduce" } },
    { name: "mobile", use: { ...devices["Pixel 7"], reducedMotion: "reduce" } },
  ],
  webServer: { command: "npm run start -- -p 4330", url: "http://127.0.0.1:4330/ko", reuseExistingServer: false, timeout: 120000 },
});
