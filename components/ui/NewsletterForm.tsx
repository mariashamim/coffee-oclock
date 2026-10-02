'use client';

import { useId, useState, type FormEvent } from 'react';

type NewsletterFormProps = {
  tone?: 'light' | 'dark';
  compact?: boolean;
  buttonLabel?: string;
};

export default function NewsletterForm({
  tone = 'light',
  compact = false,
  buttonLabel = 'Subscribe',
}: NewsletterFormProps) {
  const id = useId();
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Connect this to your email provider (Mailchimp, Resend, ConvertKit…).
    setDone(true);
    setEmail('');
  }

  const dark = tone === 'dark';

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <label htmlFor={`${id}-email`} className="sr-only">
        Email address
      </label>
      <div
        className={`flex w-full items-center border-b transition-colors ${
          dark
            ? 'border-foam/30 text-foam focus-within:border-gold'
            : 'border-espresso/25 text-espresso focus-within:border-espresso'
        }`}
      >
        <input
          id={`${id}-email`}
          type="email"
          name="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setDone(false);
          }}
          placeholder="you@example.com"
          className={`min-w-0 flex-1 bg-transparent py-3 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 ${
            compact ? 'text-sm' : 'text-base'
          } ${dark ? 'placeholder:text-foam/40' : 'placeholder:text-espresso/40'}`}
        />
        <button
          type="submit"
          className={`shrink-0 py-3 pl-4 font-medium uppercase tracking-[0.18em] transition-colors ${
            compact ? 'text-[11px]' : 'text-xs'
          } ${dark ? 'text-gold hover:text-foam' : 'text-terracotta hover:text-espresso'}`}
        >
          {buttonLabel}
        </button>
      </div>
      <p
        role="status"
        aria-live="polite"
        className={`mt-3 min-h-[1.25rem] text-sm ${dark ? 'text-foam/70' : 'text-espresso/60'}`}
      >
        {done ? 'You’re on the list. Good things, never too often.' : ''}
      </p>
    </form>
  );
}
