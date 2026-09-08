"use client";

import { FailurePage, useFailureLocale } from "@/components/FailurePage";

export default function ErrorPage({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return <FailurePage locale={useFailureLocale()} kind="error" retry={retry} />;
}
