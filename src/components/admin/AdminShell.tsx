"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { FiGrid, FiUsers, FiLayers, FiFileText, FiMessageSquare, FiArrowUpRight } from "react-icons/fi";
import { locales, switchLocalePath } from "@/i18n/config";
import { useAdmin } from "./AdminProvider";

const navigation = [{ id: "dashboard", icon: FiGrid, path: "" }, { id: "users", icon: FiUsers, path: "/users" }, { id: "service", icon: FiLayers, path: "/service" }, { id: "blog", icon: FiFileText, path: "/blog" }, { id: "inquire", icon: FiMessageSquare, path: "/inquire" }] as const;

export function AdminShell({ children }: { children: ReactNode }) {
  const { d, locale } = useAdmin();
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="min-h-screen bg-bg text-ink">
      <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col border-r border-line bg-surface p-6 lg:flex">
        <Link href={`/${locale}/admin`} className="font-display text-3xl tracking-[0.2em]">LIAN</Link>
        <p className="mt-2 text-xs text-ink-muted">{d.title}</p>
        <nav aria-label={d.title} className="mt-12 space-y-2">
          {navigation.map(({ id, icon: Icon, path }) => <Link key={id} href={`/${locale}/admin${path}`} aria-current={pathname === `/${locale}/admin${path}` ? "page" : undefined}
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-ink-muted hover:bg-bg aria-[current=page]:bg-rose-tint aria-[current=page]:text-rose"><Icon aria-hidden="true" />{d.nav[id]}</Link>)}
        </nav>
        <div className="mt-auto border-t border-line pt-5 text-xs leading-6 text-ink-muted">{d.local}<br />{d.demo}</div>
      </aside>
      <div className="lg:pl-60">
        <header className="border-b border-line bg-surface px-5 py-4 md:px-9">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm font-medium">{d.title}</p>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-xs text-ink-muted">{d.language}
                <select value={locale} onChange={event => router.push(switchLocalePath(pathname, event.target.value as typeof locale))} className="rounded border border-line bg-bg p-2">
                  {locales.map(language => <option key={language} value={language}>{language.toUpperCase()}</option>)}
                </select>
              </label>
              <Link href={`/${locale}`} className="flex items-center gap-1 text-xs text-rose">{d.back}<FiArrowUpRight aria-hidden="true" /></Link>
            </div>
          </div>
          <nav aria-label={d.title} className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">
            {navigation.map(({ id, path }) => <Link key={id} href={`/${locale}/admin${path}`} aria-current={pathname === `/${locale}/admin${path}` ? "page" : undefined}
              className="shrink-0 rounded border border-line px-3 py-2 text-xs aria-[current=page]:border-rose aria-[current=page]:text-rose">{d.nav[id]}</Link>)}
          </nav>
        </header>
        <main id="main" className="mx-auto max-w-[1600px] p-5 md:p-9" tabIndex={-1}>
          <div className="mb-8 rounded-lg border border-champagne/60 bg-bg-blush px-5 py-4">
            <p className="text-xs font-medium text-rose">{d.demo}</p>
            <p className="mt-2 text-xs leading-6 text-ink-muted">{d.notice}</p>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
