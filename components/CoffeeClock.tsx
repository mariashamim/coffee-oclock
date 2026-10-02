'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import SectionHeading from './ui/SectionHeading';
import { ArrowIcon } from './ui/Icons';
import AddToCartButton from './cart/AddToCartButton';

type HourDrink = {
  name: string;
  note: string;
  price: number;
  liquid: string; // colour of the drink in the cup
  iced?: boolean;
};

// Index = hour on the dial (0 is 12 o'clock).
const drinks: HourDrink[] = [
  { name: 'Midnight Mocha', note: 'Dark chocolate, a double shot and a pinch of sea salt for the night owls.', price: 890, liquid: '#3B2416' },
  { name: 'Affogato', note: 'Vanilla gelato, drowned in hot espresso. Dessert, technically.', price: 850, liquid: '#E9DCC6', iced: true },
  { name: 'Iced Spanish Latte', note: 'Condensed milk, espresso and plenty of ice for the hottest hour.', price: 820, liquid: '#C49A72', iced: true },
  { name: 'Signature Karak Latte', note: 'The three o’clock chai break, made with espresso and slow-simmered spice.', price: 750, liquid: '#A86F45' },
  { name: 'Saffron Cold Brew', note: 'Eighteen-hour cold brew with saffron cream, poured over ice.', price: 950, liquid: '#C08A3E', iced: true },
  { name: 'Cardamom Cappuccino', note: 'Velvet foam and green cardamom, ground fresh each morning.', price: 820, liquid: '#B07F59' },
  { name: 'Pistachio Latte', note: 'House pistachio paste, espresso and steamed milk. Sunset in a cup.', price: 880, liquid: '#A9A46E' },
  { name: 'Classic Flat White', note: 'A short ristretto and thin, glossy microfoam. Nothing to hide.', price: 780, liquid: '#9A6844' },
  { name: 'Double Espresso', note: 'Two clean shots of our house blend, for when the evening runs long.', price: 550, liquid: '#2E1A10' },
  { name: 'Long Black', note: 'Espresso over hot water: bright, simple and easy to linger over.', price: 600, liquid: '#3D2415' },
  { name: 'Gulab Latte', note: 'Rose syrup, a single shot and warm milk, a nod to gulab jamun.', price: 840, liquid: '#C98E8A' },
  { name: 'Honey Cinnamon Macchiato', note: 'Wildflower honey, cinnamon and a spot of foam to wind down.', price: 860, liquid: '#A0703F' },
];

const STEP = 360 / 12;
const mod12 = (n: number) => ((n % 12) + 12) % 12;
const hourLabel = (i: number) => (i === 0 ? 12 : i);
// Lahore is UTC+5 all year.
const lahoreHourIndex = () => mod12(new Date().getUTCHours() + 5);

