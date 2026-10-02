'use client';

import { useEffect, useState } from 'react';
import { BREW_KEY, type Brew } from '@/lib/brew';

// Light roast / dark roast switch. The palette swap itself is pure CSS variables.
export default function BrewToggle({ className = '' }: { className?: string }) {
  const [brew, setBrew] = useState<Brew | null>(null);

  useEffect(() => {
    setBrew(document.documentElement.getAttribute('data-brew') === 'dark' ? 'dark' : 'light');
  }, []);

  function toggle() {
    const next: Brew = brew === 'dark' ? 'light' : 'dark';
    const root = document.documentElement;
    root.classList.add('brew-transition');
    root.setAttribute('data-brew', next);
    window.setTimeout(() => root.classList.remove('brew-transition'), 650);
    try {
      localStorage.setItem(BREW_KEY, next);
    } catch {
      /* Private mode: the choice just won't persist. */
    }
    setBrew(next);
  }

  const dark = brew === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark}
      aria-label={dark ? 'Brew mode: dark roast. Switch to light roast' : 'Brew mode: light roast. Switch to dark roast'}
      title={dark ? 'Dark roast' : 'Light roast'}
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <span className="hidden text-[11px] font-medium uppercase tracking-[0.2em] text-espresso/60 transition-colors group-hover:text-espresso lg:inline">
        {dark ? 'Dark roast' : 'Light roast'}
      </span>
      <span
        aria-hidden="true"
        className="relative flex h-8 w-14 items-center rounded-full border border-espresso/20 bg-cream-deep p-1 transition-colors group-hover:border-espresso/40"
      >
        <span
          className={`flex h-6 w-6 items-center justify-center rounded-full shadow-sm transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] ${
            dark ? 'translate-x-6 rotate-[200deg] bg-gold text-roast' : 'translate-x-0 rotate-0 bg-espresso text-cream'
          } ${brew === null ? 'opacity-0' : 'opacity-100'}`}
        >
          {/* A coffee bean: pale in light roast, toasted in dark roast */}
          <svg viewBox="0 0 24 32" className="h-3.5 w-3.5">
            <ellipse cx="12" cy="16" rx="10" ry="14" fill="currentColor" />
            <path
              d="M12 3c-3.5 6 3.5 9 0 13s3.5 7 0 13"
              stroke={dark ? 'rgb(201 162 39)' : 'rgb(43 27 18)'}
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </span>
    </button>
  );
}
