/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import ContactStudio from './components/ContactStudio';
import ClientTrustTicker from './components/ClientTrustTicker';
import FinalCTA from './components/FinalCTA';
import WhatsAppButton from './components/WhatsAppButton';
import DBCommitNotifier from './components/DBCommitNotifier';
import Footer from './components/Footer';
import ScrollReveal from './components/ScrollReveal';
import PortfolioPage from './components/PortfolioPage';
import ProjectDetailsPage from './components/ProjectDetailsPage';

const AdminConsole = lazy(() => import('./components/AdminConsole'));

export default function App() {
  const { loading, currentView, selectedProject, setCurrentView } = useApp();

  if (currentView === 'admin') {
    return (
      <Suspense fallback={
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white font-sans">
          <div className="w-10 h-10 border-4 border-slate-700 border-t-brand-cyan rounded-full animate-spin mb-4" />
          <p className="font-mono text-xs text-slate-400 uppercase tracking-widest">Opening Security Console...</p>
        </div>
      }>
        <AdminConsole onClose={() => setCurrentView('home')} />
      </Suspense>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950 dark:text-slate-150 selection:bg-brand-blue/20 selection:text-slate-900 dark:selection:text-white overflow-x-hidden antialiased">
      {/* Branded Loading Overlay */}
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="branded-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white text-slate-900 select-none"
          >
            {/* Soft background glow */}
            <div className="absolute w-80 h-80 rounded-full bg-brand-blue/10 blur-[110px] animate-pulse pointer-events-none" />
            
            <div className="relative flex flex-col items-center gap-7 text-center">
              {/* Spinner ring structure */}
              <div className="relative flex items-center justify-center w-16 h-16">
                <div className="absolute inset-0 border-4 border-slate-200 rounded-full" />
                <div className="absolute inset-0 border-4 border-t-brand-cyan border-r-brand-blue rounded-full animate-spin" />
                <img
                  src="https://res.cloudinary.com/dokiklssy/image/upload/v1780823234/Techloom_logo_oafutl.png"
                  alt="Techloom logo"
                  className="w-7 h-7 object-contain rounded-md animate-pulse"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Branding and tracking subtexts */}
              <div className="space-y-1.5 pt-1">
                <h3 className="font-display font-black text-xl tracking-widest text-slate-900">
                  TECH<span className="text-brand-blue">LOOM</span>
                </h3>
                <span className="block text-[8px] tracking-[0.3em] font-mono uppercase text-slate-500 animate-pulse">
                  Synchronizing Platform...
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Header Navigation */}
      <Navbar />

      {/* Main Coordinate Stack */}
      <main id="main-content" className="flex-grow">
        {selectedProject ? (
          <ProjectDetailsPage />
        ) : currentView === 'portfolio' ? (
          <PortfolioPage />
        ) : (
          <>
            {/* Section 1: Hero Landing Arena */}
            <Hero />

            {/* Section 2: Social Proof Metrics & Client Trust Ticker */}
            <ClientTrustTicker />

            {/* Section 3: Filterable Category Case Studies & Portfolio (Work Visible Upfront) */}
            <ScrollReveal>
              <Portfolio />
            </ScrollReveal>

            {/* Section 4: Agency Specialized Services Grid */}
            <ScrollReveal>
              <Services />
            </ScrollReveal>

            {/* Section 5: Brand Strategic Value Pillars & Engineering Standards */}
            <ScrollReveal>
              <WhyChooseUs />
            </ScrollReveal>

            {/* Section 6: Star Rated Customer Carousel Reviews */}
            <ScrollReveal>
              <Testimonials />
            </ScrollReveal>

            {/* Section 7: Unified Consultation Hub, Direct Phone/WhatsApp, & Studio Coordinates */}
            <ScrollReveal>
              <ContactStudio />
            </ScrollReveal>

            {/* Section 8: Highly Aesthetic Gradient Call To Action */}
            <ScrollReveal>
              <FinalCTA />
            </ScrollReveal>
          </>
        )}
      </main>

      {/* Floating Messenger Action Pin */}
      <WhatsAppButton />

      {/* Database Commit Status Notifier System */}
      <DBCommitNotifier />

      {/* Footnote columns */}
      <Footer />
    </div>
  );
}

