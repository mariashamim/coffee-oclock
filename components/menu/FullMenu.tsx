'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import FadeIn from '../ui/FadeIn';
import AddToCartButton from '../cart/AddToCartButton';
import { addOns, menu, tagLabels, type MenuItem, type Temp } from '@/lib/menu';
import { unsplash } from '@/lib/site';

type Filter = 'all' | Temp;

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Everything' },
  { value: 'hot', label: 'Hot drinks' },
  { value: 'iced', label: 'Iced drinks' },
];

const formatPKR = (n: number) => `PKR ${n.toLocaleString('en-PK')}`;

function TempIcon({ temp }: { temp: Temp }) {
  if (temp === 'iced') {
    return (
      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center text-espresso/45" title="Served iced">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <rect x="5" y="5" width="14" height="14" rx="3" transform="rotate(12 12 12)" />
          <path d="M9 10.5l2.5-1" strokeLinecap="round" />
        </svg>
        <span className="sr-only">Served iced</span>
      </span>
    );
  }
  return (
    <span className="relative inline-flex h-5 w-5 shrink-0 items-center justify-center text-terracotta" title="Served hot">
      {/* Wisps rise from the cup when the item is hovered (see .steam-ink in globals.css) */}
      <span aria-hidden="true" className="steam steam-ink absolute -top-3 left-0 right-0 h-4">
        <span />
        <span />
        <span />
      </span>
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5Z" strokeLinejoin="round" />
        <path d="M17 11h1.5a2.5 2.5 0 0 1 0 5H17" />
      </svg>
      <span className="sr-only">Served hot</span>
    </span>
  );
}

