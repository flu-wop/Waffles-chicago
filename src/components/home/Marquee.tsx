import { WaffleIcon } from "../ui";

const WORDS = [
  "Waffles",
  "Pancakes",
  "French Toast",
  "Skillets",
  "Chilaquiles",
  "Benedicts",
  "Crepes",
  "Omelets",
  "Lattes",
  "Mimosas",
  "Smoothies",
  "Grits Bowls",
];

export default function Marquee() {
  const row = [...WORDS, ...WORDS];
  return (
    <div className="relative z-10 -my-4 -rotate-1 scale-[1.03] overflow-hidden bg-brown py-5 text-cream md:py-6">
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap hover:[animation-play-state:paused]">
        {[...row, ...row].map((w, i) => (
          <span key={i} className="flex items-center gap-10 text-2xl font-semibold tracking-tight md:text-4xl">
            {w}
            <WaffleIcon className="h-6 w-6 text-orange md:h-8 md:w-8" />
          </span>
        ))}
      </div>
    </div>
  );
}
