'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { extraOptions, findItem, milkOptions, sizeOptions } from './menu';

export type LineOptions = { size: string; milk: string; extras: string[] };
export type CartLine = { key: string; itemId: string; qty: number; options?: LineOptions };

const STORAGE_KEY = 'coffee-oclock-cart';
export const MAX_QTY = 20;

// Same drink with the same choices stacks into one line; different choices get their own line.
const lineKey = (itemId: string, o?: LineOptions) =>
  o ? `${itemId}|${o.size}|${o.milk}|${[...o.extras].sort().join(',')}` : itemId;

const optionPrice = (list: { id: string; price: number }[], id: string) =>
  list.find((x) => x.id === id)?.price ?? 0;

// Prices are always looked up from the menu, never stored, so a saved cart can't go stale.
export function unitPrice(line: { itemId: string; options?: LineOptions }) {
  const item = findItem(line.itemId);
  if (!item) return 0;
  const o = line.options;
  if (!o) return item.price;
  return (
    item.price +
    optionPrice(sizeOptions, o.size) +
    optionPrice(milkOptions, o.milk) +
    o.extras.reduce((n, id) => n + optionPrice(extraOptions, id), 0)
  );
}

// "Large · Oat milk · Extra shot" (defaults like Regular / Whole milk are left out).
export function describeOptions(o?: LineOptions) {
  if (!o) return '';
  const parts: string[] = [];
  const size = sizeOptions.find((s) => s.id === o.size);
  if (size?.price) parts.push(size.label);
  const milk = milkOptions.find((m) => m.id === o.milk);
  if (milk?.price) parts.push(milk.label);
  o.extras.forEach((id) => {
    const e = extraOptions.find((x) => x.id === id);
    if (e) parts.push(e.label);
  });
  return parts.join(' · ');
}

type Toast = { id: number; message: string } | null;

type CartContextValue = {
  lines: CartLine[];
  ready: boolean; // false until the saved cart has loaded from localStorage
  count: number;
  subtotal: number;
  add: (itemId: string, qty?: number, options?: LineOptions) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  qtyOf: (itemId: string) => number;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  customizing: string | null; // item id shown in the drink customizer
  startAdd: (itemId: string) => void;
  closeCustomizer: () => void;
  toast: Toast;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [customizing, setCustomizing] = useState<string | null>(null);
  const [toast, setToast] = useState<Toast>(null);
  const toastId = useRef(0);

  // Load the saved cart once, dropping anything no longer on the menu.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as CartLine[];
      if (Array.isArray(saved)) setLines(saved.filter((l) => findItem(l.itemId) && l.qty > 0));
    } catch {
      /* Corrupt or blocked storage: start with an empty cart. */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* Private mode: the cart just won't survive a reload. */
    }
  }, [lines, ready]);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(t);
  }, [toast]);

  const showToast = useCallback((message: string) => {
    toastId.current += 1;
    setToast({ id: toastId.current, message });
  }, []);

  const add = useCallback(
    (itemId: string, qty = 1, options?: LineOptions) => {
      const item = findItem(itemId);
      if (!item) return;
      const key = lineKey(itemId, options);
      setLines((prev) => {
        const existing = prev.find((l) => l.key === key);
        if (existing) {
          return prev.map((l) => (l.key === key ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l));
        }
        return [...prev, { key, itemId, qty: Math.min(MAX_QTY, qty), options }];
      });
      showToast(qty > 1 ? `${qty} × ${item.name} added` : `${item.name} added`);
    },
    [showToast],
  );

  const setQty = useCallback((key: string, qty: number) => {
    setLines((prev) =>
      qty <= 0 ? prev.filter((l) => l.key !== key) : prev.map((l) => (l.key === key ? { ...l, qty: Math.min(MAX_QTY, qty) } : l)),
    );
  }, []);

  const remove = useCallback((key: string) => setLines((prev) => prev.filter((l) => l.key !== key)), []);
  const clear = useCallback(() => setLines([]), []);

  const startAdd = useCallback(
    (itemId: string) => {
      const item = findItem(itemId);
      if (!item) return;
      if (item.customizable) setCustomizing(itemId);
      else add(itemId, 1);
    },
    [add],
  );

  // Stable handlers: useModal re-runs (and refocuses) whenever its onClose changes.
  const openDrawer = useCallback(() => {
    setToast(null);
    setDrawerOpen(true);
  }, []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  const closeCustomizer = useCallback(() => setCustomizing(null), []);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = lines.reduce((n, l) => n + unitPrice(l) * l.qty, 0);
    return {
      lines,
      ready,
      count,
      subtotal,
      add,
      setQty,
      remove,
      clear,
      qtyOf: (itemId) => lines.filter((l) => l.itemId === itemId).reduce((n, l) => n + l.qty, 0),
      drawerOpen,
      openDrawer,
      closeDrawer,
      customizing,
      startAdd,
      closeCustomizer,
      toast,
    };
  }, [lines, ready, add, setQty, remove, clear, drawerOpen, openDrawer, closeDrawer, customizing, startAdd, closeCustomizer, toast]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
