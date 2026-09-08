import { ArrowUp, Palette, Award, Layers, Sparkles, Mail, MapPin, Phone, PhoneCall, MessageSquare, Github, Twitter, Linkedin, Instagram, Facebook, Youtube } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const { settings, setCurrentView } = useApp();
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
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

  const navLinks = [
    { name: 'Services Index', id: 'services' },
    { name: 'Our Work & Portfolio', id: 'portfolio' },
    { name: 'Why Choose Us', id: 'why-us' },
    { name: 'Our Timeline', id: 'process' },
    { name: 'Customer Praise', id: 'testimonials' },
  ];

  const services = [
    'Graphic Design',
    'Branding & Logo Design',
    'Website Design',
    'Social Media Design',
    'Printing Solutions',
    'Digital Marketing'
  ];

  return (
    <footer id="footer" className="bg-[#0b0f19] text-[#e2e8f0] pt-14 pb-8 border-t border-slate-900 relative">
      
      {/* Decorative gradient glowing orb */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-slate-900">
        
        {/* Column 1: Techloom Bio Summary */}
        <div className="lg:col-span-4 space-y-4">
          {/* Logo block */}
          <div className="flex items-center gap-2">
            <div>
              <span className="font-display font-black text-lg tracking-tight text-white block">
                Tech<span className="text-brand-cyan">loom</span>
              </span>
              <span className="block text-[8px] font-mono tracking-widest text-[#00C2FF] uppercase font-bold leading-none mt-0.5">
                Ghana
              </span>
            </div>
          </div>

          <p className="text-slate-400 text-sm leading-relaxed font-light font-sans">
            {settings?.agencySlogan || "We design clean flyers, professional company branding, and fast websites that make Ghanaian businesses look trusted and win more customers."}
          </p>

          {/* Social Icons row */}
          <div className="flex items-center gap-3">
            {[
              { icon: Instagram, href: settings?.instagramLink || 'https://instagram.com/techloom.agency' },
              { icon: Linkedin, href: settings?.linkedinLink || 'https://linkedin.com/company/techloom' },
              { icon: Twitter, href: settings?.twitterLink || 'https://twitter.com/techloom' },
              { icon: Github, href: settings?.githubLink || 'https://github.com/techloom' },
              { icon: Facebook, href: settings?.facebookLink || '#' },
              { icon: Youtube, href: settings?.youtubeLink || '#' },
            ].filter(soc => soc.href && soc.href !== '#' && soc.href !== '').map((soc, i) => (
              <a
                key={i}
                href={soc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8.5 h-8.5 rounded-lg bg-slate-900 hover:bg-brand-blue/15 text-slate-400 hover:text-brand-cyan border border-slate-800 hover:border-brand-blue/20 flex items-center justify-center transition-all cursor-pointer"
              >
                <soc.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="lg:col-span-2.5 space-y-5">
          <span className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
            Quick Links
          </span>
          <div className="flex flex-col gap-2.5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-left text-slate-400 hover:text-white text-sm transition-colors cursor-pointer font-light hover:underline"
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>

        {/* Column 3: Services Index */}
        <div className="lg:col-span-2.5 space-y-5">
          <span className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
            Expertise Index
          </span>
          <div className="flex flex-col gap-2.5 text-sm text-slate-400 font-light">
            {services.map((srv, i) => (
              <span key={i} className="leading-snug">
                {srv}
              </span>
            ))}
          </div>
        </div>

        {/* Column 4: Contact Details */}
        <div className="lg:col-span-3 space-y-3.5">
          <span className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
            Communications Hub
          </span>
          <div className="space-y-2.5 text-sm font-light text-slate-400">
            <div className="flex items-start gap-2.5">
              <Mail className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
              <div>
                <span className="block text-[10px] font-mono uppercase text-slate-500 font-bold">Official Email</span>
                <a href={`mailto:${settings?.email || 'techloomgh@yahoo.com'}`} className="text-white hover:text-brand-cyan transition-colors text-xs">{settings?.email || 'techloomgh@yahoo.com'}</a>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <PhoneCall className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="block text-[10px] font-mono uppercase text-slate-500 font-bold">Direct Voice Calls</span>
                <a href={`tel:${(settings?.phone || '+233 256 259 336').replace(/[^0-9+]/g, '')}`} className="text-white hover:text-brand-cyan transition-colors text-xs block">{settings?.phone || '+233 256 259 336'}</a>
                <a href={`tel:${(settings?.secondaryPhone || '+233 504 041 694').replace(/[^0-9+]/g, '')}`} className="text-white hover:text-brand-cyan transition-colors text-xs block">{settings?.secondaryPhone || '+233 504 041 694'}</a>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="block text-[10px] font-mono uppercase text-slate-500 font-bold">Instant WhatsApp</span>
                <div className="flex items-center gap-2 text-xs">
                  <a href={`https://wa.me/${(settings?.phone || '+233 256 259 336').replace(/[^0-9]/g, '')}?text=Hello%20Techloom%20Ghana,%20I'd%20like%20to%20discuss%20a%20project`} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium">Line 1 &rarr;</a>
                  <span className="text-slate-600">•</span>
                  <a href={`https://wa.me/${(settings?.secondaryPhone || '+233 504 041 694').replace(/[^0-9]/g, '')}?text=Hello%20Techloom%20Ghana,%20I'd%20like%20to%20discuss%20a%20project`} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium">Line 2 &rarr;</a>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
              <div>
                <span className="block text-[10px] font-mono uppercase text-slate-500 font-bold">Studio Hub</span>
                <span className="text-white leading-relaxed text-xs break-words">
                  {settings?.location || 'TechLoom Studio, 3rd Floor, Airport Gate Towers, Airport Residential Area, Accra, Ghana'}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Footer Bottom Credentials and Scroll-To-Top button */}
      <div className="max-w-7xl mx-auto px-6 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-center sm:text-left">
          <p className="text-xs text-slate-500 font-light">
            &copy; {currentYear} Techloom Agency Inc. All rights reserved.
          </p>
          <button
            onClick={() => setCurrentView('admin')}
            className="text-[11px] font-mono text-slate-600 hover:text-brand-cyan transition-colors cursor-pointer"
          >
            Admin Portal
          </button>
        </div>

        {/* Back back up button */}
        <button
          onClick={handleScrollToTop}
          id="footer-scroll-top-btn"
          className="group flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 px-4 py-2.5 rounded-lg border border-slate-800 transition-colors cursor-pointer"
        >
          <span>Top of Canvas</span>
          <ArrowUp className="w-4.5 h-4.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

    </footer>
  );
}
