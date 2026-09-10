import { test, expect } from "@playwright/test";
import ko from "../../src/i18n/dictionaries/ko.json";
import en from "../../src/i18n/dictionaries/en.json";
import zh from "../../src/i18n/dictionaries/zh.json";
import ja from "../../src/i18n/dictionaries/ja.json";

for (const [locale, dictionary] of Object.entries({ ko, en, zh, ja })) {
  const d = dictionary.admin;
  test(`${locale}: admin locale, isolated layout and user CRUD persistence`, async ({ page }) => {
    await page.goto(`/${locale}/admin/users`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(d.nav.users);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.locator("footer")).toHaveCount(0);
    const create = page.getByRole("button", { name: d.create, exact: true });
    await create.click();
    const dialog = page.getByRole("dialog");
    const close = dialog.getByRole("button", { name: d.close, exact: true });
    await expect(close).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(dialog.getByRole("button", { name: d.save, exact: true })).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(close).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(create).toBeFocused();
    await create.click();
    await dialog.locator('[name="title"]').fill("QA User");
    await dialog.locator('[name="email"]').fill("qa@example.invalid");
    await dialog.locator('[name="roleId"]').selectOption("viewer");
    await dialog.getByRole("button", { name: d.save, exact: true }).click();
    await expect(dialog).toHaveCount(0);
    await page.reload();
    const row = page.getByRole("row").filter({ hasText: "QA User" });
    await expect(row).toContainText(d.roleNames.viewer);
    await row.getByRole("button", { name: d.edit, exact: true }).click();
    await dialog.locator('[name="title"]').fill("QA Updated");
    await dialog.getByRole("button", { name: d.save, exact: true }).click();
    await expect(dialog).toHaveCount(0);
    await page.getByLabel(d.search, { exact: true }).fill("QA Updated");
    await expect(page.locator("tbody tr")).toHaveCount(1);
    await page.getByRole("button", { name: "QA Updated", exact: true }).click();
    await expect(dialog.locator('[name="title"]')).toBeDisabled();
    await close.click();
    await page.getByRole("row").filter({ hasText: "QA Updated" }).getByRole("button", { name: d.remove, exact: true }).click();
    await dialog.getByRole("button", { name: d.cancel, exact: true }).click();
    await expect(page.locator("tbody tr")).toHaveCount(1);
    await page.getByLabel(d.selectAll, { exact: true }).check();
    await page.getByRole("button", { name: d.bulkDelete, exact: true }).click();
    await dialog.getByRole("button", { name: d.remove, exact: true }).click();
    await expect(page.locator("tbody tr")).toHaveCount(0);
    await page.getByRole("navigation", { name: d.title }).filter({ visible: true }).getByRole("link", { name: d.nav.dashboard, exact: true }).click();
    await expect(page.getByRole("heading", { name: d.activity, exact: true })).toBeVisible();
    await expect(page.getByText("QA Updated", { exact: true }).first()).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

test("admin content CRUD, inquiry assignment and role permissions", async ({ page }) => {
  const d = ko.admin;
  for (const entity of ["service", "blog", "inquire"] as const) {
    await page.goto(`/ko/admin/${entity}`);
    await page.getByRole("button", { name: d.create, exact: true }).click();
    const dialog = page.getByRole("dialog");
    await dialog.locator('[name="title"]').fill(`QA ${entity}`);
    if (entity === "inquire") {
      await dialog.locator('[name="email"]').fill("qa@example.invalid");
      await dialog.locator('[name="assignee"]').selectOption("demo-user-1");
    } else await dialog.locator('[name="slug"]').fill(`qa-${entity}`);
    await dialog.getByRole("button", { name: d.save, exact: true }).click();
    await expect(dialog).toHaveCount(0);
    const row = page.getByRole("row").filter({ hasText: `QA ${entity}` });
    await row.getByRole("button", { name: d.edit, exact: true }).click();
    await dialog.locator('[name="status"]').selectOption(entity === "inquire" ? "closed" : "published");
    await dialog.getByRole("button", { name: d.save, exact: true }).click();
    await expect(dialog).toHaveCount(0);
    await expect(row).toContainText(entity === "inquire" ? d.statuses.closed : d.statuses.published);
    await row.getByRole("button", { name: d.remove, exact: true }).click();
    await dialog.getByRole("button", { name: d.remove, exact: true }).click();
    await expect(row).toHaveCount(0);
  }
  await page.goto("/ko/admin/users");
  await page.getByRole("button", { name: d.nav.roles, exact: true }).click();
  await page.getByRole("button", { name: d.create, exact: true }).click();
  const dialog = page.getByRole("dialog");
  await dialog.locator('[name="title"]').fill("QA Role");
  await dialog.getByRole("checkbox", { name: `${d.nav.blog} ${d.actions.create}`, exact: true }).check();
  await dialog.getByRole("button", { name: d.save, exact: true }).click();
  await expect(dialog).toHaveCount(0);
  const role = page.getByRole("row").filter({ hasText: "QA Role" });
  await role.getByRole("button", { name: d.edit, exact: true }).click();
  await expect(dialog.getByRole("checkbox", { name: `${d.nav.blog} ${d.actions.create}`, exact: true })).toBeChecked();
  await dialog.getByRole("button", { name: d.close, exact: true }).click();
  await role.getByRole("button", { name: d.remove, exact: true }).click();
  await dialog.getByRole("button", { name: d.remove, exact: true }).click();
  await expect(role).toHaveCount(0);
});

test("admin storage failure is visible, never a false success", async ({ page }) => {
  await page.goto("/ko/admin/users");
  await page.getByRole("button", { name: ko.admin.create, exact: true }).click();
  const dialog = page.getByRole("dialog");
  await dialog.locator('[name="title"]').fill("Failed write");
  await dialog.locator('[name="email"]').fill("qa@example.invalid");
  await page.evaluate(() => { Storage.prototype.setItem = () => { throw new Error("blocked"); }; });
  await dialog.getByRole("button", { name: ko.admin.save, exact: true }).click();
  await expect(dialog.getByRole("alert")).toHaveText(ko.admin.error);
  await expect(page.getByRole("status")).toHaveCount(0);
});
