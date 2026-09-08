import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import ErrorPage from "@/app/[locale]/error";
import NotFound from "@/app/[locale]/not-found";
import { feedback } from "@/i18n/feedback";

const navigation = vi.hoisted(() => ({ path: "/ko/about" }));
vi.mock("next/navigation", () => ({ usePathname: () => navigation.path }));
afterEach(cleanup);

describe.each(["ko", "en", "zh", "ja"] as const)("%s recovery screens", (locale) => {
  it("localizes runtime errors, retries, and does not expose exception details", () => {
    navigation.path = `/${locale}/about`;
    const retry = vi.fn();
    render(<ErrorPage error={new Error("private-error-detail")} retry={retry} />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(feedback[locale].errorTitle);
    expect(screen.queryByText("private-error-detail")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: feedback[locale].retry }));
    expect(retry).toHaveBeenCalledOnce();
    expect(screen.getByRole("link").getAttribute("href")).toBe(`/${locale}`);
  });
  it("localizes the not-found boundary and home link", () => {
    navigation.path = `/${locale}/missing`;
    render(<NotFound />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(feedback[locale].notFoundTitle);
    expect(screen.getByRole("link").getAttribute("href")).toBe(`/${locale}`);
  });
});
