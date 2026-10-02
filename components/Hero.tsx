'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useTransform, type Variants } from 'framer-motion';
import { ArrowIcon } from './ui/Icons';
import ClockBadge from './ui/ClockBadge';
import FloatingBeans from './ui/FloatingBeans';
import Magnetic from './ui/Magnetic';
import { unsplash } from '@/lib/site';
import { usePointerParallax } from '@/lib/usePointerParallax';

const ease = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { x, y } = usePointerParallax(sectionRef);
  // The photo drifts gently against the cursor; the clock drifts with it.
  const photoX = useTransform(x, (v) => v * -24);
  const photoY = useTransform(y, (v) => v * -18);
  const badgeX = useTransform(x, (v) => v * 30);
  const badgeY = useTransform(y, (v) => v * 24);

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden"
    >
      <FloatingBeans preset="hero" />

      <div className="container-x relative grid items-center gap-14 pb-20 pt-8 sm:pt-12 lg:grid-cols-12 lg:gap-8 lg:pb-32 lg:pt-16">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="lg:col-span-6 xl:col-span-6"
        >
          <motion.p
            variants={item}
            className="inline-flex items-center gap-3 rounded-full border border-espresso/15 bg-cream/60 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-espresso/80 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-terracotta opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-terracotta" />
            </span>
            Now brewing in Lahore
          </motion.p>

          <motion.h1
            id="hero-heading"
            variants={item}
            className="mt-8 font-serif text-[clamp(3.25rem,9vw,7rem)] leading-[0.92] tracking-[-0.02em]"
          >
            It’s always
            <span className="block italic text-terracotta">Coffee O’Clock.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-8 max-w-md text-lg leading-relaxed text-espresso/70 sm:text-xl"
          >
            Your daily ritual, perfected — brewed slow, poured with intention.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Magnetic className="w-full sm:w-auto">
              <Link href="/menu" className="btn-primary group w-full">
                Order Now
                <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <Link href="/menu" className="btn-secondary w-full">
                View Menu
              </Link>
            </Magnetic>
          </motion.div>

          <motion.dl
            variants={item}
            className="mt-14 flex gap-10 border-t border-espresso/10 pt-6 text-sm"
          >
            <div>
              <dt className="text-espresso/50">Open daily</dt>
              <dd className="mt-1 font-medium">8 am till late</dd>
            </div>
            <div>
              <dt className="text-espresso/50">Flagship</dt>
              <dd className="mt-1 font-medium">MM Alam Road, Gulberg</dd>
            </div>
          </motion.dl>
        </motion.div>

        <motion.div
          // Scale only (no opacity fade) so the hero image paints immediately for LCP.
          initial={{ scale: 0.97 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease }}
          className="relative mx-auto w-full max-w-md lg:col-span-6 lg:max-w-none lg:pl-10 xl:pl-16"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-cream-deep">
            <motion.div className="absolute -inset-6" style={{ x: photoX, y: photoY }}>
              <Image
                src={unsplash('1554118811-1e0d58224f24', 1600)}
                alt="A warm, softly lit café interior with wooden tables and hanging lights"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, (min-width: 640px) 28rem, 100vw"
                className="object-cover"
              />
            </motion.div>
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-roast/30 via-transparent to-transparent"
            />
          </div>

          <motion.div
            className="absolute -right-3 -top-8 z-10 sm:-right-8"
            style={{ x: badgeX, y: badgeY }}
          >
            <ClockBadge className="h-28 w-28 sm:h-36 sm:w-36" />
          </motion.div>

          <div className="absolute -bottom-6 left-0 bg-cream px-5 py-4 shadow-[0_20px_50px_-20px_rgba(43,27,18,0.35)] sm:-left-6 lg:left-0">
            <p className="text-[11px] uppercase tracking-[0.2em] text-terracotta">Today’s pour</p>
            <p className="mt-1 font-serif text-lg">Saffron Cold Brew</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
