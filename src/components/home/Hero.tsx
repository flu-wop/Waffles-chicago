"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Headline, Magnetic } from "../motion";
import { OpenBadge, Reassure } from "../ui";
import { useCart } from "../CartProvider";
import { galleryBy } from "@/lib/data";
import { cn } from "@/lib/cn";

type CardSpec = {
  alt: string;
  className: string; // position + size (md+)
  speed: number; // parallax px over the hero scroll
  rotate: number;
  round?: boolean;
  delay: number;
};

const DESKTOP: CardSpec[] = [
  { alt: "Chicago Waffle", className: "right-[7%] top-[13%] h-[22rem] w-[17rem] lg:h-[26rem] lg:w-[20rem]", speed: -150, rotate: 4, delay: 0 },
  { alt: "Red Velvet Bliss", className: "right-[36%] top-[58%] h-[13rem] w-[11rem] lg:h-[16rem] lg:w-[13.5rem]", speed: -260, rotate: -7, delay: 1.2 },
  { alt: "Blueberry Lemon", className: "right-[3%] top-[66%] h-[10rem] w-[10rem] lg:h-[12.5rem] lg:w-[12.5rem]", speed: -90, rotate: 0, round: true, delay: 2.4 },
  { alt: "Nutella Addiction", className: "right-[34%] top-[11%] h-[8.5rem] w-[8.5rem] lg:h-[10rem] lg:w-[10rem]", speed: -210, rotate: 0, round: true, delay: 3.1 },
];

const MOBILE: CardSpec[] = [
  { alt: "Chicago Waffle", className: "left-1/2 top-0 h-[15rem] w-[11.5rem] -translate-x-[40%]", speed: -60, rotate: 5, delay: 0 },
  { alt: "Red Velvet Bliss", className: "left-[4%] top-[8.5rem] h-[9.5rem] w-[8rem]", speed: -110, rotate: -8, delay: 1.2 },
  { alt: "Blueberry Lemon", className: "right-[3%] top-[11rem] h-[7.5rem] w-[7.5rem]", speed: -40, rotate: 0, round: true, delay: 2.2 },
];

function Card({ spec, progress, priority }: { spec: CardSpec; progress: MotionValue<number>; priority?: boolean }) {
  const g = galleryBy(spec.alt);
  const y = useTransform(progress, [0, 1], [0, spec.speed]);
  const r = useTransform(progress, [0, 1], [spec.rotate, spec.rotate * 2.2]);
  return (
    <motion.div className={cn("absolute", spec.className)} style={{ y, rotate: r }}>
      <div
        className={cn(
          "relative h-full w-full animate-bob overflow-hidden bg-white shadow-lift",
          spec.round ? "rounded-full" : "rounded-[1.75rem]"
        )}
        style={{ animationDelay: `${spec.delay}s` }}
      >
        <Image
          src={g.src}
          alt={g.alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 50vw, 20rem"
          className="object-cover"
        />
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { location } = useCart();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const sunY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const sunScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden bg-cream pb-16 pt-28 md:pb-0 md:pt-0">
      {/* sun */}
      <motion.div
        aria-hidden
        style={{ y: sunY, scale: sunScale }}
        className="absolute hidden rounded-full bg-gradient-to-br from-orange-light via-orange to-orange-deep opacity-[0.96] md:-right-[12%] md:top-[2%] md:block md:h-[62vw] md:w-[62vw] md:max-h-[920px] md:max-w-[920px]"
      />
      <div aria-hidden className="absolute -left-24 bottom-10 hidden h-72 w-72 rounded-full bg-butter md:block" />

      {/* desktop floating cards */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        {DESKTOP.map((c, i) => (
          <Card key={c.alt} spec={c} progress={scrollYProgress} priority={i === 0} />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-6 md:pt-24">
        <motion.div style={{ y: textY }} className="max-w-[40rem] text-center md:max-w-[31rem] md:text-left lg:max-w-[34rem]">
          <div className="mb-6 flex justify-center md:justify-start">
            <OpenBadge loc={location} />
          </div>
          <Headline
            as="h1"
            immediate
            delay={0.15}
            text="Breakfast worth *waking up* for."
            className="text-[2.9rem] font-semibold leading-[0.96] text-brown sm:text-6xl lg:text-[5rem]"
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-brown-light md:mx-0"
          >
            Belgian waffles, buttermilk pancakes and skillets made to order — at five Chicago-area tables, since 2011.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.8 }}
            className="mt-8"
          >
            <div className="flex flex-wrap justify-center gap-3 md:justify-start">
              <Magnetic>
                <Link
                  href="/menu"
                  className="inline-flex rounded-full bg-brown px-8 py-4 text-[15px] font-semibold text-cream shadow-lift transition-colors hover:bg-cocoa"
                >
                  Order Online
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  href="/locations"
                  className="inline-flex rounded-full border-2 border-brown/25 bg-cream/60 px-7 py-[14px] text-[15px] font-semibold text-brown backdrop-blur transition-colors hover:border-brown"
                >
                  Find a table
                </Link>
              </Magnetic>
            </div>
            <Reassure>No account needed — build your order in under a minute.</Reassure>
          </motion.div>
        </motion.div>

        {/* mobile floating cards */}
        <div className="pointer-events-none relative mx-auto mt-10 h-[22rem] w-full max-w-sm md:hidden">
          <div aria-hidden className="absolute left-1/2 top-[46%] h-[21rem] w-[21rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-orange-light via-orange to-orange-deep" />
          {MOBILE.map((c, i) => (
            <Card key={c.alt} spec={c} progress={scrollYProgress} priority={i === 0} />
          ))}
        </div>
      </div>

      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-xs font-medium uppercase tracking-[0.3em] text-brown/50 md:block"
      >
        Scroll
      </motion.div>
    </section>
  );
}
