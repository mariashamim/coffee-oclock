import Logo from './ui/Logo';
import NewsletterForm from './ui/NewsletterForm';
import { socialIcons } from './ui/Icons';
import { site } from '@/lib/site';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-cream pt-20 sm:pt-24">
      <div className="container-x">
        <div className="grid gap-12 border-b border-espresso/10 pb-16 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo className="text-3xl" />
            <p className="mt-5 max-w-xs leading-relaxed text-espresso/70">
              Specialty coffee with a Pakistani soul. Brewed slow, poured with intention, in
              Lahore, Karachi and Islamabad.
            </p>
            <ul className="mt-8 flex gap-3" aria-label="Social media">
              {site.social.map(({ name, href }) => {
                const Icon = socialIcons[name];
                return (
                  <li key={name}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Coffee O’Clock on ${name}`}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-espresso/15 transition-colors hover:border-espresso hover:bg-espresso hover:text-cream"
                    >
                      <Icon className="h-[18px] w-[18px]" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <h2 className="text-xs font-medium uppercase tracking-eyebrow text-terracotta">Explore</h2>
            <ul className="mt-5 space-y-3">
              {site.nav.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="link-underline text-espresso/80 hover:text-espresso">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#order" className="link-underline text-espresso/80 hover:text-espresso">
                  Order Now
                </a>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="text-xs font-medium uppercase tracking-eyebrow text-terracotta">Say salaam</h2>
            <address className="mt-5 space-y-3 not-italic text-espresso/80">
              <p>
                {site.address.line1}
                <br />
                {site.address.line2}
              </p>
              <p>
                <a href={site.phoneHref} className="link-underline">
                  {site.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${site.email}`} className="link-underline">
                  {site.email}
                </a>
              </p>
            </address>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-xs font-medium uppercase tracking-eyebrow text-terracotta">
              The Weekly Pour
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-espresso/70">
              New blends and quiet events, once a week at most.
            </p>
            <div className="mt-2">
              <NewsletterForm compact />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 py-8 text-sm text-espresso/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Coffee O’Clock. All rights reserved.</p>
          <p>Made with care (and a lot of coffee) in Lahore.</p>
        </div>
      </div>
    </footer>
  );
}
