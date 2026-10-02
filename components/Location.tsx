import FadeIn from './ui/FadeIn';
import SectionHeading from './ui/SectionHeading';
import { ArrowIcon, MailIcon, PhoneIcon, PinIcon } from './ui/Icons';
import { mapsDirectionsUrl, mapsEmbedUrl, site } from '@/lib/site';

const otherCities = [
  { city: 'Karachi', area: 'Khayaban-e-Ittehad, DHA Phase 6' },
  { city: 'Islamabad', area: 'Kohsar Market, F-6/3' },
];

export default function Location() {
  return (
    <section id="locations" aria-labelledby="locations-heading" className="py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          id="locations-heading"
          eyebrow="Visit us"
          title={
            <>
              Find your <span className="italic">corner.</span>
            </>
          }
          description="Our Lahore flagship sits on MM Alam Road: a little calmer inside than the street outside."
        />

        <div className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          <FadeIn className="lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden bg-cream-deep lg:aspect-auto lg:h-full lg:min-h-[480px]">
              <iframe
                src={mapsEmbedUrl}
                title="Map showing Coffee O’Clock on MM Alam Road, Gulberg III, Lahore"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0 grayscale-[70%] sepia-[25%]"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="lg:col-span-5">
            <div className="flex h-full flex-col">
              <h3 className="font-serif text-3xl">Lahore Flagship</h3>

              <ul className="mt-6 space-y-4 text-espresso/80">
                <li className="flex gap-4">
                  <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-terracotta" />
                  <address className="not-italic">
                    {site.address.line1}
                    <br />
                    {site.address.line2}
                  </address>
                </li>
                <li className="flex gap-4">
                  <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-terracotta" />
                  <a href={site.phoneHref} className="link-underline">
                    {site.phone}
                  </a>
                </li>
                <li className="flex gap-4">
                  <MailIcon className="mt-0.5 h-5 w-5 shrink-0 text-terracotta" />
                  <a href={`mailto:${site.email}`} className="link-underline">
                    {site.email}
                  </a>
                </li>
              </ul>

              <table className="mt-10 w-full text-sm">
                <caption className="mb-3 text-left text-xs font-medium uppercase tracking-eyebrow text-terracotta">
                  Opening hours
                </caption>
                <tbody>
                  {site.hours.map((row) => (
                    <tr key={row.days} className="border-b border-espresso/10">
                      <th scope="row" className="py-3.5 text-left font-normal text-espresso/70">
                        {row.days}
                      </th>
                      <td className="py-3.5 text-right font-medium">{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <a
                href={mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary group mt-10 self-start"
              >
                Get Directions
                <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                <span className="sr-only">(opens Google Maps in a new tab)</span>
              </a>

              <div className="mt-12 grid gap-6 border-t border-espresso/15 pt-8 sm:grid-cols-2">
                {otherCities.map((c) => (
                  <div key={c.city}>
                    <p className="font-serif text-xl">{c.city}</p>
                    <p className="mt-1 text-sm text-espresso/60">{c.area}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