export default function CoffeeClock() {
  const sectionRef = useRef<HTMLElement>(null);
  // `turn` counts steps, not hours, so the dial always spins the short way round.
  const [turn, setTurn] = useState(0);
  const [now, setNow] = useState<number | null>(null);
  const selected = mod12(turn);
  const drink = drinks[selected];

  // Spin to the current hour the first time the clock scrolls into view.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const h = lahoreHourIndex();
        setNow(h);
        setTurn(h);
        io.disconnect();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    const tick = window.setInterval(() => setNow(lahoreHourIndex()), 60_000);
    return () => {
      io.disconnect();
      window.clearInterval(tick);
    };
  }, []);

  function goTo(i: number) {
    const delta = mod12(i - selected + 6) - 6; // -6..5
    setTurn((t) => t + delta);
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setTurn((t) => t + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setTurn((t) => t - 1);
    }
  }

  const rotation = -turn * STEP;
  const isNow = now === selected;

  return (
    <section
      ref={sectionRef}
      id="clock"
      aria-labelledby="clock-heading"
      data-theme="dark"
      className="overflow-hidden bg-roast py-24 text-foam sm:py-32"
    >
      <div className="container-x">
        <SectionHeading
          id="clock-heading"
          eyebrow="Every hour has a cup"
          title={
            <>
              It’s always <span className="italic text-gold">Coffee O’Clock.</span>
            </>
          }
          description="Twelve hours, twelve drinks. Spin the dial to find yours, or let it tell you what Lahore is drinking right now."
          tone="dark"
        />

        <div className="mt-16 grid items-center gap-14 lg:mt-20 lg:grid-cols-2 lg:gap-20">
          {/* The dial */}
          <div className="relative mx-auto h-[20rem] w-[20rem] [--r:8.4rem] sm:h-[26rem] sm:w-[26rem] sm:[--r:10.6rem]">
            {/* Fixed gold pointer at 12 o'clock */}
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-0 z-10 h-0 w-0 -translate-x-1/2 -translate-y-3 border-x-[9px] border-t-[12px] border-x-transparent border-t-gold"
            />

            <div
              role="group"
              aria-label="Coffee O’Clock dial. Use the arrow keys to turn it."
              onKeyDown={onKeyDown}
              className="dial-spin absolute inset-0 rounded-full border border-foam/15"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              {/* Minute ticks */}
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
                {Array.from({ length: 60 }, (_, i) => (
                  <line
                    key={i}
                    x1="50"
                    y1="2.5"
                    x2="50"
                    y2={i % 5 === 0 ? 6 : 4}
                    strokeWidth={i % 5 === 0 ? 0.6 : 0.3}
                    className={i % 5 === 0 ? 'stroke-gold/80' : 'stroke-foam/25'}
                    transform={`rotate(${i * 6} 50 50)`}
                  />
                ))}
              </svg>

              {drinks.map((d, i) => {
                const active = i === selected;
                return (
                  <button
                    key={d.name}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-pressed={active}
                    aria-label={`${hourLabel(i)} o’clock: ${d.name}`}
                    className={`dial-spin absolute left-1/2 top-1/2 -ml-6 -mt-6 flex h-12 w-12 items-center justify-center rounded-full font-serif text-lg ${
                      active
                        ? 'bg-gold text-roast shadow-[0_0_0_6px_rgb(var(--gold)/0.18)]'
                        : 'text-foam/70 hover:bg-foam/10 hover:text-foam'
                    }`}
                    style={{
                      transform: `rotate(${i * STEP}deg) translateY(calc(var(--r) * -1)) rotate(${-(i * STEP) - rotation}deg)`,
                    }}
                  >
                    {hourLabel(i)}
                    {now === i && !active && (
                      <span className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-terracotta" aria-hidden="true" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* The cup in the middle takes on each drink's colour */}
            <div className="pointer-events-none absolute inset-[26%] flex flex-col items-center justify-center">
              <div className="relative">
                {!drink.iced && (
                  <span aria-hidden="true" className="steam steam-on absolute -top-14 left-0 right-0 h-16">
                    <span />
                    <span />
                    <span />
                  </span>
                )}
                <svg viewBox="0 0 120 90" className="w-28 sm:w-36" aria-hidden="true">
                  <ellipse cx="56" cy="80" rx="50" ry="8" className="fill-foam/10" />
                  <path d="M18 22h76l-8 46a14 14 0 0 1-14 12H40a14 14 0 0 1-14-12Z" className="fill-foam" />
                  <path d="M93 32h6a11 11 0 0 1 0 22h-9" fill="none" strokeWidth="6" className="stroke-foam" />
                  <ellipse cx="56" cy="22" rx="38" ry="7" className="cup-fill" style={{ fill: drink.liquid }} />
                  {drink.iced && (
                    <g className="fill-foam/80">
                      <rect x="38" y="16" width="9" height="8" rx="2" transform="rotate(-12 42 20)" />
                      <rect x="60" y="17" width="8" height="7" rx="2" transform="rotate(15 64 20)" />
                    </g>
                  )}
                </svg>
              </div>
              <p className="mt-3 font-serif text-sm italic text-foam/60">{hourLabel(selected)} o’clock</p>
            </div>
          </div>

          {/* The drink for the selected hour */}
          <div aria-live="polite" className="lg:max-w-md">
            <div key={selected} className="drink-swap">
              <p className="eyebrow text-gold">
                {isNow ? `It’s ${hourLabel(selected)} o’clock in Lahore` : `At ${hourLabel(selected)} o’clock`}
              </p>
              <h3 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">{drink.name}</h3>
              <p className="mt-5 text-lg leading-relaxed text-foam/70">{drink.note}</p>
              <p className="mt-6 text-sm font-medium tracking-wide text-gold">
                PKR {drink.price.toLocaleString('en-PK')} · {drink.iced ? 'Served cold' : 'Served hot'}
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setTurn((t) => t - 1)}
                aria-label="Previous hour"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-foam/25 transition-colors hover:border-gold hover:text-gold"
              >
                <ArrowIcon className="h-4 w-4 rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => setTurn((t) => t + 1)}
                aria-label="Next hour"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-foam/25 transition-colors hover:border-gold hover:text-gold"
              >
                <ArrowIcon className="h-4 w-4" />
              </button>
              {now !== null && !isNow && (
                <button
                  type="button"
                  onClick={() => goTo(now)}
                  className="px-3 text-xs font-medium uppercase tracking-[0.2em] text-foam/70 transition-colors hover:text-gold"
                >
                  Back to now
                </button>
              )}
              <AddToCartButton itemName={drink.name} variant="custom" className="btn-gold ml-auto">
                Add to order
              </AddToCartButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
