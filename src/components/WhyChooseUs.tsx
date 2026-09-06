import { ComponentType } from 'react';
import { 
  Sparkles, 
  UserCheck, 
  Zap, 
  DollarSign,
  Code, 
  Layers, 
  Cpu, 
  Settings, 
  Activity, 
  Award, 
  PenTool, 
  Database, 
  Smartphone, 
  Laptop, 
  Globe,
  TrendingUp,
  LineChart,
  Megaphone,
  Palette
} from 'lucide-react';
import { motion } from 'motion/react';
import { useApp, getTechLogoUrl } from '../context/AppContext';

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Sparkles,
  UserCheck,
  Zap,
  DollarSign,
  Code,
  Layers,
  Cpu,
  Settings,
  Activity,
  Award,
  PenTool,
  Database,
  Smartphone,
  Laptop,
  Globe,
  TrendingUp,
  LineChart,
  Megaphone,
  Palette
};

export default function WhyChooseUs() {
  const { skills } = useApp();

  // Standard offline fallback matching default brand characteristics
  const displaySkills = skills && skills.length > 0 ? skills : [
    {
      id: 'wc1',
      title: 'Creative Excellence',
      description: 'We combine pristine artistic creativity with deliberate business strategy to deliver designs that convert.',
      iconName: 'Sparkles',
      percentage: 98
    },
    {
      id: 'wc2',
      title: 'Client-Focused Approach',
      description: 'We do not deal in generic ideas. Every line, gradient, and word is tailored specifically to your exact company goals.',
      iconName: 'UserCheck',
      percentage: 95
    },
    {
      id: 'wc3',
      title: 'Fast Turnaround',
      description: 'We respect your speed demands. High-quality production-ready assets are delivered precisely on schedule.',
      iconName: 'Zap',
      percentage: 92
    },
    {
      id: 'wc4',
      title: 'Affordable Solutions',
      description: 'Access elite agency-level quality and senior design talent without paying millions in inflated corporate agency fees.',
      iconName: 'DollarSign',
      percentage: 88
    }
  ];

  return (
    <section id="why-us" className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
      {/* Visual background grid accent */}
      <div className="absolute top-[20%] right-[-100px] w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold tracking-widest text-brand-blue uppercase px-3 py-1 bg-brand-blue/5 dark:bg-brand-blue/10 rounded-full inline-block">
            Our Stack & Expertise
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 dark:text-white tracking-tight leading-tight">
            Skills Built For{' '}
            <span className="blue-gradient-text font-black">Performance</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg font-light leading-relaxed">
            We don't settle for basic knowledge. Every technology in our stack is honed for efficiency, precision, and high-performance execution.
          </p>
        </div>

        {/* Modern Round Dial Skills Grid Card Structure */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displaySkills.map((item, index) => {
            const IconComponent = iconMap[item.iconName] || Sparkles;
            const logoUrl = getTechLogoUrl(item.iconName, item.title);
            const percentageValue = item.percentage ?? 85;
            
            // Circular Progress Geometry Calculations
            const radius = 32;
            const circumference = 2 * Math.PI * radius;
            const strokeDashoffset = circumference - (percentageValue / 100) * circumference;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.94, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
                className="relative overflow-hidden bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 flex flex-col items-center text-center group hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:border-brand-blue/30 dark:hover:border-brand-blue/30 hover:shadow-2xl hover:shadow-slate-200/40 dark:hover:shadow-black/40 transition-all duration-300 transform hover:-translate-y-2"
                id={`skill-card-${item.id}`}
              >

                {/* Circular Radial Gauge */}
                <div className="relative w-28 h-28 flex items-center justify-center mb-6 shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
                    <defs>
                      <linearGradient id={`grad-${item.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0A84FF" />
                        <stop offset="100%" stopColor="#00C2FF" />
                      </linearGradient>
                    </defs>
                    {/* Background circle track */}
                    <circle
                      className="text-slate-100 dark:text-slate-800"
                      strokeWidth="4"
                      stroke="currentColor"
                      fill="transparent"
                      r={radius}
                      cx="40"
                      cy="40"
                    />
                    {/* Dynamic animated progress circle */}
                    <motion.circle
                      stroke={`url(#grad-${item.id})`}
                      strokeWidth="4"
                      strokeLinecap="round"
                      fill="transparent"
                      r={radius}
                      cx="40"
                      cy="40"
                      initial={{ strokeDashoffset: circumference }}
                      whileInView={{ strokeDashoffset }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: 'easeOut', delay: index * 0.1 }}
                      style={{
                        strokeDasharray: circumference,
                      }}
                    />
                  </svg>

                  {/* Icon centered perfectly inside the circle */}
                  <div className="absolute flex flex-col items-center justify-center">
                    {logoUrl ? (
                      <div className="relative">
                        <img
                          src={logoUrl}
                          alt={item.title}
                          className="w-7 h-7 object-contain group-hover:scale-110 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ) : (
                      <IconComponent className="w-6 h-6 text-brand-blue group-hover:scale-110 transition-all duration-300" />
                    )}
                  </div>
                </div>

                {/* Percentage Status Pill Badge */}
                <div className="mb-4">
                  <span className="text-xs font-mono font-bold text-brand-blue bg-brand-blue/5 dark:bg-brand-blue/10 px-3 py-1 rounded-full">
                    {percentageValue}% Mastery
                  </span>
                </div>

                {/* Text Elements */}
                <div className="space-y-3">
                  <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white group-hover:text-brand-blue transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed font-light font-sans text-slate-500 dark:text-slate-400">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
