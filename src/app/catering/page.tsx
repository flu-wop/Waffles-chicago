import type { Metadata } from "next";
import Image from "next/image";
import { Headline, Reveal } from "@/components/motion";
import { ButtonLink, Drip, Eyebrow } from "@/components/ui";
import { CATERING_PHONE, CATERING_PHONE_RAW, galleryBy } from "@/lib/data";
import QuoteForm from "./QuoteForm";

export const metadata: Metadata = {
  title: "Catering",
  description: "Breakfast catering in Chicago — packages serve 15, pickup seven days a week at any location.",
};

const WHY = [
  ["Expert team", "Professional staff dedicated to making your event seamless and memorable."],
  ["Custom menus", "Personalized menu options tailored to your preferences and dietary needs."],
  ["Flexible timing", "We work around your schedule for breakfast, lunch, dinner, or all-day events."],
  ["Quality ingredients", "Fresh, locally sourced ingredients prepared with care and expertise."],
  ["Licensed & insured", "Complete peace of mind with our professional licensing and insurance."],
  ["Passion for service", "We treat every event like our own, ensuring exceptional experiences."],
];

const STEPS = [
  ["Get in touch", "Contact us with your event details, date, guest count, and preferences."],
  ["Customize your menu", "Work with our team to create a personalized menu perfect for your event."],
  ["We prepare everything", "Our expert chefs prepare fresh, delicious food using quality ingredients."],
  ["Enjoy your event", "Relax and enjoy while we handle all the food service and cleanup."],
];

export default function CateringPage() {
  const a = galleryBy("Waffle Flight");
  const b = galleryBy("Cheddar");
  const c = galleryBy("Biscuits");
  return (
    <>
      <section className="relative overflow-hidden bg-brown pb-24 pt-32 text-cream md:pb-36 md:pt-44">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-[1.1fr_1fr]">
          <div>
            <Eyebrow light>Breakfast catering</Eyebrow>
            <Headline as="h1" immediate text="Feed the whole *room*." className="mt-3 text-[3rem] font-semibold md:text-8xl" />
            <p className="mt-6 max-w-md text-lg leading-relaxed text-cream/80">
              Perfect breakfast catering for your events. All packages serve 15 people with fresh, delicious options. Pick-up available seven days a week at any location.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="#quote" variant="orange">Get a quote</ButtonLink>
              <a href={`tel:${CATERING_PHONE_RAW}`} className="inline-flex items-center rounded-full border border-white/25 px-7 py-4 text-[15px] font-semibold transition-colors hover:border-orange hover:text-orange">
                Call {CATERING_PHONE}
              </a>
            </div>
            <p className="mt-3 text-sm text-cream/60">Need it delivered? Call us or order online — pickup is handled directly.</p>
          </div>
          <div className="relative mx-auto h-[26rem] w-full max-w-md md:h-[32rem]">
            <div className="absolute right-0 top-0 h-[17rem] w-[13rem] rotate-3 overflow-hidden rounded-[1.75rem] shadow-lift md:h-[22rem] md:w-[17rem]">
              <Image src={a.src} alt={a.alt} fill sizes="18rem" className="object-cover" />
            </div>
            <div className="absolute bottom-0 left-0 h-[13rem] w-[17rem] -rotate-3 overflow-hidden rounded-[1.75rem] shadow-lift md:h-[17rem] md:w-[22rem]">
              <Image src={b.src} alt={b.alt} fill sizes="22rem" className="object-cover" />
            </div>
            <div className="absolute bottom-6 right-2 h-28 w-28 overflow-hidden rounded-full shadow-lift md:h-36 md:w-36">
              <Image src={c.src} alt={c.alt} fill sizes="10rem" className="object-cover" />
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 rotate-180">
          <Drip color="#FFF8EF" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <dl className="grid grid-cols-3 gap-4 text-center">
          {[["7", "Days a week"], ["365", "Days a year"], ["5", "Locations"]].map(([n, l]) => (
            <Reveal key={l}>
              <dt className="text-5xl font-semibold text-orange md:text-8xl">{n}</dt>
              <dd className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-brown-light md:text-sm">{l}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20 md:pb-28">
        <Eyebrow>Why us</Eyebrow>
        <Headline text="What makes the morning *different*." className="mt-3 max-w-2xl text-[2.4rem] font-semibold md:text-6xl" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY.map(([t, d], i) => (
            <Reveal key={t} delay={(i % 3) * 0.06}>
              <div className="h-full rounded-[1.5rem] bg-white p-7 shadow-soft">
                <span className="font-serif text-2xl italic text-orange">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-xl font-semibold">{t}</h3>
                <p className="mt-2 text-brown-light">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-butter py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Eyebrow>Simple process</Eyebrow>
          <Headline text="Four steps. Zero *stress*." className="mt-3 text-[2.4rem] font-semibold md:text-6xl" />
          <ol className="mt-12 grid gap-8 md:grid-cols-4">
            {STEPS.map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.08}>
                <li className="list-none">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-orange text-lg font-bold text-white">{i + 1}</span>
                  <h3 className="mt-4 text-xl font-semibold">{t}</h3>
                  <p className="mt-2 text-brown-light">{d}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section id="quote" className="mx-auto max-w-3xl scroll-mt-24 px-6 py-20 md:py-28">
        <Eyebrow>Get a quote</Eyebrow>
        <Headline text="Tell us about your *event*." className="mt-3 text-[2.4rem] font-semibold md:text-6xl" />
        <QuoteForm />
      </section>
    </>
  );
}
