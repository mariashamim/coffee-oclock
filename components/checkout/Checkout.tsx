'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { describeOptions, unitPrice, useCart, type CartLine } from '@/lib/cart';
import { DELIVERY_FEE, findItem, formatPKR, FREE_DELIVERY_OVER } from '@/lib/menu';
import { cities, findLocation, flagship, locations } from '@/lib/locations';

type Mode = 'pickup' | 'delivery';

const payments: Record<Mode, { id: string; label: string; hint: string }[]> = {
  pickup: [
    { id: 'counter', label: 'Pay at the counter', hint: 'Cash or card when you collect' },
    { id: 'wallet', label: 'JazzCash / Easypaisa', hint: 'We’ll send a payment request to your number' },
  ],
  delivery: [
    { id: 'cod', label: 'Cash on delivery', hint: 'Please keep exact change handy if you can' },
    { id: 'card', label: 'Card on delivery', hint: 'Our rider brings a card machine' },
    { id: 'wallet', label: 'JazzCash / Easypaisa', hint: 'We’ll send a payment request to your number' },
  ],
};

type Form = {
  name: string;
  phone: string;
  email: string;
  address: string;
  area: string;
  city: string;
  branch: string;
  time: string;
  payment: string;
  notes: string;
};

type Placed = {
  orderNo: string;
  firstName: string;
  mode: Mode;
  where: string;
  lines: CartLine[];
  total: number;
  eta: string;
};

// Pakistani mobile numbers: 03XX XXXXXXX or +92 3XX XXXXXXX.
const PHONE = /^(?:\+92|0)3\d{9}$/;

// Next eight half-hour slots, in Lahore time (UTC+5).
function timeSlots() {
  const fmt = new Intl.DateTimeFormat('en-PK', { timeZone: 'Asia/Karachi', hour: 'numeric', minute: '2-digit' });
  const step = 30 * 60 * 1000;
  const start = Math.ceil((Date.now() + 45 * 60 * 1000) / step) * step;
  return Array.from({ length: 8 }, (_, i) => fmt.format(new Date(start + i * step)));
}

