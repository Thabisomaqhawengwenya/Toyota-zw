import type { Vehicle, ServiceItem } from '../types';

export const mockVehicles: Vehicle[] = [
  {
    id: 'starlet',
    modelName: 'Toyota Starlet',
    category: 'City',
    imageUrl: '/images/starlet.jpg',
    priceRange: '$22,500 - $26,000',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    engineCc: '1462 cc',
    powerHp: '103 Hp',
    description: 'Sleek, vibrant, and highly efficient. The Toyota Starlet is the perfect city companion, packed with smart connectivity and modern tech.',
    features: ['7-inch Touchscreen Display', 'Apple CarPlay & Android Auto', 'Reverse Camera', 'LED Headlights', 'Fuel efficiency of 5.7L/100km']
  },
  {
    id: 'corolla',
    modelName: 'Toyota Corolla Sedan',
    category: 'Sedan',
    imageUrl: '/images/corolla.png',
    priceRange: '$29,000 - $34,500',
    fuelType: 'Petrol',
    transmission: 'CVT',
    engineCc: '1798 cc',
    powerHp: '138 Hp',
    description: 'The world\'s best-selling sedan. Uncompromising reliability meets updated sleek styling, superb ride comfort, and safety.',
    features: ['Toyota Safety Sense', '10.5-inch Infotainment screen', 'Pre-Collision System', 'Adaptive Cruise Control', 'Leather Seats']
  },
  {
    id: 'starlet-cross',
    modelName: 'Toyota Starlet Cross',
    category: 'SUV',
    imageUrl: '/images/starlet_cross.jpeg',
    priceRange: '$26,000 - $29,900',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    engineCc: '1462 cc',
    powerHp: '103 Hp',
    description: 'Compact crossover attitude. Combining the agile footprint of a hatchback with the raised ground clearance and bold presence of an SUV.',
    features: ['Raised Ride Height', 'Rugged Styling Cladding', '9-inch Touchscreen Screen', '360 View Monitor', 'Wireless Charger']
  },
  {
    id: 'urban-cruiser',
    modelName: 'Toyota Urban Cruiser',
    category: 'SUV',
    imageUrl: '/images/Toyota_Urban_Cruiser.jpeg',
    priceRange: '$28,500 - $32,000',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    engineCc: '1462 cc',
    powerHp: '103 Hp',
    description: 'Adventure-ready crossover design. The Urban Cruiser is styled for the modern explorer, offering ample space and robust performance.',
    features: ['Push Start Button', 'Automatic Climate Control', '17-inch Alloy Wheels', 'Rear Parking Sensors', 'Spacious Cargo Area']
  },
  {
    id: 'corolla-cross-hev',
    modelName: 'Toyota Corolla Cross Hybrid (HEV)',
    category: 'SUV',
    imageUrl: '/images/corolla-cross-hev.png',
    priceRange: '$38,000 - $44,000',
    fuelType: 'Hybrid (Petrol/Electric)',
    transmission: 'HEV E-CVT',
    engineCc: '1798 cc',
    powerHp: '121 Hp',
    description: 'Sustainable power meets everyday utility. The Corolla Cross HEV combines a hybrid engine with crossover space and next-generation safety.',
    features: ['Dual-Zone Climate Control', 'EV Mode', 'Smart Entry System', 'Active Cornering Assist', 'Fuel economy of 4.3L/100km']
  },
  {
    id: 'rav4',
    modelName: 'Toyota RAV4',
    category: 'SUV',
    imageUrl: '/images/rav4.png',
    priceRange: '$45,000 - $55,000',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    engineCc: '1987 cc',
    powerHp: '170 Hp',
    description: 'Dynamic styling, premium cabin comfort, and multi-terrain capability. The RAV4 is built to inspire and handle diverse road environments.',
    features: ['AWD with Intelligence', 'Panoramic Sunroof', 'Power Back Door', 'Heated & Ventilated Seats', 'Wireless Phone Charging']
  },
  {
    id: 'prado',
    modelName: 'Toyota Land Cruiser Prado',
    category: '4x4',
    imageUrl: '/images/prado.png',
    priceRange: '$85,000 - $110,000',
    fuelType: 'Diesel',
    transmission: 'Automatic',
    engineCc: '2755 cc',
    powerHp: '201 Hp',
    description: 'Unrivaled 4x4 pedigree. The all-new Land Cruiser Prado merges luxurious comfort with unstoppable off-road engineering and smart terrain select.',
    features: ['Multi-Terrain Select (MTS)', 'Crawling Control', '12.3-inch Toyota Audio Multimedia', 'Full-time 4WD', '3-Row 7 Seat Layout']
  },
  {
    id: 'lc300',
    modelName: 'Toyota Land Cruiser 300',
    category: '4x4',
    imageUrl: '/images/lc300.png',
    priceRange: '$120,000 - $145,000',
    fuelType: 'Diesel',
    transmission: 'Automatic',
    engineCc: '3346 cc (Twin Turbo)',
    powerHp: '302 Hp',
    description: 'The absolute pinnacle of luxury and ultimate off-road power. A legendary presence designed to conquer the harshest terrains on earth.',
    features: ['3.3L V6 Twin-Turbo Diesel', '10-Speed Automatic', 'E-KDSS Suspension System', 'Heated Steering Wheel', 'Pre-Crash Safety System']
  },
  {
    id: 'lc76',
    modelName: 'Toyota Land Cruiser 76 Station Wagon',
    category: '4x4',
    imageUrl: '/images/Toyota_Land_Cruiser_76_Station_Wagon.jpeg',
    priceRange: '$68,000 - $78,000',
    fuelType: 'Diesel',
    transmission: 'Manual',
    engineCc: '4164 cc',
    powerHp: '128 Hp',
    description: 'The workhorse of Africa. Simple, pure mechanical engineering built to endure generations of heavy commercial and overland travel.',
    features: ['Rigid Front & Rear Axles', 'Manual 4WD Transfer Lever', 'Snorkel Air Intake', '130L Fuel Tank Capacity', 'Differential Locks']
  },
  {
    id: 'hilux',
    modelName: 'Toyota Hilux Double Cab',
    category: 'Pick-up',
    imageUrl: '/images/hilux.png',
    priceRange: '$40,000 - $65,000',
    fuelType: 'Diesel',
    transmission: 'Automatic',
    engineCc: '2755 cc',
    powerHp: '201 Hp',
    description: 'The legendary tough pickup. Renowned for its bulletproof reliability, heavy-duty cargo capability, and premium double-cab comforts.',
    features: ['1-Ton Payload Capacity', '3.5-Ton Towing Capacity', 'Active Traction Control', 'Hill Assist Control', 'Leather Interior Option']
  },
  {
    id: 'lc79',
    modelName: 'Toyota Land Cruiser 79 Pickup',
    category: 'Pick-up',
    imageUrl: '/images/Toyota_Land_Cruiser_79_Pickup.jpeg',
    priceRange: '$65,000 - $76,000',
    fuelType: 'Diesel',
    transmission: 'Manual',
    engineCc: '4164 cc',
    powerHp: '128 Hp',
    description: 'Heavy duty load-hauler built for mining, farming, and rugged remote tasks. Built around a high-tensile steel frame with bulletproof reliability.',
    features: ['Single & Double Cab Options', 'Huge Payload Capacity', 'Manual Front Free-Wheel Hubs', 'All-Steel Front Bumper', 'Snorkel Standard']
  },
  {
    id: 'lc78',
    modelName: 'Toyota Land Cruiser 78 Troop Carrier',
    category: 'LCV',
    imageUrl: '/images/Toyota_Land_Cruiser_78_Troop_Carrier.jpeg',
    priceRange: '$70,000 - $79,900',
    fuelType: 'Diesel',
    transmission: 'Manual',
    engineCc: '4164 cc',
    powerHp: '128 Hp',
    description: 'The ultimate mass transportation utility vehicle for harsh bush tracks. Famous for NGO operations, search and rescue, and overland expeditions.',
    features: ['13-Seat Passenger Configuration', 'Dual Fuel Tanks (180L Total)', 'Heavy Duty Coil/Leaf Suspension', 'Snorkel', 'Rear Step Bumper']
  },
  {
    id: 'fortuner',
    modelName: 'Toyota Fortuner',
    category: 'SUV',
    imageUrl: '/images/Toyota_Fortuner.jpeg',
    priceRange: '$52,000 - $68,000',
    fuelType: 'Diesel',
    transmission: 'Automatic',
    engineCc: '2755 cc',
    powerHp: '201 Hp',
    description: 'Premium 7-seater adventure SUV with legendary off-road heritage. Combines refined family luxury with genuine 4WD performance on Zimbabwean roads.',
    features: ['7-Seat Leather Interior', 'Part-time 4WD with Rear Diff Lock', 'Downhill Assist Control', '8-inch Touchscreen Infotainment', 'Bi-Beam LED Headlamps']
  },
  {
    id: 'hiace',
    modelName: 'Toyota Hiace Ses\'fikile',
    category: 'LCV',
    imageUrl: '/images/Toyota_Hiace.jpeg',
    priceRange: '$39,500 - $49,000',
    fuelType: 'Diesel',
    transmission: 'Manual',
    engineCc: '2755 cc',
    powerHp: '134 Hp',
    description: 'The ultimate people-mover and commercial workhorse. Highly trusted across Zimbabwe for commuter transport, shuttle fleets, and executive passenger operations.',
    features: ['16-Seater Commuter Layout', 'Rear Air Conditioning Vents', 'Anti-lock Braking System (ABS)', 'Sliding Passenger Door', 'High-Rigidity Body Structure']
  }
];

