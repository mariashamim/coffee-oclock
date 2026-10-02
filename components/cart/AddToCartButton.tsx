'use client';

import type { ReactNode } from 'react';
import { useCart } from '@/lib/cart';
import { findItem, slugify } from '@/lib/menu';

type AddToCartButtonProps = {
  itemName: string; // must match a name in lib/menu.ts
  variant?: 'icon' | 'overlay' | 'custom';
  className?: string;
  children?: ReactNode;
};

// One button, three looks: a round "+" (menu list), an invisible card overlay
// (home page drink cards) or any custom styling (e.g. the clock's "Order this").
export default function AddToCartButton({ itemName, variant = 'icon', className = '', children }: AddToCartButtonProps) {
  const { startAdd, qtyOf, ready } = useCart();
  const item = findItem(slugify(itemName));
  if (!item) return null;

  const qty = ready ? qtyOf(item.id) : 0;
  const label = `Add ${item.name} to your order${qty ? ` (${qty} already in it)` : ''}`;
  const onClick = () => startAdd(item.id);

  if (variant === 'overlay') {
    return (
      <button
        type="button"
        onClick={onClick}
        data-cursor="Add"
        aria-label={label}
        className="group/add absolute inset-0 z-[2] focus-visible:ring-inset"
      >
        <span className="absolute bottom-4 right-4 rounded-full bg-cream px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-espresso opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 group-focus-visible/add:opacity-100 [@media(hover:none)]:opacity-100">
          + Add{qty ? ` · ${qty}` : ''}
        </span>
      </button>
    );
  }

  if (variant === 'custom') {
    return (
      <button type="button" onClick={onClick} aria-label={label} className={className}>
        {children}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-espresso/20 transition-colors hover:border-terracotta hover:bg-terracotta hover:text-cream ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M12 5v14M5 12h14" strokeLinecap="round" />
      </svg>
      {qty > 0 && (
        <span
          key={qty}
          aria-hidden="true"
          className="bump absolute -right-1.5 -top-1.5 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-terracotta px-1 text-[9px] font-semibold text-cream"
        >
          {qty}
        </span>
      )}
    </button>
  );
}
