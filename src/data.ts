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
    "id": "elan-noir-flyer",
    "title": "Élan Noir Exclusive Brand & Event Showcase",
    "category": "Flyer Design",
    "image": "/portfolio-assets/elan-noir-flyer.jpg",
    "description": "High-impact luxury event and brand flyer crafted with sleek typography, deep contrasting tones, and modern editorial flair.",
    "client": "Élan Noir Collection",
    "duration": "1 Week",
    "scope": [
      "Flyer Design",
      "Typography Curation",
      "Social Media Poster",
      "Editorial Layout"
    ],
    "challenge": "Élan Noir needed a sophisticated marketing asset that immediately conveyed elite luxury and distinguished their launch from ordinary party promotions.",
    "solution": "Engineered a minimalist dark-mode poster layout utilizing refined sans-serif pairing, subtle geometric grid accents, and high-converting visual hierarchy.",
    "extraImages": []
  },
  {
    "id": "gourmet-food-flyer",
    "title": "Savory Delights Gourmet Restaurant Promotion",
    "category": "Flyer Design",
    "image": "/portfolio-assets/food-flyer-design.jpg",
    "description": "Mouth-watering, dynamic culinary flyer layout designed to drive takeout and dine-in orders across Accra.",
    "client": "Savory Bites Ghana",
    "duration": "3 Days",
    "scope": [
      "Culinary Flyer",
      "Food Photography Styling",
      "Social Media Ad",
      "Discount Promo Layout"
    ],
    "challenge": "The restaurant needed to boost weekend order volume and highlight specialty dishes with vibrant, appetizing visuals.",
    "solution": "Formulated a warm, rich culinary layout with bold pricing badges, clear call-to-actions, and focal food imagery that spiked engagement.",
    "extraImages": []
  },
  {
    "id": "ttu-wocom-janice-campaign",
    "title": "TTU Women's Commissioner 2026 Leadership Campaign | Janice",
    "category": "Campaign Design",
    "image": "/portfolio-assets/ttu-wocom-26-main.jpg",
    "description": "Comprehensive campus election brand identity and multi-stage campaign rollout formulated for TTU WOCOM 2026.",
    "client": "Janice for TTU WOCOM",
    "duration": "3 Weeks",
    "scope": [
      "Campaign Identity",
      "Official Portraits",
      "Policy Manifestos",
      "Countdown Posters",
      "Social Media Rollout"
    ],
    "challenge": "Janice required a strong, authentic visual identity that resonated across diverse student faculties and established leadership credibility.",
    "solution": "Designed a vibrant purple-and-gold visual system featuring polished portraiture, empowering policy typography, and consistent multi-format campaign banners.",
    "extraImages": [
      "/portfolio-assets/ttu-wocom-26-janice-official.jpg",
      "/portfolio-assets/ttu-wocom-26-janice-1.jpg",
      "/portfolio-assets/ttu-wocom-26-janice-2.jpg"
    ]
  },
  {
    "id": "jessica-leadership-campaign",
    "title": "Jessica Student Leadership & Vetting Day Campaign",
    "category": "Campaign Design",
    "image": "/portfolio-assets/jessica-leadership-main.jpg",
    "description": "Complete election visual campaign suite spanning official candidacy announcement, vetting countdowns, and policy vision.",
    "client": "Jessica Leadership Team",
    "duration": "2 Weeks",
    "scope": [
      "Election Branding",
      "Vetting Announcement",
      "Policy Posters",
      "Digital Campaign Assets"
    ],
    "challenge": "Stand out in a competitive student union race with distinctive, memorable visual assets that inspire student voter turnout.",
    "solution": "Crafted a multi-part visual narrative with high-contrast portrait retouching, crisp campaign sloganeering, and energetic layout architecture.",
    "extraImages": [
      "/portfolio-assets/jessica-vetting-day.jpg",
      "/portfolio-assets/jessica-vetting-series-1.jpg",
      "/portfolio-assets/jessica-campaign-portrait.jpg",
      "/portfolio-assets/jessica-campaign-policy.jpg"
    ]
  },
  {
    "id": "royal-rangers-camp",
    "title": "Royal Rangers National Youth Camp Experience",
    "category": "Event Design",
    "image": "/portfolio-assets/royal-rangers-camp.jpg",
    "description": "Dynamic, adventure-themed national camp promotional flyer engineering youth participation across regions.",
    "client": "Royal Rangers Ghana",
    "duration": "1 Week",
    "scope": [
      "Event Poster",
      "Registration Campaign",
      "Print Banners",
      "Social Media Teasers"
    ],
    "challenge": "Inspire young leaders and parents with an adventurous, structured, and trustworthy camp branding concept.",
    "solution": "Integrated bold wilderness and camp motifs with professional typography, clear registration details, and national flag accents.",
    "extraImages": []
  },
  {
    "id": "mufti-homecoming-campaign",
    "title": "Mufti Homecoming & Academic Milestone Celebration",
    "category": "Event Design",
    "image": "/portfolio-assets/mufti-homecoming.jpg",
    "description": "Vibrant celebratory event flyer celebrating student community achievements and homecoming festivities.",
    "client": "Mufti Association",
    "duration": "5 Days",
    "scope": [
      "Homecoming Banner",
      "Exams Finale Flyer",
      "Commemorative Posters",
      "Instagram Stories"
    ],
    "challenge": "Unify student energy around end-of-semester celebration and homecoming networking events.",
    "solution": "Blended dynamic stage lighting gradients with bold 3D typography and structured event timelines.",
    "extraImages": [
      "/portfolio-assets/mufti-exams-finale.jpg"
    ]
  },
  {
    "id": "immanuel-leadership-campaign",
    "title": "Immanuel Student Governance & Vision Campaign",
    "category": "Campaign Design",
    "image": "/portfolio-assets/immanuel-leadership-main.jpg",
    "description": "Professional political campaign design series reinforcing student governance, integrity, and proactive leadership.",
    "client": "Immanuel Campaign Secretariat",
    "duration": "2 Weeks",
    "scope": [
      "Campaign Identity",
      "Manifesto Series",
      "Social Media Graphics",
      "Print Posters"
    ],
    "challenge": "Communicate serious governance principles in an approachable, engaging, and authoritative visual design.",
    "solution": "Designed high-contrast portrait layouts framed with strategic blue and gold accents and concise manifesto talking points.",
    "extraImages": [
      "/portfolio-assets/immanuel-numbered-1.jpg",
      "/portfolio-assets/immanuel-numbered-2.jpg"
    ]
  },
  {
    "id": "fo-intent-declaration",
    "title": "F.O Official Declaration of Intent Campaign",
    "category": "Political Design",
    "image": "/portfolio-assets/fo-intent-declaration.jpg",
    "description": "High-authority political intent declaration flyer establishing candidacy and leadership credentials.",
    "client": "F.O Campaign Organization",
    "duration": "4 Days",
    "scope": [
      "Intent Declaration",
      "Campaign Slogan Layout",
      "Social Media Graphics",
      "PR Flyers"
    ],
    "challenge": "Launch a high-impact political candidacy announcement with immediate stature and gravitas.",
    "solution": "Framed official portraiture with dignified national color accents, commanding typography, and sharp manifesto slogans.",
    "extraImages": []
  },
  {
    "id": "babana-incoming-event",
    "title": "Babana Live Music & Concert Experience",
    "category": "Event Design",
    "image": "/portfolio-assets/babana-incoming.jpg",
    "description": "Electrifying concert and nightlife promotional flyer with neon lighting and immersive festival energy.",
    "client": "Babana Entertainment",
    "duration": "3 Days",
    "scope": [
      "Concert Flyer",
      "Artist Feature Posters",
      "Ticketing Graphics",
      "Motion Teasers"
    ],
    "challenge": "Build viral social buzz for a major live performance and concert night in Accra.",
    "solution": "Used neon cyan and magenta glow effects, dynamic depth of field, and bold artist branding that captured social feeds.",
    "extraImages": []
  },
  {
    "id": "aggrey-august-announcement",
    "title": "Aggrey Memorial Monthly Milestone Announcement",
    "category": "Graphic Design",
    "image": "/portfolio-assets/aggrey-august-flyer.jpg",
    "description": "Polished academic and institutional announcement flyer designed for campus communications.",
    "client": "Aggrey Memorial Hall",
    "duration": "2 Days",
    "scope": [
      "Notice Design",
      "Campus Poster",
      "Social Communication"
    ],
    "challenge": "Communicate official hall milestones clearly while keeping student engagement high.",
    "solution": "Clean typographic hierarchy, official crest integration, and balanced white space for readability.",
    "extraImages": []
  },
  {
    "id": "naspa-regional-celebration",
    "title": "NASPA Greater Accra Leadership Recognition Flyer",
    "category": "Graphic Design",
    "image": "/portfolio-assets/naspa-regional-bday.jpg",
    "description": "Executive-level birthday and institutional leadership commemorative design for National Service personnel.",
    "client": "NASPA Greater Accra",
    "duration": "2 Days",
    "scope": [
      "Executive Flyer",
      "Social Media Recognition",
      "Corporate Milestone"
    ],
    "challenge": "Honor association leadership with executive refinement and professional association branding.",
    "solution": "Curated elegant gold-foil textures, balanced corporate colors, and crisp typographic tributes.",
    "extraImages": []
  },
  {
    "id": "bruce-leadership-flyer",
    "title": "Bruce Student Representative Council Campaign",
    "category": "Campaign Design",
    "image": "/portfolio-assets/bruce-leadership.jpg",
    "description": "Energetic, modern student leadership flyer designed to rally youthful grassroots momentum.",
    "client": "Bruce for SRC",
    "duration": "3 Days",
    "scope": [
      "SRC Poster",
      "Candidacy Announcement",
      "Social Media Distribution"
    ],
    "challenge": "Connect with everyday campus students through an accessible yet highly competent design.",
    "solution": "High-energy color framing, relatable portraiture, and bold tagline emphasizing student empowerment.",
    "extraImages": []
  },
  {
    "id": "ekua-special-celebration",
    "title": "Ekua Special Luxury Celebration & Birthday Flyer",
    "category": "Graphic Design",
    "image": "/portfolio-assets/ekua-special-celebration.jpg",
    "description": "Chic, highly aesthetic personal branding and birthday celebratory flyer with couture elegance.",
    "client": "Ekua Celebrations",
    "duration": "2 Days",
    "scope": [
      "Celebration Flyer",
      "Portrait Enhancement",
      "VIP Invitation Layout"
    ],
    "challenge": "Create a lavish, VIP aesthetic reflecting personal style, glamor, and celebratory joy.",
    "solution": "Soft golden glows, delicate serifs, and high-fashion photographic balance.",
    "extraImages": []
  },
  {
    "id": "night-of-worship-gospel",
    "title": "Night of Worship & Divine Praise Gospel Concert",
    "category": "Event Design",
    "image": "/portfolio-assets/night-of-worship-gospel.jpg",
    "description": "Atmospheric, reverent gospel worship event flyer engineered for massive community turnout.",
    "client": "Grace Worship Ministry",
    "duration": "4 Days",
    "scope": [
      "Gospel Concert Flyer",
      "Church Banner",
      "Minister Profiles",
      "Social Ads"
    ],
    "challenge": "Capture the sacred and spiritual atmosphere of an upcoming all-night praise concert.",
    "solution": "Deep celestial blues, golden rays, and clean schedule formatting highlighting ministers and worship leaders.",
    "extraImages": []
  },
  {
    "id": "registration-launch-flyer",
    "title": "Annual Summit & Registration Portal Official Announcement",
    "category": "Flyer Design",
    "image": "/portfolio-assets/registration-portal-flyer.jpg",
    "description": "Clear, conversion-focused registration launch flyer facilitating rapid digital signups.",
    "client": "Apex Initiative",
    "duration": "2 Days",
    "scope": [
      "Registration Notice",
      "QR Code / Portal Callout",
      "Digital Flyer"
    ],
    "challenge": "Prompt immediate audience action to register before capacity thresholds are reached.",
    "solution": "Prominent CTA buttons, structured date/venue grid, and mobile-optimized layouts.",
    "extraImages": []
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
