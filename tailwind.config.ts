import type { Config } from 'tailwindcss';

// Every colour is a CSS variable (see app/globals.css) so "brew mode" can swap the
// whole palette by toggling data-brew="dark" on <html>.
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  darkMode: ['selector', '[data-brew="dark"]'],
  theme: {
    extend: {
      colors: {
        // Page surface and main ink. These swap in dark roast.
        cream: {
          DEFAULT: token('cream'),
          deep: token('cream-deep'),
        },
        espresso: {
          DEFAULT: token('espresso'),
          soft: token('espresso-soft'),
        },
        // Always-dark surfaces and the light ink that sits on them.
        roast: token('roast'),
        foam: token('foam'),
        coffee: token('coffee'),
        gold: token('gold'),
        terracotta: token('terracotta'),
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        eyebrow: '0.25em',
      },
    },
  },
  plugins: [],
};

export default config;
