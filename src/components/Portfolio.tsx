import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ArrowUpRight, Globe, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PortfolioItem } from '../types';
import WebProjectCard from './WebProjectCard';

export default function Portfolio() {
  const { 
    portfolio, 
    settings, 
    loading, 
    setCurrentView, 
    setSelectedProject, 
    setPortfolioInitialFilter 
  } = useApp();
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [simulatedWebLoading, setSimulatedWebLoading] = useState<boolean>(false);
  const [simulatedDesignLoading, setSimulatedDesignLoading] = useState<boolean>(false);

  // Restore scroll position to exact card when returning from details view
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = sessionStorage.getItem('techloom_return_target');
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data && data.projectId && (data.view === 'home' || !data.view)) {
        let attempts = 0;
        const interval = setInterval(() => {
          attempts++;
          const cardEl = document.getElementById(`portfolio-card-${data.projectId}`);
          if (cardEl) {
            clearInterval(interval);
            const navOffset = 90;
            const elementPosition = cardEl.getBoundingClientRect().top + window.pageYOffset;
            const targetPosition = Math.max(0, elementPosition - navOffset);
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });

            cardEl.classList.add('ring-4', 'ring-brand-blue/50', 'ring-offset-4', 'transition-all', 'duration-500');
            setTimeout(() => {
              cardEl.classList.remove('ring-4', 'ring-brand-blue/50', 'ring-offset-4');
            }, 2000);

            try {
              sessionStorage.removeItem('techloom_return_target');
            } catch (e) {}
          } else if (attempts >= 25) {
            clearInterval(interval);
            if (typeof data.scrollY === 'number' && data.scrollY > 0) {
              window.scrollTo({ top: data.scrollY, behavior: 'smooth' });
            }
            try {
              sessionStorage.removeItem('techloom_return_target');
            } catch (e) {}
          }
        }, 40);
        return () => clearInterval(interval);
      }
    } catch (e) {
      console.error("Home portfolio scroll restoration error:", e);
    }
  }, []);

  // Separate Web vs Graphic Design projects
  const allWebProjects = portfolio.filter(p => p.category === 'Website Design' || !!p.projectLink);
  const allGraphicProjects = portfolio.filter(p => p.category !== 'Website Design');

  // Featured Web Projects for Homepage (admin pinned or default top 3)
  const selectedWebIds = settings?.selectedHomepageWebPortfolios || [];
  const selectedWebProjects = selectedWebIds
    .map(id => allWebProjects.find(p => p.id === id))
    .filter((p): p is PortfolioItem => !!p);

  const homeWebProjects = selectedWebProjects.length > 0
    ? selectedWebProjects
    : allWebProjects.slice(0, 3);

  // Featured Graphic Design Projects for Homepage (admin pinned or default top 6)
  const selectedDesignIds = settings?.selectedHomepagePortfolios || [];
  const selectedDesignProjects = selectedDesignIds
    .map(id => allGraphicProjects.find(p => p.id === id))
    .filter((p): p is PortfolioItem => !!p);

  const homeGraphicProjects = selectedDesignProjects.length > 0
    ? selectedDesignProjects
    : allGraphicProjects.slice(0, 6);

  const dynamicCategories = Array.from(new Set(homeGraphicProjects.map(p => p.category))).filter((cat): cat is string => typeof cat === 'string' && cat.trim().length > 0);
  const filters = ['All', ...Array.from(new Set(dynamicCategories))];

  const filteredGraphicProjects = activeFilter === 'All'
    ? homeGraphicProjects
    : homeGraphicProjects.filter(project => project.category === activeFilter);

  const handleExploreWeb = () => {
    setSimulatedWebLoading(true);
    setTimeout(() => {
      setSimulatedWebLoading(false);
      setPortfolioInitialFilter('Website Design');
      setCurrentView('portfolio');
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 400);
  };

  const handleExploreDesigns = () => {
    setSimulatedDesignLoading(true);
    setTimeout(() => {
      setSimulatedDesignLoading(false);
      setPortfolioInitialFilter(activeFilter !== 'All' ? activeFilter : 'All');
      setCurrentView('portfolio');
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 400);
  };

  return (
    <section id="portfolio" className="py-24 bg-slate-50 dark:bg-slate-950 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* ========================================================================= */}
        {/* 1. TOP SECTION: PRIORITIZED WEB PROJECTS & SOFTWARE PLATFORMS              */}
        {/* ========================================================================= */}
        <div className="mb-20">
          {/* Section Header */}
          <div className="max-w-3xl space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-bold tracking-widest text-emerald-700 dark:text-emerald-400 uppercase">
                Live Platforms & Software Systems
              </span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 dark:text-white tracking-tight leading-tight">
              Engineering Digital Excellence &{' '}
              <span className="blue-gradient-text">Web Platforms</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg font-light leading-relaxed">
              Full-stack responsive websites, high-converting e-commerce boutiques, and digital governance portals built for sovereign performance. Explore our live systems below.
            </p>
          </div>

          {/* Web Projects Grid (Browser Mockup Cards) */}
          {loading && portfolio.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 space-y-2">
              <div className="w-6 h-6 border-2 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin" />
              <p className="text-xs text-slate-400 font-mono">Synchronizing Web Showcases...</p>
            </div>
          ) : (
            <motion.div 
              layout 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {homeWebProjects.map((project) => (
                <div key={project.id} className="h-full">
                  <WebProjectCard
                    id={`portfolio-card-${project.id}`}
                    project={project}
                    onSelectProject={(p) => setSelectedProject(p)}
                  />
                </div>
              ))}
            </motion.div>
          )}

          {/* Web Showcase Action CTA */}
          <div className="mt-12 text-center">
            <button
              onClick={handleExploreWeb}
              id="portfolio-explore-web-btn"
              disabled={simulatedWebLoading}
              className="group inline-flex items-center gap-2.5 bg-[#0B1528] hover:bg-slate-900 text-white font-bold text-sm px-8 py-4 rounded-xl shadow-lg hover:shadow-xl border border-slate-700/80 transition-all cursor-pointer"
            >
              {simulatedWebLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-cyan-400" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Accessing Web Directory...</span>
                </>
              ) : (
                <>
                  <span>View All Web Projects & Software Design ({allWebProjects.length})</span>
                  <ArrowUpRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION DIVIDER                                                           */}
        {/* ========================================================================= */}
        <div className="border-t border-slate-200 dark:border-slate-800 my-16" />

        {/* ========================================================================= */}
        {/* 2. LOWER SECTION: BRAND STRATEGY & GRAPHIC DESIGN SHOWCASE                */}
        {/* ========================================================================= */}
        <div>
          {/* Header & Filter Controls Block */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-blue/5 dark:bg-brand-blue/10 border border-brand-blue/10 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
                <span className="text-xs font-bold tracking-widest text-brand-blue uppercase">
                  Brand Strategy & Visual Artistry
                </span>
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 dark:text-white tracking-tight leading-tight">
                Graphic Design in{' '}
                <span className="blue-gradient-text">Real Action</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg font-light leading-relaxed">
                Strategic flyer designs, national campaign banners, and prestigious corporate visual identities. Filter through featured case files below.
              </p>
            </div>

            {/* Filtering Tabs */}
            <div className="flex flex-wrap gap-2 md:self-end">
              {filters.map((filter) => {
                const isActive = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    id={`filter-tab-${filter.toLowerCase().replace(/\s+/g, '-')}`}
                    className={`relative px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                      isActive 
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm' 
                        : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-800 dark:hover:text-white'
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Graphic Design Masonry Grid */}
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredGraphicProjects.map((project) => (
                <motion.div
                  key={project.id}
                  id={`portfolio-card-${project.id}`}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl border border-slate-150 dark:border-slate-800 transition-all duration-300 flex flex-col h-full"
                  onClick={() => {
                    setSelectedProject(project);
                  }}
                >
                  {/* Image Wrap */}
                  <div className="relative w-full aspect-[4/5] overflow-hidden bg-slate-100 dark:bg-slate-950">
                    <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-slate-950/30 z-10 transition-colors duration-300" />
                    <img
                      src={project.image}
                      alt={project.title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/portfolio-assets/elan-noir-flyer.jpg';
                      }}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top block transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    {/* Category Pill Tag */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className="text-[10px] font-bold uppercase tracking-widest bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm text-slate-900 dark:text-white px-3 py-1.5 rounded-full shadow-sm">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Info Box */}
                  <div className="p-6 sm:p-7 flex items-end justify-between gap-4 flex-grow bg-white dark:bg-slate-900">
                    <div className="space-y-1">
                      <h3 className="font-display font-extrabold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-brand-blue dark:group-hover:text-brand-blue transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm line-clamp-2 font-light leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-700 group-hover:bg-brand-blue group-hover:text-white transition-all shadow-sm">
                      <ChevronRight className="w-4 h-4 text-slate-600 dark:text-slate-300 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Explore Graphic Design Archive Footer CTA */}
          <div className="mt-16 text-center">
            <button
              onClick={handleExploreDesigns}
              id="portfolio-explore-designs-btn"
              disabled={simulatedDesignLoading}
              className="group inline-flex items-center gap-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-blue text-slate-800 dark:text-slate-200 hover:text-brand-blue font-bold text-sm px-8 py-4 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              {simulatedDesignLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-brand-blue" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Opening Graphic Archive...</span>
                </>
              ) : (
                <>
                  <span>Explore More Graphic Design Projects ({allGraphicProjects.length}+ Showcases)</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
