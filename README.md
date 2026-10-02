# Coffee O’Clock — Landing Page

A chic, editorial one-page site for **Coffee O’Clock**, a specialty café brewing in Lahore, Karachi and Islamabad.

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS** and **Framer Motion**, using `next/font` for Playfair Display (headings) and Inter (body).

## Interactive touches

All built with CSS animations and plain React (no extra libraries):

- **Scroll mug** (`components/ui/ScrollMug.tsx`): fills with coffee as you scroll, steams when full, click to go back to the top.
- **Brew mode** (`components/ui/BrewToggle.tsx`): light roast / dark roast switch in the navbar. Colours are CSS variables in `app/globals.css`; the choice is saved in the browser and defaults to the visitor's system setting.
- **Steam on menu cards**: hot drinks steam on hover, the iced cold brew fizzes instead (`.steam` / `.bubbles` in `globals.css`).
- **Coffee O’Clock dial** (`components/CoffeeClock.tsx`): twelve hours, twelve drinks. It turns to the current Lahore hour, and visitors can spin it by click, arrows or keyboard. Edit the `drinks` list to change the line-up.

Everything respects the visitor's "reduce motion" setting.

## Getting started

Requires **Node.js 18.17+**.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Other scripts

| Command         | What it does                          |
| --------------- | ------------------------------------- |
| `npm run build` | Production build (type-checks + lints) |
| `npm run start` | Serve the production build            |
| `npm run lint`  | Run ESLint                            |

## Project structure

```
app/
  layout.tsx        Fonts, metadata, skip link
  page.tsx          Puts the sections together in order
  providers.tsx     Framer MotionConfig (respects reduced motion)
  globals.css       Tailwind layers + button / eyebrow utilities
components/
  Navbar.tsx        Sticky nav, blurs on scroll, mobile menu
  Hero.tsx          Split hero with arched image
  FeaturedDrinks.tsx  "The Ritual": four drinks, PKR pricing
  About.tsx         Brand story + stats
  Features.tsx      Why us: three-column grid
  Testimonials.tsx  Three-card grid
  Location.tsx      Map, hours, contact, directions
  CtaBanner.tsx     "Your table is waiting." + signup
  Footer.tsx        Links, socials, newsletter
  ui/               FadeIn, SectionHeading, NewsletterForm, Logo, Icons
lib/
  site.ts           Address, phone, hours, nav, socials, order URL
```

## Customising

- **Brand colours** live in `tailwind.config.ts`:
  `cream` `#FAF6F0`, `espresso` `#2B1B12`, `gold` `#C9A227`, `terracotta` `#B4532A`
  (plus `cream-deep` and `espresso-soft` tints).
- **Contact details, hours, socials and the ordering link** are all in `lib/site.ts`.
  `orderUrl` is a placeholder WhatsApp link. Point it at your ordering platform.
- **Drinks, testimonials and copy** sit at the top of each component file.
- **Images** are Unsplash placeholders loaded through `next/image`
  (`images.unsplash.com` is allowed in `next.config.mjs`). Drop your own photos into `/public`
  and swap the `src` values when you have a shoot.
- **Newsletter forms** show a confirmation message but don’t send data anywhere yet.
  Connect `handleSubmit` in `components/ui/NewsletterForm.tsx` to your email provider.
- **Map**: a keyless Google Maps embed. Swap `mapsEmbedUrl` in `lib/site.ts` for an
  embed from Google Maps → Share → Embed once the exact pin is set.

## Accessibility notes

- Semantic landmarks (`header`, `nav`, `main`, `section` with `aria-labelledby`, `footer`)
- Skip-to-content link, visible focus rings, labelled icon buttons and form fields
- All images have descriptive `alt` text; decorative shapes are `aria-hidden`
- Animations and smooth scrolling turn off when the OS asks for reduced motion
