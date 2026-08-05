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
}

// ── Greeting & fallback ──────────────────────────────────────────────────────
export const GREETING_RESPONSE = {
  text: `Hello! 👋 Welcome to **Toyota Zimbabwe** by CFAO.\n\nI'm here to help you with vehicles, pricing, test drives, finance, services, spare parts, and branch information.\n\nWhat can I help you with today?`,
  quickReplies: [
    { label: '🚗 Browse Models', value: 'show me your vehicles' },
    { label: '📅 Book Test Drive', value: 'book a test drive' },
    { label: '💰 Finance Options', value: 'finance options' },
    { label: '🔧 Book a Service', value: 'book a service' },
    { label: '📍 Find a Branch', value: 'branch locations' },
    { label: '🎁 Promotions', value: 'current promotions' },
  ] as QuickReply[],
};

export const FALLBACK_RESPONSES = [
  `I'm not quite sure about that. Try asking me about our **vehicles**, **test drives**, **finance**, **service bookings**, **spare parts**, or **branch locations**.`,
  `I didn't catch that — could you rephrase? I can help with **pricing**, **models**, **bookings**, **promotions**, and much more.`,
  `Hmm, I'm not sure how to answer that. You can also reach our team directly at **+263 (24) 2750031** or email **sales.harare@cfao.com**.`,
];

