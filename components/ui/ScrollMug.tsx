'use client';

import { useEffect, useRef, useState } from 'react';

// Bottom-right mug that fills with coffee as you scroll, steams when the page is done,
// and scrolls back to the top when clicked. The fill level is a CSS variable (--fill)
// so scrolling never re-renders the SVG; the wave and steam are CSS keyframes.
export default function ScrollMug() {
  const ref = useRef<HTMLButtonElement>(null);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      ref.current?.style.setProperty('--fill', p.toFixed(3));
      setPct(Math.round(p * 100));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  const visible = pct > 2;
  const full = pct >= 98;

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => window.scrollTo({ top: 0 })}
      aria-label={`Back to top. Your mug is ${pct}% full`}
      title="Back to top"
      tabIndex={visible ? 0 : -1}
      className={`group fixed bottom-4 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-espresso/10 bg-cream/85 shadow-[0_12px_30px_-12px_rgba(43,27,18,0.45)] backdrop-blur-md transition-all duration-500 hover:-translate-y-1 sm:bottom-6 sm:right-6 sm:h-16 sm:w-16 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      {/* Steam once the mug is full */}
      <span
        aria-hidden="true"
        className={`mug-steam absolute -top-4 left-1/2 h-6 w-6 -translate-x-[60%] transition-opacity duration-500 ${
          full ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span style={{ left: '15%' }} />
        <span style={{ left: '45%' }} />
        <span style={{ left: '75%' }} />
      </span>

      <svg viewBox="0 0 64 64" className="h-9 w-9 sm:h-10 sm:w-10" aria-hidden="true">
        <defs>
          <clipPath id="mug-inside">
            <path d="M13 19H43V44a7 7 0 0 1-7 7H20a7 7 0 0 1-7-7Z" />
          </clipPath>
        </defs>

        <g clipPath="url(#mug-inside)">
          <g className="mug-liquid">
            <g className="mug-wave">
              <path
                d="M12 19q8-3 16 0t16 0t16 0t16 0V60H12Z"
                className="fill-coffee"
              />
              <path
                d="M12 19q8-3 16 0t16 0t16 0t16 0"
                fill="none"
                strokeWidth="1.6"
                className="stroke-gold/70"
              />
            </g>
          </g>
        </g>

        {/* Mug outline, handle and saucer */}
        <g fill="none" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className="stroke-espresso">
          <path d="M12 18H44V44a8 8 0 0 1-8 8H20a8 8 0 0 1-8-8Z" />
          <path d="M44 24h3.5a6.5 6.5 0 0 1 0 13H44" />
          <path d="M8 57h40" />
        </g>
      </svg>
    </button>
  );
}
