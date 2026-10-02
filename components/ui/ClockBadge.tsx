'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type Hands = { h: number; m: number; s: number };

// Lahore runs on PKT (UTC+5) all year, with no daylight saving.
function lahoreHands(): Hands {
  const now = new Date();
  const s = now.getUTCSeconds();
  const m = now.getUTCMinutes() + s / 60;
  const h = ((now.getUTCHours() + 5) % 12) + m / 60;
  return { h: h * 30, m: m * 6, s: s * 6 };
}

// A spinning text ring around a live clock set to Lahore time.
export default function ClockBadge({ className = '' }: { className?: string }) {
  const [hands, setHands] = useState<Hands | null>(null);

  useEffect(() => {
    setHands(lahoreHands());
    const id = window.setInterval(() => setHands(lahoreHands()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <motion.div
      className={`group rounded-full bg-cream shadow-[0_20px_50px_-20px_rgba(43,27,18,0.4)] ${className}`}
      whileHover={{ scale: 1.06 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      role="img"
      aria-label="A clock showing the current time in Lahore"
    >
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          style={{ originX: '50px', originY: '50px' }}
        >
          <defs>
            <path id="clock-ring" d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0" />
          </defs>
          <text className="fill-espresso" fontSize="6.4" letterSpacing="1.1" fontFamily="var(--font-inter)">
            <textPath href="#clock-ring" textLength="249" lengthAdjust="spacing">
              IT’S ALWAYS COFFEE O’CLOCK • BREWED SLOW •
            </textPath>
          </text>
        </motion.g>

        <circle cx="50" cy="50" r="27" className="fill-roast" />
        {Array.from({ length: 12 }, (_, i) => (
          <line
            key={i}
            x1="50"
            y1="26.5"
            x2="50"
            y2={i % 3 === 0 ? 30 : 28.5}
            stroke="#C9A227"
            strokeWidth={i % 3 === 0 ? 1.4 : 0.8}
            strokeLinecap="round"
            transform={`rotate(${i * 30} 50 50)`}
          />
        ))}
        {hands && (
          <g strokeLinecap="round">
            <line x1="50" y1="50" x2="50" y2="37" stroke="#FAF6F0" strokeWidth="2" transform={`rotate(${hands.h} 50 50)`} />
            <line x1="50" y1="50" x2="50" y2="32" stroke="#FAF6F0" strokeWidth="1.3" transform={`rotate(${hands.m} 50 50)`} />
            <line x1="50" y1="54" x2="50" y2="30" stroke="#C9A227" strokeWidth="0.7" transform={`rotate(${hands.s} 50 50)`} />
          </g>
        )}
        <circle cx="50" cy="50" r="1.8" fill="#C9A227" />
      </svg>
    </motion.div>
  );
}
