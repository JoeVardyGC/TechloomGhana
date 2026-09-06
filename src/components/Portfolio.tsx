import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, X, Clock, User, CheckCircle2, ChevronRight, Briefcase, ChevronLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PortfolioItem } from '../types';

export default function Portfolio() {
  const { portfolio, settings, loading, setCurrentView, setSelectedProject } = useApp();
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [simulatedLoading, setSimulatedLoading] = useState<boolean>(false);

  const selectedIds = settings?.selectedHomepagePortfolios || [];
  const selectedItems = selectedIds
    .map(id => portfolio.find(p => p.id === id))
    .filter((p): p is PortfolioItem => !!p);

  const homeDisplayProjects = (selectedItems.length > 0)
    ? selectedItems
    : [...portfolio].slice(-4).reverse();

  const dynamicCategories = Array.from(new Set(homeDisplayProjects.map(p => p.category))).filter((cat): cat is string => typeof cat === 'string' && cat.trim().length > 0);
  const filters = ['All', ...Array.from(new Set(dynamicCategories))];

  const filteredProjects = activeFilter === 'All'
    ? homeDisplayProjects
    : homeDisplayProjects.filter(project => project.category === activeFilter);

  const handleExploreMore = () => {
    setSimulatedLoading(true);
    setTimeout(() => {
      setSimulatedLoading(false);
      setCurrentView('portfolio');
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 600);
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

  return (
    <section id="portfolio" className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-bold tracking-widest text-brand-blue uppercase px-3 py-1 bg-brand-blue/5 rounded-full inline-block">
              Featured Work
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight leading-tight">
              Design Excellence in{' '}
              <span className="blue-gradient-text">Real Action</span>
            </h2>
            <p className="text-slate-500 text-lg font-light">
              We do not just create assets; we solve core business issues through top-tier visual styling. Explore our case files below.
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
                      ? 'bg-slate-900 text-white shadow-sm' 
                      : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-800'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        {loading && portfolio.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 space-y-2">
            <div className="w-6 h-6 border-2 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin" />
            <p className="text-xs text-slate-400 font-mono">Synchronizing Portfolio...</p>
          </div>
        ) : (
          /* Portfolio Masonry Grid */
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl border border-slate-100 transition-all"
                  onClick={() => {
                    setSelectedProject(project);
                  }}
                >
                  {/* Image Wrap */}
                  <div className="relative w-full aspect-[4/5] overflow-hidden bg-slate-100 dark:bg-slate-900">
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
                      <span className="text-[10px] font-bold uppercase tracking-widest bg-white/95 backdrop-blur-sm text-slate-900 px-3 py-1.5 rounded-full shadow-sm">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Info Box */}
                  <div className="p-6 sm:p-8 flex items-end justify-between gap-4">
                    <div className="space-y-1.5">
                      <h3 className="font-display font-extrabold text-lg sm:text-xl text-slate-900 group-hover:text-brand-blue transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-slate-500 text-xs sm:text-sm line-clamp-2 font-light leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-brand-blue group-hover:text-white transition-all shadow-sm">
                      <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Explore Full Portfolio Footer CTA block */}
        <div className="mt-16 text-center space-y-4">
          <button
            onClick={handleExploreMore}
            id="portfolio-explore-more-btn"
            className="group inline-flex items-center gap-2.5 bg-white border border-slate-200 hover:border-brand-blue text-slate-800 hover:text-brand-blue font-bold text-sm px-8 py-3.5 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer"
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
                <span>Explore Full Portfolio</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
