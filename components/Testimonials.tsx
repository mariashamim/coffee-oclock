import FadeIn from './ui/FadeIn';
import SectionHeading from './ui/SectionHeading';

const testimonials = [
  {
    quote:
      'The karak latte tastes exactly like my nani’s chai, just dressed up for the evening. I come for one cup and end up staying till close.',
    name: 'Ayesha Khan',
    detail: 'Gulberg, Lahore',
  },
  {
    quote:
      'Finally, a café in Karachi that takes coffee seriously without taking itself too seriously. The saffron cold brew got me through exam season.',
    name: 'Hamza Siddiqui',
    detail: 'DHA, Karachi',
  },
  {
    quote:
      'Quiet corners, kind staff, a flat white that never misses. It’s become my Sunday morning ritual with my father.',
    name: 'Mahnoor Farooq',
    detail: 'F-7, Islamabad',
  },
];

export default function Testimonials() {
  return (
    <section aria-labelledby="testimonials-heading" data-theme="dark" className="bg-roast py-24 text-foam sm:py-32">
      <div className="container-x">
        <SectionHeading
          id="testimonials-heading"
          eyebrow="Kind words"
          title={
            <>
              Overheard at the <span className="italic text-gold">counter.</span>
            </>
          }
          tone="dark"
        />

        <ul className="mt-16 grid gap-6 md:grid-cols-3 lg:mt-20">
          {testimonials.map((t, i) => (
            <li key={t.name}>
              <FadeIn delay={i * 0.1} className="h-full">
                <figure className="flex h-full flex-col border border-foam/15 p-8 sm:p-10">
                  <span aria-hidden="true" className="font-serif text-6xl leading-none text-gold">
                    “
                  </span>
                  <blockquote className="mt-2 flex-1 font-serif text-xl italic leading-relaxed text-foam/90">
                    <p>{t.quote}</p>
                  </blockquote>
                  <figcaption className="mt-10 border-t border-foam/15 pt-6">
                    <p className="font-medium">{t.name}</p>
                    <p className="mt-1 text-sm text-foam/60">{t.detail}</p>
                  </figcaption>
                </figure>
              </FadeIn>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