export const mockServices: ServiceItem[] = [
  {
    id: 'scheduled-maintenance',
    serviceName: 'Scheduled Maintenance & Servicing',
    description: 'Keep your Toyota in showroom condition with state-of-the-art diagnostics, fluid checks, brake tuning, and standard multi-point inspections.',
    iconName: 'Build'
  },
  {
    id: 'genuine-parts',
    serviceName: 'Genuine Toyota Parts & Accessories',
    description: 'Ensure safety and durability. We supply and install official Toyota components backed by our manufacturer warranties.',
    iconName: 'Settings'
  },
  {
    id: 'warranty-services',
    serviceName: 'Manufacturer Warranty Service',
    description: 'Official diagnostic and maintenance procedures that keep your multi-year CFAO Toyota manufacturer warranty completely active.',
    iconName: 'Verified'
  },
  {
    id: 'heavy-repair',
    serviceName: 'Engine, Gearbox & Collision Repair',
    description: 'Certified body shop and heavy mechanical rebuilds utilizing specialized alignment tools and original structural frames.',
    iconName: 'Construction'
  },
  {
    id: 'fleet-care',
    serviceName: 'Corporate & Mining Fleet Care',
    description: 'Optimized servicing schedules, prioritized diagnostics, and tailored field-maintenance support for corporate and utility operations.',
    iconName: 'Speed'
  }
];