function Item({ item }: { item: MenuItem }) {
  return (
    <li className="group border-b border-espresso/10 py-5">
      <div className="flex items-baseline gap-2">
        <h3 className="font-serif text-xl leading-snug">{item.name}</h3>
        {item.temp && <TempIcon temp={item.temp} />}
        <span aria-hidden="true" className="mx-1 min-w-[1.5rem] flex-1 -translate-y-1 border-b border-dotted border-espresso/30" />
        <p className="shrink-0 text-sm font-medium text-terracotta">{formatPKR(item.price)}</p>
      </div>
      <div className="mt-2 flex items-start justify-between gap-4">
        <p className="text-sm leading-relaxed text-espresso/70">{item.description}</p>
        <AddToCartButton itemName={item.name} className="mt-0.5" />
      </div>
      {item.tags && item.tags.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2" aria-label="Labels">
          {item.tags.map((tag) => (
            <li
              key={tag}
              className={`rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] ${
                tag === 'veg'
                  ? 'border border-espresso/15 text-espresso/60'
                  : tag === 'seasonal'
                    ? 'bg-terracotta/10 text-terracotta'
                    : tag === 'new'
                      ? 'bg-gold/20 text-espresso'
                      : 'bg-espresso text-cream'
              }`}
            >
              {tagLabels[tag]}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default function FullMenu() {
  const [filter, setFilter] = useState<Filter>('all');
  const [active, setActive] = useState(menu[0].id);
  const pillsRef = useRef<HTMLUListElement>(null);

  const categories = useMemo(
    () =>
      menu
        .map((c) => ({
          ...c,
          items: filter === 'all' ? c.items : c.items.filter((i) => i.temp === filter),
        }))
        .filter((c) => c.items.length > 0),
    [filter],
  );
  const count = categories.reduce((n, c) => n + c.items.length, 0);
  // If the filter hides the highlighted category, fall back to the first one still showing.
  const current = categories.some((c) => c.id === active) ? active : categories[0]?.id;

  // Highlight the category currently in the middle of the screen.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' },
    );
    categories.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [categories]);

  // Keep the active pill visible in the horizontally scrolling bar on phones.
  useEffect(() => {
    const list = pillsRef.current;
    const pill = list?.querySelector<HTMLElement>(`[data-id="${current}"]`);
    if (!list || !pill) return;
    list.scrollTo({ left: pill.offsetLeft - list.clientWidth / 2 + pill.clientWidth / 2, behavior: 'smooth' });
  }, [current]);

  return (
    <>
      <div className="sticky top-20 z-30 border-y border-espresso/10 bg-cream/90 backdrop-blur-xl">
        <div className="container-x flex flex-col gap-3 py-3 md:flex-row md:items-center md:justify-between">
          <nav aria-label="Menu categories" className="-mx-5 min-w-0 sm:-mx-8 md:mx-0">
            <ul ref={pillsRef} className="flex gap-1 overflow-x-auto px-5 [scrollbar-width:none] sm:px-8 md:px-0 [&::-webkit-scrollbar]:hidden">
              {categories.map((c) => (
                <li key={c.id} data-id={c.id} className="shrink-0">
                  <a
                    href={`#${c.id}`}
                    aria-current={current === c.id ? 'true' : undefined}
                    className={`block whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors ${
                      current === c.id ? 'bg-espresso text-cream' : 'text-espresso/70 hover:bg-espresso/5 hover:text-espresso'
                    }`}
                  >
                    {c.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div role="group" aria-label="Filter drinks" className="flex shrink-0 rounded-full border border-espresso/15 p-1">
            {filters.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setFilter(f.value)}
                aria-pressed={filter === f.value}
                className={`flex-1 whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium tracking-wide transition-colors ${
                  filter === f.value ? 'bg-terracotta text-cream' : 'text-espresso/70 hover:text-espresso'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container-x">
        <p className="sr-only" aria-live="polite">
          Showing {count} items
        </p>

        {categories.map((c, index) => (
          <section
            key={c.id}
            id={c.id}
            aria-labelledby={`${c.id}-title`}
            className="grid scroll-mt-28 gap-10 border-b border-espresso/10 py-16 last:border-b-0 sm:py-20 md:scroll-mt-20 lg:grid-cols-12 lg:gap-16"
          >
            <FadeIn className="lg:col-span-4">
              <div className="lg:sticky lg:top-48">
                <p className="font-serif text-sm italic text-terracotta">{String(index + 1).padStart(2, '0')}</p>
                <h2 id={`${c.id}-title`} className="mt-2 font-serif text-4xl tracking-tight sm:text-5xl">
                  {c.title}
                </h2>
                <p className="mt-4 max-w-sm leading-relaxed text-espresso/70">{c.blurb}</p>
                <div className="relative mt-8 aspect-[16/9] overflow-hidden bg-cream-deep lg:aspect-[4/5]">
                  <Image
                    src={unsplash(c.image, 900)}
                    alt={c.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1} className="lg:col-span-8">
              <ul className="grid gap-x-10 sm:grid-cols-2">
                {c.items.map((item) => (
                  <Item key={item.name} item={item} />
                ))}
              </ul>
            </FadeIn>
          </section>
        ))}

        <FadeIn className="mb-24 mt-4 grid gap-8 border border-espresso/15 p-8 sm:p-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow">Make it yours</p>
            <h2 className="mt-3 font-serif text-3xl">Add-ons</h2>
          </div>
          <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2 md:col-span-8">
            {addOns.map((a) => (
              <li key={a.name} className="flex items-baseline gap-2 text-sm">
                <span>{a.name}</span>
                <span aria-hidden="true" className="flex-1 -translate-y-1 border-b border-dotted border-espresso/30" />
                <span className="font-medium text-terracotta">{a.price ? `+ ${formatPKR(a.price)}` : 'Free'}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm leading-relaxed text-espresso/60 md:col-span-12">
            Prices are in Pakistani rupees and include tax. Our kitchen handles nuts, dairy and gluten, so please tell
            us about any allergies when you order. Seasonal items change through the year.
          </p>
        </FadeIn>
      </div>
    </>
  );
}
