export interface DealershipLocation {
  id: string;
  name: string;
  shortName: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  googleMapsUrl: string;
}

/**
 * Verified Official & Authorized Toyota Dealership Network across Zimbabwe
 * Includes CFAO Mobility Zimbabwe (Official Distributor) & Croco Toyota branches
 */
export const TOYOTA_ZIMBABWE_DEALERSHIPS: DealershipLocation[] = [
  {
    id: 'cfao-harare',
    name: 'CFAO Toyota Harare (Head Office)',
    shortName: 'Harare (HQ)',
    city: 'Harare',
    address: '59-61 Coventry Road, Workington, Harare',
    phone: '+263 (24) 2750031 / 9',
    email: 'sales.harare@cfao.com',
    hours: 'Mon - Fri: 8:00 AM - 5:00 PM | Sat: 8:00 AM - 12:00 PM',
    coordinates: { lat: -17.8488, lng: 31.0264 },
    googleMapsUrl: 'https://maps.google.com/?q=-17.8488,31.0264'
  },
  {
    id: 'croco-harare',
    name: 'Croco Toyota Harare',
    shortName: 'Harare (Seke Rd)',
    city: 'Harare',
    address: '100 Seke Road, Graniteside, Harare',
    phone: '+263 (24) 2772591',
    email: 'sales.croco@croco.co.zw',
    hours: 'Mon - Fri: 8:00 AM - 5:00 PM | Sat: 8:00 AM - 1:00 PM',
    coordinates: { lat: -17.8576, lng: 31.0601 },
    googleMapsUrl: 'https://maps.google.com/?q=-17.8576,31.0601'
  },
  {
    id: 'cfao-bulawayo',
    name: 'CFAO Toyota Bulawayo',
    shortName: 'Bulawayo',
    city: 'Bulawayo',
    address: 'Corner 12th Avenue & Fife Street, Bulawayo',
    phone: '+263 (29) 2262521 / 5',
    email: 'sales.bulawayo@cfao.com',
    hours: 'Mon - Fri: 8:00 AM - 5:00 PM | Sat: 8:00 AM - 12:00 PM',
    coordinates: { lat: -20.1585, lng: 28.5833 },
    googleMapsUrl: 'https://maps.google.com/?q=-20.1585,28.5833'
  },
  {
    id: 'byword-masvingo',
    name: 'Byword Motors (Masvingo Authorized Dealer)',
    shortName: 'Masvingo',
    city: 'Masvingo',
    address: '67 Hughes Street, Masvingo',
    phone: '+263 (39) 2262704',
    email: 'service.masvingo@byword.co.zw',
    hours: 'Mon - Fri: 8:00 AM - 5:00 PM',
    coordinates: { lat: -20.0734, lng: 30.8285 },
    googleMapsUrl: 'https://maps.google.com/?q=-20.0734,30.8285'
  },
  {
    id: 'cfao-mutare',
    name: 'CFAO Toyota Mutare',
    shortName: 'Mutare',
    city: 'Mutare',
    address: '15 Herbert Chitepo Street, Mutare',
    phone: '+263 (20) 2061234 / 5',
    email: 'sales.mutare@cfao.com',
    hours: 'Mon - Fri: 8:00 AM - 5:00 PM | Sat: 8:00 AM - 12:00 PM',
    coordinates: { lat: -18.9744, lng: 32.6685 },
    googleMapsUrl: 'https://maps.google.com/?q=-18.9744,32.6685'
  },
  {
    id: 'cfao-gweru',
    name: 'CFAO Toyota Gweru',
    shortName: 'Gweru',
    city: 'Gweru',
    address: '18 Robert Mugabe Way, Gweru',
    phone: '+263 (54) 2221456',
    email: 'sales.gweru@cfao.com',
    hours: 'Mon - Fri: 8:00 AM - 5:00 PM | Sat: 8:00 AM - 12:00 PM',
    coordinates: { lat: -19.4589, lng: 29.8153 },
    googleMapsUrl: 'https://maps.google.com/?q=-19.4589,29.8153'
  },
  {
    id: 'cfao-kadoma',
    name: 'CFAO Toyota Kadoma',
    shortName: 'Kadoma',
    city: 'Kadoma',
    address: '5 Fourth Street, Kadoma',
    phone: '+263 (68) 2422150',
    email: 'sales.kadoma@cfao.com',
    hours: 'Mon - Fri: 8:00 AM - 5:00 PM',
    coordinates: { lat: -18.3333, lng: 29.9167 },
    googleMapsUrl: 'https://maps.google.com/?q=-18.3333,29.9167'
  },
  {
    id: 'lowveld-chiredzi',
    name: 'Lowveld Toyota (Chiredzi Authorized Dealer)',
    shortName: 'Chiredzi',
    city: 'Chiredzi',
    address: '32 Guava Road, Chiredzi',
    phone: '+263 (31) 2722801',
    email: 'sales.chiredzi@lowveld.co.zw',
    hours: 'Mon - Fri: 8:00 AM - 5:00 PM',
    coordinates: { lat: -21.0500, lng: 31.6667 },
    googleMapsUrl: 'https://maps.google.com/?q=-21.0500,31.6667'
  },
  {
    id: 'croco-vicfalls',
    name: 'Croco Toyota Victoria Falls',
    shortName: 'Victoria Falls',
    city: 'Victoria Falls',
    address: 'Stand 433, Kazungula Road, Victoria Falls',
    phone: '+263 (83) 2844222',
    email: 'sales.vicfalls@croco.co.zw',
    hours: 'Mon - Fri: 8:00 AM - 5:00 PM',
    coordinates: { lat: -17.9333, lng: 25.8333 },
    googleMapsUrl: 'https://maps.google.com/?q=-17.9333,25.8333'
  }
];
