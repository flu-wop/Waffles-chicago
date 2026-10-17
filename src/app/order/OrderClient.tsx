"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/components/CartProvider";
import { Headline } from "@/components/motion";
import { ButtonBtn, ButtonLink, OpenBadge } from "@/components/ui";
import { locations, money2 } from "@/lib/data";
import { cn } from "@/lib/cn";

const SLOTS = ["ASAP (about 15–20 min)", "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM"];

type Done = { num: number; name: string; where: string; when: string; total: number; count: number };

export default function OrderClient() {
  const { lines, subtotal, count, inc, dec, location, setLocation, clear } = useCart();
  const [slot, setSlot] = useState(SLOTS[0]);
  const [done, setDone] = useState<Done | null>(null);
  const [step, setStep] = useState(0);
  const num = useMemo(() => 2800 + Math.floor(Math.random() * 190), []);

  if (done) {
    return (
      <section className="mx-auto max-w-2xl px-6 pb-24 pt-36 text-center md:pt-44">
        <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 180, damping: 14 }} className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-orange text-5xl text-white shadow-lift">
          ✓
        </motion.div>
        <Headline as="h1" immediate text="Order *placed*." className="mt-8 text-5xl font-semibold md:text-7xl" />
        <p className="mx-auto mt-4 max-w-md text-lg text-brown-light">
          Thanks, {done.name}. Order #{done.num} — {done.count} item{done.count === 1 ? "" : "s"}, {money2(done.total)} — will be ready at {done.where} {done.when.toLowerCase().startsWith("asap") ? "in about 15–20 minutes" : `at ${done.when}`}.
        </p>
        <div className="mx-auto mt-8 max-w-sm rounded-[1.5rem] bg-butter p-5 text-sm text-brown-light">
          This is a design demo. No payment was taken and no order was sent to a kitchen.
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/menu">Order something else</ButtonLink>
          <ButtonLink href="/" variant="ghost">Back home</ButtonLink>
        </div>
      </section>
    );
  }

  if (lines.length === 0) {
    return (
      <section className="mx-auto max-w-2xl px-6 pb-24 pt-36 text-center md:pt-44">
        <p className="font-serif text-6xl italic text-orange">Empty plate.</p>
        <h1 className="mt-4 text-3xl font-semibold md:text-5xl">Nothing in your order yet.</h1>
        <ButtonLink href="/menu" className="mt-8">Browse the menu</ButtonLink>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 pt-32 md:pt-40">
      <Headline as="h1" immediate text="Almost *there*." className="text-[3rem] font-semibold md:text-7xl" />
      <p className="mt-3 text-lg text-brown-light">Review, pick a time, and you&apos;re done. No account needed.</p>

      <div className="mt-10 grid gap-8 md:grid-cols-[1.4fr_1fr]">
        <form
          id="checkout"
          onSubmit={(e) => {
            e.preventDefault();
            const f = new FormData(e.currentTarget);
            setDone({
              num,
              name: String(f.get("name") || "friend").split(" ")[0],
              where: location.name,
              when: slot,
              total: subtotal,
              count,
            });
            clear();
          }}
          className="space-y-6"
        >
          <div className="rounded-[1.5rem] bg-white p-6 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange">1 · Pickup location</p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <select value={location.slug} onChange={(e) => setLocation(e.target.value)} className="min-w-0 flex-1 rounded-xl border border-brown/15 bg-cream px-4 py-3 font-semibold">
                {locations.map((l) => (
                  <option key={l.slug} value={l.slug}>{l.name} — {l.street}</option>
                ))}
              </select>
              <OpenBadge loc={location} className="!bg-butter" />
            </div>
          </div>

          <div className="rounded-[1.5rem] bg-white p-6 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange">2 · Pickup time</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {SLOTS.map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setSlot(s)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                    slot === s ? "border-brown bg-brown text-cream" : "border-brown/15 hover:border-orange"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] bg-white p-6 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange">3 · Your details</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <label className="text-sm font-medium">
                Name
                <input required name="name" autoComplete="name" className="mt-1 w-full rounded-xl border border-brown/15 bg-cream px-4 py-3" />
              </label>
              <label className="text-sm font-medium">
                Phone
                <input required name="phone" type="tel" autoComplete="tel" className="mt-1 w-full rounded-xl border border-brown/15 bg-cream px-4 py-3" />
              </label>
              <label className="text-sm font-medium sm:col-span-2">
                Notes for the kitchen <span className="text-brown/40">(optional)</span>
                <textarea name="notes" rows={2} className="mt-1 w-full rounded-xl border border-brown/15 bg-cream px-4 py-3" />
              </label>
            </div>
          </div>

          <div className="rounded-[1.5rem] bg-white p-6 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange">4 · Payment</p>
            <p className="mt-3 text-brown-light">Demo checkout — payment isn&apos;t collected here. On the live site this step connects to your payment processor.</p>
          </div>
        </form>

        <aside className="h-fit rounded-[1.5rem] bg-butter p-6 md:sticky md:top-28">
          <h2 className="text-2xl font-semibold">Your order</h2>
          <ul className="mt-4 divide-y divide-brown/10">
            {lines.map((l) => (
              <li key={l.id} className="flex gap-3 py-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-white">
                  {l.image && <Image src={l.image} alt="" fill sizes="56px" className="object-cover" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium leading-snug">{l.name}</p>
                  <div className="mt-1 inline-flex items-center gap-2 rounded-full bg-white px-1 py-1">
                    <button type="button" onClick={() => dec(l.id)} aria-label="Remove one" className="grid h-6 w-6 place-items-center rounded-full bg-butter leading-none">−</button>
                    <span className="w-3 text-center text-xs font-semibold">{l.qty}</span>
                    <button type="button" onClick={() => inc(l.id)} aria-label="Add one" className="grid h-6 w-6 place-items-center rounded-full bg-butter leading-none">+</button>
                  </div>
                </div>
                <span className="text-sm font-semibold">{money2(l.price * l.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-baseline justify-between border-t border-brown/10 pt-4">
            <span className="text-brown-light">Subtotal</span>
            <span className="text-2xl font-semibold">{money2(subtotal)}</span>
          </div>
          <p className="mt-1 text-xs text-brown-light">Tax and tip are added at checkout on the live site.</p>
          <ButtonBtn type="submit" form="checkout" className="mt-5 w-full">Place order</ButtonBtn>
          <p className="mt-3 text-center text-sm text-brown-light">Review once more — you can edit quantities above.</p>
          <Link href="/menu" className="mt-4 block text-center text-sm font-semibold text-orange hover:underline">+ Add more</Link>
        </aside>
      </div>
    </section>
  );
}
