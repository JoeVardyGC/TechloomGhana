import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ExternalLink, 
  X, 
  ChevronRight, 
  ChevronLeft,
  Share2,
  Check,
  Maximize2,
  MessageCircle,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ProjectDetailsPage() {
  const { selectedProject, setSelectedProject, currentView, setCurrentView, showToast } = useApp();
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [shareCopied, setShareCopied] = useState<boolean>(false);

  // Automatically scroll to the top of the details page on loading
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setActiveSlideIndex(0);
  }, [selectedProject]);

  // Support left/right arrow keys for lightbox navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'ArrowRight') {
        handleLightboxNext();
      } else if (e.key === 'ArrowLeft') {
        handleLightboxPrev();
      } else if (e.key === 'Escape') {
        setLightboxIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  if (!selectedProject) return null;

  const slideshowImages = [
    selectedProject.image,
    ...(selectedProject.extraImages || [])
  ].filter((img): img is string => typeof img === 'string' && img.trim().length > 0);

  const handleBack = () => {
    setSelectedProject(null);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleShare = () => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setShareCopied(true);
      showToast("Case study link copied to clipboard!", "success");
      setTimeout(() => setShareCopied(false), 2000);
    }).catch(() => {
      showToast("Failed to copy link.", "error");
    });
  };

  const handleLightboxNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === null || prev === slideshowImages.length - 1 ? 0 : prev + 1));
  };

  const handleLightboxPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === null || prev === 0 ? slideshowImages.length - 1 : prev - 1));
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Techloom, I saw your "${selectedProject.title}" design on your website and would like to commission a similar project for my brand.`
  );
  const whatsappUrl = `https://wa.me/233256259336?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-24 transition-colors duration-300 relative overflow-hidden">
      {/* Ambient background glow accents */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-brand-blue/5 via-indigo-500/2 to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-blue/3 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* TOP BAR: Navigation & Quick Actions */}
        <div className="mb-8 flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-5">
          <button
            onClick={handleBack}
            id="details-back-to-list-btn"
            className="group flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-brand-blue dark:hover:text-brand-blue transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to {currentView === 'portfolio' ? 'Full Archive' : 'Featured Work'}</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-800 text-xs font-bold transition shadow-2xs cursor-pointer"
            >
              {shareCopied ? (
                <Check className="w-4 h-4 text-emerald-500 animate-scale" />
              ) : (
                <Share2 className="w-4 h-4 text-slate-400" />
              )}
              <span>{shareCopied ? "Link Copied" : "Share"}</span>
            </button>

            {selectedProject.projectLink && (
              <a
                href={selectedProject.projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-blue hover:bg-brand-blue/90 text-white text-xs font-bold transition shadow-sm cursor-pointer"
              >
                <span>Live Link</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* MINIMAL HEADER: Clean Title, Client Tag & Commission Callout */}
        <div className="mb-10 max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-[10px] font-mono tracking-wider font-bold uppercase bg-brand-blue/10 text-brand-blue dark:bg-brand-blue/20 dark:text-blue-300 px-3 py-1 rounded-full border border-brand-blue/20">
              {selectedProject.category}
            </span>

            {selectedProject.client && (
              <span className="text-[10px] font-mono tracking-wider font-bold uppercase bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800">
                @ {selectedProject.client}
              </span>
            )}

            {slideshowImages.length > 1 && (
              <span className="text-[10px] font-mono tracking-wider font-bold uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {slideshowImages.length} Campaign Posters
              </span>
            )}
          </div>

          <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 dark:text-white tracking-tight leading-tight">
            {selectedProject.title}
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg font-light leading-relaxed">
            {selectedProject.description}
          </p>

          {/* Quick Direct Conversion CTA Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Order Similar Design on WhatsApp</span>
            </a>

            <button
              onClick={() => {
                setSelectedProject(null);
                setCurrentView('home');
                setTimeout(() => {
                  const auditSec = document.getElementById('audit');
                  if (auditSec) {
                    const offset = 80;
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = auditSec.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
                  }
                }, 200);
              }}
              className="inline-flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-blue dark:hover:border-brand-blue text-slate-700 dark:text-slate-200 font-bold text-sm px-5 py-3 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-brand-blue" />
              <span>Request Custom Proposal</span>
            </button>
          </div>
        </div>

        {/* HERO SHOWCASE CANVAS: High-Definition, Uncropped Flyer Presentation */}
        <div className="space-y-6 mb-16">
          <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl max-w-4xl mx-auto">
            
            {/* Center Canvas */}
            <div className="relative flex items-center justify-center p-3 sm:p-6 bg-slate-950/2 dark:bg-slate-950/40">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlideIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="relative group cursor-zoom-in flex items-center justify-center"
                  onClick={() => setLightboxIndex(activeSlideIndex)}
                >
                  <img
                    src={slideshowImages[activeSlideIndex] || selectedProject.image}
                    alt={`${selectedProject.title} Exhibit ${activeSlideIndex + 1}`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/portfolio-assets/elan-noir-flyer.jpg';
                    }}
                    referrerPolicy="no-referrer"
                    className="max-h-[75vh] sm:max-h-[82vh] w-auto h-auto object-contain rounded-2xl shadow-sm block transition-transform duration-300 group-hover:scale-[1.01]"
                  />

                  {/* Zoom Badge on Hover */}
                  <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/20 transition-all rounded-2xl flex items-center justify-center pointer-events-none">
                    <span className="opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all text-[11px] font-bold uppercase tracking-wider font-mono bg-slate-950/80 text-white px-3.5 py-2 rounded-xl backdrop-blur-md flex items-center gap-2 border border-white/10 shadow-lg">
                      <Maximize2 className="w-3.5 h-3.5 text-brand-blue" />
                      Click to View Full Size
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next arrows for multi-image series */}
              {slideshowImages.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveSlideIndex((prev) => (prev === 0 ? slideshowImages.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md transition flex items-center justify-center border border-white/10 shadow-lg cursor-pointer"
                    aria-label="Previous exhibit"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => setActiveSlideIndex((prev) => (prev === slideshowImages.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md transition flex items-center justify-center border border-white/10 shadow-lg cursor-pointer"
                    aria-label="Next exhibit"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Slide Counter pill */}
              {slideshowImages.length > 1 && (
                <div className="absolute bottom-4 left-6 z-20 px-3 py-1 bg-slate-950/80 backdrop-blur-md text-white border border-white/10 text-[10px] font-mono font-bold tracking-widest uppercase rounded-full">
                  Exhibit {activeSlideIndex + 1} of {slideshowImages.length}
                </div>
              )}
            </div>
          </div>

          {/* MULTI-ASSET FILMSTRIP: Quick Clickable Variation Switcher */}
          {slideshowImages.length > 1 && (
            <div className="max-w-4xl mx-auto space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold px-1">
                <span>Campaign Variations ({slideshowImages.length} Posters)</span>
                <span>Select to Preview</span>
              </div>

              <div className="flex gap-3 overflow-x-auto py-2 px-1 scrollbar-thin">
                {slideshowImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlideIndex(idx)}
                    className={`relative w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer bg-slate-100 dark:bg-slate-900 ${
                      activeSlideIndex === idx
                        ? 'border-brand-blue ring-2 ring-brand-blue/30 scale-105 opacity-100 shadow-md'
                        : 'border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Variation ${idx + 1}`}
                      className="w-full h-full object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-1 right-1 text-[9px] font-mono font-bold bg-black/80 text-white px-1.5 py-0.5 rounded-sm">
                      #{idx + 1}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* BOTTOM CONVERSION FOOTER STRIP */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 text-white p-8 sm:p-10 border border-slate-800 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1.5 max-w-md">
            <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white">
              Need a design like this for your project?
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm font-light">
              We design premium flyers, political identities, and brand campaigns that command attention across Ghana.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs px-6 py-3.5 rounded-xl shadow-lg transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chat on WhatsApp</span>
            </a>

            <button
              onClick={handleBack}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/15 text-white font-bold text-xs px-5 py-3.5 rounded-xl border border-white/10 transition cursor-pointer"
            >
              <span>Explore More Work</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* LIGHTBOX FULL SCREEN INTERACTIVE THEATER MODAL */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-slate-950/98 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Top Lightbox Bar */}
            <div className="flex items-center justify-between gap-4 w-full text-white z-10 p-2 sm:p-4 bg-slate-950/40 backdrop-blur-xs rounded-2xl">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono bg-brand-blue px-3 py-1 rounded-md font-bold uppercase tracking-wider">
                  Theater Mode
                </span>
                <span className="text-xs font-bold text-slate-300 hidden sm:inline-block">
                  {selectedProject.title}
                </span>
              </div>

              {/* Theater Mode counter */}
              <span className="text-xs font-mono font-bold text-slate-400">
                Exhibit {lightboxIndex + 1} of {slideshowImages.length}
              </span>

              <button
                onClick={() => setLightboxIndex(null)}
                className="p-2 rounded-full bg-white/5 text-white hover:bg-white/10 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/10 flex items-center justify-center"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Immersive Slide Canvas */}
            <div className="relative w-full flex-1 flex items-center justify-center p-4">
              {slideshowImages.length > 1 && (
                <>
                  {/* Left arrow controls */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLightboxPrev();
                    }}
                    className="absolute left-2 sm:left-4 z-50 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition flex items-center justify-center cursor-pointer active:scale-95"
                    aria-label="Previous exhibit"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  {/* Right arrow controls */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLightboxNext();
                    }}
                    className="absolute right-2 sm:right-4 z-50 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition flex items-center justify-center cursor-pointer active:scale-95"
                    aria-label="Next exhibit"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Centered Image */}
              <motion.div
                key={lightboxIndex}
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="max-w-6xl max-h-[75vh] sm:max-h-[80vh] overflow-hidden rounded-2xl relative border border-slate-800 shadow-2xl bg-slate-950 flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img 
                  src={slideshowImages[lightboxIndex] || selectedProject.image} 
                  alt={`Enlarged exhibit frame #${lightboxIndex + 1}`} 
                  className="max-w-full max-h-[75vh] sm:max-h-[80vh] object-contain block mx-auto rounded-xl"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>

            {/* Bottom filmstrip thumbnail row inside Lightbox */}
            {slideshowImages.length > 1 && (
              <div 
                className="w-full flex justify-center py-4 bg-slate-950/50 backdrop-blur-xs border-t border-slate-900/60 z-10 px-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex gap-2.5 overflow-x-auto max-w-4xl scrollbar-thin py-1 select-none">
                  {slideshowImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setLightboxIndex(idx)}
                      className={`relative w-14 h-10 rounded-md overflow-hidden border shrink-0 transition cursor-pointer ${
                        lightboxIndex === idx 
                          ? 'border-brand-blue ring-1 ring-brand-blue/30 scale-102 opacity-100' 
                          : 'border-transparent opacity-40 hover:opacity-100'
                      }`}
                    >
                      <img 
                        src={img} 
                        alt={`Lightbox Filmstrip Thumbnail ${idx + 1}`} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
