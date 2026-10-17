import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Headline, Reveal } from "@/components/motion";
import { locations, mapsUrl } from "@/lib/data";
import LocationActions from "./LocationActions";
import { HoursTable } from "./HoursTable";

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const l = locations.find((x) => x.slug === slug);
  return { title: l ? `${l.name}` : "Location", description: l?.blurb };
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = locations.find((x) => x.slug === slug);
  if (!l) notFound();
  const hero = l.photos[0] ?? "/media/giftcard-front.webp";
  const rest = l.photos.slice(1, 5);
  const q = encodeURIComponent(`${l.street}, ${l.city}, ${l.state} ${l.zip}`);

  return (
    <>
      <section className="relative h-[70svh] min-h-[30rem] overflow-hidden bg-cocoa text-cream">
        <Image src={hero} alt={l.name} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-cocoa via-cocoa/30 to-cocoa/20" />
        <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-end px-6 pb-12 md:pb-16">
          <Link href="/locations" className="mb-4 text-sm font-semibold text-cream/70 hover:text-orange">← All locations</Link>
          <Headline as="h1" immediate text={l.name} className="text-[3.4rem] font-semibold md:text-9xl" />
          <p className="mt-3 text-lg text-cream/80">{l.street}, {l.city}, {l.state} {l.zip}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1.1fr_1fr] md:py-24">
        <div>
          <Reveal>
            <p className="max-w-lg text-xl leading-relaxed text-brown-light">{l.blurb}</p>
            <LocationActions slug={l.slug} phone={l.phone} phoneRaw={l.phoneRaw} maps={mapsUrl(l)} />
          </Reveal>
          {l.menu === "willowbrook" && (
            <Reveal delay={0.1}>
              <p className="mt-8 rounded-[1.25rem] bg-butter p-5 text-sm text-brown-light">
                Heads up: Willowbrook has its own menu and pricing, separate from our Chicago and Oak Park locations.
              </p>
            </Reveal>
          )}
        </div>
        <Reveal delay={0.1}>
          <HoursTable loc={l} />
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-8">
        <div className="overflow-hidden rounded-[2rem] shadow-soft">
          <iframe
            title={`Map of ${l.name}`}
            src={`https://www.google.com/maps?q=${q}&output=embed`}
            loading="lazy"
            className="h-80 w-full border-0 md:h-[26rem]"
          />
        </div>
      </section>

      {rest.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {rest.map((p) => (
              <div key={p} className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-butter">
                <Image src={p} alt={`${l.name} interior`} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
