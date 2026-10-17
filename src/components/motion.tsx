"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useInView,
  animate,
} from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/** Wraps a CTA so it drifts toward the pointer. */
export function Magnetic({
  children,
  strength = 0.32,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });
  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Word-by-word masked reveal. Wrap a word in *asterisks* for the
 * orange serif-italic emphasis (one per headline).
 */
export function Headline({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
  immediate = false,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  immediate?: boolean;
}) {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  let i = 0;
  const words: { w: string; em: boolean; k: number; tail: string }[] = [];
  for (const p of parts) {
    const em = p.startsWith("*") && p.endsWith("*");
    let clean = em ? p.slice(1, -1) : p;
    // punctuation hugging the previous (emphasized) word stays attached to it
    if (!em && words.length && /^[^\s]/.test(clean)) {
      const m = clean.match(/^[^\s]+/)![0];
      words[words.length - 1].tail = m;
      clean = clean.slice(m.length);
    }
    for (const w of clean.split(/\s+/).filter(Boolean)) words.push({ w, em, k: i++, tail: "" });
  }
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const show = immediate || inView;
  return (
    <Tag ref={ref} className={className} aria-label={text.replace(/\*/g, "")}>
      {words.map(({ w, em, k, tail }) => (
        <span
          key={k}
          aria-hidden
          className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em] mr-[0.26em] last:mr-0"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "115%" }}
            animate={show ? { y: "0%" } : { y: "115%" }}
            transition={{ duration: 0.85, delay: delay + k * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <span className={cn(em && "font-serif italic font-medium text-orange")}>{w}</span>
            {tail}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Counter({
  to,
  suffix = "",
  duration = 1.8,
  compact = false,
}: {
  to: number;
  suffix?: string;
  duration?: number;
  compact?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, {
      duration,
      ease: [0.2, 0.7, 0.2, 1],
      onUpdate: (n) => setV(Math.round(n)),
    });
    return () => c.stop();
  }, [inView, to, duration]);
  return (
    <span ref={ref}>
      {compact
        ? new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(v)
        : v.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
