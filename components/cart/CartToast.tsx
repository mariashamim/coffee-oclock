'use client';

import { useCart } from '@/lib/cart';

// "Karak Latte added · View order" pill after each add.
export default function CartToast() {
  const { toast, openDrawer } = useCart();
  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-24 z-[95] flex justify-center px-4 sm:bottom-8"
    >
      {toast && (
        <div
          key={toast.id}
          className="toast-in pointer-events-auto flex max-w-full items-center gap-4 rounded-full bg-roast py-2 pl-5 pr-2 text-sm text-foam shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
        >
          <span className="truncate">{toast.message}</span>
          <button
            type="button"
            onClick={openDrawer}
            className="shrink-0 rounded-full bg-gold px-4 py-2 text-xs font-medium uppercase tracking-[0.15em] text-roast transition-colors hover:bg-foam"
          >
            View order
          </button>
        </div>
      )}
    </div>
  );
}
