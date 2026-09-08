import React from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  GraduationCap, 
  Film, 
  Palmtree, 
  Sparkles, 
  ShoppingBag, 
  Briefcase, 
  Users, 
  ShieldCheck,
  Landmark
} from 'lucide-react';

interface ClientLogoItem {
  id: string;
  name: string;
  shortName: string;
  category: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}

const CLIENT_PARTNERS: ClientLogoItem[] = [
  {
    id: 'gnuts',
    name: 'Ghana National Union of Technical Students',
    shortName: 'GNUTS NATIONAL',
    category: 'Apex Tertiary Union',
    badge: 'Republic of Ghana',
    icon: GraduationCap,
    accentColor: 'text-emerald-500'
  },
  {
    id: 'drc',
    name: 'Deon Recreational Centre Sakumono',
    shortName: 'DRC SAKUMONO',
    category: 'Hospitality & Leisure',
    badge: 'Premier Venue',
    icon: Palmtree,
    accentColor: 'text-cyan-500'
  },
  {
    id: 'aff',
    name: 'African Film Festival',
    shortName: 'AFRICAN FILM FEST',
    category: 'Pan-African Cinema',
    badge: 'Cultural Arts',
    icon: Film,
    accentColor: 'text-amber-500'
  },
  {
    id: 'sltf',
    name: 'Students Loan Trust Fund',
    shortName: 'SLTF GHANA',
    category: 'Tertiary Education Fund',
    badge: 'Govt Agency',
    icon: Landmark,
    accentColor: 'text-blue-500'
  },
  {
    id: 'kma',
    name: 'Kumasi Metropolitan Assembly',
    shortName: 'KMA GHANA',
    category: 'Civic & Municipal',
    badge: 'Public Sector',
    icon: Building2,
    accentColor: 'text-indigo-500'
  },
  {
    id: 'elan-noir',
    name: 'Élan Noir Studio',
    shortName: 'ÉLAN NOIR',
    category: 'High-Fashion & Studio',
    badge: 'Luxury Brand',
    icon: Sparkles,
    accentColor: 'text-rose-500'
  },
  {
    id: 'bliss-elle',
    name: 'Bliss Elle Ghana',
    shortName: 'BLISS ELLE',
    category: 'E-Commerce & Retail',
    badge: 'Accra • Kumasi',
    icon: ShoppingBag,
    accentColor: 'text-pink-500'
  },
  {
    id: 'naspa',
    name: 'National Service Personnel Association',
    shortName: 'NASPA GHANA',
    category: 'National Secretariat',
    badge: 'Public Service',
    icon: Users,
    accentColor: 'text-teal-500'
  },
  {
    id: 'barima',
    name: 'Barima Leadership Consultancy',
    shortName: 'BARIMA CONSULT',
    category: 'Executive Advisory',
    badge: 'Corporate Strategy',
    icon: Briefcase,
    accentColor: 'text-orange-500'
  },
  {
    id: 'ype',
    name: 'Young Patriotic Elites',
    shortName: 'YPE GHANA',
    category: 'Civic Advocacy',
    badge: 'Youth Leadership',
    icon: ShieldCheck,
    accentColor: 'text-violet-500'
  }
];

export default function ClientLogosMarquee() {
  // Duplicate array 3 times for completely seamless continuous looping
  const loopedPartners = [...CLIENT_PARTNERS, ...CLIENT_PARTNERS, ...CLIENT_PARTNERS];

  return (
    <section 
      aria-label="Trusted Clients and Institutional Partners"
      className="relative w-full py-8 sm:py-10 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xs border-y border-slate-200/80 dark:border-slate-800/80 overflow-hidden transition-colors duration-300"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/[0.02] via-transparent to-brand-cyan/[0.02] pointer-events-none" />

      {/* Header Label */}
      <div className="max-w-7xl mx-auto px-6 mb-6 sm:mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
          <p className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em]">
            Trusted By Leading Institutions, Enterprises &amp; Brands
          </p>
        </div>
      </div>

      {/* Edge Gradient Masks for Smooth Dissolve */}
      <div className="absolute left-0 inset-y-0 w-16 sm:w-32 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-16 sm:w-32 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-20 pointer-events-none" />

      {/* Infinite Scrolling Track */}
      <div className="flex overflow-hidden select-none group">
        <motion.div
          animate={{ x: ['0%', '-33.33%'] }}
          transition={{
            duration: 38,
            ease: 'linear',
            repeat: Infinity
          }}
          className="flex gap-4 sm:gap-6 items-center shrink-0 pr-4 sm:pr-6 group-hover:[animation-play-state:paused]"
        >
          {loopedPartners.map((client, idx) => {
            const IconComponent = client.icon;
            return (
              <div
                key={`${client.id}-${idx}`}
                className="group/card flex items-center gap-3.5 px-5 py-3 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 shadow-2xs hover:shadow-md transition-all duration-300 hover:border-brand-blue/30 shrink-0 cursor-default"
              >
                {/* Emblem Icon Container */}
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center shrink-0 text-slate-500 dark:text-slate-400 group-hover/card:text-brand-blue group-hover/card:scale-110 transition-all duration-300">
                  <IconComponent className="w-5 h-5" />
                </div>

                {/* Typography Stack */}
                <div className="space-y-0.5 text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-black text-xs sm:text-sm tracking-tight text-slate-800 dark:text-slate-200 group-hover/card:text-slate-950 dark:group-hover/card:white transition-colors">
                      {client.shortName}
                    </span>
                    <span className="text-[9px] font-mono uppercase tracking-wider font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-sm">
                      {client.badge}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-600 dark:text-slate-400 font-medium truncate max-w-[190px]">
                    {client.name}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
