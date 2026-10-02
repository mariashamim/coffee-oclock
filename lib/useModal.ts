'use client';

import { useEffect, type RefObject } from 'react';

// Shared behaviour for the cart drawer and drink customizer: lock page scroll,
// close on Escape, move focus inside on open and hand it back on close.
export function useModal(open: boolean, onClose: () => void, focusRef: RefObject<HTMLElement>) {
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    const t = window.setTimeout(() => focusRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = overflow;
      window.removeEventListener('keydown', onKey);
      previous?.focus?.();
    };
  }, [open, onClose, focusRef]);
}
