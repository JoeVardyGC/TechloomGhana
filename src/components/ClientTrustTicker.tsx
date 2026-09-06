import { CheckCircle2, Award, Zap, Shield, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';

export default function ClientTrustTicker() {
  const { settings } = useApp();

  const metrics = [
    {
      label: settings?.metricSubtitle || "Delivered Projects",
      value: settings?.metricNumber || "50+",
      desc: "Brand systems, web apps & marketing graphics"
    },
    {
      label: "Client Rating",
      value: "4.98 / 5.0",
      desc: "Based on verified client reviews across Ghana & abroad"
    },
    {
      label: "Accra HQ Studio",
      value: "Airport Towers",
      desc: "3rd Floor, Airport Gate Towers, Airport Residential"
    },
    {
      label: "Fast Execution",
      value: "48h – 7 Days",
      desc: "Rapid delivery sprints without compromising quality"
    }
  ];

  const clientSectors = [
    'FinTech & Banking',
    'Fashion & Luxury Brands',
    'Corporate & Enterprise',
    'Healthcare & Education',
    'Media & Entertainment',
    'Real Estate & Hospitality'
  ];

  return (
    <section className="relative py-10 bg-slate-50/80 dark:bg-slate-900/60 border-y border-slate-200/60 dark:border-slate-800/80 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-8 border-b border-slate-200/50 dark:border-slate-800/60">
          {metrics.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="flex flex-col space-y-1 text-center sm:text-left"
            >
              <span className="font-mono font-black text-2xl sm:text-3xl text-slate-900 dark:text-white tabular-nums tracking-tight">
                {m.value}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">
                {m.label}
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-light leading-snug hidden sm:block">
                {m.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Continuous Marquee Ticker */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-mono font-medium text-slate-500 dark:text-slate-400">
          <span className="uppercase tracking-widest text-[10px] font-bold text-slate-400 dark:text-slate-500 mr-2 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-brand-blue" />
            Trusted Sectors:
          </span>
          {clientSectors.map((sector, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-750 text-slate-700 dark:text-slate-300 shadow-2xs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
              {sector}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