// ── Intents ──────────────────────────────────────────────────────────────────
export const intents: Intent[] = [
  // VEHICLES
  {
    id: 'vehicles_all',
    keywords: ['vehicle', 'vehicles', 'models', 'cars', 'range', 'lineup', 'what cars', 'what models', 'browse'],
    response: `We stock **12 brand new Toyota models** across 6 categories:\n\n🏙️ **City** — Starlet\n🚘 **Sedan** — Corolla Sedan\n🚙 **SUV** — Starlet Cross, Urban Cruiser, Corolla Cross HEV, RAV4\n🏔️ **4x4** — Land Cruiser Prado, Land Cruiser 300, LC 76 Station Wagon\n🛻 **Pick-up** — Hilux Double Cab, Land Cruiser 79 Pickup\n🚐 **LCV** — Land Cruiser 78 Troop Carrier`,
    quickReplies: [
      { label: '🚙 View SUVs', value: 'suv models' },
      { label: '🏔️ View 4x4s', value: '4x4 models' },
      { label: '🛻 View Pick-ups', value: 'pickup models' },
      { label: '💰 Pricing', value: 'vehicle pricing' },
    ],
    link: { label: 'View Full Catalogue', path: '/vehicles' },
  },
  {
    id: 'vehicles_suv',
    keywords: ['suv', 'suvs', 'crossover', 'rav4', 'corolla cross', 'urban cruiser', 'starlet cross', 'hybrid', 'hev'],
    response: `Our **SUV & Crossover** lineup:\n\n• **Toyota Starlet Cross** — $26,000–$29,900 | 1.5L Petrol | Auto\n• **Toyota Urban Cruiser** — $28,500–$32,000 | 1.5L Petrol | Auto\n• **Corolla Cross HEV** — $38,000–$44,000 | Hybrid | HEV E-CVT ⚡\n• **Toyota RAV4** — $45,000–$55,000 | 2.0L Petrol | Auto | AWD`,
    quickReplies: [
      { label: '⚡ Tell me about the HEV', value: 'corolla cross hybrid' },
      { label: '📅 Book Test Drive', value: 'book a test drive' },
      { label: '💰 Finance an SUV', value: 'finance options' },
    ],
    link: { label: 'View SUV Lineup', path: '/vehicles?category=SUV' },
  },
  {
    id: 'vehicles_4x4',
    keywords: ['4x4', 'land cruiser', 'prado', 'lc300', 'lc 300', 'lc76', 'lc 76', 'off road', 'offroad', 'four wheel'],
    response: `Our **4x4 & Off-Road** lineup:\n\n• **Land Cruiser Prado** — $85,000–$110,000 | 2.8L Diesel | Auto | MTS\n• **Land Cruiser 300** — $120,000–$145,000 | 3.3L V6 Twin-Turbo | 10-Spd Auto\n• **LC 76 Station Wagon** — $68,000–$78,000 | 4.2L Diesel | Manual | Workhorse`,
    quickReplies: [
      { label: '🏆 Tell me about LC300', value: 'land cruiser 300 details' },
      { label: '📅 Test Drive a Prado', value: 'book a test drive' },
      { label: '💰 Finance a 4x4', value: 'finance options' },
    ],
    link: { label: 'View 4x4 Lineup', path: '/vehicles?category=4x4' },
  },
  {
    id: 'vehicles_pickup',
    keywords: ['hilux', 'pickup', 'pick up', 'pick-up', 'lc79', 'lc 79', 'double cab', 'single cab', 'bakkie'],
    response: `Our **Pick-up** lineup:\n\n• **Toyota Hilux Double Cab** — $40,000–$65,000 | 2.8L Diesel | Auto/Manual\n  1-tonne payload, 3.5-tonne towing, Active Traction Control\n• **Land Cruiser 79 Pickup** — $65,000–$76,000 | 4.2L Diesel | Manual\n  Heavy-duty for mining, farming & remote operations`,
    quickReplies: [
      { label: '📅 Test Drive Hilux', value: 'book a test drive' },
      { label: '🚛 Fleet pricing', value: 'fleet' },
      { label: '💰 Finance options', value: 'finance options' },
    ],
    link: { label: 'View Pick-up Lineup', path: '/vehicles?category=Pick-up' },
  },
  {
    id: 'lc300_details',
    keywords: ['lc300 details', 'land cruiser 300 details', 'lc 300 specs', 'land cruiser 300 specs', 'lc300 price'],
    response: `**Toyota Land Cruiser 300 Series** 🏆\n\nThe pinnacle of luxury and off-road engineering.\n\n• **Price:** $120,000–$145,000\n• **Engine:** 3.3L V6 Twin-Turbo Diesel — 302 Hp\n• **Gearbox:** 10-Speed Automatic\n• **Suspension:** E-KDSS Electronic System\n• **Safety:** Pre-Crash System, Blind Spot Monitor\n• **Interior:** Heated steering, 12.3" multimedia, 8-seater`,
    quickReplies: [
      { label: '📅 Book Test Drive', value: 'book a test drive' },
      { label: '💰 Finance this vehicle', value: 'finance options' },
      { label: '📞 Speak to sales', value: 'contact sales' },
    ],
    link: { label: 'View LC300 Details', path: '/vehicles/lc300' },
  },
  {
    id: 'hybrid',
    keywords: ['hybrid', 'hev', 'electric', 'eco', 'fuel economy', 'fuel efficient', 'green', 'corolla cross hev', 'self charging'],
    response: `**Toyota Hybrid (HEV) Technology** ⚡\n\nOur hybrid vehicles are **self-charging** — no plug required!\n\n• **Corolla Cross HEV** — $38,000–$44,000\n  Fuel economy: **4.3L/100km** — up to 40% savings vs petrol\n• **EV Mode** for silent low-speed driving\n• Reduces CO₂ emissions significantly\n• Full Toyota warranty — no extra maintenance cost\n\nPerfect for Harare city driving and highway use.`,
    quickReplies: [
      { label: '📅 Test Drive the HEV', value: 'book a test drive' },
      { label: '💰 Finance options', value: 'finance options' },
      { label: '🌿 Environmental info', value: 'environment' },
    ],
  },

  // PRICING
  {
    id: 'pricing',
    keywords: ['price', 'prices', 'pricing', 'cost', 'how much', 'cheapest', 'most expensive', 'affordable', 'budget'],
    response: `**Toyota Zimbabwe Price Guide** 💰\n\nPrices are indicative — confirm at your nearest branch:\n\n🏙️ Starlet — from **$22,500**\n🚘 Corolla Sedan — from **$29,000**\n🚙 Starlet Cross — from **$26,000**\n🚙 Urban Cruiser — from **$28,500**\n🚙 Corolla Cross HEV — from **$38,000**\n🚙 RAV4 — from **$45,000**\n🏔️ Land Cruiser Prado — from **$85,000**\n🛻 Hilux Double Cab — from **$40,000**\n🏆 Land Cruiser 300 — from **$120,000**`,
    quickReplies: [
      { label: '💳 Finance Calculator', value: 'finance options' },
      { label: '📅 Book Test Drive', value: 'book a test drive' },
      { label: '🎁 Current Promotions', value: 'current promotions' },
    ],
    link: { label: 'Browse All Models', path: '/vehicles' },
  },

  // TEST DRIVE
  {
    id: 'test_drive',
    keywords: ['test drive', 'test-drive', 'testdrive', 'drive', 'try', 'experience', 'book a test', 'schedule a drive'],
    response: `**Book a Test Drive** 📅\n\nTest drive any Toyota model at no cost and with no obligation!\n\n✅ Available at all **8 CFAO branches** across Zimbabwe\n✅ Mon–Fri: 8:00 AM – 5:00 PM | Sat: 8:00 AM – 12:00 PM\n✅ Bring a valid **driver's licence**\n✅ Our team confirms your slot within **24 hours**\n\nChoose your preferred model, branch, date and time on our booking form.`,
    quickReplies: [
      { label: '📋 Fill Booking Form', value: 'test drive form' },
      { label: '📍 Find a Branch', value: 'branch locations' },
      { label: '🚗 Which model?', value: 'show me your vehicles' },
    ],
    link: { label: 'Book Test Drive', path: '/test-drive' },
  },
  {
    id: 'test_drive_form',
    keywords: ['test drive form', 'booking form', 'fill form', 'reserve test drive'],
    response: `To book your test drive, head to our **Test Drive page** and complete the form with:\n\n1️⃣ Your name & contact details\n2️⃣ Preferred Toyota model\n3️⃣ Nearest branch\n4️⃣ Preferred date & time slot\n5️⃣ Driver's licence number\n\nWe'll call you back within **24 hours** to confirm.`,
    link: { label: 'Go to Booking Form', path: '/test-drive' },
  },

  // FINANCE
  {
    id: 'finance',
    keywords: ['finance', 'loan', 'instalment', 'monthly payment', 'deposit', 'credit', 'installment', 'pay monthly', 'buy on credit', 'i buy'],
    response: `**Vehicle Finance** 💳\n\nWe partner with Zimbabwe's leading banks to make your Toyota affordable:\n\n🏦 **CBZ Bank** · **ZB Bank** · **FBC Bank** · **Steward Bank**\n\n✅ Deposits from as low as **15%**\n✅ Repayment terms: **12 to 60 months**\n✅ Competitive interest rates\n✅ No early settlement penalties\n\nUse our **Payment Calculator** to estimate your monthly instalment before applying.`,
    quickReplies: [
      { label: '🧮 Payment Calculator', value: 'payment calculator' },
      { label: '📋 Apply for Finance', value: 'apply finance' },
      { label: '📄 What documents?', value: 'finance documents' },
    ],
    link: { label: 'Finance Page', path: '/finance' },
  },
  {
    id: 'finance_calculator',
    keywords: ['calculator', 'calculate', 'payment calculator', 'monthly instalment', 'estimate payment', 'how much per month'],
    response: `Our **Payment Calculator** lets you estimate monthly instalments using:\n\n• 🚗 Vehicle price (slide from $15,000 – $145,000)\n• 💵 Deposit percentage (10% – 50%)\n• 📅 Repayment term (12 – 60 months)\n• 📊 Interest rate (adjustable)\n\nResults update instantly. Note: figures are estimates — final terms are confirmed by the bank after credit assessment.`,
    link: { label: 'Open Calculator', path: '/finance' },
  },
  {
    id: 'finance_documents',
    keywords: ['finance documents', 'what documents', 'documents needed', 'what do i need', 'requirements finance'],
    response: `**Documents needed for finance application:**\n\n1️⃣ Valid Zimbabwe National ID or Passport\n2️⃣ 3 months recent bank statements\n3️⃣ Latest payslip or proof of income\n4️⃣ Proof of residence (utility bill / lease)\n5️⃣ Valid driver's licence\n6️⃣ Company registration (for business purchases)\n\nBring these to any CFAO branch or submit via our online form.`,
    link: { label: 'Apply for Finance', path: '/finance' },
  },

  // SERVICES
  {
    id: 'service_booking',
    keywords: ['service', 'servicing', 'service booking', 'maintenance', 'book service', 'workshop', 'repair', 'service my car'],
    response: `**Toyota After-Sales Services** 🔧\n\nOur certified workshops offer:\n\n🔩 Scheduled Maintenance & Servicing\n🛠️ Genuine Parts Installation\n✅ Manufacturer Warranty Diagnostics\n⚙️ Engine, Gearbox & Suspension Repair\n🏭 Corporate & Mining Fleet Care\n\nAll work is performed by **Toyota-certified master technicians** using **genuine Toyota parts**.`,
    quickReplies: [
      { label: '📋 Book a Service', value: 'book service form' },
      { label: '🔩 Spare Parts', value: 'spare parts' },
      { label: '📍 Workshop Locations', value: 'branch locations' },
    ],
    link: { label: 'Services & Booking', path: '/services' },
  },
  {
    id: 'book_service_form',
    keywords: ['book service form', 'schedule service', 'service appointment', 'service slot'],
    response: `To book a service appointment fill in our form with:\n\n• Your name, email & phone\n• Preferred date\n• Vehicle model\n• Service type\n\nOur service team will call you back to confirm your slot at **Harare (Coventry Road)** or **Bulawayo**.`,
    link: { label: 'Book Service Now', path: '/services' },
  },

  // SPARE PARTS
  {
    id: 'parts',
    keywords: ['parts', 'spare parts', 'spares', 'accessories', 'components', 'genuine parts', 'filter', 'brake pads', 'shock', 'battery'],
    response: `**Genuine Toyota Spare Parts** 🔩\n\nWe stock genuine OEM Toyota parts for all models:\n\n• Engine & Drivetrain (filters, belts, gaskets)\n• Brakes & Suspension (pads, discs, shocks)\n• Electrical & Lighting (batteries, sensors)\n• Body & Exterior (bumpers, glass, mirrors)\n• Accessories (bull bars, roof racks, side steps)\n\n⚠️ Genuine parts **preserve your warranty** and ensure perfect fitment.`,
    quickReplies: [
      { label: '📋 Request a Quote', value: 'parts enquiry' },
      { label: '📍 Parts Counter Location', value: 'branch locations' },
    ],
    link: { label: 'Parts Enquiry', path: '/parts' },
  },
  {
    id: 'parts_enquiry',
    keywords: ['parts enquiry', 'parts quote', 'order parts', 'part number', 'source parts'],
    response: `Submit a **Parts Enquiry** and our team will provide a quote within **2 business days**.\n\nHave ready:\n• Vehicle model & year\n• Part description (e.g. front brake pads)\n• Part number if known (e.g. 04465-0K350)\n• Your preferred collection branch\n• Urgency: Standard (5–14 days) or Urgent (2–5 days)`,
    link: { label: 'Submit Parts Enquiry', path: '/parts' },
  },

  // BRANCHES
  {
    id: 'branches',
    keywords: ['branch', 'branches', 'location', 'locations', 'where', 'address', 'dealership', 'harare', 'bulawayo', 'mutare', 'gweru', 'masvingo', 'kadoma', 'chiredzi', 'nearest', 'near me'],
    response: `**CFAO Toyota Zimbabwe — 8 Branch Network** 📍\n\n🏢 **Harare (Head Office)** — 59-61 Coventry Road, Workington\n🏢 **Harare (Croco)** — 100 Seke Road\n🏢 **Bulawayo** — Cnr 12th Ave & Fife Street\n🏢 **Mutare** — 15 Herbert Chitepo Street\n🏢 **Gweru** — 18 Robert Mugabe Way\n🏢 **Masvingo** — 67 Hughes Street (Byword)\n🏢 **Kadoma** — 5 Fourth Street\n🏢 **Chiredzi** — 32 Guava Road (Lowveld)\n\n⏰ Mon–Fri: 8:00 AM – 5:00 PM | Sat: 8:00 AM – 12:00 PM`,
    quickReplies: [
      { label: '📞 Harare Head Office', value: 'contact harare' },
      { label: '📞 Bulawayo Branch', value: 'contact bulawayo' },
      { label: '🗺️ Full Branch Map', value: 'contact map' },
    ],
    link: { label: 'View All Branches', path: '/contact' },
  },
  {
    id: 'contact_harare',
    keywords: ['contact harare', 'harare phone', 'harare email', 'harare number', 'call harare'],
    response: `**CFAO Toyota Harare (Head Office)** 📞\n\n📍 59-61 Coventry Road, Workington, Harare\n📞 +263 (24) 2750031 / 9\n✉️ sales.harare@cfao.com\n⏰ Mon–Fri: 8:00 AM–5:00 PM | Sat: 8:00 AM–12:00 PM`,
    quickReplies: [
      { label: '📅 Book Test Drive', value: 'book a test drive' },
      { label: '🔧 Book a Service', value: 'book service form' },
    ],
  },
  {
    id: 'contact_bulawayo',
    keywords: ['contact bulawayo', 'bulawayo phone', 'bulawayo email', 'call bulawayo'],
    response: `**CFAO Toyota Bulawayo** 📞\n\n📍 Corner 12th Avenue & Fife Street, Bulawayo\n📞 +263 (29) 2262521 / 5\n✉️ sales.bulawayo@cfao.com\n⏰ Mon–Fri: 8:00 AM–5:00 PM | Sat: 8:00 AM–12:00 PM`,
  },
  {
    id: 'contact_map',
    keywords: ['contact map', 'map', 'show map', 'all branches', 'dealer map'],
    response: `Our interactive **Dealer Map** shows all 8 CFAO Toyota branches across Zimbabwe with contact details for each location.`,
    link: { label: 'Open Dealer Map', path: '/contact' },
  },

  // PROMOTIONS
  {
    id: 'promotions',
    keywords: ['promotion', 'promotions', 'deal', 'deals', 'offer', 'offers', 'discount', 'special', 'sale', 'promo'],
    response: `**Current Toyota Zimbabwe Promotions** 🎁\n\n🛻 **Hilux Fleet Advantage** — Special pricing on 3+ Hilux units with free 2-year service plans\n⚡ **Corolla Cross HEV Launch** — 10% deposit + 5-year warranty (expires Sep 2026)\n🔧 **Mid-Year Service Special** — 15% off all scheduled maintenance\n🏆 **LC300 Executive Package** — Complimentary accessories worth $3,500\n💳 **RAV4 Easy Finance** — 15% deposit, up to 60 months`,
    quickReplies: [
      { label: '🛻 Fleet Deal', value: 'fleet' },
      { label: '🔧 Service Special', value: 'service discount' },
      { label: '📋 View All Promos', value: 'view promotions' },
    ],
    link: { label: 'View All Promotions', path: '/promotions' },
  },
  {
    id: 'view_promotions',
    keywords: ['view promotions', 'all promotions', 'see offers', 'all deals'],
    response: `Head to our **Promotions page** to see all 6 active offers with full terms, expiry dates, and direct enquiry links.`,
    link: { label: 'View Promotions', path: '/promotions' },
  },
  {
    id: 'service_discount',
    keywords: ['service discount', 'service special', 'discount service', 'workshop discount', '15%'],
    response: `**Mid-Year Service Special** 🔧\n\n15% off ALL scheduled maintenance services!\n\n✅ Valid for all Toyota models\n✅ Covers 10k, 20k, 40k, 80k km services\n✅ Includes free 50-point health check\n✅ Free tyre rotation + battery test\n\n⏳ Expires: **31 July 2026**`,
    link: { label: 'Book Service', path: '/services' },
  },

  // FLEET
  {
    id: 'fleet',
    keywords: ['fleet', 'corporate', 'mining', 'company cars', 'bulk order', 'fleet deal', 'fleet pricing', 'multiple vehicles'],
    response: `**Corporate & Mining Fleet** 🏭\n\nCFAO Toyota Zimbabwe is Zimbabwe's #1 fleet supplier for:\n\n🏗️ Mining operations\n🌾 Agricultural businesses\n🏢 Corporate fleets\n🚐 NGO & government transport\n\n✅ Dedicated Fleet Account Manager\n✅ Volume pricing on Hilux, LC79, LC78, Hiace\n✅ Free service plans on bulk orders\n✅ Priority workshop & parts availability\n✅ On-site support during commissioning`,
    quickReplies: [
      { label: '📞 Contact Fleet Desk', value: 'contact harare' },
      { label: '🎁 Fleet Promotion', value: 'promotions' },
    ],
    link: { label: 'View Fleet Promotion', path: '/promotions' },
  },

  // WARRANTY
  {
    id: 'warranty',
    keywords: ['warranty', 'guarantee', 'manufacturer warranty', 'how long warranty', 'warranty period'],
    response: `**Toyota Manufacturer Warranty** ✅\n\nAll brand new Toyota vehicles sold through CFAO Zimbabwe include:\n\n🛡️ **3-year / 100,000 km** manufacturer warranty (whichever comes first)\n🔩 Warranty only valid with **genuine Toyota parts**\n🔧 Serviced at authorised **CFAO Toyota workshops**\n\nUsing aftermarket parts or non-authorised workshops can void your warranty.`,
    quickReplies: [
      { label: '🔧 Book Warranty Service', value: 'book service form' },
      { label: '🔩 Genuine Parts', value: 'spare parts' },
    ],
  },

  // ENVIRONMENT
  {
    id: 'environment',
    keywords: ['environment', 'carbon', 'eco', 'green', 'sustainability', 'emissions', '2050', 'challenge 2050'],
    response: `**Toyota Environmental Challenge 2050** 🌿\n\nToyota Zimbabwe is actively reducing our environmental footprint:\n\n⚡ Promoting **self-charging HEV** models (no plug needed)\n📉 Up to **40% fuel savings** with Corolla Cross HEV\n♻️ Eco-friendly disposal of batteries, oils & filters\n🌍 Targeting **carbon neutrality** by 2050\n\nEvery HEV sold helps reduce Zimbabwe's CO₂ emissions.`,
    link: { label: 'Read More — About Us', path: '/about' },
  },

  // GENERAL CONTACT
  {
    id: 'contact_general',
    keywords: ['contact', 'speak to', 'talk to', 'call', 'email', 'reach', 'get in touch', 'customer care', 'support', 'help'],
    response: `**Get in Touch with Toyota Zimbabwe** 📞\n\n📞 **Harare HQ:** +263 (24) 2750031 / 9\n✉️ **Email:** sales.harare@cfao.com\n📞 **Bulawayo:** +263 (29) 2262521 / 5\n\n⏰ Mon–Fri: 8:00 AM – 5:00 PM\n⏰ Sat: 8:00 AM – 12:00 PM\n\nOr use our **Contact Form** for written enquiries — we respond within **24 hours**.`,
    quickReplies: [
      { label: '📋 Send Enquiry', value: 'contact form' },
      { label: '📍 Find a Branch', value: 'branch locations' },
    ],
    link: { label: 'Contact Us', path: '/contact' },
  },
  {
    id: 'contact_form',
    keywords: ['contact form', 'send enquiry', 'send message', 'enquiry form', 'write to'],
    response: `Use our **Customer Inquiry Desk** to send a written message. We respond within **24 hours** on business days.`,
    link: { label: 'Open Contact Form', path: '/contact' },
  },

  // NEWS
  {
    id: 'news',
    keywords: ['news', 'latest news', 'announcements', 'media', 'press', 'launch', 'new model', 'updates'],
    response: `**Toyota Zimbabwe News & Media** 📰\n\nLatest stories:\n\n🚙 All-New Land Cruiser Prado officially launched in Zimbabwe\n⚡ Hybrid vehicle sales up 47% in 2025\n🏭 CFAO secures major mining fleet contract\n🏗️ Bulawayo workshop expansion complete\n🛻 2026 Hilux facelift arrives in showrooms`,
    link: { label: 'Read All News', path: '/news' },
  },

  // ABOUT
  {
    id: 'about',
    keywords: ['about', 'about toyota', 'who are you', 'cfao', 'company', 'history', 'distributor'],
    response: `**About Toyota Zimbabwe** 🇿🇼\n\nWe operate under the **CFAO Group** — Africa's leading multi-brand automotive distributor with over a century of experience.\n\n✅ Official Toyota importer for Zimbabwe\n✅ Vehicles tropicalized for local terrain & climate\n✅ Serving individual buyers, corporates, mining & agriculture\n✅ 8 branches from Harare to Chiredzi`,
    link: { label: 'Read Our Story', path: '/about' },
  },
];

// ── Matcher ───────────────────────────────────────────────────────────────────
export function matchIntent(input: string): Intent | null {
  const normalized = input.toLowerCase().trim();
  let bestMatch: Intent | null = null;
  let bestScore = 0;

  for (const intent of intents) {
    for (const keyword of intent.keywords) {
      if (normalized.includes(keyword)) {
        const score = keyword.length;
        if (score > bestScore) {
          bestScore = score;
          bestMatch = intent;
        }
      }
    }
  }
  return bestMatch;
}
