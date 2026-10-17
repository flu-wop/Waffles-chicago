"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "@/components/CartProvider";
import { Headline } from "@/components/motion";
import { OpenBadge } from "@/components/ui";
import { scrollToId } from "@/components/SmoothScroll";
import { locations, menus, money, type MenuItem } from "@/lib/data";
import { cn } from "@/lib/cn";

function Stepper({ id }: { id: string }) {
  const { inc, dec, qtyOf } = useCart();
  const q = qtyOf(id);
  return (
    <div className="inline-flex items-center gap-3 rounded-full bg-orange px-1.5 py-1.5 text-white">
      <button onClick={() => dec(id)} aria-label="Remove one" className="grid h-8 w-8 place-items-center rounded-full bg-white/20 text-lg leading-none">−</button>
      <span className="w-4 text-center text-sm font-semibold">{q}</span>
      <button onClick={() => inc(id)} aria-label="Add one" className="grid h-8 w-8 place-items-center rounded-full bg-white/20 text-lg leading-none">+</button>
    </div>
  );
}

function Card({ item, flash }: { item: MenuItem; flash: boolean }) {
  const { add, qtyOf } = useCart();
  const q = qtyOf(item.id);
  return (
    <motion.article
      id={item.id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -6% 0px" }}
      transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
      className={cn(
        "flex flex-col overflow-hidden rounded-[1.5rem] bg-white shadow-soft transition-shadow",
        flash && "ring-4 ring-orange"
      )}
    >
      {item.image && (
        <div className="relative aspect-[4/3] bg-butter">
          <Image src={item.image} alt={item.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold leading-snug">{item.name}</h3>
          <span className="shrink-0 rounded-full bg-butter px-3 py-1 text-sm font-semibold">{money(item.price)}</span>
        </div>
        {item.description && <p className="mt-2 text-sm leading-relaxed text-brown-light">{item.description}</p>}
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          {item.gf ? (
            <span className="rounded-full border border-emerald-600/30 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-700">GF available</span>
          ) : (
            <span />
          )}
          {item.price != null &&
            (q > 0 ? (
              <Stepper id={item.id} />
            ) : (
              <button
                onClick={() => add(item)}
                className="rounded-full bg-orange px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-deep"
              >
                Add
              </button>
            ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function MenuClient() {
  const { location: loc, menuKey, setLocation, count, subtotal, setDrawerOpen, drawerOpen } = useCart();
  const sections = menus[menuKey];
  const [q, setQ] = useState("");
  const [active, setActive] = useState(sections[0].id);
  const [flash, setFlash] = useState<string | null>(null);
  const chips = useRef<Record<string, HTMLButtonElement | null>>({});

  const needle = q.trim().toLowerCase();
  const shown = useMemo(
    () =>
      sections
        .map((s) => ({
          ...s,
          items: needle
            ? s.items.filter((i) => (i.name + " " + i.description).toLowerCase().includes(needle))
            : s.items,
        }))
        .filter((s) => s.items.length > 0),
    [sections, needle]
  );
  const total = sections.reduce((a, s) => a + s.items.length, 0);

  // deep link to /menu#item-id or #sec-id
  useEffect(() => {
    const h = window.location.hash.slice(1);
    if (!h) return;
    const t = setTimeout(() => {
      const el = document.getElementById(h);
      if (!el) return;
      scrollToId(h, -170);
      if (!h.startsWith("sec-")) {
        setFlash(h);
        setTimeout(() => setFlash(null), 2600);
      }
    }, 500);
    return () => clearTimeout(t);
  }, []);

  // scroll-spy
  useEffect(() => {
    if (needle) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-sec]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive((e.target as HTMLElement).dataset.sec!);
      },
      { rootMargin: "-28% 0px -62% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [shown, needle]);

  useEffect(() => {
    chips.current[active]?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [active]);

  return (
    <div className="pb-28">
      <section className="mx-auto max-w-6xl px-6 pt-32 md:pt-40">
        <Headline as="h1" immediate text="The *menu*." className="text-[3.2rem] font-semibold md:text-8xl" />
        <p className="mt-4 max-w-md text-lg text-brown-light">
          {total} dishes, made to order. Add what you love and pick it up warm.
        </p>

        <div className="mt-8 grid gap-3 md:grid-cols-[1.2fr_1fr]">
          <div className="rounded-[1.5rem] bg-white p-4 shadow-soft">
            <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-orange" htmlFor="loc">
              Ordering from
            </label>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <select
                id="loc"
                value={loc.slug}
                onChange={(e) => setLocation(e.target.value)}
                className="min-w-0 flex-1 rounded-xl border border-brown/15 bg-cream px-4 py-3 font-semibold"
              >
                {locations.map((l) => (
                  <option key={l.slug} value={l.slug}>{l.name}</option>
                ))}
              </select>
              <OpenBadge loc={loc} className="!bg-butter" />
            </div>
            {menuKey === "willowbrook" && (
              <p className="mt-3 text-sm text-brown-light">Willowbrook has its own menu and pricing — you&apos;re seeing it now.</p>
            )}
          </div>
          <div className="relative">
            <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-brown/40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search — try “berry”, “chicken”, “latte”"
              aria-label="Search the menu"
              className="h-full min-h-[4rem] w-full rounded-[1.5rem] bg-white py-4 pl-12 pr-5 shadow-soft placeholder:text-brown/40"
            />
          </div>
        </div>
      </section>

      {/* sticky chips */}
      {!needle && (
        <div className="sticky top-[4.6rem] z-30 mt-8 md:top-[5.3rem]">
          <div className="mx-auto max-w-6xl px-3 md:px-6">
            <div className="no-scrollbar flex gap-2 overflow-x-auto rounded-full bg-cream/90 p-2 shadow-soft backdrop-blur-md">
              {sections.map((s) => (
                <button
                  key={s.id}
                  ref={(el) => {
                    chips.current[s.id] = el;
                  }}
                  onClick={() => scrollToId(`sec-${s.id}`, -150)}
                  className={cn(
                    "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    active === s.id ? "bg-brown text-cream" : "text-brown/70 hover:bg-butter"
                  )}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto mt-10 max-w-6xl space-y-16 px-6 md:space-y-24">
        {shown.length === 0 && (
          <div className="py-20 text-center">
            <p className="font-serif text-4xl italic text-orange">Nothing matches.</p>
            <p className="mt-2 text-brown-light">Try a different word — or clear the search.</p>
          </div>
        )}
        {shown.map((s) => (
          <section key={s.id} id={`sec-${s.id}`} data-sec={s.id} className="scroll-mt-40">
            <div className="mb-6 flex items-end justify-between gap-4 border-b border-brown/10 pb-4">
              <h2 className="text-3xl font-semibold md:text-5xl">{s.name}</h2>
              <span className="text-sm text-brown-light">{s.items.length} items</span>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {s.items.map((it) => (
                <Card key={it.id} item={it} flash={flash === it.id} />
              ))}
            </div>
          </section>
        ))}
        <p className="pt-4 text-center text-sm text-brown-light">
          Please tell your server about any allergies. Gluten-free waffles are available on request where marked.
        </p>
      </div>

      {/* order bar */}
      {count > 0 && !drawerOpen && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4"
        >
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex w-full max-w-md items-center justify-between rounded-full bg-brown py-3 pl-6 pr-3 text-cream shadow-lift"
          >
            <span className="font-semibold">View order · {count}</span>
            <span className="rounded-full bg-orange px-5 py-2.5 font-semibold text-white">${subtotal.toFixed(2)}</span>
          </button>
        </motion.div>
      )}
    </div>
  );
}
