"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Headline } from "@/components/motion";
import { gallery } from "@/lib/data";
import { cn } from "@/lib/cn";

const FILTERS = [
  { id: "all", label: "Everything" },
  { id: "food", label: "The food" },
  { id: "place", label: "The places" },
] as const;

export default function GalleryClient() {
  const [f, setF] = useState<(typeof FILTERS)[number]["id"]>("all");
  const [open, setOpen] = useState<number | null>(null);
  const items = f === "all" ? gallery : gallery.filter((g) => g.kind === f);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: number) => setOpen((i) => (i == null ? i : (i + d + items.length) % items.length)),
    [items.length]
  );

  useEffect(() => {
    if (open == null) return;
    window.__lenis?.stop();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", key);
    return () => {
      window.removeEventListener("keydown", key);
      window.__lenis?.start();
    };
  }, [open, close, step]);

  const cur = open != null ? items[open] : null;

  return (
    <section className="mx-auto max-w-6xl px-6 pb-12 pt-32 md:pt-40">
      <Headline as="h1" immediate text="A glimpse into the *kitchen*." className="max-w-4xl text-[3rem] font-semibold md:text-8xl" />
      <p className="mt-4 max-w-md text-lg text-brown-light">{gallery.length} photos from our plates and our tables.</p>

      <div className="mt-8 flex flex-wrap gap-2">
        {FILTERS.map((x) => (
          <button
            key={x.id}
            onClick={() => setF(x.id)}
            className={cn(
              "rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
              f === x.id ? "bg-brown text-cream" : "bg-white text-brown/70 shadow-soft hover:text-orange"
            )}
          >
            {x.label}
          </button>
        ))}
      </div>

      <div className="mt-10 columns-2 gap-3 md:columns-3 md:gap-5">
        {items.map((g, i) => (
          <motion.button
            layout
            key={g.src}
            onClick={() => setOpen(i)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -5% 0px" }}
            transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
            className="group relative mb-3 block w-full overflow-hidden rounded-[1.25rem] bg-butter md:mb-5 md:rounded-[1.5rem]"
            aria-label={`Open ${g.alt}`}
          >
            <Image
              src={g.src}
              alt={g.alt}
              width={g.w}
              height={g.h}
              sizes="(max-width: 768px) 50vw, 33vw"
              className="h-auto w-full transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-cocoa/80 to-transparent p-4 text-left text-sm font-semibold text-cream opacity-0 transition-opacity group-hover:opacity-100">
              {g.alt}
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {cur && (
          <motion.div
            data-lenis-prevent
            className="fixed inset-0 z-[95] flex flex-col bg-cocoa/95 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <div className="flex items-center justify-between p-5 text-cream">
              <p className="font-semibold">{cur.alt}</p>
              <button onClick={close} aria-label="Close" className="grid h-11 w-11 place-items-center rounded-full bg-white/10">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>
            <div className="relative mx-4 mb-4 flex-1" onClick={(e) => e.stopPropagation()}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={cur.src}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image src={cur.src} alt={cur.alt} fill sizes="100vw" className="object-contain" priority />
                </motion.div>
              </AnimatePresence>
              {(["prev", "next"] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => step(d === "next" ? 1 : -1)}
                  aria-label={d === "next" ? "Next photo" : "Previous photo"}
                  className={cn(
                    "absolute top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-cream/90 text-brown shadow-lift",
                    d === "next" ? "right-2" : "left-2"
                  )}
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={d === "next" ? "m9 6 6 6-6 6" : "m15 6-6 6 6 6"} />
                  </svg>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
