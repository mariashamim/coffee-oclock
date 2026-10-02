import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import FullMenu from '@/components/menu/FullMenu';
import CtaBanner from '@/components/CtaBanner';
import Footer from '@/components/Footer';
import FadeIn from '@/components/ui/FadeIn';

export const metadata: Metadata = {
  title: 'Menu — Coffee O’Clock',
  description:
    'The full Coffee O’Clock menu: espresso, signature lattes, cold brews, chai, fresh bakes and desserts, with prices in PKR.',
};

export default function MenuPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <header className="container-x pb-14 pt-10 sm:pb-16 sm:pt-16">
          <FadeIn>
            <p className="eyebrow">The full menu</p>
            <h1 className="mt-5 max-w-3xl font-serif text-[clamp(3rem,8vw,6rem)] leading-[0.95] tracking-tight">
              Something for <span className="italic text-terracotta">every hour.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-espresso/70">
              Espresso pulled to order, the lattes we’re known for, a proper cup of chai and bakes fresh from the oven
              each morning. Hover over a hot drink and watch it steam.
            </p>
          </FadeIn>
        </header>
        <FullMenu />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
