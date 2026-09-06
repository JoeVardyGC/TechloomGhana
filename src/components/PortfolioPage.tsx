import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Search, 
  X, 
  ChevronRight, 
  SlidersHorizontal,
  FolderOpen
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function PortfolioPage() {
  const { portfolio, loading, setCurrentView, setSelectedProject } = useApp();
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Compute dynamic categories
  const dynamicCategories = useMemo(() => {
    const cats = Array.from(new Set(portfolio.map(p => p.category)))
      .filter((cat): cat is string => typeof cat === 'string' && cat.trim().length > 0);
    return ['All', ...Array.from(new Set(['Branding', 'Flyer Design', 'Social Media Design', 'Website Design', ...cats]))];
  }, [portfolio]);

  // Filter based on both active filter tab and searchQuery
  const filteredProjects = useMemo(() => {
    return portfolio.filter(project => {
      const matchesFilter = activeFilter === 'All' || project.category === activeFilter;
      const matchesSearch = searchQuery.trim() === '' || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.client && project.client.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (project.category && project.category.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesFilter && matchesSearch;
    });
  }, [portfolio, activeFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-28 pb-24 transition-colors duration-300">
      
      {/* Decorative background glow */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-[#00C2FF]/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        
        {/* Navigation Breadcrumb & Back Action */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'instant' });
            }}
            id="portfolio-back-btn"
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-slate-900 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-950 text-slate-800 dark:text-slate-100 font-bold text-xs border border-slate-200/65 dark:border-slate-800 transition-all shadow-sm duration-250 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home Showcase</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 dark:text-slate-500">
            <span>Portfolio Archive</span>
            <span>/</span>
            <span className="text-brand-blue font-bold">All Work ({portfolio.length})</span>
          </div>
        </div>

        {/* Page Main Header */}
        <div className="max-w-3xl space-y-5 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-blue/5 dark:bg-brand-blue/10 border border-brand-blue/10 rounded-full">
            <FolderOpen className="w-3.5 h-3.5 text-brand-blue animate-pulse" />
            <span className="text-xs font-bold tracking-widest text-brand-blue uppercase">Design Ledger</span>
          </div>
          <h1 className="font-display font-[900] text-4xl sm:text-6xl text-slate-900 dark:text-white tracking-tight leading-none">
            Selected Design <span className="blue-gradient-text">Masterpieces</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg sm:text-xl font-light leading-relaxed">
            A comprehensive journal of absolute design excellence. Use the tools below to filter through our diverse disciplines and custom business solutions.
          </p>
        </div>

        {/* Utility / Search & Filters Controls Container */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col lg:flex-row gap-6 justify-between items-center mb-12 transition-all">
          
          {/* Active Filter Tabs list */}
          <div className="flex flex-wrap gap-2 w-full lg:w-auto">
            {dynamicCategories.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  id={`page-filter-tab-${filter.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex-grow sm:flex-grow-0 ${
                    isActive 
                      ? 'bg-brand-blue text-white shadow-sm dark:bg-white dark:text-slate-950' 
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-brand-blue dark:bg-slate-800 dark:text-slate-350 dark:hover:text-white border border-slate-200 dark:border-slate-800 hover:border-brand-blue/20'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          {/* Live Search Inputs */}
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Search by title, client, tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-brand-blue dark:focus:border-brand-blue rounded-xl pl-11 pr-4 py-3 text-xs text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-550 focus:outline-none focus:ring-1 focus:ring-brand-blue/30 transition-all font-medium"
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
            <p className="text-sm text-slate-400 font-mono">Synchronizing Chronicles...</p>
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
              We couldn't locate any projects matching "{searchQuery}" under the "{activeFilter}" filter state. Try clearing your search fields.
            </p>
            <button
              onClick={() => {
                setActiveFilter('All');
                setSearchQuery('');
              }}
              className="text-xs font-bold text-brand-blue hover:underline cursor-pointer"
            >
              Reset Filters & Search View
            </button>
          </motion.div>
        ) : (
          /* State C: Showcase Masonry/Grid */
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-xs hover:shadow-xl border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-300"
                  onClick={() => {
                    setSelectedProject(project);
                  }}
                >
                  {/* Image wrapper */}
                  <div className="relative w-full aspect-[4/5] overflow-hidden bg-slate-100 dark:bg-slate-950">
                    <div className="absolute inset-0 bg-slate-950/15 group-hover:bg-slate-950/30 z-10 transition-colors duration-300" />
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

                    {/* Completion Status Indicator or Client Tag */}
                    {project.client && (
                      <div className="absolute top-4 right-4 z-20">
                        <span className="text-[9px] font-mono tracking-wider font-bold uppercase block bg-slate-900/40 text-slate-100 px-2.5 py-1 rounded-md backdrop-blur-md border border-white/5">
                          @ {project.client}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Project Info Panel */}
                  <div className="p-6 sm:p-8 flex items-center justify-between gap-6">
                    <div className="space-y-2">
                      <h3 className="font-display font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white group-hover:text-brand-blue dark:group-hover:text-brand-blue transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm line-clamp-2 font-normal leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-800 group-hover:bg-brand-blue group-hover:text-white dark:group-hover:text-white transition-all shadow-xs">
                      <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
