import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Checkout from '@/components/checkout/Checkout';

export const metadata: Metadata = {
  title: 'Checkout — Coffee O’Clock',
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Checkout />
      </main>
      <Footer />
    </>
  );
}
