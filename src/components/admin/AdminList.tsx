"use client";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FiPlus, FiRefreshCw, FiSearch } from "react-icons/fi";
import { adminRepository } from "@/lib/admin/repository";
import { statuses, type Entity, type Filters, type Resource } from "@/lib/admin/types";
import { adminKeys, useAdmin, useAdminDatabase, useAdminRefresh } from "./AdminProvider";
import { AdminDialog } from "./AdminDialog";
import { RecordEditor, buttonClass, inputClass, primaryClass } from "./RecordEditor";

export function AdminList({ section }: { section: Resource }) {
  const { d } = useAdmin();
  const [roles, setRoles] = useState(false);
  return <>
    {section === "users" && <div className="mb-6 flex gap-2">
      <button aria-pressed={!roles} onClick={() => setRoles(false)} className={roles ? buttonClass : primaryClass}>{d.nav.users}</button>
      <button aria-pressed={roles} onClick={() => setRoles(true)} className={roles ? primaryClass : buttonClass}>{d.nav.roles}</button>
    </div>}
    <EntityList key={section === "users" && roles ? "roles" : section} entity={section === "users" && roles ? "roles" : section} />
  </>;
}
function EntityList({ entity }: { entity: Entity }) {
  const { d, locale, seed } = useAdmin();
  const client = useQueryClient();
  const refresh = useAdminRefresh();
  const database = useAdminDatabase();
  const [filters, setFilters] = useState<Filters>({ search: "", status: "", sort: "updated", page: 1, size: 10 });
  const [selected, setSelected] = useState<string[]>([]);
  const [modal, setModal] = useState<{ id?: string; mode: "create" | "edit" | "view" } | null>(null);
  const [deleting, setDeleting] = useState<string[] | null>(null);
  const [message, setMessage] = useState("");
  const query = useQuery({ queryKey: [...adminKeys.root(locale), entity, "list", filters], queryFn: () => adminRepository.list(locale, seed, entity, filters) });
  const deletion = useMutation({
    mutationFn: (ids: string[]) => adminRepository.remove(locale, seed, entity, ids),
    onSuccess: async () => {
      client.removeQueries({ queryKey: [...adminKeys.root(locale), entity, "detail"] });
      await refresh();
      setDeleting(null); setSelected([]); setMessage(d.success);
    },
  });
  const updateFilters = (change: Partial<Filters>) => { setFilters(current => ({ ...current, ...change, page: change.page || 1 })); setSelected([]); };
  const rows = query.data?.rows || [];
  const db = database.data;
  return <section aria-labelledby={`admin-${entity}`}>
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div><p className="text-xs text-rose">{d.local}</p><h1 id={`admin-${entity}`} className="mt-2 font-serif text-3xl">{d.nav[entity]}</h1><p className="mt-3 text-sm text-ink-muted">{d.description}</p></div>
      <div className="flex gap-2">
        <button className={buttonClass} onClick={() => { void refresh(); setMessage(""); }} aria-label={d.refresh}><FiRefreshCw aria-hidden="true" /></button>
        <button disabled={!db} className={primaryClass} onClick={() => { setModal({ mode: "create" }); setMessage(""); }}><span className="flex items-center gap-2"><FiPlus aria-hidden="true" />{d.create}</span></button>
      </div>
    </div>
    {message && <p role="status" className="mb-5 rounded border border-champagne bg-bg-blush px-4 py-3 text-sm">{message}</p>}
    <div className="rounded-xl border border-line bg-surface">
      <div className="grid gap-4 border-b border-line p-5 md:grid-cols-[minmax(180px,1fr)_180px_180px]">
        <label className="text-xs text-ink-muted"><span className="flex items-center gap-2"><FiSearch aria-hidden="true" />{d.search}</span><input type="search" value={filters.search} onChange={e => updateFilters({ search: e.target.value })} className={inputClass} /></label>
        <label className="text-xs text-ink-muted">{d.statusFilter}<select value={filters.status} onChange={e => updateFilters({ status: e.target.value })} className={inputClass}><option value="">{d.all}</option>{statuses[entity].map(status => <option key={status} value={status}>{d.statuses[status as keyof typeof d.statuses]}</option>)}</select></label>
        <label className="text-xs text-ink-muted">{d.sort}<select value={filters.sort} onChange={e => updateFilters({ sort: e.target.value as Filters["sort"] })} className={inputClass}><option value="updated">{d.updated}</option><option value="title">{d.alphabetical}</option></select></label>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-3 text-xs text-ink-muted">
        <p>{d.total} {query.data?.total || 0} · {d.selected} {selected.length}</p>
        <button disabled={!selected.length} onClick={() => { deletion.reset(); setDeleting(selected); }} className={buttonClass}>{d.bulkDelete}</button>
      </div>
      {query.isError || database.isError ? <div role="alert" className="p-8"><p>{d.error}</p><button onClick={() => refresh()} className={buttonClass}>{d.retry}</button></div> :
      query.isPending ? <p role="status" className="p-10 text-center text-ink-muted">{d.loading}</p> :
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-bg text-xs text-ink-muted"><tr>
            <th className="w-12 p-4"><input type="checkbox" aria-label={d.selectAll} checked={!!rows.length && rows.every(row => selected.includes(row.id))} onChange={e => setSelected(e.target.checked ? rows.map(row => row.id) : [])} className="size-4 accent-rose" /></th>
            <th className="p-4">{d.fields.title}</th><th className="p-4">{entity === "users" ? d.fields.roleId : entity === "roles" ? d.permissions : entity === "inquire" ? d.fields.assignee : d.fields.category}</th>
            <th className="p-4">{d.fields.status}</th><th className="p-4">{d.fields.updatedAt}</th><th className="p-4">{d.detail}</th>
          </tr></thead>
          <tbody>{rows.map(row => <tr key={row.id} className="border-t border-line hover:bg-bg/60">
            <td className="p-4"><input type="checkbox" aria-label={`${d.selectRow}: ${row.title}`} checked={selected.includes(row.id)} onChange={e => setSelected(current => e.target.checked ? [...current, row.id] : current.filter(id => id !== row.id))} className="size-4 accent-rose" /></td>
            <td className="max-w-64 p-4"><button onClick={() => setModal({ id: row.id, mode: "view" })} className="text-left font-medium text-ink hover:text-rose">{row.title}</button><p className="mt-1 truncate text-xs text-ink-muted">{row.email || row.slug || row.summary}</p></td>
            <td className="p-4 text-xs text-ink-muted">{entity === "roles" ? row.permissions.length : entity === "users" ? db?.records.roles.find(role => role.id === row.roleId)?.title || d.none : entity === "inquire" ? db?.records.users.find(user => user.id === row.assignee)?.title || d.none : row.category || d.none}</td>
            <td className="p-4"><span className="whitespace-nowrap rounded-full bg-rose-tint px-3 py-1 text-xs text-rose">{d.statuses[row.status as keyof typeof d.statuses] || row.status}</span></td>
            <td className="whitespace-nowrap p-4 text-xs text-ink-muted">{new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(new Date(row.updatedAt))}</td>
            <td className="p-4"><div className="flex gap-2"><button className={buttonClass} onClick={() => setModal({ id: row.id, mode: "edit" })}>{d.edit}</button><button className={buttonClass} onClick={() => { deletion.reset(); setDeleting([row.id]); }}>{d.remove}</button></div></td>
          </tr>)}</tbody>
        </table>
        {!rows.length && <p className="p-12 text-center text-sm text-ink-muted">{d.empty}</p>}
      </div>}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line p-5 text-xs text-ink-muted">
        <label>{d.pageSize}<select value={filters.size} onChange={e => updateFilters({ size: Number(e.target.value) })} className="ml-2 rounded border border-line p-2">{[10, 20, 50].map(size => <option key={size}>{size}</option>)}</select></label>
        <div className="flex items-center gap-3"><button disabled={!query.data || query.data.page <= 1} className={buttonClass} onClick={() => updateFilters({ page: (query.data?.page || 1) - 1 })}>{d.previous}</button><span>{d.page} {query.data?.page || 1} / {query.data?.pages || 1}</span><button disabled={!query.data || query.data.page >= query.data.pages} className={buttonClass} onClick={() => updateFilters({ page: (query.data?.page || 1) + 1 })}>{d.next}</button></div>
      </div>
    </div>
    {modal && db && <RecordEditor entity={entity} id={modal.id} mode={modal.mode} db={db} onClose={() => setModal(null)} onDone={() => { setModal(null); setMessage(d.success); }} />}
    {deleting && <AdminDialog title={d.deleteTitle} onClose={() => setDeleting(null)} busy={deletion.isPending}>
      <p className="text-sm leading-7">{d.deleteBody.replace("{count}", String(deleting.length))}</p>
      {deletion.isError && <p role="alert" className="mt-4 text-sm text-rose">{d.error}</p>}
      <div className="mt-6 flex justify-end gap-3"><button className={buttonClass} disabled={deletion.isPending} onClick={() => setDeleting(null)}>{d.cancel}</button><button className={primaryClass} disabled={deletion.isPending} onClick={() => deletion.mutate(deleting)}>{deletion.isPending ? d.saving : d.remove}</button></div>
    </AdminDialog>}
  </section>;
}
