export interface QuickReply {
  label: string;
  value: string;
}

export interface Intent {
  id: string;
  keywords: string[];
  response: string;
  quickReplies?: QuickReply[];
  link?: { label: string; path: string };
  actionWidget?: 'quiz' | 'calculator';
}

// ── Quiz Types & Logic ────────────────────────────────────────────────────────
export interface QuizOption {
  id: string;
  label: string;
  desc: string;
}

export interface QuizQuestion {
  id: 'purpose' | 'budget' | 'priority';
  title: string;
  subtitle: string;
  options: QuizOption[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'purpose',
    title: 'What is your primary driving need?',
    subtitle: 'Step 1 of 3 · How will you use your Toyota?',
    options: [
      { id: 'city', label: '🏙️ City & Daily Runaround', desc: 'Agile daily commuting, school runs & errands' },
      { id: 'family', label: '👨‍👩‍👧‍👦 Family & Long Trips', desc: 'Spacious passenger comfort & highway cruising' },
      { id: 'rugged', label: '🌾 Farm, Mining & Off-Road', desc: 'Rough roads, heavy loads & tough terrain' },
      { id: 'commercial', label: '🚐 Business & Transport', desc: 'Commuter shuttle, staff or cargo delivery' },
    ],
  },
  {
    id: 'budget',
    title: 'What is your investment budget?',
    subtitle: 'Step 2 of 3 · Approximate price bracket (USD)',
    options: [
      { id: 'entry', label: '💵 Under $35,000', desc: 'Affordable, economical & low running cost' },
      { id: 'mid', label: '💳 $35,000 – $65,000', desc: 'Mid-range crossovers, SUVs & double cabs' },
      { id: 'premium', label: '💎 $65,000 – $145,000+', desc: 'Executive luxury & flagship 4x4 power' },
    ],
  },
  {
    id: 'priority',
    title: 'What is your single top priority?',
    subtitle: 'Step 3 of 3 · The feature that matters most',
    options: [
      { id: 'fuel', label: '⚡ Fuel Economy & Hybrid', desc: 'Save money at the pump (up to 40% fuel cut)' },
      { id: 'space', label: '🛋️ 7-Seater Space & Comfort', desc: 'Room for large families or VIP passengers' },
      { id: 'toughness', label: '🏔️ Unstoppable 4x4 & Towing', desc: 'Ground clearance, diff-lock & heavy payload' },
    ],
  },
];

export interface QuizRecommendation {
  vehicleId: string;
  modelName: string;
  priceRange: string;
  category: string;
  imageUrl: string;
  matchScore: number;
  badge: string;
  reason: string;
  highlights: string[];
}

export function getQuizRecommendation(
  purpose: string,
  budget: string,
  priority: string
): QuizRecommendation {
  // 1. Commercial / Fleet
  if (purpose === 'commercial') {
    if (priority === 'space') {
      return {
        vehicleId: 'hiace',
        modelName: 'Toyota Hiace Ses\'fikile',
        priceRange: '$39,500 - $49,000',
        category: 'LCV',
        imageUrl: '/images/Toyota_Hiace.jpeg',
        matchScore: 98,
        badge: 'Top Commercial Choice',
        reason: 'The gold standard for commuter and passenger transport in Zimbabwe. Unmatched 16-seater capacity with reliable 2.8L diesel economy.',
        highlights: ['16-Seat Commuter Capacity', 'Rear AC Vents', 'Proven Commercial Durability', 'Low Operating Costs'],
      };
    }
    return {
      vehicleId: 'lc79',
      modelName: 'Toyota Land Cruiser 79 Pickup',
      priceRange: '$65,000 - $76,000',
      category: 'Pick-up',
      imageUrl: '/images/Toyota_Land_Cruiser_79_Pickup.jpeg',
      matchScore: 96,
      badge: 'Mining & Farm Workhorse',
      reason: 'Engineered for extreme punishment in Zimbabwe\'s farming, mining, and heavy construction sectors.',
      highlights: ['Massive Cargo Payload', '4.2L Diesel Reliability', 'Snorkel Standard', 'Heavy-Duty Steel Construction'],
    };
  }

  // 2. Rugged / Farm / Mining
  if (purpose === 'rugged') {
    if (budget === 'premium') {
      return {
        vehicleId: 'lc300',
        modelName: 'Toyota Land Cruiser 300',
        priceRange: '$120,000 - $145,000',
        category: '4x4',
        imageUrl: '/images/lc300.png',
        matchScore: 99,
        badge: 'King of the Road',
        reason: 'The ultimate luxury flagship that conquers Zimbabwe\'s roughest bush trails with twin-turbo diesel power and executive opulence.',
        highlights: ['3.3L V6 Twin-Turbo Diesel (302 Hp)', 'E-KDSS Electronic Suspension', 'Pre-Crash Safety System', 'First-Class Luxury Cabin'],
      };
    }
    if (priority === 'space' || budget === 'mid') {
      return {
        vehicleId: 'hilux',
        modelName: 'Toyota Hilux Double Cab',
        priceRange: '$40,000 - $65,000',
        category: 'Pick-up',
        imageUrl: '/images/hilux.png',
        matchScore: 97,
        badge: 'Zimbabwe\'s #1 Bakkie',
        reason: 'Renowned as the toughest pickup in Africa. Blends a 1-ton payload, 3.5-ton towing, and plush double-cab luxury for work and weekend adventures.',
        highlights: ['1-Ton Payload & 3.5-Ton Towing', '2.8L GD-6 Turbo Diesel (201 Hp)', 'Active Traction Control', 'High Resale Value'],
      };
    }
    return {
      vehicleId: 'lc76',
      modelName: 'Toyota Land Cruiser 76 Station Wagon',
      priceRange: '$68,000 - $78,000',
      category: '4x4',
      imageUrl: '/images/Toyota_Land_Cruiser_76_Station_Wagon.jpeg',
      matchScore: 95,
      badge: 'Unstoppable Legend',
      reason: 'Pure mechanical ruggedness designed to outlast anything else on African soil. Dual fuel tanks and front/rear rigid axles.',
      highlights: ['Rigid Front & Rear Axles', '130L Fuel Tank Range', 'Manual 4WD Transfer Lever', 'Zero Delicate Electronics'],
    };
  }

  // 3. Family & Long Distance
  if (purpose === 'family') {
    if (priority === 'space') {
      return {
        vehicleId: 'fortuner',
        modelName: 'Toyota Fortuner',
        priceRange: '$52,000 - $68,000',
        category: 'SUV',
        imageUrl: '/images/Toyota_Fortuner.jpeg',
        matchScore: 98,
        badge: 'Ideal 7-Seater Family SUV',
        reason: 'Zimbabwe\'s favorite family cruiser. Genuine 7-seater space, rugged Hilux-based chassis for gravel roads, and plush leather interior.',
        highlights: ['7-Seater Versatile Layout', 'Part-Time 4WD with Diff Lock', '2.8L GD-6 Diesel (201 Hp)', 'Bi-Beam LED Headlights'],
      };
    }
    if (budget === 'premium') {
      return {
        vehicleId: 'prado',
        modelName: 'Toyota Land Cruiser Prado',
        priceRange: '$85,000 - $110,000',
        category: '4x4',
        imageUrl: '/images/prado.png',
        matchScore: 99,
        badge: 'Luxury 4x4 Benchmark',
        reason: 'Generational comfort with unstoppable off-road pedigree. Multi-Terrain Select, 3-row seating, and 12.3-inch multimedia.',
        highlights: ['Multi-Terrain Select (MTS)', 'Full-Time 4WD System', '3-Row 7-Seater Interior', '12.3" Audio Multimedia'],
      };
    }
    if (priority === 'fuel') {
      return {
        vehicleId: 'corolla-cross-hev',
        modelName: 'Toyota Corolla Cross Hybrid (HEV)',
        priceRange: '$38,000 - $44,000',
        category: 'SUV',
        imageUrl: '/images/corolla-cross-hev.png',
        matchScore: 96,
        badge: 'Eco-Smart Family Choice',
        reason: 'Remarkable 4.3L/100km fuel economy that drastically cuts monthly fuel costs without ever needing a plug.',
        highlights: ['4.3L/100km Fuel Consumption', 'Self-Charging Hybrid (No Plug)', 'Toyota Safety Sense', 'Spacious Boot for Strollers'],
      };
    }
    return {
      vehicleId: 'rav4',
      modelName: 'Toyota RAV4',
      priceRange: '$45,000 - $55,000',
      category: 'SUV',
      imageUrl: '/images/rav4.png',
      matchScore: 94,
      badge: 'Modern Crossover Perfection',
      reason: 'Intelligent all-wheel drive, panoramic glass roof, and premium passenger ride quality for Harare city or Nyanga holiday trips.',
      highlights: ['Intelligent AWD', 'Panoramic Sunroof', 'Ventilated Leather Seats', 'Wireless Phone Charging'],
    };
  }

  // 4. City & Commuting (Default fallback branch)
  if (priority === 'fuel' || budget === 'mid') {
    return {
      vehicleId: 'corolla-cross-hev',
      modelName: 'Toyota Corolla Cross Hybrid (HEV)',
      priceRange: '$38,000 - $44,000',
      category: 'SUV',
      imageUrl: '/images/corolla-cross-hev.png',
      matchScore: 97,
      badge: 'Best City Commuter',
      reason: 'Self-charging hybrid efficiency with raised SUV ride height to glide over Harare potholes with zero stress.',
      highlights: ['4.3L/100km City Fuel Efficiency', 'EV Mode for Silent Driving', 'High Pothole Clearance', 'Push Button Start & Smart Entry'],
    };
  }
  if (budget === 'entry') {
    return {
      vehicleId: 'starlet',
      modelName: 'Toyota Starlet',
      priceRange: '$22,500 - $26,000',
      category: 'City',
      imageUrl: '/images/starlet.jpg',
      matchScore: 96,
      badge: 'Most Affordable Brand New Toyota',
      reason: 'Zippy 1.5L engine, 5.7L/100km economy, Apple CarPlay/Android Auto, and full 3-year CFAO warranty at an unbeatable price.',
      highlights: ['Price from $22,500', 'Apple CarPlay & Android Auto', 'Reverse Camera & Sensors', 'Low Maintenance Costs'],
    };
  }
  return {
    vehicleId: 'starlet-cross',
    modelName: 'Toyota Starlet Cross',
    priceRange: '$26,000 - $29,900',
    category: 'SUV',
    imageUrl: '/images/starlet_cross.jpeg',
    matchScore: 95,
    badge: 'Compact Crossover Attitude',
    reason: 'Raised ground clearance, rugged body cladding, and 360-degree camera monitor in a compact, easy-to-park footprint.',
    highlights: ['Raised Ride Height', '360 View Camera', 'Wireless Charger', 'Rugged Protective Styling'],
  };
}

