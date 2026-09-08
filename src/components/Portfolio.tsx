import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ExternalLink, 
  ChevronRight, 
  Globe, 
  Palette, 
  Megaphone, 
  Sparkles, 
  Layers, 
  Lock, 
  CheckCircle2, 
  Award, 
  ArrowUpRight 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PortfolioItem } from '../types';

export default function Portfolio() {
  const { portfolio, settings, loading, setCurrentView, setSelectedProject } = useApp();
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

            cardEl.classList.add('ring-4', 'ring-brand-blue/60', 'ring-offset-4', 'transition-all', 'duration-500');
            setTimeout(() => {
              cardEl.classList.remove('ring-4', 'ring-brand-blue/60', 'ring-offset-4');
            }, 2200);

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

  // 1. Live Web Projects (Prioritized Center Showcase)
  const webProjects = useMemo(() => {
    const webItems = portfolio.filter(p => 
      p.category === 'Website Design' || (p.projectLink && p.projectLink.trim().length > 0)
    );
    // Explicit priority order for the 4 flagship web platforms
    const priorityOrder = [
      'gnuts-official-portal-web',
      'bliss-elle-ghana-ecommerce-web',
      'adaptation-family-sports-web',
      'deon-recreational-centre-web'
    ];
    return [...webItems].sort((a, b) => {
      const idxA = priorityOrder.indexOf(a.id);
      const idxB = priorityOrder.indexOf(b.id);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return 0;
    });
  }, [portfolio]);

  // 2. Upper Designs (Brand & Visual Identity Systems - Placed Above Web)
  const upperDesigns = useMemo(() => {
    const preferredUpperIds = [
      'elan-noir-flyer',
      'bliss-elle-fashion',
      'ammar-presidential-campaign'
    ];
    const foundUpper = preferredUpperIds
      .map(id => portfolio.find(p => p.id === id))
      .filter((p): p is PortfolioItem => !!p);

    if (foundUpper.length >= 3) return foundUpper.slice(0, 3);

    // Fallback: pick top brand or graphic design items not in web
    const remaining = portfolio.filter(p => 
      p.category !== 'Website Design' && 
      !p.projectLink &&
      !preferredUpperIds.includes(p.id)
    );
    return [...foundUpper, ...remaining].slice(0, 3);
  }, [portfolio]);

  // 3. Lower Designs (Campaign, Event & Commercial Flyers - Placed Below Web)
  const lowerDesigns = useMemo(() => {
    const preferredLowerIds = [
      'gnuts-official-media-suite',
      'dr-freda-prempeh-campaign',
      'ttu-wocom-janice-campaign'
    ];
    const foundLower = preferredLowerIds
      .map(id => portfolio.find(p => p.id === id))
      .filter((p): p is PortfolioItem => !!p);

    if (foundLower.length >= 3) return foundLower.slice(0, 3);

    // Fallback: pick campaign or event items not in upper or web
    const upperIds = upperDesigns.map(u => u.id);
    const remaining = portfolio.filter(p => 
      p.category !== 'Website Design' && 
      !p.projectLink &&
      !upperIds.includes(p.id) &&
      !preferredLowerIds.includes(p.id)
    );
    return [...foundLower, ...remaining].slice(0, 3);
  }, [portfolio, upperDesigns]);

  // Available filter tabs
  const filters = ['All', 'Website Design', 'Branding & Identity', 'Campaign Design', 'Flyer Design'];

  // Filtered projects when a specific category tab is selected
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return [];
    if (activeFilter === 'Website Design') return webProjects;
    return portfolio.filter(project => {
      if (activeFilter === 'Branding & Identity') {
        return project.category.includes('Brand') || project.category.includes('Identity');
      }
      if (activeFilter === 'Campaign Design') {
        return project.category.includes('Campaign') || project.category.includes('Political');
      }
      if (activeFilter === 'Flyer Design') {
        return project.category.includes('Flyer') || project.category.includes('Event') || project.category.includes('Social');
      }
      return project.category === activeFilter;
    });
  }, [portfolio, activeFilter, webProjects]);

  const handleExploreMore = () => {
    setSimulatedLoading(true);
    setTimeout(() => {
      setSimulatedLoading(false);
      setCurrentView('portfolio');
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 450);
  };

  // Helper to extract clean domain name from URL
  const formatDomain = (url?: string) => {
    if (!url) return 'techloom.live';
    try {
      const parsed = new URL(url);
      return parsed.hostname;
    } catch {
      return url.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
    }
  };

  return (
    <section id="portfolio" className="py-24 bg-slate-50 dark:bg-slate-950/60 relative transition-colors duration-300">
      {/* Subtle background ambient accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-brand-blue/5 dark:bg-brand-blue/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-bold tracking-widest text-brand-blue uppercase px-3.5 py-1.5 bg-brand-blue/10 dark:bg-brand-blue/20 rounded-full inline-flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              Prioritized Client Showcase
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 dark:text-white tracking-tight leading-tight">
              Design & Web Mastery in{' '}
              <span className="blue-gradient-text">Real Action</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg font-light">
              From production-grade live web platforms to high-conversion brand and political visual systems. Explore our client case files below.
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
                  id={`filter-tab-${filter.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  className={`relative px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-md' 
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {filter === 'Website Design' && (
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
                  )}
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        {loading && portfolio.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-3">
            <div className="w-8 h-8 border-3 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin" />
            <p className="text-xs text-slate-400 font-mono tracking-wide">Synchronizing Portfolio Repository...</p>
          </div>
        ) : activeFilter === 'All' ? (
          /* ================================================================ */
          /* THREE-TIER PRIORITIZED HOMEPAGE SHOWCASE                         */
          /* Tier 1 (UP): Brand & Visual Identity Designs                     */
          /* Tier 2 (CENTER): Prioritized Live Web Platforms                  */
          /* Tier 3 (BELOW): Campaign, Event & Commercial Flyers               */
          /* ================================================================ */
          <div className="space-y-16">
            
            {/* ------------------------------------------------------------ */}
            {/* TIER 1 (UP): BRAND & VISUAL IDENTITY DESIGNS                 */}
            {/* ------------------------------------------------------------ */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 pb-4 border-b border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/80 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 shadow-xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-2 py-0.5 rounded-md border border-indigo-200/40 dark:border-indigo-800/60">
                        Tier 1 • Visual Systems
                      </span>
                      <span className="text-slate-300 dark:text-slate-700">•</span>
                      <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                        Brand & Graphic Design
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display font-black text-slate-900 dark:text-white tracking-tight">
                      Brand & Visual Identity Designs
                    </h3>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 shadow-xs self-start sm:self-auto">
                  <Palette className="w-3.5 h-3.5 text-indigo-500" />
                  Graphic Design Collateral
                </span>
              </div>

              {/* Upper Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upperDesigns.map((project) => (
                  <motion.div
                    key={project.id}
                    id={`portfolio-card-${project.id}`}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl border border-slate-100 dark:border-slate-800 hover:border-indigo-300/60 dark:hover:border-indigo-500/40 transition-all duration-300 flex flex-col"
                    onClick={() => setSelectedProject(project)}
                  >
                    {/* Visual Asset Container */}
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
                      
                      {/* Top Badges: Category & Asset Count */}
                      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs text-indigo-700 dark:text-indigo-300 px-3 py-1.5 rounded-full shadow-xs border border-indigo-100 dark:border-indigo-900/50">
                          <Palette className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                          {project.category}
                        </span>
                        {project.extraImages && project.extraImages.length > 0 && (
                          <span className="text-[10px] font-semibold bg-slate-900/90 text-white dark:bg-white/90 dark:text-slate-900 px-2.5 py-1 rounded-full shadow-xs backdrop-blur-xs">
                            {project.extraImages.length + 1} Assets
                          </span>
                        )}
                      </div>

                      {/* Type Indicator Tag */}
                      <div className="absolute bottom-3 left-4 z-20">
                        <span className="text-[10px] font-bold tracking-wide bg-slate-900/80 text-white px-2.5 py-1 rounded-md backdrop-blur-xs border border-white/10">
                          🎨 Graphic Design
                        </span>
                      </div>
                    </div>

                    {/* Information Box */}
                    <div className="p-6 sm:p-7 flex items-end justify-between gap-4 flex-1">
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 tracking-wide uppercase truncate">
                          {project.client || 'TechLoom Client Studio'}
                        </div>
                        <h4 className="font-display font-extrabold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-brand-blue transition-colors line-clamp-1">
                          {project.title}
                        </h4>
                        <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm line-clamp-2 font-light leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-700 group-hover:bg-brand-blue group-hover:border-brand-blue transition-all shadow-xs">
                        <ChevronRight className="w-4 h-4 text-slate-600 dark:text-slate-300 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ------------------------------------------------------------ */}
            {/* TIER 2 (CENTER): PRIORITIZED LIVE WEB PLATFORMS & PORTALS    */}
            {/* ------------------------------------------------------------ */}
            <div className="relative rounded-3xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white p-6 sm:p-10 lg:p-12 shadow-2xl border border-slate-800 overflow-hidden">
              {/* Radial glows inside container */}
              <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-blue/15 blur-[120px] rounded-full pointer-events-none" />
              <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

              {/* Spotlight Section Header */}
              <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-slate-800">
                <div className="space-y-3 max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-extrabold tracking-wide">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span>PRIORITIZED SHOWCASE • LIVE WEB PLATFORMS</span>
                  </div>
                  <h3 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight">
                    Production Web Applications & Digital Portals
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                    Interactive web platforms, national union secretariats, luxury e-commerce boutiques, and real-time sports prediction analytics engineered with precision.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <span className="px-3.5 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs font-mono text-cyan-300">
                    4 Live Platforms
                  </span>
                  <span className="px-3.5 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs font-mono text-emerald-300">
                    Multi-Screen Views
                  </span>
                </div>
              </div>

              {/* Spotlight Web Cards Grid (2x2 prominent layout) */}
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {webProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    id={`portfolio-card-${project.id}`}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="group relative cursor-pointer overflow-hidden rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 flex flex-col"
                    onClick={() => setSelectedProject(project)}
                  >
                    {/* Simulated Modern Browser Chrome Bar */}
                    <div className="bg-slate-950/90 px-4 py-2.5 border-b border-slate-800/90 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                      </div>
                      
                      {/* Browser Simulated Address Bar */}
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900/90 border border-slate-800 text-[11px] font-mono text-slate-400 max-w-[240px] sm:max-w-xs truncate">
                        <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span className="truncate text-slate-300">{formatDomain(project.projectLink)}</span>
                      </div>

                      <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="hidden sm:inline">200 OK</span>
                      </div>
                    </div>

                    {/* Screenshot Showcase */}
                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-950">
                      <div className="absolute inset-0 bg-slate-950/15 group-hover:bg-slate-950/35 z-10 transition-colors duration-300" />
                      <img
                        src={project.image}
                        alt={project.title}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/portfolio-assets/gnuts-national-portal-web.jpg';
                        }}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top block transition-transform duration-600 ease-out group-hover:scale-104"
                      />

                      {/* Floating Badges */}
                      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-emerald-500/95 text-white px-3 py-1.5 rounded-full shadow-lg backdrop-blur-xs">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                          </span>
                          <span>Live Web Platform</span>
                        </span>

                        <span className="text-[10px] font-medium bg-slate-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/20 backdrop-blur-xs">
                          {project.extraImages && project.extraImages.length > 0
                            ? `${project.extraImages.length + 1} Multi-Screen Views`
                            : 'Responsive Views'}
                        </span>
                      </div>

                      {/* Quick Scope Overlay at bottom of screenshot */}
                      <div className="absolute bottom-3 left-4 right-4 z-20 flex flex-wrap items-center gap-1.5 pointer-events-none">
                        {project.scope && project.scope.slice(0, 2).map((item, idx) => (
                          <span key={idx} className="text-[10px] font-medium bg-slate-950/85 text-slate-200 px-2 py-0.5 rounded backdrop-blur-xs border border-white/10">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Content & Action Bar */}
                    <div className="p-6 sm:p-7 flex flex-col justify-between gap-5 flex-1 bg-slate-900/60">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase">
                            {project.client || 'Techloom Web Client'}
                          </span>
                          <span className="text-[11px] font-mono text-slate-400">
                            Website Design & Architecture
                          </span>
                        </div>
                        <h4 className="font-display font-extrabold text-lg sm:text-xl text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                          {project.title}
                        </h4>
                        <p className="text-slate-300 text-xs sm:text-sm line-clamp-2 font-light leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      {/* Action Triggers */}
                      <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                        {project.projectLink ? (
                          <a
                            href={project.projectLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            id={`visit-site-${project.id}`}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500 text-emerald-300 hover:text-white border border-emerald-500/30 text-xs font-bold transition-all shadow-xs group/btn"
                          >
                            <Globe className="w-3.5 h-3.5" />
                            <span>Visit Live Platform</span>
                            <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                          </a>
                        ) : (
                          <span className="text-xs text-slate-400 font-mono">Platform Active</span>
                        )}

                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 group-hover:text-white transition-colors">
                          <span>View Case Study</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ------------------------------------------------------------ */}
            {/* TIER 3 (BELOW): CAMPAIGN, EVENT & COMMERCIAL FLYERS          */}
            {/* ------------------------------------------------------------ */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 pb-4 border-b border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200/60 dark:border-amber-800/80 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0 shadow-xs">
                    <Megaphone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/80 px-2 py-0.5 rounded-md border border-amber-200/40 dark:border-amber-800/60">
                        Tier 3 • Event & Marketing
                      </span>
                      <span className="text-slate-300 dark:text-slate-700">•</span>
                      <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                        Campaign & Commercial Flyers
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display font-black text-slate-900 dark:text-white tracking-tight">
                      Campaign, Event & Commercial Flyers
                    </h3>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 shadow-xs self-start sm:self-auto">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  High-Impact Marketing Media
                </span>
              </div>

              {/* Lower Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {lowerDesigns.map((project) => (
                  <motion.div
                    key={project.id}
                    id={`portfolio-card-${project.id}`}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl border border-slate-100 dark:border-slate-800 hover:border-amber-300/60 dark:hover:border-amber-500/40 transition-all duration-300 flex flex-col"
                    onClick={() => setSelectedProject(project)}
                  >
                    {/* Visual Asset Container */}
                    <div className="relative w-full aspect-[4/5] overflow-hidden bg-slate-100 dark:bg-slate-950">
                      <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-slate-950/30 z-10 transition-colors duration-300" />
                      <img
                        src={project.image}
                        alt={project.title}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/portfolio-assets/gnuts-official-media-suite.jpg';
                        }}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top block transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                      
                      {/* Top Badges: Category & Asset Count */}
                      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs text-amber-700 dark:text-amber-300 px-3 py-1.5 rounded-full shadow-xs border border-amber-100 dark:border-amber-900/50">
                          <Megaphone className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                          {project.category}
                        </span>
                        {project.extraImages && project.extraImages.length > 0 && (
                          <span className="text-[10px] font-semibold bg-slate-900/90 text-white dark:bg-white/90 dark:text-slate-900 px-2.5 py-1 rounded-full shadow-xs backdrop-blur-xs">
                            {project.extraImages.length + 1} Assets
                          </span>
                        )}
                      </div>

                      {/* Type Indicator Tag */}
                      <div className="absolute bottom-3 left-4 z-20">
                        <span className="text-[10px] font-bold tracking-wide bg-slate-900/80 text-white px-2.5 py-1 rounded-md backdrop-blur-xs border border-white/10">
                          📢 Campaign & Event Flyer
                        </span>
                      </div>
                    </div>

                    {/* Information Box */}
                    <div className="p-6 sm:p-7 flex items-end justify-between gap-4 flex-1">
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="text-[11px] font-bold text-amber-600 dark:text-amber-400 tracking-wide uppercase truncate">
                          {project.client || 'TechLoom Client Campaign'}
                        </div>
                        <h4 className="font-display font-extrabold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-brand-blue transition-colors line-clamp-1">
                          {project.title}
                        </h4>
                        <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm line-clamp-2 font-light leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-700 group-hover:bg-brand-blue group-hover:border-brand-blue transition-all shadow-xs">
                        <ChevronRight className="w-4 h-4 text-slate-600 dark:text-slate-300 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        ) : (
          /* ================================================================ */
          /* FILTERED CATEGORY GRID                                           */
          /* ================================================================ */
          <motion.div 
            layout 
            className={`grid gap-8 ${
              activeFilter === 'Website Design' 
                ? 'grid-cols-1 lg:grid-cols-2' 
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => {
                const isWeb = project.category === 'Website Design' || (project.projectLink && project.projectLink.trim().length > 0);

                if (isWeb) {
                  return (
                    <motion.div
                      key={project.id}
                      id={`portfolio-card-${project.id}`}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35 }}
                      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-slate-900 text-white shadow-xl border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 flex flex-col"
                      onClick={() => setSelectedProject(project)}
                    >
                      {/* Browser Bar */}
                      <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400 max-w-[240px] truncate">
                          <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span className="truncate text-slate-300">{formatDomain(project.projectLink)}</span>
                        </div>
                        <span className="text-[11px] font-mono text-emerald-400 font-semibold">Live</span>
                      </div>

                      {/* Image Preview */}
                      <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-950">
                        <img
                          src={project.image}
                          alt={project.title}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/portfolio-assets/gnuts-national-portal-web.jpg';
                          }}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-top block transition-transform duration-500 group-hover:scale-104"
                        />
                        <div className="absolute top-4 left-4 z-20">
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-emerald-500 text-white px-3 py-1.5 rounded-full shadow-md">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                            </span>
                            <span>Live Web Platform</span>
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col justify-between gap-4 flex-1">
                        <div>
                          <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                            {project.client}
                          </div>
                          <h4 className="font-display font-extrabold text-lg text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                            {project.title}
                          </h4>
                          <p className="text-slate-300 text-xs sm:text-sm line-clamp-2 mt-1">
                            {project.description}
                          </p>
                        </div>
                        <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
                          {project.projectLink && (
                            <a
                              href={project.projectLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-white"
                            >
                              <span>Visit Site</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                          )}
                          <span className="inline-flex items-center gap-1 text-xs text-slate-400 group-hover:text-white">
                            <span>Case Study</span>
                            <ChevronRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                }

                return (
                  <motion.div
                    key={project.id}
                    id={`portfolio-card-${project.id}`}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35 }}
                    className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl border border-slate-100 dark:border-slate-800 transition-all duration-300 flex flex-col"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="relative w-full aspect-[4/5] overflow-hidden bg-slate-100 dark:bg-slate-950">
                      <img
                        src={project.image}
                        alt={project.title}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/portfolio-assets/elan-noir-flyer.jpg';
                        }}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top block transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 z-20">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-white px-3 py-1.5 rounded-full shadow-xs">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex items-end justify-between gap-4 flex-1">
                      <div className="space-y-1">
                        <h4 className="font-display font-extrabold text-base text-slate-900 dark:text-white group-hover:text-brand-blue transition-colors line-clamp-1">
                          {project.title}
                        </h4>
                        <p className="text-slate-500 dark:text-slate-400 text-xs line-clamp-2 font-light">
                          {project.description}
                        </p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-700 group-hover:bg-brand-blue group-hover:text-white transition-all shadow-xs">
                        <ChevronRight className="w-4 h-4 text-slate-600 dark:text-slate-300 group-hover:text-white" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Explore Full Portfolio Footer CTA block */}
        <div className="mt-20 text-center space-y-4">
          <button
            onClick={handleExploreMore}
            id="portfolio-explore-more-btn"
            className="group inline-flex items-center gap-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-blue text-slate-800 dark:text-slate-200 hover:text-brand-blue font-bold text-sm px-8 py-3.5 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer"
            disabled={simulatedLoading}
          >
            {simulatedLoading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-brand-blue" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Retrieving Archive...</span>
              </>
            ) : (
              <>
                <span>Explore Full 69+ Case Portfolio</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

