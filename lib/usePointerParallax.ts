'use client';

import { useEffect, type RefObject } from 'react';
import { useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

const clamp = (v: number) => Math.max(-0.5, Math.min(0.5, v));

// Tracks the mouse relative to an element, as springy values from -0.5 to 0.5.
// Values ease back to 0 when the cursor leaves the element's vertical band.
export function usePointerParallax(ref: RefObject<HTMLElement>) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 50, damping: 18, mass: 0.8 });
  const sy = useSpring(y, { stiffness: 50, damping: 18, mass: 0.8 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      const el = ref.current;
      if (e.pointerType !== 'mouse' || !el) return;
      const r = el.getBoundingClientRect();
      if (e.clientY < r.top || e.clientY > r.bottom) {
        x.set(0);
        y.set(0);
        return;
      }
      x.set(clamp((e.clientX - r.left) / r.width - 0.5));
      y.set(clamp((e.clientY - r.top) / r.height - 0.5));
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduce, ref, x, y]);

  return { x: sx, y: sy };
}
