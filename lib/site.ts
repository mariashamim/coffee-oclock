// Brand-wide details. Branch addresses, phones and hours live in lib/locations.ts.
// All contact details are sample data for the demo site.
export const site = {
  name: 'Coffee O’Clock',
  tagline: 'Your daily ritual, perfected.',
  phone: '+92 42 3577 0000', // head office
  phoneHref: 'tel:+924235770000',
  email: 'hello@coffeeoclock.pk',
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

export const unsplash = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
