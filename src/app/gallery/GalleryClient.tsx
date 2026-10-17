"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Headline } from "@/components/motion";
import { scrollToId } from "@/components/SmoothScroll";
import { useCart } from "@/components/CartProvider";
import { gallery, getLocation, menuItemForPhoto, money, type GalleryItem } from "@/lib/data";
import { cn } from "@/lib/cn";

const PLACE_ORDER = ["south-loop", "west-loop", "oak-park", "willowbrook", "other"];
const PLACE_NAME = (k: string) => (k === "other" ? "All locations" : getLocation(k).name);

function Plus() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export default function GalleryClient() {
  const { add, menuKey, setDrawerOpen, count } = useCart();
  const [open, setOpen] = useState<{ list: GalleryItem[]; i: number } | null>(null);

  const food = useMemo(() => gallery.filter((g) => g.kind === "food" && g.alt !== "Our Food"), []);
  const places = useMemo(() => {
    const m: Record<string, GalleryItem[]> = {};
    for (const g of gallery.filter((x) => x.kind === "place")) (m[g.place ?? "other"] ??= []).push(g);
    return PLACE_ORDER.filter((k) => m[k]).map((k) => ({ key: k, items: m[k] }));
  }, []);
  const orderable = useMemo(() => food.filter((g) => menuItemForPhoto(g.alt, menuKey)).length, [food, menuKey]);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: number) => setOpen((o) => (o ? { ...o, i: (o.i + d + o.list.length) % o.list.length } : o)),
    []
  );

  useEffect(() => {
    if (!open) return;
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

  const cur = open ? open.list[open.i] : null;
  const curItem = cur && cur.kind === "food" ? menuItemForPhoto(cur.alt, menuKey) : undefined;

  return (
    <section className="mx-auto max-w-6xl px-6 pb-12 pt-32 md:pt-40">
      <Headline as="h1" immediate text="A glimpse into the *kitchen*." className="max-w-4xl text-[3rem] font-semibold md:text-8xl" />
      <p className="mt-4 max-w-md text-lg text-brown-light">
        {gallery.length} photos from our plates and our tables. Love what you see? Add it to your order.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {[
          ["plates", `The plates · ${food.length}`],
          ["tables", "The tables"],
        ].map(([id, label]) => (
          <button
            key={id}
            onClick={() => scrollToId(id, -110)}
            className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brown/80 shadow-soft transition-colors hover:text-orange"
          >
            {label}
          </button>
        ))}
        {count > 0 && (
          <button onClick={() => setDrawerOpen(true)} className="rounded-full bg-orange px-5 py-2.5 text-sm font-semibold text-white shadow-soft">
            View order ({count})
          </button>
        )}
      </div>

      {/* ───── The plates ───── */}
      <div id="plates" className="scroll-mt-28 pt-14">
        <div className="flex items-end justify-between gap-4 border-b border-brown/10 pb-4">
          <h2 className="text-3xl font-semibold md:text-5xl">
            The <span className="font-serif font-medium italic text-orange">plates</span>
          </h2>
          <p className="hidden text-sm text-brown-light sm:block">{orderable} ready to order from the menu</p>
        </div>
        <div className="mt-8 columns-2 gap-3 md:columns-3 md:gap-5">
          {food.map((g, i) => {
            const item = menuItemForPhoto(g.alt, menuKey);
            return (
              <motion.figure
                key={g.src}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -5% 0px" }}
                transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
                className="mb-3 break-inside-avoid overflow-hidden rounded-[1.25rem] bg-white shadow-soft md:mb-5 md:rounded-[1.5rem]"
              >
                <button onClick={() => setOpen({ list: food, i })} aria-label={`Open ${g.alt}`} className="group block w-full overflow-hidden bg-butter">
                  <Image
                    src={g.src}
                    alt={g.alt}
                    width={g.w}
                    height={g.h}
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="h-auto w-full transition-transform duration-700 group-hover:scale-105"
                  />
                </button>
                <figcaption className="flex items-center justify-between gap-2 p-3 md:p-4">
                  <span className="min-w-0">
                    <span className="block truncate text-[13px] font-semibold leading-tight text-brown md:text-[15px]">{g.alt}</span>
                    {item && <span className="mt-0.5 block text-xs text-brown-light">{money(item.price)}</span>}
                  </span>
                  {item && (
                    <button
                      onClick={() => add(item)}
                      aria-label={`Add ${item.name} to order`}
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-orange text-white shadow-soft transition-colors hover:bg-orange-deep active:scale-95"
                    >
                      <Plus />
                    </button>
                  )}
                </figcaption>
              </motion.figure>
            );
          })}
        </div>
      </div>

      {/* ───── The tables ───── */}
      <div id="tables" className="scroll-mt-28 pt-16">
        <div className="border-b border-brown/10 pb-4">
          <h2 className="text-3xl font-semibold md:text-5xl">
            The <span className="font-serif font-medium italic text-orange">tables</span>
          </h2>
        </div>
        {places.map(({ key, items }) => (
          <div key={key} className="mt-10">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-deep">{PLACE_NAME(key)}</h3>
            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
              {items.map((g, i) => (
                <motion.button
                  key={g.src}
                  onClick={() => setOpen({ list: items, i })}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -5% 0px" }}
                  transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
                  className="group relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-butter md:rounded-[1.5rem]"
                  aria-label={`Open ${g.alt}`}
                >
                  <Image src={g.src} alt={g.alt} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </motion.button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {cur && open && (
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
            <div className="relative mx-4 mb-3 flex-1" onClick={(e) => e.stopPropagation()}>
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
            {cur.kind === "food" && (
              <div className="flex justify-center px-4 pb-6" onClick={(e) => e.stopPropagation()}>
                {curItem ? (
                  <button
                    onClick={() => add(curItem)}
                    className="inline-flex items-center gap-2 rounded-full bg-orange px-7 py-4 text-[15px] font-semibold text-white shadow-lift hover:bg-orange-deep"
                  >
                    <Plus /> Add to order · {money(curItem.price)}
                  </button>
                ) : (
                  <p className="rounded-full bg-white/10 px-5 py-3 text-sm text-cream/80">Not on the online menu right now</p>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
