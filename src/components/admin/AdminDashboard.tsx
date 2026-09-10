"use client";

import Link from "next/link";
import { FiArrowUpRight, FiUsers, FiLayers, FiFileText, FiMessageSquare } from "react-icons/fi";
import { resources } from "@/lib/admin/types";
import { useAdmin, useAdminDatabase } from "./AdminProvider";
import { buttonClass } from "./RecordEditor";

const icons = { users: FiUsers, service: FiLayers, blog: FiFileText, inquire: FiMessageSquare };

export function AdminDashboard() {
  const { d, locale } = useAdmin();
  const query = useAdminDatabase();
  return <section>
    <p className="text-xs text-rose">{d.overview}</p>
    <h1 className="mt-2 font-serif text-3xl">{d.nav.dashboard}</h1>
    <p className="mt-3 text-sm text-ink-muted">{d.description}</p>
    {query.isPending ? <p role="status" className="mt-8">{d.loading}</p> : query.isError ?
      <div role="alert" className="mt-8"><p>{d.error}</p><button className={buttonClass} onClick={() => query.refetch()}>{d.retry}</button></div> : <>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {resources.map(resource => {
          const Icon = icons[resource];
          return <Link key={resource} href={`/${locale}/admin/${resource}`} className="rounded-xl border border-line bg-surface p-6 transition-colors hover:border-rose">
            <div className="flex items-center justify-between text-rose"><Icon className="size-5" aria-hidden="true" /><FiArrowUpRight aria-hidden="true" /></div>
            <p className="mt-6 text-sm text-ink-muted">{d.nav[resource]}</p>
            <p className="mt-2 font-display text-4xl">{query.data.records[resource].length}</p>
          </Link>;
        })}
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <section className="rounded-xl border border-line bg-surface p-6">
          <h2 className="font-serif text-xl">{d.activity}</h2>
          {!query.data.activity.length ? <p className="py-12 text-sm text-ink-muted">{d.noActivity}</p> :
            <ul className="mt-5 divide-y divide-line">{query.data.activity.slice(0, 10).map(item => <li key={item.id} className="flex flex-wrap justify-between gap-3 py-4">
              <div className="min-w-0"><p className="break-words text-sm">{item.title}</p><p className="mt-1 text-xs text-ink-muted">{d.nav[item.entity]} · {d.actions[item.action]}</p></div>
              <time dateTime={item.time} className="text-xs text-ink-muted">{new Intl.DateTimeFormat(locale, { dateStyle: "short", timeStyle: "short" }).format(new Date(item.time))}</time>
            </li>)}</ul>}
        </section>
        <div className="space-y-6">
          <section className="rounded-xl border border-line bg-surface p-6">
            <h2 className="font-serif text-xl">{d.pending}</h2>
            <Link href={`/${locale}/admin/inquire`} className="mt-5 flex items-center justify-between rounded-lg bg-rose-tint p-4 text-rose">
              <span className="text-sm">{d.statuses.new} / {d.statuses.in_progress}</span>
              <span className="text-2xl">{query.data.records.inquire.filter(row => row.status !== "closed").length}</span>
            </Link>
          </section>
          <section className="rounded-xl border border-line bg-surface p-6">
            <h2 className="font-serif text-xl">{d.content}</h2>
            <dl className="mt-5 space-y-4">{(["draft", "published", "archived"] as const).map(status => <div key={status} className="flex justify-between text-sm">
              <dt className="text-ink-muted">{d.statuses[status]}</dt><dd>{[...query.data.records.service, ...query.data.records.blog].filter(row => row.status === status).length}</dd>
            </div>)}</dl>
          </section>
        </div>
      </div>
    </>}
  </section>;
}
