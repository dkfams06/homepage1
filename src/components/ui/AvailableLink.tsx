import type { ReactNode } from "react";

/** Unconfigured destinations are readable, but never actionable links. */
export function AvailableLink({ href, children, className }: {
  href?: string;
  children: ReactNode;
  className?: string;
}) {
  return href && href !== "#" ? (
    <a href={href} className={className}>{children}</a>
  ) : (
    <span role="link" aria-disabled="true" className={`${className || ""} cursor-not-allowed`}>{children}</span>
  );
}
