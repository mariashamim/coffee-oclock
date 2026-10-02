// Single source of truth for brand details used across sections.
export const site = {
  name: 'Coffee O’Clock',
  tagline: 'Your daily ritual, perfected.',
  // Placeholder ordering link (WhatsApp). Swap for your ordering platform.
  orderUrl: 'https://wa.me/924235770000',
  phone: '+92 42 3577 0000',
  phoneHref: 'tel:+924235770000',
  email: 'hello@coffeeoclock.pk',
  address: {
    line1: '42-C, MM Alam Road',
    line2: 'Gulberg III, Lahore 54660',
  },
  mapQuery: 'MM Alam Road, Gulberg III, Lahore, Pakistan',
  hours: [
    { days: 'Monday – Thursday', time: '8:00 am – 12:00 am' },
    { days: 'Friday', time: '8:00 am – 1:00 am' },
    { days: 'Saturday – Sunday', time: '9:00 am – 1:00 am' },
  ],
  nav: [
    { href: '/menu', label: 'Menu' },
    { href: '/#about', label: 'About' },
    { href: '/#locations', label: 'Locations' },
    { href: '#contact', label: 'Contact' },
  ],
  social: [
    { name: 'Instagram', href: 'https://instagram.com' },
    { name: 'Facebook', href: 'https://facebook.com' },
    { name: 'TikTok', href: 'https://tiktok.com' },
  ],
} as const;

export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.mapQuery)}`;
// Keyless embed. For an exact pin, replace with the URL from Google Maps → Share → Embed a map.
export const mapsEmbedUrl = `https://www.google.com/maps/embed?origin=mfe&pb=!1m2!2m1!1s${encodeURIComponent(site.mapQuery)}`;

export const unsplash = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
