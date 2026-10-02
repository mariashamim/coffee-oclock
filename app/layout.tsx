import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import Providers from './providers';
import CartRoot from '@/components/cart/CartRoot';
import CustomCursor from '@/components/ui/CustomCursor';
import ScrollMug from '@/components/ui/ScrollMug';
import { brewInitScript } from '@/lib/brew';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Coffee O’Clock — Specialty Coffee in Lahore',
  description:
    'Your daily ritual, perfected. Single-origin coffee, slow-brewed daily, with a nod to Pakistan’s love of a long chai break. Now brewing in Lahore, Karachi and Islamabad.',
  openGraph: {
    title: 'Coffee O’Clock',
    description: 'It’s always Coffee O’Clock. Specialty coffee, brewed slow, poured with intention.',
    locale: 'en_PK',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#FAF6F0',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the brew script sets data-brew on <html> before React loads.
    <html lang="en" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: brewInitScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-espresso focus:px-4 focus:py-2 focus:text-cream"
        >
          Skip to content
        </a>
        <Providers>
          <CartRoot>{children}</CartRoot>
          <ScrollMug />
          <CustomCursor />
        </Providers>
      </body>
    </html>
  );
}
