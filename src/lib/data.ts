import menusJson from "@/data/menus.json";
import locationsJson from "@/data/locations.json";
import galleryJson from "@/data/gallery.json";

export type MenuItem = {
  id: string;
  name: string;
  price: number | null;
  description: string;
  image: string | null;
  gf: boolean;
};
export type MenuSection = { id: string; name: string; items: MenuItem[] };
export type MenuKey = "standard" | "willowbrook";

export type Hours = Record<string, [string, string] | null>;
export type Location = {
  slug: string;
  name: string;
  blurb: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  phoneRaw: string;
  lat: number;
  lng: number;
  hours: Hours;
  menu: MenuKey;
  photos: string[];
};

export type GalleryItem = {
  alt: string;
  src: string;
  w: number;
  h: number;
  kind: "food" | "place";
  place: string | null;
};

export const menus = menusJson as unknown as Record<MenuKey, MenuSection[]>;
export const locations = locationsJson as unknown as Location[];
export const gallery = galleryJson as unknown as GalleryItem[];

export const DEFAULT_LOCATION = "south-loop";

export function getLocation(slug: string): Location {
  return locations.find((l) => l.slug === slug) ?? locations[0];
}

export function galleryBy(prefix: string): GalleryItem {
  const p = prefix.toLowerCase();
  return (
    gallery.find((g) => g.alt.toLowerCase().replace(/[’']/g, "'").startsWith(p)) ??
    gallery[0]
  );
}

export function findItem(key: MenuKey, id: string): MenuItem | undefined {
  for (const s of menus[key]) {
    const f = s.items.find((i) => i.id === id);
    if (f) return f;
  }
  return undefined;
}

export const SIGNATURE_IDS = [
  "signature-waffles-chicago-s-waffles-best",
  "signature-waffles-dubai-chocolate-dream-waffle",
  "signature-waffles-blueberry-compote-chicken-waffle",
  "pancakes-french-toast-very-berry-french-toast",
  "signature-waffles-blueberry-lemon-cheesecake-waffle",
  "pancakes-french-toast-nutella-pancakes",
  "hola-breakfast-buenos-d-as-burrito",
  "signature-waffles-waffle-flight",
];

export const SOCIAL = {
  instagram: "https://www.instagram.com/chicagowaffles/",
  facebook: "https://www.facebook.com/chicagowaffles/",
  tiktok: "https://www.tiktok.com/@chicago_waffles",
};

export const CATERING_PHONE = "(312) 877-1560";
export const CATERING_PHONE_RAW = "3128771560";

export function money(n: number | null | undefined): string {
  if (n == null) return "";
  return n % 1 === 0 ? `$${n.toFixed(0)}` : `$${n.toFixed(2)}`;
}

export function money2(n: number): string {
  return `$${n.toFixed(2)}`;
}

export function mapsUrl(l: Location): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${l.street}, ${l.city}, ${l.state} ${l.zip}`
  )}`;
}

// Gallery photo titles that differ from the menu's item names.
const PHOTO_ALIASES: Record<string, string> = {
  "paco taco": "Paco Tacos",
  "red velvet bliss waffle": "Red Velvet Double Chocolate Waffle",
  "cheddar & short rib waffle": "Braised Beef & Cheddar Waffle",
  "chicago waffle's best": "Chicago Waffles Best",
  "nutella dream pancakes": "Nutella Pancakes",
};
const normName = (s: string) =>
  s.toLowerCase().replace(/[’']/g, "").replace(/\s+/g, " ").trim();

/** The orderable menu item for a food photo, if that dish is on the given menu. */
export function menuItemForPhoto(alt: string, key: MenuKey): MenuItem | undefined {
  const a = normName(PHOTO_ALIASES[alt.toLowerCase().replace(/’/g, "'")] ?? alt);
  for (const s of menus[key]) {
    const f = s.items.find((i) => normName(i.name) === a && i.price != null);
    if (f) return f;
  }
  return undefined;
}
