"use client";

import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const R = 40;
const rad = (d: number) => (d * Math.PI) / 180;
const pt = (a: number, r = R) => `${(60 + r * Math.cos(rad(a))).toFixed(2)},${(60 + r * Math.sin(rad(a))).toFixed(2)}`;
const A1 = -142;
const A2 = -38;
const WEDGE = `M60,60 L${pt(A1)} A${R},${R} 0 0 1 ${pt(A2)} Z`;
const GRID = [-30, -15, 0, 15, 30, 45, 60, 75, 90]; // diagonal offsets, clipped to the wedge
const CRUMBS: [number, number, number][] = [
  [58, 22, 1.4],
  [66, 17, 1],
  [49, 19, 0.9],
];

/** One waffle wedge: golden cake, brown outline, pressed grid. */
function Wedge({ id }: { id: string }) {
  return (
    <g transform="translate(0,-9)">
      <defs>
        <clipPath id={id}>
          <path d={WEDGE} />
        </clipPath>
      </defs>
      <path d={WEDGE} fill="#F6BB45" />
      <g clipPath={`url(#${id})`} stroke="#E08A1E" strokeWidth="2.4" strokeLinecap="round" opacity="0.95">
        {GRID.map((o) => (
          <g key={o}>
            <line x1={20 + o} y1={10} x2={100 + o} y2={90} />
            <line x1={100 - o} y1={10} x2={20 - o} y2={90} />
          </g>
        ))}
      </g>
      <path d={`M60,60 L${pt(A1, R - 5)} A${R - 5},${R - 5} 0 0 1 ${pt(A2, R - 5)} Z`} fill="none" stroke="#FFD98A" strokeWidth="1.2" opacity="0.7" />
      <path d={WEDGE} fill="none" stroke="#5A2E12" strokeWidth="2.6" strokeLinejoin="round" />
    </g>
  );
}

export function WaffleSpinner({ size = 120 }: { size?: number }) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" role="img" aria-label="Loading">
      <g className="cw-spin" style={{ transformOrigin: "60px 60px" }}>
        {[0, 120, 240].map((rot) => (
          <g key={rot} transform={`rotate(${rot} 60 60)`}>
            <g className="cw-pulse" style={{ transformOrigin: "60px 60px", animationDelay: `${rot / 360 * 0.4}s` }}>
              <Wedge id={`w${uid}${rot}`} />
            </g>
          </g>
        ))}
        {CRUMBS.map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="#F6BB45" stroke="#5A2E12" strokeWidth="0.8" />
        ))}
      </g>
    </svg>
  );
}

const SEEN = "cw_loader_seen";

/** First-visit splash: spinning waffle wedges, then a soft wipe away. */
export default function Loader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN) === "1";
    } catch {}
    if (seen) {
      setShow(false);
      return;
    }
    document.documentElement.classList.add("cw-loading");
    const t = setTimeout(() => {
      try {
        sessionStorage.setItem(SEEN, "1");
      } catch {}
      setShow(false);
    }, 1700);
    return () => {
      clearTimeout(t);
      document.documentElement.classList.remove("cw-loading");
    };
  }, []);

  useEffect(() => {
    if (!show) document.documentElement.classList.remove("cw-loading");
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.55, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <WaffleSpinner size={132} />
          <p className="mt-6 font-serif text-lg italic text-brown/60">Warming the iron…</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
