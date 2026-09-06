export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  details: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  client: string;
  duration: string;
  scope: string[];
  challenge: string;
  solution: string;
  extraImages?: string[];
  projectLink?: string;
  githubLink?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  avatar: string;
  createdAt?: string;
}

export interface ContactSettings {
  email: string;
  phone: string;
  secondaryPhone?: string;
  location: string;
  openingHours: string;
  avgResponseTime: string;
  socialImpactText: string;
  agencySlogan: string;
  heroBgImage?: string;
  facebookLink?: string;
  twitterLink?: string;
  instagramLink?: string;
  youtubeLink?: string;
  linkedinLink?: string;
  githubLink?: string;
  metricNumber?: string;
  metricSubtitle?: string;
  metricDescription?: string;
  hqTitle?: string;
  hqSubtitle?: string;
  socialImpactTitle?: string;
  socialImpactCardTitle?: string;
  heroTitleLine1?: string;
  heroTitleLine2?: string;
  heroDescription?: string;
  heroBadgeText?: string;
  heroCardImage?: string;
  heroCardText?: string;
  heroCardImage1?: string;
  heroCardText1?: string;
  heroCardImage2?: string;
  heroCardText2?: string;
  heroCardImage3?: string;
  heroCardText3?: string;
  heroCardImage4?: string;
  heroCardText4?: string;
  selectedHomepagePortfolios?: string[];
}

export interface WhyChooseItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  percentage?: number; // Optional percentage for backward compatibility
}

export interface SkillItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  percentage: number;
}

export interface ProcessStep {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  details: string[];
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

export type AppView = 'home' | 'portfolio' | 'admin';

