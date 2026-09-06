import { useState, useEffect } from 'react';
import { MessageSquare, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';

export default function WhatsAppButton() {
  const { settings } = useApp();
  const [showTooltip, setShowTooltip] = useState(false);

  const phoneDigits = (settings?.phone || '+233256259336').replace(/[^0-9]/g, '');
  const chatUrl = `https://wa.me/${phoneDigits}?text=${encodeURIComponent("Hi TechLoom, I'm exploring your services and wanted to get more information.")}`;
  const consultationUrl = `https://wa.me/${phoneDigits}?text=${encodeURIComponent("Hi TechLoom, I am interested in a creative branding consultation and design audit.")}`;

  useEffect(() => {
    // Show teaser tooltip automatically after 4 seconds to grab user attention
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
      
      {/* Dynamic Teaser Chat Dialogue Box */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="pointer-events-auto max-w-[240px] bg-white rounded-2xl p-4 shadow-xl border border-slate-100 flex flex-col gap-2 relative"
          >
            {/* Close visual tooltip button */}
            <button
              onClick={() => setShowTooltip(false)}
              id="whatsapp-tooltip-close"
              className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-650 rounded-full hover:bg-slate-50 cursor-pointer"
              aria-label="Close tooltip"
            >
              <X className="w-3 h-3" />
            </button>

            {/* Avatar Header */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-white z-10" />
                <div className="w-7 h-7 bg-white border-0 rounded-full flex items-center justify-center overflow-hidden">
                  <img
                    src="https://res.cloudinary.com/dokiklssy/image/upload/ar_1:1,c_crop,g_north_west,h_1827,w_1827,x_887,y_897/f_auto/q_auto/Techloom_logo_oafutl.png"
                    alt="Techloom Support Avatar"
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div className="leading-tight">
                <span className="block text-[10px] font-bold text-slate-900">Techloom Support</span>
                <span className="block text-[8px] font-mono font-medium text-emerald-500 uppercase tracking-wider">Online</span>
              </div>
            </div>

            {/* Main microcopy */}
            <p className="text-[11px] text-slate-500 leading-normal font-light">
              Hi there! Got design questions? Chat directly with our director now!
            </p>

            {/* Tiny link */}
            <a
              href={chatUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setShowTooltip(false)}
              className="text-[10px] font-bold text-brand-blue flex items-center gap-0.5 hover:underline"
            >
              <span>Start Chat Room</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.a
        href={consultationUrl}
        target="_blank"
        rel="noopener noreferrer"
        id="whatsapp-floating-action-btn"
        onMouseEnter={() => setShowTooltip(true)}
        className="pointer-events-auto w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-500 hover:scale-105 active:scale-95 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/25 transition-all cursor-pointer relative"
        aria-label="Chat on WhatsApp"
        animate={{
          boxShadow: [
            '0 4px 14px 0 rgba(16, 185, 129, 0.3)',
            '0 4px 24px 8px rgba(16, 185, 129, 0.4)',
            '0 4px 14px 0 rgba(16, 185, 129, 0.3)'
          ]
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: 'easeInOut'
        }}
      >
        <MessageSquare className="w-6 h-6 stroke-[2.2]" />
      </motion.a>

    </div>
  );
}
