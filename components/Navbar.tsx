'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from './ui/Logo';
import Magnetic from './ui/Magnetic';
import BrewToggle from './ui/BrewToggle';
import CartButton from './cart/CartButton';
import { site } from '@/lib/site';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-500 ${
        solid
          ? 'border-espresso/10 bg-cream/85 backdrop-blur-xl backdrop-saturate-150'
          : 'border-transparent bg-cream'
      }`}
    >
      <nav aria-label="Primary" className="container-x flex h-20 items-center justify-between">
        <Logo />

        <ul className="hidden items-center gap-6 md:flex lg:gap-10">
          {site.nav.map((link) => {
            const current = link.href === pathname;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={current ? 'page' : undefined}
                  className={`link-underline text-sm tracking-wide transition-colors hover:text-espresso ${
                    current ? 'text-terracotta after:scale-x-100' : 'text-espresso/80'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3 lg:gap-5">
          <BrewToggle />
          <CartButton />
          <Magnetic className="hidden lg:inline-flex" strength={0.25}>
            <Link href="/menu" className="btn-primary px-6 py-3">
              Order Now
            </Link>
          </Magnetic>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="relative flex h-11 w-11 items-center justify-center md:hidden"
          >
            <span
              className={`absolute h-px w-6 bg-espresso transition-transform duration-300 ${
                open ? 'rotate-45' : '-translate-y-1.5'
              }`}
            />
            <span
              className={`absolute h-px w-6 bg-espresso transition-transform duration-300 ${
                open ? '-rotate-45' : 'translate-y-1.5'
              }`}
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden md:hidden"
          >
            <ul className="container-x flex flex-col gap-1 pb-8 pt-2">
              {site.nav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={link.href === pathname ? 'page' : undefined}
                    className={`block border-b border-espresso/10 py-4 font-serif text-3xl ${
                      link.href === pathname ? 'italic text-terracotta' : ''
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-6">
                <Link href="/menu" onClick={() => setOpen(false)} className="btn-primary w-full">
                  Order Now
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
