"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Headline, Magnetic } from "../motion";
import { ButtonLink, Eyebrow } from "../ui";
import { gallery } from "@/lib/data";

const FOOD = gallery.filter((g) => g.kind === "food");
const COLS = [
  [FOOD[3], FOOD[13], FOOD[21]],
  [FOOD[9], FOOD[6], FOOD[25]],
  [FOOD[22], FOOD[2], FOOD[10]],
];
const SPEEDS = [-70, 70, -110];

export default function GalleryParallax() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y0 = useTransform(scrollYProgress, [0, 1], [0, SPEEDS[0]]);
  const y1 = useTransform(scrollYProgress, [0, 1], [0, SPEEDS[1]]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, SPEEDS[2]]);
  const ys = [y0, y1, y2];

  return (
    <section ref={ref} className="relative overflow-hidden py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <Eyebrow>The kitchen, up close</Eyebrow>
        <Headline text="Eat with your *eyes* first." className="mx-auto mt-3 max-w-2xl text-[2.5rem] font-semibold md:text-6xl" />
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl grid-cols-2 gap-3 px-6 md:grid-cols-3 md:gap-6">
        {COLS.map((col, ci) => (
          <motion.div
            key={ci}
            style={{ y: ys[ci] }}
            className={ci === 2 ? "hidden flex-col gap-3 md:flex md:gap-6" : "flex flex-col gap-3 md:gap-6"}
          >
            {col.map((g) => (
              <Link key={g.src} href="/gallery" className="group relative block aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-butter shadow-soft">
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </Link>
            ))}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 mt-16 text-center">
        <Magnetic>
          <ButtonLink href="/gallery" variant="brown">See the whole gallery</ButtonLink>
        </Magnetic>
      </div>
    </section>
  );
}
