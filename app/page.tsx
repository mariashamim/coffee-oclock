import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedDrinks from '@/components/FeaturedDrinks';
import CoffeeClock from '@/components/CoffeeClock';
import About from '@/components/About';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import Location from '@/components/Location';
import CtaBanner from '@/components/CtaBanner';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <FeaturedDrinks />
        <CoffeeClock />
        <About />
        <Features />
        <Testimonials />
        <Location />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
