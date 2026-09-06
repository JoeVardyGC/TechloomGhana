import { ArrowRight, MessageSquareCode, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';

export default function FinalCTA() {
  const { settings } = useApp();
  const phoneDigits = (settings?.phone || '+233256259336').replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${phoneDigits}?text=${encodeURIComponent("Hi TechLoom, I am interested in a creative branding consultation and design audit.")}`;

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
    <section id="final-cta" className="relative py-24 overflow-hidden">
      {/* Background Blue Gradient Accent Canvas (#0A84FF to #00C2FF) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A84FF] to-[#00C2FF]" />

      {/* Grid Pattern overlay for high-end SaaS feel */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)] pointer-events-none" />

      {/* Decorative Blur Circles */}
      <div className="absolute top-[-50px] left-[-50px] w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-50px] w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center space-y-8 text-white">
        
        {/* Sparkle badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg border border-white/20 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
        >
          <Sparkles className="w-3.5 h-3.5 text-white animate-spin-slow" />
          <span>Launch Your Venture</span>
        </motion.div>

        {/* Large Headline */}
        <h2 className="font-display font-[900] text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-none text-white max-w-4xl mx-auto">
          Ready To Elevate Your Brand?
        </h2>

        {/* Subheadline */}
        <p className="text-white/85 text-lg sm:text-xl font-light max-w-2xl mx-auto leading-relaxed">
          Let's create designs that help your business grow. We formulate stunning visual presence, ultra-fast websites, and highly robust marketing flyers.
        </p>

        {/* Dual CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-md mx-auto">
          <button
            onClick={() => scrollToSection('audit')}
            id="final-cta-quote-btn"
            className="w-full sm:w-auto group flex items-center justify-center gap-2 bg-white text-slate-900 hover:bg-slate-50 font-bold text-sm px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            <span>Get Quote</span>
            <ArrowRight className="w-4 h-4 text-slate-800 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="final-cta-whatsapp-link"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 border border-white/40 hover:border-white text-white font-bold text-sm px-8 py-4 rounded-xl transition-all cursor-pointer"
          >
            <MessageSquareCode className="w-4 h-4 text-white" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
}
