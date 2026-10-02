import FadeIn from './ui/FadeIn';
import SectionHeading from './ui/SectionHeading';
import { ArmchairIcon, BeanIcon, HourglassIcon } from './ui/Icons';

const features = [
  {
    icon: BeanIcon,
    title: 'Single-origin beans',
    body: 'Traceable lots from Ethiopia, Colombia and Sumatra, roasted in small batches so every origin tastes like itself.',
  },
  {
    icon: HourglassIcon,
    title: 'Slow-brewed daily',
    body: 'Cold brew steeps overnight, spices are ground at dawn and every espresso is dialled in before the doors open.',
  },
  {
    icon: ArmchairIcon,
    title: 'Cozy spaces',
    body: 'Deep armchairs, warm light and plenty of plug points. Stay for a quick cup or a three-hour catch-up. No one will rush you.',
  },
];

export default function Features() {
  return (
    <section aria-labelledby="features-heading" className="py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          id="features-heading"
          eyebrow="Why Coffee O’Clock"
          title={
            <>
              Small details, <span className="whitespace-nowrap italic">done properly.</span>
            </>
          }
          align="center"
        />

        <ul className="mt-16 grid gap-px overflow-hidden border border-espresso/10 bg-espresso/10 md:grid-cols-3 lg:mt-20">
          {features.map(({ icon: Icon, title, body }, i) => (
            <li key={title} className="bg-cream">
              <FadeIn delay={i * 0.1} className="h-full p-8 sm:p-10 lg:p-12">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-roast text-gold">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-8 font-serif text-2xl">{title}</h3>
                <p className="mt-4 leading-relaxed text-espresso/70">{body}</p>
              </FadeIn>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
