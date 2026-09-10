"use client";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminRepository } from "@/lib/admin/repository";
import { actions, emptyRecord, resources, statuses, type AdminRecord, type Database, type Entity, type Permission } from "@/lib/admin/types";
import { AdminDialog } from "./AdminDialog";
import { adminKeys, useAdmin } from "./AdminProvider";

export const inputClass = "mt-2 w-full rounded-lg border border-line bg-bg px-3 py-2.5 text-sm outline-offset-2 disabled:bg-bg disabled:text-ink-muted";
export const buttonClass = "rounded-lg border border-line bg-surface px-4 py-2.5 text-sm transition-colors hover:border-rose disabled:cursor-not-allowed disabled:opacity-50";
export const primaryClass = "rounded-lg bg-rose px-5 py-2.5 text-sm text-white hover:bg-rose-deep disabled:opacity-50";

export function RecordEditor({ entity, id, mode, db, onClose, onDone }: {
  entity: Entity; id?: string; mode: "view" | "edit" | "create"; db: Database; onClose: () => void; onDone: () => void;
}) {
  const { d, locale, seed } = useAdmin();
  const query = useQuery({ queryKey: [...adminKeys.root(locale), entity, "detail", id], queryFn: () => adminRepository.detail(locale, seed, entity, id!), enabled: !!id });
  if (id && query.isPending) return <AdminDialog title={d.detail} onClose={onClose}><p role="status">{d.loading}</p></AdminDialog>;
  if (id && query.isError) return <AdminDialog title={d.detail} onClose={onClose}><p role="alert">{d.missing}</p><button onClick={() => query.refetch()} className={buttonClass}>{d.retry}</button></AdminDialog>;
  const record = query.data || { ...emptyRecord, id: "", updatedAt: "", status: statuses[entity][0] };
  return <EditorForm entity={entity} record={record} mode={mode} db={db} onClose={onClose} onDone={onDone} />;
}

function EditorForm({ entity, record, mode, db, onClose, onDone }: {
  entity: Entity; record: AdminRecord; mode: "view" | "edit" | "create"; db: Database; onClose: () => void; onDone: () => void;
}) {
  const { d, locale, seed } = useAdmin();
  const client = useQueryClient();
  const [value, setValue] = useState(record);
  const [editing, setEditing] = useState(mode !== "view");
  const mutation = useMutation({
    mutationFn: () => adminRepository.save(locale, seed, entity, value),
    onSuccess: async row => {
      client.setQueryData([...adminKeys.root(locale), entity, "detail", row.id], row);
      await client.invalidateQueries({ queryKey: adminKeys.root(locale) });
      onDone();
    },
  });
  const change = (field: keyof AdminRecord, text: string) => setValue(current => ({ ...current, [field]: text }));
  const fields = entity === "users" ? ["email", "roleId", "notes"] :
    entity === "roles" ? ["summary"] : entity === "inquire" ? ["email", "assignee", "priority", "body", "notes"] : ["slug", "category", "summary", "body", "image"];
  const error = mutation.error?.message;
  return <AdminDialog title={mode === "create" ? d.create : editing ? d.edit : d.detail} onClose={onClose} busy={mutation.isPending}>
    <form onSubmit={event => { event.preventDefault(); if (editing) mutation.mutate(); }} className="space-y-6">
      {!editing && <p className="text-sm text-ink-muted">{d.readOnly}</p>}
      <fieldset disabled={!editing || mutation.isPending} className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm sm:col-span-2">{d.fields.title} <span className="text-rose">({d.required})</span>
          <input name="title" required maxLength={160} value={value.title} onChange={e => change("title", e.target.value)} className={inputClass} />
        </label>
        <label className="text-sm">{d.fields.status}
          <select name="status" value={value.status} onChange={e => change("status", e.target.value)} className={inputClass}>
            {statuses[entity].map(status => <option key={status} value={status}>{d.statuses[status as keyof typeof d.statuses]}</option>)}
          </select>
        </label>
        {fields.map(field => {
          const key = field as keyof typeof d.fields;
          const text = value[field as keyof AdminRecord] as string;
          if (field === "roleId" || field === "assignee" || field === "priority") {
            const options = field === "roleId" ? db.records.roles.map(row => ({ id: row.id, label: row.title })) :
              field === "assignee" ? db.records.users.map(row => ({ id: row.id, label: row.title })) :
              ["normal", "high"].map(id => ({ id, label: d.statuses[id as "normal" | "high"] }));
            return <label key={field} className="text-sm">{d.fields[key]}
              <select name={field} value={text} onChange={e => change(field as keyof AdminRecord, e.target.value)} className={inputClass}>
                {field !== "priority" && <option value="">{d.none}</option>}
                {options.map(option => <option key={option.id} value={option.id}>{option.label}</option>)}
              </select>
            </label>;
          }
          const long = ["summary", "body", "notes"].includes(field);
          return <label key={field} className={`text-sm ${long ? "sm:col-span-2" : ""}`}>{d.fields[key]}
            {long ? <textarea name={field} rows={field === "body" ? 6 : 3} maxLength={20000} value={text} onChange={e => change(field as keyof AdminRecord, e.target.value)} className={inputClass} /> :
              <input name={field} type={field === "email" ? "email" : "text"} required={field === "email" || field === "slug"} maxLength={500} pattern={field === "slug" ? "[a-z0-9]+(-[a-z0-9]+)*" : undefined} value={text} onChange={e => change(field as keyof AdminRecord, e.target.value)} className={inputClass} />}
            {field === "slug" && <span className="mt-1 block text-xs text-ink-muted">{d.slugHelp}</span>}
          </label>;
        })}
        {entity === "roles" && <div className="min-w-0 sm:col-span-2">
          <h3 className="font-medium">{d.permissions}</h3>
          <p className="mt-2 text-xs leading-6 text-ink-muted">{d.permissionsNote}</p>
          <div className="mt-4 overflow-x-auto rounded border border-line">
            <table className="w-full min-w-[400px] text-sm">
              <thead className="bg-bg"><tr><th className="p-3 text-left">{d.nav.roles}</th>{actions.map(action => <th key={action} className="p-3">{d.actions[action]}</th>)}</tr></thead>
              <tbody>{resources.map(resource => <tr key={resource} className="border-t border-line"><th className="p-3 text-left font-normal">{d.nav[resource]}</th>
                {actions.map(action => {
                  const permission: Permission = `${resource}.${action}`;
                  return <td key={action} className="p-3 text-center"><input type="checkbox" aria-label={`${d.nav[resource]} ${d.actions[action]}`} checked={value.permissions.includes(permission)}
                    onChange={e => setValue(current => ({ ...current, permissions: e.target.checked ? [...current.permissions, permission] : current.permissions.filter(item => item !== permission) }))} className="size-4 accent-rose" /></td>;
                })}
              </tr>)}</tbody>
            </table>
          </div>
        </div>}
      </fieldset>
      {mutation.isError && <p role="alert" className="rounded border border-rose p-3 text-sm text-rose">{error === "duplicate" ? d.duplicate : error === "invalid" ? d.invalid : error === "missing" ? d.missing : d.error}</p>}
      <div className="flex justify-end gap-3 border-t border-line pt-5">
        <button type="button" disabled={mutation.isPending} onClick={onClose} className={buttonClass}>{d.cancel}</button>
        {editing ? <button type="submit" disabled={mutation.isPending} className={primaryClass}>{mutation.isPending ? d.saving : d.save}</button> :
          <button type="button" onClick={() => setEditing(true)} className={primaryClass}>{d.edit}</button>}
      </div>
    </form>
  </AdminDialog>;
}
