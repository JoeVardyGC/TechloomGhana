import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Search, 
  X, 
  ChevronRight, 
  SlidersHorizontal,
  FolderOpen,
  Globe,
  Palette
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PortfolioItem } from '../types';
import WebProjectCard from './WebProjectCard';

export default function PortfolioPage() {
  const { 
    portfolio, 
    loading, 
    setCurrentView, 
    setSelectedProject, 
    portfolioInitialFilter, 
    setPortfolioInitialFilter 
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<string>(portfolioInitialFilter || 'All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sync with portfolioInitialFilter when navigated from homepage buttons
  useEffect(() => {
    if (portfolioInitialFilter) {
      setActiveFilter(portfolioInitialFilter);
    }
  }, [portfolioInitialFilter]);

  // Restore scroll position to exact card when returning from details view
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = sessionStorage.getItem('techloom_return_target');
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data && data.projectId && data.view === 'portfolio') {
        let attempts = 0;
        const interval = setInterval(() => {
          attempts++;
          const cardEl = document.getElementById(`portfolio-page-card-${data.projectId}`);
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
      console.error("Portfolio page scroll restoration error:", e);
    }
  }, []);

  const isWebProject = (p: PortfolioItem) => {
    const cat = (p.category || '').toLowerCase().trim();
    return cat.includes('web') || cat.includes('software') || cat.includes('app') || !!p.projectLink;
  };

  const categoryFilters = ['All', 'Graphic Design', 'Web & Software Projects'] as const;

  // Counts for each category
  const counts = useMemo(() => {
    const web = portfolio.filter(isWebProject).length;
    const graphic = portfolio.filter(p => !isWebProject(p)).length;
    return { all: portfolio.length, graphic, web };
  }, [portfolio]);

  // Filter based on active filter tab and searchQuery
  const filteredProjects = useMemo(() => {
    return portfolio.filter(project => {
      const isWeb = isWebProject(project);
      let matchesFilter = true;
      if (activeFilter === 'Web & Software Projects' || activeFilter === 'Website Design') {
        matchesFilter = isWeb;
      } else if (activeFilter === 'Graphic Design') {
        matchesFilter = !isWeb;
      }

      const matchesSearch = searchQuery.trim() === '' || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.client && project.client.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (project.category && project.category.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesFilter && matchesSearch;
    });
  }, [portfolio, activeFilter, searchQuery]);

  // Split into Web and Graphic Design for layout
  const webProjects = useMemo(() => {
    return filteredProjects.filter(isWebProject);
  }, [filteredProjects]);

  const graphicProjects = useMemo(() => {
    return filteredProjects.filter(p => !isWebProject(p));
  }, [filteredProjects]);

  const isAllOrMixed = (activeFilter === 'All') && searchQuery.trim() === '';

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-28 pb-24 transition-colors duration-300">
      
      {/* Decorative background glow */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-[#00C2FF]/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        
        {/* Navigation Breadcrumb & Back Action */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => {
              if (setPortfolioInitialFilter) setPortfolioInitialFilter(null);
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            id="portfolio-back-btn"
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-slate-900 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-950 text-slate-800 dark:text-slate-100 font-bold text-xs border border-slate-200 dark:border-slate-800 transition-all shadow-xs duration-200 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 dark:text-slate-500">
            <span>Portfolio Archive</span>
            <span>/</span>
            <span className="text-brand-blue font-bold">All Projects ({portfolio.length})</span>
          </div>
        </div>

        {/* Page Main Header (Natural Ghanaian English) */}
        <div className="max-w-3xl space-y-5 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-blue/5 dark:bg-brand-blue/10 border border-brand-blue/10 rounded-full">
            <FolderOpen className="w-3.5 h-3.5 text-brand-blue animate-pulse" />
            <span className="text-xs font-bold tracking-widest text-brand-blue uppercase">Our Work Archive</span>
          </div>
          <h1 className="font-display font-[900] text-4xl sm:text-6xl text-slate-900 dark:text-white tracking-tight leading-none">
            All Completed <span className="blue-gradient-text">Projects</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg font-normal leading-relaxed">
            Explore all our completed flyers, branding packages, and live websites. Use the filters below to find exactly what you are looking for.
          </p>
        </div>

        {/* Utility / Search & Filters Controls Container */}
        <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col lg:flex-row gap-6 justify-between items-center mb-12 transition-all">
          
          {/* Active Filter Tabs list (Using Primary Brand Blue) */}
          <div className="flex flex-wrap gap-2 w-full lg:w-auto">
            {categoryFilters.map((filter) => {
              const isActive = activeFilter === filter || 
                (filter === 'Web & Software Projects' && activeFilter === 'Website Design');
              const isWebTab = filter === 'Web & Software Projects';
              const isGraphicTab = filter === 'Graphic Design';

              const count = filter === 'All' 
                ? counts.all 
                : filter === 'Graphic Design' 
                  ? counts.graphic 
                  : counts.web;

              return (
                <button
                  key={filter}
                  onClick={() => {
                    setActiveFilter(filter);
                    if (setPortfolioInitialFilter) setPortfolioInitialFilter(filter);
                  }}
                  id={`page-filter-tab-${filter.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex-grow sm:flex-grow-0 flex items-center justify-center gap-1.5 ${
                    isActive 
                      ? 'bg-brand-blue text-white shadow-sm' 
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-brand-blue dark:bg-slate-800 dark:text-slate-350 dark:hover:text-white border border-slate-200 dark:border-slate-800 hover:border-brand-blue/20'
                  }`}
                >
                  {isWebTab && <Globe className="w-3.5 h-3.5 shrink-0" />}
                  {isGraphicTab && <Palette className="w-3.5 h-3.5 shrink-0" />}
                  <span>{filter} ({count})</span>
                </button>
              );
            })}
          </div>

          {/* Live Search Inputs */}
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Search by title, client, or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-brand-blue dark:focus:border-brand-blue rounded-xl pl-11 pr-4 py-3 text-xs text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-550 focus:outline-hidden focus:ring-1 focus:ring-brand-blue/30 transition-all font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* State A: Loading Indicators */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-3">
            <div className="w-10 h-10 border-4 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin" />
            <p className="text-sm text-slate-400 font-mono">Loading Projects...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          /* State B: Empty Results */
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24 border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-3xl p-10"
          >
            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-400 dark:text-slate-550 mb-4">
              <SlidersHorizontal className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-800 dark:text-white mb-1.5">No Matching Works Found</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-6">
              We couldn't locate any projects matching "{searchQuery}" under "{activeFilter}". Try clearing your search.
            </p>
            <button
              onClick={() => {
                setActiveFilter('All');
                setSearchQuery('');
                if (setPortfolioInitialFilter) setPortfolioInitialFilter(null);
              }}
              className="text-xs font-bold text-brand-blue hover:underline cursor-pointer"
            >
              Reset Filters & Search
            </button>
          </motion.div>
        ) : isAllOrMixed ? (
          /* State C1: Default View - Prioritize Web Platforms at top, then Graphic Designs below */
          <div className="space-y-20">
            {/* Top Priority Tier: Web Platforms */}
            {webProjects.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-brand-blue/10 text-brand-blue">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-white">
                        Web Platforms & Software Systems
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Interactive web applications, online stores, and digital portals ({webProjects.length})
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {webProjects.map((project) => (
                    <div key={project.id} className="h-full">
                      <WebProjectCard
                        id={`portfolio-page-card-${project.id}`}
                        project={project}
                        onSelectProject={(p) => setSelectedProject(p)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Lower Tier: Graphic Design Showcases (Borderless Cards) */}
            {graphicProjects.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-brand-blue/10 text-brand-blue">
                      <Palette className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-white">
                        Graphic Design & Visual Brand Works
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Brand identities, promotional flyers, political campaigns, and commercial posters ({graphicProjects.length})
                      </p>
                    </div>
                  </div>
                </div>

                <motion.div 
                  layout 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  <AnimatePresence mode="popLayout">
                    {graphicProjects.map((project) => (
                      <motion.div
                        key={project.id}
                        id={`portfolio-page-card-${project.id}`}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.35 }}
                        className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-xs hover:shadow-xl border-none transition-all duration-300 flex flex-col h-full"
                        onClick={() => {
                          setSelectedProject(project);
                        }}
                      >
                        {/* Image wrapper */}
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
                          
                          {/* Category tag */}
                          <div className="absolute top-4 left-4 z-20">
                            <span className="text-[10px] font-bold uppercase tracking-widest bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm text-slate-900 dark:text-white px-3.5 py-1.5 rounded-lg shadow-xs">
                              {project.category}
                            </span>
                          </div>
                        </div>

                        {/* Project Info Panel */}
                        <div className="p-6 sm:p-8 flex items-center justify-between gap-6 flex-grow bg-white dark:bg-slate-900">
                          <div className="space-y-2">
                            <h3 className="font-display font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white group-hover:text-brand-blue dark:group-hover:text-brand-blue transition-colors line-clamp-1">
                              {project.title}
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm line-clamp-2 font-normal leading-relaxed">
                              {project.description}
                            </p>
                          </div>
                          <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-all shadow-xs">
                            <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-white transition-colors" />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>
            )}
          </div>
        ) : (
          /* State C2: Filtered / Searched View */
          <div>
            {/* If filtered to Web & Software Projects, render with WebProjectCard */}
            {(activeFilter === 'Web & Software Projects' || activeFilter === 'Website Design') ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="h-full">
                    <WebProjectCard
                      id={`portfolio-page-card-${project.id}`}
                      project={project}
                      onSelectProject={(p) => setSelectedProject(p)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              /* If search has both web and design, prioritize web at top */
              <div className="space-y-16">
                {webProjects.length > 0 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                      <Globe className="w-4 h-4 text-brand-blue" />
                      <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                        Web Platforms ({webProjects.length})
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {webProjects.map((project) => (
                        <div key={project.id} className="h-full">
                          <WebProjectCard
                            id={`portfolio-page-card-${project.id}`}
                            project={project}
                            onSelectProject={(p) => setSelectedProject(p)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {graphicProjects.length > 0 && (
                  <div className="space-y-6">
                    {webProjects.length > 0 && (
                      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                        <Palette className="w-4 h-4 text-brand-blue" />
                        <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                          Design Works ({graphicProjects.length})
                        </h2>
                      </div>
                    )}
                    <motion.div 
                      layout 
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                      <AnimatePresence mode="popLayout">
                        {graphicProjects.map((project) => (
                          <motion.div
                            key={project.id}
                            id={`portfolio-page-card-${project.id}`}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.35 }}
                            className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-xs hover:shadow-xl border-none transition-all duration-300 flex flex-col h-full"
                            onClick={() => {
                              setSelectedProject(project);
                            }}
                          >
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
                              <div className="absolute top-4 left-4 z-20">
                                <span className="text-[10px] font-bold uppercase tracking-widest bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm text-slate-900 dark:text-white px-3.5 py-1.5 rounded-lg shadow-xs">
                                  {project.category}
                                </span>
                              </div>
                            </div>

                            <div className="p-6 sm:p-8 flex items-center justify-between gap-6 flex-grow bg-white dark:bg-slate-900">
                              <div className="space-y-2">
                                <h3 className="font-display font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white group-hover:text-brand-blue dark:group-hover:text-brand-blue transition-colors line-clamp-1">
                                  {project.title}
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm line-clamp-2 font-normal leading-relaxed">
                                  {project.description}
                                </p>
                              </div>
                              <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-all shadow-xs">
                                <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-white transition-colors" />
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
