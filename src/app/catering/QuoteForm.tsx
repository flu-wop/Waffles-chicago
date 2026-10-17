"use client";

import { useState } from "react";
import { ButtonBtn, Reassure } from "@/components/ui";
import { locations } from "@/lib/data";

const F = "mt-1 w-full rounded-xl border border-brown/15 bg-white px-4 py-3";

export default function QuoteForm() {
  const [done, setDone] = useState<string | null>(null);
  const today = new Date().toISOString().slice(0, 10);

  if (done) {
    return (
      <div className="mt-10 rounded-[2rem] bg-butter p-10 text-center">
        <p className="font-serif text-4xl italic text-orange">Got it, {done}.</p>
        <p className="mx-auto mt-3 max-w-sm text-brown-light">We&apos;ll be in touch about your event.</p>
        <p className="mt-6 text-xs text-brown-light">Demo only — this form doesn&apos;t send anything.</p>
      </div>
    );
  }

  return (
    <form
      className="mt-10 grid gap-4 sm:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        setDone(String(f.get("name") || "friend").split(" ")[0]);
      }}
    >
      <label className="text-sm font-medium">
        Name
        <input required name="name" autoComplete="name" className={F} />
      </label>
      <label className="text-sm font-medium">
        Email
        <input required type="email" name="email" autoComplete="email" className={F} />
      </label>
      <label className="text-sm font-medium">
        Phone
        <input type="tel" name="phone" autoComplete="tel" className={F} />
      </label>
      <label className="text-sm font-medium">
        Event date
        <input required type="date" name="date" min={today} className={F} />
      </label>
      <label className="text-sm font-medium">
        Guests
        <input required type="number" name="guests" min={1} defaultValue={15} className={F} />
      </label>
      <label className="text-sm font-medium">
        Pickup location
        <select name="loc" className={F}>
          {locations.map((l) => (
            <option key={l.slug} value={l.slug}>{l.name}</option>
          ))}
        </select>
      </label>
      <label className="text-sm font-medium sm:col-span-2">
        Anything we should know? <span className="text-brown/40">(dietary needs, timing, budget)</span>
        <textarea name="notes" rows={4} className={F} />
      </label>
      <div className="sm:col-span-2">
        <ButtonBtn type="submit">Request my quote</ButtonBtn>
        <Reassure>Tell us the date and headcount — that&apos;s all we need to start.</Reassure>
      </div>
    </form>
  );
}
