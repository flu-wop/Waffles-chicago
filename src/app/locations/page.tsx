import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Headline, Reveal } from "@/components/motion";
import { OpenBadge } from "@/components/ui";
import { locations } from "@/lib/data";
import { hoursGroups } from "@/lib/hours";

export const metadata: Metadata = {
  title: "Locations",
  description: "Five Chicago Waffles locations: South Loop, West Loop, Lincoln Square, Oak Park and Willowbrook.",
};

export default function LocationsPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-12 pt-32 md:pt-40">
      <Headline as="h1" immediate text="Five *tables*, one welcome." className="max-w-4xl text-[3rem] font-semibold md:text-8xl" />
      <p className="mt-4 max-w-md text-lg text-brown-light">Find the one nearest you — or the one with the patio.</p>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {locations.map((l, i) => (
          <Reveal key={l.slug} delay={(i % 2) * 0.08}>
            <Link href={`/locations/${l.slug}`} className="group block overflow-hidden rounded-[2rem] bg-white shadow-soft transition-shadow hover:shadow-lift">
              <div className="relative aspect-[16/10] bg-butter">
                <Image
                  src={l.photos[0] ?? "/media/giftcard-front.webp"}
                  alt={l.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute left-4 top-4">
                  <OpenBadge loc={l} />
                </div>
              </div>
              <div className="p-6 md:p-7">
                <h2 className="text-3xl font-semibold">{l.name}</h2>
                <p className="mt-1 text-brown-light">{l.street}, {l.city}, {l.state} {l.zip}</p>
                <p className="mt-3 text-sm text-brown-light">{hoursGroups(l).map((h) => `${h.label} ${h.value}`).join(" · ")}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-orange">Details &amp; directions →</span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
