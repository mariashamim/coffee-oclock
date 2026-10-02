'use client';

import { useRef } from 'react';
import { motion, useTransform, type MotionValue } from 'framer-motion';
import { usePointerParallax } from '@/lib/usePointerParallax';

type Item = {
  kind: 'bean' | 'dot';
  top: string;
  left: string;
  size: number;
  depth: number; // how far it drifts with the cursor (negative = opposite way)
  rotate: number;
  duration: number;
  color: string;
  className?: string;
};

const presets: Record<'hero' | 'banner', Item[]> = {
  hero: [
    { kind: 'bean', top: '10%', left: '44%', size: 22, depth: 1.2, rotate: 25, duration: 7, color: 'text-espresso/80', className: 'hidden lg:block' },
    { kind: 'bean', top: '78%', left: '46%', size: 28, depth: 1.8, rotate: -30, duration: 9, color: 'text-espresso', className: 'hidden lg:block' },
    { kind: 'bean', top: '62%', left: '2%', size: 16, depth: -0.8, rotate: 60, duration: 8, color: 'text-terracotta/80', className: 'hidden md:block' },
    { kind: 'bean', top: '48%', left: '93%', size: 20, depth: 1.4, rotate: -15, duration: 10, color: 'text-terracotta', className: 'hidden sm:block' },
    { kind: 'bean', top: '90%', left: '82%', size: 18, depth: -1.2, rotate: 40, duration: 7.5, color: 'text-espresso/70' },
    { kind: 'dot', top: '26%', left: '52%', size: 8, depth: 2.2, rotate: 0, duration: 6, color: 'text-gold' },
    { kind: 'dot', top: '58%', left: '50%', size: 6, depth: -1.6, rotate: 0, duration: 5, color: 'text-gold', className: 'hidden lg:block' },
    { kind: 'dot', top: '6%', left: '28%', size: 5, depth: 1, rotate: 0, duration: 6.5, color: 'text-terracotta/70' },
    { kind: 'dot', top: '96%', left: '8%', size: 7, depth: 1.5, rotate: 0, duration: 7, color: 'text-gold' },
  ],
  banner: [
    { kind: 'bean', top: '18%', left: '50%', size: 22, depth: 1.4, rotate: 20, duration: 8, color: 'text-gold/80', className: 'hidden lg:block' },
    { kind: 'bean', top: '75%', left: '58%', size: 26, depth: -1.2, rotate: -35, duration: 9, color: 'text-foam/25', className: 'hidden md:block' },
    { kind: 'bean', top: '82%', left: '6%', size: 16, depth: 1.8, rotate: 50, duration: 7, color: 'text-gold/60' },
    { kind: 'dot', top: '30%', left: '88%', size: 7, depth: 2, rotate: 0, duration: 6, color: 'text-gold' },
    { kind: 'dot', top: '12%', left: '20%', size: 5, depth: -1.4, rotate: 0, duration: 5.5, color: 'text-foam/40' },
  ],
};

function BeanShape({ size }: { size: number }) {
  return (
    <svg width={size} height={size * 1.35} viewBox="0 0 24 32" aria-hidden="true">
      <ellipse cx="12" cy="16" rx="10.5" ry="14.5" fill="currentColor" />
      <path
        d="M12 3c-3.5 6 3.5 9 0 13s3.5 7 0 13"
        stroke="#FAF6F0"
        strokeOpacity="0.5"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Floater({ item, mx, my }: { item: Item; mx: MotionValue<number>; my: MotionValue<number> }) {
  const x = useTransform(mx, (v) => v * item.depth * 70);
  const y = useTransform(my, (v) => v * item.depth * 50);

  return (
    <motion.div
      className={`absolute ${item.color} ${item.className ?? ''}`}
      style={{ top: item.top, left: item.left, x, y }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, -14, 0],
          rotate: [item.rotate, item.rotate + 18, item.rotate],
        }}
        transition={{
          opacity: { duration: 1, delay: 0.6 },
          scale: { duration: 1, delay: 0.6 },
          y: { duration: item.duration, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: item.duration * 1.3, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        {item.kind === 'bean' ? (
          <BeanShape size={item.size} />
        ) : (
          <span
            className="block rounded-full bg-current"
            style={{ width: item.size, height: item.size }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}

// Decorative coffee beans and specks that bob gently and drift with the cursor.
// Place inside a `relative` section.
export default function FloatingBeans({ preset }: { preset: 'hero' | 'banner' }) {
  const ref = useRef<HTMLDivElement>(null);
  const { x, y } = usePointerParallax(ref);

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {presets[preset].map((item, i) => (
        <Floater key={i} item={item} mx={x} my={y} />
      ))}
    </div>
  );
}
