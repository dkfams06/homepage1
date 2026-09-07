"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Small, opt-in response around editorial images. No motion on touch devices. */
export function MagneticImage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const surface = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = ref.current;
    const image = surface.current;
    if (!frame || !image) return;
    const enabled = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let raf = 0;
    const reset = () => {
      cancelAnimationFrame(raf);
      image.style.transform = "none";
    };
    const move = (event: PointerEvent) => {
      if (!enabled.matches || event.pointerType !== "mouse") return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = frame.getBoundingClientRect();
        const near = rect.bottom > 0 && rect.top < innerHeight &&
          event.clientX > rect.left - 64 && event.clientX < rect.right + 64 &&
          event.clientY > rect.top - 64 && event.clientY < rect.bottom + 64;
        if (!near) { image.style.transform = "none"; return; }
        const x = Math.max(-1, Math.min(1, (event.clientX - rect.left - rect.width / 2) / (rect.width / 2)));
        const y = Math.max(-1, Math.min(1, (event.clientY - rect.top - rect.height / 2) / (rect.height / 2)));
        image.style.transform = `perspective(1200px) translate3d(${x * 5}px, ${y * 5}px, 0) rotateX(${-y * 1.2}deg) rotateY(${x * 1.2}deg)`;
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", reset, { passive: true });
    window.addEventListener("blur", reset);
    document.documentElement.addEventListener("pointerleave", reset);
    enabled.addEventListener("change", reset);
    return () => {
      reset();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", reset);
      window.removeEventListener("blur", reset);
      document.documentElement.removeEventListener("pointerleave", reset);
      enabled.removeEventListener("change", reset);
    };
  }, []);

  return <div ref={ref}><div ref={surface} className="transition-transform duration-700 ease-[var(--ease-soft)] motion-reduce:transform-none motion-reduce:transition-none">{children}</div></div>;
}
