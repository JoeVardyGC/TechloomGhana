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
    category: "Flyer Design",
    image: "/portfolio-assets/abanga-cycling-expedition.jpg",
    extraImages: [],
    client: "Ibrahim Jazil Abanga",
    description: "High-end endurance sports campaign flyer celebrating Ibrahim Jazil Abanga's extraordinary 600km cycling expedition from Accra to Tamale in commemoration of Ghana's 67th Independence Day.",
    challenge: "Creating an inspiring, patriotic athletic graphic that captures the sheer stamina, national pride, and grueling physical challenge of a solo 600km cross-country bicycle journey across Ghana.",
    solution: "Engineered a high-contrast visual design featuring golden sunrise lighting, bold sports typography, full route map markers from Accra to Tamale, and proud Ghanaian flag colors.",
    scope: ["Sports Event Branding", "Endurance Campaign Poster", "Print & Digital Media"]
  },
  {
    id: "adom-praise-gospel",
    title: "Adom Praise - Annual Gospel Music & Worship Concert",
    category: "Event Design",
    image: "/portfolio-assets/adom-praise-main.jpg",
    extraImages: ["/portfolio-assets/adom-praise-poster.jpg"],
    client: "Adom Praise Ministries",
    description: "Majestic gospel concert visual suite featuring heavenly golden light streaks, ethereal atmospheric gradients, and commanding gospel music typography for worship night gatherings.",
    challenge: "Establishing an awe-inspiring spiritual atmosphere that invites believers into profound worship while clearly highlighting guest minister lineups and event schedule coordinates.",
    solution: "Engineered dual campaign variations using radiant light beams, celestial cloud textures, and elegant Christian typography to maximize concert attendance and spiritual resonance.",
    scope: ["Gospel Concert Branding", "Event Poster Suite", "Social Media Announcements"]
  },
  {
    id: "ammar-presidential-campaign",
    title: "Abdul Hafiz Ammar Yarimah - KsTU SRC Presidential Campaign '26",
    category: "Campaign Design",
    image: "/portfolio-assets/ammar-presidential-portrait.jpg",
    extraImages: ["/portfolio-assets/ammar-monday-motivation.jpg", "/portfolio-assets/ammar-midweek-focus.jpg", "/portfolio-assets/ammar-eid-mubarak.jpg"],
    client: "Abdul Hafiz Ammar Yarimah Campaign",
    description: "Premier 4-part campus executive election identity for KsTU SRC Presidential candidate Abdul Hafiz Ammar Yarimah. Features executive portraits, motivational weekday series, and spiritual goodwill messages.",
    challenge: "Positioning the candidate as a dependable, visionary, and approachable student statesman across a diverse tertiary student electorate with daily social touchpoints.",
    solution: "Designed a cohesive presidential brand system using institutional blue accents, inspiring leadership quotes, high-definition studio portraiture, and clean typography.",
    scope: ["Student Political Strategy", "Social Media Campaign Suite", "Campus Poster Design"]
  },
  {
    id: "ampofo-npp-organizer",
    title: "Ampofo Twumasi Benjamin - NPP Tano North Constituency Organizer Campaign",
    category: "Political Design",
    image: "/portfolio-assets/ampofo-npp-declaration.jpg",
    extraImages: ["/portfolio-assets/ampofo-npp-grassroots.jpg"],
    client: "Ampofo Twumasi Benjamin Campaign",
    description: "Authoritative political campaign visual suite for Ampofo Twumasi Benjamin contesting for NPP Constituency Organizer in Tano North. Emphasizes grassroots mobilization, unity, and visionary stewardship.",
    challenge: "Communicating unwavering grassroots connection, party loyalty, and operational leadership to party delegates across urban and rural polling stations in Tano North.",
    solution: "Crafted a high-visibility political brand system using vibrant NPP red, white, and blue hues, dynamic elephant insignia framing, and clear constituency organizing promises.",
    scope: ["Constituency Campaign Branding", "Grassroots Mobilization Posters", "Political Print Assets"]
  },
  {
    id: "nii-baba-polo-apparel",
    title: "Nii Baba - Official Campaign Polo Shirt & 3D Apparel Mockup",
    category: "Branding & Identity",
    image: "/portfolio-assets/apparel-nii-baba-polo.jpg",
    extraImages: ["/portfolio-assets/apparel-allah-nii-baba-back.jpg"],
    client: "Nii Baba Campaign",
    description: "Precision-engineered 3D garment apparel showcase presenting custom embroidered polo shirts for the Nii Baba campaign, featuring front chest cresting and back Islamic spiritual lettering.",
    challenge: "Translating digital campaign identities into tangible, realistic fabric apparel previews with accurate cloth folds, stitch details, and color matching before bulk production.",
    solution: "Constructed hyper-realistic 3D cloth simulations displaying the navy polo shirt from multiple angles with embroidered chest emblems and crisp white rear typography.",
    scope: ["3D Apparel Visualization", "Merchandise Engineering", "Campaign Garment Production"]
  },
  {
    id: "tjisty-streetwear-apparel",
    title: "Tjisty - Custom Urban Streetwear Apparel & Merchandise Mockup",
    category: "Branding & Identity",
    image: "/portfolio-assets/apparel-tjisty-front-back.jpg",
    extraImages: [],
    client: "Tjisty Clothing",
    description: "Modern two-sided urban apparel mockup showcase illustrating front crest branding and high-impact back typography for the Tjisty contemporary streetwear line.",
    challenge: "Showcasing custom apparel proportions, sleeve fit, and garment drape for an emerging urban lifestyle clothing label.",
    solution: "Produced a photorealistic double-sided garment presentation highlighting crisp white lettering, fabric textures, and street-ready minimalist aesthetics.",
    scope: ["Streetwear Merchandise Mockup", "Fashion Product Showcase", "3D Garment Rendering"]
  },
  {
    id: "presidential-campaign-tshirt",
    title: "Presidential Campaign - Official Supporter T-Shirt Design",
    category: "Branding & Identity",
    image: "/portfolio-assets/apparel-presidential-tshirt.jpg",
    extraImages: [],
    client: "Presidential Campaign Merchandising",
    description: "High-visibility political campaign supporter t-shirt design with bold chest emblems and candidate endorsement graphics for national election mobilization.",
    challenge: "Creating an instantly recognizable, crowd-unifying supporter uniform that photographs vibrantly during large-scale political rallies and door-to-door campaigning.",
    solution: "Engineered a dynamic supporter tee layout with striking color contrast, clean political emblems, and high-legibility typographic slogans for maximum rally visibility.",
    scope: ["Political Apparel Design", "Supporter Uniform", "Merchandise Mockup"]
  },
  {
    id: "district-convention-tshirt",
    title: "Annual District Convention - Commemorative T-Shirt Design",
    category: "Branding & Identity",
    image: "/portfolio-assets/apparel-annual-district-convention-shirt.jpg",
    extraImages: [],
    client: "District Convention Committee",
    description: "Official commemorative convention t-shirt design featuring themed spiritual iconography, scriptural convention mottos, and custom event typography.",
    challenge: "Providing convention delegates and attendees with a high-quality keepsake garment that commemorates the annual fellowship experience.",
    solution: "Developed an elegant convention emblem and custom typography layout rendered cleanly on premium athletic fabric mockups.",
    scope: ["Convention Keepsake Apparel", "Event Merchandise", "3D Shirt Mockup"]
  },
  {
    id: "black-graphic-tee-mockup",
    title: "Urban Black Graphic Tee - 3D Apparel Showcase Mockup",
    category: "Branding & Identity",
    image: "/portfolio-assets/apparel-3d-tshirt-front-black.jpg",
    extraImages: [],
    client: "TechLoom Apparel Labs",
    description: "High-definition 3D studio mockup of a black crewneck graphic t-shirt highlighting realistic fabric folds, ribbed collar detailing, and studio rim lighting.",
    challenge: "Delivering a versatile, production-grade apparel canvas for fashion designers and clients to evaluate graphic placements before screen printing.",
    solution: "Created an ultra-realistic black cotton t-shirt render with natural shadow falloff, realistic textiles, and sharp studio highlights.",
    scope: ["Apparel Prototyping", "3D Product Visualization", "Fashion Merchandise Mockup"]
  },
  {
    id: "barima-executive-profile",
    title: "Barima - Executive Personal Branding & Leadership Profile",
    category: "Branding & Identity",
    image: "/portfolio-assets/barima-profile-main.jpg",
    extraImages: ["/portfolio-assets/barima-profile-portrait.jpg"],
    client: "Barima Leadership Consultancy",
    description: "Refined corporate personal branding and executive profile presentation showcasing professional achievements, governance philosophy, and civic leadership portfolio.",
    challenge: "Elevating an executive profile into an authoritative visual statement suitable for corporate boardrooms, international panels, and government advisory roles.",
    solution: "Crafted a minimalist luxury layout using deep obsidian and subtle champagne gold accents, balanced editorial columns, and high-resolution corporate photography.",
    scope: ["Executive Personal Branding", "Leadership Profiles", "Corporate Editorial Design"]
  },
  {
    id: "bliss-elle-fashion",
    title: "Bliss Elle Ghana - Luxury Fashion, Footwear & Seasonal Lookbooks",
    category: "Flyer Design",
    image: "/portfolio-assets/bliss-elle-eid-luxury.jpg",
    extraImages: ["/portfolio-assets/bliss-elle-portrait.jpg", "/portfolio-assets/bliss-elle-valentines-collection.jpg", "/portfolio-assets/bliss-elle-luxury-bold-women.jpg", "/portfolio-assets/bliss-elle-wardrobe-refresh.jpg", "/portfolio-assets/bliss-elle-eid-chic-confident.jpg"],
    client: "Bliss Elle Ghana",
    description: "Premier 6-part fashion flyer collection for luxury boutique Bliss Elle Ghana. Covers seasonal launches including Valentine's Collections, Eid Luxury Editions, Bold Women drops, and wardrobe refresh lookbooks.",
    challenge: "Maintaining an ultra-luxury, runway-grade visual identity across multiple fashion calendar seasons while highlighting premium stilettos, sovereign footwear, and designer handbags.",
    solution: "Utilized editorial magazine typography, rich emerald and crimson color palettes, sophisticated lighting, and curated fashion photography to elevate customer desire and drive order conversions.",
    scope: ["Luxury Fashion Lookbooks", "Seasonal Product Flyers", "Social Commerce Ad Suite"]
  },
  {
    id: "bruce-src-presidential",
    title: "Bruce - Student Representative Council (SRC) Presidential Campaign",
    category: "Campaign Design",
    image: "/portfolio-assets/bruce-src-campaign.jpg",
    extraImages: [],
    client: "Bruce for SRC",
    description: "High-energy student leadership campaign flyer for Bruce contesting for SRC President. Combines bold campus-wide messaging, student welfare advocacy, and modern student governance branding.",
    challenge: "Capturing student voter attention across busy campus noticeboards and social channels with an energetic, trustworthy leadership presentation.",
    solution: "Engineered an impactful layout with electric blue and amber lighting accents, decisive headline typography, and clear candidate policy bullet points.",
    scope: ["Campus Election Branding", "Student Advocacy Flyer", "Political Poster Design"]
  },
  {
    id: "rev-eric-aikins-birthday",
    title: "Rev. Eric Aikins - Diamond 60th Birthday Celebration",
    category: "Graphic Design",
    image: "/portfolio-assets/aikins-birthday-executive.jpg",
    extraImages: ["/portfolio-assets/rev-eric-aikins-60th-birthday.jpg"],
    client: "Assemblies of God / Rev. Eric Aikins Family",
    description: "Distinguished pastoral milestone celebration suite honoring the 60th birthday of Rev. Eric Aikins. Features regal golden typography, ministerial vestments, and commemorative thanksgiving motifs.",
    challenge: "Designing a dignified, deeply respectful celebratory announcement that honors six decades of life, family devotion, and faithful spiritual leadership.",
    solution: "Composed rich royal burgundy and gold color schemes paired with warm portraiture and heartfelt scriptural benedictions across executive invitations and church flyers.",
    scope: ["Milestone Birthday Design", "Pastoral Honor Flyer", "Event Invitation Suite"]
  },
  {
    id: "hon-osei-assibey-antwi-tribute",
    title: "In Loving Memory: Hon. Osei Assibey Antwi - Former Mayor of Kumasi Memorial Tribute",
    category: "Graphic Design",
    image: "/portfolio-assets/mayor-tribute-final.jpg",
    extraImages: [],
    client: "Kumasi Metropolitan Assembly / Family of Late Mayor",
    description: "Somber, dignified memorial poster and tribute celebrating the enduring public service legacy of Hon. Osei Assibey Antwi, former Mayor of Kumasi and public servant.",
    challenge: "Crafting a deeply reverent, honorable memorial graphic that reflects state-level dignity, municipal leadership accomplishments, and consoling warmth for mourners.",
    solution: "Constructed a solemn black-and-gold memorial frame with dignified presidential typography, state honors symbolism, and heartfelt condolence prose.",
    scope: ["Memorial Tribute Poster", "State Honors Graphic", "Civic Condolence Announcement"]
  },
  {
    id: "alhassan-ziblim-birthday",
    title: "Alhassan Ziblim - Executive Birthday Celebration & Portrait",
    category: "Graphic Design",
    image: "/portfolio-assets/ziblim-birthday-portrait.jpg",
    extraImages: [],
    client: "Alhassan Ziblim",
    description: "Executive birthday tribute flyer highlighting refined professional portraiture, bespoke milestone typography, and commemorative congratulations for Alhassan Ziblim.",
    challenge: "Creating a sophisticated, high-impact personal milestone graphic suitable for social networks and executive colleagues.",
    solution: "Blended rich atmospheric studio lighting, modern serif typography, and gold accent ribbons into a polished celebratory announcement.",
    scope: ["Executive Birthday Flyer", "Personal Milestone Art", "Social Media Celebration"]
  },
  {
    id: "naspa-regional-birthday",
    title: "NASPA Regional Secretariat - Executive Birthday Goodwill Poster",
    category: "Graphic Design",
    image: "/portfolio-assets/naspa-regional-birthday.jpg",
    extraImages: [],
    client: "NASPA Regional Secretariat",
    description: "Official National Service Personnel Association (NASPA) regional executive birthday celebration flyer conveying heartfelt organizational goodwill and leadership recognition.",
    challenge: "Projecting organizational warmth, collegial respect, and professional executive branding within the National Service leadership framework.",
    solution: "Employed official NASPA green and gold corporate styling with crisp executive portraiture and commemorative celebration messaging.",
    scope: ["Organizational Birthday Poster", "Executive Recognition", "Association Communications"]
  },
  {
    id: "d-rux-luxury-streetwear",
    title: "D-Rux Lux Clothing - Urban Streetwear & Apparel Drop",
    category: "Flyer Design",
    image: "/portfolio-assets/d-rux-clothing.jpg",
    extraImages: [],
    client: "D-Rux Lux Clothing",
    description: "Edgy, high-fashion urban streetwear launch poster for D-Rux Lux Clothing. Features industrial typography, raw aesthetic street photography, and bold seasonal drop branding.",
    challenge: "Communicating exclusive streetwear exclusivity and rebel luxury to Gen Z and millennial fashion trendsetters across Accra.",
    solution: "Implemented high-contrast duotone imagery, distressed street aesthetics, and oversized minimalist typography that demands immediate attention on social feeds.",
    scope: ["Streetwear Fashion Poster", "Product Drop Flyer", "Youth Culture Apparel"]
  },
  {
    id: "ekua-special-celebration",
    title: "Ekua Special - Royal Birthday Celebration (Red & Gold Editions)",
    category: "Graphic Design",
    image: "/portfolio-assets/ekua-special-red.jpg",
    extraImages: ["/portfolio-assets/ekua-special-gold.jpg"],
    client: "Ekua Private Client",
    description: "Lavish birthday announcement suite in contrasting Crimson Red and Imperial Gold editions for Ekua's private milestone celebration.",
    challenge: "Creating a dual-palette luxury invitation experience giving the client vibrant red and classic gold aesthetic choices for social distribution.",
    solution: "Designed intricate royal filigree ornamentation, sparkling ambient particle lighting, and bespoke script typography that radiates elegance.",
    scope: ["Luxury Birthday Flyer", "Dual Edition Poster Suite", "Celebrity Event Invitation"]
  },
  {
    id: "elan-noir-flyer",
    title: "\u00c9lan Noir - Hair Braiding Studio & Beauty Salon Promo",
    category: "Flyer Design",
    image: "/portfolio-assets/elan-noir-flyer.jpg",
    extraImages: [],
    client: "\u00c9lan Noir Studio",
    description: "Sophisticated commercial beauty studio flyer for \u00c9lan Noir Salon, showcasing exquisite knotless braids, custom wig installation, and luxury haircare treatments.",
    challenge: "Standing out in a competitive hair and beauty salon market with an ultra-clean, elegant, and aspirational visual showcase.",
    solution: "Curated high-resolution hairstyle photography with soft pastel tones, clean service pricing lists, and prominent instant booking contact channels.",
    scope: ["Beauty Salon Marketing", "Hair Braiding Promotional Flyer", "Commercial Service Menu"]
  },
  {
    id: "heaven-gate-ministry",
    title: "Heaven Gate Ministry - Gospel Worship & Revival Night",
    category: "Graphic Design",
    image: "/portfolio-assets/heaven-gate-ministry.jpg",
    extraImages: [],
    client: "Heaven Gate Ministry",
    description: "Inspiring gospel crusade and worship revival night flyer for Heaven Gate Ministry, featuring dramatic divine light rays and spirit-filled worship atmosphere.",
    challenge: "Rallying congregation members and community seekers to an extraordinary evening of prayer, prophetic impartation, and breakthrough praise.",
    solution: "Constructed an ethereal visual narrative using radiant gold bursts, soaring angelic cloudscapes, and bold scripture-centered event typography.",
    scope: ["Church Event Poster", "Gospel Revival Flyer", "Ministry Communications"]
  },
  {
    id: "church-welcome-fellowship",
    title: "Sunday Service & Fellowship - Welcome to Church Flyer",
    category: "Graphic Design",
    image: "/portfolio-assets/church-welcome-fellowship.jpg",
    extraImages: [],
    client: "Christian Community Fellowship",
    description: "Inviting, warm community church invitation flyer welcoming first-time visitors, youth, and families to Sunday service and mid-week prayer fellowship.",
    challenge: "Projecting open arms, genuine warmth, and unconditional hospitality to seekers and community members seeking a spiritual family.",
    solution: "Utilized clean modern photography of joyful fellowship, gentle ambient lighting, and welcoming typographic layouts with clear service schedules.",
    scope: ["Church Invitation Flyer", "Sunday Service Announcement", "Fellowship Community Poster"]
  },
  {
    id: "gratitude-appreciation-card",
    title: "Sincere Gratitude - Client Appreciation & Thank You Card",
    category: "Graphic Design",
    image: "/portfolio-assets/gratitude-thank-you-card.jpg",
    extraImages: [],
    client: "Corporate & Event Hospitality",
    description: "Elegant, heartfelt client gratitude and appreciation card designed for corporate clients, event guests, and business patrons.",
    challenge: "Delivering a memorable, high-class token of genuine thanks that reinforces lasting client relationships and emotional brand loyalty.",
    solution: "Designed subtle embossed golden geometric borders, flowing luxury script typography, and sophisticated minimalist white space for handwritten notes.",
    scope: ["Corporate Appreciation Stationery", "Thank You Card Design", "Client Relationship Collateral"]
  },
  {
    id: "fargone-luxury-streetwear",
    title: "Fargone Apparel - Luxury Streetwear & Free Nationwide Delivery Promo",
    category: "Branding & Identity",
    image: "/portfolio-assets/fargone-luxury-brand.jpg",
    extraImages: ["/portfolio-assets/fargone-free-delivery-promo.jpg"],
    client: "Fargone Apparel",
    description: "Urban luxury apparel promotional suite for Fargone Apparel highlighting premium street hoodies, heavyweight tees, and a nationwide free delivery campaign.",
    challenge: "Overcoming customer delivery hesitations across Ghanaian regions while cementing Fargone's status as a top-tier homegrown urban brand.",
    solution: "Crafted high-energy promotional layouts pairing urban industrial backgrounds with high-visibility 'FREE DELIVERY' badges and direct WhatsApp order prompts.",
    scope: ["Streetwear Brand Identity", "E-Commerce Promotional Campaign", "Social Media Ad Suite"]
  },
  {
    id: "fo-declaration-intent",
    title: "F.O - Official Declaration of Intent & Political Campaign Series",
    category: "Political Design",
    image: "/portfolio-assets/fo-intent-main.jpg",
    extraImages: ["/portfolio-assets/fo-intent-alternate.jpg"],
    client: "F.O Campaign Secretariat",
    description: "Official political declaration of intent posters for F.O, articulating core political manifesto pillars, youth empowerment commitments, and constituent engagement.",
    challenge: "Crafting an authoritative, statesman-like launch graphic that establishes the candidate's serious intent and captures grassroots momentum from day one.",
    solution: "Designed commanding dual-format campaign posters with patriotic color harmonies, clear vision statements, and distinguished candidate portraiture.",
    scope: ["Political Declaration Posters", "Election Intent Launch", "Campaign Collateral"]
  },
  {
    id: "george-ambassador-advocacy",
    title: "Hon. George Opare Addo - Youth Ambassadorial Leadership Profile",
    category: "Political Design",
    image: "/portfolio-assets/george-ambassador-1.jpg",
    extraImages: ["/portfolio-assets/george-ambassador-2.jpg"],
    client: "Youth Ambassadorial Secretariat",
    description: "Diplomatic ambassadorial visual profile suite for Hon. George Opare Addo, illustrating international youth advocacy, national policy forums, and democratic governance leadership.",
    challenge: "Projecting global diplomatic stature and unwavering youth advocacy across continental youth congresses and national political arenas.",
    solution: "Constructed a polished executive layout featuring international conference backdrops, clean institutional typography, and diplomatic credential emblems.",
    scope: ["Diplomatic Profile Design", "Youth Ambassador Branding", "Civic Leadership Portfolio"]
  },
  {
    id: "gnuts-official-media-suite",
    title: "GNUTS - Ghana National Union of Technical Students Official Media & Campaign Suite",
    category: "Campaign Design",
    image: "/portfolio-assets/gnuts-summit-banner-1.jpg",
    extraImages: ["/portfolio-assets/gnuts-summit-banner-2.jpg", "/portfolio-assets/gnuts-choose-tvet.jpg", "/portfolio-assets/gnuts-director-general.jpg", "/portfolio-assets/gnuts-program-outline.jpg", "/portfolio-assets/gnuts-cc-countdown.jpg", "/portfolio-assets/gnuts-cape-coast-visit.jpg", "/portfolio-assets/gnuts-easter-blessings.jpg", "/portfolio-assets/gnuts-independence-celebration.jpg", "/portfolio-assets/gnuts-dignitary-pelpuo.jpg", "/portfolio-assets/gnuts-dignitary-pablo.jpg", "/portfolio-assets/gnuts-dignitary-wiseman.jpg", "/portfolio-assets/gnuts-dignitary-linda-ocloo.jpg", "/portfolio-assets/gnuts-dignitary-haruna.jpg", "/portfolio-assets/sung-gnuts-pro-main.jpg", "/portfolio-assets/sung-gnuts-pro-endorsement.jpg", "/portfolio-assets/gnuts-womens-day.jpg", "/portfolio-assets/gnuts-cc-did-you-know.jpg", "/portfolio-assets/gnuts-cc-question-of-the-day.jpg", "/portfolio-assets/gnuts-social-media-channels.jpg", "/portfolio-assets/gnuts-president-delali-birthday.jpg", "/portfolio-assets/gnuts-cc-registration-qr.jpg", "/portfolio-assets/gnuts-tech-summit-main-flyer.jpg", "/portfolio-assets/gnuts-cc-1st-central-committee-main.jpg", "/portfolio-assets/gnuts-cc-prof-ahmed-jinapor-gtec.jpg", "/portfolio-assets/gnuts-cc-dr-eric-adzroe-tvet.jpg", "/portfolio-assets/gnuts-cc-tech-summit-tvet.jpg", "/portfolio-assets/gnuts-summit-abubakari-saana-yea.jpg", "/portfolio-assets/gnuts-summit-dr-patrick-essien-epa.jpg", "/portfolio-assets/gnuts-summit-edward-yaw-udzu-copyghana.jpg", "/portfolio-assets/gnuts-summit-gertrude-donkor-esq.jpg", "/portfolio-assets/gnuts-citation-hon-linda-ocloo.jpg", "/portfolio-assets/gnuts-citation-anthony-kwame-zu.jpg", "/portfolio-assets/gnuts-national-cs-eid-mubarak.jpg", "/portfolio-assets/gnuts-national-pro-joe-vardy-eid.jpg", "/portfolio-assets/gnuts-launching-website-soon.jpg", "/portfolio-assets/gnuts-interactive-socials.jpg"],
    client: "Ghana National Union of Technical Students (GNUTS)",
    description: "Comprehensive 37-piece official visual communications catalog for GNUTS National Secretariat. Unifies National Tech Summit banners, Central Committee summits, high-profile dignitary welcomes (Hon. Haruna Iddrisu, Dr. Pelpuo, Hon. Linda Ocloo), TVET advocacy, citations of honor, and executive holiday greetings.",
    challenge: "Executing an enterprise-grade visual identity across massive student conventions, state-level institutional stakeholder meetings, speaker announcements, and national TVET media campaigns.",
    solution: "Created a unified corporate color harmony and typography hierarchy that established GNUTS as Ghana's most professional and authoritative student union.",
    scope: ["National Union Brand System", "Conference & Stage Graphics", "Executive Citations", "TVET Advocacy Campaign", "High-Profile Speaker Banners"]
  },
  {
    id: "frandees-yogo-delight",
    title: "Frandees Yogo - Fresh Frozen Yogurt & Parfait Delight",
    category: "Flyer Design",
    image: "/portfolio-assets/frandees-yogo.jpg",
    extraImages: [],
    client: "Frandees Delights",
    description: "Vibrant, mouthwatering commercial flyer for Frandees Yogo, showcasing fresh frozen yogurt, strawberry parfaits, fruit toppings, and healthy refreshments.",
    challenge: "Stimulating immediate appetite and consumer craving on social media feeds with vibrant dessert photography and crisp price points.",
    solution: "Utilized ultra-crisp dessert styling, rich berry splash graphics, and playful energetic typography with instant delivery contact numbers.",
    scope: ["Food & Beverage Marketing", "Commercial Dessert Flyer", "Social Media Promotion"]
  },
  {
    id: "high-school-invasion",
    title: "High School Invasion - Nationwide Youth Campus Tour & Festival",
    category: "Event Design",
    image: "/portfolio-assets/high-school-invasion.jpg",
    extraImages: [],
    client: "Invasion Entertainment",
    description: "Electrifying youth festival and talent exhibition flyer for the nationwide High School Invasion tour, featuring DJ performances, dance competitions, and teen entertainment.",
    challenge: "Igniting organic excitement and viral sharing among senior high school students across multiple regions in Ghana.",
    solution: "Crafted high-voltage neon lighting effects, graffiti urban styling, and bold concert typography that captures teenage energy and festival excitement.",
    scope: ["Youth Festival Branding", "Concert Poster Design", "Campus Tour Marketing"]
  },
  {
    id: "honorable-fynn-philanthropy",
    title: "Comrade & Hon. Fynn - Leadership Profile, Donations & Birthday Milestone",
    category: "Political Design",
    image: "/portfolio-assets/honorable-fynn-main.jpg",
    extraImages: ["/portfolio-assets/comrade-fynn-donations.jpg", "/portfolio-assets/honorable-fynn-bday.jpg", "/portfolio-assets/honorable-fynn-thanks.jpg", "/portfolio-assets/comrade-fynn-profile-recovered.jpg"],
    client: "Hon. Fynn Foundation",
    description: "Comprehensive 5-part leadership and philanthropy media campaign for Comrade & Hon. Fynn. Documents charitable community donations, political profiles, birthday milestones, and constituent appreciation.",
    challenge: "Chronicling extensive grassroots philanthropic contributions while reinforcing the leader's dedication to community welfare and youth empowerment.",
    solution: "Applied a consistent dignified political aesthetic featuring authentic on-ground donation photography, bold typography, and warm civic styling.",
    scope: ["Civic Leadership Campaign", "Philanthropy Documentation", "Political Milestone Suite"]
  },
  {
    id: "immanuel-leadership-series",
    title: "Immanuel - Student Governance & Representative Leadership Series",
    category: "Campaign Design",
    image: "/portfolio-assets/immanuel-numbered-1.jpg",
    extraImages: ["/portfolio-assets/immanuel-numbered-2.jpg", "/portfolio-assets/immanuel-leadership-main.jpg"],
    client: "Immanuel for Student Representative",
    description: "Structured 3-part student leadership electoral campaign for Immanuel, detailing specific governance policy points, student welfare pledges, and election mobilization.",
    challenge: "Presenting complex student governance policies in clean, easily readable numbered graphic cards that busy students can absorb in seconds.",
    solution: "Designed a modular numbered graphic system with crisp blue-amber accents, high-contrast typography, and charismatic leadership portraiture.",
    scope: ["Student Representation Campaign", "Policy Card Infographics", "Campus Election Media"]
  },
  {
    id: "ivys-kids-apparel-suame",
    title: "Ivy's Kids Apparel - Suame Children's Boutique Promo",
    category: "Flyer Design",
    image: "/portfolio-assets/ivys-kids-apparel.jpg",
    extraImages: [],
    client: "Ivy's Kids Apparel (Suame, Kumasi)",
    description: "Delightful, colorful retail boutique flyer for Ivy's Kids Apparel in Suame, Kumasi, promoting children's clothing, footwear, holiday outfits, and birthday wears.",
    challenge: "Attracting Ghanaian parents seeking quality, affordable, and stylish children's clothing for church, school, and special family milestones.",
    solution: "Utilized playful pastel color accents, cheerful kids fashion photography, and clear location directions in Suame with instant WhatsApp ordering.",
    scope: ["Kids Fashion Advertising", "Retail Store Flyer", "Local Business Marketing"]
  },
  {
    id: "jessica-leadership-campaign",
    title: "Jessica - Student Representative Council (SRC) Leadership & Vetting Campaign",
    category: "Campaign Design",
    image: "/portfolio-assets/jessica-vetting-day.jpg",
    extraImages: ["/portfolio-assets/jessica-vetting-series-1.jpg", "/portfolio-assets/jessica-leadership-main.jpg", "/portfolio-assets/jessica-campaign-portrait.jpg", "/portfolio-assets/jessica-campaign-policy.jpg"],
    client: "Jessica for SRC",
    description: "Premier 5-part student executive election suite for Jessica contesting for SRC leadership. Features official vetting day flyers, campaign manifestos, policy outlines, and portrait posters.",
    challenge: "Establishing exceptional credibility, poise, and intellectual preparedness during critical vetting sessions and intense campus debate periods.",
    solution: "Constructed an elegant, authoritative campaign brand with deep royal blue and gold accents, crisp editorial layouts, and high-resolution studio photography.",
    scope: ["Executive Vetting Campaign", "SRC Election Strategy", "Campus Manifesto Posters"]
  },
  {
    id: "kaea-ashanti-regional",
    title: "KAEA - Regional Leadership Conference, Official Apparel & Civic Outreach",
    category: "Branding & Identity",
    image: "/portfolio-assets/kaea-region-final.jpg",
    extraImages: ["/portfolio-assets/kaea-region-2.jpg", "/portfolio-assets/kaea-tshirt-mockup.jpg", "/portfolio-assets/kaea-congratulations.jpg", "/portfolio-assets/kaea-national-naspa-secretary-campaign.jpg", "/portfolio-assets/kaea-president-naspa-birthday.jpg", "/portfolio-assets/kaea-ashanti-regional-recovered.jpg", "/portfolio-assets/kaea-tshirt-mockup-front.jpg", "/portfolio-assets/kaea-tshirt-mockup-variant.jpg", "/portfolio-assets/kaea-tshirt-mockup-final1.jpg", "/portfolio-assets/kaea-naspa-births-deaths-registration.jpg"],
    client: "KAEA National Association",
    description: "Comprehensive 11-piece institutional identity and event suite for KAEA (Kwame Nkrumah University / Ashanti Regional Association). Covers regional leadership conferences, official merchandise t-shirts, NASPA Secretary campaigns, executive birthdays, and civic registration initiatives.",
    challenge: "Delivering a unified, prestigious brand presence across large-scale student conferences, customized physical apparel, executive elections, and public civic outreach.",
    solution: "Developed a timeless corporate color system, high-resolution 3D apparel mockups, official institutional cresting, and cohesive conference typography.",
    scope: ["Association Brand System", "Conference Stage Media", "Custom 3D T-Shirt Mockups", "Civic Outreach Campaigns"]
  },
  {
    id: "karim-abubakari-campaign",
    title: "Abdul Karim Abubakari - Youth Development First Campaign",
    category: "Political Design",
    image: "/portfolio-assets/karim-abubakari-incoming.jpg",
    extraImages: ["/portfolio-assets/karim-abubakari-main.jpg"],
    client: "Abdul Karim Abubakari Campaign",
    description: "Strategic political campaign suite for Abdul Karim Abubakari championing the 'Youth Development First' political agenda in the Northern Region.",
    challenge: "Articulating a bold, youth-centric transformative agenda that resonates with regional party delegates, young activists, and grassroots organizers.",
    solution: "Blended authentic northern grassroots imagery, decisive emerald-accented campaign typography, and prominent party symbols for high voter recall.",
    scope: ["Regional Political Branding", "Youth Mobilization Posters", "Election Collateral"]
  },
  {
    id: "mc-kobby-live-hosting",
    title: "MC Kobby - Master of Ceremonies & Live Event Hosting",
    category: "Event Design",
    image: "/portfolio-assets/mc-kobby-hosting.jpg",
    extraImages: [],
    client: "MC Kobby Entertainment",
    description: "High-energy personal brand flyer for MC Kobby, professional Master of Ceremonies, hype man, and corporate wedding/event host in Accra and Kumasi.",
    challenge: "Communicating stage charisma, unmatched crowd engagement, and professional reliability to wedding planners and corporate event organizers.",
    solution: "Designed dynamic stage lighting effects, microphone iconography, and bold neon typography that signals premium entertainment value.",
    scope: ["Personal Brand Flyer", "Event Host Marketing", "Entertainment Industry Graphic"]
  },
  {
    id: "mufti-academic-celebration",
    title: "Mufti - Academic Completion, Exams Finale & Homecoming Series",
    category: "Event Design",
    image: "/portfolio-assets/mufti-homecoming.jpg",
    extraImages: ["/portfolio-assets/mufti-exams-finale.jpg"],
    client: "Mufti Student Council",
    description: "Two-part celebratory campus event suite for Mufti, marking the conclusion of university semester examinations and the grand alumni homecoming celebration.",
    challenge: "Capturing the relief and euphoria of students concluding final examinations while mobilizing massive turnout for the annual homecoming festivities.",
    solution: "Employed high-energy party visual effects, dynamic confetti bursts, bold celebratory headlines, and clear campus gathering coordinates.",
    scope: ["Campus Event Branding", "Exams Finale Announcement", "Homecoming Celebration Poster"]
  },
  {
    id: "mugeez-entertainment-live",
    title: "Mugeez - Live Concert & Star Appearance Tour",
    category: "Event Design",
    image: "/portfolio-assets/mugeez-live-1.jpg",
    extraImages: ["/portfolio-assets/mugeez-live-2.jpg"],
    client: "Star Entertainment Ghana",
    description: "Electrifying concert performance and club appearance flyer series for Ghanaian music icon Mugeez (R2Bees), celebrating live musical performances.",
    challenge: "Creating an unmissable, star-studded nightlife concert announcement that drives VIP table reservations and presale tickets.",
    solution: "Utilized deep indigo atmospheric lighting, golden stage flares, and bold concert billing typography centered around charismatic star photography.",
    scope: ["Celebrity Concert Branding", "Nightlife Event Poster", "Star Appearance Promotion"]
  },
  {
    id: "odartey-naspa-vp",
    title: "Ishmael Evans Nii Odartey Lamptey - NASPA Executive Campaign Series",
    category: "Campaign Design",
    image: "/portfolio-assets/odartey-naspa-regional-main.jpg",
    extraImages: ["/portfolio-assets/odartey-naspa-vote-flyer.jpg", "/portfolio-assets/ishmael-odartey-lamptey-naspa-president.jpg"],
    client: "Ishmael Evans Nii Odartey Lamptey",
    description: "Complete 3-part executive leadership campaign suite for Ishmael Evans Nii Odartey Lamptey contesting for NASPA Western Regional Vice President and Tarkwa-Nsuaem President.",
    challenge: "Positioning the candidate as an energetic, trustworthy, and results-driven national service advocate across Western Region service personnel.",
    solution: "Crafted a cohesive, professional campaign identity using green and gold national service colors, decisive voting ballot numbers, and confident executive portraiture.",
    scope: ["NASPA Election Branding", "Campaign Poster Suite", "Personnel Welfare Advocacy"]
  },
  {
    id: "oriental-installment-furniture",
    title: "Oriental Living - Luxury Furniture & Flexible Installment Promo",
    category: "Flyer Design",
    image: "/portfolio-assets/oriental-installment-1.jpg",
    extraImages: ["/portfolio-assets/oriental-installment-2.jpg"],
    client: "Oriental Living Ghana",
    description: "Two-part luxury home furnishings promotional campaign for Oriental Living, highlighting imported leather sofas, dining suites, and flexible monthly installment plans.",
    challenge: "Making luxury home decor accessible to middle- and upper-class Ghanaian homeowners by highlighting flexible payment terms without diminishing brand prestige.",
    solution: "Engineered spacious, high-end editorial layouts featuring curated interior living room photography, crisp payment terms, and clear showroom visit CTAs.",
    scope: ["Furniture Retail Marketing", "Installment Campaign Flyer", "Luxury Interior Advertising"]
  },
  {
    id: "peace-consult-kstu-admissions",
    title: "The Peace Consult - KsTU Admissions & Academic Placement",
    category: "Flyer Design",
    image: "/portfolio-assets/peace-consult-kstu-admissions.jpg",
    extraImages: [],
    client: "The Peace Consult",
    description: "Informative educational consultancy flyer for The Peace Consult, providing admissions guidance, mature student coaching, and diploma placements at KsTU.",
    challenge: "Reassuring prospective university students and working adults seeking tertiary education with credible, hassle-free admissions assistance.",
    solution: "Structured academic requirement lists into clear, digestible reading blocks with prominent contact telephone hotlines and trust-building accreditations.",
    scope: ["Educational Consultancy Flyer", "University Admissions Campaign", "Student Recruitment Media"]
  },
  {
    id: "prayer-forum-identity",
    title: "The Prayer Forum - Visual Identity & Annual Spiritual Gathering",
    category: "Branding & Identity",
    image: "/portfolio-assets/prayer-forum-1.jpg",
    extraImages: ["/portfolio-assets/prayer-forum-2.jpg"],
    client: "The Prayer Forum",
    description: "Spiritual brand identity and event suite for The Prayer Forum, uniting interdenominational believers for intensive prayer conferences and worship convocations.",
    challenge: "Creating an atmosphere of reverence, holiness, and passionate prayer that transcends denominational boundaries across Ghana.",
    solution: "Utilized golden celestial light flares, prayerful silhouette imagery, and modern sacred typography with detailed gathering coordinates.",
    scope: ["Ministry Brand Identity", "Interdenominational Event Flyer", "Prayer Conference Suite"]
  },
  {
    id: "quran-and-co-sisters-hangout",
    title: "Qur'an & Co. - Sisters Quran Hangout at KNUST Botanical Garden",
    category: "Social Media Design",
    image: "/portfolio-assets/quran-and-co-sisters-hangout.jpg",
    extraImages: [],
    client: "Qur'an & Co.",
    description: "Serene, beautifully themed event flyer for Qur'an & Co.'s Sisters Quran Hangout, an outdoor spiritual gathering of Muslim women at the KNUST Botanical Garden in Kumasi.",
    challenge: "Creating an inviting, peaceful, and sisterhood-focused flyer that inspires young Muslim women to participate in outdoor Quranic reflections.",
    solution: "Designed lush botanical garden floral elements, gentle mint and gold Islamic accents, and clean event details covering ticket prices, dates, and venue coordinates.",
    scope: ["Islamic Community Event", "Sisters Hangout Flyer", "Spiritual Social Media Poster"]
  },
  {
    id: "ramadan-islamic-heritage",
    title: "Ramadan Mubarak & Kareem - Islamic Spiritual Greetings & Reflections",
    category: "Social Media Design",
    image: "/portfolio-assets/ramadan-kareem-crescent.jpg",
    extraImages: ["/portfolio-assets/ramadan-mubarak-peace.jpg", "/portfolio-assets/jannah-ramadan-reflection.jpg"],
    client: "Islamic Cultural & Spiritual Community",
    description: "Exquisite 3-part Islamic digital art collection celebrating the Holy Month of Ramadan. Features glowing crescent moon motifs, mosque silhouettes, and Jannah spiritual reflections.",
    challenge: "Crafting deeply reverent, culturally authentic Islamic graphics that convey peace, spiritual introspection, and divine blessings for widespread social sharing.",
    solution: "Engineered nocturnal deep blue and emerald skies illuminated with radiant golden lanterns, crescent moons, and intricate Islamic geometric patterns.",
    scope: ["Islamic Festive Graphics", "Ramadan Social Media Suite", "Spiritual Reflection Posters"]
  },
  {
    id: "royal-rangers-camp",
    title: "Royal Rangers - National Youth Adventure Camp",
    category: "Event Design",
    image: "/portfolio-assets/royal-rangers-camp.jpg",
    extraImages: [],
    client: "Assemblies of God Royal Rangers",
    description: "High-adventure national youth camp poster for Assemblies of God Royal Rangers, showcasing outdoor camping, leadership drills, and Christian character mentorship.",
    challenge: "Inspiring boys, girls, and church youth leaders to enroll in an action-packed, spirit-empowering outdoor camping expedition.",
    solution: "Applied dynamic wilderness graphics, camping insignia, bold stencil typography, and clear registration deadlines with national coordinator contacts.",
    scope: ["Youth Camp Flyer", "Church Adventure Poster", "Christian Scouting Media"]
  },
  {
    id: "sarmpa-black-soap",
    title: "Sarmpa Organic Black Soap - 100% Natural African Skincare",
    category: "Branding & Identity",
    image: "/portfolio-assets/sarmpa-organics-black-soap.jpg",
    extraImages: [],
    client: "Organics Africa",
    description: "Clean, organic skincare product flyer for Sarmpa Black Soap, highlighting 100% natural organic ingredients, acne-fighting benefits, and glowing skin rejuvenation.",
    challenge: "Communicating genuine botanical purity and dermatologist-friendly benefits to discerning organic skincare buyers in Ghana.",
    solution: "Constructed an earthy botanical layout with lush green leaf textures, crisp product photography, and transparent ingredient efficacy bullet points.",
    scope: ["Natural Skincare Marketing", "Product Flyer Design", "Cosmetics Advertising"]
  },
  {
    id: "sltf-education-awareness",
    title: "Students Loan Trust Fund (SLTF) - Tertiary Student Financing Campaign",
    category: "Graphic Design",
    image: "/portfolio-assets/sltf-awareness.jpg",
    extraImages: [],
    client: "Students Loan Trust Fund (SLTF) Ghana",
    description: "Informative public education flyer for the Students Loan Trust Fund (SLTF), outlining the 'No Guarantor Policy', online application procedures, and loan eligibility.",
    challenge: "Demystifying government student loan applications and reaching thousands of tertiary students across Ghana who need urgent tuition assistance.",
    solution: "Structured step-by-step application instructions with high-legibility institutional typography, national cresting, and official SLTF portal web links.",
    scope: ["Public Education Flyer", "Student Financial Aid Poster", "Government Agency Collateral"]
  },
  {
    id: "techloom-agency-promotions",
    title: "TechLoom Ghana - Agency Brand Campaigns & Promotional Offers",
    category: "Social Media Design",
    image: "/portfolio-assets/techloom-brand-ad-1.jpg",
    extraImages: ["/portfolio-assets/techloom-brand-ad-2.jpg", "/portfolio-assets/techloom-brand-ad-3.jpg", "/portfolio-assets/techloom-two-designs-promo.jpg", "/portfolio-assets/techloom-free-flyer-week.jpg", "/portfolio-assets/techloom-eid-adha-greetings.jpg", "/portfolio-assets/techloom-attention-grabbing-ads.jpg", "/portfolio-assets/techloom-design-with-tlm-promo.jpg", "/portfolio-assets/techloom-eid-mubarak-green.jpg"],
    client: "TechLoom Ghana",
    description: "Premier 9-piece internal creative agency promotional and festive campaign catalog for TechLoom Ghana. Covers brand authority ads, 'Stop the Scroll' creative showcases, 2-for-1 design promos, Free Flyer Week, and festive greetings.",
    challenge: "Demonstrating TechLoom's elite graphic design capabilities, brand strategy, and high-converting marketing frameworks directly to prospective clients.",
    solution: "Executed high-voltage neon styling, bespoke agency iconography, compelling copywriting hooks, and unmistakable TechLoom blue branding across all digital promos.",
    scope: ["Agency Self-Promotion", "Social Media Advertising", "Promotional Campaign Suite"]
  },
  {
    id: "gadget-store-promo",
    title: "Smart Gadgets & Electronics Store - Promotional Sale Flyer",
    category: "Flyer Design",
    image: "/portfolio-assets/gadget-store-flyer.jpg",
    extraImages: ["/portfolio-assets/techloom-gadget-promo-recovered.jpg"],
    client: "Gadget Hub Ghana",
    description: "High-tech commercial retail flyer showcasing premium laptops, smartphones, smartwatches, and audio accessories with special installment and discount pricing.",
    challenge: "Driving high foot traffic and direct WhatsApp inquiries for consumer electronics with an ultra-modern, high-tech retail presentation.",
    solution: "Constructed floating product cutouts with electric cyan glow accents, bold discount price tags, and clear showroom contact details.",
    scope: ["Retail Electronics Flyer", "Gadget Store Marketing", "Commercial Product Promo"]
  },
  {
    id: "kedlan-school-branding",
    title: "Kedlan Educational Complex - Institutional Brand Identity & Prospectus",
    category: "Branding & Identity",
    image: "/portfolio-assets/techloom-kedlan-school-branding-proposal.jpg",
    extraImages: [],
    client: "Kedlan Educational Complex",
    description: "Comprehensive educational institutional identity and prospectus presentation proposal for Kedlan Educational Complex, covering modern academic crests, student uniforms, and school prospectus design.",
    challenge: "Modernizing a leading educational institution's visual identity to reflect academic excellence, moral discipline, and modern 21st-century learning standards.",
    solution: "Designed balanced institutional cresting, dignified navy and gold color palettes, and structured prospectus layouts for parent and board presentation.",
    scope: ["Educational Brand Identity", "School Prospectus Proposal", "Academic Stationery Design"]
  },
  {
    id: "tein-national-tertiary",
    title: "TEIN Ghana - Tertiary Institutions Network Political Mobilization Series",
    category: "Political Design",
    image: "/portfolio-assets/tein-final-poster.jpg",
    extraImages: ["/portfolio-assets/tein-variation-2.jpg", "/portfolio-assets/tein-variation-4.jpg"],
    client: "TEIN Ghana",
    description: "Dynamic 3-part political mobilization poster series for TEIN Ghana across tertiary institutions, focusing on student youth activism, grassroots voter turnout, and political vigilance.",
    challenge: "Energizing tertiary students and youth intellectuals to take active roles in national democratic governance and party grassroots organizing.",
    solution: "Engineered high-impact political protest typography, bold green-white-red party colors, and striking youth leadership imagery across campus dorms.",
    scope: ["Tertiary Political Mobilization", "Youth Activism Posters", "Campus Political Strategy"]
  },
  {
    id: "tescon-bole-nmtc-orientation",
    title: "TESCON Bole NMTC - Freshers Orientation & Welcome Ceremony",
    category: "Campaign Design",
    image: "/portfolio-assets/tescon-bole-nmtc-orientation.jpg",
    extraImages: [],
    client: "TESCON Bole NMTC Chapter",
    description: "Official campus orientation and welcome ceremony flyer for TESCON Bole Nursing and Midwifery Training College chapter, introducing fresh health trainees to campus leadership.",
    challenge: "Creating an enthusiastic, welcoming atmosphere that introduces newly admitted health students to student political participation and community health advocacy.",
    solution: "Designed patriotic blue-white-red political emblems combined with medical healthcare iconography, guest speaker highlights, and clear venue schedules.",
    scope: ["Campus Orientation Flyer", "Health College Political Branding", "Student Welcome Poster"]
  },
  {
    id: "ttu-wocom-janice-campaign",
    title: "Janice - Takoradi Technical University (TTU) Women's Commissioner Campaign '26",
    category: "Campaign Design",
    image: "/portfolio-assets/ttu-wocom-26-main.jpg",
    extraImages: ["/portfolio-assets/ttu-wocom-26-janice-official.jpg", "/portfolio-assets/ttu-wocom-26-janice-1.jpg", "/portfolio-assets/ttu-wocom-26-janice-2.jpg"],
    client: "Janice for TTU WOCOM",
    description: "Premier 4-piece executive campaign suite for Janice contesting for Women's Commissioner (WOCOM '26) at Takoradi Technical University. Focuses on female empowerment, student welfare, and campus leadership.",
    challenge: "Communicating empathy, fierce advocacy for female student safety, and executive competence across halls of residence and lecture theaters.",
    solution: "Crafted an inspiring visual palette with gentle violet and rose gold tones, dignified executive portraiture, and clear manifesto policy pillars.",
    scope: ["Female Leadership Campaign", "WOCOM Election Branding", "Campus Manifesto Posters"]
  },
  {
    id: "ype-civic-leadership",
    title: "Young Patriotic Elites (YPE) - Regional Leadership Appointments",
    category: "Political Design",
    image: "/portfolio-assets/goode-ernest-bono-east.jpg",
    extraImages: ["/portfolio-assets/ype-jenatu-bashiru.jpg"],
    client: "Young Patriotic Elites (YPE)",
    description: "Distinguished civic appointment announcement series for Young Patriotic Elites (YPE), celebrating Goode Ernest (Bono East Regional Director) and Jenatu Bashiru.",
    challenge: "Formally confirming high-level regional political appointments with dignity, institutional authority, and inspiring youth leadership profiles.",
    solution: "Utilized clean national political emblems, balanced dual-column executive highlights, and official congratulations typography for wide distribution.",
    scope: ["Civic Executive Appointments", "Political Leadership Posters", "Regional Directorate Branding"]
  },
  {
    id: "zulaiha-safe-journey",
    title: "Zulaiha - Safe Journey & Community Farewell Tribute Series",
    category: "Graphic Design",
    image: "/portfolio-assets/zulaiha-safe-journey.jpg",
    extraImages: ["/portfolio-assets/zulaiha-tribute.jpg", "/portfolio-assets/zulaiha-safe-journey-portrait.jpg"],
    client: "Zulaiha Community Circle",
    description: "Heartwarming 3-part community farewell and travel mercies tribute series honoring Zulaiha, expressing profound affection, travel prayers, and friendship memories.",
    challenge: "Creating an emotional, deeply memorable visual tribute that celebrates cherished friendships and sends off a valued community sister with prayerful blessings.",
    solution: "Blended warm golden sunlight hues, travel road motifs, loving friendship tributes, and radiant photography into an unforgettable digital keepsake.",
    scope: ["Travel Mercies Flyer", "Community Farewell Tribute", "Personal Memorial Poster"]
  },
  {
    id: "dr-freda-prempeh-campaign",
    title: "Hon. Dr. Freda Prempeh - NPP Ahafo Regional Chairperson Campaign",
    category: "Political Design",
    image: "/portfolio-assets/dr-freda-prempeh-ahafo-campaign.jpg",
    extraImages: [],
    client: "Hon. Dr. Freda Prempeh Campaign",
    description: "High-stakes political campaign poster for Hon. Dr. Freda Prempeh contesting for NPP Regional Chairperson in the Ahafo Region. Emphasizes proven track record, regional unification, and electoral victory.",
    challenge: "Projecting undisputed executive experience, ministerial competence, and deep grassroots authority to regional party delegates.",
    solution: "Engineered an commanding layout with presidential navy and crimson framing, distinguished party emblems, and bold, confident candidate portraiture.",
    scope: ["Regional Political Campaign", "Executive Chairperson Election", "Political Billboard Design"]
  },
  {
    id: "lord-akum-yong-naspa-bosomtwe",
    title: "Lord Akum-Yong - Candidate for NASPA Bosomtwe President Campaign",
    category: "Campaign Design",
    image: "/portfolio-assets/lord-akum-yong-naspa-bosomtwe-campaign.jpg",
    extraImages: [],
    client: "Lord Akum-Yong Campaign",
    description: "Energetic student and national service leadership campaign flyer for Lord Akum-Yong contesting for NASPA President in the Bosomtwe District.",
    challenge: "Mobilizing national service personnel across the Bosomtwe District with a vibrant message of welfare reform, prompt allowance advocacy, and professional development.",
    solution: "Constructed a clean, high-visibility layout using official national service green and gold colors, confident candidate portraiture, and compelling campaign slogans.",
    scope: ["NASPA District Campaign", "Executive Election Flyer", "Youth Representation Poster"]
  },
  {
    id: "agbenoko-christopher-kstu-src-pro",
    title: "Agbenoko Christopher - KsTU SRC Public Relations Officer (PRO) Campaign",
    category: "Campaign Design",
    image: "/portfolio-assets/kstu-src-agbenoko-christopher-pro.jpg",
    extraImages: [],
    client: "Agbenoko Christopher Campaign",
    description: "High-impact campus election flyer for Agbenoko Christopher contesting for Public Relations Officer (PRO) of the Kumasi Technical University SRC.",
    challenge: "Projecting articulate communication mastery, approachable student advocacy, and prompt institutional information flow to the entire KsTU student body.",
    solution: "Designed sharp, modern campaign graphics with dynamic studio lighting, prominent PRO ballot position indicators, and memorable voter slogans.",
    scope: ["KsTU SRC Election", "Campus PRO Campaign Flyer", "Student Governance Poster"]
  },
  {
    id: "kstu-src-telecel-sim-registration",
    title: "Kay Collins - KsTU SRC Special Telecel Student SIM Registration",
    category: "Campaign Design",
    image: "/portfolio-assets/kstu-src-kay-collins-telecel-sim.jpg",
    extraImages: [],
    client: "Kay Collins / KsTU SRC Welfare",
    description: "Essential student welfare and connectivity campaign flyer by Kay Collins, organizing special Telecel student SIM card registration and affordable campus bundle activation at KsTU.",
    challenge: "Informing thousands of university students about subsidized campus data rates, mandatory SIM re-registration desks, and hassle-free connectivity solutions.",
    solution: "Utilized bold Telecel red brand accents, clear venue registration dates, and student welfare hotline coordinates for immediate campus engagement.",
    scope: ["Student Welfare Campaign", "Campus Telecel Registration Flyer", "Connectivity Outreach Media"]
  },
  {
    id: "pastor-james-baffoe-birthday",
    title: "Pastor James Baffoe - Birthday Celebration at Assemblies of God Peace Villa",
    category: "Event Design",
    image: "/portfolio-assets/pastor-james-baffoe-birthday-peace-villa.jpg",
    extraImages: [],
    client: "Assemblies of God Peace Villa",
    description: "Regal pastoral birthday celebration announcement flyer for Pastor James Baffoe, ministering at Assemblies of God Peace Villa Church in Kumasi.",
    challenge: "Conveying deep congregational gratitude, ministerial honor, and joyful birthday congratulations to a beloved spiritual father and community shepherd.",
    solution: "Composed rich royal gold and navy ornamental frames with inspiring scripture verses, distinguished pastoral portraiture, and service celebration details.",
    scope: ["Pastoral Birthday Flyer", "Church Honor Announcement", "Christian Ministry Poster"]
  },
  {
    id: "adoration-framing-art",
    title: "Adoration Framing & Art - Custom Certificate & Photo Framing",
    category: "Flyer Design",
    image: "/portfolio-assets/adoration-framing-art-graduation.jpg",
    extraImages: [],
    client: "Adoration Framing & Art",
    description: "Commercial craft and framing service flyer for Adoration Framing & Art, promoting custom graduation certificate framing, family portraits, and canvas mounting.",
    challenge: "Demonstrating bespoke craftsmanship and museum-grade framing preservation to recent university graduates, artists, and corporate clients.",
    solution: "Showcased elegant wood and gold frame mockups with clear sizing pricing tiers and convenient campus pickup/delivery contact channels.",
    scope: ["Custom Framing Marketing", "Graduation Art Services", "Commercial Craft Flyer"]
  },
  {
    id: "habbys-jewelries-fragrance",
    title: "Habby's Jewelries & Fragrance - Luxury Accessories & Perfumes",
    category: "Flyer Design",
    image: "/portfolio-assets/habbys-jewelries-and-fragrance.jpg",
    extraImages: [],
    client: "Habby's Jewelries and Fragrance",
    description: "Opulent commercial retail showcase flyer for Habby's Jewelries & Fragrance, highlighting authentic gold necklaces, diamond-cut rings, designer perfumes, and luxury watches.",
    challenge: "Positioning the brand as the go-to luxury destination for authentic perfumes and bespoke jewelry for weddings, anniversaries, and personal elegance.",
    solution: "Engineered sparkling gold bokeh lighting, luxurious product arrangements, and clean pricing with direct boutique delivery contacts.",
    scope: ["Luxury Jewelry Marketing", "Perfume & Fragrance Ad", "Retail Boutique Flyer"]
  },
  {
    id: "linex-moons-lingerie",
    title: "Linex Moon's Lingerie - Luxury Intimates & Sleepwear Campaign",
    category: "Flyer Design",
    image: "/portfolio-assets/linex-moons-lingerie-campaign.jpg",
    extraImages: [],
    client: "Linex Moon's Lingerie",
    description: "Sultry, elegant lingerie and sleepwear campaign flyer for Linex Moon's Lingerie, featuring silk robes, lace bralettes, and comfortable luxury nightwear.",
    challenge: "Appealing to confident, modern women seeking premium sleepwear and intimate apparel with private, discreet doorstep delivery.",
    solution: "Designed tasteful, sensual moonlight aesthetics with delicate lace typography and straightforward WhatsApp catalog order links.",
    scope: ["Lingerie Fashion Advertising", "Sleepwear Brand Flyer", "Social Commerce Ad"]
  },
  {
    id: "odeneho-tye-and-dye",
    title: "Odeneho Tye & Dye - Traditional Handcrafted Batik & African Fabrics",
    category: "Flyer Design",
    image: "/portfolio-assets/odeneho-tye-and-dye-kumasi.jpg",
    extraImages: [],
    client: "Odeneho Tye & Dye",
    description: "Authentic artisan apparel flyer for Odeneho Tye & Dye in Kumasi, celebrating handcrafted Ghanaian batik fabrics, customized corporate uniforms, and vibrant traditional prints.",
    challenge: "Highlighting rich cultural heritage, durable hand-dyed textile quality, and bespoke tailoring for individuals, schools, and cultural troupes.",
    solution: "Captured vivid fabric color patterns, handcrafted wax-resist motifs, and proud Ghanaian artisan heritage with direct workshop order contacts.",
    scope: ["Artisan Textile Marketing", "Traditional African Fabrics", "Batik Apparel Flyer"]
  },
  {
    id: "the-political-prince-ava",
    title: "The Political Prince / AVA - Christmas & New Year Leadership Goodwill Greeting",
    category: "Political Design",
    image: "/portfolio-assets/the-political-prince-ava-christmas.jpg",
    extraImages: [],
    client: "The Political Prince / AVA",
    description: "Prestigious seasonal goodwill and leadership Christmas/New Year holiday greeting card from The Political Prince / AVA to constituents, youth groups, and colleagues.",
    challenge: "Maintaining meaningful, warm constituent engagement during the festive holiday season while reinforcing civic leadership values and shared hope for the coming year.",
    solution: "Crafted rich holiday crimson and gold festive ornamentation with cheerful Christmas bells, candlelights, and an inspiring New Year prosperity message.",
    scope: ["Political Goodwill Greeting", "Holiday Milestone Card", "Civic Leadership Poster"]
  },
  {
    id: "phitness-with-phamous",
    title: "Phitness with Phamous - Personal Training & Athletic Conditioning",
    category: "Flyer Design",
    image: "/portfolio-assets/phitness-with-phamous-gym-training.jpg",
    extraImages: [],
    client: "Phitness with Phamous",
    description: "High-octane gym and athletic personal training promotional flyer for Phitness with Phamous, featuring weight loss packages, muscle building regimens, and customized meal plans.",
    challenge: "Inspiring fitness enthusiasts and busy executives in Ghana to commit to intense physical transformation under expert certified coaching.",
    solution: "Utilized dynamic amber gym lighting, athletic muscular photography, and crisp service tiers covering 1-on-1 coaching, nutrition guides, and bootcamps.",
    scope: ["Fitness Center Marketing", "Personal Training Flyer", "Athletic Conditioning Poster"]
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
