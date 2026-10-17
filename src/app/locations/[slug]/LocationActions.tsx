"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { Magnetic } from "@/components/motion";

export default function LocationActions({
  slug,
  phone,
  phoneRaw,
  maps,
}: {
  slug: string;
  phone: string;
  phoneRaw: string;
  maps: string;
}) {
  const { setLocation, setReserveOpen } = useCart();
  return (
    <div className="mt-8">
      <div className="flex flex-wrap gap-3">
        <Magnetic>
          <Link
            href="/menu"
            onClick={() => setLocation(slug)}
            className="inline-flex rounded-full bg-orange px-7 py-4 text-[15px] font-semibold text-white shadow-lift transition-colors hover:bg-orange-deep"
          >
            Order from here
          </Link>
        </Magnetic>
        <button
          onClick={() => {
            setLocation(slug);
            setReserveOpen(true);
          }}
          className="rounded-full border-2 border-brown/20 px-7 py-[14px] text-[15px] font-semibold transition-colors hover:border-orange hover:text-orange"
        >
          Reserve a table
        </button>
        <a
          href={maps}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border-2 border-brown/20 px-7 py-[14px] text-[15px] font-semibold transition-colors hover:border-orange hover:text-orange"
        >
          Directions
        </a>
      </div>
      <p className="mt-4 text-brown-light">
        Call us: <a href={`tel:${phoneRaw}`} className="font-semibold text-brown hover:text-orange">{phone}</a>
      </p>
    </div>
  );
}
