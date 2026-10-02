'use client';

import { useCart } from '@/lib/cart';

// Navbar bag icon with a live item count.
export default function CartButton() {
  const { count, ready, openDrawer } = useCart();
  const label = count === 0 ? 'Your order is empty' : `Your order: ${count} ${count === 1 ? 'item' : 'items'}`;

  return (
    <button
      type="button"
      onClick={openDrawer}
      aria-label={label}
      className="relative flex h-11 w-11 items-center justify-center rounded-full border border-espresso/15 transition-colors hover:border-espresso/40"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M5 8h14l-1.2 11.1a2 2 0 0 1-2 1.9H8.2a2 2 0 0 1-2-1.9Z" strokeLinejoin="round" />
        <path d="M9 10V7a3 3 0 0 1 6 0v3" strokeLinecap="round" />
      </svg>
      {ready && count > 0 && (
        <span
          key={count}
          aria-hidden="true"
          className="bump absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-terracotta px-1 text-[10px] font-semibold text-cream"
        >
          {count}
        </span>
      )}
    </button>
  );
}
