import { notFound } from "next/navigation";
import { AdminList } from "@/components/admin/AdminList";
import { resources, type Resource } from "@/lib/admin/types";

export function generateStaticParams() {
  return resources.map(section => ({ section }));
}

export default async function AdminSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!resources.includes(section as Resource)) notFound();
  return <AdminList key={section} section={section as Resource} />;
}