// ── In-Chat Loan Estimator Logic ─────────────────────────────────────────────
export interface LoanEstimate {
  price: number;
  depositPercent: number;
  depositAmount: number;
  loanAmount: number;
  termMonths: number;
  interestRate: number;
  monthlyInstalment: number;
  totalRepayable: number;
}

export function calculateChatLoan(
  price: number,
  depositPercent: number = 20,
  termMonths: number = 48,
  interestRate: number = 18
): LoanEstimate {
  const depositAmount = (price * depositPercent) / 100;
  const loanAmount = price - depositAmount;
  const monthlyRate = interestRate / 100 / 12;
  const monthlyInstalment =
    monthlyRate === 0
      ? loanAmount / termMonths
      : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
        (Math.pow(1 + monthlyRate, termMonths) - 1);
  const totalRepayable = monthlyInstalment * termMonths + depositAmount;

  return {
    price,
    depositPercent,
    depositAmount: Math.round(depositAmount),
    loanAmount: Math.round(loanAmount),
    termMonths,
    interestRate,
    monthlyInstalment: Math.round(monthlyInstalment),
    totalRepayable: Math.round(totalRepayable),
  };
}

export const POPULAR_LOAN_PRESETS = [
  { label: 'Starlet (from $22.5k)', price: 22500, modelId: 'starlet' },
  { label: 'Corolla Cross HEV ($38k)', price: 38000, modelId: 'corolla-cross-hev' },
  { label: 'Hilux Double Cab ($42.5k)', price: 42500, modelId: 'hilux' },
  { label: 'Fortuner ($52k)', price: 52000, modelId: 'fortuner' },
  { label: 'Land Cruiser Prado ($85k)', price: 85000, modelId: 'prado' },
];

// ── Greeting & Fallbacks ─────────────────────────────────────────────────────
export const GREETING_RESPONSE = {
  text: `Hello! 👋 Welcome to **Toyota Zimbabwe** (CFAO Mobility).\n\nI am your official Toyota virtual assistant. I can guide you through our **brand new vehicle lineup**, calculate **monthly bank finance**, book a **test drive**, or explain the **ZIMRA civil servants rebate scheme**.\n\nHow can I help you today?`,
  quickReplies: [
    { label: '🎯 Help Me Choose a Toyota', value: 'help me choose' },
    { label: '🧮 Instant Loan Estimator', value: 'instant loan calculator' },
    { label: '🏛️ Civil Servants Rebate', value: 'civil servants rebate' },
    { label: '🚗 Browse Models', value: 'show me your vehicles' },
    { label: '⛽ Zimbabwe Fuel & Blends', value: 'zimbabwe fuel compatibility' },
    { label: '📅 Book a Test Drive', value: 'book a test drive' },
    { label: '📍 Find a Branch', value: 'branch locations' },
  ] as QuickReply[],
};

export const FALLBACK_RESPONSES = [
  `I'm not quite sure about that. Try asking me about **vehicle models**, **monthly repayments**, **ZIMRA rebates**, **test drive bookings**, **spare parts**, or **branch contacts**.`,
  `I didn't catch that — could you rephrase? You can ask about **pricing**, **fuel compatibility (E10/E20 & 50ppm)**, **service bookings**, or click **Help Me Choose** to find your ideal car!`,
  `Hmm, I couldn't find a direct answer. You can speak directly with our Harare sales desk at **+263 (24) 2750031** or email **sales.harare@cfao.com**.`,
];

