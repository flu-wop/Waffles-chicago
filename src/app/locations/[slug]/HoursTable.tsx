"use client";

import { useEffect, useState } from "react";
import { OpenBadge } from "@/components/ui";
import { chicagoNow, DAYS, fmtTime } from "@/lib/hours";
import type { Location } from "@/lib/data";
import { cn } from "@/lib/cn";

export function HoursTable({ loc }: { loc: Location }) {
  const [today, setToday] = useState<string | null>(null);
  useEffect(() => setToday(chicagoNow().day), []);
  return (
    <div className="rounded-[2rem] bg-white p-7 shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold">Hours</h2>
        <OpenBadge loc={loc} className="!bg-butter" />
      </div>
      <ul className="mt-5 divide-y divide-brown/10">
        {DAYS.map((d) => {
          const h = loc.hours[d];
          return (
            <li key={d} className={cn("flex justify-between py-3 text-[15px]", today === d && "font-semibold text-orange")}>
              <span>{d}</span>
              <span>{h ? `${fmtTime(h[0])} – ${fmtTime(h[1])}` : "Closed"}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
