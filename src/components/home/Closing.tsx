"use client";

import { Counter, Headline, Magnetic, Reveal } from "../motion";
import { ButtonBtn, ButtonLink, Reassure } from "../ui";
import { useCart } from "../CartProvider";

const STATS = [
  { to: 14, suffix: "+", label: "Years of mornings" },
  { to: 1000000, suffix: "+", label: "Guests served", compact: true },
  { to: 5, suffix: "", label: "Locations" },
  { to: 150, suffix: "+", label: "Dishes on the menu" },
];

export default function Closing() {
  const { setReserveOpen } = useCart();
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 py-12 md:py-20">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {STATS.map((s) => (
            <Reveal key={s.label}>
              <dt className="text-5xl font-semibold tracking-tight text-brown md:text-6xl">
                <Counter to={s.to} suffix={s.suffix} compact={"compact" in s} />
              </dt>
              <dd className="mt-2 text-sm font-medium uppercase tracking-[0.16em] text-brown-light">{s.label}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      <section className="px-4 pb-8 pt-12 md:px-6">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-orange px-6 py-20 text-center text-white md:py-28">
          <div aria-hidden className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-orange-light/60" />
          <div aria-hidden className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-orange-deep/60" />
          <div className="relative">
            <Headline text="Your table is *waiting*." className="mx-auto max-w-3xl text-[2.8rem] font-semibold md:text-7xl [&_.font-serif]:!text-brown" />
            <Reveal delay={0.1}>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Magnetic>
                  <ButtonLink href="/menu" variant="brown">Order Online</ButtonLink>
                </Magnetic>
                <Magnetic>
                  <ButtonBtn variant="cream" onClick={() => setReserveOpen(true)}>Reserve a table</ButtonBtn>
                </Magnetic>
              </div>
              <Reassure light>Takes about 20 seconds — no account needed.</Reassure>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
