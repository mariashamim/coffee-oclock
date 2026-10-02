import Image from 'next/image';
import Link from 'next/link';
import FadeIn from './ui/FadeIn';
import SectionHeading from './ui/SectionHeading';
import Tilt from './ui/Tilt';
import AddToCartButton from './cart/AddToCartButton';
import { unsplash } from '@/lib/site';

const drinks = [
  {
    name: 'Signature Karak Latte',
    tag: 'House favourite',
    description:
      'Our love letter to the roadside chai stall: double espresso, slow-simmered karak spices and steamed milk, finished with a whisper of cardamom.',
    price: 750,
    hot: true,
    image: '1572442388796-11668a67e53d',
    alt: 'A creamy latte in a ceramic cup with delicate latte art',
  },
  {
    name: 'Saffron Cold Brew',
    tag: 'Seasonal',
    description:
      'Steeped for eighteen hours, then poured over ice with saffron-infused cream. Golden, silky and quietly indulgent.',
    price: 950,
    hot: false,
    image: '1461023058943-07fcbe16d735',
    alt: 'An iced cold brew coffee in a tall glass with cream swirling through it',
  },
  {
    name: 'Cardamom Cappuccino',
    tag: 'Spiced',
    description:
      'Equal parts espresso, milk and velvet foam, warmed with green cardamom ground fresh each morning.',
    price: 820,
    hot: true,
    image: '1509042239860-f550ce710b93',
    alt: 'Cappuccinos with latte art on a wooden table surrounded by potted herbs',
  },
  {
    name: 'Classic Flat White',
    tag: 'Purist',
    description:
      'A short, strong ristretto with a thin layer of microfoam. Nothing added, nothing to hide.',
    price: 780,
    hot: true,
    image: '1517701604599-bb29b565090c',
    alt: 'A milky coffee in a short glass on a warm wooden counter',
  },
];

// Hot drinks steam on hover; the iced one fizzes with these rising bubbles instead.
const bubbles = [
  { left: '15%', size: 6, delay: '0s' },
  { left: '40%', size: 4, delay: '0.6s' },
  { left: '62%', size: 7, delay: '1.1s' },
  { left: '80%', size: 5, delay: '0.3s' },
  { left: '28%', size: 5, delay: '1.5s' },
];

const formatPKR =(n: number) => `PKR ${n.toLocaleString('en-PK')}`;

export default function FeaturedDrinks() {
  return (
    <section id="menu" aria-labelledby="menu-heading" className="py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="menu-heading"
            eyebrow="Featured drinks"
            title={
              <>
                The <span className="italic">Ritual</span>
              </>
            }
            description="Four cups we’d make for a friend. Each one built on single-origin espresso and a little bit of home."
          />
          <FadeIn delay={0.1}>
            <Link
              href="/menu"
              className="link-underline inline-flex text-sm font-medium tracking-wide text-terracotta"
            >
              See the full menu
            </Link>
          </FadeIn>
        </div>

        <ul className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {drinks.map((drink, i) => (
            <li key={drink.name}>
              <FadeIn delay={i * 0.08} className="h-full">
                <article className="group h-full transition-transform duration-500 ease-out hover:-translate-y-2 motion-reduce:hover:translate-y-0">
                  <Tilt className="aspect-[4/5] overflow-hidden bg-cream-deep shadow-[0_0_0_rgba(43,27,18,0)] transition-shadow duration-500 group-hover:shadow-[0_30px_60px_-25px_rgba(43,27,18,0.45)]">
                    <AddToCartButton itemName={drink.name} variant="overlay" />
                    <Image
                      src={unsplash(drink.image, 900)}
                      alt={drink.alt}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {drink.hot ? (
                      <span aria-hidden="true" className="steam pointer-events-none absolute inset-x-0 top-[6%] z-[1] h-28">
                        <span />
                        <span />
                        <span />
                      </span>
                    ) : (
                      <span aria-hidden="true" className="bubbles pointer-events-none absolute inset-x-[30%] bottom-[22%] z-[1] h-32">
                        {bubbles.map((b, j) => (
                          <span
                            key={j}
                            style={{ left: b.left, width: b.size, height: b.size, animationDelay: b.delay }}
                          />
                        ))}
                      </span>
                    )}
                    <span className="absolute left-4 top-4 bg-cream/90 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] backdrop-blur-sm">
                      {drink.tag}
                    </span>
                  </Tilt>
                  <div className="mt-6 flex items-baseline justify-between gap-4 border-b border-espresso/15 pb-4">
                    <h3 className="font-serif text-2xl leading-tight">{drink.name}</h3>
                    <p className="shrink-0 text-sm font-medium text-terracotta">
                      {formatPKR(drink.price)}
                    </p>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-espresso/70">{drink.description}</p>
                </article>
              </FadeIn>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
