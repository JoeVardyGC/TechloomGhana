import { useState, ComponentType, MouseEvent } from 'react';
import { 
  Palette, Award, Layers, Instagram, Printer, TrendingUp, CheckCircle, ChevronUp, ChevronDown, 
  Sparkles, UserCheck, Zap, DollarSign, Compass, Target, PenTool, Mail, Briefcase, Phone, User, 
  ShieldCheck, Download, Loader2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Palette,
  Award,
  Layers,
  Instagram,
  Printer,
  TrendingUp,
  Sparkles,
  UserCheck,
  Zap,
  DollarSign,
  Compass,
  Target,
  PenTool,
  Mail,
  Briefcase,
  Phone,
  User,
  ShieldCheck,
  Download,
  Loader2
};

export default function Services() {
  const { services, loading } = useApp();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string, e: MouseEvent) => {
    e.preventDefault();
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-24 bg-white relative">
      {/* Background Ornaments */}
      <div className="absolute top-[30%] left-0 w-64 h-64 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[10%] right-0 w-80 h-80 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold tracking-widest text-brand-blue uppercase px-3 py-1 bg-brand-blue/5 rounded-full inline-block">
            What We Do
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight leading-tight">
            Complete Design & Website Solutions That{' '}
            <span className="blue-gradient-text">Grow Your Business</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-normal leading-relaxed">
            We create clean flyers, professional company branding, and fast websites that make your business look trusted and win more customers.
          </p>
        </div>

        {loading && services.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 space-y-2">
            <div className="w-6 h-6 border-2 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin" />
            <p className="text-xs text-slate-400 font-mono">Synchronizing Services...</p>
          </div>
        ) : (
          /* 6 Grid Service Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.iconName] || Palette;
              const isExpanded = expandedId === service.id;

              return (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className={`flex flex-col bg-slate-50 rounded-2xl border border-slate-100 p-6 sm:p-8 transition-all hover:border-brand-blue/20 hover:bg-white group cursor-pointer ${
                    isExpanded ? 'ring-2 ring-brand-blue/20 bg-white shadow-xl shadow-slate-100/30' : 'hover:shadow-lg'
                  }`}
                  onClick={(e) => toggleExpand(service.id, e)}
                >
                  {/* Header elements inside card */}
                  <div className="flex justify-between items-start mb-6">
                    {/* Icon styling with gradient accents */}
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border border-slate-100 group-hover:bg-brand-blue group-hover:text-white transition-all shadow-sm">
                      <IconComponent className="w-6 h-6 text-brand-blue group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-4xl font-display font-extrabold text-slate-200/50 group-hover:text-brand-blue/10 select-none">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-slate-900 mb-3 group-hover:text-brand-blue transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1 font-light">
                    {service.description}
                  </p>

                  {/* Expanded deliverables bullet list */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden mb-6"
                      >
                        <div className="pt-4 border-t border-slate-100 space-y-2.5">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-2 font-semibold">
                            What is Included:
                          </span>
                          {service.details.map((detail, idx) => (
                            <div key={idx} className="flex items-start gap-2.5 text-xs font-medium text-slate-600">
                              <CheckCircle className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                              <span>{detail}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Footer buttons row */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100/60">
                    <button
                      onClick={(e) => toggleExpand(service.id, e)}
                      id={`service-more-btn-${service.id}`}
                      className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-brand-blue transition-colors cursor-pointer"
                    >
                      <span>{isExpanded ? 'Hide Details' : 'Learn More'}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-brand-blue" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-brand-blue transition-colors" />
                      )}
                    </button>

                    {isExpanded && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          scrollToSection('audit');
                        }}
                        id={`service-consult-btn-${service.id}`}
                        className="text-xs font-bold text-brand-blue hover:text-slate-900 transition-colors bg-brand-blue/5 hover:bg-brand-blue/10 px-3 py-1.5 rounded-lg cursor-pointer"
                      >
                        Audit This Service
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
