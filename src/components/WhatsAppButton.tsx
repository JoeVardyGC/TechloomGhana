import { useState, useEffect } from 'react';
import { X, ArrowUpRight } from 'lucide-react';
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
        className="pointer-events-auto w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] hover:scale-105 active:scale-95 text-white rounded-full flex items-center justify-center shadow-lg transition-all cursor-pointer relative"
        aria-label="Chat on WhatsApp"
        animate={{
          boxShadow: [
            '0 4px 14px 0 rgba(37, 211, 102, 0.35)',
            '0 4px 24px 8px rgba(37, 211, 102, 0.45)',
            '0 4px 14px 0 rgba(37, 211, 102, 0.35)'
          ]
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: 'easeInOut'
        }}
      >
        {/* Authentic White WhatsApp Vector Icon */}
        <svg 
          viewBox="0 0 24 24" 
          className="w-7 h-7 fill-white drop-shadow-xs" 
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </motion.a>

    </div>
  );
}
