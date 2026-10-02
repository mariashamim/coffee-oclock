'use client';

import Link from 'next/link';
import { useState } from 'react';
import FadeIn from './ui/FadeIn';
import SectionHeading from './ui/SectionHeading';
import { ArrowIcon, PhoneIcon, PinIcon } from './ui/Icons';
import {
  cities,
  directionsUrl,
  locations,
  mapEmbedUrl,
  telHref,
  type City,
} from '@/lib/locations';

export default function Location() {
  const [city, setCity] = useState<City>('Lahore');
  const [selectedId, setSelectedId] = useState(locations[0].id);

  const branches = locations.filter((l) => l.city === city);
  const selected = branches.find((l) => l.id === selectedId) ?? branches[0];

  function pickCity(next: City) {
    setCity(next);
    setSelectedId(locations.find((l) => l.city === next)!.id);
  }

  return (
    <section id="locations" aria-labelledby="locations-heading" className="py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          id="locations-heading"
          eyebrow="Visit us"
          title={
            <>
              {locations.length} corners, <span className="italic">{cities.length} cities.</span>
            </>
          }
          description="From our Gulberg flagship to a late-night counter in Clifton, there’s a Coffee O’Clock close by. Pick a city to find yours."
        />

        <FadeIn delay={0.05}>
          <div role="group" aria-label="Choose a city" className="mt-12 flex flex-wrap gap-2">
            {cities.map((c) => {
              const count = locations.filter((l) => l.city === c).length;
              const active = c === city;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => pickCity(c)}
                  aria-pressed={active}
                  className={`rounded-full border px-5 py-2.5 text-sm transition-colors ${
                    active
                      ? 'border-espresso bg-espresso text-cream'
                      : 'border-espresso/20 text-espresso/75 hover:border-espresso/50 hover:text-espresso'
                  }`}
                >
                  {c} <span className={active ? 'text-cream/60' : 'text-espresso/40'}>· {count}</span>
                </button>
              );
            })}
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Branch list + details */}
          <FadeIn delay={0.1} className="lg:col-span-5">
            <ul className="grid gap-3" aria-label={`Branches in ${city}`}>
              {branches.map((l) => {
                const active = l.id === selected.id;
                return (
                  <li key={l.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(l.id)}
                      aria-pressed={active}
                      className={`w-full border p-5 text-left transition-colors ${
                        active ? 'border-espresso bg-cream-deep' : 'border-espresso/15 hover:border-espresso/40'
                      }`}
                    >
                      <span className="flex items-center justify-between gap-3">
                        <span className="font-serif text-xl">{l.name}</span>
                        {l.flagship && (
                          <span className="rounded-full bg-espresso px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-cream">
                            Flagship
                          </span>
                        )}
                      </span>
                      <span className="mt-1 block text-sm text-espresso/60">{l.address}</span>
                      <span className="mt-3 flex flex-wrap gap-1.5">
                        {l.features
                          .filter((f) => f !== 'Flagship')
                          .map((f) => (
                            <span key={f} className="rounded-full border border-espresso/15 px-2.5 py-0.5 text-[11px] text-espresso/65">
                              {f}
                            </span>
                          ))}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 border-t border-espresso/15 pt-8" aria-live="polite">
              <h3 className="font-serif text-3xl">
                {selected.name}, <span className="italic text-terracotta">{selected.city}</span>
              </h3>
              <ul className="mt-5 space-y-3 text-sm text-espresso/80">
                <li className="flex gap-3">
                  <PinIcon className="h-5 w-5 shrink-0 text-terracotta" />
                  <address className="not-italic">
                    {selected.address}, {selected.city}
                  </address>
                </li>
                <li className="flex gap-3">
                  <PhoneIcon className="h-5 w-5 shrink-0 text-terracotta" />
                  <a href={telHref(selected.phone)} className="link-underline">
                    {selected.phone}
                  </a>
                </li>
              </ul>

              <table className="mt-6 w-full text-sm">
                <caption className="mb-2 text-left text-xs font-medium uppercase tracking-eyebrow text-terracotta">
                  Opening hours
                </caption>
                <tbody>
                  {selected.hours.map((row) => (
                    <tr key={row.days} className="border-b border-espresso/10">
                      <th scope="row" className="py-3 text-left font-normal text-espresso/70">
                        {row.days}
                      </th>
                      <td className="py-3 text-right font-medium">{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href={directionsUrl(selected)} target="_blank" rel="noopener noreferrer" className="btn-primary group">
                  Get Directions
                  <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  <span className="sr-only">(opens Google Maps in a new tab)</span>
                </a>
                <Link href="/menu" className="btn-secondary">
                  Order for pickup
                </Link>
              </div>
            </div>
          </FadeIn>

          {/* Map follows the selected branch */}
          <FadeIn className="lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden bg-cream-deep lg:sticky lg:top-28 lg:aspect-auto lg:h-[calc(100vh-9rem)] lg:max-h-[720px]">
              <iframe
                key={selected.id}
                src={mapEmbedUrl(selected)}
                title={`Map showing the ${selected.name} area of ${selected.city}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0 grayscale-[70%] sepia-[25%]"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
