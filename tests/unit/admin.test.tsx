import { beforeEach, describe, expect, it, vi } from "vitest";
import ko from "../../src/i18n/dictionaries/ko.json";
import { adminRepository as repo, createSeed, storageKey } from "../../src/lib/admin/repository";
import { emptyRecord } from "../../src/lib/admin/types";

const seed = () => createSeed(ko.admin);
const user = () => ({ ...emptyRecord, id: "", updatedAt: "", title: "Test", status: "active", email: "test@example.invalid", roleId: "owner" });
beforeEach(() => { vi.restoreAllMocks(); localStorage.clear(); });
describe("browser-local admin repository", () => {
  it("persists CRUD, keeps locale stores isolated, and records activity", async () => {
    const row = await repo.save("ko", seed(), "users", user());
    expect((await repo.detail("ko", seed(), "users", row.id)).title).toBe("Test");
    expect((await repo.all("en", seed())).records.users).toHaveLength(2);
    await repo.save("ko", seed(), "users", { ...row, title: "Edited" });
    expect((await repo.detail("ko", seed(), "users", row.id)).title).toBe("Edited");
    await repo.remove("ko", seed(), "users", [row.id]);
    await expect(repo.detail("ko", seed(), "users", row.id)).rejects.toThrow("missing");
    expect((await repo.all("ko", seed())).activity.map(item => item.action)).toEqual(["delete", "update", "create"]);
  });
  it("validates required fields, duplicates, slugs and role references", async () => {
    await expect(repo.save("ko", seed(), "users", { ...user(), title: " " })).rejects.toThrow("invalid");
    await expect(repo.save("ko", seed(), "users", { ...user(), roleId: "missing" })).rejects.toThrow("invalid");
    await repo.save("ko", seed(), "users", user());
    await expect(repo.save("ko", seed(), "users", { ...user(), email: "TEST@example.invalid" })).rejects.toThrow("duplicate");
    await expect(repo.save("ko", seed(), "blog", { ...user(), status: "draft", slug: "Bad Slug" })).rejects.toThrow("invalid");
  });
  it("searches, filters, sorts, paginates and clamps a deleted last page", async () => {
    await repo.save("ko", seed(), "users", user());
    const filters = { search: "test@", status: "active", sort: "title" as const, page: 10, size: 1 };
    const result = await repo.list("ko", seed(), "users", filters);
    expect(result.total).toBe(1);
    expect(result.page).toBe(1);
    expect(result.rows[0].title).toBe("Test");
    expect((await repo.list("ko", seed(), "users", { ...filters, status: "inactive" })).total).toBe(0);
  });
  it("clears dangling assignments when roles or users are deleted", async () => {
    await repo.remove("ko", seed(), "roles", ["owner"]);
    expect((await repo.detail("ko", seed(), "users", "demo-user-1")).roleId).toBe("");
    const inquiry = await repo.detail("ko", seed(), "inquire", "demo-inquire-1");
    await repo.save("ko", seed(), "inquire", { ...inquiry, assignee: "demo-user-1" });
    await repo.remove("ko", seed(), "users", ["demo-user-1"]);
    expect((await repo.detail("ko", seed(), "inquire", inquiry.id)).assignee).toBe("");
  });
  it("surfaces corrupted storage without silently overwriting it", async () => {
    localStorage.setItem(storageKey("ko"), "bad json");
    await expect(repo.all("ko", seed())).rejects.toThrow("storage");
    expect(localStorage.getItem(storageKey("ko"))).toBe("bad json");
    const db = seed(); db.records.users[0].updatedAt = "invalid";
    localStorage.setItem(storageKey("ko"), JSON.stringify(db));
    await expect(repo.all("ko", seed())).rejects.toThrow("storage");
  });
  it("does not report success when storage is blocked", async () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("blocked"); });
    await expect(repo.save("ko", seed(), "users", user())).rejects.toThrow("blocked");
    expect((await repo.all("ko", seed())).records.users).toHaveLength(2);
  });
});
