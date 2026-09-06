import { Service, PortfolioItem, Testimonial, WhyChooseItem, ProcessStep } from './types';

export const SERVICES: Service[] = [
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    description: 'Stop-and-stare marketing materials, creative brochures, high-converting flyers, and custom corporate business cards.',
    iconName: 'Palette',
    details: [
      'Marketing & promotional materials',
      'High-impact poster & flyer engineering',
      'Corporate stationery & annual report design',
      'Premium business card formulations',
      'Vector custom illustration kits'
    ]
  },
  {
    id: 'branding',
    title: 'Branding & Logo Design',
    description: 'We craft complete visual identity systems, modern distinct logos, and robust brand guidelines that build deep-seated trust.',
    iconName: 'Award',
    details: [
      'Logo design & geometric styling',
      'Comprehensive brand style guides & systems',
      'Custom typography pairing frameworks',
      'Complete color palette architecture',
      'Brand assets & physical mockups'
    ]
  },
  {
    id: 'website-design',
    title: 'Website Design',
    description: 'State-of-the-art, lightning-fast UI/UX web designs that captivate attention and turn users into loyal buyers.',
    iconName: 'Layers',
    details: [
      'Interactive Figma UI/UX wireframes',
      'Fully responsive, mobile-first design modules',
      'Tailored SaaS homepage architecture',
      'Custom web application mockups',
      'Interaction & transition design maps'
    ]
  },
  {
    id: 'social-media',
    title: 'Social Media Design',
    description: 'Scroll-stopping Instagram grids, custom LinkedIn banners, highly aesthetic thumbnail concepts, and template toolkits.',
    iconName: 'Instagram',
    details: [
      'Cohesive Instagram grids & layout kits',
      'High-authority LinkedIn header cards',
      'Conversion-optimized advertising templates',
      'Motion graphics & storytelling layouts',
      'Stunning Pinterest pin design frameworks'
    ]
  },
  {
    id: 'printing-solutions',
    title: 'Printing Solutions',
    description: 'Flawless production-ready print engineering for corporate banners, merchandise wrapping, journals, and apparel.',
    iconName: 'Printer',
    details: [
      'High-fidelity packaging & wrapper specs',
      'Premium company journals & notepad sheets',
      'Exhibition display backdrop blueprints',
      'Merchandise apparel & gift bag concepts',
      'Color-calibrated, press-ready vector exports'
    ]
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    description: 'Strategic lead generation campaigns, optimized funnels, SEO strategy, and high-CTR social media advertising.',
    iconName: 'TrendingUp',
    details: [
      'Google & Meta performance campaign designs',
      'Comprehensive SEO technical audit frameworks',
      'High-converting landing page funnels',
      'Email marketing templates & sequences',
      'Analytics setup & live conversion dashboarding'
    ]
  }
];

