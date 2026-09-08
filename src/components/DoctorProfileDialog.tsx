"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { FiArrowUpRight, FiX } from "react-icons/fi";

export function DoctorProfileDialog({ name, detailsLabel, closeLabel, card, children }: {
  name: string;
  detailsLabel: string;
  closeLabel: string;
  card: ReactNode;
  children: ReactNode;
}) {
  const id = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const element = dialog.current!;
    const opener = trigger.current;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      opener?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <>
      <button ref={trigger} type="button" onClick={() => setOpen(true)}
        aria-haspopup="dialog" aria-controls={id} aria-label={`${name} · ${detailsLabel}`}
        className="group block w-full text-left">
        {card}
        <span className="mt-6 flex items-center justify-between border-t border-line pt-5 text-sm text-rose">
          {detailsLabel}<FiArrowUpRight size={20} aria-hidden="true" />
        </span>
      </button>
      <dialog ref={dialog} id={id} aria-label={name}
        onCancel={event => { event.preventDefault(); setOpen(false); }}
        onKeyDown={event => {
          if (event.key === "Tab") {
            event.preventDefault();
            dialog.current?.querySelector("button")?.focus();
          }
        }}
        onClick={event => { if (event.target === event.currentTarget) setOpen(false); }}
        className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-[1100px] overflow-y-auto overscroll-contain bg-bg p-0 text-ink backdrop:bg-ink/50">
        <div className="sticky top-0 z-10 flex justify-end bg-bg px-4 py-3">
          <button type="button" autoFocus onClick={() => setOpen(false)} aria-label={closeLabel}
            className="flex size-11 items-center justify-center rounded-full border border-line bg-bg hover:text-rose">
            <FiX size={22} aria-hidden="true" />
          </button>
        </div>
        <div className="p-6 pt-2 md:p-12 md:pt-4">
          {children}
        </div>
      </dialog>
    </>
  );
}
