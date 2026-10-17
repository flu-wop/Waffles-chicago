"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { openStatus, type Status } from "@/lib/hours";
import type { Location } from "@/lib/data";

const DRIPS = [
  { x: 34, w: 22, h: 54 },
  { x: 96, w: 16, h: 30 },
  { x: 168, w: 26, h: 66 },
  { x: 250, w: 18, h: 36 },
  { x: 318, w: 24, h: 58 },
  { x: 392, w: 15, h: 26 },
  { x: 452, w: 22, h: 48 },
  { x: 530, w: 26, h: 70 },
  { x: 606, w: 16, h: 34 },
  { x: 672, w: 22, h: 52 },
];

/** Syrup-drip edge — the motif from their gift-card art. Hangs from the top of its parent. */
export function Drip({
  color = "#FFF8EF",
  className,
  flip = false,
}: {
  color?: string;
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 720 100"
      preserveAspectRatio="none"
      aria-hidden
      className={cn("block w-full h-10 md:h-20", flip && "rotate-180", className)}
    >
      <rect x="0" y="0" width="720" height="24" fill={color} />
      {DRIPS.map((d, i) => (
        <g key={i} fill={color}>
          <rect x={d.x - d.w / 2} y="18" width={d.w} height={d.h} />
          <circle cx={d.x} cy={18 + d.h} r={d.w * 0.74} />
        </g>
      ))}
    </svg>
  );
}

export function WaffleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="12" cy="12" r="9.5" />
      <path d="M8.5 3.5v17M15.5 3.5v17M3.5 8.5h17M3.5 15.5h17" />
    </svg>
  );
}

export function useOpenStatus(loc: Location): Status | null {
  const [s, setS] = useState<Status | null>(null);
  useEffect(() => {
    const tick = () => setS(openStatus(loc));
    tick();
    const t = setInterval(tick, 60_000);
    return () => clearInterval(t);
  }, [loc]);
  return s;
}

export function OpenBadge({
  loc,
  className,
  dark = false,
}: {
  loc: Location;
  className?: string;
  dark?: boolean;
}) {
  const s = useOpenStatus(loc);
  if (!s) return <span className={cn("inline-block h-6 w-28", className)} />;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium",
        dark ? "bg-white/10 text-cream" : "bg-white/80 text-brown",
        className
      )}
    >
      <span
        className={cn(
          "h-2 w-2 rounded-full",
          s.open ? "bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.25)]" : "bg-brown-light/50"
        )}
      />
      {s.label}
    </span>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "orange",
  className,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "orange" | "brown" | "ghost" | "cream";
  className?: string;
  onClick?: () => void;
}) {
  const v = {
    orange: "bg-orange text-white hover:bg-orange-deep shadow-lift",
    brown: "bg-brown text-cream hover:bg-cocoa shadow-lift",
    ghost: "border-2 border-brown/20 text-brown hover:border-orange hover:text-orange",
    cream: "bg-cream text-brown hover:bg-white shadow-lift",
  }[variant];
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-[15px] font-semibold transition-colors",
        v,
        className
      )}
    >
      {children}
    </Link>
  );
}

export function ButtonBtn({
  children,
  variant = "orange",
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "orange" | "brown" | "ghost" | "cream";
}) {
  const v = {
    orange: "bg-orange text-white hover:bg-orange-deep shadow-lift",
    brown: "bg-brown text-cream hover:bg-cocoa shadow-lift",
    ghost: "border-2 border-brown/20 text-brown hover:border-orange hover:text-orange",
    cream: "bg-cream text-brown hover:bg-white shadow-lift",
  }[variant];
  return (
    <button
      {...rest}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-[15px] font-semibold transition-colors disabled:opacity-50",
        v,
        className
      )}
    >
      {children}
    </button>
  );
}

export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span
      className={cn(
        "text-xs font-semibold uppercase tracking-[0.22em]",
        light ? "text-orange-light" : "text-orange"
      )}
    >
      {children}
    </span>
  );
}

export function Reassure({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={cn("mt-3 text-sm", light ? "text-cream/60" : "text-brown-light")}>{children}</p>;
}
