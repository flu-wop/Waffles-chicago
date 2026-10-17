"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Headline, Reveal, Magnetic } from "../motion";
import { ButtonLink, Eyebrow, Reassure } from "../ui";
import { cn } from "@/lib/cn";

const STEPS = ["Received", "On the iron", "Ready for pickup"];

export default function OrderVignette() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => setStep((s) => (s + 1) % (STEPS.length + 1)), 2200);
    return () => clearInterval(t);
  }, [inView]);

  const active = Math.min(step, STEPS.length - 1);

  return (
    <section className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-24 md:grid-cols-2 md:py-36">
      <div>
        <Eyebrow>Order ahead</Eyebrow>
        <Headline text="Skip the *wait*, keep the warm." className="mt-3 text-[2.5rem] font-semibold md:text-6xl" />
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-brown-light">
            Build your order from the full menu, pick your location, and walk in to a plate that&apos;s just come off the iron.
          </p>
          <div className="mt-8">
            <Magnetic>
              <ButtonLink href="/menu">Start your order</ButtonLink>
            </Magnetic>
            <Reassure>No account needed — checkout in under a minute.</Reassure>
          </div>
        </Reveal>
      </div>

      <div ref={ref} className="relative mx-auto w-full max-w-sm">
        <div aria-hidden className="absolute -inset-6 -z-10 rounded-[3rem] bg-butter" />
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: 3 }}
          whileInView={{ opacity: 1, y: 0, rotate: -2 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
          className="rounded-[2rem] bg-white p-6 shadow-lift"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange">Order #2841</p>
              <p className="mt-1 text-lg font-semibold">South Loop · Pickup</p>
            </div>
            <span className="rounded-full bg-butter px-3 py-1 text-xs font-semibold">8:45 AM</span>
          </div>

          <ul className="mt-5 space-y-3 border-y border-brown/10 py-4 text-[15px]">
            <li className="flex justify-between gap-4">
              <span>1× Dubai Chocolate Dream Waffle</span>
              <span className="font-semibold">$19.00</span>
            </li>
            <li className="flex justify-between gap-4">
              <span>1× Latte</span>
              <span className="font-semibold">$5.00</span>
            </li>
          </ul>

          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-brown-light">Subtotal</span>
            <span className="text-xl font-semibold">$24.00</span>
          </div>

          <div className="mt-6 space-y-3">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-3">
                <span
                  className={cn(
                    "grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-bold transition-colors duration-500",
                    i < step || (step === STEPS.length) ? "bg-orange text-white" : i === active ? "bg-orange/20 text-orange" : "bg-brown/10 text-brown/40"
                  )}
                >
                  {i < step || step === STEPS.length ? "✓" : i + 1}
                </span>
                <span className={cn("text-sm font-medium transition-colors duration-500", i <= active ? "text-brown" : "text-brown/40")}>{s}</span>
                {i === active && step < STEPS.length && <span className="ml-auto h-1.5 w-1.5 animate-ping rounded-full bg-orange" />}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
