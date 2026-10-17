import Link from "next/link";
import { Headline, Reveal } from "../motion";
import { Drip, Eyebrow, WaffleIcon } from "../ui";

export default function Deals() {
  return (
    <section className="relative overflow-hidden bg-orange text-white">
      <div className="absolute inset-x-0 top-0 z-10">
        <Drip color="#FFF8EF" />
      </div>
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-28 md:grid-cols-[1.2fr_1fr] md:pb-28 md:pt-44">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/75">Every week</span>
          <Headline
            text="Midweek just got *sweeter*."
            className="mt-3 text-[2.6rem] font-semibold md:text-7xl [&_.font-serif]:!text-brown"
          />
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-md text-lg text-white/85">
              Breakfast Deals run Tuesday, Wednesday and Thursday — at all five locations.
            </p>
            <div className="mt-7 flex gap-3">
              {["Tue", "Wed", "Thu"].map((d) => (
                <span key={d} className="rounded-full bg-white px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-orange-deep shadow-lift">
                  {d}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="flex justify-center md:justify-end">
          <Link href="/menu#sec-brunch-favorites" className="group relative block h-64 w-64 md:h-80 md:w-80" aria-label="New: Southern Grits Bowls">
            <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-[spin_22s_linear_infinite]" aria-hidden>
              <defs>
                <path id="circ" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
              </defs>
              <text fill="#FFF8EF" fontSize="15.5" fontWeight="700" letterSpacing="3.2">
                <textPath href="#circ">NEW • SOUTHERN GRITS BOWLS • NEW • SOUTHERN GRITS BOWLS •</textPath>
              </text>
            </svg>
            <div className="absolute inset-[18%] grid place-items-center rounded-full bg-cream text-brown shadow-lift transition-transform duration-500 group-hover:scale-105">
              <div className="text-center">
                <WaffleIcon className="mx-auto h-9 w-9 text-orange" />
                <p className="mt-2 font-serif text-xl italic leading-none">Grits</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-brown-light">See the bowls</p>
              </div>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
