"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Headline, Magnetic, Reveal } from "../motion";
import { ButtonLink, Eyebrow, Reassure } from "../ui";
import { galleryBy } from "@/lib/data";

function TiltCard() {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 160, damping: 16 });
  const sy = useSpring(py, { stiffness: 160, damping: 16 });
  const rx = useTransform(sy, [-0.5, 0.5], [10, -10]);
  const ry = useTransform(sx, [-0.5, 0.5], [-14, 14]);
  return (
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
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        initial={{ rotate: -5 }}
        className="relative mx-auto aspect-[1386/882] w-full max-w-sm overflow-hidden rounded-3xl shadow-lift"
      >
        <Image src="/media/giftcard-front.webp" alt="Chicago Waffles gift card" fill sizes="24rem" className="object-cover" />
      </motion.div>
    </div>
  );
}

export default function Teasers() {
  const cater = galleryBy("Waffle Flight");
  return (
    <section className="mx-auto grid max-w-6xl gap-6 px-6 py-8 md:grid-cols-2 md:py-16">
      {/* catering */}
      <div className="relative overflow-hidden rounded-[2rem] bg-brown text-cream">
        <div className="relative h-56 md:h-72">
          <Image src={cater.src} alt={cater.alt} fill sizes="(max-width: 768px) 100vw, 40rem" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-brown via-brown/30 to-transparent" />
        </div>
        <div className="p-7 md:p-10">
          <Eyebrow light>Catering</Eyebrow>
          <Headline text="Feed the whole *office*." className="mt-3 text-4xl font-semibold md:text-5xl" />
          <Reveal>
            <p className="mt-4 max-w-sm text-cream/75">Breakfast packages serve 15. Pick up seven days a week at any location.</p>
            <div className="mt-7">
              <Magnetic>
                <ButtonLink href="/catering" variant="orange">Plan your catering</ButtonLink>
              </Magnetic>
              <Reassure light>Tell us the date and headcount — that&apos;s all we need.</Reassure>
            </div>
          </Reveal>
        </div>
      </div>

      {/* gift cards */}
      <div className="relative overflow-hidden rounded-[2rem] bg-butter">
        <div className="px-7 pb-2 pt-10 md:px-10 md:pt-14">
          <TiltCard />
        </div>
        <div className="p-7 md:p-10">
          <Eyebrow>Gift cards</Eyebrow>
          <Headline text="Give someone a *morning*." className="mt-3 text-4xl font-semibold md:text-5xl" />
          <Reveal>
            <p className="mt-4 max-w-sm text-brown-light">
              Delivered instantly by email or text, valid for 12 months, no expiration fees.
            </p>
            <div className="mt-7">
              <Magnetic>
                <ButtonLink href="/gift-cards" variant="brown">Send a gift card</ButtonLink>
              </Magnetic>
              <Reassure>Pick an amount, add a note — done in a minute.</Reassure>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
