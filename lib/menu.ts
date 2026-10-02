// Sample menu for Coffee O’Clock. Edit freely: the menu page renders straight from this file.

export type Temp = 'hot' | 'iced';
export type Tag = 'signature' | 'new' | 'seasonal' | 'veg';

export type MenuItem = {
  name: string;
  description: string;
  price: number; // PKR
  temp?: Temp; // drinks only; food has no temperature
  tags?: Tag[];
};

export type MenuCategory = {
  id: string;
  title: string;
  blurb: string;
  image: string; // Unsplash photo id
  alt: string;
  items: MenuItem[];
};

export const tagLabels: Record<Tag, string> = {
  signature: 'Signature',
  new: 'New',
  seasonal: 'Seasonal',
  veg: 'Vegetarian',
};

export const menu: MenuCategory[] = [
  {
    id: 'espresso-bar',
    title: 'Espresso Bar',
    blurb: 'Our house blend, pulled to order. Medium roast, with notes of cocoa, toasted almond and a little dried cherry.',
    image: '1511920170033-f8396924c348',
    alt: 'Freshly ground coffee in a portafilter beside a bag of beans',
    items: [
      { name: 'Espresso', description: 'A single, syrupy shot. The purest way to meet the blend.', price: 450, temp: 'hot' },
      { name: 'Double Espresso', description: 'Two clean shots for when the day needs a push.', price: 550, temp: 'hot' },
      { name: 'Macchiato', description: 'Espresso marked with a spoon of velvet foam.', price: 520, temp: 'hot' },
      { name: 'Cortado', description: 'Equal parts espresso and warm milk. Small, strong, balanced.', price: 650, temp: 'hot' },
      { name: 'Long Black', description: 'A double shot over hot water. Bright and easy to linger over.', price: 600, temp: 'hot' },
      { name: 'Classic Flat White', description: 'A short ristretto with thin, glossy microfoam.', price: 780, temp: 'hot' },
      { name: 'Cappuccino', description: 'A third espresso, a third milk, a third foam.', price: 720, temp: 'hot' },
      { name: 'Café Latte', description: 'A double shot, plenty of silky milk and a quiet bit of latte art.', price: 740, temp: 'hot' },
    ],
  },
  {
    id: 'signatures',
    title: 'Signatures',
    blurb: 'The drinks we’re known for. Specialty coffee, with flavours we grew up on.',
    image: '1541167760496-1628856ab772',
    alt: 'Steamed milk being poured into a latte to make latte art',
    items: [
      { name: 'Signature Karak Latte', description: 'Double espresso, slow-simmered karak spices and steamed milk, finished with cardamom.', price: 750, temp: 'hot', tags: ['signature'] },
      { name: 'Cardamom Cappuccino', description: 'Velvet foam and green cardamom, ground fresh every morning.', price: 820, temp: 'hot' },
      { name: 'Pistachio Latte', description: 'House-made pistachio paste, espresso and steamed milk, topped with crushed pistachio.', price: 880, temp: 'hot', tags: ['new'] },
      { name: 'Gulab Latte', description: 'Rose syrup, a single shot and warm milk. A nod to gulab jamun.', price: 840, temp: 'hot' },
      { name: 'Honey Cinnamon Macchiato', description: 'Wildflower honey and Ceylon cinnamon under a cloud of foam.', price: 860, temp: 'hot' },
      { name: 'Midnight Mocha', description: 'Dark chocolate, a double shot and a pinch of sea salt.', price: 890, temp: 'hot', tags: ['signature'] },
    ],
  },
  {
    id: 'cold-iced',
    title: 'Cold & Iced',
    blurb: 'For Lahore summers, and honestly most of spring and autumn too.',
    image: '1578314675249-a6910f80cc4e',
    alt: 'An iced latte with a paper straw on a café table',
    items: [
      { name: 'Saffron Cold Brew', description: 'Eighteen-hour cold brew with saffron-infused cream, poured over ice.', price: 950, temp: 'iced', tags: ['signature'] },
      { name: 'Sindhri Mango Cold Brew', description: 'Cold brew shaken with fresh Sindhri mango purée. Only while the mangoes last.', price: 990, temp: 'iced', tags: ['seasonal'] },
      { name: 'Gur Cold Brew', description: 'Sweetened with jaggery syrup for a deep, toffee-like finish.', price: 880, temp: 'iced', tags: ['new'] },
      { name: 'Classic Cold Brew', description: 'Smooth, low-acid and steeped overnight. Black or with a splash of milk.', price: 780, temp: 'iced' },
      { name: 'Iced Spanish Latte', description: 'Condensed milk, espresso and plenty of ice.', price: 820, temp: 'iced' },
      { name: 'Iced Americano', description: 'A double shot over cold water and ice. Crisp and clean.', price: 620, temp: 'iced' },
      { name: 'Affogato', description: 'A scoop of vanilla gelato, drowned in a hot double shot.', price: 850, temp: 'iced' },
    ],
  },
  {
    id: 'chai',
    title: 'Chai & Not Coffee',
    blurb: 'Because every table has someone who just wants a proper cup of chai.',
    image: '1571934811356-5cc061b6821f',
    alt: 'A cup of tea surrounded by spices on a rustic wooden table',
    items: [
      { name: 'Doodh Patti', description: 'Strong black tea brewed in milk, the way it’s done at home.', price: 450, temp: 'hot' },
      { name: 'Masala Chai', description: 'Black tea simmered with ginger, clove, cinnamon and cardamom.', price: 480, temp: 'hot' },
      { name: 'Kashmiri Chai', description: 'Pink tea with a pinch of salt, crushed pistachio and almond.', price: 650, temp: 'hot', tags: ['signature'] },
      { name: 'Ceremonial Matcha Latte', description: 'Stone-ground Japanese matcha whisked into steamed milk.', price: 850, temp: 'hot' },
      { name: 'Hot Chocolate', description: '70% dark chocolate, melted slowly into whole milk.', price: 780, temp: 'hot' },
      { name: 'Fresh Mint Lemonade', description: 'Lemon, mint and a little sugar, blended with crushed ice.', price: 550, temp: 'iced' },
    ],
  },
  {
    id: 'bakes',
    title: 'Bakes & Bites',
    blurb: 'Baked every morning in our Gulberg kitchen. When they’re gone, they’re gone.',
    image: '1555507036-ab1f4038808a',
    alt: 'A golden butter croissant dusted with flour on a dark surface',
    items: [
      { name: 'Butter Croissant', description: 'Seventy-two hours of laminating for a shatteringly flaky crust.', price: 520, tags: ['veg'] },
      { name: 'Almond Croissant', description: 'Twice-baked with frangipane and toasted flaked almonds.', price: 680, tags: ['veg'] },
      { name: 'Cardamom Bun', description: 'Soft, knotted and glazed with cardamom sugar.', price: 590, tags: ['veg', 'signature'] },
      { name: 'Chicken Tikka Croissant', description: 'Smoky tikka, mint chutney and pickled onion in a warm croissant.', price: 890 },
      { name: 'Banana Bread', description: 'Toasted, with salted butter. Ask for a drizzle of honey.', price: 480, tags: ['veg'] },
      { name: 'Brown Butter Cookie', description: 'Dark chocolate chunks and flaky salt, baked to order.', price: 380, tags: ['veg'] },
    ],
  },
  {
    id: 'sweet',
    title: 'Something Sweet',
    blurb: 'To share, or not. We won’t judge.',
    image: '1533134242443-d4fd215305ad',
    alt: 'A slice of creamy cheesecake topped with berries',
    items: [
      { name: 'Basque Burnt Cheesecake', description: 'Caramelised outside, barely set inside. Served at room temperature.', price: 950, tags: ['veg', 'signature'] },
      { name: 'Pistachio Tres Leches', description: 'Sponge soaked in three milks, finished with pistachio cream.', price: 890, tags: ['veg'] },
      { name: 'Gajar Halwa Tart', description: 'Slow-cooked carrot halwa in a buttery tart shell with khoya cream.', price: 780, tags: ['veg', 'seasonal'] },
      { name: 'Tiramisu Jar', description: 'Espresso-soaked sponge, mascarpone and cocoa, layered to order.', price: 860, tags: ['veg'] },
    ],
  },
];

export const addOns = [
  { name: 'Oat or almond milk', price: 150 },
  { name: 'Extra shot', price: 200 },
  { name: 'Vanilla, caramel or hazelnut syrup', price: 120 },
  { name: 'Make it iced', price: 0 },
];
