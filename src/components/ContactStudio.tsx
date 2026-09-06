import { Mail, MapPin, Phone, Clock, Coffee, Heart, Sparkles, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';

export default function ContactStudio() {
  const { settings } = useApp();

  // Fallbacks for pristine safety during synchronization
  const email = settings?.email || 'hello@techloom.tech';
  const phone = settings?.phone || '+233 256 259 336';
  const location = settings?.location || 'TechLoom Studio, 3rd Floor, Airport Gate Towers, Airport Residential Area, Accra, Ghana';
  const openingHours = settings?.openingHours || 'Monday – Saturday (08:30 – 19:00 GHS)';
  const avgResponseTime = settings?.avgResponseTime || 'Average response: under 12 hours for new submissions.';
  const socialImpactText = settings?.socialImpactText || "Every project finances the Joe Vardy Al-Hikmah Foundation, educating Accra's underserved youth in modern tech skills.";
  const hqTitle = settings?.hqTitle || "Accra Studio";
  const hqSubtitle = settings?.hqSubtitle || "& Community Hub";
  const socialImpactTitle = settings?.socialImpactTitle || "10% Social Impact Investment";
  const socialImpactCardTitle = settings?.socialImpactCardTitle || "Financing The Future Of Accra";

  // Format clean whatsapp link out
  const queryText = encodeURIComponent('Hi TechLoom, I would like to consult regarding a design, branding or high-speed platform project.');
  const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${queryText}`;

  return (
    <section id="contact-studio" className="py-24 bg-white relative overflow-hidden border-t border-slate-100">
      {/* Decorative gradient glowing orb */}
      <div className="absolute top-[30%] right-[-100px] w-96 h-96 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-[-100px] w-80 h-80 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold tracking-widest text-brand-blue uppercase px-4 py-1.5 bg-brand-blue/5 rounded-full inline-block">
            Our Headquarters & Impact
          </span>
          <h2 className="font-display font-[900] text-3xl sm:text-5xl text-slate-900 tracking-tight leading-tight">
            {hqTitle}{' '}
            <span className="blue-gradient-text font-black">{hqSubtitle}</span>
          </h2>
          <p className="text-slate-500 text-lg font-light leading-relaxed">
            Drop by for a tech strategy discussion or reach out online. We are committed to craft excellence in Accra and beyond.
          </p>
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Block: Studio Information Cards (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6 justify-between">
            
            {/* Studio Physical Location */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-slate-50/60 rounded-3xl border border-slate-100 p-6 sm:p-8 flex items-start gap-5 hover:border-brand-blue/15 hover:shadow-xl hover:shadow-slate-100/35 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-brand-cyan/5 border border-brand-cyan/10 flex items-center justify-center text-brand-cyan shrink-0">
                <MapPin className="w-6 h-6 stroke-[1.8]" />
              </div>
              <div className="space-y-3 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-extrabold text-xl text-slate-900">
                    Studio Location
                  </h3>
                  <span className="text-[9px] font-mono uppercase tracking-wider bg-slate-200/50 text-slate-600 px-2.5 py-1 rounded-full font-bold">
                    HQ Ghana
                  </span>
                </div>
                <div className="text-slate-700 text-sm leading-relaxed font-bold break-words">
                  {location}
                </div>
              </div>
            </motion.div>

            {/* Response Standard & Hours */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="bg-slate-50/60 rounded-3xl border border-slate-100 p-6 sm:p-8 flex items-start gap-5 hover:border-brand-blue/15 hover:shadow-xl hover:shadow-slate-100/35 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                <Clock className="w-6 h-6 stroke-[1.8]" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display font-extrabold text-xl text-slate-900">
                  Response Standard
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed font-semibold text-slate-850">
                  {openingHours}
                </p>
                <div className="inline-flex items-center gap-1.5 text-xs text-brand-blue bg-brand-blue/5 border border-brand-blue/10 px-3 py-1 rounded-lg font-semibold">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue"></span>
                  </span>
                  <span>{avgResponseTime}</span>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Block: Communication Pillars & Foundation (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            
            {/* Quick Contacts Block */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl border border-slate-800">
              <div className="space-y-1">
                <span className="block text-[10px] font-mono uppercase tracking-widest text-brand-cyan hover:text-white transition-colors">
                  Contact Coordinates
                </span>
                <h3 className="font-display font-[800] text-xl text-white">
                  Direct Line & Online Hub
                </h3>
              </div>

              <div className="space-y-4">
                
                {/* Official Email */}
                <a
                  href={`mailto:${email}`}
                  className="group flex items-center gap-4 p-3.5 bg-slate-950/40 rounded-2xl border border-white/5 hover:border-brand-blue/40 transition-all cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5 stroke-[1.8]" />
                  </div>
                  <div className="flex-1 leading-snug truncate">
                    <span className="block text-[9px] font-mono uppercase tracking-wider text-slate-400">Official Email</span>
                    <span className="text-sm font-semibold text-white group-hover:text-brand-cyan transition-colors truncate block">{email}</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                </a>

                {/* WhatsApp & Line */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-3.5 bg-slate-950/40 rounded-2xl border border-white/5 hover:border-emerald-500/40 transition-all cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <Phone className="w-5 h-5 stroke-[1.8]" />
                  </div>
                  <div className="flex-1 leading-snug truncate font-bold">
                    <span className="block text-[9px] font-mono uppercase tracking-wider text-slate-400 font-bold">WhatsApp / Line Contact</span>
                    <span className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors block truncate">{phone}</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                </a>

              </div>
            </div>

            {/* High Impact Foundation Banner (10% ROI) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden bg-gradient-to-br from-[#0A84FF] to-[#00C2FF] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl gap-6 group border border-brand-blue/20"
            >
              {/* Abs mesh patterns overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-40" />
              
              <div className="space-y-4 relative z-10 animate-fadeIn">
                <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 w-max px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase">
                  <Heart className="w-3.5 h-3.5 fill-red-400 text-red-400 animate-pulse shrink-0" />
                  <span>{socialImpactTitle}</span>
                </div>
                
                <h4 className="font-display font-[900] text-2xl sm:text-3.5xl text-white tracking-tight leading-none leading-tight">
                  {socialImpactCardTitle}
                </h4>
                
                <p className="text-white/90 text-sm leading-relaxed font-light">
                  {socialImpactText}
                </p>
              </div>

              <div className="flex items-center gap-2.5 text-xs font-bold text-white relative z-10">
                <Sparkles className="w-4 h-4 text-white shrink-0 animate-pulse" />
                <span>Weaving creative excellence & social capital.</span>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
