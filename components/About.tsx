import Image from 'next/image';
import FadeIn from './ui/FadeIn';
import { unsplash } from '@/lib/site';

const stats = [
  { value: '12+', label: 'Blends' },
  { value: '3', label: 'Cities' },
  { value: '10k+', label: 'Cups poured' },
];

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="bg-cream-deep py-24 sm:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
        <FadeIn className="lg:col-span-5">
          <div className="relative">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={unsplash('1501339847302-ac426a4a7cbb', 1200)}
                alt="A glowing café sign and green pendant lamps above shelves in a dim, cozy coffee shop"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <p
              aria-hidden="true"
              className="absolute -bottom-5 right-5 font-serif text-5xl italic leading-none text-gold sm:text-6xl"
            >
              est. 2019
            </p>
          </div>
        </FadeIn>

        <div className="lg:col-span-7">
          <FadeIn>
            <p className="eyebrow">Our story</p>
            <h2
              id="about-heading"
              className="mt-5 font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
            >
              Brewed with <span className="italic">intention.</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-8 max-w-xl space-y-5 text-base leading-relaxed text-espresso/75 sm:text-lg">
              <p>
                In Pakistan, the best conversations have always happened over a cup: on dhaba
                benches at midnight, in college canteens, on chai breaks that quietly turn into
                the whole afternoon.
              </p>
              <p>
                Coffee O’Clock is our ode to that unhurried hour. We pair carefully sourced
                specialty coffee with the warmth of home, from cardamom and saffron to the karak
                we grew up on, and pour every cup as if you’re staying a while. You’re always
                welcome to.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <dl className="mt-12 grid max-w-xl grid-cols-3 border-t border-espresso/15">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`flex flex-col pt-6 ${i > 0 ? 'border-l border-espresso/15 pl-5 sm:pl-8' : ''}`}
                >
                  <dt className="order-2 mt-2 text-xs uppercase tracking-[0.2em] text-espresso/60">
                    {stat.label}
                  </dt>
                  <dd className="order-1 font-serif text-4xl tracking-tight sm:text-5xl">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
