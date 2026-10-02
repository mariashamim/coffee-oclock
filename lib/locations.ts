// Sample branches for the demo site. None of these are real cafés: addresses and
// phone numbers are made up, and the map simply centres on the neighbourhood.

export type City = 'Lahore' | 'Karachi' | 'Islamabad';

export type CafeLocation = {
  id: string;
  city: City;
  name: string; // neighbourhood, shown as the branch name
  address: string;
  mapQuery: string; // what the map and directions search for
  phone: string;
  hours: { days: string; time: string }[];
  features: string[];
  flagship?: boolean;
};

export const cities: City[] = ['Lahore', 'Karachi', 'Islamabad'];

const everyday = [
  { days: 'Monday – Thursday', time: '8:00 am – 12:00 am' },
  { days: 'Friday', time: '8:00 am – 1:00 am' },
  { days: 'Saturday – Sunday', time: '9:00 am – 1:00 am' },
];

const lateNight = [
  { days: 'Monday – Thursday', time: '9:00 am – 2:00 am' },
  { days: 'Friday – Sunday', time: '9:00 am – 3:00 am' },
];

const office = [
  { days: 'Monday – Friday', time: '7:30 am – 10:00 pm' },
  { days: 'Saturday – Sunday', time: '9:00 am – 11:00 pm' },
];

export const locations: CafeLocation[] = [
  // Lahore
  {
    id: 'lahore-gulberg',
    city: 'Lahore',
    name: 'Gulberg',
    address: '42-C, MM Alam Road, Gulberg III',
    mapQuery: 'MM Alam Road, Gulberg III, Lahore',
    phone: '+92 42 3577 0001',
    hours: everyday,
    features: ['Flagship', 'Roastery bar', 'Rooftop seating'],
    flagship: true,
  },
  {
    id: 'lahore-dha',
    city: 'Lahore',
    name: 'DHA Phase 5',
    address: '18-CCA, Sector C, DHA Phase 5',
    mapQuery: 'DHA Phase 5, Lahore',
    phone: '+92 42 3577 0002',
    hours: lateNight,
    features: ['Open late', 'Outdoor patio'],
  },
  {
    id: 'lahore-johar-town',
    city: 'Lahore',
    name: 'Johar Town',
    address: '7-B, Block G1, Johar Town',
    mapQuery: 'Johar Town, Lahore',
    phone: '+92 42 3577 0003',
    hours: everyday,
    features: ['Study corner', 'Drive-thru'],
  },
  // Karachi
  {
    id: 'karachi-clifton',
    city: 'Karachi',
    name: 'Clifton',
    address: 'Shop 4, Block 5, Clifton',
    mapQuery: 'Block 5, Clifton, Karachi',
    phone: '+92 21 3587 0011',
    hours: lateNight,
    features: ['Sea breeze terrace', 'Open late'],
  },
  {
    id: 'karachi-dha',
    city: 'Karachi',
    name: 'DHA Phase 6',
    address: '26-C, Khayaban-e-Ittehad, DHA Phase 6',
    mapQuery: 'Khayaban-e-Ittehad, DHA Phase 6, Karachi',
    phone: '+92 21 3587 0012',
    hours: everyday,
    features: ['Brunch all day', 'Pet friendly'],
  },
  {
    id: 'karachi-pechs',
    city: 'Karachi',
    name: 'PECHS',
    address: 'Plot 11, Block 2, PECHS',
    mapQuery: 'Block 2, PECHS, Karachi',
    phone: '+92 21 3587 0013',
    hours: office,
    features: ['Work-friendly', 'Quick pickup counter'],
  },
  // Islamabad
  {
    id: 'islamabad-kohsar',
    city: 'Islamabad',
    name: 'Kohsar Market',
    address: 'Block 3, Kohsar Market, F-6/3',
    mapQuery: 'Kohsar Market, F-6, Islamabad',
    phone: '+92 51 2611 0021',
    hours: everyday,
    features: ['Margalla views', 'Outdoor seating'],
  },
  {
    id: 'islamabad-blue-area',
    city: 'Islamabad',
    name: 'Blue Area',
    address: 'Ground Floor, Jinnah Avenue, Blue Area',
    mapQuery: 'Jinnah Avenue, Blue Area, Islamabad',
    phone: '+92 51 2611 0022',
    hours: office,
    features: ['Work-friendly', 'Meeting room'],
  },
  {
    id: 'islamabad-f7',
    city: 'Islamabad',
    name: 'F-7 Markaz',
    address: 'Shop 9, Jinnah Super, F-7 Markaz',
    mapQuery: 'Jinnah Super Market, F-7, Islamabad',
    phone: '+92 51 2611 0023',
    hours: lateNight,
    features: ['Open late', 'Live music Fridays'],
  },
];

export const flagship = locations.find((l) => l.flagship)!;

export const findLocation = (id: string) => locations.find((l) => l.id === id);

// Keyless Google Maps embed and directions link for a branch.
export const mapEmbedUrl = (l: CafeLocation) =>
  `https://www.google.com/maps/embed?origin=mfe&pb=!1m2!2m1!1s${encodeURIComponent(`${l.mapQuery}, Pakistan`)}`;

export const directionsUrl = (l: CafeLocation) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${l.mapQuery}, Pakistan`)}`;

export const telHref = (phone: string) => `tel:${phone.replace(/\s/g, '')}`;
