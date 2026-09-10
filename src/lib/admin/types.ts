export const resources = ["users", "service", "blog", "inquire"] as const;
export const actions = ["read", "create", "update", "delete"] as const;
export type Resource = typeof resources[number];
export type Entity = Resource | "roles";
export type Section = Resource | "dashboard";
export type Permission = `${Resource}.${typeof actions[number]}`;
export type AdminRecord = {
  id: string; title: string; status: string; updatedAt: string;
  email: string; roleId: string; slug: string; category: string;
  summary: string; body: string; image: string; assignee: string;
  priority: string; notes: string; permissions: Permission[];
};
export type Activity = { id: string; entity: Entity; action: "create" | "update" | "delete"; title: string; time: string };
export type Database = { version: 1; records: Record<Entity, AdminRecord[]>; activity: Activity[] };
export type Filters = { search: string; status: string; sort: "updated" | "title"; page: number; size: number };
export const emptyRecord: Omit<AdminRecord, "id" | "updatedAt"> = {
  title: "", status: "draft", email: "", roleId: "", slug: "", category: "",
  summary: "", body: "", image: "", assignee: "", priority: "normal", notes: "", permissions: [],
};
export const statuses: Record<Entity, string[]> = {
  users: ["active", "inactive"], service: ["draft", "published", "archived"],
  blog: ["draft", "published", "archived"], inquire: ["new", "in_progress", "closed"], roles: ["active"],
};
