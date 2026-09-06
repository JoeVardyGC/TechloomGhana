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
    id: 'apex-branding',
    title: 'Apex Fintech Identity Rebranding',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    description: 'A premium visual system designed to transform a legacy financial institution into a modern Web3 powerhouse.',
    client: 'Apex Global Assets',
    duration: '4 Weeks',
    scope: ['Brand Strategy', 'Logo Blueprinting', 'Identity Manual', 'Physical Mockups'],
    challenge: 'Apex Global wanted to transition from classic asset management to advanced digital asset custody. Their legacy design was rigid, outdated, and struggled to build confidence among millennial tech founders.',
    solution: 'We engineered a sleek geometric monogram using overlapping cobalt-blue lines paired with sharp electric-cyan details. The visual assets were unified under a premium styling manual that reflects extreme speed, security, and digital-first innovation.',
    extraImages: [
      'https://images.unsplash.com/photo-1634973357973-f2ed255753e1?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80'
    ],
    projectLink: 'https://behance.net'
  },
  {
    id: 'zenith-flyer',
    title: 'Zenith Tech Annual Summit Design',
    category: 'Flyer Design',
    image: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=1200&q=80',
    description: 'High-impact digital and physical marketing flyers that boosted attendance by 45% compared to prior events.',
    client: 'Zenith Tech Group',
    duration: '2 Weeks',
    scope: ['Creative Flyer Layout', 'Custom Typography Design', 'Social Media Flyers', 'Interactive Tickets'],
    challenge: 'Prior summits had very dull, typical corporate banners that failed to motivate early-stage entrepreneurs. They needed modern, collectible style print and digital media that positioned the summit as a premium, must-attend ecosystem.',
    solution: 'We designed posters with dynamic typography layouts, layered frosted glass effects, and vibrant cyan gradients. The designs merged physical poster aesthetics with top-tier neon SaaS elements, capturing attention across local tech hubs.',
    extraImages: [
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80'
    ],
    projectLink: 'https://behance.net'
  },
  {
    id: 'pulse-social',
    title: 'Pulse Wear Social Media Campaign',
    category: 'Social Media Design',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    description: 'A beautiful, high-converting social media visual kit that turned Instagram and LinkedIn into actual sales machines.',
    client: 'Pulse Wearables',
    duration: '3 Weeks',
    scope: ['Instagram Grid Blueprinting', 'Story Templates', 'Interactive Ad Layouts', 'Reels Styling Pack'],
    challenge: 'Pulse Wearables had high-end smartwatches but struggled with flat product photos and standard ad frames. Their socials looked sporadic, lacking an elite brand presence.',
    solution: 'We formulated a dark-mode content system using premium blue border layouts, customized feature typography badges, and detailed tech spec lists. This established a unified feed concept that looks ultra-luxurious.',
    extraImages: [
      'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-161890798517-01764b3efb34?auto=format&fit=crop&w=600&q=80'
    ],
    projectLink: 'https://behance.net'
  },
  {
    id: 'novatech-web',
    title: 'Novatech AI Platform Enterprise Hub',
    category: 'Website Design',
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1200&q=80',
    description: 'An immersive digital interface for enterprise lead generation, bringing high-end visual flow and interactive previews.',
    client: 'Novatech AI inc.',
    duration: '6 Weeks',
    scope: ['UI/UX Responsive Layout', 'Interactive Demos', 'Custom 3D-like Asset Packs', 'Vite/Tailwind Frontend'],
    challenge: 'The client had a brilliant AI technology, but their existing landing page was dense with text and suffered from high bounce rates. They struggled to convert casual corporate explorers into actual enterprise leads.',
    solution: 'We built a sleek, ultra-minimalist landing experience. Utilized wide margins, deep blue accents, and highly visual diagram blocks. By embedding interactive workflow previews, we boosted core CTA interactions by 60%.',
    extraImages: [
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1541462608141-ad4979e408c9?auto=format&fit=crop&w=600&q=80'
    ],
    projectLink: 'https://techloom.tech'
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
