"use client";

import { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import type { Dictionary } from "@/i18n/dictionaries";

export function HeroVideo({ content }: { content: Dictionary["home"]["hero"]["video"] }) {
  const video = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    element.muted = true;
    // Also sync if native autoplay started before React attached its handlers.
    void element.play().then(() => {
      setVisible(true);
      setPlaying(true);
    }).catch(() => {
      // A network/codec error may also precede hydration. Autoplay denial alone
      // keeps the manual play button available instead of treating it as failure.
      if (element.error) setFailed(true);
    });
  }, []);

  if (failed) return null;

  return (
    <>
      <video
        ref={video}
        src={content.src}
        autoPlay muted loop playsInline preload="auto"
        aria-hidden="true" tabIndex={-1}
        onPlaying={() => { setVisible(true); setPlaying(true); }}
        onPause={() => setPlaying(false)}
        onError={() => setFailed(true)}
        className={`pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover object-[64%_center] md:object-[center_38%] ${visible ? "opacity-100" : "opacity-0"}`}
      />
      <button
        type="button"
        aria-label={playing ? content.pause : content.play}
        onClick={() => {
          if (!video.current) return;
          if (playing) video.current.pause();
          else void video.current.play().catch(() => { setVisible(false); setPlaying(false); });
        }}
        className="absolute top-24 right-6 z-10 flex min-h-11 items-center gap-2 rounded-full border border-white/40 bg-ink/60 px-4 text-xs text-white transition-colors hover:bg-ink/80 md:top-28 md:right-10"
      >
        {playing ? <FaPause size={10} aria-hidden="true" /> : <FaPlay size={10} aria-hidden="true" />}
        {playing ? content.pause : content.play}
      </button>
    </>
  );
}
