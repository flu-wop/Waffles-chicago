"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Headline, Reveal } from "@/components/motion";
import { ButtonBtn, ButtonLink, Eyebrow, Reassure } from "@/components/ui";
import { cn } from "@/lib/cn";

const AMOUNTS = [25, 50, 75, 100];
const F = "mt-1 w-full rounded-xl border border-brown/15 bg-white px-4 py-3";

export default function GiftClient() {
  const [amount, setAmount] = useState(50);
  const [custom, setCustom] = useState("");
  const [via, setVia] = useState<"email" | "text">("email");
  const [to, setTo] = useState("");
  const [done, setDone] = useState<null | { to: string; amount: number }>(null);

  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 160, damping: 16 });
  const sy = useSpring(py, { stiffness: 160, damping: 16 });
  const rx = useTransform(sy, [-0.5, 0.5], [9, -9]);
  const ry = useTransform(sx, [-0.5, 0.5], [-12, 12]);

  const value = custom ? Math.max(0, Math.min(500, Number(custom) || 0)) : amount;

  return (
    <section className="mx-auto max-w-6xl px-6 pb-12 pt-32 md:pt-40">
      <Eyebrow>Gift cards</Eyebrow>
      <Headline as="h1" immediate text="Give someone a *morning*." className="mt-3 max-w-4xl text-[3rem] font-semibold md:text-8xl" />

      <div className="mt-12 grid items-start gap-10 md:grid-cols-[1.1fr_1fr]">
        <div className="md:sticky md:top-28">
          <div
            ref={ref}
            className="[perspective:1000px]"
            onPointerMove={(e) => {
              if (e.pointerType !== "mouse") return;
              const r = ref.current!.getBoundingClientRect();
              px.set((e.clientX - r.left) / r.width - 0.5);
              py.set((e.clientY - r.top) / r.height - 0.5);
            }}
            onPointerLeave={() => {
              px.set(0);
              py.set(0);
            }}
          >
            <motion.div
              style={{ rotateX: rx, rotateY: ry }}
              className="relative aspect-[1386/882] w-full overflow-hidden rounded-[2rem] shadow-lift"
            >
              <Image src="/media/giftcard-front.webp" alt="Chicago Waffles gift card" fill priority sizes="(max-width: 768px) 100vw, 40rem" className="object-cover" />
              <div className="absolute left-[5%] top-[7%] max-w-[40%] text-brown">
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-brown/60 sm:text-xs">A gift for</p>
                <p className="mt-1 truncate font-serif text-xl italic sm:text-3xl">{to || "someone sweet"}</p>
              </div>
              <p className="absolute bottom-[8%] left-[6%] text-5xl font-semibold tracking-tight text-white sm:text-7xl">${value}</p>
            </motion.div>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              ["Any occasion", "Birthdays, anniversaries, holidays, or just because."],
              ["Instant delivery", "Sent right away by email or text."],
              ["Valid 12 months", "No expiration fees."],
            ].map(([t, d]) => (
              <li key={t} className="rounded-[1.25rem] bg-white p-4 shadow-soft">
                <p className="font-semibold">{t}</p>
                <p className="mt-1 text-sm text-brown-light">{d}</p>
              </li>
            ))}
          </ul>
        </div>

        <Reveal>
          {done ? (
            <div className="rounded-[2rem] bg-butter p-10 text-center">
              <p className="font-serif text-4xl italic text-orange">Sent.</p>
              <p className="mx-auto mt-3 max-w-xs text-brown-light">
                A ${done.amount} gift card is on its way to {done.to || "your friend"}.
              </p>
              <p className="mt-6 text-xs text-brown-light">Demo only — nothing was charged or sent.</p>
              <ButtonLink href="/menu" className="mt-6">Treat yourself too</ButtonLink>
            </div>
          ) : (
            <form
              className="space-y-6 rounded-[2rem] bg-white p-7 shadow-soft md:p-9"
              onSubmit={(e) => {
                e.preventDefault();
                setDone({ to, amount: value });
              }}
            >
              <div>
                <p className="text-sm font-semibold">Amount</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {AMOUNTS.map((a) => (
                    <button
                      type="button"
                      key={a}
                      onClick={() => {
                        setAmount(a);
                        setCustom("");
                      }}
                      className={cn(
                        "rounded-full border px-5 py-2.5 font-semibold transition-colors",
                        !custom && amount === a ? "border-brown bg-brown text-cream" : "border-brown/15 hover:border-orange"
                      )}
                    >
                      ${a}
                    </button>
                  ))}
                  <input
                    inputMode="numeric"
                    placeholder="Other"
                    value={custom}
                    onChange={(e) => setCustom(e.target.value.replace(/\D/g, "").slice(0, 3))}
                    aria-label="Custom amount"
                    className="w-24 rounded-full border border-brown/15 px-4 py-2.5 text-center font-semibold placeholder:font-normal"
                  />
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold">Send by</p>
                <div className="mt-2 inline-flex rounded-full bg-butter p-1">
                  {(["email", "text"] as const).map((v) => (
                    <button
                      type="button"
                      key={v}
                      onClick={() => setVia(v)}
                      className={cn("rounded-full px-5 py-2 text-sm font-semibold capitalize transition-colors", via === v ? "bg-brown text-cream" : "text-brown/70")}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <label className="block text-sm font-medium">
                Recipient&apos;s name
                <input required value={to} onChange={(e) => setTo(e.target.value)} className={F} />
              </label>
              <label className="block text-sm font-medium">
                Recipient&apos;s {via === "email" ? "email" : "mobile number"}
                <input required type={via === "email" ? "email" : "tel"} className={F} />
              </label>
              <label className="block text-sm font-medium">
                Your name
                <input required autoComplete="name" className={F} />
              </label>
              <label className="block text-sm font-medium">
                Message <span className="text-brown/40">(optional)</span>
                <textarea rows={3} maxLength={200} className={F} />
              </label>

              <div>
                <ButtonBtn type="submit" disabled={value < 5} className="w-full">Send ${value} gift card</ButtonBtn>
                <Reassure>No account needed — it takes about a minute.</Reassure>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
