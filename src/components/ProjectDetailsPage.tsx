import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ExternalLink, 
  X, 
  Clock, 
  User, 
  CheckCircle2, 
  ChevronRight, 
  Briefcase, 
  ChevronLeft,
  Share2,
  Copy,
  Maximize2,
  Grid,
  Check,
  Zap,
  BookOpen,
  Image as ImageIcon
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ProjectDetailsPage() {
  const { selectedProject, setSelectedProject, currentView, setCurrentView, showToast } = useApp();
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showAllAssets, setShowAllAssets] = useState<boolean>(false);
  const [shareCopied, setShareCopied] = useState<boolean>(false);

  // Automatically scroll to the top of the details page on loading
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
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

  const handleAuditNavigation = () => {
    setSelectedProject(null);
    setCurrentView('home');
    setTimeout(() => {
      const auditSec = document.getElementById('audit');
      if (auditSec) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = auditSec.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }, 250);
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

  // Limit initially shown grid assets for clean visual layout (especially when 20+ exist)
  const initialAssetsCount = 6;
  const displayedExtraImages = showAllAssets 
    ? (selectedProject.extraImages || []) 
    : (selectedProject.extraImages || []).slice(0, initialAssetsCount);

  const hasMoreAssets = (selectedProject.extraImages || []).length > initialAssetsCount;
  const hiddenAssetsCount = (selectedProject.extraImages || []).length - initialAssetsCount;

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-32 transition-colors duration-300 relative overflow-hidden">
      {/* Decorative premium light ambient glow grids */}
      <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-blue-500/5 via-indigo-500/2 to-transparent pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-brand-blue/3 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-indigo-500/3 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* TOP BAR: Navigation breadcrumb & sleek actions */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/50 pb-6">
          <div className="flex flex-col gap-2">
            <button
              onClick={handleBack}
              id="details-back-to-list-btn"
              className="group flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer w-fit"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to {currentView === 'portfolio' ? 'Portfolio Ledger' : 'Home Showcase'}</span>
            </button>
            
            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 uppercase tracking-wider mt-1">
              <span>Index</span>
              <span>/</span>
              <span>{selectedProject.category}</span>
              <span>/</span>
              <span className="text-brand-blue font-bold">{selectedProject.title}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Share action */}
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80 text-xs font-bold transition shadow-2xs cursor-pointer"
            >
              {shareCopied ? (
                <Check className="w-4 h-4 text-emerald-500 animate-scale" />
              ) : (
                <Share2 className="w-4 h-4 text-slate-400 group-hover:scale-105 transition" />
              )}
              <span>{shareCopied ? "Copied" : "Share Case"}</span>
            </button>

            {selectedProject.projectLink && (
              <a
                href={selectedProject.projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue/90 text-white text-xs font-bold transition shadow-sm cursor-pointer"
              >
                <span>Launch Project</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* HERO BLOCK: Cinema-style Split Layout Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12">
          
          {/* LEFT PANEL: Typographical Summary, Client Metrics & Scope */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
            
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-brand-blue/5 border border-brand-blue/10 px-3.5 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
                <span className="text-[10px] font-mono tracking-wider text-brand-blue uppercase font-bold">
                  {selectedProject.category}
                </span>
              </div>
              
              <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-slate-900 leading-tight">
                {selectedProject.title}
              </h1>
              
              <p className="text-slate-600 text-sm sm:text-base font-light leading-relaxed">
                {selectedProject.description}
              </p>
            </div>

            {/* Premium Client Specification Card Row */}
            <div className="grid grid-cols-3 gap-3 bg-white p-4 rounded-2xl border border-slate-200/50 shadow-2xs">
              <div className="space-y-1 text-center sm:text-left border-r border-slate-100 pr-2">
                <span className="text-[9px] uppercase font-mono text-slate-400 font-bold block tracking-wider">Client</span>
                <span className="text-xs font-extrabold text-slate-800 truncate block">
                  {selectedProject.client || 'Corporate'}
                </span>
              </div>
              <div className="space-y-1 text-center sm:text-left border-r border-slate-100 px-2">
                <span className="text-[9px] uppercase font-mono text-slate-400 font-bold block tracking-wider">Duration</span>
                <span className="text-xs font-extrabold text-slate-800 truncate block">
                  {selectedProject.duration || 'Fast Track'}
                </span>
              </div>
              <div className="space-y-1 text-center sm:text-left pl-2">
                <span className="text-[9px] uppercase font-mono text-slate-400 font-bold block tracking-wider">Timeline</span>
                <span className="text-xs font-extrabold text-slate-800 truncate block">
                  Completed
                </span>
              </div>
            </div>

            {/* Delivery Scope Deliverables Card */}
            {selectedProject.scope && selectedProject.scope.length > 0 && (
              <div className="space-y-4 bg-white p-6 rounded-3xl border border-slate-200/60">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Grid className="w-4 h-4 text-brand-blue" />
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-700 font-bold">
                    Key Execution Scope
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedProject.scope.map((task, i) => (
                    <div 
                      key={i} 
                      className="flex items-start gap-2 text-[11px] font-semibold text-slate-700 bg-slate-50/50 p-3 rounded-xl border border-slate-100 transition hover:border-slate-200"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue shrink-0 mt-0.5" />
                      <span className="leading-tight">{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT PANEL: Cinematic Interactive Image Theater */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="relative max-w-full w-fit h-fit rounded-3xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-md group mx-auto">
              {/* Image Theater Canvas container that dynamically wraps the image size */}
              <div className="relative flex items-center justify-center overflow-hidden bg-transparent">
                
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeSlideIndex}
                    src={slideshowImages[activeSlideIndex] || selectedProject.image}
                    alt={`${selectedProject.title} Exhibit ${activeSlideIndex + 1}`}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/portfolio-assets/elan-noir-flyer.jpg';
                    }}
                    referrerPolicy="no-referrer"
                    className="max-w-full max-h-[70vh] sm:max-h-[75vh] md:max-h-[80vh] w-auto h-auto object-contain block z-10 transition-all duration-300 rounded-3xl"
                  />
                </AnimatePresence>

                {/* Left/Right Slideshow Overlay Controls */}
                {slideshowImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveSlideIndex((prev) => (prev === 0 ? slideshowImages.length - 1 : prev - 1))}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-950/60 hover:bg-slate-950/90 text-white backdrop-blur-md transition-all flex items-center justify-center border border-white/10 cursor-pointer shadow-md opacity-0 group-hover:opacity-100 focus:opacity-100"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setActiveSlideIndex((prev) => (prev === slideshowImages.length - 1 ? 0 : prev + 1))}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-950/60 hover:bg-slate-950/90 text-white backdrop-blur-md transition-all flex items-center justify-center border border-white/10 cursor-pointer shadow-md opacity-0 group-hover:opacity-100 focus:opacity-100"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Zoom / Expand Control Row */}
                <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                  <button 
                    onClick={() => setLightboxIndex(activeSlideIndex)}
                    className="p-1.5 rounded-lg bg-black/60 hover:bg-black/85 text-white border border-white/10 backdrop-blur-md transition cursor-pointer flex items-center justify-center"
                    title="Expand View"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Index Counter overlay */}
                <div className="absolute bottom-4 left-4 z-20 px-3 py-1 bg-black/60 backdrop-blur-md text-white/90 border border-white/10 text-[9px] font-mono font-bold tracking-widest uppercase rounded-full">
                  Exhibition {activeSlideIndex + 1} / {slideshowImages.length}
                </div>
              </div>
            </div>

            {/* HORIZONTAL FILMSTRIP: Multi-Image Thumbnail Gallery (supports up to 20+ images) */}
            {slideshowImages.length > 1 && (
              <div className="space-y-2">
                <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 font-bold block">
                  Media Filmstrip Carousel ({slideshowImages.length} frames)
                </span>
                
                <div className="flex items-center gap-2">
                  {/* Horizontally scrollable filmstrip container */}
                  <div className="flex gap-2.5 overflow-x-auto py-2 px-1 scrollbar-thin scrollbar-thumb-slate-300 w-full select-none">
                    {slideshowImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveSlideIndex(idx)}
                        className={`relative w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden border shrink-0 transition-all cursor-pointer ${
                          activeSlideIndex === idx 
                            ? 'border-brand-blue ring-2 ring-brand-blue/30 scale-102 opacity-100 shadow-sm' 
                            : 'border-slate-200 opacity-60 hover:opacity-100 hover:scale-101'
                        }`}
                      >
                        <img 
                          src={img} 
                          alt={`Carousel Thumbnail ${idx + 1}`} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/5 hover:bg-black/0 transition" />
                        <span className="absolute bottom-1 right-1 text-[8px] font-mono font-bold bg-black/75 text-white px-1 rounded-sm">
                          {idx + 1}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SECTION 2: Deep Narrative Storyboard Rows (Challenge & Solution) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* THE CHALLENGE BLOCK */}
          {selectedProject.challenge && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-slate-200/50 rounded-3xl p-6 sm:p-8 space-y-4 hover:border-slate-300 transition duration-300"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-rose-500/5 flex items-center justify-center text-rose-500">
                    <Zap className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono font-black uppercase tracking-wider text-rose-500">
                    01 / The Strategic Challenge
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">
                  Scope Discovery
                </span>
              </div>
              
              <p className="text-slate-700 text-sm leading-relaxed font-light">
                {selectedProject.challenge}
              </p>
            </motion.div>
          )}

          {/* THE SOLUTION BLOCK */}
          {selectedProject.solution && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-slate-200/50 rounded-3xl p-6 sm:p-8 space-y-4 hover:border-slate-300 transition duration-300"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/5 flex items-center justify-center text-emerald-500">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono font-black uppercase tracking-wider text-emerald-500">
                    02 / The Creative Solution
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">
                  Delivered Design
                </span>
              </div>
              
              <p className="text-slate-700 text-sm leading-relaxed font-light">
                {selectedProject.solution}
              </p>
            </motion.div>
          )}
        </div>

        {/* SECTION 3: Visual Assets Grid (Perfect layout supporting 20+ extra images beautifully) */}
        {selectedProject.extraImages && selectedProject.extraImages.length > 0 && (
          <div className="space-y-6 pt-10 border-t border-slate-200/50 mb-16">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-brand-blue/5 flex items-center justify-center text-brand-blue">
                  <ImageIcon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-lg text-slate-900">
                    Showcase Media Board
                  </h3>
                  <p className="text-slate-400 text-xs font-light">
                    Explore high-fidelity project screenshots, blueprint schematics, and UI flows ({selectedProject.extraImages.length} assets)
                  </p>
                </div>
              </div>

              {/* Asset counts bar */}
              <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100/50 px-3 py-1.5 rounded-full border border-slate-200/30">
                Displaying {displayedExtraImages.length} of {selectedProject.extraImages.length} Assets
              </span>
            </div>

            {/* Masonry / Grid board layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedExtraImages.map((imgUrl, idx) => {
                // Determine layout variety (some wider or styled differently for organic feel)
                const isWide = idx % 5 === 0 && showAllAssets;
                
                return (
                  <motion.div 
                    layout
                    key={idx} 
                    onClick={() => setLightboxIndex(idx + 1)} // idx + 1 because idx 0 is the primary image
                    className={`group/gallery relative rounded-2xl overflow-hidden border border-slate-200 cursor-zoom-in bg-white transition-all duration-350 shadow-2xs hover:shadow-md ${
                      isWide ? 'sm:col-span-2' : ''
                    }`}
                  >
                    <div className="absolute inset-0 bg-slate-950/0 group-hover/gallery:bg-slate-950/30 transition-all z-10 flex items-center justify-center">
                      <div className="opacity-0 group-hover/gallery:opacity-100 scale-95 group-hover/gallery:scale-100 text-white text-[10px] font-bold tracking-wider uppercase font-mono bg-slate-950/80 backdrop-blur-xs px-3 py-2 rounded-xl transition-all duration-250 border border-white/10 flex items-center gap-1.5">
                        <Maximize2 className="w-3.5 h-3.5 text-brand-blue" />
                        <span>Enlarge Asset</span>
                      </div>
                    </div>

                    <div className="relative overflow-hidden aspect-[4/3] sm:aspect-[16/11] bg-slate-950/5">
                      <img 
                        src={imgUrl} 
                        alt={`Design asset Exhibit #${idx + 2}`} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/gallery:scale-[1.03]"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    
                    {/* Tiny glassy label with asset indices */}
                    <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                        Case Asset #{String(idx + 2).padStart(2, '0')}
                      </span>
                      <span className="text-[8px] font-mono text-slate-350 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-100">
                        View Details
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Toggle show all / pagination support for massive galleries */}
            {hasMoreAssets && (
              <div className="flex justify-center pt-4">
                <button
                  onClick={() => setShowAllAssets(prev => !prev)}
                  className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 shadow-2xs hover:shadow-xs cursor-pointer transition active:scale-95 inline-flex items-center gap-2"
                >
                  <span>{showAllAssets ? "Collapse Visual Board" : `Show More Assets (+${hiddenAssetsCount})`}</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${showAllAssets ? 'rotate-90' : ''}`} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* BOTTOM CTA: High fidelity organization consulting board */}
        <div className="mt-16 bg-gradient-to-br from-slate-50 to-white text-slate-900 rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-slate-200/80 shadow-md">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 pointer-events-none" />
          <div className="absolute -top-12 -right-12 w-56 h-56 bg-brand-blue/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl space-y-6">
            <span className="text-[9px] font-mono bg-brand-blue/5 text-brand-blue font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-brand-blue/10 inline-block">
              Accra Design Studio
            </span>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handleAuditNavigation}
                id="details-to-audit-cta-bottom"
                className="group flex items-center gap-2 bg-slate-900 hover:bg-slate-850 text-white font-extrabold text-xs tracking-wider uppercase px-6 py-3 rounded-xl transition shadow-sm cursor-pointer"
              >
                <span>Request Consultation</span>
                <ChevronRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
              </button>
              
              <button
                onClick={handleBack}
                className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-900 text-xs font-bold uppercase tracking-wider transition cursor-pointer"
              >
                <span>Browse All Work</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* FLOATING ACTION CAPSULE: Sticky bottom drawer bar for instant page CTAs */}
      <div className="fixed bottom-6 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
        <motion.div 
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="bg-white/95 backdrop-blur-md px-6 py-3.5 rounded-full border border-slate-200 shadow-xl flex items-center gap-4 sm:gap-6 pointer-events-auto max-w-lg w-full justify-between"
        >
          <div className="flex items-center gap-2 truncate">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400 truncate">
              {selectedProject.title}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleBack}
              className="p-2 text-slate-400 hover:text-slate-800 rounded-full bg-slate-50 hover:bg-slate-100 transition cursor-pointer"
              title="Return to work portfolio"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              onClick={handleShare}
              className="p-2 text-slate-400 hover:text-slate-800 rounded-full bg-slate-50 hover:bg-slate-100 transition cursor-pointer"
              title="Copy portfolio URL link"
            >
              <Copy className="w-4 h-4" />
            </button>

            <button
              onClick={handleAuditNavigation}
              className="bg-brand-blue hover:bg-brand-blue/90 text-white font-extrabold text-[10px] uppercase tracking-wider px-4 h-8 rounded-full transition shadow-sm cursor-pointer flex items-center justify-center"
            >
              <span>Consult</span>
            </button>
          </div>
        </motion.div>
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
