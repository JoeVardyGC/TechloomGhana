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

        {/* Studio Strategic Capability Bento Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displaySkills.map((item, index) => {
            const IconComponent = iconMap[item.iconName] || Sparkles;
            const logoUrl = getTechLogoUrl(item.iconName, item.title);
            const percentageValue = item.percentage ?? 95;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col justify-between overflow-hidden bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200/90 dark:border-slate-800/80 p-6 sm:p-7 hover:border-brand-blue/40 dark:hover:border-brand-cyan/40 hover:shadow-xl hover:shadow-brand-blue/5 transition-all duration-300 transform hover:-translate-y-1"
                id={`skill-card-${item.id}`}
              >
                {/* Subtle top card ambient glow on hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-brand-cyan/10 via-brand-blue/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div>
                  {/* Top Bar: Icon + Metric Tag */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-center text-brand-blue dark:text-brand-cyan group-hover:scale-105 group-hover:border-brand-blue/30 transition-all duration-300 shrink-0">
                      {logoUrl ? (
                        <img
                          src={logoUrl}
                          alt={item.title}
                          className="w-6 h-6 object-contain"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <IconComponent className="w-5 h-5 text-brand-blue dark:text-brand-cyan" />
                      )}
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/50 text-[11px] font-mono font-semibold text-slate-700 dark:text-slate-300 tabular-nums">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {percentageValue}% Rigor
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900 dark:text-white tracking-tight mb-2.5 group-hover:text-brand-blue dark:group-hover:text-brand-cyan transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-sm font-normal text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Micro-Metric Craft Track */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/70 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 dark:text-slate-500">
                    <span>Performance Target</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300 tabular-nums">{percentageValue}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${percentageValue}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.1 + index * 0.1, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-brand-blue via-brand-cyan to-emerald-400 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
