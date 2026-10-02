import FadeIn from './ui/FadeIn';
import FloatingBeans from './ui/FloatingBeans';
import Magnetic from './ui/Magnetic';
import NewsletterForm from './ui/NewsletterForm';
import { ArrowIcon } from './ui/Icons';
import { site } from '@/lib/site';

export default function CtaBanner() {
  return (
    <section
      id="order"
      aria-labelledby="cta-heading"
      data-theme="dark"
      className="relative overflow-hidden bg-roast py-24 text-foam sm:py-32"
    >
      <FloatingBeans preset="banner" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full border border-gold/20"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-[28rem] w-[28rem] rounded-full border border-gold/10"
      />

      <div className="container-x relative grid items-end gap-14 lg:grid-cols-12">
        <FadeIn className="lg:col-span-7">
          <p className="eyebrow text-gold">Pull up a chair</p>
          <h2
            id="cta-heading"
            className="mt-5 font-serif text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.95] tracking-tight"
          >
            Your table is <span className="italic text-gold">waiting.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-foam/70">
            Order ahead for pickup or delivery across Lahore, or join our list for new blends,
            seasonal pours and the occasional invitation to a cupping night.
          </p>
        </FadeIn>

        <FadeIn delay={0.15} className="lg:col-span-5">
          <Magnetic className="w-full sm:w-auto">
            <a
              href={site.orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold group w-full"
            >
              Order Now
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </Magnetic>
          <div className="mt-10">
            <p className="text-sm text-foam/60">Or get the good news first:</p>
            <div className="mt-2">
              <NewsletterForm tone="dark" buttonLabel="Join the list" />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
