"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Headline, Reveal } from "../motion";
import { Drip, Eyebrow, OpenBadge } from "../ui";
import { useCart } from "../CartProvider";
import { locations, mapsUrl } from "@/lib/data";
import { hoursGroups } from "@/lib/hours";
import { cn } from "@/lib/cn";

export const FALLBACK_PHOTO = "/media/giftcard-front.webp";

export default function Locations() {
  const [i, setI] = useState(0);
  const { setLocation } = useCart();
  const loc = locations[i];
  const photo = loc.photos[0] ?? FALLBACK_PHOTO;

  return (
    <section className="relative overflow-hidden bg-cocoa text-cream">
      <div className="absolute inset-x-0 top-0 z-10">
        <Drip color="#FFF8EF" />
      </div>
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-32 md:pb-32 md:pt-48">
        <Eyebrow light>Five tables</Eyebrow>
        <Headline
          text="One *warm* welcome, five neighborhoods."
          className="mt-3 max-w-3xl text-[2.5rem] font-semibold md:text-6xl"
        />

        <div className="mt-12 grid gap-8 md:grid-cols-[0.9fr_1.5fr] md:gap-12">
          {/* list */}
          <div className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 md:mx-0 md:flex-col md:gap-0 md:overflow-visible md:px-0">
            {locations.map((l, idx) => (
              <button
                key={l.slug}
                onClick={() => setI(idx)}
                className={cn(
                  "group shrink-0 rounded-full border px-5 py-3 text-left transition-colors md:rounded-none md:border-0 md:border-t md:border-white/10 md:px-0 md:py-5",
                  idx === i
                    ? "border-orange bg-orange text-white md:bg-transparent md:text-cream"
                    : "border-white/20 text-cream/70 hover:text-cream"
                )}
              >
                <span className="flex items-baseline gap-4">
                  <span className="hidden font-serif text-lg italic text-orange md:inline">{String(idx + 1).padStart(2, "0")}</span>
                  <span className="text-lg font-semibold md:text-3xl">{l.name}</span>
                </span>
                <span className="mt-1 hidden pl-9 text-sm text-cream/55 md:block">
                  {l.street}, {l.city}
                </span>
              </button>
            ))}
          </div>

          {/* photo + details */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-brown md:aspect-[5/4]">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={loc.slug}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
              >
                <Image
                  src={photo}
                  alt={`${loc.name} — Chicago Waffles`}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-cocoa/95 via-cocoa/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <OpenBadge loc={loc} dark />
              <h3 className="mt-3 text-3xl font-semibold md:text-4xl">{loc.name}</h3>
              <p className="mt-1 text-cream/75">
                {loc.street}, {loc.city}, {loc.state} {loc.zip}
              </p>
              <p className="mt-1 text-sm text-cream/55">{hoursGroups(loc).map((h) => `${h.label} ${h.value}`).join(" · ")}</p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                <Link
                  href="/menu"
                  onClick={() => setLocation(loc.slug)}
                  className="rounded-full bg-orange px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-deep"
                >
                  Order from here
                </Link>
                <a
                  href={mapsUrl(loc)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/25 px-5 py-3 text-sm font-semibold transition-colors hover:border-orange hover:text-orange"
                >
                  Directions
                </a>
                <Link
                  href={`/locations/${loc.slug}`}
                  className="rounded-full border border-white/25 px-5 py-3 text-sm font-semibold transition-colors hover:border-orange hover:text-orange"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Reveal>
          <p className="mt-8 text-sm text-cream/50">Hours and open-now status are live to Chicago time.</p>
        </Reveal>
      </div>
    </section>
  );
}
