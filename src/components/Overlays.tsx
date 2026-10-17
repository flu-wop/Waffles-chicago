"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "./CartProvider";
import { locations, money2 } from "@/lib/data";
import { ButtonBtn } from "./ui";

export function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] opacity-[0.07]"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.3  0 0 0 0 0.17  0 0 0 0 0.14  0 0 0 0.9 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      }}
    />
  );
}

export function Toast() {
  const { toast } = useCart();
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-24 z-[90] flex justify-center px-4">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast}
            initial={{ y: 30, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
            className="rounded-full bg-brown px-5 py-3 text-sm font-medium text-cream shadow-lift"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function CartDrawer() {
  const { drawerOpen, setDrawerOpen, lines, inc, dec, subtotal, count, location } = useCart();
  return (
    <AnimatePresence>
      {drawerOpen && (
        <motion.div className="fixed inset-0 z-[80]" initial={{ opacity: 1 }} exit={{ opacity: 1 }}>
          <motion.button
            aria-label="Close order"
            className="absolute inset-0 bg-cocoa/60 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawerOpen(false)}
          />
          <motion.aside
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-lift"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <div className="flex items-center justify-between border-b border-brown/10 px-6 py-5">
              <div>
                <h2 className="text-xl font-semibold">Your order</h2>
                <p className="text-sm text-brown-light">Pickup · {location.name}</p>
              </div>
              <button onClick={() => setDrawerOpen(false)} aria-label="Close" className="grid h-10 w-10 place-items-center rounded-full hover:bg-butter">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>

            <div data-lenis-prevent className="flex-1 overflow-y-auto px-6 py-4">
              {lines.length === 0 ? (
                <div className="grid h-full place-items-center text-center">
                  <div>
                    <p className="font-serif text-3xl italic text-orange">Nothing yet.</p>
                    <p className="mx-auto mt-2 max-w-[16rem] text-brown-light">Start with a waffle. We won&apos;t judge the second one.</p>
                    <Link
                      href="/menu"
                      onClick={() => setDrawerOpen(false)}
                      className="mt-6 inline-block rounded-full bg-orange px-6 py-3 font-semibold text-white"
                    >
                      Browse the menu
                    </Link>
                  </div>
                </div>
              ) : (
                <ul className="divide-y divide-brown/10">
                  {lines.map((l) => (
                    <li key={l.id} className="flex gap-4 py-4">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-butter">
                        {l.image && <Image src={l.image} alt="" fill sizes="64px" className="object-cover" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium leading-snug">{l.name}</p>
                        <p className="text-sm text-brown-light">{money2(l.price)}</p>
                        <div className="mt-2 inline-flex items-center gap-3 rounded-full bg-butter px-1 py-1">
                          <button onClick={() => dec(l.id)} aria-label="Remove one" className="grid h-7 w-7 place-items-center rounded-full bg-white text-lg leading-none">−</button>
                          <span className="w-4 text-center text-sm font-semibold">{l.qty}</span>
                          <button onClick={() => inc(l.id)} aria-label="Add one" className="grid h-7 w-7 place-items-center rounded-full bg-white text-lg leading-none">+</button>
                        </div>
                      </div>
                      <p className="font-semibold">{money2(l.price * l.qty)}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {lines.length > 0 && (
              <div className="border-t border-brown/10 px-6 py-5">
                <div className="flex items-baseline justify-between">
                  <span className="text-brown-light">Subtotal · {count} item{count === 1 ? "" : "s"}</span>
                  <span className="text-2xl font-semibold">{money2(subtotal)}</span>
                </div>
                <Link
                  href="/order"
                  onClick={() => setDrawerOpen(false)}
                  className="mt-4 block rounded-full bg-orange py-4 text-center font-semibold text-white transition-colors hover:bg-orange-deep"
                >
                  Checkout
                </Link>
                <p className="mt-3 text-center text-sm text-brown-light">No account needed — checkout in under a minute.</p>
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const TIMES = Array.from({ length: 16 }, (_, i) => {
  const mins = 7 * 60 + i * 30;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const ap = h >= 12 ? "PM" : "AM";
  return `${h % 12 === 0 ? 12 : h % 12}:${String(m).padStart(2, "0")} ${ap}`;
}).slice(0, 15);

export function ReserveModal() {
  const { reserveOpen, setReserveOpen, location } = useCart();
  const [done, setDone] = useState<null | { when: string; where: string; who: string }>(null);
  const [loc, setLoc] = useState(location.slug);

  useEffect(() => {
    if (reserveOpen) {
      setDone(null);
      setLoc(location.slug);
    }
  }, [reserveOpen, location.slug]);

  const today = new Date().toISOString().slice(0, 10);

  return (
    <AnimatePresence>
      {reserveOpen && (
        <motion.div className="fixed inset-0 z-[85] grid place-items-end md:place-items-center" initial={{ opacity: 1 }} exit={{ opacity: 1 }}>
          <motion.button
            aria-label="Close"
            className="absolute inset-0 bg-cocoa/60 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setReserveOpen(false)}
          />
          <motion.div
            data-lenis-prevent
            className="relative max-h-[92svh] w-full overflow-y-auto rounded-t-[2rem] bg-cream p-7 shadow-lift md:max-w-lg md:rounded-[2rem] md:p-9"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <button onClick={() => setReserveOpen(false)} aria-label="Close" className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full hover:bg-butter">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
            {done ? (
              <div className="py-6 text-center">
                <p className="font-serif text-4xl italic text-orange">You&apos;re on the list.</p>
                <p className="mx-auto mt-3 max-w-xs text-brown-light">
                  {done.who}, a table is held for you at {done.where} — {done.when}.
                </p>
                <p className="mt-6 text-xs text-brown-light">Demo only — no reservation was actually made.</p>
                <ButtonBtn className="mt-6" onClick={() => setReserveOpen(false)}>Done</ButtonBtn>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const f = new FormData(e.currentTarget);
                  const l = locations.find((x) => x.slug === f.get("loc"))!;
                  setDone({
                    who: String(f.get("name") || "Friend"),
                    where: l.name,
                    when: `${f.get("date")} at ${f.get("time")}, party of ${f.get("party")}`,
                  });
                }}
              >
                <h2 className="text-3xl font-semibold">Save your <span className="font-serif italic text-orange">table</span></h2>
                <p className="mt-1 text-brown-light">Pick a time. We&apos;ll have the coffee ready.</p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <label className="col-span-2 text-sm font-medium">
                    Location
                    <select name="loc" value={loc} onChange={(e) => setLoc(e.target.value)} className="mt-1 w-full rounded-xl border border-brown/15 bg-white px-4 py-3">
                      {locations.map((l) => (
                        <option key={l.slug} value={l.slug}>{l.name} — {l.street}</option>
                      ))}
                    </select>
                  </label>
                  <label className="text-sm font-medium">
                    Date
                    <input required type="date" name="date" min={today} defaultValue={today} className="mt-1 w-full rounded-xl border border-brown/15 bg-white px-4 py-3" />
                  </label>
                  <label className="text-sm font-medium">
                    Time
                    <select name="time" defaultValue="9:00 AM" className="mt-1 w-full rounded-xl border border-brown/15 bg-white px-4 py-3">
                      {TIMES.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </label>
                  <label className="text-sm font-medium">
                    Party size
                    <select name="party" defaultValue="2" className="mt-1 w-full rounded-xl border border-brown/15 bg-white px-4 py-3">
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => <option key={n}>{n}</option>)}
                    </select>
                  </label>
                  <label className="text-sm font-medium">
                    Name
                    <input required name="name" autoComplete="name" className="mt-1 w-full rounded-xl border border-brown/15 bg-white px-4 py-3" />
                  </label>
                  <label className="col-span-2 text-sm font-medium">
                    Phone
                    <input required name="phone" type="tel" autoComplete="tel" className="mt-1 w-full rounded-xl border border-brown/15 bg-white px-4 py-3" />
                  </label>
                </div>
                <ButtonBtn type="submit" className="mt-6 w-full">Reserve</ButtonBtn>
                <p className="mt-3 text-center text-sm text-brown-light">Takes about 20 seconds — no account needed.</p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
