'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { describeOptions, MAX_QTY, unitPrice, useCart } from '@/lib/cart';
import { findItem, formatPKR } from '@/lib/menu';
import { useModal } from '@/lib/useModal';
import QtyStepper from './QtyStepper';

export default function CartDrawer() {
  const { drawerOpen, closeDrawer, lines, count, subtotal, setQty, remove } = useCart();
  const closeRef = useRef<HTMLButtonElement>(null);
  useModal(drawerOpen, closeDrawer, closeRef);

  return (
    <div
      // Visibility flips instantly on open, and only after the slide-out on close.
      className={`fixed inset-0 z-[100] ${drawerOpen ? 'visible' : 'pointer-events-none invisible transition-[visibility] delay-500'}`}
      aria-hidden={!drawerOpen}
    >
      <div
        onClick={closeDrawer}
        className={`absolute inset-0 bg-roast/50 backdrop-blur-sm transition-opacity duration-500 ${
          drawerOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <header className="flex items-center justify-between border-b border-espresso/10 px-6 py-5">
          <div>
            <h2 id="cart-title" className="font-serif text-2xl">
              Your order
            </h2>
            <p className="mt-0.5 text-sm text-espresso/60">
              {count === 0 ? 'Nothing here yet' : `${count} ${count === 1 ? 'item' : 'items'}`}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={closeDrawer}
            aria-label="Close your order"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-espresso/15 transition-colors hover:border-espresso"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <svg viewBox="0 0 64 64" className="h-16 w-16 text-espresso/30" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
              <path d="M12 22h34v18a10 10 0 0 1-10 10H22a10 10 0 0 1-10-10Z" strokeLinejoin="round" />
              <path d="M46 27h3a6 6 0 0 1 0 12h-3M8 56h44" strokeLinecap="round" />
            </svg>
            <p className="mt-6 font-serif text-2xl">Your cup is empty.</p>
            <p className="mt-2 text-sm text-espresso/60">Pick something from the menu and it’ll show up here.</p>
            <Link href="/menu" onClick={closeDrawer} className="btn-primary mt-8">
              Browse the menu
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-espresso/10 overflow-y-auto px-6">
              {lines.map((line) => {
                const item = findItem(line.itemId);
                if (!item) return null;
                const price = unitPrice(line);
                const options = describeOptions(line.options);
                return (
                  <li key={line.key} className="py-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="font-serif text-lg leading-snug">{item.name}</p>
                        {options && <p className="mt-1 text-xs text-espresso/60">{options}</p>}
                        <p className="mt-1 text-xs text-espresso/50">{formatPKR(price)} each</p>
                      </div>
                      <p className="shrink-0 text-sm font-medium">{formatPKR(price * line.qty)}</p>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <QtyStepper
                        value={line.qty}
                        max={MAX_QTY}
                        min={0}
                        label={item.name}
                        onChange={(q) => setQty(line.key, q)}
                      />
                      <button
                        type="button"
                        onClick={() => remove(line.key)}
                        className="text-xs uppercase tracking-[0.15em] text-espresso/50 transition-colors hover:text-terracotta"
                      >
                        Remove<span className="sr-only"> {item.name}</span>
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

            <footer className="border-t border-espresso/10 px-6 py-6">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-espresso/70">Subtotal</span>
                <span className="font-serif text-2xl">{formatPKR(subtotal)}</span>
              </div>
              <p className="mt-1 text-xs text-espresso/50">Delivery fee, if any, is added at checkout.</p>
              <Link href="/checkout" onClick={closeDrawer} className="btn-primary mt-5 w-full">
                Go to checkout
              </Link>
              <button
                type="button"
                onClick={closeDrawer}
                className="mt-3 w-full py-2 text-xs font-medium uppercase tracking-[0.18em] text-espresso/60 transition-colors hover:text-espresso"
              >
                Keep browsing
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
