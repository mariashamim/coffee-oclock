'use client';

import { useEffect, useRef, useState } from 'react';
import { MAX_QTY, unitPrice, useCart } from '@/lib/cart';
import {
  extraOptions,
  findItem,
  formatPKR,
  milkOptions,
  sizeOptions,
  type MenuEntry,
  type Option,
} from '@/lib/menu';
import { useModal } from '@/lib/useModal';
import QtyStepper from './QtyStepper';

function OptionGroup({
  legend,
  name,
  options,
  type,
  selected,
  onToggle,
}: {
  legend: string;
  name: string;
  options: Option[];
  type: 'radio' | 'checkbox';
  selected: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <fieldset className="mt-6">
      <legend className="text-xs font-medium uppercase tracking-[0.2em] text-espresso/60">{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o.id} className="cursor-pointer">
            <input
              type={type}
              name={name}
              value={o.id}
              checked={selected.includes(o.id)}
              onChange={() => onToggle(o.id)}
              className="peer sr-only"
            />
            <span className="flex items-center gap-2 rounded-full border border-espresso/20 px-4 py-2 text-sm transition-colors hover:border-espresso/50 peer-checked:border-espresso peer-checked:bg-espresso peer-checked:text-cream peer-focus-visible:ring-2 peer-focus-visible:ring-terracotta peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-cream">
              {o.label}
              {o.price > 0 && <span className="text-xs opacity-70">+{o.price}</span>}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

// Size, milk and extras for coffee drinks. Opens from any "Add" button via useCart().startAdd.
export default function ItemCustomizer() {
  const { customizing, closeCustomizer, add } = useCart();
  const item = customizing ? findItem(customizing) : undefined;
  const open = Boolean(item);

  // Keep showing the last item while the panel animates closed.
  const [shown, setShown] = useState<MenuEntry | undefined>(undefined);
  const [size, setSize] = useState('regular');
  const [milk, setMilk] = useState('whole');
  const [extras, setExtras] = useState<string[]>([]);
  const [qty, setQty] = useState(1);
  const closeRef = useRef<HTMLButtonElement>(null);
  useModal(open, closeCustomizer, closeRef);

  useEffect(() => {
    if (!item) return;
    setShown(item);
    setSize('regular');
    setMilk('whole');
    setExtras([]);
    setQty(1);
  }, [item]);

  const display = item ?? shown;
  const options = { size, milk, extras };
  const total = display ? unitPrice({ itemId: display.id, options }) * qty : 0;

  function confirm() {
    if (!display) return;
    add(display.id, qty, options);
    closeCustomizer();
  }

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6 ${
        open ? 'visible' : 'pointer-events-none invisible transition-[visibility] delay-500'
      }`}
      aria-hidden={!open}
    >
      <div
        onClick={closeCustomizer}
        className={`absolute inset-0 bg-roast/50 backdrop-blur-sm transition-opacity duration-500 ${open ? 'opacity-100' : 'opacity-0'}`}
      />

      {display && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="customizer-title"
          className={`relative max-h-[92vh] w-full overflow-y-auto bg-cream px-6 pb-6 pt-7 shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:max-w-lg sm:px-8 sm:pb-8 ${
            open ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-100 sm:translate-y-6 sm:opacity-0'
          }`}
        >
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="eyebrow">Make it yours</p>
              <h2 id="customizer-title" className="mt-3 font-serif text-3xl leading-tight">
                {display.name}
              </h2>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={closeCustomizer}
              aria-label="Close without adding"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-espresso/15 transition-colors hover:border-espresso"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-espresso/70">{display.description}</p>

          <OptionGroup legend="Size" name="size" type="radio" options={sizeOptions} selected={[size]} onToggle={setSize} />
          <OptionGroup legend="Milk" name="milk" type="radio" options={milkOptions} selected={[milk]} onToggle={setMilk} />
          <OptionGroup
            legend="Extras"
            name="extras"
            type="checkbox"
            options={extraOptions}
            selected={extras}
            onToggle={(id) => setExtras((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))}
          />

          <div className="mt-8 flex items-center gap-4 border-t border-espresso/10 pt-6">
            <QtyStepper value={qty} onChange={setQty} label={display.name} max={MAX_QTY} />
            <button type="button" onClick={confirm} className="btn-primary flex-1">
              Add to order · {formatPKR(total)}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
