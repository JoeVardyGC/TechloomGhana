import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ArrowUpRight } from 'lucide-react';
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
  const [simulatedLoading, setSimulatedLoading] = useState<boolean>(false);

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
  const isWebProject = (p: PortfolioItem) => {
    const cat = (p.category || '').toLowerCase().trim();
    return cat.includes('web') || cat.includes('software') || cat.includes('app') || !!p.projectLink;
  };

  const allWebProjects = useMemo(() => {
    return portfolio.filter(isWebProject);
  }, [portfolio]);

  const allGraphicProjects = useMemo(() => {
    return portfolio.filter(p => !isWebProject(p));
  }, [portfolio]);

  // Admin Pinned Web Projects (ONLY display on homepage 'All' if admin explicitly pinned them)
  const selectedWebIds = settings?.selectedHomepageWebPortfolios || [];
  const homeWebProjects = useMemo(() => {
    return selectedWebIds
      .map(id => allWebProjects.find(p => p.id === id))
      .filter((p): p is PortfolioItem => !!p);
  }, [selectedWebIds, allWebProjects]);

  // Admin Pinned Graphic Design Projects (defaults to top 6 if none pinned)
  const selectedDesignIds = settings?.selectedHomepagePortfolios || [];
  const homeGraphicProjects = useMemo(() => {
    const pinned = selectedDesignIds
      .map(id => allGraphicProjects.find(p => p.id === id))
      .filter((p): p is PortfolioItem => !!p);
    return pinned.length > 0 ? pinned : allGraphicProjects.slice(0, 6);
  }, [selectedDesignIds, allGraphicProjects]);

  // Exact 3 Filter Categories as requested: All, Graphic Design, Web & Software Projects
  const categoryFilters = ['All', 'Graphic Design', 'Web & Software Projects'];

  // Active items based on selected tab
  const displayItems = useMemo(() => {
    if (activeFilter === 'All') {
      return {
        web: homeWebProjects,
        graphic: homeGraphicProjects
      };
    }
    if (activeFilter === 'Web & Software Projects') {
      return {
        web: homeWebProjects.length > 0 ? homeWebProjects : allWebProjects,
        graphic: []
      };
    }
    // Graphic Design
    return {
      web: [],
      graphic: homeGraphicProjects
    };
  }, [activeFilter, homeWebProjects, homeGraphicProjects, allWebProjects]);

  const handleNavigateToExplorer = (targetFilter: string) => {
    setSimulatedLoading(true);
    setTimeout(() => {
      setSimulatedLoading(false);
      if (setPortfolioInitialFilter) {
        setPortfolioInitialFilter(targetFilter);
      }
      setCurrentView('portfolio');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 200);
  };

  return (
    <section id="portfolio" className="py-24 bg-slate-50 dark:bg-slate-950 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center px-3 py-1 bg-brand-blue/5 dark:bg-brand-blue/10 border border-brand-blue/10 rounded-full">
              <span className="text-xs font-bold tracking-widest text-brand-blue uppercase">
                Our Works
              </span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 dark:text-white tracking-tight leading-tight">
              Design &amp; Digital Solutions in{' '}
              <span className="blue-gradient-text">Real Action</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg font-light leading-relaxed">
              We create clean flyers, professional company branding, and fast websites that make your business look trusted and win more customers.
            </p>
          </div>

          {/* Filtering Tabs (All, Graphic Design, Web & Software Projects) */}
          <div className="flex flex-wrap gap-2 md:self-end">
            {categoryFilters.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  id={`filter-tab-${filter.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  className={`relative px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? 'bg-brand-blue text-white shadow-sm' 
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-800 dark:hover:text-white'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Loading state */}
        {loading && portfolio.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 space-y-2">
            <div className="w-6 h-6 border-2 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin" />
            <p className="text-xs text-slate-400 font-mono">Synchronizing Works...</p>
          </div>
        ) : (
          <div className="space-y-16">
            
            {/* 1. Web Projects Grid (Only displayed if admin pinned web projects or Web & Software Projects tab selected) */}
            {displayItems.web.length > 0 && (
              <div className="space-y-8">
                <motion.div 
                  layout 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {displayItems.web.map((project) => (
                    <div key={project.id} className="h-full">
                      <WebProjectCard
                        id={`portfolio-card-${project.id}`}
                        project={project}
                        onSelectProject={(p) => setSelectedProject(p)}
                      />
                    </div>
                  ))}
                </motion.div>

                {/* Explore All Web & Software Projects CTA Button */}
                <div className="flex justify-center pt-2">
                  <button
                    onClick={() => handleNavigateToExplorer('Web & Software Projects')}
                    id="explore-web-projects-btn"
                    disabled={simulatedLoading}
                    className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-blue text-slate-800 dark:text-slate-200 hover:text-brand-blue font-bold text-xs uppercase tracking-wider shadow-xs hover:shadow-md transition-all cursor-pointer"
                  >
                    <span>Explore All Web &amp; Software Projects</span>
                    <ArrowUpRight className="w-4 h-4 text-brand-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {/* 2. Graphic Design Grid (Borderless cards: no visible stroke outline edges) */}
            {displayItems.graphic.length > 0 && (
              <div className="space-y-8">
                <motion.div 
                  layout 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  <AnimatePresence mode="popLayout">
                    {displayItems.graphic.map((project) => (
                      <motion.div
                        key={project.id}
                        id={`portfolio-card-${project.id}`}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-xs hover:shadow-xl border-none transition-all duration-300 flex flex-col h-full"
                        onClick={() => {
                          setSelectedProject(project);
                        }}
                      >
                        {/* Image Wrap */}
                        <div className="relative w-full aspect-[4/5] overflow-hidden bg-slate-100 dark:bg-slate-950">
                          <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-slate-950/25 z-10 transition-colors duration-300" />
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
                            <span className="text-[10px] font-bold uppercase tracking-widest bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm text-slate-900 dark:text-white px-3 py-1.5 rounded-full shadow-xs">
                              Graphic Design
                            </span>
                          </div>
                        </div>

                        {/* Info Box */}
                        <div className="p-6 sm:p-7 flex items-end justify-between gap-4 flex-grow bg-white dark:bg-slate-900">
                          <div className="space-y-1">
                            <h3 className="font-display font-extrabold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-brand-blue dark:group-hover:text-brand-blue transition-colors line-clamp-1">
                              {project.title}
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm line-clamp-2 font-normal leading-relaxed">
                              {project.description}
                            </p>
                          </div>
                          <div className="w-9 h-9 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-all shadow-xs">
                            <ChevronRight className="w-4 h-4 text-slate-600 dark:text-slate-300 group-hover:text-white transition-colors" />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>

                {/* Explore All Graphic Design Projects CTA Button */}
                <div className="flex justify-center pt-4">
                  <button
                    onClick={() => handleNavigateToExplorer('Graphic Design')}
                    id="explore-graphic-designs-btn"
                    disabled={simulatedLoading}
                    className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-blue text-slate-800 dark:text-slate-200 hover:text-brand-blue font-bold text-xs uppercase tracking-wider shadow-xs hover:shadow-md transition-all cursor-pointer"
                  >
                    <span>Explore All Graphic Design Projects</span>
                    <ArrowUpRight className="w-4 h-4 text-brand-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
}
