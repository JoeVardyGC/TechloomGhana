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
    id: "abanga-cycling-expedition",
    title: "Ibrahim Jazil Abanga - 600km Independence Cycling Expedition",
    category: "Graphic Design",
    image: "/portfolio-assets/abanga-cycling-expedition.jpg",
    extraImages: [],
    client: "Ibrahim Jazil Abanga",
    description: "Commemorative sports poster chronicling the epic Tamale to Accra 600+ km solo cycling journey celebrating Ghana Independence.",
    challenge: "Capturing the sheer physical grit and patriotic spirit of a cross-country 600-kilometer bicycle tour.",
    solution: "Structured dynamic motion lines, route milestone markers, and the Ghanaian red-gold-green triumph ribbon.",
    scope: ["Sports Poster", "Endurance Cycling", "National Pride", "Commemorative Design"]
  },
  {
    id: "adom-praise-gospel",
    title: "Adom Praise Gospel Praise & Worship Concert",
    category: "Event Design",
    image: "/portfolio-assets/adom-praise-main.jpg",
    extraImages: ["/portfolio-assets/adom-praise-poster.jpg"],
    client: "Adom Praise Ministries",
    description: "Divine music concert posters crafted with uplifting lighting effects and sacred typographic majesty.",
    challenge: "Evoking deep spiritual reverence while energizing community attendance for a mega music concert.",
    solution: "Formulated heavenly atmospheric glow effects, prominent minister portraits, and clear schedule details.",
    scope: ["Gospel Concert", "Live Music", "Praise & Worship", "Church Event"]
  },
  {
    id: "ammar-presidential-campaign",
    title: "Abdul Hafiz Ammar Yarimah KsTU SRC Presidential Campaign '26",
    category: "Campaign Design",
    image: "/portfolio-assets/ammar-presidential-portrait.jpg",
    extraImages: ["/portfolio-assets/ammar-monday-motivation.jpg", "/portfolio-assets/ammar-midweek-focus.jpg", "/portfolio-assets/ammar-eid-mubarak.jpg"],
    client: "Abdul Hafiz Ammar Yarimah Campaign",
    description: "Official presidential candidacy identity, weekly motivation posters, and student body engagement suite for Kumasi Technical University.",
    challenge: "Maintaining continuous voter engagement throughout the academic semester across campus halls.",
    solution: "Designed consistent presidential portraiture with themed weekly touchpoints including Monday Motivation and Midweek Focus flyers.",
    scope: ["Presidential Identity", "Weekly Motivation", "Student Engagement", "Campus Elections"]
  },
  {
    id: "ampofo-npp-organizer",
    title: "Ampofo Twumasi Benjamin - NPP Tano North Constituency Organizer",
    category: "Political Design",
    image: "/portfolio-assets/ampofo-npp-declaration.jpg",
    extraImages: ["/portfolio-assets/ampofo-npp-grassroots.jpg"],
    client: "Ampofo Twumasi Benjamin Campaign",
    description: "Official declaration of intent and grassroots mobilization posters for the NPP Tano North Constituency Organizer race.",
    challenge: "Projecting grassroots organizational vigor and party loyalty within the constituency.",
    solution: "Employed signature blue, white, and red party colors with commanding stance and crisp typography.",
    scope: ["Declaration of Intent", "Constituency Politics", "Party Mobilization", "Grassroots Leadership"]
  },
  {
    id: "apparel-3d-merchandise",
    title: "National Campaign Apparel & 3D Merchandise Mockups",
    category: "Branding & Identity",
    image: "/portfolio-assets/apparel-nii-baba-polo.jpg",
    extraImages: ["/portfolio-assets/apparel-tjisty-front-back.jpg", "/portfolio-assets/apparel-presidential-tshirt.jpg", "/portfolio-assets/apparel-allah-nii-baba-back.jpg", "/portfolio-assets/apparel-annual-district-convention-shirt.jpg", "/portfolio-assets/apparel-3d-tshirt-front-black.jpg"],
    client: "National Campaign Merchandising",
    description: "Photorealistic 3D apparel mockups, branded polo shirts, and campaign team uniforms with precision embroidery detailing.",
    challenge: "Simulating physical textile texture, seam stitching, and chest print placement before bulk garment production.",
    solution: "Generated photorealistic studio mockups with front-and-back perspectives and custom color block designs.",
    scope: ["3D Apparel Mockups", "Polo Shirts", "Campaign Uniforms", "Merchandise Production"]
  },
  {
    id: "barima-executive-profile",
    title: "Barima Executive Personal Brand & Civic Profile",
    category: "Branding & Identity",
    image: "/portfolio-assets/barima-profile-main.jpg",
    extraImages: ["/portfolio-assets/barima-profile-portrait.jpg"],
    client: "Barima Leadership Consultancy",
    description: "Sleek executive personal branding posters communicating poise, vision, and corporate statesmanship.",
    challenge: "Positioning an executive leader with contemporary elegance and institutional gravitas.",
    solution: "Used studio portraiture, minimalist framing, and deep navy-and-gold chromatic tones.",
    scope: ["Executive Identity", "Personal Branding", "Corporate Profile", "Thought Leadership"]
  },
  {
    id: "bliss-elle-fashion",
    title: "Bliss Elle Chic & Confident Modest Fashion Collection",
    category: "Flyer Design",
    image: "/portfolio-assets/bliss-elle-eid-luxury.jpg",
    extraImages: ["/portfolio-assets/bliss-elle-portrait.jpg", "/portfolio-assets/bliss-elle-valentines-collection.jpg", "/portfolio-assets/bliss-elle-luxury-bold-women.jpg", "/portfolio-assets/bliss-elle-wardrobe-refresh.jpg", "/portfolio-assets/bliss-elle-eid-chic-confident.jpg"],
    client: "Bliss Elle Ghana",
    description: "Eid Ul-Adha luxury wardrobe collection and modest fashion promotional flyers highlighting style, elegance, and confidence.",
    challenge: "Designing festive holiday fashion campaigns that balance traditional modesty with high-end luxury appeal.",
    solution: "Produced warm, inviting boutique compositions with regal typography, festive Eid motifs, and Valentine luxury gift suites.",
    scope: ["Modest Fashion", "Luxury Boutique", "Eid Celebration", "Valentine Collection", "E-Commerce Promo"]
  },
  {
    id: "bruce-src-presidential",
    title: "Bruce Student Representative Council Presidential Campaign",
    category: "Campaign Design",
    image: "/portfolio-assets/bruce-src-campaign.jpg",
    extraImages: [],
    client: "Bruce for SRC",
    description: "Bold, forward-looking student union campaign poster projecting leadership transparency, integrity, and progress.",
    challenge: "Conveying energetic presidential authority and pragmatic solutions to student body concerns.",
    solution: "Engineered bold primary color contrast with inspiring candidate stance and crisp campaign branding.",
    scope: ["SRC President", "Student Elections", "Leadership", "Voter Mobilization"]
  },
  {
    id: "civic-milestones-tributes",
    title: "Distinguished Civic Leaders Milestone Celebrations",
    category: "Graphic Design",
    image: "/portfolio-assets/aikins-birthday-executive.jpg",
    extraImages: ["/portfolio-assets/naspa-regional-birthday.jpg", "/portfolio-assets/mayor-tribute-final.jpg", "/portfolio-assets/ziblim-birthday-portrait.jpg"],
    client: "Civic & Professional Associations",
    description: "Royal milestone celebration flyers and congratulatory banners commemorating municipal leaders and association directors.",
    challenge: "Honoring veteran public servants with respectful, elegant celebration media.",
    solution: "Designed regal gold-and-black commemorative layouts adorned with warm celebratory well-wishes.",
    scope: ["Executive Birthdays", "Civic Honors", "Association Tributes", "Commemorative Posters"]
  },
  {
    id: "d-rux-luxury-streetwear",
    title: "D-Rux Luxury Urban Streetwear Lookbook Drop",
    category: "Flyer Design",
    image: "/portfolio-assets/d-rux-clothing.jpg",
    extraImages: [],
    client: "D-Rux Lux Clothing",
    description: "Cutting-edge urban fashion promo blending street culture aesthetics with premium couture styling.",
    challenge: "Launching a modern streetwear brand drop that commands attention among fashion-forward youth.",
    solution: "Applied brutalist layout principles, gritty typography, and high-fashion model poses.",
    scope: ["Streetwear Drop", "Apparel Marketing", "Urban Culture", "Fashion Brand"]
  },
  {
    id: "ekua-special-celebration",
    title: "Ekua Special Royal Birthday Luxury Celebration",
    category: "Graphic Design",
    image: "/portfolio-assets/ekua-special-red.jpg",
    extraImages: ["/portfolio-assets/ekua-special-gold.jpg"],
    client: "Ekua Private Client",
    description: "Prestigious birthday celebration announcements styled with royal scarlet, shimmering gold accents, and bespoke typography.",
    challenge: "Designing a deeply personalized milestone celebration flyer fit for high-society gala invitations.",
    solution: "Utilized rich crimson velvet backgrounds, intricate gold filigree, and royal serif titling.",
    scope: ["Luxury Celebration", "Royal Birthday", "Private Event", "Gold Typography"]
  },
  {
    id: "elan-noir-flyer",
    title: "\u00c9lan Noir Exclusive Salon & Braiding Studio",
    category: "Flyer Design",
    image: "/portfolio-assets/elan-noir-flyer.jpg",
    extraImages: [],
    client: "\u00c9lan Noir Studio",
    description: "High-fashion unisex braiding, cornrows, and knotless styling promotional flyer designed for effortless elegance.",
    challenge: "Communicating luxury aesthetics and full-service unisex haircare.",
    solution: "Crafted a rich dark-mode visual with vibrant pink accents, model photography, and clear service breakdown.",
    scope: ["Flyer Design", "Beauty & Salon", "Editorial Layout"]
  },
  {
    id: "faith-gratitude-fellowship",
    title: "Heaven Gate Ministry & Faith Community Fellowship",
    category: "Graphic Design",
    image: "/portfolio-assets/heaven-gate-ministry.jpg",
    extraImages: ["/portfolio-assets/church-welcome-fellowship.jpg", "/portfolio-assets/gratitude-thank-you-card.jpg"],
    client: "Community Ministries & Churches",
    description: "Uplifting church service announcements, fellowship invitations, and corporate gratitude cards designed with heartfelt warmth.",
    challenge: "Welcoming newcomers with open warmth while conveying sacred worship reverence.",
    solution: "Created radiant atmospheric lighting, comforting spiritual typography, and heartfelt thank-you motifs.",
    scope: ["Church Ministry", "Fellowship Invitation", "Corporate Gratitude", "Spiritual Events"]
  },
  {
    id: "fargone-luxury-streetwear",
    title: "Fargone Apparel & Luxury Urban Streetwear Suite",
    category: "Branding & Identity",
    image: "/portfolio-assets/fargone-luxury-brand.jpg",
    extraImages: ["/portfolio-assets/fargone-free-delivery-promo.jpg"],
    client: "Fargone Apparel",
    description: "Modern streetwear fashion lookbook and free delivery promotional banners for Kumasi's premium urban brand.",
    challenge: "Communicating street credibility alongside boutique luxury customer service perks.",
    solution: "Designed moody monochromatic urban textures with vibrant red delivery promo badges.",
    scope: ["Urban Streetwear", "Brand Lookbook", "Free Delivery Campaign", "Fashion Marketing"]
  },
  {
    id: "fo-declaration-intent",
    title: "F.O Official Declaration of Intent Campaign",
    category: "Political Design",
    image: "/portfolio-assets/fo-intent-main.jpg",
    extraImages: ["/portfolio-assets/fo-intent-alternate.jpg"],
    client: "F.O Campaign Secretariat",
    description: "High-impact civic aspiration posters announcing candidate candidacy and visionary leadership intent.",
    challenge: "Signaling official political readiness with solemn gravitas and broad constituency appeal.",
    solution: "Composed authoritative full-bleed political portraits with clean institutional badge branding.",
    scope: ["Declaration of Intent", "Political Launch", "Campaign", "Public Office"]
  },
  {
    id: "george-ambassador-advocacy",
    title: "Hon. George Opare Addo Civic Ambassadorial Profile",
    category: "Political Design",
    image: "/portfolio-assets/george-ambassador-1.jpg",
    extraImages: ["/portfolio-assets/george-ambassador-2.jpg"],
    client: "Civic Youth Ambassador Secretariat",
    description: "Youth development and national civic representation posters championing youth inclusion and empowerment.",
    challenge: "Showcasing civic statesmanship and dedication to Ghanaian youth empowerment.",
    solution: "Paired dignified leadership photography with the national colors and empowering civic quotes.",
    scope: ["Civic Ambassador", "Youth Leadership", "Public Office", "National Representation"]
  },
  {
    id: "gnuts-tech-summit",
    title: "GNUTS National Tech Summit & Technical Education Tour",
    category: "Event Design",
    image: "/portfolio-assets/gnuts-summit-banner-1.jpg",
    extraImages: ["/portfolio-assets/gnuts-summit-banner-2.jpg", "/portfolio-assets/gnuts-choose-tvet.jpg", "/portfolio-assets/gnuts-director-general.jpg", "/portfolio-assets/gnuts-program-outline.jpg", "/portfolio-assets/gnuts-cc-countdown.jpg", "/portfolio-assets/gnuts-cape-coast-visit.jpg", "/portfolio-assets/gnuts-easter-blessings.jpg", "/portfolio-assets/gnuts-independence-celebration.jpg", "/portfolio-assets/gnuts-dignitary-pelpuo.jpg", "/portfolio-assets/gnuts-dignitary-pablo.jpg", "/portfolio-assets/gnuts-dignitary-wiseman.jpg", "/portfolio-assets/gnuts-dignitary-linda-ocloo.jpg", "/portfolio-assets/gnuts-dignitary-haruna.jpg", "/portfolio-assets/sung-gnuts-pro-main.jpg", "/portfolio-assets/sung-gnuts-pro-endorsement.jpg", "/portfolio-assets/gnuts-womens-day.jpg", "/portfolio-assets/gnuts-cc-did-you-know.jpg", "/portfolio-assets/gnuts-cc-question-of-the-day.jpg", "/portfolio-assets/gnuts-social-media-channels.jpg", "/portfolio-assets/gnuts-president-delali-birthday.jpg", "/portfolio-assets/gnuts-cc-registration-qr.jpg", "/portfolio-assets/gnuts-tech-summit-main-flyer.jpg", "/portfolio-assets/gnuts-cc-1st-central-committee-main.jpg", "/portfolio-assets/gnuts-cc-prof-ahmed-jinapor-gtec.jpg", "/portfolio-assets/gnuts-cc-dr-eric-adzroe-tvet.jpg", "/portfolio-assets/gnuts-cc-tech-summit-tvet.jpg", "/portfolio-assets/gnuts-summit-abubakari-saana-yea.jpg", "/portfolio-assets/gnuts-summit-dr-patrick-essien-epa.jpg", "/portfolio-assets/gnuts-summit-edward-yaw-udzu-copyghana.jpg", "/portfolio-assets/gnuts-summit-gertrude-donkor-esq.jpg", "/portfolio-assets/gnuts-citation-hon-linda-ocloo.jpg", "/portfolio-assets/gnuts-citation-anthony-kwame-zu.jpg", "/portfolio-assets/gnuts-national-cs-eid-mubarak.jpg", "/portfolio-assets/gnuts-national-pro-joe-vardy-eid.jpg", "/portfolio-assets/gnuts-launching-website-soon.jpg", "/portfolio-assets/gnuts-interactive-socials.jpg"],
    client: "Ghana National Union of Technical Students (GNUTS)",
    description: "From skills to solutions: driving innovation and sustainable livelihood through TVET with national keynote leaders across Ghana.",
    challenge: "Packaging a nationwide multi-stakeholder union convention featuring government ministers, educators, and university tours.",
    solution: "Architected a cohesive green-and-gold visual identity with full event agendas, countdown badges, campus tour banners, and civic holiday greetings.",
    scope: ["National Summit", "TVET Education", "Program Outline", "Institutional Visits", "Easter Blessings"]
  },
  {
    id: "gourmet-food-flyer",
    title: "Frandees Yogo & Gourmet Food Visual Promotion",
    category: "Flyer Design",
    image: "/portfolio-assets/frandees-yogo.jpg",
    extraImages: [],
    client: "Frandees Delights",
    description: "Vibrant culinary marketing flyers designed to stimulate appetite and boost fast-casual dining orders.",
    challenge: "Promoting refreshing treats and specialty menu items with eye-catching culinary energy.",
    solution: "Used bold fruit textures, delicious product cutouts, and punchy promotional badge layouts.",
    scope: ["Culinary Marketing", "Food Flyer", "Social Media Promo", "Appetite Appeal"]
  },
  {
    id: "high-school-invasion",
    title: "High School Invasion Nationwide Youth Festival",
    category: "Event Design",
    image: "/portfolio-assets/high-school-invasion.jpg",
    extraImages: [],
    client: "Invasion Entertainment",
    description: "High-energy nationwide campus music festival and youth creative rave flyer pulsating with urban nightlife vibes.",
    challenge: "Creating a viral, electric design that appeals directly to modern teenagers and creative youth.",
    solution: "Combined explosive neon typography, distressed urban textures, and vibrant festival lighting.",
    scope: ["Youth Rave", "Music Festival", "Entertainment", "Urban Culture"]
  },
  {
    id: "honorable-fynn-philanthropy",
    title: "Comrade & Hon. Fynn Public Service & Milestone Series",
    category: "Political Design",
    image: "/portfolio-assets/honorable-fynn-main.jpg",
    extraImages: ["/portfolio-assets/comrade-fynn-donations.jpg", "/portfolio-assets/honorable-fynn-bday.jpg", "/portfolio-assets/honorable-fynn-thanks.jpg", "/portfolio-assets/comrade-fynn-profile-recovered.jpg"],
    client: "Hon. Fynn Foundation",
    description: "Civic leadership media series highlighting community health donations, milestone celebrations, and public service.",
    challenge: "Documenting grassroots charity donations and milestone events with dignity and civic reverence.",
    solution: "Formulated distinguished editorial flyers with deep regal color palettes and professional photojournalistic styling.",
    scope: ["Civic Leadership", "Philanthropy", "Public Affairs", "Community Welfare"]
  },
  {
    id: "immanuel-leadership-series",
    title: "Immanuel Student Governance & Vision Series",
    category: "Campaign Design",
    image: "/portfolio-assets/immanuel-numbered-1.jpg",
    extraImages: ["/portfolio-assets/immanuel-numbered-2.jpg", "/portfolio-assets/immanuel-leadership-main.jpg"],
    client: "Immanuel for Student Representative",
    description: "Numbered policy campaign posters establishing candidate credibility and structural campus reform.",
    challenge: "Presenting multiple complex policy planks in a readable, sequential series that students would easily digest.",
    solution: "Employed bold numbered badge sequencing, clean typography hierarchy, and approachable leadership portraiture.",
    scope: ["Manifesto Series", "Student Union", "Policy Posters", "Voter Education"]
  },
  {
    id: "ivys-kids-apparel-suame",
    title: "Ivy's Kids Apparel - Suame Children's Fashion Boutique",
    category: "Flyer Design",
    image: "/portfolio-assets/ivys-kids-apparel.jpg",
    extraImages: [],
    client: "Ivy's Kids Apparel (Suame, Kumasi)",
    description: "Lively retail showcase poster advertising boutique children's apparel, footwear, and baby accessories in Kumasi.",
    challenge: "Showcasing a wide variety of clothing styles in an organized, cheerful retail format.",
    solution: "Used playful circular product vignettes, bright energetic tones, and prominent store location directions.",
    scope: ["Children's Boutique", "Retail Fashion", "Product Showcase", "Local Store Promo"]
  },
  {
    id: "jessica-leadership-campaign",
    title: "Jessica Student Leadership & Vetting Day Campaign",
    category: "Campaign Design",
    image: "/portfolio-assets/jessica-vetting-day.jpg",
    extraImages: ["/portfolio-assets/jessica-vetting-series-1.jpg", "/portfolio-assets/jessica-leadership-main.jpg", "/portfolio-assets/jessica-campaign-portrait.jpg", "/portfolio-assets/jessica-campaign-policy.jpg"],
    client: "Jessica for SRC",
    description: "Comprehensive 5-piece election campaign suite spanning vetting announcements, portrait banners, and manifesto points.",
    challenge: "Building an authentic, inspiring candidate narrative that stood out in high-pressure campus elections.",
    solution: "Designed crisp, elegant portrait posters highlighting character, policy priorities, and campaign accountability.",
    scope: ["Campus Politics", "Election Campaign", "Vetting Posters", "Policy Manifesto"]
  },
  {
    id: "kaea-ashanti-regional",
    title: "KAEA Regional Leadership Conference & Official Apparel",
    category: "Branding & Identity",
    image: "/portfolio-assets/kaea-region-final.jpg",
    extraImages: ["/portfolio-assets/kaea-region-2.jpg", "/portfolio-assets/kaea-tshirt-mockup.jpg", "/portfolio-assets/kaea-congratulations.jpg", "/portfolio-assets/kaea-national-naspa-secretary-campaign.jpg", "/portfolio-assets/kaea-president-naspa-birthday.jpg", "/portfolio-assets/kaea-ashanti-regional-recovered.jpg", "/portfolio-assets/kaea-tshirt-mockup-front.jpg", "/portfolio-assets/kaea-tshirt-mockup-variant.jpg", "/portfolio-assets/kaea-tshirt-mockup-final1.jpg", "/portfolio-assets/kaea-naspa-births-deaths-registration.jpg"],
    client: "KAEA National Association",
    description: "Holistic brand identity and event suite encompassing regional conference flyers and branded apparel mockups.",
    challenge: "Delivering a cohesive visual presentation for both digital event marketing and physical merchandise.",
    solution: "Created authoritative badge emblems, clean conference announcement posters, and realistic 3D t-shirt apparel mockups.",
    scope: ["Corporate Identity", "Regional Conference", "Apparel Design", "Merchandise Mockup"]
  },
  {
    id: "karim-abubakari-campaign",
    title: "Abdul Karim Abubakari - Youth Development First Campaign",
    category: "Political Design",
    image: "/portfolio-assets/karim-abubakari-incoming.jpg",
    extraImages: ["/portfolio-assets/karim-abubakari-main.jpg"],
    client: "NDC Northern Regional Youth Wing",
    description: "Vibrant political campaign posters mobilizing youth empowerment and regional grassroots leadership.",
    challenge: "Generating viral curiosity and anticipation ahead of official regional youth executive declaration.",
    solution: "Deployed high-contrast teaser imagery with bold typography, symbolic umbrella motifs, and electric color gradients.",
    scope: ["Political Campaign", "Youth Empowerment", "Election Branding", "Grassroots Mobilization"]
  },
  {
    id: "mc-kobby-live-hosting",
    title: "MC Kobby Event Hosting & Master of Ceremonies",
    category: "Event Design",
    image: "/portfolio-assets/mc-kobby-hosting.jpg",
    extraImages: [],
    client: "MC Kobby Entertainment",
    description: "High-energy entertainment flyer for Ghana's premier corporate host, wedding emcee, and concert master of ceremonies.",
    challenge: "Positioning an entertainer as a versatile, charismatic host for both high-end corporate galas and energetic concerts.",
    solution: "Infused spotlight stage lighting, confident tuxedo styling, and bold gold-embossed typography.",
    scope: ["Master of Ceremonies", "Wedding Emcee", "Event Entertainment", "Host Promotion"]
  },
  {
    id: "mufti-academic-celebration",
    title: "Mufti Academic Completion & Exam Farewell Series",
    category: "Event Design",
    image: "/portfolio-assets/mufti-homecoming.jpg",
    extraImages: ["/portfolio-assets/mufti-exams-finale.jpg"],
    client: "Mufti Student Council",
    description: "Celebratory graduation, homecoming, and academic examination farewell flyers full of optimism and prestige.",
    challenge: "Commemorating hard-earned academic success with celebratory sophistication.",
    solution: "Infused golden laurel elements, graduation mortarboard themes, and proud celebratory typography.",
    scope: ["Graduation", "Academic Milestone", "Campus Event", "Farewell Flyer"]
  },
  {
    id: "mugeez-entertainment-live",
    title: "Mugeez Live Concert & Star Appearance",
    category: "Event Design",
    image: "/portfolio-assets/mugeez-live-1.jpg",
    extraImages: ["/portfolio-assets/mugeez-live-2.jpg"],
    client: "Star Entertainment Ghana",
    description: "Afrobeat concert poster radiating headline celebrity charisma and concert excitement.",
    challenge: "Capturing the electrifying star power of an internationally celebrated Ghanaian music icon.",
    solution: "Designed high-contrast celebrity portraiture with vibrant club lighting and premium VIP ticketing info.",
    scope: ["Afrobeat Concert", "Celebrity Night", "Music Flyer", "Nightlife Event"]
  },
  {
    id: "odartey-naspa-vp",
    title: "Ishmael Evans Nii Odartey Lamptey - NASPA Western Regional VP",
    category: "Campaign Design",
    image: "/portfolio-assets/odartey-naspa-regional-main.jpg",
    extraImages: ["/portfolio-assets/odartey-naspa-vote-flyer.jpg"],
    client: "Ishmael Evans Nii Odartey Lamptey",
    description: "Dynamic candidacy declaration and voter mobilization posters for the NASPA Western Regional Vice Presidency.",
    challenge: "Mobilizing national service personnel across diverse corporate and public postings in the Western Region.",
    solution: "Formulated vibrant campaign graphics with clear policy commitments and memorable voting reminders.",
    scope: ["NASPA Elections", "Vice Presidential Bid", "Voter Mobilization", "Youth Leadership"]
  },
  {
    id: "oriental-installment-furniture",
    title: "Oriental Living Luxury Furnishings & Installment Promo",
    category: "Flyer Design",
    image: "/portfolio-assets/oriental-installment-1.jpg",
    extraImages: ["/portfolio-assets/oriental-installment-2.jpg"],
    client: "Oriental Living",
    description: "Sophisticated interior decor promotional posters detailing flexible installment purchasing terms.",
    challenge: "Presenting luxury furniture packages and consumer financing plans clearly without visual clutter.",
    solution: "Paired premium interior staging photography with clean pricing cards and distinct contact callouts.",
    scope: ["Interior Design", "Furniture Sale", "Commercial Flyer", "Retail Financing"]
  },
  {
    id: "peace-consult-kstu-admissions",
    title: "The Peace Consult - Kumasi Technical University Admissions Support",
    category: "Flyer Design",
    image: "/portfolio-assets/peace-consult-kstu-admissions.jpg",
    extraImages: [],
    client: "The Peace Consult",
    description: "Higher education consulting poster assisting prospective students with seamless KsTU admission applications.",
    challenge: "Outlining university application requirements and contact channels clearly for senior high graduates.",
    solution: "Engineered high-clarity informational layout with direct hotline badges and university campus imagery.",
    scope: ["Education Consulting", "Tertiary Admissions", "Student Support", "Academic Services"]
  },
  {
    id: "prayer-forum-identity",
    title: "The Prayer Forum Brand Identity & Annual Gathering",
    category: "Branding & Identity",
    image: "/portfolio-assets/prayer-forum-1.jpg",
    extraImages: ["/portfolio-assets/prayer-forum-2.jpg"],
    client: "The Prayer Forum",
    description: "Reverent identity marks and spiritual conference media developed for nationwide Christian fellowship.",
    challenge: "Establishing a recognizable spiritual emblem and unified visual identity for nationwide prayer gatherings.",
    solution: "Crafted a bespoke symbolic identity mark and complementary flyer templates in reverent gold and deep blue.",
    scope: ["Ministry Identity", "Spiritual Conference", "Faith Branding", "Symbolic Logo"]
  },
  {
    id: "quran-and-co-sisters-hangout",
    title: "Qur'an & Co. - Sisters Quran Hangout at KNUST Botanical Garden",
    category: "Social Media Design",
    image: "/portfolio-assets/quran-and-co-sisters-hangout.jpg",
    extraImages: [],
    client: "Qur'an & Co.",
    description: "Delicate pastel and floral fellowship banner organizing an uplifting outdoor spiritual reflection for Muslim sisters.",
    challenge: "Creating an inviting, peaceful atmosphere that resonated with university women seeking sisterhood.",
    solution: "Selected gentle botanical accents, serene typography, and a harmonious pastel palette.",
    scope: ["Spiritual Fellowship", "Sisters Hangout", "Floral Aesthetics", "Campus Community"]
  },
  {
    id: "ramadan-islamic-heritage",
    title: "Ramadan Mubarak & Islamic Spiritual Heritage Collection",
    category: "Social Media Design",
    image: "/portfolio-assets/ramadan-kareem-crescent.jpg",
    extraImages: ["/portfolio-assets/ramadan-mubarak-peace.jpg", "/portfolio-assets/jannah-ramadan-reflection.jpg"],
    client: "Islamic Cultural & Spiritual Community",
    description: "Luxurious Islamic calligraphy and serene crescent-themed greeting posters celebrating Ramadan Kareem and spiritual devotion.",
    challenge: "Crafting contemplative spiritual art that inspires peace and introspection during the Holy Month.",
    solution: "Curated luminous gold lanterns, ornate Arabic geometric patterns, and midnight-blue starscapes.",
    scope: ["Ramadan Kareem", "Spiritual Heritage", "Arabic Calligraphy", "Holiday Greetings"]
  },
  {
    id: "royal-rangers-camp",
    title: "Royal Rangers National Youth Camp Experience",
    category: "Event Design",
    image: "/portfolio-assets/royal-rangers-camp.jpg",
    extraImages: [],
    client: "Assemblies of God Sekondi District",
    description: "Raised to serve and lead: a high-energy youth convention celebrating fellowship, leadership discipline, and spiritual growth.",
    challenge: "Attracting youth and young men across the district with an adventurous, inspirational camp aesthetic.",
    solution: "Structured dynamic signage-style event details with outdoor camp photography, Scripture callouts, and clean registration coordinates.",
    scope: ["Youth Camp", "Fellowship", "Conference Poster", "Outdoor Adventure"]
  },
  {
    id: "sarmpa-black-soap",
    title: "Sarmpa Black Soap - Organics Africa Natural Skincare",
    category: "Branding & Identity",
    image: "/portfolio-assets/sarmpa-organics-black-soap.jpg",
    extraImages: [],
    client: "Organics Africa",
    description: "Vibrant product marketing banner for premium natural black soap enriched with herbs for flawless skin glow.",
    challenge: "Highlighting organic herbal ingredients while conveying modern dermatological appeal.",
    solution: "Blended natural earthy botanical backdrops with glowing product packaging and ingredient callouts.",
    scope: ["Product Promo", "Skincare Branding", "Cosmetics Advertising", "Retail Poster"]
  },
  {
    id: "sltf-education-awareness",
    title: "Students Loan Trust Fund (SLTF) Educational Campaign",
    category: "Graphic Design",
    image: "/portfolio-assets/sltf-awareness.jpg",
    extraImages: [],
    client: "Students Loan Trust Fund Ghana",
    description: "Public education and student financial assistance posters promoting accessible tertiary learning.",
    challenge: "Communicating student loan opportunities and application procedures clearly to undergraduates.",
    solution: "Structured approachable campus imagery with step-by-step benefit callouts and official trust fund insignia.",
    scope: ["Higher Education", "Public Fund", "Student Support", "Government Initiative"]
  },
  {
    id: "techloom-gadget-promo",
    title: "TechLoom Digital Agency Brand & Creative Promos",
    category: "Social Media Design",
    image: "/portfolio-assets/gadget-store-flyer.jpg",
    extraImages: ["/portfolio-assets/techloom-brand-ad-1.jpg", "/portfolio-assets/techloom-brand-ad-2.jpg", "/portfolio-assets/techloom-brand-ad-3.jpg", "/portfolio-assets/techloom-two-designs-promo.jpg", "/portfolio-assets/techloom-free-flyer-week.jpg", "/portfolio-assets/techloom-eid-adha-greetings.jpg", "/portfolio-assets/techloom-attention-grabbing-ads.jpg", "/portfolio-assets/techloom-design-with-tlm-promo.jpg", "/portfolio-assets/techloom-eid-mubarak-green.jpg", "/portfolio-assets/techloom-gadget-promo-recovered.jpg", "/portfolio-assets/techloom-kedlan-school-branding-proposal.jpg"],
    client: "TechLoom Ghana",
    description: "Commercial brand promotions and limited-time design packages showcasing TechLoom's premium creative services.",
    challenge: "Communicating versatile tech agency capabilities across graphic design, branding, and hardware deals.",
    solution: "Implemented high-tech blue geometric curves, vibrant promotional badges, and direct WhatsApp contact coordinates.",
    scope: ["Agency Branding", "Limited Promo", "Service Showcase", "Electronics Deals"]
  },
  {
    id: "tein-national-tertiary",
    title: "TEIN Tertiary Institutions Network Political Campaign",
    category: "Political Design",
    image: "/portfolio-assets/tein-final-poster.jpg",
    extraImages: ["/portfolio-assets/tein-variation-2.jpg", "/portfolio-assets/tein-variation-4.jpg"],
    client: "TEIN Ghana",
    description: "High-octane student political mobilization graphics uniting campus branches across the country.",
    challenge: "Creating electrifying campaign posters for university youth rallies.",
    solution: "Engineered bold diagonal layouts, iconic party iconography, and rallying slogan banners.",
    scope: ["Tertiary Network", "Mobilization", "Party Graphics", "Student Politics"]
  },
  {
    id: "tescon-bole-nmtc-orientation",
    title: "TESCON Bole NMTC Freshers Welcome & Orientation",
    category: "Campaign Design",
    image: "/portfolio-assets/tescon-bole-nmtc-orientation.jpg",
    extraImages: [],
    client: "TESCON Bole NMTC Chapter",
    description: "Orientation welcome banner ushering freshmen into TESCON at Bole Nursing and Midwifery Training College.",
    challenge: "Welcoming healthcare students while building grassroots partisan fellowship.",
    solution: "Combined professional medical motifs with bold party identity and welcoming leadership portraits.",
    scope: ["Campus Politics", "Freshers Orientation", "Nursing College", "Student Union"]
  },
  {
    id: "ttu-wocom-janice-campaign",
    title: "TTU Women's Commissioner 2026 Leadership Campaign | Janice",
    category: "Campaign Design",
    image: "/portfolio-assets/ttu-wocom-26-main.jpg",
    extraImages: ["/portfolio-assets/ttu-wocom-26-janice-official.jpg", "/portfolio-assets/ttu-wocom-26-janice-1.jpg", "/portfolio-assets/ttu-wocom-26-janice-2.jpg"],
    client: "Janice for TTU WOCOM",
    description: "Empowering female leadership with high-impact election posters, vetting announcements, and policy manifesto showcases.",
    challenge: "Establishing leadership credibility and high visibility across TTU faculties.",
    solution: "Formulated a unified purple-and-gold visual identity with crisp portraiture and empowering typography.",
    scope: ["Campaign Identity", "Official Portraits", "Policy Manifestos", "Countdown Posters"]
  },
  {
    id: "ype-civic-leadership",
    title: "Young Patriotic Elites Regional Appointments & Leadership",
    category: "Political Design",
    image: "/portfolio-assets/goode-ernest-bono-east.jpg",
    extraImages: ["/portfolio-assets/ype-jenatu-bashiru.jpg"],
    client: "Young Patriotic Elites (YPE)",
    description: "Prestigious political appointment and regional executive congratulations banners for Young Patriotic Elites coordinators.",
    challenge: "Formulating an authoritative appointment announcement reflecting national governance prestige.",
    solution: "Incorporated crisp party iconography, official appointment titling, and polished studio portraits.",
    scope: ["Regional Appointments", "Civic Leadership", "Political Executive", "Official Gazetting"]
  },
  {
    id: "zulaiha-safe-journey",
    title: "Zulaiha Safe Journey & Community Farewell Tribute",
    category: "Graphic Design",
    image: "/portfolio-assets/zulaiha-safe-journey.jpg",
    extraImages: ["/portfolio-assets/zulaiha-tribute.jpg", "/portfolio-assets/zulaiha-safe-journey-portrait.jpg"],
    client: "Zulaiha Community Circle",
    description: "Heartfelt farewell announcements and travel blessing posters crafted with warmth and grace.",
    challenge: "Creating an emotionally touching and visually elegant departure announcement.",
    solution: "Framed gentle portraiture with soft angelic clouds and prayerful typographic sentiments.",
    scope: ["Farewell Tribute", "Blessings", "Commemoration", "Community Event"]
  },
  {
    id: "dr-freda-prempeh-campaign",
    title: "Dr. Freda Prempeh - Ahafo Regional Chairperson Campaign",
    category: "Political Campaigns",
    image: "/portfolio-assets/dr-freda-prempeh-ahafo-campaign.jpg",
    extraImages: [],
    client: "Hon. Dr. Freda Prempeh (NPP Ahafo)",
    description: "Official regional chairperson political campaign identity and grassroots mobilization poster for Hon. Dr. Freda Prempeh.",
    challenge: "Creating an authoritative, inspiring regional political campaign identity that reflects leadership, grassroots unity, and vision for Ahafo.",
    solution: "Designed a clean, distinguished visual identity utilizing bold typography, official regional party insignia, and focused executive portraiture.",
    scope: ["Political Branding", "Campaign Strategy", "Social Media Graphics"]
  },
  {
    id: "naspa-district-leadership-campaigns",
    title: "NASPA Municipal & District Executive Campaign Suite",
    category: "Elections & Governance",
    image: "/portfolio-assets/ishmael-odartey-lamptey-naspa-president.jpg",
    extraImages: ["/portfolio-assets/lord-akum-yong-naspa-bosomtwe-campaign.jpg"],
    client: "NASPA Tarkwa-Nsuaem & Bosomtwe Municipalities",
    description: "Electoral campaign branding and leadership flyers for Tarkwa-Nsuaem and Bosomtwe municipal NASPA presidential aspirants.",
    challenge: "Building persuasive, integrity-focused campaign identities for municipal and district NASPA presidential candidates across Ghana.",
    solution: "Crafted high-impact election posters emphasizing key pillars\u2014Service, Transparency, Advocacy, and Tangible Results\u2014with sharp typography and patriotic green-gold motifs.",
    scope: ["Electoral Branding", "Youth Advocacy Graphics", "Social Media Suite"]
  },
  {
    id: "kstu-src-governance-initiatives",
    title: "KsTU SRC Student Governance & Welfare Initiative Suite",
    category: "Elections & Governance",
    image: "/portfolio-assets/kstu-src-agbenoko-christopher-pro.jpg",
    extraImages: ["/portfolio-assets/kstu-src-kay-collins-telecel-sim.jpg"],
    client: "KsTU SRC / Campus Leadership",
    description: "KsTU SRC student governance campaign and campus-wide Telecel SIM welfare distribution promotional flyers.",
    challenge: "Designing resonant student leadership and student welfare materials that capture campus attention and drive voter turnout and student engagement.",
    solution: "Developed a modern, energetic visual aesthetic featuring vibrant color accents, clear candidate policy positioning, and distinct campus initiative layouts.",
    scope: ["Student Politics", "Welfare Campaign Collateral", "Campus Digital Flyers"]
  },
  {
    id: "pastoral-clergy-celebrations",
    title: "Pastoral & Clergy Milestone Celebration Suite",
    category: "Church & Ministry",
    image: "/portfolio-assets/rev-eric-aikins-60th-birthday.jpg",
    extraImages: ["/portfolio-assets/pastor-james-baffoe-birthday-peace-villa.jpg"],
    client: "Assemblies of God Peace Villa & Akyempim District",
    description: "Commemorative milestone celebration designs honoring pastoral service anniversaries and 60th birthday festivities.",
    challenge: "Creating elegant, dignified celebration collateral honoring pastoral milestones, leadership longevity, and spiritual dedication.",
    solution: "Blended regal royal blue and gold celebratory motifs, sophisticated typography, and warm portraiture to commemorate 60th birthday and ministerial anniversaries.",
    scope: ["Clergy Event Branding", "Milestone Commemorations", "Ceremonial Posters"]
  },
  {
    id: "adoration-framing-art",
    title: "Adoration Framing & Art - Custom Certificate Framing",
    category: "Commercial Branding",
    image: "/portfolio-assets/adoration-framing-art-graduation.jpg",
    extraImages: [],
    client: "Adoration Framing & Art (KNUST / Accra)",
    description: "Commercial advertising flyer promoting luxury academic certificate preservation and bespoke picture framing.",
    challenge: "Promoting bespoke certificate preservation and luxury framing services to university graduates and corporate professionals across KNUST and Accra.",
    solution: "Designed a clean, premium commercial flyer highlighting framing craftsmanship, quality finishes, and direct customer contact channels.",
    scope: ["Product Marketing", "Graduation Campaign", "Print & Social Media Collateral"]
  },
  {
    id: "habbys-jewelries-fragrance",
    title: "Habby's Jewelries & Fragrance - Luxury Accessories Showcase",
    category: "E-Commerce & Retail",
    image: "/portfolio-assets/habbys-jewelries-and-fragrance.jpg",
    extraImages: [],
    client: "Habby's Jewelries and Fragrance (Sunyani & Kumasi)",
    description: "High-end product showcase flyer for designer fragrances, fine jewelry, and luxury accessories across Sunyani and Kumasi.",
    challenge: "Establishing a glamorous retail visual identity that elevates jewelry and designer fragrance collections for discerning shoppers in Sunyani and Kumasi.",
    solution: "Curated an exquisite, high-contrast promotional layout showcasing sparkling product photography, warm accent lighting, and clear location/delivery details.",
    scope: ["Luxury Retail Branding", "Digital Product Showcase", "Social Commerce Design"]
  },
  {
    id: "linex-moons-lingerie",
    title: "Linex Moon's Lingerie - Modern Intimates & Sleepwear Campaign",
    category: "Fashion & Apparel",
    image: "/portfolio-assets/linex-moons-lingerie-campaign.jpg",
    extraImages: [],
    client: "Linex Moon's Lingerie",
    description: "Chic dark-mode marketing collateral showcasing modern sleepwear, silk lingerie, and loungewear essentials.",
    challenge: "Creating a chic, body-positive promotional identity for intimate wear, sleepwear, and loungewear that balances elegance with consumer appeal.",
    solution: "Designed an alluring, modern dark-mode flyer featuring vibrant magenta gradients, lifestyle photography, and a concise product directory.",
    scope: ["Fashion Marketing", "Apparel Lookbook Flyer", "Social Selling Campaign"]
  },
  {
    id: "odeneho-tye-and-dye",
    title: "Odeneho Tye & Dye - Authentic Ghanaian Artisan Apparel",
    category: "Fashion & Apparel",
    image: "/portfolio-assets/odeneho-tye-and-dye-kumasi.jpg",
    extraImages: [],
    client: "Odeneho Tye & Dye (Kumasi)",
    description: "Artisan apparel promotional flyer spotlighting authentic Kumasi handcrafted tye-and-dye shirts and nationwide delivery.",
    challenge: "Positioning handcrafted Ghanaian tye & dye apparel as contemporary everyday fashion with nationwide delivery appeal.",
    solution: "Created an organic, earthy visual layout highlighting mannequin displays of custom short and long sleeve shirts, Kumasi craft authenticity, and direct ordering.",
    scope: ["Artisan Brand Promotion", "Product Presentation", "E-Commerce Social Graphic"]
  },
  {
    id: "the-political-prince-ava",
    title: "The Political Prince / AVA - Holiday Goodwill & Leadership Greeting",
    category: "Political Campaigns",
    image: "/portfolio-assets/the-political-prince-ava-christmas.jpg",
    extraImages: [],
    client: "The Political Prince / AVA",
    description: "Festive season leadership greeting card and public relations goodwill message from The Political Prince.",
    challenge: "Delivering a heartfelt, polished seasonal goodwill message that reinforces personal brand warmth, statesmanship, and festive spirit.",
    solution: "Designed a clean, minimalist holiday card with festive typography, vibrant green accent lettering, and prominent personal leadership branding.",
    scope: ["Public Relations", "Seasonal Goodwill Collateral", "Political Communications"]
  },
  {
    id: "phitness-with-phamous",
    title: "Phitness with Phamous - Elite Strength & Personal Coaching",
    category: "Commercial Branding",
    image: "/portfolio-assets/phitness-with-phamous-gym-training.jpg",
    extraImages: [],
    client: "Phitness with Phamous",
    description: "High-impact athletic promotional flyer featuring personal training packages, workout plans, and nutrition guidance.",
    challenge: "Creating an electrifying, high-energy fitness and gym branding flyer that inspires clients to pursue peak physical conditioning.",
    solution: "Utilized high-intensity fire and amber lighting effects, dynamic athletic photography, and clear service highlights covering personal training, supplements, and nutrition plans.",
    scope: ["Fitness & Wellness Branding", "Athlete Marketing", "Promotional Poster"]
  },
  {
    id: "gnuts-official-portal-web",
    title: "GNUTS - Ghana National Union of Technical Students Official National Portal",
    category: "Website Design",
    image: "/portfolio-assets/gnuts-national-portal-web.jpg",
    extraImages: ["/portfolio-assets/gnuts-portal-about-leadership.jpg", "/portfolio-assets/gnuts-portal-resources-tvet.jpg", "/portfolio-assets/gnuts-portal-mobile-responsive.jpg"],
    client: "GNUTS National Secretariat (Republic of Ghana)",
    description: "Authoritative national digital headquarters engineered for over 200,000+ technical and TVET university students across Ghana. Unifies real-time institutional communications, leadership governance directories, policy document downloads, scholarship portals, and student innovation showcases.",
    projectLink: "https://gnutsorg.vercel.app/",
    challenge: "GNUTS required an authoritative, high-capacity digital ecosystem capable of unifying 10+ technical universities and polytechnics across Ghana. The platform had to handle high-traffic student admissions, provide instant verification of union policy announcements, distribute downloadable resources, and project institutional prestige for corporate partners.",
    solution: "Architected an ultra-fast Next.js web application utilizing Tailwind CSS, responsive glassmorphic interfaces, and mobile-optimized document repositories. Engineered interactive leadership profiles, live TVET news distribution, dedicated student resource vaults, and automated scholarship link directories with 99.9% uptime.",
    scope: ["Enterprise UI/UX Architecture", "Next.js & Tailwind Web Engineering", "Document Repository & Download Portal", "National Leadership Secretariat Directory", "TVET Innovation & News Engine", "Cross-Device Responsive Optimization"]
  },
  {
    id: "bliss-elle-ghana-ecommerce-web",
    title: "Maison Bliss Elle Ghana - Luxury Footwear & Handbags E-Commerce",
    category: "Website Design",
    image: "/portfolio-assets/bliss-elle-ghana-ecommerce-web.jpg",
    extraImages: ["/portfolio-assets/bliss-elle-luxury-catalogue.jpg", "/portfolio-assets/bliss-elle-handbags-collection.jpg", "/portfolio-assets/bliss-elle-mobile-storefront.jpg"],
    client: "Bliss Elle Ghana (Accra \u2022 Kumasi)",
    description: "Haute couture digital boutique crafted for high-end fashion clientele in Accra, Kumasi, and the global diaspora. Showcases sovereign handcrafted heels, stilettos, luxury leather handbags, fluid interactive product zooms, and instant VIP concierge WhatsApp ordering.",
    projectLink: "https://blisselleghana.netlify.app/",
    challenge: "Creating an ethereal, ultra-luxury digital buying journey that reflects European runway aesthetics while catering specifically to Ghanaian high-fashion consumers. The boutique needed lightning-fast image loading for heavy product lookbooks and zero-friction mobile concierge ordering without complicated checkout barriers.",
    solution: "Developed a bespoke dark emerald and golden-accented digital storefront featuring tactile micro-animations, curated fashion lookbooks, multi-angle product galleries, and direct-to-WhatsApp checkout funnels that achieved a 3.4x surge in direct buyer inquiries.",
    scope: ["Luxury Haute Couture UI/UX Design", "Interactive Footwear & Handbag Showroom", "Direct WhatsApp Concierge Checkout", "Dynamic Product Filtering System", "Sub-Second Mobile Page Load Speeds", "Social Commerce Conversion Architecture"]
  },
  {
    id: "adaptation-family-sports-web",
    title: "Adaptation Family - Global Sports Betting Community & Predictions Hub",
    category: "Website Design",
    image: "/portfolio-assets/adaptation-family-portal-web.jpg",
    extraImages: ["/portfolio-assets/adaptation-family-booking-codes.jpg", "/portfolio-assets/adaptation-family-vip-analytics.jpg", "/portfolio-assets/adaptation-family-mobile-experience.jpg"],
    client: "Adaptation Family Media",
    description: "High-converting sports analytics destination and VIP member community hub serving over 90,000+ passionate followers. Equipped with instant one-click bet slip copying, verified booking code archives (SportyBet, 1xBet), win-rate transparency metrics, and automated VIP community conversion funnels.",
    projectLink: "https://adaptationfamily.com/",
    challenge: "Translating a viral social media following of hundreds of thousands into a reputable, monetizable web ecosystem. Needed rapid daily updates for match codes across European leagues, transparent hit-rate tracking, and automated onboarding funnels into private VIP Telegram communities.",
    solution: "Engineered an electrifying stadium-aesthetic web portal featuring instant clipboard copying for booking codes, daily odds comparisons, automated countdown timers to kickoff, and seamless VIP subscription triggers that converted casual social viewers into loyal premium members.",
    scope: ["High-Performance Sports UI/UX", "One-Click Booking Code Copy Engine", "VIP Community Telegram Funnels", "Real-Time Odds & Match Schedule Trackers", "Transparent Analytics & Win-Rate Ledger", "Mobile-First Touch Interaction Design"]
  },
  {
    id: "deon-recreational-centre-web",
    title: "Deon Recreational Centre (DRC) - Premier Outdoor Adventure Oasis",
    category: "Website Design",
    image: "/portfolio-assets/deon-research-consult-web.jpg",
    extraImages: ["/portfolio-assets/deonrc-attractions-gokart-pricing.jpg", "/portfolio-assets/deonrc-poolside-events-amenities.jpg", "/portfolio-assets/deonrc-mobile-booking-guide.jpg"],
    client: "Deon Recreational Centre (DRC Sakumono)",
    description: "Vibrant outdoor adventure and leisure resort platform located in Sakumono, Greater Accra. Showcases pro Go-Kart racing circuits, quad bike trails, poolside dining, live resort operating clock, transparent pricing calculators, and online corporate event bookings.",
    projectLink: "https://deonrc.netlify.app/",
    challenge: "Accra families, thrill-seekers, and corporate event planners needed an interactive online destination to explore 10+ recreational activities, verify live venue opening status, check accurate activity pricing, and reserve private group bookings without endless phone calls.",
    solution: "Built an energetic, responsive leisure portal equipped with an active destination clock, dynamic open/closed status indicator, restaurant menus, high-octane video attraction showcases, and direct reservation CTAs that streamlined bookings by 45%.",
    scope: ["Hospitality & Adventure UI/UX", "Real-Time Facility Operating Clock", "Interactive Attractions & Pricing Matrix", "VIP Corporate & Birthday Booking Engine", "Google Maps Direction & Route Finder", "Ultra-Responsive Mobile Resort Guide"]
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
