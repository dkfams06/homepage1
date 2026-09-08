"use client";

import { FailurePage, useFailureLocale } from "@/components/FailurePage";

export default function NotFound() {
  return <FailurePage locale={useFailureLocale()} kind="notFound" />;
}