// ── Comprehensive Knowledge Intents ──────────────────────────────────────────
export const intents: Intent[] = [
  // ── 1. QUIZ / RECOMMENDATION WIZARD ──
  {
    id: 'quiz_trigger',
    keywords: [
      'help me choose', 'recommend a car', 'recommend vehicle', 'which car', 'which toyota',
      'car finder', 'vehicle finder', 'find me a car', 'suggest a car', 'what car should i buy',
      'quiz', 'help choose', 'best car for me', 'recommendation', 'recommend'
    ],
    response: `**Toyota Vehicle Finder Wizard** 🎯\n\nFinding the right vehicle for Zimbabwean conditions depends on your driving habits, budget, and terrain.\n\nClick below to answer 3 quick questions and receive an instant personalized model match:`,
    actionWidget: 'quiz',
    quickReplies: [
      { label: '🚗 Start 3-Step Finder', value: 'help me choose' },
      { label: '💰 Check Price Guide', value: 'vehicle pricing' },
      { label: '🚙 Browse All Models', value: 'show me your vehicles' },
    ],
  },

  // ── 2. IN-CHAT LOAN ESTIMATOR ──
  {
    id: 'loan_calculator_trigger',
    keywords: [
      'instant loan calculator', 'loan calculator', 'calculate payment', 'monthly instalment',
      'monthly payment', 'how much per month', 'estimate payment', 'repayment estimate',
      'finance calculator', 'monthly cost', 'pay per month', 'instalment calculator'
    ],
    response: `**In-Chat Monthly Payment Estimator** 🧮\n\nWe partner with **CBZ**, **ZB Bank**, **FBC**, and **Steward Bank** with deposit options starting at 15% and tenures up to 60 months.\n\nUse the interactive estimator below to calculate your estimated monthly instalments instantly:`,
    actionWidget: 'calculator',
    quickReplies: [
      { label: '🏛️ Civil Servants Rebate', value: 'civil servants rebate' },
      { label: '📄 Finance Documents Needed', value: 'finance documents' },
      { label: '📋 Apply for Full Pre-Approval', value: 'apply finance' },
    ],
    link: { label: 'Open Full Finance Suite', path: '/finance' },
  },

  // ── 3. ZIMRA CIVIL SERVANTS REBATE SCHEME ──
  {
    id: 'zimra_rebate',
    keywords: [
      'civil servant', 'civil servants', 'civil servants rebate', 'duty free', 'duty-free',
      'zimra rebate', 'rebate scheme', 'statutory instrument', 'government worker', 'teacher rebate',
      'nurse rebate', 'rebate duty', 'duty exemption', 'import rebate', 'zimra car rebate'
    ],
    response: `**ZIMRA Civil Servants Motor Vehicle Rebate Scheme** 🏛️\n\nUnder Zimbabwe's statutory rebate provisions, qualified government employees (teachers, healthcare workers, ministry officials with 10+ years qualifying service) can purchase a motor vehicle **completely exempt from customs duty and import VAT**.\n\n**Why buy through CFAO Toyota Zimbabwe?**\n✅ **Zero Foreign Currency Risk:** No need to send money abroad to dubious third parties in Japan or South Africa.\n✅ **Full 3-Year / 100,000 km Warranty:** Grey imports from Durban or Beitbridge carry zero warranty.\n✅ **Tropicalized Specs:** Factory-tuned cooling, heavy-duty suspension, and air filtration built for Zimbabwean roads.\n✅ **Official Proforma Invoicing:** We provide the official CFAO proforma invoice required by the Ministry of Finance and ZIMRA.\n\nOur sales consultants at Harare and Bulawayo will prepare your vehicle quote and guide you through the Ministry approval paperwork.`,
    quickReplies: [
      { label: '📞 Contact Sales for Quote', value: 'contact harare' },
      { label: '🚗 Recommended Models', value: 'show me your vehicles' },
      { label: '📍 Visit a Branch', value: 'branch locations' },
    ],
    link: { label: 'Request Quotation for Rebate', path: '/contact' },
  },

  // ── 4. ZIMBABWE FUEL COMPATIBILITY & TROPICALIZATION ──
  {
    id: 'zimbabwe_fuel',
    keywords: [
      'fuel', 'zimbabwe fuel', 'fuel compatibility', 'ethanol', 'e10', 'e20', 'blend', 'diesel',
      '50ppm', 'sulphur', 'tropicalized', 'tropicalised', 'cooling', 'fuel quality', 'dirty fuel',
      'unleaded', 'petrol blend', 'ethanol blend'
    ],
    response: `**Zimbabwe Fuel Compatibility & Tropicalization** ⛽\n\nAll brand new vehicles supplied by **CFAO Toyota Zimbabwe** are strictly built to **Official African Tropicalized Specifications**:\n\n🌾 **Ethanol Blends (E10 up to E20):**\nZimbabwe's mandatory ethanol fuel blending causes severe fuel line erosion and injector failure in grey-market Japanese domestic imports. Our official petrol Toyotas feature factory-hardened fuel rails, corrosion-resistant injectors, and ethanol-calibrated ECUs.\n\n🛢️ **50ppm Low-Sulphur Diesel:**\nModern common-rail diesel engines (GD-6 on Hilux, Fortuner, Prado and V6 on LC300) are equipped with heavy-duty multi-stage fuel/water separators to guard against contaminated fuel.\n\n☀️ **Tropicalized Cooling & Dust Packages:**\nOversized heavy-duty radiators, viscous cooling fans, and high-efficiency cyclonic air filtration ensure optimal engine life on hot, corrugated, and dusty Zimbabwean roads.`,
    quickReplies: [
      { label: '🔩 Genuine Filters & Parts', value: 'spare parts' },
      { label: '⚡ Hybrid Fuel Savings', value: 'corolla cross hybrid' },
      { label: '📅 Book a Fuel Service', value: 'book service form' },
    ],
    link: { label: 'Explore Genuine Parts', path: '/parts' },
  },

  // ── 5. CURRENCIES & PAYMENT METHODS ──
  {
    id: 'currency_payments',
    keywords: [
      'currency', 'currencies', 'payment', 'payment methods', 'how to pay', 'usd cash', 'nostro',
      'usd nostro', 'rtgs', 'bank transfer', 'wire transfer', 'telegraphic transfer', 'accept nostro',
      'tax clearance', 'vat invoice'
    ],
    response: `**Payment Methods & Currencies Accepted** 💵\n\nCFAO Toyota Zimbabwe transacts in transparent, compliant banking channels:\n\n✅ **USD Cash Deposit:** Accepted at authorized banking halls.\n✅ **USD Nostro (Domestic RTGS / TT):** Direct bank-to-bank electronic transfers.\n✅ **Foreign Inward Remittance:** Ideal for diaspora buyers, NGOs, and multinational entities.\n✅ **Bank Vehicle Asset Finance (VAF):** Fast track approvals via our banking partners (**CBZ, ZB Bank, FBC, Steward**).\n\n📄 **Full Tax Invoicing:** Every transaction receives an official Zimbabwe fiscalized tax invoice with VAT for corporate asset registers and tax deduction compliance.`,
    quickReplies: [
      { label: '💳 Vehicle Finance Options', value: 'finance options' },
      { label: '📞 Talk to Accounts Desk', value: 'contact harare' },
      { label: '🎁 Current Promotions', value: 'current promotions' },
    ],
    link: { label: 'Finance & Banking Details', path: '/finance' },
  },

  // ── 6. ROADSIDE ASSISTANCE & EMERGENCY BREAKDOWN ──
  {
    id: 'roadside_assistance',
    keywords: [
      'roadside', 'roadside assistance', 'breakdown', 'towing', 'emergency', 'flat tyre', 'puncture',
      'accident', 'stuck', 'tow truck', 'recovery', 'harare bulawayo highway', 'highway emergency'
    ],
    response: `**Toyota Emergency Roadside & Breakdown Support** 🚨\n\nIf you experience a breakdown or incident anywhere on Zimbabwe's highways:\n\n📞 **CFAO Harare 24/7 Service Desk:** +263 (24) 2750031 / +263 77 210 0000\n📞 **Bulawayo Branch Support:** +263 (29) 2262521\n\n**Highway Coverage:**\nWe coordinate emergency towing and field mechanics across major corridors:\n• Harare – Bulawayo Highway (A5)\n• Harare – Mutare Highway (A3)\n• Harare – Chirundu / Kariba (A1)\n• Beitbridge – Masvingo – Harare Corridor\n\n*Vehicles under active CFAO 3-Year warranty receive prioritized dispatch and technical diagnostics.*`,
    quickReplies: [
      { label: '📍 Find Nearest Branch', value: 'branch locations' },
      { label: '🔧 Book Workshop Service', value: 'book service form' },
      { label: '🛡️ Warranty Coverage', value: 'warranty' },
    ],
    link: { label: 'View All Branch Contacts', path: '/contact' },
  },

  // ── 7. TRADE-IN & VALUATION ──
  {
    id: 'trade_in',
    keywords: [
      'trade in', 'trade-in', 'trade in my car', 'sell my car', 'car valuation', 'exchange car',
      'swap car', 'trade up', 'used car valuation'
    ],
    response: `**Toyota Trade-In & Valuation Service** 🔄\n\nUpgrade your current vehicle to a brand new Toyota seamlessly!\n\n**How Trade-In Works:**\n1️⃣ **Free Appraisal:** Drive into our Harare (Coventry Rd) or Bulawayo dealership for a complimentary 30-point evaluation.\n2️⃣ **Fair Market Valuation:** Our certified assessors provide an immediate, competitive valuation of your vehicle.\n3️⃣ **Direct Deposit Offset:** The agreed valuation is credited directly toward the deposit or full purchase price of your new Toyota.\n4️⃣ **Downtime Free:** Hand over your old keys on the very same day your new Toyota is handed over to you!`,
    quickReplies: [
      { label: '📍 Visit Harare for Appraisal', value: 'contact harare' },
      { label: '🚗 Choose Your New Toyota', value: 'show me your vehicles' },
      { label: '💳 Calculate Difference', value: 'instant loan calculator' },
    ],
    link: { label: 'Book Appraisal via Contact', path: '/contact' },
  },

  // ── 8. TOYOTA FORTUNER ──
  {
    id: 'fortuner_details',
    keywords: [
      'fortuner', 'toyota fortuner', 'fortuner price', 'fortuner specs', '7 seater', 'seven seater',
      '7-seater suv', 'family suv'
    ],
    response: `**Toyota Fortuner — Premium 7-Seater Adventure SUV** 🚙\n\nThe undisputed king of family SUVs in Zimbabwe. Combining Hilux toughness with executive luxury:\n\n• **Price Range:** $52,000 – $68,000\n• **Engine:** 2.8L GD-6 Turbo Diesel — 201 Hp\n• **Transmission:** 6-Speed Automatic\n• **Drivetrain:** Part-time 4WD with Rear Differential Lock\n• **Interior:** Premium 7-passenger leather seating with dual-zone climate control\n• **Safety:** Active Traction Control, Downhill Assist, 7 Airbags, LED headlamps\n\nIdeal for city executive commuting during the week and exploring Kariba or Nyanga on the weekend!`,
    quickReplies: [
      { label: '📅 Book Fortuner Test Drive', value: 'book a test drive' },
      { label: '🧮 Estimate Monthly Payment', value: 'instant loan calculator' },
      { label: '🚙 Compare with Prado', value: 'vehicles_4x4' },
    ],
    link: { label: 'Explore SUV Lineup', path: '/vehicles?category=SUV' },
  },

  // ── 9. TOYOTA HIACE (SES'FIKILE / KOMBI / PANEL VAN) ──
  {
    id: 'hiace_details',
    keywords: [
      'hiace', 'toyota hiace', 'kombi', 'quantum', 'commuter', 'sesfikile', '16 seater', 'shuttle',
      'minibus', 'panel van', 'passenger van', 'bus'
    ],
    response: `**Toyota Hiace Ses'fikile & Commercial Vans** 🚐\n\nThe backbone of passenger and commercial mobility across Zimbabwe:\n\n• **Price Range:** $39,500 – $49,000\n• **Configuration:** 16-Seater Commuter & Cargo Panel Van options\n• **Engine:** High-durability 2.8L Turbo Diesel (134 Hp)\n• **Transmission:** Heavy-duty 5-Speed Manual\n• **Safety:** Reinforced body frame, ABS, emergency escape hatch, safety belts for all 16 seats\n• **Comfort:** Dedicated passenger roof air-conditioning vents\n\n*The preferred choice for school transport, tourism charters, mining crew transport, and commuter operators.*`,
    quickReplies: [
      { label: '🛻 Fleet Volume Pricing', value: 'fleet' },
      { label: '📅 Book Test Drive', value: 'book a test drive' },
      { label: '💳 Commercial Finance', value: 'finance options' },
    ],
    link: { label: 'Explore Commercial LCVs', path: '/vehicles?category=LCV' },
  },

  // ── 10. TOYOTA STARLET & STARLET CROSS ──
  {
    id: 'starlet_details',
    keywords: [
      'starlet', 'starlet cross', 'toyota starlet', 'entry level', 'cheapest car', 'hatchback',
      'compact car', 'budget car', 'small car', 'city car'
    ],
    response: `**Toyota Starlet & Starlet Cross** 🏙️\n\nZimbabwe's most accessible, reliable brand new Toyotas:\n\n• **Toyota Starlet (Hatchback):** from **$22,500**\n  1.5L Petrol | 5.7L/100km fuel economy | Apple CarPlay & Android Auto | Reverse Camera\n\n• **Toyota Starlet Cross (Crossover SUV):** from **$26,000**\n  Raised ground clearance for city potholes | Rugged SUV cladding | 360-degree camera | Wireless phone charger\n\nBoth backed by our full 3-year / 100,000 km manufacturer warranty!`,
    quickReplies: [
      { label: '📅 Test Drive a Starlet', value: 'book a test drive' },
      { label: '🧮 Estimate $22.5k Monthly', value: 'instant loan calculator' },
      { label: '💰 Compare Prices', value: 'vehicle pricing' },
    ],
    link: { label: 'View Starlet Details', path: '/vehicles' },
  },

  // ── 11. GENUINE VS COUNTERFEIT PARTS ──
  {
    id: 'counterfeit_parts',
    keywords: [
      'fake parts', 'counterfeit', 'pirate parts', 'fake oil filter', 'genuine parts check',
      'original parts', 'how to tell fake', 'copy parts', 'grey parts', 'parts authenticity'
    ],
    response: `**Beware of Counterfeit Toyota Parts in Zimbabwe** ⚠️\n\nCounterfeit oil filters, fake brake pads, and inferior suspension parts flood independent backstreet shops in Harare and Bulawayo. Here's why genuine OEM matters:\n\n🚫 **Fake Oil Filters:** Lack bypass valves and collapse inside the engine, causing total bearing seizure and $5,000+ rebuilds.\n🚫 **Counterfeit Brake Pads:** Fade rapidly under high heat, dramatically increasing stopping distance on highway emergencies.\n✅ **Official Toyota Parts Guarantee:**\nAll components purchased through CFAO Toyota Zimbabwe carry official tamper-evident hologram packaging, manufacturer barcode verification, and full replacement warranty.`,
    quickReplies: [
      { label: '🔩 Request a Genuine Quote', value: 'parts enquiry' },
      { label: '📍 Visit Parts Counter', value: 'branch locations' },
      { label: '🛡️ Warranty Requirements', value: 'warranty' },
    ],
    link: { label: 'Order Genuine Parts Online', path: '/parts' },
  },

  // ── 12. SERVICE INTERVALS & MAINTENANCE SCHEDULE ──
  {
    id: 'service_intervals',
    keywords: [
      'service interval', 'when to service', 'maintenance schedule', '5000km', '10000km',
      'service frequency', 'oil change interval', 'minor service', 'major service'
    ],
    response: `**Recommended Toyota Service Schedule** 🔧\n\nFor Zimbabwean driving conditions (dusty terrain, stop-start traffic, ambient heat):\n\n• **Every 5,000 km / 3 Months (Intermediate Check):**\n  Engine oil & filter change, tyre pressure & brake fluid inspection.\n• **Every 10,000 km / 6 Months (Minor Service):**\n  Full synthetic oil change, tyre rotation, air filter cleaning/replacement, 35-point safety check.\n• **Every 40,000 km (Major Service):**\n  Differential oils, gearbox fluid, spark plugs / diesel fuel filters, brake pad overhaul, suspension retorque.\n\n*Maintaining your service book with CFAO protects your resale value and preserves your 3-year warranty.*`,
    quickReplies: [
      { label: '📅 Book a Service Appointment', value: 'book service form' },
      { label: '🎁 15% Mid-Year Service Special', value: 'service discount' },
      { label: '🔩 Spare Parts Catalog', value: 'spare parts' },
    ],
    link: { label: 'Book Service Appointment', path: '/services' },
  },

  // ── 13. SAFETY RECALLS ──
  {
    id: 'recalls',
    keywords: [
      'recall', 'recalls', 'safety recall', 'airbag recall', 'check recall', 'takata', 'is my car recalled'
    ],
    response: `**Toyota Official Safety Recalls** 🛡️\n\nYour safety is our paramount priority. CFAO Toyota Zimbabwe conducts **100% free safety recall repairs** on all eligible Toyota vehicles, including Takata airbags, fuel pump updates, and steering sensors.\n\n**How to check if your Toyota is affected:**\n1️⃣ Locate your 17-digit Chassis / VIN number (found on your registration book or base of windscreen).\n2️⃣ Contact our service desk at **+263 (24) 2750031** or email **recalls@cfao.com**.\n3️⃣ If affected, all parts and labor are provided **completely free of charge**.`,
    quickReplies: [
      { label: '📞 Contact Service Desk', value: 'contact harare' },
      { label: '🔧 Book Workshop Visit', value: 'book service form' },
    ],
    link: { label: 'Contact Service Team', path: '/contact' },
  },

  // ── 14. ALL VEHICLES CATALOGUE ──
  {
    id: 'vehicles_all',
    keywords: ['vehicle', 'vehicles', 'models', 'cars', 'range', 'lineup', 'what cars', 'what models', 'browse'],
    response: `We stock **14 brand new Toyota models** across 6 categories:\n\n🏙️ **City** — Starlet\n🚘 **Sedan** — Corolla Sedan\n🚙 **SUV** — Starlet Cross, Urban Cruiser, Corolla Cross HEV, RAV4, Fortuner\n🏔️ **4x4** — Land Cruiser Prado, Land Cruiser 300, LC 76 Station Wagon\n🛻 **Pick-up** — Hilux Double Cab, Land Cruiser 79 Pickup\n🚐 **LCV** — Land Cruiser 78 Troop Carrier, Hiace Ses'fikile`,
    quickReplies: [
      { label: '🎯 Help Me Choose', value: 'help me choose' },
      { label: '🚙 View SUVs & 4x4s', value: 'suv models' },
      { label: '🛻 View Pick-ups', value: 'pickup models' },
      { label: '💰 Price Guide', value: 'vehicle pricing' },
    ],
    link: { label: 'View Full Catalogue', path: '/vehicles' },
  },

  // ── 15. SUV LINEUP ──
  {
    id: 'vehicles_suv',
    keywords: ['suv', 'suvs', 'crossover', 'rav4', 'corolla cross', 'urban cruiser', 'starlet cross', 'hybrid', 'hev', 'fortuner'],
    response: `Our **SUV & Crossover** lineup:\n\n• **Toyota Starlet Cross** — $26,000–$29,900 | 1.5L Petrol | Raised Crossover\n• **Toyota Urban Cruiser** — $28,500–$32,000 | 1.5L Petrol | Auto\n• **Corolla Cross HEV** — $38,000–$44,000 | Hybrid (4.3L/100km) ⚡\n• **Toyota RAV4** — $45,000–$55,000 | 2.0L Petrol | Auto | AWD\n• **Toyota Fortuner** — $52,000–$68,000 | 2.8L Diesel | 7-Seater Luxury 4WD`,
    quickReplies: [
      { label: '⚡ Tell me about the HEV', value: 'corolla cross hybrid' },
      { label: '🚙 Fortuner 7-Seater', value: 'fortuner' },
      { label: '📅 Book Test Drive', value: 'book a test drive' },
      { label: '🧮 Estimate Loan', value: 'instant loan calculator' },
    ],
    link: { label: 'View SUV Lineup', path: '/vehicles?category=SUV' },
  },

  // ── 16. 4X4 & OFF-ROAD ──
  {
    id: 'vehicles_4x4',
    keywords: ['4x4', 'land cruiser', 'prado', 'lc300', 'lc 300', 'lc76', 'lc 76', 'off road', 'offroad', 'four wheel', 'diff lock'],
    response: `Our **4x4 & Off-Road** lineup:\n\n• **Land Cruiser Prado** — $85,000–$110,000 | 2.8L Diesel | Multi-Terrain Select | 7 Seats\n• **Land Cruiser 300** — $120,000–$145,000 | 3.3L V6 Twin-Turbo Diesel (302 Hp)\n• **LC 76 Station Wagon** — $68,000–$78,000 | 4.2L Diesel | Dual Fuel Tanks | Africa Workhorse`,
    quickReplies: [
      { label: '🏆 LC300 Specs', value: 'land cruiser 300 details' },
      { label: '📅 Test Drive a Prado', value: 'book a test drive' },
      { label: '🧮 Estimate 4x4 Loan', value: 'instant loan calculator' },
    ],
    link: { label: 'View 4x4 Lineup', path: '/vehicles?category=4x4' },
  },

  // ── 17. PICK-UPS & BAKKIES ──
  {
    id: 'vehicles_pickup',
    keywords: ['hilux', 'pickup', 'pick up', 'pick-up', 'lc79', 'lc 79', 'double cab', 'single cab', 'bakkie', 'load hauler'],
    response: `Our **Pick-up** lineup:\n\n• **Toyota Hilux Double Cab** — $40,000–$65,000 | 2.8L GD-6 Diesel | Auto/Manual\n  1-tonne payload, 3.5-tonne towing, Active Traction Control\n• **Land Cruiser 79 Pickup** — $65,000–$76,000 | 4.2L Diesel | Manual\n  Heavy-duty steel chassis for mining, farming & commercial transport`,
    quickReplies: [
      { label: '📅 Test Drive Hilux', value: 'book a test drive' },
      { label: '🛻 Fleet Volume Pricing', value: 'fleet' },
      { label: '🧮 Estimate Hilux Payment', value: 'instant loan calculator' },
    ],
    link: { label: 'View Pick-up Lineup', path: '/vehicles?category=Pick-up' },
  },

  // ── 18. LAND CRUISER 300 DETAILS ──
  {
    id: 'lc300_details',
    keywords: ['lc300 details', 'land cruiser 300 details', 'lc 300 specs', 'land cruiser 300 specs', 'lc300 price'],
    response: `**Toyota Land Cruiser 300 Series** 🏆\n\nThe absolute pinnacle of automotive engineering and prestige in Zimbabwe:\n\n• **Price:** $120,000 – $145,000\n• **Engine:** 3.3L V6 Twin-Turbo Diesel (302 Hp, 700 Nm torque)\n• **Transmission:** 10-Speed Direct-Shift Automatic\n• **Suspension:** Electronic Kinetic Dynamic Suspension System (E-KDSS)\n• **Interior:** First-class seating, heated steering, 12.3" multimedia, rear entertainment\n• **Safety:** Pre-Collision System, Blind Spot Monitor, 360 Multi-Terrain Monitor`,
    quickReplies: [
      { label: '📅 Book LC300 Viewing', value: 'book a test drive' },
      { label: '🧮 Estimate LC300 Loan', value: 'instant loan calculator' },
      { label: '📞 Speak to VIP Sales', value: 'contact harare' },
    ],
    link: { label: 'View LC300 Details', path: '/vehicles/lc300' },
  },

  // ── 19. HYBRID TECHNOLOGY (HEV) ──
  {
    id: 'hybrid',
    keywords: ['hybrid', 'hev', 'electric', 'eco', 'fuel economy', 'fuel efficient', 'green', 'corolla cross hev', 'self charging'],
    response: `**Toyota Self-Charging Hybrid (HEV) Technology** ⚡\n\nNo charging cables or power plugs required — the battery recharges automatically as you drive and brake!\n\n• **Corolla Cross HEV** — $38,000–$44,000\n  Fuel economy: **4.3L/100km** (saves up to 40% fuel vs standard petrol)\n• **Silent EV Mode:** Zero fuel consumption in slow Harare peak-hour traffic\n• **Full 5-Year / 100,000 km Hybrid Battery Warranty**\n• Unaffected by Zimbabwe's national power grid loadshedding`,
    quickReplies: [
      { label: '📅 Test Drive the HEV', value: 'book a test drive' },
      { label: '🧮 Estimate HEV Payment', value: 'instant loan calculator' },
      { label: '⛽ Fuel Comparison', value: 'zimbabwe fuel compatibility' },
    ],
    link: { label: 'View Corolla Cross Hybrid', path: '/vehicles/corolla-cross-hev' },
  },

  // ── 20. PRICING GUIDE ──
  {
    id: 'pricing',
    keywords: ['price', 'prices', 'pricing', 'cost', 'how much', 'cheapest', 'most expensive', 'affordable', 'budget'],
    response: `**Toyota Zimbabwe Official Price Guide (USD)** 💰\n\n🏙️ **Starlet** — from **$22,500**\n🚙 **Starlet Cross** — from **$26,000**\n🚙 **Urban Cruiser** — from **$28,500**\n🚘 **Corolla Sedan** — from **$29,000**\n🚙 **Corolla Cross HEV** — from **$38,000**\n🚐 **Hiace Ses'fikile (16-Seat)** — from **$39,500**\n🛻 **Hilux Double Cab** — from **$40,000**\n🚙 **RAV4** — from **$45,000**\n🚙 **Fortuner 7-Seater** — from **$52,000**\n🛻 **LC 79 Pickup** — from **$65,000**\n🏔️ **LC 76 Station Wagon** — from **$68,000**\n🏔️ **Land Cruiser Prado** — from **$85,000**\n🏆 **Land Cruiser 300** — from **$120,000**`,
    quickReplies: [
      { label: '🧮 Instant Loan Estimator', value: 'instant loan calculator' },
      { label: '🏛️ Civil Servants Rebate', value: 'civil servants rebate' },
      { label: '🎁 Current Promotions', value: 'current promotions' },
    ],
    link: { label: 'Browse Catalogue with Filters', path: '/vehicles' },
  },

  // ── 21. TEST DRIVE ──
  {
    id: 'test_drive',
    keywords: ['test drive', 'test-drive', 'testdrive', 'drive', 'try', 'experience', 'book a test', 'schedule a drive'],
    response: `**Book an Official Toyota Test Drive** 📅\n\nExperience any model on Zimbabwean roads with zero cost or purchase obligation!\n\n✅ Available at all **8 CFAO branches** across Zimbabwe\n✅ Mon–Fri: 8:00 AM – 5:00 PM | Sat: 8:00 AM – 12:00 PM\n✅ Valid driver's licence required on the day\n✅ Our team calls within **24 hours** to confirm your reservation`,
    quickReplies: [
      { label: '📋 Open Booking Form', value: 'test drive form' },
      { label: '📍 Find Nearest Branch', value: 'branch locations' },
      { label: '🚗 Select a Model', value: 'show me your vehicles' },
    ],
    link: { label: 'Book Test Drive Now', path: '/test-drive' },
  },
  {
    id: 'test_drive_form',
    keywords: ['test drive form', 'booking form', 'fill form', 'reserve test drive'],
    response: `To reserve your test drive, jump over to our **Test Drive booking page** where you can select your model, preferred branch, date, and morning/afternoon time slot.`,
    link: { label: 'Go to Test Drive Form', path: '/test-drive' },
  },

  // ── 22. FINANCE OPTIONS & DOCUMENTS ──
  {
    id: 'finance',
    keywords: ['finance', 'loan', 'instalment', 'monthly payment', 'deposit', 'credit', 'installment', 'pay monthly', 'buy on credit', 'bank finance'],
    response: `**Vehicle Asset Finance with Zimbabwe's Leading Banks** 💳\n\nWe provide integrated financing through:\n🏦 **CBZ Bank** · **ZB Bank** · **FBC Bank** · **Steward Bank**\n\n✅ Deposits from as low as **15%**\n✅ Repayment tenures: **12 to 60 months**\n✅ Transparent interest rates & zero early termination penalties\n✅ Fast-track pre-approvals within 48 to 72 hours`,
    quickReplies: [
      { label: '🧮 Instant Loan Estimator', value: 'instant loan calculator' },
      { label: '📄 Required Documents', value: 'finance documents' },
      { label: '🏛️ Civil Servants Rebate', value: 'civil servants rebate' },
    ],
    link: { label: 'Explore Finance Suite', path: '/finance' },
  },
  {
    id: 'finance_documents',
    keywords: ['finance documents', 'what documents', 'documents needed', 'requirements finance', 'what do i need for loan'],
    response: `**Documents Needed for Bank Vehicle Finance in Zimbabwe:**\n\n1️⃣ Valid National ID or Passport\n2️⃣ Latest 3 months stamped bank statements\n3️⃣ Current payslip or audited financials (for corporates)\n4️⃣ Proof of residence (ZESA bill / lease agreement)\n5️⃣ Valid driver's licence\n6️⃣ CR14 & Certificate of Incorporation (for business buyers)\n\nSubmit these through our online portal or directly to our Harare/Bulawayo finance desks.`,
    link: { label: 'Apply for Finance Online', path: '/finance' },
  },

  // ── 23. SERVICE & WORKSHOP BOOKINGS ──
  {
    id: 'service_booking',
    keywords: ['service', 'servicing', 'service booking', 'maintenance', 'book service', 'workshop', 'repair', 'service my car'],
    response: `**Toyota Certified Workshop Services** 🔧\n\nEnsure your vehicle stays in peak showroom condition:\n\n🔩 Scheduled Maintenance (Minor & Major Services)\n⚙️ Engine, Transmission & Heavy Mechanical Overhauls\n🛠️ Genuine OEM Parts & Fluid Replacements\n✅ Official Warranty Diagnostics & Recall Updates\n🏢 Corporate & Mining Fleet Maintenance Contracts\n\n*All repairs performed by Toyota Master Certified Technicians.*`,
    quickReplies: [
      { label: '📋 Book a Service Slot', value: 'book service form' },
      { label: '🔩 Spare Parts Enquiry', value: 'spare parts' },
      { label: '📍 Workshop Branches', value: 'branch locations' },
    ],
    link: { label: 'Book Workshop Service', path: '/services' },
  },
  {
    id: 'book_service_form',
    keywords: ['book service form', 'schedule service', 'service appointment', 'service slot'],
    response: `Ready to bring your vehicle in? Select your model, service type, and preferred appointment date on our online booking form.`,
    link: { label: 'Open Service Booking Form', path: '/services' },
  },

  // ── 24. GENUINE SPARE PARTS ──
  {
    id: 'parts',
    keywords: ['parts', 'spare parts', 'spares', 'accessories', 'components', 'genuine parts', 'filter', 'brake pads', 'shock', 'battery', 'bull bar'],
    response: `**Official Toyota Genuine Parts & Accessories** 🔩\n\nWe warehouse and import authentic OEM Toyota components directly:\n\n• Engine & Drivetrain (filters, belts, gaskets, plugs)\n• Brakes & Suspension (pads, discs, shocks, bushes)\n• Electrical & Lighting (batteries, starters, alternators)\n• Heavy Accessories (TJM/Toyota bull bars, tow bars, snorkels, roof racks)\n\n*Every genuine component protects your warranty and guarantees exact factory tolerances.*`,
    quickReplies: [
      { label: '📋 Request a Quote', value: 'parts enquiry' },
      { label: '⚠️ Fake vs Genuine Parts', value: 'counterfeit parts' },
      { label: '📍 Parts Counters', value: 'branch locations' },
    ],
    link: { label: 'Order Parts Online', path: '/parts' },
  },
  {
    id: 'parts_enquiry',
    keywords: ['parts enquiry', 'parts quote', 'order parts', 'part number', 'source parts'],
    response: `Submit an online **Parts Enquiry** with your model, year, part description, or part number. Our parts team responds within **2 business days** with pricing and stock availability.`,
    link: { label: 'Go to Parts Form', path: '/parts' },
  },

  // ── 25. DEALERSHIP BRANCH LOCATIONS ──
  {
    id: 'branches',
    keywords: ['branch', 'branches', 'location', 'locations', 'where', 'address', 'dealership', 'harare', 'bulawayo', 'mutare', 'gweru', 'masvingo', 'kadoma', 'chiredzi', 'nearest', 'near me', 'dealers'],
    response: `**CFAO Toyota Zimbabwe — 8 Dealership Branches** 📍\n\n🏢 **Harare (Head Office):** 59-61 Coventry Road, Workington\n🏢 **Harare (Croco):** 100 Seke Road\n🏢 **Bulawayo:** Corner 12th Ave & Fife Street\n🏢 **Mutare:** 15 Herbert Chitepo Street\n🏢 **Gweru:** 18 Robert Mugabe Way\n🏢 **Masvingo:** 67 Hughes Street (Byword Motors)\n🏢 **Kadoma:** 5 Fourth Street\n🏢 **Chiredzi:** 32 Guava Road (Lowveld Toyota)\n\n⏰ Mon–Fri: 8:00 AM – 5:00 PM | Sat: 8:00 AM – 12:00 PM`,
    quickReplies: [
      { label: '📞 Harare Head Office', value: 'contact harare' },
      { label: '📞 Bulawayo Branch', value: 'contact bulawayo' },
      { label: '🗺️ Interactive Map', value: 'contact map' },
    ],
    link: { label: 'View Interactive Dealer Map', path: '/contact' },
  },
  {
    id: 'contact_harare',
    keywords: ['contact harare', 'harare phone', 'harare email', 'harare number', 'call harare'],
    response: `**CFAO Toyota Harare (Head Office)** 📞\n\n📍 59-61 Coventry Road, Workington, Harare\n📞 +263 (24) 2750031 / 9\n✉️ sales.harare@cfao.com\n⏰ Mon–Fri: 8:00 AM–5:00 PM | Sat: 8:00 AM–12:00 PM`,
    quickReplies: [
      { label: '📅 Book Test Drive', value: 'book a test drive' },
      { label: '🔧 Book Workshop Service', value: 'book service form' },
    ],
  },
  {
    id: 'contact_bulawayo',
    keywords: ['contact bulawayo', 'bulawayo phone', 'bulawayo email', 'call bulawayo'],
    response: `**CFAO Toyota Bulawayo** 📞\n\n📍 Corner 12th Avenue & Fife Street, Bulawayo\n📞 +263 (29) 2262521 / 5\n✉️ sales.bulawayo@cfao.com\n⏰ Mon–Fri: 8:00 AM–5:00 PM | Sat: 8:00 AM–12:00 PM`,
  },
  {
    id: 'contact_map',
    keywords: ['contact map', 'map', 'show map', 'all branches', 'dealer map', 'interactive map'],
    response: `Open our **Interactive Dealer Map** to locate all 8 branches across Zimbabwe with driving directions and branch contact numbers.`,
    link: { label: 'Open Dealer Map', path: '/contact' },
  },

  // ── 26. PROMOTIONS ──
  {
    id: 'promotions',
    keywords: ['promotion', 'promotions', 'deal', 'deals', 'offer', 'offers', 'discount', 'special', 'sale', 'promo'],
    response: `**Current Toyota Zimbabwe Promotions** 🎁\n\n🛻 **Hilux Fleet Advantage:** Preferential pricing on 3+ units + free 2-year service plans\n⚡ **Corolla Cross HEV Launch:** Reduced 10% deposit + 5-year warranty\n🔧 **Mid-Year Service Special:** 15% off scheduled maintenance at all branches\n🏆 **LC300 Executive Upgrade:** Complimentary $3,500 accessory voucher\n💳 **RAV4 Easy Finance:** Subsidized bank rates across CBZ and ZB Bank`,
    quickReplies: [
      { label: '🛻 Hilux Fleet Deal', value: 'fleet' },
      { label: '🔧 Service Special', value: 'service discount' },
      { label: '📋 View All Deals', value: 'view promotions' },
    ],
    link: { label: 'View All Promotions', path: '/promotions' },
  },
  {
    id: 'service_discount',
    keywords: ['service discount', 'service special', 'discount service', 'workshop discount', '15%'],
    response: `**Mid-Year Workshop Service Special** 🔧\n\nEnjoy **15% off ALL scheduled maintenance services** across Harare and Bulawayo workshops!\n\n✅ Valid for all Toyota passenger and commercial models\n✅ Includes free 50-point safety health check\n✅ Free tyre rotation + battery load test`,
    link: { label: 'Book Service Appointment', path: '/services' },
  },

  // ── 27. FLEET & MINING OPERATIONS ──
  {
    id: 'fleet',
    keywords: ['fleet', 'corporate', 'mining', 'company cars', 'bulk order', 'fleet deal', 'fleet pricing', 'multiple vehicles'],
    response: `**Corporate, Mining & Agricultural Fleet Solutions** 🏭\n\nCFAO Toyota Zimbabwe is the trusted fleet partner to Zimbabwe's leading mining houses and agricultural enterprises:\n\n✅ Dedicated Corporate Fleet Key Account Manager\n✅ Mine-spec customization (ROPS roll cages, speed limiters, fire suppression)\n✅ Bulk discount structures on Hilux, LC79, and Hiace fleets\n✅ Preferential parts supply agreements & on-site technical support`,
    quickReplies: [
      { label: '📞 Contact Fleet Desk', value: 'contact harare' },
      { label: '🎁 Fleet Promotions', value: 'promotions' },
    ],
    link: { label: 'Fleet Deals & Contact', path: '/promotions' },
  },

  // ── 28. WARRANTY DETAILS ──
  {
    id: 'warranty',
    keywords: ['warranty', 'guarantee', 'manufacturer warranty', 'how long warranty', 'warranty period'],
    response: `**Official Toyota Manufacturer Warranty** ✅\n\nEvery brand new Toyota purchased from CFAO Zimbabwe includes:\n\n🛡️ **3-Year / 100,000 km** Manufacturer Warranty\n⚡ **5-Year / 100,000 km** Warranty on Hybrid Batteries (Corolla Cross HEV)\n🛡️ Preserved exclusively when serviced at authorized CFAO workshops with genuine Toyota parts.`,
    quickReplies: [
      { label: '🔧 Book Warranty Service', value: 'book service form' },
      { label: '🔩 Genuine Parts', value: 'spare parts' },
    ],
  },

  // ── 29. NEWS & RELEASES ──
  {
    id: 'news',
    keywords: [
      'news', 'latest news', 'fetch news', 'toyota news', 'news on toyota', 'toyota zimbabwe news',
      'news on toyota cars', 'what is happening', 'announcements', 'media', 'press', 'launch',
      'sables', 'rugby', 'sables partnership', 'mining fleet news', 'recent news', 'headlines'
    ],
    response: `**Toyota Zimbabwe Live News & Media** 📰\n\nLatest reported headlines from our live news desk:\n\n🏉 **The Sables Partnership:** CFAO Mobility Zimbabwe named Official Vehicle Partner of the Zimbabwe National Rugby Team through the 2027 World Cup!\n🏢 **CFAO Mobility Zimbabwe:** Operational integration uniting Toyota Zimbabwe and CFAO Motors.\n🚙 **All-New Land Cruiser Prado:** Officially launched with 2.8L GD-6 diesel and MTS.\n⚡ **Hybrid Revolution:** 47% surge in self-charging Corolla Cross and RAV4 HEV sales.\n🏭 **Mining Fleet Deal:** Historic $8M contract for over 120 Land Cruiser 79 and Hilux units.\n\nYou can read all full articles or fetch live updates in our Newsroom.`,
    quickReplies: [
      { label: '📰 Open Live Newsroom', value: 'news' },
      { label: '🏉 The Sables Deal', value: 'sables' },
      { label: '🚙 Land Cruiser Prado', value: 'vehicles_4x4' },
      { label: '⚡ Hybrid Technology', value: 'hybrid' },
    ],
    link: { label: 'Open Live Newsroom', path: '/news' },
  },

  // ── 30. SABLES RUGBY PARTNERSHIP ──
  {
    id: 'sables_partnership',
    keywords: ['sables', 'rugby', 'sables partnership', 'national rugby team', 'sables sponsorship', 'zimbabwe rugby'],
    response: `**Official Vehicle Partner of The Sables (2025–2027)** 🏉\n\nCFAO Mobility Zimbabwe is proud to be named the **Official Automotive & Vehicle Partner** of the Zimbabwe Men's National Rugby Team ("The Sables") through to the 2027 Rugby World Cup in Australia!\n\n• Providing a dedicated fleet of **Toyota Hilux Double Cabs** and **Fortuners** for team logistics and technical staff.\n• Supporting grassroots rugby youth development camps across Harare and Bulawayo.\n• Bringing together two symbols of Zimbabwean power, endurance, and uncompromising excellence.`,
    quickReplies: [
      { label: '📰 Read Sables Press Release', value: 'news' },
      { label: '🛻 View Hilux Lineup', value: 'pickup models' },
    ],
    link: { label: 'Read Story on News Page', path: '/news' },
  },

  // ── 31. ABOUT CFAO & TOYOTA ──
  {
    id: 'about',
    keywords: ['about', 'about toyota', 'who are you', 'cfao', 'company', 'history', 'distributor'],
    response: `**About CFAO Mobility & Toyota Zimbabwe** 🇿🇼\n\nWe are the official authorized distributor and importer of brand new Toyota vehicles and genuine parts in Zimbabwe.\n\nUnder the **CFAO Group** (with over 120 years of African automotive heritage), we guarantee full manufacturer backing, tropicalized vehicles, and nationwide after-sales infrastructure.`,
    link: { label: 'Learn More About Us', path: '/about' },
  },
];

// ── Smarter Multi-Keyword & Intent Matcher ────────────────────────────────────
export function matchIntent(input: string): Intent | null {
  const normalized = input
    .toLowerCase()
    .replace(/[?!.,/\\#@$%^&*;:{}=\-_`~()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!normalized) return null;

  const words = normalized.split(' ');
  let bestIntent: Intent | null = null;
  let highestScore = 0;

  for (const intent of intents) {
    let currentScore = 0;

    for (const keyword of intent.keywords) {
      const kw = keyword.toLowerCase().trim();

      // Exact full phrase match in input
      if (normalized === kw) {
        currentScore += 120;
      } else if (normalized.includes(kw)) {
        // Multi-word phrase matches get extra weight
        const kwWords = kw.split(' ');
        if (kwWords.length > 1) {
          currentScore += 50 + kw.length * 2;
        } else {
          // Check for whole word match vs substring
          const isWholeWord = words.includes(kw);
          currentScore += isWholeWord ? 25 + kw.length : kw.length;
        }
      }
    }

    if (currentScore > highestScore && currentScore >= 10) {
      highestScore = currentScore;
      bestIntent = intent;
    }
  }

  return bestIntent;
}
