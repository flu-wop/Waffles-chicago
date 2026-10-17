"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "./CartProvider";
import { Magnetic } from "./motion";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "/menu", label: "Menu" },
  { href: "/locations", label: "Locations" },
  { href: "/catering", label: "Catering" },
  { href: "/gallery", label: "Gallery" },
  { href: "/gift-cards", label: "Gift Cards" },
];

export default function Header() {
  const pathname = usePathname();
  const { count, ready, setDrawerOpen, setReserveOpen } = useCart();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6">
        <div
          className={cn(
            "mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full pl-5 pr-2 transition-all duration-300 md:h-16",
            scrolled
              ? "bg-cream/90 shadow-soft backdrop-blur-md"
              : "bg-cream/70 backdrop-blur-sm"
          )}
        >
          <Link href="/" aria-label="Chicago Waffles — home" className="flex items-center">
            <Image src="/logo-dark.svg" alt="Chicago Waffles" width={451} height={86} priority className="h-7 w-auto md:h-8" />
          </Link>

          <nav className="hidden items-center gap-8 text-[15px] font-medium lg:flex">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={cn(
                  "relative transition-colors hover:text-orange",
                  pathname.startsWith(n.href) ? "text-orange" : "text-brown/80"
                )}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setReserveOpen(true)}
              className="hidden rounded-full px-4 py-2 text-sm font-semibold text-brown/80 transition-colors hover:text-orange md:block"
            >
              Reserve
            </button>
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Open your order"
              className="relative grid h-10 w-10 place-items-center rounded-full text-brown transition-colors hover:bg-butter"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 8h14l-1.2 11a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Z" />
                <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
              </svg>
              {ready && count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-orange px-1 text-[11px] font-bold text-white">
                  {count}
                </span>
              )}
            </button>
            <Magnetic className="hidden sm:inline-block" strength={0.25}>
              <Link
                href="/menu"
                className="rounded-full bg-orange px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-deep"
              >
                Order Online
              </Link>
            </Magnetic>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="grid h-10 w-10 place-items-center rounded-full text-brown hover:bg-butter lg:hidden"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M4 8h16M4 16h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            data-lenis-prevent
            className="fixed inset-0 z-[70] flex flex-col bg-cocoa px-6 pb-10 pt-5 text-cream"
            initial={{ clipPath: "circle(0% at 90% 4%)" }}
            animate={{ clipPath: "circle(150% at 90% 4%)" }}
            exit={{ clipPath: "circle(0% at 90% 4%)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex items-center justify-between">
              <Image src="/logo-light.svg" alt="Chicago Waffles" width={451} height={86} className="h-7 w-auto" />
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="grid h-10 w-10 place-items-center rounded-full bg-white/10">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>
            <nav className="mt-12 flex flex-1 flex-col gap-1">
              {[{ href: "/", label: "Home" }, ...NAV].map((n, i) => (
                <motion.div
                  key={n.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
                >
                  <Link href={n.href} className="block py-2 text-4xl font-semibold tracking-tight hover:text-orange">
                    {n.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="flex flex-col gap-3">
              <Link href="/menu" className="rounded-full bg-orange py-4 text-center text-base font-semibold text-white">
                Order Online
              </Link>
              <button
                onClick={() => {
                  setOpen(false);
                  setReserveOpen(true);
                }}
                className="rounded-full border border-white/20 py-4 text-base font-semibold"
              >
                Reserve a Table
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
