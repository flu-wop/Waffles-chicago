"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { findItem, money } from "@/lib/data";
import { cn } from "@/lib/cn";

type Promo = {
  kind: "promo";
  id: string;
  tag: string;
  title: string;
  sub: string;
  img: string;
  alt: string;
  eyebrow: string;
  accent: string;
  headStart: string;
  headAccent: string;
};
type Dish = { kind: "dish"; id: string; title: string; sub: string; img: string };

// Real promos from chicagowaffles.com (home page "special offers").
const PROMOS: Promo[] = [
  {
    kind: "promo",
    id: "grits",
    tag: "New",
    title: "Southern Grits Bowls",
    sub: "$15 each · South & West Loop",
    img: "/media/promo-grits.webp",
    alt: "New Southern Grits Bowls — Shrimp & Grits and Braised Beef & Grits, $15 each",
    eyebrow: "Waffle Festivities",
    accent: "#A16207",
    headStart: "Exclusively at",
    headAccent: "South & West Loop",
  },
  {
    kind: "promo",
    id: "deals",
    tag: "Weekly",
    title: "Breakfast Deals",
    sub: "Tue · Wed · Thu, all locations",
    img: "/media/promo-deals.webp",
    alt: "Breakfast Deals, available Tuesday, Wednesday and Thursday",
    eyebrow: "Breakfast Deals",
    accent: "#D9620F",
    headStart: "Available in all our locations",
    headAccent: "Tuesday, Wednesday, Thursday",
  },
];

const DISH_IDS = [
  "signature-waffles-chicago-s-waffles-best",
  "signature-waffles-dubai-chocolate-dream-waffle",
  "signature-waffles-blueberry-compote-chicken-waffle",
  "pancakes-french-toast-very-berry-french-toast",
  "signature-waffles-blueberry-lemon-cheesecake-waffle",
];

function dishes(): Dish[] {
  const out: Dish[] = [];
  for (const id of DISH_IDS) {
    const it = findItem("standard", id);
    if (it?.image) out.push({ kind: "dish", id, title: it.name, sub: money(it.price), img: it.image });
  }
  return out;
}

export default function PromoRail() {
  const rail = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<Promo | null>(null);
  const [edge, setEdge] = useState({ l: false, r: true });
  const items: (Promo | Dish)[] = [...PROMOS, ...dishes()];

  const measure = () => {
    const el = rail.current;
    if (!el) return;
    setEdge({ l: el.scrollLeft > 8, r: el.scrollLeft + el.clientWidth < el.scrollWidth - 8 });
  };
  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);

  const go = (dir: 1 | -1) => rail.current?.scrollBy({ left: dir * 280, behavior: "smooth" });

  return (
    <>
      <div className="relative mx-auto w-full max-w-6xl" aria-label="Specials and favorites">
        <div
          ref={rail}
          data-lenis-prevent
          onScroll={measure}
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-1 pb-2 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((it, i) => {
            const promo = it.kind === "promo";
            const body = (
              <>
                <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-butter">
                  <Image src={it.img} alt="" fill sizes="64px" className="object-cover" />
                </span>
                <span className="min-w-0 text-left">
                  {promo && (
                    <span className="mb-0.5 inline-flex items-center gap-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-orange-deep">
                      <span className="h-1.5 w-1.5 rounded-full bg-orange" /> {it.tag}
                    </span>
                  )}
                  <span className="block truncate text-[15px] font-semibold text-brown">{it.title}</span>
                  <span className="block truncate text-xs text-brown-light">{it.sub}</span>
                </span>
              </>
            );
            const cls = cn(
              "flex w-[16.5rem] shrink-0 snap-start items-center gap-3 rounded-2xl border bg-white/85 p-2.5 pr-4 text-left shadow-soft backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lift sm:w-[18rem]",
              promo ? "border-orange/50" : "border-brown/10"
            );
            return (
              <motion.div
                key={it.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 + i * 0.07, duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
              >
                {promo ? (
                  <button type="button" onClick={() => setOpen(it)} className={cls}>
                    {body}
                  </button>
                ) : (
                  <Link href={`/menu#${it.id}`} className={cls}>
                    {body}
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>
        {(["l", "r"] as const).map((s) => (
          <button
            key={s}
            type="button"
            aria-label={s === "l" ? "Scroll specials left" : "Scroll specials right"}
            onClick={() => go(s === "l" ? -1 : 1)}
            className={cn(
              "absolute top-1/2 hidden h-10 w-10 -translate-y-[55%] items-center justify-center rounded-full bg-orange text-white shadow-lift transition hover:bg-orange-deep sm:flex",
              s === "l" ? "-left-5" : "-right-5",
              edge[s] ? "opacity-100" : "pointer-events-none opacity-0"
            )}
          >
            <span aria-hidden>{s === "l" ? "‹" : "›"}</span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="poster"
            className="fixed inset-0 z-[120] flex items-center justify-center bg-cocoa/70 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.div
              data-lenis-prevent
              role="dialog"
              aria-modal="true"
              aria-label={open.title}
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 40, scale: 0.96, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
              className="max-h-[92svh] w-full max-w-md overflow-y-auto rounded-[2rem] bg-cream p-5 text-center shadow-lift"
            >
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em]" style={{ color: open.accent }}>
                {open.eyebrow}
              </p>
              <h3 className="mt-2 text-2xl font-semibold leading-tight text-brown">
                {open.headStart} <span style={{ color: open.accent }}>{open.headAccent}</span>
              </h3>
              <div className="relative mx-auto mt-4 aspect-[1000/1166] w-full overflow-hidden rounded-2xl bg-white" style={open.id === "grits" ? { aspectRatio: "1000/971" } : undefined}>
                <Image src={open.img} alt={open.alt} fill sizes="28rem" className="object-cover" />
              </div>
              <div className="mt-5 flex justify-center gap-3">
                <Link href="/menu" onClick={() => setOpen(null)} className="rounded-full bg-brown px-6 py-3 text-sm font-semibold text-cream hover:bg-cocoa">
                  Order online
                </Link>
                <button type="button" onClick={() => setOpen(null)} className="rounded-full border-2 border-brown/20 px-6 py-[10px] text-sm font-semibold text-brown">
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
