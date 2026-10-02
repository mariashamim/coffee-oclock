import type { ReactNode } from 'react';
import FadeIn from './FadeIn';

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
};

export default function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'light',
}: SectionHeadingProps) {
  return (
    <FadeIn className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <p className={tone === 'dark' ? 'eyebrow text-gold' : 'eyebrow'}>{eyebrow}</p>
      <h2
        id={id}
        className="mt-5 font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-6 text-base leading-relaxed sm:text-lg ${
            tone === 'dark' ? 'text-foam/70' : 'text-espresso/70'
          }`}
        >
          {description}
        </p>
      )}
    </FadeIn>
  );
}
