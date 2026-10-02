'use client';

import { useEffect, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';

type Variant = 'default' | 'link' | 'label' | 'text';

const palette = {
  light: { accent: '#B4532A', fill: '#2B1B12', ink: '#FAF6F0' },
  dark: { accent: '#C9A227', fill: '#C9A227', ink: '#2B1B12' },
};

// A dot that tracks the mouse exactly, plus a ring that trails behind it.
// The ring grows over links and shows a label over anything with data-cursor="…".
// Only runs on devices with a precise pointer, and never with reduced motion.
export default function CustomCursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [variant, setVariant] = useState<Variant>('default');
  const [label, setLabel] = useState('');
  const [dark, setDark] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 380, damping: 32, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 380, damping: 32, mass: 0.6 });

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    setEnabled(true);
    const root = document.documentElement;
    root.classList.add('has-custom-cursor');

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const t = e.target instanceof Element ? e.target : null;
      const labelled = t?.closest<HTMLElement>('[data-cursor]');
      if (t?.closest('input, textarea, select')) {
        setVariant('text');
      } else if (labelled) {
        setVariant('label');
        setLabel(labelled.dataset.cursor ?? '');
      } else if (t?.closest('a, button, [role="button"], label')) {
        setVariant('link');
      } else {
        setVariant('default');
      }
      setDark(Boolean(t?.closest('[data-theme="dark"]')) || root.dataset.brew === 'dark');
    };
    // Leaving the window (or entering an iframe like the map) hides the cursor.
    const onOut = (e: MouseEvent) => {
      if (!e.relatedTarget) setVisible(false);
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mouseout', onOut);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    return () => {
      root.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseout', onOut);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
    };
  }, [reduce, x, y]);

  if (!enabled) return null;

  const c = dark ? palette.dark : palette.light;
  const ring = {
    default: { size: 36, bg: 'rgba(0,0,0,0)', border: c.accent },
    link: { size: 64, bg: dark ? 'rgba(201,162,39,0.12)' : 'rgba(180,83,42,0.1)', border: c.accent },
    label: { size: 92, bg: c.fill, border: c.fill },
    text: { size: 36, bg: 'rgba(0,0,0,0)', border: c.accent },
  }[variant];

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[200]">
      <motion.div className="absolute left-0 top-0" style={{ x: ringX, y: ringY }}>
        <motion.div
          className="flex items-center justify-center rounded-full border"
          style={{ x: '-50%', y: '-50%' }}
          initial={false}
          animate={{
            width: ring.size,
            height: ring.size,
            backgroundColor: ring.bg,
            borderColor: ring.border,
            opacity: visible && variant !== 'text' ? (variant === 'default' ? 0.6 : 1) : 0,
            scale: pressed ? 0.85 : 1,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 26 }}
        >
          <AnimatePresence>
            {variant === 'label' && (
              <motion.span
                key={label}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.2 }}
                className="text-[11px] font-medium uppercase tracking-[0.2em]"
                style={{ color: c.ink }}
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <motion.div className="absolute left-0 top-0" style={{ x, y }}>
        <motion.div
          className="h-1.5 w-1.5 rounded-full"
          style={{ x: '-50%', y: '-50%' }}
          initial={false}
          animate={{
            backgroundColor: c.accent,
            opacity: visible && variant !== 'label' && variant !== 'text' ? 1 : 0,
            scale: variant === 'link' ? 0 : 1,
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>
    </div>
  );
}
