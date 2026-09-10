import { actions, emptyRecord, resources, statuses, type AdminRecord, type Database, type Entity, type Filters } from "./types";
import type { Dictionary } from "@/i18n/dictionaries";

export const storageKey = (locale: string) => `lian-admin-demo:v1:${locale}`;
export class AdminDataError extends Error {}

export function createSeed(d: Dictionary["admin"]): Database {
  const time = new Date().toISOString();
  const row = (id: string, title: string, status: string, extra: Partial<AdminRecord> = {}): AdminRecord =>
    ({ ...emptyRecord, id, title, status, updatedAt: time, ...extra });
  return { version: 1, activity: [], records: {
    roles: [
      row("owner", d.roleNames.owner, "active", { permissions: resources.flatMap(resource => actions.map(action => `${resource}.${action}` as const)) }),
      row("editor", d.roleNames.editor, "active", { permissions: ["service.read", "service.create", "service.update", "blog.read", "blog.create", "blog.update"] }),
      row("counselor", d.roleNames.counselor, "active", { permissions: ["inquire.read", "inquire.update"] }),
      row("viewer", d.roleNames.viewer, "active", { permissions: resources.map(resource => `${resource}.read` as const) }),
    ],
    users: [row("demo-user-1", d.sample + " 01", "active", { email: "demo01@example.invalid", roleId: "owner" }), row("demo-user-2", d.sample + " 02", "inactive", { email: "demo02@example.invalid", roleId: "editor" })],
    service: [row("demo-service-1", d.sampleService, "draft", { slug: "demo-service", summary: d.sampleBody })],
    blog: [row("demo-blog-1", d.sampleBlog, "draft", { slug: "demo-post", category: d.nav.blog, body: d.sampleBody })],
    inquire: [row("demo-inquire-1", d.sampleInquiry, "new", { email: "demo03@example.invalid", body: d.sampleBody, priority: "high" })],
  }};
}

function read(locale: string, seed: Database): Database {
  const raw = localStorage.getItem(storageKey(locale));
  if (raw === null) return structuredClone(seed);
  try {
    const db = JSON.parse(raw) as Database;
    if (db.version !== 1 || !Array.isArray(db.activity) || !db.records) throw new Error();
    for (const entity of [...resources, "roles"] as Entity[]) {
      if (!Array.isArray(db.records[entity]) || !db.records[entity].every(row =>
        typeof row.id === "string" && typeof row.title === "string" &&
        Object.keys(emptyRecord).every(key => key === "permissions" ? Array.isArray(row.permissions) : typeof row[key as keyof AdminRecord] === "string") &&
        typeof row.updatedAt === "string" && Number.isFinite(Date.parse(row.updatedAt)) &&
        statuses[entity].includes(row.status) && row.permissions.every(permission => resources.some(resource => actions.some(action => permission === `${resource}.${action}`))))) throw new Error();
    }
    if (!db.activity.every(item => [...resources, "roles"].includes(item.entity) && ["create", "update", "delete"].includes(item.action) && typeof item.id === "string" && typeof item.title === "string" && Number.isFinite(Date.parse(item.time)))) throw new Error();
    return db;
  } catch { throw new AdminDataError("storage"); }
}

export const adminRepository = {
  async list(locale: string, seed: Database, entity: Entity, filters: Filters) {
    const db = read(locale, seed);
    const needle = filters.search.trim().toLocaleLowerCase();
    const rows = db.records[entity].filter(row =>
      (!filters.status || row.status === filters.status) &&
      (!needle || [row.title, row.email, row.slug, row.category].join(" ").toLocaleLowerCase().includes(needle))
    ).sort((a, b) => filters.sort === "title" ? a.title.localeCompare(b.title, locale) : b.updatedAt.localeCompare(a.updatedAt));
    const pages = Math.max(1, Math.ceil(rows.length / filters.size));
    const page = Math.min(filters.page, pages);
    return { rows: rows.slice((page - 1) * filters.size, page * filters.size), total: rows.length, pages, page };
  },
  async all(locale: string, seed: Database) { return read(locale, seed); },
  async detail(locale: string, seed: Database, entity: Entity, id: string) {
    const row = read(locale, seed).records[entity].find(row => row.id === id);
    if (!row) throw new AdminDataError("missing");
    return row;
  },
  async save(locale: string, seed: Database, entity: Entity, input: AdminRecord) {
    const db = read(locale, seed);
    const title = input.title.trim();
    if (!title || !statuses[entity].includes(input.status)) throw new AdminDataError("invalid");
    if ((entity === "users" || entity === "inquire") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) throw new AdminDataError("invalid");
    if ((entity === "service" || entity === "blog") && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.slug)) throw new AdminDataError("invalid");
    const existing = db.records[entity].find(row => row.id === input.id);
    if (input.id && !existing) throw new AdminDataError("missing");
    if (entity === "users" && input.roleId && !db.records.roles.some(row => row.id === input.roleId)) throw new AdminDataError("invalid");
    if (entity === "inquire" && (!['normal', 'high'].includes(input.priority) || (input.assignee && !db.records.users.some(row => row.id === input.assignee)))) throw new AdminDataError("invalid");
    if (!input.permissions.every(permission => resources.some(resource => actions.some(action => permission === `${resource}.${action}`)))) throw new AdminDataError("invalid");
    if (db.records[entity].some(row => row.id !== input.id &&
      (entity === "users" ? row.email.toLowerCase() === input.email.toLowerCase() :
      entity === "service" || entity === "blog" ? row.slug === input.slug : entity === "roles" ? row.title === title : false))) throw new AdminDataError("duplicate");
    const row = { ...input, title, id: input.id || crypto.randomUUID(), updatedAt: new Date().toISOString() };
    db.records[entity] = existing ? db.records[entity].map(item => item.id === row.id ? row : item) : [row, ...db.records[entity]];
    db.activity.unshift({ id: crypto.randomUUID(), entity, action: existing ? "update" : "create", title, time: row.updatedAt });
    db.activity = db.activity.slice(0, 50);
    localStorage.setItem(storageKey(locale), JSON.stringify(db));
    return row;
  },
  async remove(locale: string, seed: Database, entity: Entity, ids: string[]) {
    const db = read(locale, seed);
    const removed = db.records[entity].filter(row => ids.includes(row.id));
    db.records[entity] = db.records[entity].filter(row => !ids.includes(row.id));
    if (entity === "roles") db.records.users = db.records.users.map(user => ids.includes(user.roleId) ? { ...user, roleId: "" } : user);
    if (entity === "users") db.records.inquire = db.records.inquire.map(row => ids.includes(row.assignee) ? { ...row, assignee: "" } : row);
    db.activity = [...removed.map(row => ({ id: crypto.randomUUID(), entity, action: "delete" as const, title: row.title, time: new Date().toISOString() })), ...db.activity].slice(0, 50);
    localStorage.setItem(storageKey(locale), JSON.stringify(db));
  },
};
