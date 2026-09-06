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
    "id": "abanga-cycling-expedition",
    "scope": [
      "Sports Poster",
      "Endurance Cycling",
      "National Pride",
      "Commemorative Design"
    ],
    "extraImages": [],
    "description": "Commemorative sports poster chronicling the epic Tamale to Accra 600+ km solo cycling journey celebrating Ghana Independence.",
    "image": "/portfolio-assets/abanga-cycling-expedition.jpg",
    "title": "Ibrahim Jazil Abanga - 600km Independence Cycling Expedition",
    "solution": "Structured dynamic motion lines, route milestone markers, and the Ghanaian red-gold-green triumph ribbon.",
    "client": "Ibrahim Jazil Abanga",
    "category": "Graphic Design",
    "challenge": "Capturing the sheer physical grit and patriotic spirit of a cross-country 600-kilometer bicycle tour."
  },
  {
    "id": "adom-praise-gospel",
    "solution": "Formulated heavenly atmospheric glow effects, prominent minister portraits, and clear schedule details.",
    "description": "Divine music concert posters crafted with uplifting lighting effects and sacred typographic majesty.",
    "extraImages": [
      "/portfolio-assets/adom-praise-poster.jpg"
    ],
    "challenge": "Evoking deep spiritual reverence while energizing community attendance for a mega music concert.",
    "scope": [
      "Gospel Concert",
      "Live Music",
      "Praise & Worship",
      "Church Event"
    ],
    "client": "Adom Praise Ministries",
    "title": "Adom Praise Gospel Praise & Worship Concert",
    "category": "Event Design",
    "image": "/portfolio-assets/adom-praise-main.jpg"
  },
  {
    "id": "ammar-presidential-campaign",
    "challenge": "Maintaining continuous voter engagement throughout the academic semester across campus halls.",
    "solution": "Designed consistent presidential portraiture with themed weekly touchpoints including Monday Motivation and Midweek Focus flyers.",
    "description": "Official presidential candidacy identity, weekly motivation posters, and student body engagement suite for Kumasi Technical University.",
    "extraImages": [
      "/portfolio-assets/ammar-monday-motivation.jpg",
      "/portfolio-assets/ammar-midweek-focus.jpg",
      "/portfolio-assets/ammar-eid-mubarak.jpg"
    ],
    "scope": [
      "Presidential Identity",
      "Weekly Motivation",
      "Student Engagement",
      "Campus Elections"
    ],
    "category": "Campaign Design",
    "image": "/portfolio-assets/ammar-presidential-portrait.jpg",
    "client": "Abdul Hafiz Ammar Yarimah Campaign",
    "title": "Abdul Hafiz Ammar Yarimah KsTU SRC Presidential Campaign '26"
  },
  {
    "id": "ampofo-npp-organizer",
    "title": "Ampofo Twumasi Benjamin - NPP Tano North Constituency Organizer",
    "solution": "Employed signature blue, white, and red party colors with commanding stance and crisp typography.",
    "client": "Ampofo Twumasi Benjamin Campaign",
    "image": "/portfolio-assets/ampofo-npp-declaration.jpg",
    "challenge": "Projecting grassroots organizational vigor and party loyalty within the constituency.",
    "scope": [
      "Declaration of Intent",
      "Constituency Politics",
      "Party Mobilization",
      "Grassroots Leadership"
    ],
    "description": "Official declaration of intent and grassroots mobilization posters for the NPP Tano North Constituency Organizer race.",
    "extraImages": [
      "/portfolio-assets/ampofo-npp-grassroots.jpg"
    ],
    "category": "Political Design"
  },
  {
    "id": "apparel-3d-merchandise",
    "challenge": "Simulating physical textile texture, seam stitching, and chest print placement before bulk garment production.",
    "solution": "Generated photorealistic studio mockups with front-and-back perspectives and custom color block designs.",
    "extraImages": [
      "/portfolio-assets/apparel-tjisty-front-back.jpg",
      "/portfolio-assets/apparel-presidential-tshirt.jpg"
    ],
    "description": "Photorealistic 3D apparel mockups, branded polo shirts, and campaign team uniforms with precision embroidery detailing.",
    "category": "Branding & Identity",
    "scope": [
      "3D Apparel Mockups",
      "Polo Shirts",
      "Campaign Uniforms",
      "Merchandise Production"
    ],
    "image": "/portfolio-assets/apparel-nii-baba-polo.jpg",
    "client": "National Campaign Merchandising",
    "title": "National Campaign Apparel & 3D Merchandise Mockups"
  },
  {
    "id": "barima-executive-profile",
    "category": "Branding & Identity",
    "solution": "Used studio portraiture, minimalist framing, and deep navy-and-gold chromatic tones.",
    "scope": [
      "Executive Identity",
      "Personal Branding",
      "Corporate Profile",
      "Thought Leadership"
    ],
    "challenge": "Positioning an executive leader with contemporary elegance and institutional gravitas.",
    "client": "Barima Leadership Consultancy",
    "image": "/portfolio-assets/barima-profile-main.jpg",
    "extraImages": [
      "/portfolio-assets/barima-profile-portrait.jpg"
    ],
    "description": "Sleek executive personal branding posters communicating poise, vision, and corporate statesmanship.",
    "title": "Barima Executive Personal Brand & Civic Profile"
  },
  {
    "id": "bliss-elle-fashion",
    "title": "Bliss Elle Chic & Confident Modest Fashion Collection",
    "description": "Eid Ul-Adha luxury wardrobe collection and modest fashion promotional flyers highlighting style, elegance, and confidence.",
    "extraImages": [
      "/portfolio-assets/bliss-elle-portrait.jpg",
      "/portfolio-assets/bliss-elle-valentines-collection.jpg"
    ],
    "client": "Bliss Elle Ghana",
    "image": "/portfolio-assets/bliss-elle-eid-luxury.jpg",
    "solution": "Produced warm, inviting boutique compositions with regal typography, festive Eid motifs, and Valentine luxury gift suites.",
    "scope": [
      "Modest Fashion",
      "Luxury Boutique",
      "Eid Celebration",
      "Valentine Collection",
      "E-Commerce Promo"
    ],
    "challenge": "Designing festive holiday fashion campaigns that balance traditional modesty with high-end luxury appeal.",
    "category": "Flyer Design"
  },
  {
    "id": "bruce-src-presidential",
    "image": "/portfolio-assets/bruce-src-campaign.jpg",
    "solution": "Engineered bold primary color contrast with inspiring candidate stance and crisp campaign branding.",
    "title": "Bruce Student Representative Council Presidential Campaign",
    "client": "Bruce for SRC",
    "challenge": "Conveying energetic presidential authority and pragmatic solutions to student body concerns.",
    "scope": [
      "SRC President",
      "Student Elections",
      "Leadership",
      "Voter Mobilization"
    ],
    "category": "Campaign Design",
    "description": "Bold, forward-looking student union campaign poster projecting leadership transparency, integrity, and progress.",
    "extraImages": []
  },
  {
    "id": "civic-milestones-tributes",
    "challenge": "Honoring veteran public servants with respectful, elegant celebration media.",
    "category": "Graphic Design",
    "solution": "Designed regal gold-and-black commemorative layouts adorned with warm celebratory well-wishes.",
    "extraImages": [
      "/portfolio-assets/naspa-regional-birthday.jpg",
      "/portfolio-assets/mayor-tribute-final.jpg",
      "/portfolio-assets/ziblim-birthday-portrait.jpg"
    ],
    "description": "Royal milestone celebration flyers and congratulatory banners commemorating municipal leaders and association directors.",
    "scope": [
      "Executive Birthdays",
      "Civic Honors",
      "Association Tributes",
      "Commemorative Posters"
    ],
    "title": "Distinguished Civic Leaders Milestone Celebrations",
    "client": "Civic & Professional Associations",
    "image": "/portfolio-assets/aikins-birthday-executive.jpg"
  },
  {
    "id": "d-rux-luxury-streetwear",
    "solution": "Applied brutalist layout principles, gritty typography, and high-fashion model poses.",
    "category": "Flyer Design",
    "description": "Cutting-edge urban fashion promo blending street culture aesthetics with premium couture styling.",
    "extraImages": [],
    "scope": [
      "Streetwear Drop",
      "Apparel Marketing",
      "Urban Culture",
      "Fashion Brand"
    ],
    "client": "D-Rux Lux Clothing",
    "title": "D-Rux Luxury Urban Streetwear Lookbook Drop",
    "challenge": "Launching a modern streetwear brand drop that commands attention among fashion-forward youth.",
    "image": "/portfolio-assets/d-rux-clothing.jpg"
  },
  {
    "id": "ekua-special-celebration",
    "image": "/portfolio-assets/ekua-special-red.jpg",
    "title": "Ekua Special Royal Birthday Luxury Celebration",
    "scope": [
      "Luxury Celebration",
      "Royal Birthday",
      "Private Event",
      "Gold Typography"
    ],
    "solution": "Utilized rich crimson velvet backgrounds, intricate gold filigree, and royal serif titling.",
    "challenge": "Designing a deeply personalized milestone celebration flyer fit for high-society gala invitations.",
    "client": "Ekua Private Client",
    "extraImages": [
      "/portfolio-assets/ekua-special-gold.jpg"
    ],
    "description": "Prestigious birthday celebration announcements styled with royal scarlet, shimmering gold accents, and bespoke typography.",
    "category": "Graphic Design"
  },
  {
    "id": "elan-noir-flyer",
    "title": "\u00c9lan Noir Exclusive Salon & Braiding Studio",
    "image": "/portfolio-assets/elan-noir-flyer.jpg",
    "scope": [
      "Flyer Design",
      "Beauty & Salon",
      "Editorial Layout"
    ],
    "solution": "Crafted a rich dark-mode visual with vibrant pink accents, model photography, and clear service breakdown.",
    "challenge": "Communicating luxury aesthetics and full-service unisex haircare.",
    "description": "High-fashion unisex braiding, cornrows, and knotless styling promotional flyer designed for effortless elegance.",
    "extraImages": [],
    "client": "\u00c9lan Noir Studio",
    "category": "Flyer Design"
  },
  {
    "id": "faith-gratitude-fellowship",
    "extraImages": [
      "/portfolio-assets/church-welcome-fellowship.jpg",
      "/portfolio-assets/gratitude-thank-you-card.jpg"
    ],
    "description": "Uplifting church service announcements, fellowship invitations, and corporate gratitude cards designed with heartfelt warmth.",
    "scope": [
      "Church Ministry",
      "Fellowship Invitation",
      "Corporate Gratitude",
      "Spiritual Events"
    ],
    "title": "Heaven Gate Ministry & Faith Community Fellowship",
    "category": "Graphic Design",
    "challenge": "Welcoming newcomers with open warmth while conveying sacred worship reverence.",
    "image": "/portfolio-assets/heaven-gate-ministry.jpg",
    "client": "Community Ministries & Churches",
    "solution": "Created radiant atmospheric lighting, comforting spiritual typography, and heartfelt thank-you motifs."
  },
  {
    "id": "fargone-luxury-streetwear",
    "challenge": "Communicating street credibility alongside boutique luxury customer service perks.",
    "category": "Branding & Identity",
    "scope": [
      "Urban Streetwear",
      "Brand Lookbook",
      "Free Delivery Campaign",
      "Fashion Marketing"
    ],
    "extraImages": [
      "/portfolio-assets/fargone-free-delivery-promo.jpg"
    ],
    "description": "Modern streetwear fashion lookbook and free delivery promotional banners for Kumasi's premium urban brand.",
    "title": "Fargone Apparel & Luxury Urban Streetwear Suite",
    "client": "Fargone Apparel",
    "image": "/portfolio-assets/fargone-luxury-brand.jpg",
    "solution": "Designed moody monochromatic urban textures with vibrant red delivery promo badges."
  },
  {
    "id": "fo-declaration-intent",
    "category": "Political Design",
    "challenge": "Signaling official political readiness with solemn gravitas and broad constituency appeal.",
    "description": "High-impact civic aspiration posters announcing candidate candidacy and visionary leadership intent.",
    "extraImages": [
      "/portfolio-assets/fo-intent-alternate.jpg"
    ],
    "title": "F.O Official Declaration of Intent Campaign",
    "image": "/portfolio-assets/fo-intent-main.jpg",
    "client": "F.O Campaign Secretariat",
    "solution": "Composed authoritative full-bleed political portraits with clean institutional badge branding.",
    "scope": [
      "Declaration of Intent",
      "Political Launch",
      "Campaign",
      "Public Office"
    ]
  },
  {
    "id": "george-ambassador-advocacy",
    "image": "/portfolio-assets/george-ambassador-1.jpg",
    "title": "Hon. George Opare Addo Civic Ambassadorial Profile",
    "scope": [
      "Civic Ambassador",
      "Youth Leadership",
      "Public Office",
      "National Representation"
    ],
    "category": "Political Design",
    "challenge": "Showcasing civic statesmanship and dedication to Ghanaian youth empowerment.",
    "client": "Civic Youth Ambassador Secretariat",
    "extraImages": [
      "/portfolio-assets/george-ambassador-2.jpg"
    ],
    "description": "Youth development and national civic representation posters championing youth inclusion and empowerment.",
    "solution": "Paired dignified leadership photography with the national colors and empowering civic quotes."
  },
  {
    "id": "gnuts-tech-summit",
    "image": "/portfolio-assets/gnuts-summit-banner-1.jpg",
    "challenge": "Packaging a nationwide multi-stakeholder union convention featuring government ministers, educators, and university tours.",
    "title": "GNUTS National Tech Summit & Technical Education Tour",
    "solution": "Architected a cohesive green-and-gold visual identity with full event agendas, countdown badges, campus tour banners, and civic holiday greetings.",
    "scope": [
      "National Summit",
      "TVET Education",
      "Program Outline",
      "Institutional Visits",
      "Easter Blessings"
    ],
    "client": "Ghana National Union of Technical Students (GNUTS)",
    "description": "From skills to solutions: driving innovation and sustainable livelihood through TVET with national keynote leaders across Ghana.",
    "extraImages": [
      "/portfolio-assets/gnuts-summit-banner-2.jpg",
      "/portfolio-assets/gnuts-choose-tvet.jpg",
      "/portfolio-assets/gnuts-director-general.jpg",
      "/portfolio-assets/gnuts-program-outline.jpg",
      "/portfolio-assets/gnuts-cc-countdown.jpg",
      "/portfolio-assets/gnuts-cape-coast-visit.jpg",
      "/portfolio-assets/gnuts-easter-blessings.jpg",
      "/portfolio-assets/gnuts-independence-celebration.jpg",
      "/portfolio-assets/gnuts-dignitary-pelpuo.jpg",
      "/portfolio-assets/gnuts-dignitary-pablo.jpg",
      "/portfolio-assets/gnuts-dignitary-wiseman.jpg",
      "/portfolio-assets/gnuts-dignitary-linda-ocloo.jpg",
      "/portfolio-assets/gnuts-dignitary-haruna.jpg",
      "/portfolio-assets/sung-gnuts-pro-main.jpg",
      "/portfolio-assets/sung-gnuts-pro-endorsement.jpg",
      "/portfolio-assets/gnuts-womens-day.jpg",
      "/portfolio-assets/gnuts-cc-did-you-know.jpg",
      "/portfolio-assets/gnuts-cc-question-of-the-day.jpg",
      "/portfolio-assets/gnuts-social-media-channels.jpg",
      "/portfolio-assets/gnuts-president-delali-birthday.jpg",
      "/portfolio-assets/gnuts-cc-registration-qr.jpg"
    ],
    "category": "Event Design"
  },
  {
    "id": "gourmet-food-flyer",
    "title": "Frandees Yogo & Gourmet Food Visual Promotion",
    "extraImages": [
      "/portfolio-assets/food-flyer-design.jpg"
    ],
    "description": "Vibrant culinary marketing flyers designed to stimulate appetite and boost fast-casual dining orders.",
    "client": "Frandees Delights",
    "image": "/portfolio-assets/frandees-yogo.jpg",
    "solution": "Used bold fruit textures, delicious product cutouts, and punchy promotional badge layouts.",
    "scope": [
      "Culinary Marketing",
      "Food Flyer",
      "Social Media Promo",
      "Appetite Appeal"
    ],
    "challenge": "Promoting refreshing treats and specialty menu items with eye-catching culinary energy.",
    "category": "Flyer Design"
  },
  {
    "id": "high-school-invasion",
    "image": "/portfolio-assets/high-school-invasion.jpg",
    "solution": "Combined explosive neon typography, distressed urban textures, and vibrant festival lighting.",
    "client": "Invasion Entertainment",
    "title": "High School Invasion Nationwide Youth Festival",
    "scope": [
      "Youth Rave",
      "Music Festival",
      "Entertainment",
      "Urban Culture"
    ],
    "category": "Event Design",
    "description": "High-energy nationwide campus music festival and youth creative rave flyer pulsating with urban nightlife vibes.",
    "extraImages": [],
    "challenge": "Creating a viral, electric design that appeals directly to modern teenagers and creative youth."
  },
  {
    "id": "honorable-fynn-philanthropy",
    "description": "Civic leadership media series highlighting community health donations, milestone celebrations, and public service.",
    "extraImages": [
      "/portfolio-assets/comrade-fynn-donations.jpg",
      "/portfolio-assets/honorable-fynn-bday.jpg",
      "/portfolio-assets/honorable-fynn-thanks.jpg"
    ],
    "client": "Hon. Fynn Foundation",
    "solution": "Formulated distinguished editorial flyers with deep regal color palettes and professional photojournalistic styling.",
    "challenge": "Documenting grassroots charity donations and milestone events with dignity and civic reverence.",
    "scope": [
      "Civic Leadership",
      "Philanthropy",
      "Public Affairs",
      "Community Welfare"
    ],
    "title": "Comrade & Hon. Fynn Public Service & Milestone Series",
    "category": "Political Design",
    "image": "/portfolio-assets/honorable-fynn-main.jpg"
  },
  {
    "id": "immanuel-leadership-series",
    "challenge": "Presenting multiple complex policy planks in a readable, sequential series that students would easily digest.",
    "scope": [
      "Manifesto Series",
      "Student Union",
      "Policy Posters",
      "Voter Education"
    ],
    "image": "/portfolio-assets/immanuel-numbered-1.jpg",
    "category": "Campaign Design",
    "title": "Immanuel Student Governance & Vision Series",
    "client": "Immanuel for Student Representative",
    "description": "Numbered policy campaign posters establishing candidate credibility and structural campus reform.",
    "extraImages": [
      "/portfolio-assets/immanuel-numbered-2.jpg",
      "/portfolio-assets/immanuel-leadership-main.jpg"
    ],
    "solution": "Employed bold numbered badge sequencing, clean typography hierarchy, and approachable leadership portraiture."
  },
  {
    "id": "ivys-kids-apparel-suame",
    "solution": "Used playful circular product vignettes, bright energetic tones, and prominent store location directions.",
    "client": "Ivy's Kids Apparel (Suame, Kumasi)",
    "category": "Flyer Design",
    "scope": [
      "Children's Boutique",
      "Retail Fashion",
      "Product Showcase",
      "Local Store Promo"
    ],
    "title": "Ivy's Kids Apparel - Suame Children's Fashion Boutique",
    "description": "Lively retail showcase poster advertising boutique children's apparel, footwear, and baby accessories in Kumasi.",
    "extraImages": [],
    "image": "/portfolio-assets/ivys-kids-apparel.jpg",
    "challenge": "Showcasing a wide variety of clothing styles in an organized, cheerful retail format."
  },
  {
    "id": "jessica-leadership-campaign",
    "client": "Jessica for SRC",
    "scope": [
      "Campus Politics",
      "Election Campaign",
      "Vetting Posters",
      "Policy Manifesto"
    ],
    "challenge": "Building an authentic, inspiring candidate narrative that stood out in high-pressure campus elections.",
    "category": "Campaign Design",
    "image": "/portfolio-assets/jessica-vetting-day.jpg",
    "title": "Jessica Student Leadership & Vetting Day Campaign",
    "extraImages": [
      "/portfolio-assets/jessica-vetting-series-1.jpg",
      "/portfolio-assets/jessica-leadership-main.jpg",
      "/portfolio-assets/jessica-campaign-portrait.jpg",
      "/portfolio-assets/jessica-campaign-policy.jpg"
    ],
    "description": "Comprehensive 5-piece election campaign suite spanning vetting announcements, portrait banners, and manifesto points.",
    "solution": "Designed crisp, elegant portrait posters highlighting character, policy priorities, and campaign accountability."
  },
  {
    "id": "kaea-ashanti-regional",
    "category": "Branding & Identity",
    "extraImages": [
      "/portfolio-assets/kaea-region-2.jpg",
      "/portfolio-assets/kaea-tshirt-mockup.jpg",
      "/portfolio-assets/kaea-congratulations.jpg"
    ],
    "description": "Holistic brand identity and event suite encompassing regional conference flyers and branded apparel mockups.",
    "image": "/portfolio-assets/kaea-region-final.jpg",
    "title": "KAEA Regional Leadership Conference & Official Apparel",
    "challenge": "Delivering a cohesive visual presentation for both digital event marketing and physical merchandise.",
    "scope": [
      "Corporate Identity",
      "Regional Conference",
      "Apparel Design",
      "Merchandise Mockup"
    ],
    "solution": "Created authoritative badge emblems, clean conference announcement posters, and realistic 3D t-shirt apparel mockups.",
    "client": "KAEA National Association"
  },
  {
    "id": "karim-abubakari-campaign",
    "scope": [
      "Political Campaign",
      "Youth Empowerment",
      "Election Branding",
      "Grassroots Mobilization"
    ],
    "image": "/portfolio-assets/karim-abubakari-incoming.jpg",
    "challenge": "Generating viral curiosity and anticipation ahead of official regional youth executive declaration.",
    "title": "Abdul Karim Abubakari - Youth Development First Campaign",
    "category": "Political Design",
    "client": "NDC Northern Regional Youth Wing",
    "description": "Vibrant political campaign posters mobilizing youth empowerment and regional grassroots leadership.",
    "extraImages": [
      "/portfolio-assets/karim-abubakari-main.jpg"
    ],
    "solution": "Deployed high-contrast teaser imagery with bold typography, symbolic umbrella motifs, and electric color gradients."
  },
  {
    "id": "mc-kobby-live-hosting",
    "category": "Event Design",
    "image": "/portfolio-assets/mc-kobby-hosting.jpg",
    "description": "High-energy entertainment flyer for Ghana's premier corporate host, wedding emcee, and concert master of ceremonies.",
    "extraImages": [],
    "title": "MC Kobby Event Hosting & Master of Ceremonies",
    "scope": [
      "Master of Ceremonies",
      "Wedding Emcee",
      "Event Entertainment",
      "Host Promotion"
    ],
    "challenge": "Positioning an entertainer as a versatile, charismatic host for both high-end corporate galas and energetic concerts.",
    "solution": "Infused spotlight stage lighting, confident tuxedo styling, and bold gold-embossed typography.",
    "client": "MC Kobby Entertainment"
  },
  {
    "id": "mufti-academic-celebration",
    "scope": [
      "Graduation",
      "Academic Milestone",
      "Campus Event",
      "Farewell Flyer"
    ],
    "image": "/portfolio-assets/mufti-homecoming.jpg",
    "solution": "Infused golden laurel elements, graduation mortarboard themes, and proud celebratory typography.",
    "title": "Mufti Academic Completion & Exam Farewell Series",
    "client": "Mufti Student Council",
    "description": "Celebratory graduation, homecoming, and academic examination farewell flyers full of optimism and prestige.",
    "extraImages": [
      "/portfolio-assets/mufti-exams-finale.jpg"
    ],
    "challenge": "Commemorating hard-earned academic success with celebratory sophistication.",
    "category": "Event Design"
  },
  {
    "id": "mugeez-entertainment-live",
    "solution": "Designed high-contrast celebrity portraiture with vibrant club lighting and premium VIP ticketing info.",
    "category": "Event Design",
    "scope": [
      "Afrobeat Concert",
      "Celebrity Night",
      "Music Flyer",
      "Nightlife Event"
    ],
    "description": "Afrobeat concert poster radiating headline celebrity charisma and concert excitement.",
    "extraImages": [
      "/portfolio-assets/mugeez-live-2.jpg"
    ],
    "client": "Star Entertainment Ghana",
    "title": "Mugeez Live Concert & Star Appearance",
    "challenge": "Capturing the electrifying star power of an internationally celebrated Ghanaian music icon.",
    "image": "/portfolio-assets/mugeez-live-1.jpg"
  },
  {
    "id": "odartey-naspa-vp",
    "category": "Campaign Design",
    "challenge": "Mobilizing national service personnel across diverse corporate and public postings in the Western Region.",
    "scope": [
      "NASPA Elections",
      "Vice Presidential Bid",
      "Voter Mobilization",
      "Youth Leadership"
    ],
    "description": "Dynamic candidacy declaration and voter mobilization posters for the NASPA Western Regional Vice Presidency.",
    "extraImages": [
      "/portfolio-assets/odartey-naspa-vote-flyer.jpg"
    ],
    "image": "/portfolio-assets/odartey-naspa-regional-main.jpg",
    "client": "Ishmael Evans Nii Odartey Lamptey",
    "solution": "Formulated vibrant campaign graphics with clear policy commitments and memorable voting reminders.",
    "title": "Ishmael Evans Nii Odartey Lamptey - NASPA Western Regional VP"
  },
  {
    "id": "oriental-installment-furniture",
    "category": "Flyer Design",
    "image": "/portfolio-assets/oriental-installment-1.jpg",
    "challenge": "Presenting luxury furniture packages and consumer financing plans clearly without visual clutter.",
    "title": "Oriental Living Luxury Furnishings & Installment Promo",
    "solution": "Paired premium interior staging photography with clean pricing cards and distinct contact callouts.",
    "scope": [
      "Interior Design",
      "Furniture Sale",
      "Commercial Flyer",
      "Retail Financing"
    ],
    "client": "Oriental Living",
    "description": "Sophisticated interior decor promotional posters detailing flexible installment purchasing terms.",
    "extraImages": [
      "/portfolio-assets/oriental-installment-2.jpg"
    ]
  },
  {
    "id": "peace-consult-kstu-admissions",
    "image": "/portfolio-assets/peace-consult-kstu-admissions.jpg",
    "title": "The Peace Consult - Kumasi Technical University Admissions Support",
    "extraImages": [],
    "description": "Higher education consulting poster assisting prospective students with seamless KsTU admission applications.",
    "client": "The Peace Consult",
    "solution": "Engineered high-clarity informational layout with direct hotline badges and university campus imagery.",
    "scope": [
      "Education Consulting",
      "Tertiary Admissions",
      "Student Support",
      "Academic Services"
    ],
    "challenge": "Outlining university application requirements and contact channels clearly for senior high graduates.",
    "category": "Flyer Design"
  },
  {
    "id": "prayer-forum-identity",
    "title": "The Prayer Forum Brand Identity & Annual Gathering",
    "client": "The Prayer Forum",
    "image": "/portfolio-assets/prayer-forum-1.jpg",
    "solution": "Crafted a bespoke symbolic identity mark and complementary flyer templates in reverent gold and deep blue.",
    "scope": [
      "Ministry Identity",
      "Spiritual Conference",
      "Faith Branding",
      "Symbolic Logo"
    ],
    "extraImages": [
      "/portfolio-assets/prayer-forum-2.jpg"
    ],
    "description": "Reverent identity marks and spiritual conference media developed for nationwide Christian fellowship.",
    "challenge": "Establishing a recognizable spiritual emblem and unified visual identity for nationwide prayer gatherings.",
    "category": "Branding & Identity"
  },
  {
    "id": "quran-and-co-sisters-hangout",
    "client": "Qur'an & Co.",
    "scope": [
      "Spiritual Fellowship",
      "Sisters Hangout",
      "Floral Aesthetics",
      "Campus Community"
    ],
    "title": "Qur'an & Co. - Sisters Quran Hangout at KNUST Botanical Garden",
    "challenge": "Creating an inviting, peaceful atmosphere that resonated with university women seeking sisterhood.",
    "solution": "Selected gentle botanical accents, serene typography, and a harmonious pastel palette.",
    "image": "/portfolio-assets/quran-and-co-sisters-hangout.jpg",
    "description": "Delicate pastel and floral fellowship banner organizing an uplifting outdoor spiritual reflection for Muslim sisters.",
    "extraImages": [],
    "category": "Social Media Design"
  },
  {
    "id": "ramadan-islamic-heritage",
    "category": "Social Media Design",
    "image": "/portfolio-assets/ramadan-kareem-crescent.jpg",
    "solution": "Curated luminous gold lanterns, ornate Arabic geometric patterns, and midnight-blue starscapes.",
    "description": "Luxurious Islamic calligraphy and serene crescent-themed greeting posters celebrating Ramadan Kareem and spiritual devotion.",
    "extraImages": [
      "/portfolio-assets/ramadan-mubarak-peace.jpg",
      "/portfolio-assets/jannah-ramadan-reflection.jpg"
    ],
    "title": "Ramadan Mubarak & Islamic Spiritual Heritage Collection",
    "scope": [
      "Ramadan Kareem",
      "Spiritual Heritage",
      "Arabic Calligraphy",
      "Holiday Greetings"
    ],
    "challenge": "Crafting contemplative spiritual art that inspires peace and introspection during the Holy Month.",
    "client": "Islamic Cultural & Spiritual Community"
  },
  {
    "id": "royal-rangers-camp",
    "category": "Event Design",
    "description": "Raised to serve and lead: a high-energy youth convention celebrating fellowship, leadership discipline, and spiritual growth.",
    "extraImages": [],
    "challenge": "Attracting youth and young men across the district with an adventurous, inspirational camp aesthetic.",
    "scope": [
      "Youth Camp",
      "Fellowship",
      "Conference Poster",
      "Outdoor Adventure"
    ],
    "solution": "Structured dynamic signage-style event details with outdoor camp photography, Scripture callouts, and clean registration coordinates.",
    "image": "/portfolio-assets/royal-rangers-camp.jpg",
    "client": "Assemblies of God Sekondi District",
    "title": "Royal Rangers National Youth Camp Experience"
  },
  {
    "id": "sarmpa-black-soap",
    "title": "Sarmpa Black Soap - Organics Africa Natural Skincare",
    "image": "/portfolio-assets/sarmpa-organics-black-soap.jpg",
    "client": "Organics Africa",
    "category": "Branding & Identity",
    "scope": [
      "Product Promo",
      "Skincare Branding",
      "Cosmetics Advertising",
      "Retail Poster"
    ],
    "solution": "Blended natural earthy botanical backdrops with glowing product packaging and ingredient callouts.",
    "extraImages": [],
    "description": "Vibrant product marketing banner for premium natural black soap enriched with herbs for flawless skin glow.",
    "challenge": "Highlighting organic herbal ingredients while conveying modern dermatological appeal."
  },
  {
    "id": "sltf-education-awareness",
    "title": "Students Loan Trust Fund (SLTF) Educational Campaign",
    "category": "Graphic Design",
    "challenge": "Communicating student loan opportunities and application procedures clearly to undergraduates.",
    "image": "/portfolio-assets/sltf-awareness.jpg",
    "scope": [
      "Higher Education",
      "Public Fund",
      "Student Support",
      "Government Initiative"
    ],
    "description": "Public education and student financial assistance posters promoting accessible tertiary learning.",
    "extraImages": [],
    "client": "Students Loan Trust Fund Ghana",
    "solution": "Structured approachable campus imagery with step-by-step benefit callouts and official trust fund insignia."
  },
  {
    "id": "techloom-gadget-promo",
    "challenge": "Communicating versatile tech agency capabilities across graphic design, branding, and hardware deals.",
    "description": "Commercial brand promotions and limited-time design packages showcasing TechLoom's premium creative services.",
    "extraImages": [
      "/portfolio-assets/techloom-brand-ad-1.jpg",
      "/portfolio-assets/techloom-brand-ad-2.jpg",
      "/portfolio-assets/techloom-brand-ad-3.jpg",
      "/portfolio-assets/techloom-two-designs-promo.jpg",
      "/portfolio-assets/techloom-free-flyer-week.jpg",
      "/portfolio-assets/techloom-eid-adha-greetings.jpg"
    ],
    "scope": [
      "Agency Branding",
      "Limited Promo",
      "Service Showcase",
      "Electronics Deals"
    ],
    "title": "TechLoom Digital Agency Brand & Creative Promos",
    "solution": "Implemented high-tech blue geometric curves, vibrant promotional badges, and direct WhatsApp contact coordinates.",
    "image": "/portfolio-assets/gadget-store-flyer.jpg",
    "client": "TechLoom Ghana",
    "category": "Social Media Design"
  },
  {
    "id": "tein-national-tertiary",
    "description": "High-octane student political mobilization graphics uniting campus branches across the country.",
    "extraImages": [
      "/portfolio-assets/tein-variation-2.jpg",
      "/portfolio-assets/tein-variation-4.jpg"
    ],
    "solution": "Engineered bold diagonal layouts, iconic party iconography, and rallying slogan banners.",
    "title": "TEIN Tertiary Institutions Network Political Campaign",
    "client": "TEIN Ghana",
    "image": "/portfolio-assets/tein-final-poster.jpg",
    "challenge": "Creating electrifying campaign posters for university youth rallies.",
    "scope": [
      "Tertiary Network",
      "Mobilization",
      "Party Graphics",
      "Student Politics"
    ],
    "category": "Political Design"
  },
  {
    "id": "tescon-bole-nmtc-orientation",
    "title": "TESCON Bole NMTC Freshers Welcome & Orientation",
    "client": "TESCON Bole NMTC Chapter",
    "image": "/portfolio-assets/tescon-bole-nmtc-orientation.jpg",
    "solution": "Combined professional medical motifs with bold party identity and welcoming leadership portraits.",
    "scope": [
      "Campus Politics",
      "Freshers Orientation",
      "Nursing College",
      "Student Union"
    ],
    "description": "Orientation welcome banner ushering freshmen into TESCON at Bole Nursing and Midwifery Training College.",
    "extraImages": [],
    "challenge": "Welcoming healthcare students while building grassroots partisan fellowship.",
    "category": "Campaign Design"
  },
  {
    "id": "ttu-wocom-janice-campaign",
    "image": "/portfolio-assets/ttu-wocom-26-main.jpg",
    "extraImages": [
      "/portfolio-assets/ttu-wocom-26-janice-official.jpg",
      "/portfolio-assets/ttu-wocom-26-janice-1.jpg",
      "/portfolio-assets/ttu-wocom-26-janice-2.jpg"
    ],
    "description": "Empowering female leadership with high-impact election posters, vetting announcements, and policy manifesto showcases.",
    "title": "TTU Women's Commissioner 2026 Leadership Campaign | Janice",
    "client": "Janice for TTU WOCOM",
    "category": "Campaign Design",
    "scope": [
      "Campaign Identity",
      "Official Portraits",
      "Policy Manifestos",
      "Countdown Posters"
    ],
    "solution": "Formulated a unified purple-and-gold visual identity with crisp portraiture and empowering typography.",
    "challenge": "Establishing leadership credibility and high visibility across TTU faculties."
  },
  {
    "id": "ype-civic-leadership",
    "title": "Young Patriotic Elites Regional Appointments & Leadership",
    "category": "Political Design",
    "image": "/portfolio-assets/goode-ernest-bono-east.jpg",
    "challenge": "Formulating an authoritative appointment announcement reflecting national governance prestige.",
    "scope": [
      "Regional Appointments",
      "Civic Leadership",
      "Political Executive",
      "Official Gazetting"
    ],
    "description": "Prestigious political appointment and regional executive congratulations banners for Young Patriotic Elites coordinators.",
    "extraImages": [
      "/portfolio-assets/ype-jenatu-bashiru.jpg"
    ],
    "client": "Young Patriotic Elites (YPE)",
    "solution": "Incorporated crisp party iconography, official appointment titling, and polished studio portraits."
  },
  {
    "id": "zulaiha-safe-journey",
    "description": "Heartfelt farewell announcements and travel blessing posters crafted with warmth and grace.",
    "extraImages": [
      "/portfolio-assets/zulaiha-tribute.jpg",
      "/portfolio-assets/zulaiha-safe-journey-portrait.jpg"
    ],
    "client": "Zulaiha Community Circle",
    "category": "Graphic Design",
    "title": "Zulaiha Safe Journey & Community Farewell Tribute",
    "image": "/portfolio-assets/zulaiha-safe-journey.jpg",
    "solution": "Framed gentle portraiture with soft angelic clouds and prayerful typographic sentiments.",
    "challenge": "Creating an emotionally touching and visually elegant departure announcement.",
    "scope": [
      "Farewell Tribute",
      "Blessings",
      "Commemoration",
      "Community Event"
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