export const PORTFOLIO: PortfolioItem[] = [
  {
    id: "elan-noir-flyer",
    title: "Élan Noir Exclusive Salon & Braiding Studio",
    category: "Flyer Design",
    image: "/portfolio-assets/elan-noir-flyer.jpg",
    description: "High-fashion unisex braiding, cornrows, and knotless styling promotional flyer designed for effortless elegance.",
    client: "Élan Noir Studio",
    duration: "3 Days",
    scope: ["Flyer Design", "Beauty & Salon", "Editorial Layout"],
    challenge: "Communicating luxury aesthetics and full-service unisex haircare.",
    solution: "Crafted a rich dark-mode visual with vibrant pink accents, model photography, and clear service breakdown.",
    extraImages: []
  },
  {
    id: "ttu-wocom-janice-campaign",
    title: "TTU Women's Commissioner 2026 Leadership Campaign | Janice",
    category: "Campaign Design",
    image: "/portfolio-assets/ttu-wocom-26-main.jpg",
    description: "Empowering female leadership with high-impact election posters, vetting announcements, and policy manifesto showcases.",
    client: "Janice for TTU WOCOM",
    duration: "2 Weeks",
    scope: ["Campaign Identity", "Official Portraits", "Policy Manifestos", "Countdown Posters"],
    challenge: "Establishing leadership credibility and high visibility across TTU faculties.",
    solution: "Formulated a unified purple-and-gold visual identity with crisp portraiture and empowering typography.",
    extraImages: [
      "/portfolio-assets/ttu-wocom-26-janice-official.jpg",
      "/portfolio-assets/ttu-wocom-26-janice-1.jpg",
      "/portfolio-assets/ttu-wocom-26-janice-2.jpg"
    ]
  },
  {
    id: "gnuts-tech-summit",
    title: "GNUTS National Tech Summit & Technical Education Tour",
    category: "Event Design",
    image: "/portfolio-assets/gnuts-summit-banner-1.jpg",
    description: "From skills to solutions: driving innovation and sustainable livelihood through TVET with national keynote leaders across Ghana.",
    client: "Ghana National Union of Technical Students (GNUTS)",
    duration: "10 Days",
    scope: ["National Summit", "TVET Education", "Program Outline", "Institutional Visits", "Easter Blessings"],
    challenge: "Packaging a nationwide multi-stakeholder union convention featuring government ministers, educators, and university tours.",
    solution: "Architected a cohesive green-and-gold visual identity with full event agendas, countdown badges, campus tour banners, and civic holiday greetings.",
    extraImages: [
      "/portfolio-assets/gnuts-summit-banner-2.jpg",
      "/portfolio-assets/gnuts-choose-tvet.jpg",
      "/portfolio-assets/gnuts-director-general.jpg",
      "/portfolio-assets/gnuts-program-outline.jpg",
      "/portfolio-assets/gnuts-cc-countdown.jpg",
      "/portfolio-assets/gnuts-cape-coast-visit.jpg",
      "/portfolio-assets/gnuts-easter-blessings.jpg",
      "/portfolio-assets/gnuts-independence-celebration.jpg"
    ]
  },
  {
    id: "bliss-elle-fashion",
    title: "Bliss Elle Chic & Confident Modest Fashion Collection",
    category: "Flyer Design",
    image: "/portfolio-assets/bliss-elle-eid-luxury.jpg",
    description: "Eid Ul-Adha luxury wardrobe collection and modest fashion promotional flyers highlighting style, elegance, and confidence.",
    client: "Bliss Elle Ghana",
    duration: "4 Days",
    scope: ["Modest Fashion", "Luxury Boutique", "Eid Celebration", "Valentine Collection", "E-Commerce Promo"],
    challenge: "Designing festive holiday fashion campaigns that balance traditional modesty with high-end luxury appeal.",
    solution: "Produced warm, inviting boutique compositions with regal typography, festive Eid motifs, and Valentine luxury gift suites.",
    extraImages: [
      "/portfolio-assets/bliss-elle-portrait.jpg",
      "/portfolio-assets/bliss-elle-valentines-collection.jpg"
    ]
  },
  {
    id: "karim-abubakari-campaign",
    title: "Abdul Karim Abubakari - Youth Development First Campaign",
    category: "Political Design",
    image: "/portfolio-assets/karim-abubakari-incoming.jpg",
    description: "Vibrant political campaign posters mobilizing youth empowerment and regional grassroots leadership.",
    client: "NDC Northern Regional Youth Wing",
    duration: "1 Week",
    scope: ["Political Campaign", "Youth Empowerment", "Election Branding", "Grassroots Mobilization"],
    challenge: "Generating viral curiosity and anticipation ahead of official regional youth executive declaration.",
    solution: "Deployed high-contrast teaser imagery with bold typography, symbolic umbrella motifs, and electric color gradients.",
    extraImages: [
      "/portfolio-assets/karim-abubakari-main.jpg"
    ]
  },
  {
    id: "royal-rangers-camp",
    title: "Royal Rangers National Youth Camp Experience",
    category: "Event Design",
    image: "/portfolio-assets/royal-rangers-camp.jpg",
    description: "Raised to serve and lead: a high-energy youth convention celebrating fellowship, leadership discipline, and spiritual growth.",
    client: "Assemblies of God Sekondi District",
    duration: "5 Days",
    scope: ["Youth Camp", "Fellowship", "Conference Poster", "Outdoor Adventure"],
    challenge: "Attracting youth and young men across the district with an adventurous, inspirational camp aesthetic.",
    solution: "Structured dynamic signage-style event details with outdoor camp photography, Scripture callouts, and clean registration coordinates.",
    extraImages: []
  },
  {
    id: "jessica-leadership-campaign",
    title: "Jessica Student Leadership & Vetting Day Campaign",
    category: "Campaign Design",
    image: "/portfolio-assets/jessica-vetting-day.jpg",
    description: "Comprehensive 5-piece election campaign suite spanning vetting announcements, portrait banners, and manifesto points.",
    client: "Jessica for SRC",
    duration: "2 Weeks",
    scope: ["Campus Politics", "Election Campaign", "Vetting Posters", "Policy Manifesto"],
    challenge: "Building an authentic, inspiring candidate narrative that stood out in high-pressure campus elections.",
    solution: "Designed crisp, elegant portrait posters highlighting character, policy priorities, and campaign accountability.",
    extraImages: [
      "/portfolio-assets/jessica-vetting-series-1.jpg",
      "/portfolio-assets/jessica-leadership-main.jpg",
      "/portfolio-assets/jessica-campaign-portrait.jpg",
      "/portfolio-assets/jessica-campaign-policy.jpg"
    ]
  },
  {
    id: "gourmet-food-flyer",
    title: "Frandees Yogo & Gourmet Food Visual Promotion",
    category: "Flyer Design",
    image: "/portfolio-assets/frandees-yogo.jpg",
    description: "Vibrant culinary marketing flyers designed to stimulate appetite and boost fast-casual dining orders.",
    client: "Frandees Delights",
    duration: "3 Days",
    scope: ["Culinary Marketing", "Food Flyer", "Social Media Promo", "Appetite Appeal"],
    challenge: "Promoting refreshing treats and specialty menu items with eye-catching culinary energy.",
    solution: "Used bold fruit textures, delicious product cutouts, and punchy promotional badge layouts.",
    extraImages: [
      "/portfolio-assets/food-flyer-design.jpg"
    ]
  },
  {
    id: "kaea-ashanti-regional",
    title: "KAEA Regional Leadership Conference & Official Apparel",
    category: "Branding & Identity",
    image: "/portfolio-assets/kaea-region-final.jpg",
    description: "Holistic brand identity and event suite encompassing regional conference flyers and branded apparel mockups.",
    client: "KAEA National Association",
    duration: "10 Days",
    scope: ["Corporate Identity", "Regional Conference", "Apparel Design", "Merchandise Mockup"],
    challenge: "Delivering a cohesive visual presentation for both digital event marketing and physical merchandise.",
    solution: "Created authoritative badge emblems, clean conference announcement posters, and realistic 3D t-shirt apparel mockups.",
    extraImages: [
      "/portfolio-assets/kaea-region-2.jpg",
      "/portfolio-assets/kaea-tshirt-mockup.jpg",
      "/portfolio-assets/kaea-congratulations.jpg"
    ]
  },
  {
    id: "honorable-fynn-philanthropy",
    title: "Comrade & Hon. Fynn Public Service & Milestone Series",
    category: "Political Design",
    image: "/portfolio-assets/honorable-fynn-main.jpg",
    description: "Civic leadership media series highlighting community health donations, milestone celebrations, and public service.",
    client: "Hon. Fynn Foundation",
    duration: "1 Week",
    scope: ["Civic Leadership", "Philanthropy", "Public Affairs", "Community Welfare"],
    challenge: "Documenting grassroots charity donations and milestone events with dignity and civic reverence.",
    solution: "Formulated distinguished editorial flyers with deep regal color palettes and professional photojournalistic styling.",
    extraImages: [
      "/portfolio-assets/comrade-fynn-donations.jpg",
      "/portfolio-assets/honorable-fynn-bday.jpg",
      "/portfolio-assets/honorable-fynn-thanks.jpg"
    ]
  },
  {
    id: "immanuel-leadership-series",
    title: "Immanuel Student Governance & Vision Series",
    category: "Campaign Design",
    image: "/portfolio-assets/immanuel-numbered-1.jpg",
    description: "Numbered policy campaign posters establishing candidate credibility and structural campus reform.",
    client: "Immanuel for Student Representative",
    duration: "1 Week",
    scope: ["Manifesto Series", "Student Union", "Policy Posters", "Voter Education"],
    challenge: "Presenting multiple complex policy planks in a readable, sequential series that students would easily digest.",
    solution: "Employed bold numbered badge sequencing, clean typography hierarchy, and approachable leadership portraiture.",
    extraImages: [
      "/portfolio-assets/immanuel-numbered-2.jpg",
      "/portfolio-assets/immanuel-leadership-main.jpg"
    ]
  },
  {
    id: "tein-national-tertiary",
    title: "TEIN Tertiary Institutions Network Political Campaign",
    category: "Political Design",
    image: "/portfolio-assets/tein-final-poster.jpg",
    description: "High-octane student political mobilization graphics uniting campus branches across the country.",
    client: "TEIN Ghana",
    duration: "5 Days",
    scope: ["Tertiary Network", "Mobilization", "Party Graphics", "Student Politics"],
    challenge: "Creating electrifying campaign posters for university youth rallies.",
    solution: "Engineered bold diagonal layouts, iconic party iconography, and rallying slogan banners.",
    extraImages: [
      "/portfolio-assets/tein-variation-2.jpg",
      "/portfolio-assets/tein-variation-4.jpg"
    ]
  },
  {
    id: "mufti-academic-celebration",
    title: "Mufti Academic Completion & Exam Farewell Series",
    category: "Event Design",
    image: "/portfolio-assets/mufti-homecoming.jpg",
    description: "Celebratory graduation, homecoming, and academic examination farewell flyers full of optimism and prestige.",
    client: "Mufti Student Council",
    duration: "4 Days",
    scope: ["Graduation", "Academic Milestone", "Campus Event", "Farewell Flyer"],
    challenge: "Commemorating hard-earned academic success with celebratory sophistication.",
    solution: "Infused golden laurel elements, graduation mortarboard themes, and proud celebratory typography.",
    extraImages: [
      "/portfolio-assets/mufti-exams-finale.jpg"
    ]
  },
  {
    id: "barima-executive-profile",
    title: "Barima Executive Personal Brand & Civic Profile",
    category: "Branding & Identity",
    image: "/portfolio-assets/barima-profile-main.jpg",
    description: "Sleek executive personal branding posters communicating poise, vision, and corporate statesmanship.",
    client: "Barima Leadership Consultancy",
    duration: "5 Days",
    scope: ["Executive Identity", "Personal Branding", "Corporate Profile", "Thought Leadership"],
    challenge: "Positioning an executive leader with contemporary elegance and institutional gravitas.",
    solution: "Used studio portraiture, minimalist framing, and deep navy-and-gold chromatic tones.",
    extraImages: [
      "/portfolio-assets/barima-profile-portrait.jpg"
    ]
  },
  {
    id: "techloom-gadget-promo",
    title: "TechLoom Digital Agency Brand & Creative Promos",
    category: "Social Media Design",
    image: "/portfolio-assets/gadget-store-flyer.jpg",
    description: "Commercial brand promotions and limited-time design packages showcasing TechLoom's premium creative services.",
    client: "TechLoom Ghana",
    duration: "1 Week",
    scope: ["Agency Branding", "Limited Promo", "Service Showcase", "Electronics Deals"],
    challenge: "Communicating versatile tech agency capabilities across graphic design, branding, and hardware deals.",
    solution: "Implemented high-tech blue geometric curves, vibrant promotional badges, and direct WhatsApp contact coordinates.",
    extraImages: [
      "/portfolio-assets/techloom-brand-ad-1.jpg",
      "/portfolio-assets/techloom-brand-ad-2.jpg",
      "/portfolio-assets/techloom-brand-ad-3.jpg",
      "/portfolio-assets/techloom-two-designs-promo.jpg",
      "/portfolio-assets/techloom-free-flyer-week.jpg"
    ]
  },
  {
    id: "adom-praise-gospel",
    title: "Adom Praise Gospel Praise & Worship Concert",
    category: "Event Design",
    image: "/portfolio-assets/adom-praise-main.jpg",
    description: "Divine music concert posters crafted with uplifting lighting effects and sacred typographic majesty.",
    client: "Adom Praise Ministries",
    duration: "6 Days",
    scope: ["Gospel Concert", "Live Music", "Praise & Worship", "Church Event"],
    challenge: "Evoking deep spiritual reverence while energizing community attendance for a mega music concert.",
    solution: "Formulated heavenly atmospheric glow effects, prominent minister portraits, and clear schedule details.",
    extraImages: [
      "/portfolio-assets/adom-praise-poster.jpg"
    ]
  },
  {
    id: "high-school-invasion",
    title: "High School Invasion Nationwide Youth Festival",
    category: "Event Design",
    image: "/portfolio-assets/high-school-invasion.jpg",
    description: "High-energy nationwide campus music festival and youth creative rave flyer pulsating with urban nightlife vibes.",
    client: "Invasion Entertainment",
    duration: "4 Days",
    scope: ["Youth Rave", "Music Festival", "Entertainment", "Urban Culture"],
    challenge: "Creating a viral, electric design that appeals directly to modern teenagers and creative youth.",
    solution: "Combined explosive neon typography, distressed urban textures, and vibrant festival lighting.",
    extraImages: []
  },
  {
    id: "prayer-forum-identity",
    title: "The Prayer Forum Brand Identity & Annual Gathering",
    category: "Branding & Identity",
    image: "/portfolio-assets/prayer-forum-1.jpg",
    description: "Reverent identity marks and spiritual conference media developed for nationwide Christian fellowship.",
    client: "The Prayer Forum",
    duration: "1 Week",
    scope: ["Ministry Identity", "Spiritual Conference", "Faith Branding", "Symbolic Logo"],
    challenge: "Establishing a recognizable spiritual emblem and unified visual identity for nationwide prayer gatherings.",
    solution: "Crafted a bespoke symbolic identity mark and complementary flyer templates in reverent gold and deep blue.",
    extraImages: [
      "/portfolio-assets/prayer-forum-2.jpg"
    ]
  },
  {
    id: "oriental-installment-furniture",
    title: "Oriental Living Luxury Furnishings & Installment Promo",
    category: "Flyer Design",
    image: "/portfolio-assets/oriental-installment-1.jpg",
    description: "Sophisticated interior decor promotional posters detailing flexible installment purchasing terms.",
    client: "Oriental Living",
    duration: "5 Days",
    scope: ["Interior Design", "Furniture Sale", "Commercial Flyer", "Retail Financing"],
    challenge: "Presenting luxury furniture packages and consumer financing plans clearly without visual clutter.",
    solution: "Paired premium interior staging photography with clean pricing cards and distinct contact callouts.",
    extraImages: [
      "/portfolio-assets/oriental-installment-2.jpg"
    ]
  },
  {
    id: "mugeez-entertainment-live",
    title: "Mugeez Live Concert & Star Appearance",
    category: "Event Design",
    image: "/portfolio-assets/mugeez-live-1.jpg",
    description: "Afrobeat concert poster radiating headline celebrity charisma and concert excitement.",
    client: "Star Entertainment Ghana",
    duration: "4 Days",
    scope: ["Afrobeat Concert", "Celebrity Night", "Music Flyer", "Nightlife Event"],
    challenge: "Capturing the electrifying star power of an internationally celebrated Ghanaian music icon.",
    solution: "Designed high-contrast celebrity portraiture with vibrant club lighting and premium VIP ticketing info.",
    extraImages: [
      "/portfolio-assets/mugeez-live-2.jpg"
    ]
  },
  {
    id: "ekua-special-celebration",
    title: "Ekua Special Royal Birthday Luxury Celebration",
    category: "Graphic Design",
    image: "/portfolio-assets/ekua-special-red.jpg",
    description: "Prestigious birthday celebration announcements styled with royal scarlet, shimmering gold accents, and bespoke typography.",
    client: "Ekua Private Client",
    duration: "3 Days",
    scope: ["Luxury Celebration", "Royal Birthday", "Private Event", "Gold Typography"],
    challenge: "Designing a deeply personalized milestone celebration flyer fit for high-society gala invitations.",
    solution: "Utilized rich crimson velvet backgrounds, intricate gold filigree, and royal serif titling.",
    extraImages: [
      "/portfolio-assets/ekua-special-gold.jpg"
    ]
  },
  {
    id: "bruce-src-presidential",
    title: "Bruce Student Representative Council Presidential Campaign",
    category: "Campaign Design",
    image: "/portfolio-assets/bruce-src-campaign.jpg",
    description: "Bold, forward-looking student union campaign poster projecting leadership transparency, integrity, and progress.",
    client: "Bruce for SRC",
    duration: "5 Days",
    scope: ["SRC President", "Student Elections", "Leadership", "Voter Mobilization"],
    challenge: "Conveying energetic presidential authority and pragmatic solutions to student body concerns.",
    solution: "Engineered bold primary color contrast with inspiring candidate stance and crisp campaign branding.",
    extraImages: []
  },
  {
    id: "zulaiha-safe-journey",
    title: "Zulaiha Safe Journey & Community Farewell Tribute",
    category: "Graphic Design",
    image: "/portfolio-assets/zulaiha-safe-journey.jpg",
    description: "Heartfelt farewell announcements and travel blessing posters crafted with warmth and grace.",
    client: "Zulaiha Community Circle",
    duration: "3 Days",
    scope: ["Farewell Tribute", "Blessings", "Commemoration", "Community Event"],
    challenge: "Creating an emotionally touching and visually elegant departure announcement.",
    solution: "Framed gentle portraiture with soft angelic clouds and prayerful typographic sentiments.",
    extraImages: [
      "/portfolio-assets/zulaiha-tribute.jpg"
    ]
  },
  {
    id: "d-rux-luxury-streetwear",
    title: "D-Rux Luxury Urban Streetwear Lookbook Drop",
    category: "Flyer Design",
    image: "/portfolio-assets/d-rux-clothing.jpg",
    description: "Cutting-edge urban fashion promo blending street culture aesthetics with premium couture styling.",
    client: "D-Rux Lux Clothing",
    duration: "4 Days",
    scope: ["Streetwear Drop", "Apparel Marketing", "Urban Culture", "Fashion Brand"],
    challenge: "Launching a modern streetwear brand drop that commands attention among fashion-forward youth.",
    solution: "Applied brutalist layout principles, gritty typography, and high-fashion model poses.",
    extraImages: []
  },
  {
    id: "fo-declaration-intent",
    title: "F.O Official Declaration of Intent Campaign",
    category: "Political Design",
    image: "/portfolio-assets/fo-intent-main.jpg",
    description: "High-impact civic aspiration posters announcing candidate candidacy and visionary leadership intent.",
    client: "F.O Campaign Secretariat",
    duration: "5 Days",
    scope: ["Declaration of Intent", "Political Launch", "Campaign", "Public Office"],
    challenge: "Signaling official political readiness with solemn gravitas and broad constituency appeal.",
    solution: "Composed authoritative full-bleed political portraits with clean institutional badge branding.",
    extraImages: [
      "/portfolio-assets/fo-intent-alternate.jpg"
    ]
  },
  {
    id: "sltf-education-awareness",
    title: "Students Loan Trust Fund (SLTF) Educational Campaign",
    category: "Graphic Design",
    image: "/portfolio-assets/sltf-awareness.jpg",
    description: "Public education and student financial assistance posters promoting accessible tertiary learning.",
    client: "Students Loan Trust Fund Ghana",
    duration: "1 Week",
    scope: ["Higher Education", "Public Fund", "Student Support", "Government Initiative"],
    challenge: "Communicating student loan opportunities and application procedures clearly to undergraduates.",
    solution: "Structured approachable campus imagery with step-by-step benefit callouts and official trust fund insignia.",
    extraImages: []
  },
  {
    id: "george-ambassador-advocacy",
    title: "Hon. George Opare Addo Civic Ambassadorial Profile",
    category: "Political Design",
    image: "/portfolio-assets/george-ambassador-1.jpg",
    description: "Youth development and national civic representation posters championing youth inclusion and empowerment.",
    client: "Civic Youth Ambassador Secretariat",
    duration: "4 Days",
    scope: ["Civic Ambassador", "Youth Leadership", "Public Office", "National Representation"],
    challenge: "Showcasing civic statesmanship and dedication to Ghanaian youth empowerment.",
    solution: "Paired dignified leadership photography with the national colors and empowering civic quotes.",
    extraImages: [
      "/portfolio-assets/george-ambassador-2.jpg"
    ]
  },
  {
    id: "mc-kobby-live-hosting",
    title: "MC Kobby Event Hosting & Master of Ceremonies",
    category: "Event Design",
    image: "/portfolio-assets/mc-kobby-hosting.jpg",
    description: "High-energy entertainment flyer for Ghana's premier corporate host, wedding emcee, and concert master of ceremonies.",
    client: "MC Kobby Entertainment",
    duration: "3 Days",
    scope: ["Master of Ceremonies", "Wedding Emcee", "Event Entertainment", "Host Promotion"],
    challenge: "Positioning an entertainer as a versatile, charismatic host for both high-end corporate galas and energetic concerts.",
    solution: "Infused spotlight stage lighting, confident tuxedo styling, and bold gold-embossed typography.",
    extraImages: []
  },

  // 29. Abdul Hafiz Ammar Yarimah
  {
    id: "ammar-presidential-campaign",
    title: "Abdul Hafiz Ammar Yarimah KsTU SRC Presidential Campaign '26",
    category: "Campaign Design",
    image: "/portfolio-assets/ammar-presidential-portrait.jpg",
    description: "Official presidential candidacy identity, weekly motivation posters, and student body engagement suite for Kumasi Technical University.",
    client: "Abdul Hafiz Ammar Yarimah Campaign",
    duration: "2 Weeks",
    scope: ["Presidential Identity", "Weekly Motivation", "Student Engagement", "Campus Elections"],
    challenge: "Maintaining continuous voter engagement throughout the academic semester across campus halls.",
    solution: "Designed consistent presidential portraiture with themed weekly touchpoints including Monday Motivation and Midweek Focus flyers.",
    extraImages: [
      "/portfolio-assets/ammar-monday-motivation.jpg",
      "/portfolio-assets/ammar-midweek-focus.jpg",
      "/portfolio-assets/ammar-eid-mubarak.jpg"
    ]
  },

  // 30. GNUTS Central Committee Dignitaries Series
  {
    id: "gnuts-dignitaries-series",
    title: "GNUTS National Dignitaries & Keynote Speaker Spotlight",
    category: "Political Design",
    image: "/portfolio-assets/gnuts-dignitary-pelpuo.jpg",
    description: "Distinguished keynote speaker and state leader announcement posters designed for GNUTS high-level national conventions.",
    client: "GNUTS National Secretariat",
    duration: "1 Week",
    scope: ["Keynote Speakers", "Parliamentarians", "Ministers of State", "State Dignitaries"],
    challenge: "Spotlighting national statesmen with uniform institutional dignity and sharp typographic hierarchy.",
    solution: "Crafted stately official portraits with gold heraldry frames, parliamentary designations, and national flags.",
    extraImages: [
      "/portfolio-assets/gnuts-dignitary-pablo.jpg",
      "/portfolio-assets/gnuts-dignitary-wiseman.jpg",
      "/portfolio-assets/gnuts-dignitary-linda-ocloo.jpg",
      "/portfolio-assets/gnuts-dignitary-haruna.jpg"
    ]
  },

  // 31. Apparel & 3D Merchandise Mockup Suite
  {
    id: "apparel-3d-merchandise",
    title: "National Campaign Apparel & 3D Merchandise Mockups",
    category: "Branding & Identity",
    image: "/portfolio-assets/apparel-nii-baba-polo.jpg",
    description: "Photorealistic 3D apparel mockups, branded polo shirts, and campaign team uniforms with precision embroidery detailing.",
    client: "National Campaign Merchandising",
    duration: "5 Days",
    scope: ["3D Apparel Mockups", "Polo Shirts", "Campaign Uniforms", "Merchandise Production"],
    challenge: "Simulating physical textile texture, seam stitching, and chest print placement before bulk garment production.",
    solution: "Generated photorealistic studio mockups with front-and-back perspectives and custom color block designs.",
    extraImages: [
      "/portfolio-assets/apparel-tjisty-front-back.jpg",
      "/portfolio-assets/apparel-presidential-tshirt.jpg"
    ]
  },

  // 32. Ishmael Evans Nii Odartey Lamptey - NASPA Western Regional VP
  {
    id: "odartey-naspa-vp",
    title: "Ishmael Evans Nii Odartey Lamptey - NASPA Western Regional VP",
    category: "Campaign Design",
    image: "/portfolio-assets/odartey-naspa-regional-main.jpg",
    description: "Dynamic candidacy declaration and voter mobilization posters for the NASPA Western Regional Vice Presidency.",
    client: "Ishmael Evans Nii Odartey Lamptey",
    duration: "1 Week",
    scope: ["NASPA Elections", "Vice Presidential Bid", "Voter Mobilization", "Youth Leadership"],
    challenge: "Mobilizing national service personnel across diverse corporate and public postings in the Western Region.",
    solution: "Formulated vibrant campaign graphics with clear policy commitments and memorable voting reminders.",
    extraImages: [
      "/portfolio-assets/odartey-naspa-vote-flyer.jpg"
    ]
  },

  // 33. Ampofo Twumasi Benjamin - NPP Tano North Organizer
  {
    id: "ampofo-npp-organizer",
    title: "Ampofo Twumasi Benjamin - NPP Tano North Constituency Organizer",
    category: "Political Design",
    image: "/portfolio-assets/ampofo-npp-declaration.jpg",
    description: "Official declaration of intent and grassroots mobilization posters for the NPP Tano North Constituency Organizer race.",
    client: "Ampofo Twumasi Benjamin Campaign",
    duration: "5 Days",
    scope: ["Declaration of Intent", "Constituency Politics", "Party Mobilization", "Grassroots Leadership"],
    challenge: "Projecting grassroots organizational vigor and party loyalty within the constituency.",
    solution: "Employed signature blue, white, and red party colors with commanding stance and crisp typography.",
    extraImages: [
      "/portfolio-assets/ampofo-npp-grassroots.jpg"
    ]
  },

  // 34. Sarmpa Black Soap - Organics Africa
  {
    id: "sarmpa-black-soap",
    title: "Sarmpa Black Soap - Organics Africa Natural Skincare",
    category: "Branding & Identity",
    image: "/portfolio-assets/sarmpa-organics-black-soap.jpg",
    description: "Vibrant product marketing banner for premium natural black soap enriched with herbs for flawless skin glow.",
    client: "Organics Africa",
    duration: "3 Days",
    scope: ["Product Promo", "Skincare Branding", "Cosmetics Advertising", "Retail Poster"],
    challenge: "Highlighting organic herbal ingredients while conveying modern dermatological appeal.",
    solution: "Blended natural earthy botanical backdrops with glowing product packaging and ingredient callouts.",
    extraImages: []
  },

  // 35. The Peace Consult - Admissions Support
  {
    id: "peace-consult-kstu-admissions",
    title: "The Peace Consult - Kumasi Technical University Admissions Support",
    category: "Flyer Design",
    image: "/portfolio-assets/peace-consult-kstu-admissions.jpg",
    description: "Higher education consulting poster assisting prospective students with seamless KsTU admission applications.",
    client: "The Peace Consult",
    duration: "3 Days",
    scope: ["Education Consulting", "Tertiary Admissions", "Student Support", "Academic Services"],
    challenge: "Outlining university application requirements and contact channels clearly for senior high graduates.",
    solution: "Engineered high-clarity informational layout with direct hotline badges and university campus imagery.",
    extraImages: []
  },

  // 36. Qur'an & Co. - Sisters Quran Hangout
  {
    id: "quran-and-co-sisters-hangout",
    title: "Qur'an & Co. - Sisters Quran Hangout at KNUST Botanical Garden",
    category: "Social Media Design",
    image: "/portfolio-assets/quran-and-co-sisters-hangout.jpg",
    description: "Delicate pastel and floral fellowship banner organizing an uplifting outdoor spiritual reflection for Muslim sisters.",
    client: "Qur'an & Co.",
    duration: "3 Days",
    scope: ["Spiritual Fellowship", "Sisters Hangout", "Floral Aesthetics", "Campus Community"],
    challenge: "Creating an inviting, peaceful atmosphere that resonated with university women seeking sisterhood.",
    solution: "Selected gentle botanical accents, serene typography, and a harmonious pastel palette.",
    extraImages: []
  },

  // 37. Ivy's Kids Apparel - Suame Fashion
  {
    id: "ivys-kids-apparel-suame",
    title: "Ivy's Kids Apparel - Suame Children's Fashion Boutique",
    category: "Flyer Design",
    image: "/portfolio-assets/ivys-kids-apparel.jpg",
    description: "Lively retail showcase poster advertising boutique children's apparel, footwear, and baby accessories in Kumasi.",
    client: "Ivy's Kids Apparel (Suame, Kumasi)",
    duration: "3 Days",
    scope: ["Children's Boutique", "Retail Fashion", "Product Showcase", "Local Store Promo"],
    challenge: "Showcasing a wide variety of clothing styles in an organized, cheerful retail format.",
    solution: "Used playful circular product vignettes, bright energetic tones, and prominent store location directions.",
    extraImages: []
  },

  // 38. Ibrahim Jazil Abanga - Cycling Expedition
  {
    id: "abanga-cycling-expedition",
    title: "Ibrahim Jazil Abanga - 600km Independence Cycling Expedition",
    category: "Graphic Design",
    image: "/portfolio-assets/abanga-cycling-expedition.jpg",
    description: "Commemorative sports poster chronicling the epic Tamale to Accra 600+ km solo cycling journey celebrating Ghana Independence.",
    client: "Ibrahim Jazil Abanga",
    duration: "4 Days",
    scope: ["Sports Poster", "Endurance Cycling", "National Pride", "Commemorative Design"],
    challenge: "Capturing the sheer physical grit and patriotic spirit of a cross-country 600-kilometer bicycle tour.",
    solution: "Structured dynamic motion lines, route milestone markers, and the Ghanaian red-gold-green triumph ribbon.",
    extraImages: []
  },

  // 39. TESCON Bole NMTC Freshers Welcome
  {
    id: "tescon-bole-nmtc-orientation",
    title: "TESCON Bole NMTC Freshers Welcome & Orientation",
    category: "Campaign Design",
    image: "/portfolio-assets/tescon-bole-nmtc-orientation.jpg",
    description: "Orientation welcome banner ushering freshmen into TESCON at Bole Nursing and Midwifery Training College.",
    client: "TESCON Bole NMTC Chapter",
    duration: "3 Days",
    scope: ["Campus Politics", "Freshers Orientation", "Nursing College", "Student Union"],
    challenge: "Welcoming healthcare students while building grassroots partisan fellowship.",
    solution: "Combined professional medical motifs with bold party identity and welcoming leadership portraits.",
    extraImages: []
  },

  // 40. Fargone Apparel & Luxury
  {
    id: "fargone-luxury-streetwear",
    title: "Fargone Apparel & Luxury Urban Streetwear Suite",
    category: "Branding & Identity",
    image: "/portfolio-assets/fargone-luxury-brand.jpg",
    description: "Modern streetwear fashion lookbook and free delivery promotional banners for Kumasi's premium urban brand.",
    client: "Fargone Apparel",
    duration: "4 Days",
    scope: ["Urban Streetwear", "Brand Lookbook", "Free Delivery Campaign", "Fashion Marketing"],
    challenge: "Communicating street credibility alongside boutique luxury customer service perks.",
    solution: "Designed moody monochromatic urban textures with vibrant red delivery promo badges.",
    extraImages: [
      "/portfolio-assets/fargone-free-delivery-promo.jpg"
    ]
  },

  // 41. Nyuuri Diana Sonnoma (Sung) - GNUTS National PRO
  {
    id: "sung-gnuts-pro-campaign",
    title: "Nyuuri Diana Sonnoma (Sung) - GNUTS National P.R.O Hopeful '26",
    category: "Campaign Design",
    image: "/portfolio-assets/sung-gnuts-pro-main.jpg",
    description: "Bold student leadership campaign posters articulating vision and advocacy for the GNUTS National Public Relations Officer position.",
    client: "Nyuuri Diana Sonnoma Campaign",
    duration: "5 Days",
    scope: ["National Executive", "Public Relations Officer", "Student Advocacy", "Union Elections"],
    challenge: "Projecting communicative eloquence and trustworthy union representation to delegates across Ghana.",
    solution: "Framed dignified, confident executive portraiture with sharp campaign slogans and institutional green-and-gold palettes.",
    extraImages: [
      "/portfolio-assets/sung-gnuts-pro-endorsement.jpg"
    ]
  },

  // 42. Ramadan & Islamic Spiritual Heritage Collection
  {
    id: "ramadan-islamic-heritage",
    title: "Ramadan Mubarak & Islamic Spiritual Heritage Collection",
    category: "Social Media Design",
    image: "/portfolio-assets/ramadan-kareem-crescent.jpg",
    description: "Luxurious Islamic calligraphy and serene crescent-themed greeting posters celebrating Ramadan Kareem and spiritual devotion.",
    client: "Islamic Cultural & Spiritual Community",
    duration: "4 Days",
    scope: ["Ramadan Kareem", "Spiritual Heritage", "Arabic Calligraphy", "Holiday Greetings"],
    challenge: "Crafting contemplative spiritual art that inspires peace and introspection during the Holy Month.",
    solution: "Curated luminous gold lanterns, ornate Arabic geometric patterns, and midnight-blue starscapes.",
    extraImages: [
      "/portfolio-assets/ramadan-mubarak-peace.jpg",
      "/portfolio-assets/jannah-ramadan-reflection.jpg"
    ]
  },

  // 43. Young Patriotic Elites & Civic Leadership Spotlight
  {
    id: "ype-civic-leadership",
    title: "Young Patriotic Elites Regional Appointments & Leadership",
    category: "Political Design",
    image: "/portfolio-assets/goode-ernest-bono-east.jpg",
    description: "Prestigious political appointment and regional executive congratulations banners for Young Patriotic Elites coordinators.",
    client: "Young Patriotic Elites (YPE)",
    duration: "3 Days",
    scope: ["Regional Appointments", "Civic Leadership", "Political Executive", "Official Gazetting"],
    challenge: "Formulating an authoritative appointment announcement reflecting national governance prestige.",
    solution: "Incorporated crisp party iconography, official appointment titling, and polished studio portraits.",
    extraImages: [
      "/portfolio-assets/ype-jenatu-bashiru.jpg"
    ]
  },

  // 44. Civic Milestones & Birthday Tributes
  {
    id: "civic-milestones-tributes",
    title: "Distinguished Civic Leaders Milestone Celebrations",
    category: "Graphic Design",
    image: "/portfolio-assets/aikins-birthday-executive.jpg",
    description: "Royal milestone celebration flyers and congratulatory banners commemorating municipal leaders and association directors.",
    client: "Civic & Professional Associations",
    duration: "4 Days",
    scope: ["Executive Birthdays", "Civic Honors", "Association Tributes", "Commemorative Posters"],
    challenge: "Honoring veteran public servants with respectful, elegant celebration media.",
    solution: "Designed regal gold-and-black commemorative layouts adorned with warm celebratory well-wishes.",
    extraImages: [
      "/portfolio-assets/naspa-regional-birthday.jpg",
      "/portfolio-assets/mayor-tribute-final.jpg",
      "/portfolio-assets/ziblim-birthday-portrait.jpg"
    ]
  },

  // 45. Faith, Gratitude & Community Fellowship
  {
    id: "faith-gratitude-fellowship",
    title: "Heaven Gate Ministry & Faith Community Fellowship",
    category: "Graphic Design",
    image: "/portfolio-assets/heaven-gate-ministry.jpg",
    description: "Uplifting church service announcements, fellowship invitations, and corporate gratitude cards designed with heartfelt warmth.",
    client: "Community Ministries & Churches",
    duration: "3 Days",
    scope: ["Church Ministry", "Fellowship Invitation", "Corporate Gratitude", "Spiritual Events"],
    challenge: "Welcoming newcomers with open warmth while conveying sacred worship reverence.",
    solution: "Created radiant atmospheric lighting, comforting spiritual typography, and heartfelt thank-you motifs.",
    extraImages: [
      "/portfolio-assets/church-welcome-fellowship.jpg",
      "/portfolio-assets/gratitude-thank-you-card.jpg"
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Marcus Vance',
    role: 'Chief Executive Officer',
    company: 'Apex Global',
    quote: "Techloom reworked our entire identity from scratch. The professionalism, lightning-fast execution, and exceptional aesthetic standards exceeded all expectations. We finally have a brand that feels impossible to ignore.",
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    id: 't2',
    name: 'Sarah Jenkins',
    role: 'Vice President of Marketing',
    company: 'Pulse Wearables',
    quote: "Our engagement rates exploded after implementing Techloom's social media framework. Their templates make our posts look like high-end lifestyle catalog pages. Conversion rate on ads doubled in just 30 days!",
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    id: 't3',
    name: 'Dr. Evelyn Carter',
    role: 'Founder & Director',
    company: 'BioGenesis Labs',
    quote: "The web interface Techloom designed communicates our complex biotech procedures with unmatched clarity. Beautiful user flows, incredible responsive layout, and dedicated support all through the launch.",
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80'
  }
];

export const WHY_CHOOSE_US: WhyChooseItem[] = [
  {
    id: 'wc1',
    title: 'Creative Excellence',
    description: 'We combine pristine artistic creativity with deliberate business strategy to deliver designs that convert.',
    iconName: 'Sparkles'
  },
  {
    id: 'wc2',
    title: 'Client-Focused Approach',
    description: 'We do not deal in generic ideas. Every line, gradient, and word is tailored specifically to your exact company goals.',
    iconName: 'UserCheck'
  },
  {
    id: 'wc3',
    title: 'Fast Turnaround',
    description: 'We respect your speed demands. High-quality production-ready assets are delivered precisely on schedule.',
    iconName: 'Zap'
  },
  {
    id: 'wc4',
    title: 'Affordable Solutions',
    description: 'Access elite agency-level quality and senior design talent without paying millions in inflated corporate agency fees.',
    iconName: 'DollarSign'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 1,
    title: 'Discovery',
    subtitle: 'Deeply understanding your vision',
    description: 'We begin with a strategic deep-dive session to extract your business targets, define your customer profiles, and outline clear success benchmarks.',
    iconName: 'Compass',
    details: [
      'Visual preference profiling & audit',
      'Target demographic behavior scoping',
      'Core business challenge listing',
      'Timeline & deliverables alignment'
    ]
  },
  {
    id: 2,
    title: 'Strategy',
    subtitle: 'Mapping out the road to success',
    description: 'Our team outlines a master design blueprint. We define mood boards, visual architectures, and interactive wireframes before pushing any pixels.',
    iconName: 'Target',
    details: [
      'Visual mood board development',
      'Wireframing & user journeys',
      'Content hierarchy mapping',
      'Unique value emphasis plans'
    ]
  },
  {
    id: 3,
    title: 'Design',
    subtitle: 'Bringing the brand to life',
    description: 'We build high-fidelity interface layers, custom typography setups, and vibrant layouts that perfectly synthesize elegance, beauty, and utility.',
    iconName: 'PenTool',
    details: [
      'High-fidelity digital layout execution',
      'Typography hierarchy configuration',
      'Interactive components & animations',
      'Client feedback cycles & fine-tuning'
    ]
  },
  {
    id: 4,
    title: 'Delivery',
    subtitle: 'Launching into the world',
    description: 'Complete assets handoff, pixel-perfect standard exports, deployment of interfaces, and post-launch optimization setups.',
    iconName: 'CheckCircle',
    details: [
      'Print-ready calibrated vector packages',
      'Launch of fast responsive interfaces',
      'Asset organization guides',
      'Dedicated launch-day monitoring'
    ]
  }
];
