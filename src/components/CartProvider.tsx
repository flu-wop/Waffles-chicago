"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_LOCATION,
  getLocation,
  type Location,
  type MenuItem,
  type MenuKey,
} from "@/lib/data";

export type CartLine = {
  id: string;
  name: string;
  price: number;
  image: string | null;
  qty: number;
};

type Ctx = {
  ready: boolean;
  location: Location;
  menuKey: MenuKey;
  setLocation: (slug: string) => void;
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (item: MenuItem) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  clear: () => void;
  qtyOf: (id: string) => number;
  drawerOpen: boolean;
  setDrawerOpen: (v: boolean) => void;
  reserveOpen: boolean;
  setReserveOpen: (v: boolean) => void;
  toast: string | null;
  notify: (msg: string) => void;
};

const CartCtx = createContext<Ctx | null>(null);
const KEY = "cw_demo_cart_v1";

export function useCart(): Ctx {
  const c = useContext(CartCtx);
  if (!c) throw new Error("useCart outside provider");
  return c;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [locSlug, setLocSlug] = useState(DEFAULT_LOCATION);
  const [lines, setLines] = useState<CartLine[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [reserveOpen, setReserveOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const notify = useCallback((msg: string) => {
    setToast(msg);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const p = JSON.parse(raw);
        if (p.loc) setLocSlug(p.loc);
        if (Array.isArray(p.lines)) setLines(p.lines);
      }
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify({ loc: locSlug, lines }));
    } catch {}
  }, [ready, locSlug, lines]);

  const location = getLocation(locSlug);

  const setLocation = useCallback(
    (slug: string) => {
      const next = getLocation(slug);
      const cur = getLocation(locSlug);
      if (next.slug === cur.slug) return;
      if (lines.length > 0 && next.menu !== cur.menu) {
        setLines([]);
        notify(`Switched to ${next.name} — its menu differs, so your order was cleared.`);
      }
      setLocSlug(next.slug);
    },
    [locSlug, lines.length, notify]
  );

  const add = useCallback(
    (item: MenuItem) => {
      if (item.price == null) return;
      setLines((prev) => {
        const f = prev.find((l) => l.id === item.id);
        if (f) return prev.map((l) => (l.id === item.id ? { ...l, qty: l.qty + 1 } : l));
        return [
          ...prev,
          { id: item.id, name: item.name, price: item.price!, image: item.image, qty: 1 },
        ];
      });
      notify(`Added ${item.name}`);
    },
    [notify]
  );

  const inc = useCallback(
    (id: string) => setLines((p) => p.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l))),
    []
  );
  const dec = useCallback(
    (id: string) =>
      setLines((p) =>
        p.flatMap((l) => (l.id === id ? (l.qty > 1 ? [{ ...l, qty: l.qty - 1 }] : []) : [l]))
      ),
    []
  );
  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<Ctx>(() => {
    const count = lines.reduce((a, l) => a + l.qty, 0);
    const subtotal = lines.reduce((a, l) => a + l.qty * l.price, 0);
    return {
      ready,
      location,
      menuKey: location.menu,
      setLocation,
      lines,
      count,
      subtotal,
      add,
      inc,
      dec,
      clear,
      qtyOf: (id) => lines.find((l) => l.id === id)?.qty ?? 0,
      drawerOpen,
      setDrawerOpen,
      reserveOpen,
      setReserveOpen,
      toast,
      notify,
    };
  }, [ready, location, setLocation, lines, add, inc, dec, clear, drawerOpen, reserveOpen, toast, notify]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}
