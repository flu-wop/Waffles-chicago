"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Headline } from "../motion";
import { Eyebrow } from "../ui";
import { findItem, money, SIGNATURE_IDS } from "@/lib/data";

const ITEMS = SIGNATURE_IDS.map((id) => findItem("standard", id)).filter(Boolean) as NonNullable<
  ReturnType<typeof findItem>
>[];

export default function SignatureRail() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [maxX, setMaxX] = useState(2400);

  useEffect(() => {
    const measure = () => {
      if (!track.current) return;
      setMaxX(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 600);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -maxX]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={section} style={{ height: `calc(100svh + ${maxX}px)` }} className="relative">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden bg-cream">
        <div className="mx-auto w-full max-w-6xl px-6">
          <Eyebrow>Fan favorites</Eyebrow>
          <Headline
            text="The plates people cross town *for*."
            className="mt-3 max-w-2xl text-[2.3rem] font-semibold md:text-6xl"
          />
        </div>

        <motion.div ref={track} style={{ x }} className="mt-8 flex w-max gap-5 pl-6 pr-[20vw] md:mt-10 md:gap-7 md:pl-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]">
          {ITEMS.map((it, i) => (
            <Link
              key={it.id}
              href={`/menu#${it.id}`}
              className="group relative block h-[26rem] w-[17rem] shrink-0 overflow-hidden rounded-[2rem] bg-butter shadow-lift md:h-[30rem] md:w-[22rem]"
            >
              {it.image && (
                <Image
                  src={it.image}
                  alt={it.name}
                  fill
                  sizes="(max-width: 768px) 17rem, 22rem"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-cocoa/90 via-cocoa/10 to-transparent" />
              <span className="absolute left-5 top-5 rounded-full bg-cream/90 px-3 py-1 text-xs font-semibold text-brown">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="absolute right-5 top-5 rounded-full bg-orange px-3 py-1 text-sm font-semibold text-white">
                {money(it.price)}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-6 text-cream">
                <h3 className="text-2xl font-semibold leading-tight">{it.name}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-cream/75">{it.description}</p>
                <span className="mt-3 inline-block text-sm font-semibold text-orange-light">See on the menu →</span>
              </div>
            </Link>
          ))}
        </motion.div>

        <div className="mx-auto mt-8 w-full max-w-6xl px-6">
          <div className="h-1 w-full overflow-hidden rounded-full bg-brown/10">
            <motion.div style={{ width: bar }} className="h-full rounded-full bg-orange" />
          </div>
          <p className="mt-3 text-xs text-brown-light">
            Prices shown for South Loop, West Loop, Lincoln Square and Oak Park. Willowbrook&apos;s menu differs slightly.
          </p>
        </div>
      </div>
    </section>
  );
}