export const branchLocations = [
  {
    id: 'cfao-harare',
    name: 'CFAO Toyota Harare (Head Office)',
    city: 'Harare',
    address: '59-61 Coventry Road, Workington, Harare',
    phone: '+263 (24) 2750031 / 9',
    email: 'sales.harare@cfao.com',
    hours: 'Mon - Fri: 8:00 AM - 5:00 PM | Sat: 8:00 AM - 12:00 PM',
    coordinates: { x: 330, y: 110, lat: -17.8488, lng: 31.0264 }
  },
  {
    id: 'croco-harare',
    name: 'Croco Toyota Harare',
    city: 'Harare',
    address: '100 Seke Road, Graniteside, Harare',
    phone: '+263 (24) 2772591',
    email: 'sales.croco@croco.co.zw',
    hours: 'Mon - Fri: 8:00 AM - 5:00 PM | Sat: 8:00 AM - 1:00 PM',
    coordinates: { x: 345, y: 125, lat: -17.8576, lng: 31.0601 }
  },
  {
    id: 'cfao-bulawayo',
    name: 'CFAO Toyota Bulawayo',
    city: 'Bulawayo',
    address: 'Corner 12th Avenue & Fife Street, Bulawayo',
    phone: '+263 (29) 2262521 / 5',
    email: 'sales.bulawayo@cfao.com',
    hours: 'Mon - Fri: 8:00 AM - 5:00 PM | Sat: 8:00 AM - 12:00 PM',
    coordinates: { x: 150, y: 270, lat: -20.1585, lng: 28.5833 }
  },
  {
    id: 'byword-masvingo',
    name: 'Byword Motors (Masvingo Authorized Dealer)',
    city: 'Masvingo',
    address: '67 Hughes Street, Masvingo',
    phone: '+263 (39) 2262704',
    email: 'service.masvingo@byword.co.zw',
    hours: 'Mon - Fri: 8:00 AM - 5:00 PM',
    coordinates: { x: 280, y: 280, lat: -20.0734, lng: 30.8285 }
  },
  {
    id: 'cfao-mutare',
    name: 'CFAO Toyota Mutare',
    city: 'Mutare',
    address: '15 Herbert Chitepo Street, Mutare',
    phone: '+263 (20) 2061234 / 5',
    email: 'sales.mutare@cfao.com',
    hours: 'Mon - Fri: 8:00 AM - 5:00 PM | Sat: 8:00 AM - 12:00 PM',
    coordinates: { x: 420, y: 155, lat: -18.9744, lng: 32.6685 }
  },
  {
    id: 'cfao-gweru',
    name: 'CFAO Toyota Gweru',
    city: 'Gweru',
    address: '18 Robert Mugabe Way, Gweru',
    phone: '+263 (54) 2221456',
    email: 'sales.gweru@cfao.com',
    hours: 'Mon - Fri: 8:00 AM - 5:00 PM | Sat: 8:00 AM - 12:00 PM',
    coordinates: { x: 220, y: 195, lat: -19.4589, lng: 29.8153 }
  },
  {
    id: 'cfao-kadoma',
    name: 'CFAO Toyota Kadoma',
    city: 'Kadoma',
    address: '5 Fourth Street, Kadoma',
    phone: '+263 (68) 2422150',
    email: 'sales.kadoma@cfao.com',
    hours: 'Mon - Fri: 8:00 AM - 5:00 PM',
    coordinates: { x: 255, y: 155, lat: -18.3333, lng: 29.9167 }
  },
  {
    id: 'lowveld-chiredzi',
    name: 'Lowveld Toyota (Chiredzi Authorized Dealer)',
    city: 'Chiredzi',
    address: '32 Guava Road, Chiredzi',
    phone: '+263 (31) 2722801',
    email: 'sales.chiredzi@lowveld.co.zw',
    hours: 'Mon - Fri: 8:00 AM - 5:00 PM',
    coordinates: { x: 340, y: 330, lat: -21.0500, lng: 31.6667 }
  },
  {
    id: 'croco-vicfalls',
    name: 'Croco Toyota Victoria Falls',
    city: 'Victoria Falls',
    address: 'Stand 433, Kazungula Road, Victoria Falls',
    phone: '+263 (83) 2844222',
    email: 'sales.vicfalls@croco.co.zw',
    hours: 'Mon - Fri: 8:00 AM - 5:00 PM',
    coordinates: { x: 75, y: 140, lat: -17.9333, lng: 25.8333 }
  }
];