function Field({ id, label, error, hint, children }: { id: string; label: string; error?: string; hint?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-terracotta">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-2 text-xs text-espresso/50">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

const inputClass = (error?: string) =>
  `w-full border bg-transparent px-4 py-3 text-base outline-none transition-colors placeholder:text-espresso/35 focus:border-espresso focus-visible:ring-0 focus-visible:ring-offset-0 ${
    error ? 'border-terracotta' : 'border-espresso/20'
  }`;

function Section({ step, title, children }: { step: number; title: string; children: ReactNode }) {
  return (
    <section className="border-t border-espresso/10 py-10 first:border-t-0 first:pt-0">
      <h2 className="flex items-baseline gap-3 font-serif text-2xl">
        <span className="font-serif text-sm italic text-terracotta">0{step}</span>
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function Checkout() {
  const { lines, ready, subtotal, clear, openDrawer } = useCart();
  const [mode, setMode] = useState<Mode>('pickup');
  const [form, setForm] = useState<Form>({
    name: '',
    phone: '',
    email: '',
    address: '',
    area: '',
    city: 'Lahore',
    branch: flagship.id,
    time: 'asap',
    payment: 'counter',
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [slots, setSlots] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [placed, setPlaced] = useState<Placed | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Computed after mount so server and browser render the same HTML.
  useEffect(() => setSlots(timeSlots()), []);

  const deliveryFee = mode === 'delivery' && subtotal < FREE_DELIVERY_OVER ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee;
  const paymentOptions = payments[mode];

  const set = (key: keyof Form) => (value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  function switchMode(next: Mode) {
    setMode(next);
    setForm((f) => ({ ...f, payment: payments[next][0].id }));
    setErrors({});
  }

  const validate = useMemo(
    () => (f: Form) => {
      const e: Partial<Record<keyof Form, string>> = {};
      if (f.name.trim().length < 2) e.name = 'Please tell us your name.';
      if (!PHONE.test(f.phone.replace(/[\s-]/g, ''))) e.phone = 'Enter a mobile number like 0300 1234567.';
      if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'That email doesn’t look quite right.';
      if (mode === 'delivery') {
        if (f.address.trim().length < 5) e.address = 'Please add your street address.';
        if (f.area.trim().length < 2) e.area = 'Which area or block?';
      }
      return e;
    },
    [mode],
  );

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`#checkout-${first}`)?.focus();
      return;
    }

    setSubmitting(true);
    // Sample site: there's no backend, so we simulate the order being sent.
    window.setTimeout(() => {
      const b = findLocation(form.branch) ?? flagship;
      const branch = { name: `our ${b.name} branch, ${b.address}, ${b.city}` };
      setPlaced({
        orderNo: `CO-${Math.floor(10000 + Math.random() * 90000)}`,
        firstName: form.name.trim().split(/\s+/)[0],
        mode,
        where: mode === 'pickup' ? branch.name : `${form.address}, ${form.area}, ${form.city}`,
        lines,
        total,
        eta:
          form.time === 'asap'
            ? mode === 'pickup'
              ? 'Ready for pickup in about 15 minutes'
              : 'Arriving in about 35–45 minutes'
            : `${mode === 'pickup' ? 'Ready for pickup' : 'Arriving'} around ${form.time}`,
      });
      clear();
      setSubmitting(false);
      window.scrollTo({ top: 0 });
    }, 1100);
  }

  // ---------- Confirmation ----------
  if (placed) {
    return (
      <div className="container-x py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <svg viewBox="0 0 64 64" className="mx-auto h-20 w-20" aria-hidden="true">
            <circle cx="32" cy="32" r="30" className="fill-gold/15 stroke-gold" strokeWidth="2" />
            <path d="M20 33l8 8 16-17" fill="none" className="check-draw stroke-espresso" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="eyebrow mt-8">Order {placed.orderNo}</p>
          <h1 className="mt-4 font-serif text-5xl leading-tight sm:text-6xl">
            Thank you, <span className="italic text-terracotta">{placed.firstName}.</span>
          </h1>
          <p className="mt-5 text-lg text-espresso/70">
            {placed.eta}. {placed.mode === 'pickup' ? `Collect it at ${placed.where}.` : `We’re bringing it to ${placed.where}.`}
          </p>

          <ul className="mt-12 divide-y divide-espresso/10 border-y border-espresso/10 text-left">
            {placed.lines.map((l) => {
              const item = findItem(l.itemId);
              return (
                <li key={l.key} className="flex justify-between gap-4 py-4 text-sm">
                  <span>
                    {l.qty} × {item?.name}
                    {l.options && describeOptions(l.options) && (
                      <span className="block text-xs text-espresso/55">{describeOptions(l.options)}</span>
                    )}
                  </span>
                  <span className="shrink-0">{formatPKR(unitPrice(l) * l.qty)}</span>
                </li>
              );
            })}
            <li className="flex justify-between py-4 font-serif text-xl">
              <span>Total</span>
              <span>{formatPKR(placed.total)}</span>
            </li>
          </ul>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/menu" className="btn-primary">
              Order something else
            </Link>
            <Link href="/" className="btn-secondary">
              Back home
            </Link>
          </div>
          <p className="mt-8 text-xs text-espresso/50">
            This is a sample site, so no real order was sent and nothing was charged.
          </p>
        </div>
      </div>
    );
  }

  // ---------- Loading / empty ----------
  if (!ready) {
    return <div className="container-x min-h-[50vh] py-24" aria-busy="true" />;
  }

  if (lines.length === 0) {
    return (
      <div className="container-x py-24 text-center">
        <h1 className="font-serif text-5xl">Your cup is empty.</h1>
        <p className="mt-4 text-espresso/70">Add a few things from the menu, then come back to check out.</p>
        <Link href="/menu" className="btn-primary mt-10">
          Browse the menu
        </Link>
      </div>
    );
  }

  // ---------- Checkout form ----------
  return (
    <div className="container-x pb-24 pt-10 sm:pt-14">
      <p className="eyebrow">Checkout</p>
      <h1 className="mt-4 font-serif text-5xl tracking-tight sm:text-6xl">
        Almost <span className="italic text-terracotta">poured.</span>
      </h1>

      <div className="mt-12 grid gap-14 lg:grid-cols-12 lg:gap-16">
        <form ref={formRef} onSubmit={onSubmit} noValidate className="lg:col-span-7" aria-describedby="checkout-note">
          <Section step={1} title="Pickup or delivery?">
            <div role="radiogroup" aria-label="How would you like your order?" className="grid grid-cols-2 gap-3">
              {(
                [
                  { id: 'pickup', label: 'Pickup', hint: 'Ready in ~15 min' },
                  { id: 'delivery', label: 'Delivery', hint: `Free over ${formatPKR(FREE_DELIVERY_OVER)}` },
                ] as const
              ).map((m) => (
                <label key={m.id} className="cursor-pointer">
                  <input
                    type="radio"
                    name="mode"
                    value={m.id}
                    checked={mode === m.id}
                    onChange={() => switchMode(m.id)}
                    className="peer sr-only"
                  />
                  <span className="block border border-espresso/20 p-5 transition-colors hover:border-espresso/50 peer-checked:border-espresso peer-checked:bg-espresso peer-checked:text-cream peer-focus-visible:ring-2 peer-focus-visible:ring-terracotta peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-cream">
                    <span className="block font-serif text-xl">{m.label}</span>
                    <span className="mt-1 block text-xs opacity-70">{m.hint}</span>
                  </span>
                </label>
              ))}
            </div>

            <div className="mt-6 grid gap-5">
              {mode === 'pickup' ? (
                <Field id="checkout-branch" label="Collect from">
                  <select
                    id="checkout-branch"
                    value={form.branch}
                    onChange={(e) => set('branch')(e.target.value)}
                    className={`${inputClass()} bg-cream`}
                  >
                    {cities.map((c) => (
                      <optgroup key={c} label={c}>
                        {locations
                          .filter((l) => l.city === c)
                          .map((l) => (
                            <option key={l.id} value={l.id}>
                              {l.name}: {l.address}
                            </option>
                          ))}
                      </optgroup>
                    ))}
                  </select>
                </Field>
              ) : (
                <>
                  <Field id="checkout-address" label="Street address" error={errors.address}>
                    <input
                      id="checkout-address"
                      autoComplete="street-address"
                      value={form.address}
                      onChange={(e) => set('address')(e.target.value)}
                      placeholder="House 12, Street 4"
                      aria-invalid={Boolean(errors.address)}
                      aria-describedby={errors.address ? 'checkout-address-error' : undefined}
                      className={inputClass(errors.address)}
                    />
                  </Field>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="checkout-area" label="Area or block" error={errors.area}>
                      <input
                        id="checkout-area"
                        value={form.area}
                        onChange={(e) => set('area')(e.target.value)}
                        placeholder="Gulberg III"
                        aria-invalid={Boolean(errors.area)}
                        aria-describedby={errors.area ? 'checkout-area-error' : undefined}
                        className={inputClass(errors.area)}
                      />
                    </Field>
                    <Field id="checkout-city" label="City">
                      <select
                        id="checkout-city"
                        autoComplete="address-level2"
                        value={form.city}
                        onChange={(e) => set('city')(e.target.value)}
                        className={`${inputClass()} bg-cream`}
                      >
                        {cities.map((c) => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                    </Field>
                  </div>
                </>
              )}

              <Field id="checkout-time" label="When">
                <select
                  id="checkout-time"
                  value={form.time}
                  onChange={(e) => set('time')(e.target.value)}
                  className={`${inputClass()} bg-cream`}
                >
                  <option value="asap">As soon as possible</option>
                  {slots.map((s) => (
                    <option key={s} value={s}>
                      Today, {s}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          </Section>

          <Section step={2} title="Your details">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="checkout-name" label="Name" error={errors.name}>
                <input
                  id="checkout-name"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => set('name')(e.target.value)}
                  placeholder="Ayesha Khan"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'checkout-name-error' : undefined}
                  className={inputClass(errors.name)}
                />
              </Field>
              <Field id="checkout-phone" label="Mobile number" error={errors.phone} hint="We’ll text you when it’s ready.">
                <input
                  id="checkout-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => set('phone')(e.target.value)}
                  placeholder="0300 1234567"
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'checkout-phone-error' : 'checkout-phone-hint'}
                  className={inputClass(errors.phone)}
                />
              </Field>
            </div>
            <div className="mt-5">
              <Field id="checkout-email" label="Email (optional)" error={errors.email} hint="For a receipt.">
                <input
                  id="checkout-email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => set('email')(e.target.value)}
                  placeholder="you@example.com"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'checkout-email-error' : 'checkout-email-hint'}
                  className={inputClass(errors.email)}
                />
              </Field>
            </div>
          </Section>

          <Section step={3} title="Payment">
            <div role="radiogroup" aria-label="Payment method" className="grid gap-3">
              {paymentOptions.map((p) => (
                <label key={p.id} className="group cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value={p.id}
                    checked={form.payment === p.id}
                    onChange={() => set('payment')(p.id)}
                    className="peer sr-only"
                  />
                  <span className="flex items-center gap-4 border border-espresso/20 p-4 transition-colors hover:border-espresso/50 peer-checked:border-espresso peer-focus-visible:ring-2 peer-focus-visible:ring-terracotta peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-cream">
                    <span
                      className="h-5 w-5 shrink-0 rounded-full border border-espresso/30 transition-all group-has-[:checked]:border-[6px] group-has-[:checked]:border-terracotta"
                      aria-hidden="true"
                    />
                    <span>
                      <span className="block text-sm font-medium">{p.label}</span>
                      <span className="block text-xs text-espresso/55">{p.hint}</span>
                    </span>
                  </span>
                </label>
              ))}
            </div>

            <div className="mt-6">
              <Field id="checkout-notes" label="Notes for the barista (optional)">
                <textarea
                  id="checkout-notes"
                  rows={3}
                  value={form.notes}
                  onChange={(e) => set('notes')(e.target.value)}
                  placeholder="Extra hot, less sugar, ring the bell twice…"
                  className={`${inputClass()} resize-none`}
                />
              </Field>
            </div>
          </Section>

          <button type="submit" disabled={submitting} className="btn-primary w-full py-4 text-base disabled:opacity-70">
            {submitting ? 'Placing your order…' : `Place order · ${formatPKR(total)}`}
          </button>
          <p id="checkout-note" className="mt-4 text-center text-xs text-espresso/50">
            Sample site: orders aren’t sent anywhere and no payment is taken.
          </p>
        </form>

        {/* Order summary */}
        <aside aria-labelledby="summary-title" className="lg:col-span-5">
          <div className="border border-espresso/15 p-6 sm:p-8 lg:sticky lg:top-28">
            <div className="flex items-baseline justify-between">
              <h2 id="summary-title" className="font-serif text-2xl">
                Your order
              </h2>
              <button
                type="button"
                onClick={openDrawer}
                className="text-xs font-medium uppercase tracking-[0.18em] text-terracotta transition-colors hover:text-espresso"
              >
                Edit
              </button>
            </div>
            <ul className="mt-6 divide-y divide-espresso/10">
              {lines.map((l) => {
                const item = findItem(l.itemId);
                const options = describeOptions(l.options);
                return (
                  <li key={l.key} className="flex justify-between gap-4 py-4 text-sm">
                    <span>
                      <span className="font-medium">{l.qty} ×</span> {item?.name}
                      {options && <span className="mt-0.5 block text-xs text-espresso/55">{options}</span>}
                    </span>
                    <span className="shrink-0">{formatPKR(unitPrice(l) * l.qty)}</span>
                  </li>
                );
              })}
            </ul>
            <dl className="mt-4 space-y-2 border-t border-espresso/10 pt-5 text-sm">
              <div className="flex justify-between">
                <dt className="text-espresso/70">Subtotal</dt>
                <dd>{formatPKR(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-espresso/70">{mode === 'pickup' ? 'Pickup' : 'Delivery'}</dt>
                <dd>{deliveryFee ? formatPKR(deliveryFee) : 'Free'}</dd>
              </div>
              {mode === 'delivery' && deliveryFee > 0 && (
                <p className="text-xs text-espresso/50">
                  Add {formatPKR(FREE_DELIVERY_OVER - subtotal)} more for free delivery.
                </p>
              )}
              <div className="flex items-baseline justify-between border-t border-espresso/10 pt-4">
                <dt className="font-serif text-xl">Total</dt>
                <dd className="font-serif text-2xl">{formatPKR(total)}</dd>
              </div>
              <p className="text-xs text-espresso/50">Prices include tax.</p>
            </dl>
          </div>
        </aside>
      </div>
    </div>
  );
}
