import Link from "next/link";
import Image from "next/image";
import { Drip } from "./ui";
import { locations, SOCIAL } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative mt-24 bg-cocoa text-cream">
      <div className="absolute inset-x-0 top-0">
        <Drip color="#FFF8EF" className="!h-10 md:!h-16" />
      </div>
      <div className="mx-auto max-w-6xl px-6 pb-10 pt-24 md:pt-32">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1.4fr]">
          <div>
            <Image src="/logo-light.svg" alt="Chicago Waffles" width={451} height={86} className="h-9 w-auto" />
            <p className="mt-5 max-w-xs font-serif text-2xl italic leading-snug text-orange-light">
              Syrup on the fork since 2011.
            </p>
            <div className="mt-6 flex gap-3 text-sm">
              {Object.entries(SOCIAL).map(([k, v]) => (
                <a
                  key={k}
                  href={v}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/20 px-4 py-2 transition-colors hover:border-orange hover:text-orange"
                >
                  {{ instagram: "Instagram", facebook: "Facebook", tiktok: "TikTok" }[k]}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-orange-light">Explore</p>
            <ul className="space-y-2.5 text-[15px] text-cream/80">
              {[
                ["/menu", "Menu & Order"],
                ["/locations", "Locations"],
                ["/catering", "Catering"],
                ["/gallery", "Gallery"],
                ["/gift-cards", "Gift Cards"],
              ].map(([h, l]) => (
                <li key={h}>
                  <Link href={h} className="transition-colors hover:text-orange">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-orange-light">Find a table</p>
            <ul className="space-y-3 text-[15px] text-cream/80">
              {locations.map((l) => (
                <li key={l.slug} className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <Link href={`/locations/${l.slug}`} className="font-medium text-cream transition-colors hover:text-orange">
                    {l.name}
                  </Link>
                  <a href={`tel:${l.phoneRaw}`} className="text-cream/60 transition-colors hover:text-orange">
                    {l.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-cream/50 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Chicago Waffles. Concept demo — ordering, reservations and gift cards are not live.</p>
          <p>
            <a
              href="https://in-flu-ential.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-orange"
            >
              Designed by IN-FLU-ENTIAL
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
