"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { adminRepository, createSeed, storageKey } from "@/lib/admin/repository";
import type { Database } from "@/lib/admin/types";

type Context = { d: Dictionary["admin"]; locale: Locale; seed: Database };
const AdminContext = createContext<Context | null>(null);
export const adminKeys = {
  root: (locale: string) => ["admin-demo", locale] as const,
  all: (locale: string) => ["admin-demo", locale, "overview"] as const,
};
export function AdminProvider({ d, locale, children }: { d: Dictionary["admin"]; locale: Locale; children: ReactNode }) {
  const [client] = useState(() => new QueryClient({ defaultOptions: {
    queries: { staleTime: 30_000, gcTime: 600_000, retry: false, networkMode: "always" },
    mutations: { retry: false, networkMode: "always" },
  } }));
  const [seed] = useState(() => createSeed(d));
  useEffect(() => {
    const sync = (event: StorageEvent) => {
      if (event.key === storageKey(locale) || event.key === null) void client.invalidateQueries({ queryKey: adminKeys.root(locale) });
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, [client, locale]);
  return <QueryClientProvider client={client}><AdminContext.Provider value={{ d, locale, seed }}>{children}</AdminContext.Provider></QueryClientProvider>;
}
export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error("AdminProvider required");
  return context;
}
export function useAdminDatabase() {
  const { locale, seed } = useAdmin();
  return useQuery({ queryKey: adminKeys.all(locale), queryFn: () => adminRepository.all(locale, seed) });
}
export function useAdminRefresh() {
  const { locale } = useAdmin();
  const client = useQueryClient();
  return () => client.invalidateQueries({ queryKey: adminKeys.root(locale) });
}
