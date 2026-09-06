import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Sparkles, Sun, Moon, Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const { isAdmin, currentView, setCurrentView } = useApp();

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      console.warn("Could not save theme to localStorage:", e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const menuContainerVariants = {
    hidden: { opacity: 0, height: 0 },
    show: {
      opacity: 1,
      height: 'auto',
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.02,
        duration: 0.35,
        ease: 'easeOut'
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        staggerChildren: 0.03,
        staggerDirection: -1,
        duration: 0.25,
        ease: 'easeIn'
      }
    }
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: -15 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 24 
      } 
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      transition: { 
        duration: 0.15 
      } 
    }
  };

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Testimonials', href: '#testimonials' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Background effect
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Scroll Progress Indicator
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      // Active Section Detection
      const sections = ['services', 'portfolio', 'why-us', 'testimonials'];
      let currentSection = 'home';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    if (id === 'portfolio') {
      setCurrentView('portfolio');
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const offset = 80; // Navbar height
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 150);
    } else {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80; // Navbar height
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <>
      <header
        id="navbar"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'glass py-3 shadow-md border-b border-b-slate-100/40' 
            : 'bg-transparent py-5'
        }`}
      >
        {/* Scroll Progress Bar */}
        <div 
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-brand-blue to-brand-cyan transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Techloom Brand Logo */}
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 group text-left cursor-pointer font-sans"
            id="nav-logo"
            title="Techloom Creative Labs"
          >
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-slate-200/60 bg-white flex items-center justify-center p-0.5 transition-transform group-hover:scale-105 shadow-xs">
              <img 
                src="https://res.cloudinary.com/dokiklssy/image/upload/ar_1:1,c_crop,g_north_west,h_1827,w_1827,x_887,y_897/f_auto/q_auto/Techloom_logo_oafutl.png" 
                alt="Techloom logo" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-display font-[900] text-xl sm:text-2xl tracking-tight text-slate-900 flex items-center">
              Techloom<span className="text-[#00C2FF] ml-0.5 select-none animate-pulse">●</span>
            </span>
          </button>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const id = link.href.substring(1);
              const isActive = (id === 'portfolio' && currentView === 'portfolio') || (activeSection === id && currentView === 'home');
              return (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(id)}
                  id={`nav-link-${id}`}
                  className={`relative font-medium text-sm transition-colors duration-200 cursor-pointer ${
                    isActive ? 'text-brand-blue' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="absolute -bottom-1.5 left-0 w-full h-[2px] bg-brand-blue rounded-full"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Dynamic Desktop Audit CTA & Theme Toggle */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              id="theme-toggle-desktop"
              className="p-2.5 rounded-full bg-slate-50 border border-slate-100 hover:border-slate-200 text-slate-600 hover:text-slate-950 hover:bg-slate-100 transition-all cursor-pointer flex items-center justify-center shadow-sm w-9.5 h-9.5"
              aria-label="Toggle Theme"
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            >
              {theme === 'light' ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />}
            </button>

            {/* Admin trigger gear removed. Activated via brand logo triple-click instead. */}

            <button
              onClick={() => scrollToSection('audit')}
              id="nav-audit-cta"
              className="group flex items-center gap-2 bg-slate-900 text-white hover:bg-brand-blue px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-brand-blue/25 hover:-translate-y-0.5 cursor-pointer"
            >
              Get Free Consultation
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.span>
            </button>
          </div>

          {/* Hamburger Mobile Menu Toggle & Theme Toggle combo */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              id="theme-toggle-mobile-bar"
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer w-9 h-9 flex items-center justify-center border border-transparent"
              aria-label="Toggle Theme"
              title="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />}
            </button>

            {/* Mobile Admin trigger gear removed. Activated via brand logo triple-tap instead. */}

            <button
              onClick={() => setIsOpen(!isOpen)}
              id="nav-menu-toggle"
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5.1 h-5.1" /> : <Menu className="w-5.1 h-5.1" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuContainerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed inset-x-0 top-[70px] z-40 bg-white shadow-xl border-b border-b-slate-100 px-6 py-8 flex flex-col gap-6 md:hidden glass overflow-hidden"
          >
            <div className="flex flex-col gap-4">
              <motion.span
                variants={menuItemVariants}
                className="text-[10px] font-mono text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2"
              >
                Navigation Menu
              </motion.span>
              {navLinks.map((link) => {
              const id = link.href.substring(1);
              const isActive = (id === 'portfolio' && currentView === 'portfolio') || (activeSection === id && currentView === 'home');
                return (
                  <motion.button
                    key={link.name}
                    variants={menuItemVariants}
                    onClick={() => scrollToSection(id)}
                    id={`mobile-nav-link-${id}`}
                    className={`flex items-center justify-between py-2 text-base font-semibold text-left transition-all cursor-pointer ${
                      isActive ? 'text-brand-blue pl-2 border-l-2 border-brand-blue' : 'text-slate-700'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && <Sparkles className="w-4 h-4 text-brand-blue" />}
                  </motion.button>
                );
              })}
            </div>

            {/* Beautiful Theme Segment Controls inside Mobile Drawer */}
            <motion.div
              variants={menuItemVariants}
              className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100/50"
            >
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-brand-blue" />
                <span className="text-xs font-semibold text-slate-700">Display Theme</span>
              </div>
              <div className="flex gap-1 bg-white p-1 rounded-xl border border-slate-100/40 shadow-xs">
                <button
                  onClick={() => setTheme('light')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                    theme === 'light'
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" /> Light
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                    theme === 'dark'
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" /> Dark
                </button>
              </div>
            </motion.div>

            <motion.div variants={menuItemVariants} className="flex flex-col gap-3 mt-2">
              <button
                onClick={() => scrollToSection('audit')}
                id="mobile-nav-audit-cta"
                className="w-full text-center bg-gradient-to-r from-brand-blue to-brand-cyan hover:from-brand-blue/90 hover:to-brand-cyan/95 text-white py-3.5 rounded-xl font-bold text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Get Free Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
