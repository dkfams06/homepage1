"use client";

import { useEffect, useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import { ContactChannels } from "./ContactChannels";
import type { Dictionary } from "@/i18n/dictionaries";

export function FloatingContact({ content }: { content: Dictionary["contact"] }) {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const update = () => setShowTop(window.scrollY > 300);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <aside aria-label={content.floatingLabel} className="fixed right-3 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-20 flex flex-col items-center gap-2 md:right-5 md:bottom-6">
      <ContactChannels content={content} vertical />
      {showTop && (
        <button type="button" aria-label={content.backToTop} title={content.backToTop}
          className="flex size-11 items-center justify-center rounded-full bg-rose text-white transition-colors hover:bg-rose-deep"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
            document.getElementById("main")?.focus({ preventScroll: true });
          }}>
          <FaChevronUp size={15} aria-hidden="true" />
        </button>
      )}
    </aside>
  );
}
