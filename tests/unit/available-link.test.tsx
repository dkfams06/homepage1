import { render, cleanup } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { AvailableLink } from "../../src/components/ui/AvailableLink";

afterEach(cleanup);

it.each(["", "#", undefined])("does not activate an unconfigured destination: %s", href => {
  const { container } = render(<AvailableLink href={href}>Contact</AvailableLink>);
  expect(container.querySelector("a")).toBeNull();
  expect(container.querySelector('[aria-disabled="true"]')).not.toBeNull();
});

it("preserves a supplied destination", () => {
  const { container } = render(<AvailableLink href="tel:+821234567890">Contact</AvailableLink>);
  expect(container.querySelector("a")?.getAttribute("href")).toBe("tel:+821234567890");
});
