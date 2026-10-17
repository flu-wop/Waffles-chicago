import type { Location } from "./data";

export const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export function fmtTime(t: string): string {
  const [h, m] = t.split(":").map(Number);
  const ap = h >= 12 ? "PM" : "AM";
  const hh = h % 12 === 0 ? 12 : h % 12;
  return m ? `${hh}:${String(m).padStart(2, "0")} ${ap}` : `${hh} ${ap}`;
}

export function chicagoNow(date = new Date()): { day: (typeof DAYS)[number]; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(date);
  const day = parts.find((p) => p.type === "weekday")!.value as (typeof DAYS)[number];
  const h = Number(parts.find((p) => p.type === "hour")!.value) % 24;
  const m = Number(parts.find((p) => p.type === "minute")!.value);
  return { day, minutes: h * 60 + m };
}

function toMin(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

export type Status = { open: boolean; label: string; short: string };

export function openStatus(loc: Location, date = new Date()): Status {
  const { day, minutes } = chicagoNow(date);
  const today = loc.hours[day];
  const idx = DAYS.indexOf(day);
  if (today) {
    const o = toMin(today[0]);
    const c = toMin(today[1]);
    if (minutes >= o && minutes < c) {
      return { open: true, label: `Open now · until ${fmtTime(today[1])}`, short: "Open now" };
    }
    if (minutes < o) {
      return { open: false, label: `Opens today at ${fmtTime(today[0])}`, short: "Opens soon" };
    }
  }
  for (let i = 1; i <= 7; i++) {
    const nd = DAYS[(idx + i) % 7];
    const h = loc.hours[nd];
    if (h) {
      return {
        open: false,
        label: `Closed · opens ${i === 1 ? "tomorrow" : nd} at ${fmtTime(h[0])}`,
        short: "Closed",
      };
    }
  }
  return { open: false, label: "Closed", short: "Closed" };
}

// Compress consecutive days that share hours: "Mon–Fri 7 AM – 2 PM"
export function hoursGroups(loc: Location): { label: string; value: string }[] {
  const out: { days: string[]; value: string }[] = [];
  for (const d of DAYS) {
    const h = loc.hours[d];
    const v = h ? `${fmtTime(h[0])} – ${fmtTime(h[1])}` : "Closed";
    const last = out[out.length - 1];
    if (last && last.value === v) last.days.push(d);
    else out.push({ days: [d], value: v });
  }
  return out.map((g) => ({
    label:
      g.days.length === 1
        ? g.days[0].slice(0, 3)
        : `${g.days[0].slice(0, 3)}–${g.days[g.days.length - 1].slice(0, 3)}`,
    value: g.value,
  }));
}
