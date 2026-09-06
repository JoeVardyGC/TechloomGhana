import { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Star, ArrowUpRight, Facebook, Instagram, Youtube, Twitter, Moon, Sun } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';

type ThemeType = 'blue' | 'purple' | 'emerald' | 'rose';

export default function Hero() {
  const { settings } = useApp();
  const [activeTheme, setActiveTheme] = useState<ThemeType>('blue');

  const slides = [
    {
      image: settings?.heroCardImage1 || settings?.heroCardImage || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
      text: settings?.heroCardText1 || settings?.heroCardText || "Complete visual identity frameworks, modern logo systems, and comprehensive brand guidelines engineered to build deep trust."
    },
    {
      image: settings?.heroCardImage2 || "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=600&q=80",
      text: settings?.heroCardText2 || "High-impact flyer designs, corporate pitch decks, and press-ready print materials crafted to stop the scroll and drive conversions."
    },
    {
      image: settings?.heroCardImage3 || "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80",
      text: settings?.heroCardText3 || "Scroll-stopping social media visual kits, custom ad templates, and motion storytelling graphics that elevate brand authority."
    },
    {
      image: settings?.heroCardImage4 || "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=600&q=80",
      text: settings?.heroCardText4 || "State-of-the-art UI/UX design and responsive web platforms built for speed, elegance, and enterprise lead generation."
    }
  ];
  
  // Bulletproof reactive observer to check document dark mode class in real-time
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    // Sync initial state
    setIsDark(document.documentElement.classList.contains('dark'));

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDark(document.documentElement.classList.contains('dark'));
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const [activeSlide, setActiveSlide] = useState(0);

  // Automatic color transition loop cycling every 5 seconds
  useEffect(() => {
    const cycle: ThemeType[] = ['blue', 'purple', 'emerald', 'rose'];
    const interval = setInterval(() => {
      setActiveTheme((prev) => {
        const currentIndex = cycle.indexOf(prev);
        const nextIndex = (currentIndex + 1) % cycle.length;
        setActiveSlide(nextIndex);
        return cycle[nextIndex];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Framer Motion Parallax Performance Setup
  const { scrollY } = useScroll();
  const yBgGrid = useTransform(scrollY, [0, 1000], [0, 150]);
  const yGlow1 = useTransform(scrollY, [0, 1000], [0, -120]);
  const yGlow2 = useTransform(scrollY, [0, 1000], [0, 80]);
  const yFloating1 = useTransform(scrollY, [0, 1000], [0, -60]);
  const yFloating2 = useTransform(scrollY, [0, 1000], [0, 120]);
  const yHeroCard = useTransform(scrollY, [0, 1000], [0, 45]);

  const themeColors = {
    blue: {
      primary: '#00C2FF',
      gradient: 'from-[#0A84FF] to-[#00C2FF]',
      accentBg: {
        light: 'bg-blue-50/80 text-brand-blue border-blue-200/60',
        dark: 'bg-[#00C2FF]/10 text-[#00C2FF] border-[#00C2FF]/20'
      },
      glow: {
        light: 'shadow-[0_0_40px_rgba(10,132,255,0.12)]',
        dark: 'shadow-[0_0_40px_rgba(0,194,255,0.22)]'
      },
      accentText: {
        light: 'text-brand-blue',
        dark: 'text-[#00C2FF]'
      }
    },
    purple: {
      primary: '#9D4EDD',
      gradient: 'from-[#9D4EDD] to-[#FF6EE6]',
      accentBg: {
        light: 'bg-purple-50/80 text-purple-600 border-purple-200/60',
        dark: 'bg-[#9D4EDD]/10 text-[#9D4EDD] border-[#9D4EDD]/20'
      },
      glow: {
        light: 'shadow-[0_0_40px_rgba(168,85,247,0.12)]',
        dark: 'shadow-[0_0_40px_rgba(157,78,221,0.22)]'
      },
      accentText: {
        light: 'text-purple-600',
        dark: 'text-[#9D4EDD]'
      }
    },
    emerald: {
      primary: '#00F5D4',
      gradient: 'from-[#00F5D4] to-[#01BEA6]',
      accentBg: {
        light: 'bg-teal-50/80 text-teal-600 border-teal-200/60',
        dark: 'bg-[#00F5D4]/10 text-[#00F5D4] border-[#00F5D4]/20'
      },
      glow: {
        light: 'shadow-[0_0_40px_rgba(20,184,166,0.12)]',
        dark: 'shadow-[0_0_40px_rgba(0,245,212,0.22)]'
      },
      accentText: {
        light: 'text-teal-600',
        dark: 'text-[#00F5D4]'
      }
    },
    rose: {
      primary: '#FF5E7E',
      gradient: 'from-[#FF5E7E] to-[#FF9F43]',
      accentBg: {
        light: 'bg-rose-50/80 text-rose-600 border-rose-200/60',
        dark: 'bg-[#FF5E7E]/10 text-[#FF5E7E] border-[#FF5E7E]/20'
      },
      glow: {
        light: 'shadow-[0_0_40px_rgba(244,63,94,0.12)]',
        dark: 'shadow-[0_0_40px_rgba(255,94,126,0.22)]'
      },
      accentText: {
        light: 'text-rose-600',
        dark: 'text-[#FF5E7E]'
      }
    },
  };

  const scrollToSection = (id: string) => {
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
  };

  return (
    <section
      id="hero"
      className={`relative isolate min-h-screen pt-32 pb-20 overflow-hidden flex items-center justify-center transition-colors duration-500 ${
        isDark ? 'text-white' : 'text-slate-900'
      }`}
    >
      {/* 0. BASE BACKGROUND LAYER FOR CHROMATIC TRANSITIONS */}
      <div className={`absolute inset-0 -z-30 transition-colors duration-500 ${
        isDark ? 'bg-slate-950' : 'bg-slate-50'
      }`} />

      {settings?.heroBgImage && (
        <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none animate-fadeIn">
          <img 
            src={settings.heroBgImage} 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-35 dark:opacity-[0.24] pointer-events-none" 
            referrerPolicy="no-referrer"
          />
          <div className={`absolute inset-0 bg-gradient-to-b ${isDark ? 'from-slate-950/70 via-slate-950/85 to-slate-950' : 'from-slate-50/70 via-slate-50/85 to-slate-50'}`} />
        </div>
      )}
      {/* 1. PARALLAX LAYER: Background ambient color glows */}
      <motion.div 
        style={{ y: yGlow1 }}
        className={`absolute top-[-5%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-br ${
          themeColors[activeTheme].gradient
        } ${isDark ? 'opacity-15' : 'opacity-[0.11]'} blur-[120px] transition-all duration-[1200ms] -z-10 pointer-events-none`} 
      />
      <motion.div 
        style={{ y: yGlow2 }}
        className="absolute bottom-[5%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-tr from-indigo-500/10 to-teal-500/5 blur-[100px] -z-10 pointer-events-none" 
      />

      {/* 2. PARALLAX LAYER: Cyber Space subtle grid layout conforming to theme mode */}
      <motion.div 
        style={{ y: yBgGrid }}
        className={`absolute inset-0 bg-repeat bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_75%,transparent_100%)] pointer-events-none -z-10 ${
          isDark 
            ? "bg-[linear-gradient(rgba(240,244,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(240,244,255,0.02)_1px,transparent_1px)]"
            : "bg-[linear-gradient(rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.035)_1px,transparent_1px)]"
        }`} 
      />

      {/* 3. PARALLAX LAYER: Floating celestial orbs & sparkles icons */}
      <motion.div 
        style={{ y: yFloating1 }}
        className="absolute top-[20%] left-[8%] z-10 pointer-events-none hidden md:block"
      >
        <div className={`p-3 rounded-full border shadow-md flex items-center justify-center backdrop-blur-md animate-bounce ${
          isDark ? 'bg-slate-900/60 border-white/10 text-brand-blue/60' : 'bg-white/80 border-slate-200 text-brand-blue'
        }`}
        style={{ animationDuration: '6s' }}>
          <Sparkles className="w-5 h-5" />
        </div>
      </motion.div>

      <motion.div 
        style={{ y: yFloating2 }}
        className="absolute bottom-[25%] right-[10%] z-10 pointer-events-none hidden md:block"
      >
        <div className={`p-4 rounded-full border shadow-lg flex items-center justify-center backdrop-blur-md animate-bounce ${
          isDark ? 'bg-slate-900/60 border-white/10 text-amber-400/70' : 'bg-white/80 border-slate-200 text-amber-500'
        }`}
        style={{ animationDuration: '8s' }}>
          <Star className="w-4 h-4 fill-current" />
        </div>
      </motion.div>

      {/* Main Outer Dashboard Container wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative">
        <motion.div 
          style={{ y: yHeroCard }}
          className={`relative w-full rounded-[38px] border overflow-hidden p-6 sm:p-12 transition-all duration-500 backdrop-blur-lg ${
            isDark 
              ? `border-white/10 ${settings?.heroBgImage ? 'bg-slate-950/75' : 'bg-slate-950'} shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)]` 
              : `border-slate-200/60 ${settings?.heroBgImage ? 'bg-white/75' : 'bg-white'} shadow-[0_32px_64px_-16px_rgba(0,10,50,0.05)]`
          }`}
        >
          {/* Ambient card decor overlay */}
          <div className={`absolute -top-12 -left-12 w-28 h-28 rounded-full bg-gradient-to-br ${
            themeColors[activeTheme].gradient
          } opacity-25 blur-2xl pointer-events-none`} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center pt-8 md:pt-14 pb-4">
            
            {/* LEFT COLUMN: Hero text layout and primary actions */}
            <div className="lg:col-span-7 flex flex-col items-start gap-8">
              
              {/* Dynamic decorative theme switcher & status badge */}
              <div className="flex flex-wrap items-center gap-3">
                <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md transition-all duration-500 ${
                  isDark 
                    ? themeColors[activeTheme].accentBg.dark 
                    : themeColors[activeTheme].accentBg.light
                }`}>
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  <span>{settings?.heroBadgeText || "Creative Excellence & Strategy"}</span>
                </span>
                
                {/* Real-time brand style Sandbox Switcher */}
                <div className={`flex items-center gap-2.5 border rounded-full px-3.5 py-1.5 shadow-sm transition-colors duration-500 ${
                  isDark ? 'bg-white/5 border-white/10' : 'bg-slate-100/70 border-slate-200'
                }`}>
                  {(['blue', 'purple', 'emerald', 'rose'] as ThemeType[]).map((themeName) => (
                    <button
                      key={themeName}
                      onClick={() => {
                        setActiveTheme(themeName);
                        const cycle: ThemeType[] = ['blue', 'purple', 'emerald', 'rose'];
                        setActiveSlide(cycle.indexOf(themeName));
                      }}
                      className={`w-3.5 h-3.5 rounded-full transition-all relative ${
                        themeName === 'blue' ? 'bg-[#00C2FF]' :
                        themeName === 'purple' ? 'bg-[#9D4EDD]' :
                        themeName === 'emerald' ? 'bg-[#00F5D4]' : 'bg-[#FF5E7E]'
                      } ${activeTheme === themeName ? `ring-2 ${
                        themeName === 'blue' ? 'ring-[#00C2FF]' :
                        themeName === 'purple' ? 'ring-[#9D4EDD]' :
                        themeName === 'emerald' ? 'ring-[#00F5D4]' : 'ring-[#FF5E7E]'
                      } scale-125 z-10` : 'opacity-50 hover:opacity-100 hover:scale-110'}`}
                      title={`Toggle accent brand: ${themeName}`}
                    />
                  ))}
                </div>
              </div>

              {/* Master Display Heading mimicking Image Structure */}
              <div className="space-y-4 w-full">
                <h1 className="font-sans font-extrabold text-4xl sm:text-5xl xl:text-6xl tracking-tight leading-[1.09] text-balance transition-colors duration-500 text-slate-900 dark:text-white">
                  {settings?.heroTitleLine1 || "Design That Makes"}
                  <span className="block mt-1">{settings?.heroTitleLine2 || "Your Brand Impossible To Ignore."}</span>
                </h1>
                
                {/* Static thin accent spacer line matching image horizontal divider */}
                <div className="relative pt-1.5">
                  <div className={`h-[2px] bg-gradient-to-r ${themeColors[activeTheme].gradient} to-transparent w-full md:w-[85%] transition-all duration-1000`} />
                </div>
              </div>

               {/* Elegant narrative tailored beautifully for the studio background or customizable */}
              <p className={`text-base sm:text-lg leading-relaxed max-w-2xl font-light font-sans transition-colors duration-500 ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {settings?.heroDescription || "We custom-engineer premium visual branding, high-speed digital platforms, and high-converting marketing flyers crafted to position your enterprise ahead of the competition."}
              </p>

              {/* CTA Pill Configuration from Image */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
                <button
                  onClick={() => scrollToSection('audit')}
                  className={`group flex items-center justify-center gap-2.5 bg-gradient-to-r ${
                    themeColors[activeTheme].gradient
                  } text-slate-950 font-black text-xs uppercase tracking-widest px-8 h-12 rounded-full shadow-lg ${
                    isDark ? themeColors[activeTheme].glow.dark : themeColors[activeTheme].glow.light
                  } hover:scale-[1.02] active:scale-95 transition-all cursor-pointer`}
                >
                  <span className="text-white">Get Started</span>
                  <div className="w-5 h-5 rounded-full bg-slate-950/10 flex items-center justify-center">
                    <ArrowRight className="w-3.5 h-3.5 text-white transition-transform group-hover:translate-x-0.5" />
                  </div>
                </button>
              </div>

              {/* Connect Social bar with perfectly matching outlines */}
              <div className="flex items-center gap-3 pt-6 border-t w-full transition-colors duration-500 border-white/5 dark:border-white/5">
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 dark:text-slate-500 pr-2">Connect Studio:</span>
                {[
                  { icon: Facebook, href: settings?.facebookLink || '#', label: 'Facebook Link' },
                  { icon: Twitter, href: settings?.twitterLink || '#', label: 'Twitter X Link' },
                  { icon: Instagram, href: settings?.instagramLink || '#', label: 'Instagram Link' }
                ].filter(s => s.href && s.href !== '').map((s, idx) => (
                  <a
                    key={idx}
                    href={s.href}
                    aria-label={s.label}
                    className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:scale-105 ${
                      isDark 
                        ? 'border-white/10 hover:border-white/30 bg-white/5 text-slate-400 hover:text-white' 
                        : 'border-slate-200 hover:border-slate-350 bg-slate-50 text-slate-550 hover:text-slate-900'
                    }`}
                  >
                    <s.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>

            </div>

            {/* RIGHT COLUMN: Nested glass showcases conforming exactly to image structure */}
            <div className="lg:col-span-5 flex flex-col gap-6 w-full relative">
              
              {/* Card background bloom indicator */}
              <div className={`absolute top-1/4 right-0 w-36 h-36 rounded-full bg-gradient-to-br ${
                themeColors[activeTheme].gradient
              } opacity-20 blur-3xl pointer-events-none`} />

              {/* 1. TOP CAROUSEL CARD */}
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                    className={`relative border rounded-[28px] p-5 shadow-2xl hover:border-slate-400/20 transition-all group overflow-hidden ${
                      isDark 
                        ? 'bg-slate-950/50 border-white/10 hover:border-white/20 text-white' 
                        : 'bg-white/80 border-slate-200 hover:border-slate-300 text-slate-900'
                    }`}
                  >
                    {/* Arrow up-right external trigger indicator matching image layout exactly */}
                    <div className="absolute top-5 right-5 z-20">
                      <div className={`w-10 h-10 rounded-full border flex items-center justify-center hover:scale-110 active:scale-95 transition-all backdrop-blur-md cursor-pointer ${
                        isDark 
                          ? 'bg-slate-900/80 border-white/15 text-white' 
                          : 'bg-white/90 border-slate-200 shadow-sm text-slate-800'
                      }`}>
                        <ArrowUpRight className={`w-5 h-5 ${
                          isDark ? themeColors[activeTheme].accentText.dark : themeColors[activeTheme].accentText.light
                        }`} />
                      </div>
                    </div>

                    {/* Main image container with exact matching round edges */}
                    <div className={`relative aspect-[3/2] w-full rounded-2xl overflow-hidden bg-slate-900 border ${
                      isDark ? 'border-white/10' : 'border-slate-100 shadow-sm'
                    }`}>
                      <img
                        src={slides[activeSlide].image}
                        alt={`Design Showcase Exhibit ${activeSlide + 1}`}
                        className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-[1200ms]"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Subtext mapping exactly under the visual card */}
                    <p className={`text-xs leading-relaxed font-light mt-4 px-1 min-h-[50px] ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      {slides[activeSlide].text}
                    </p>
                  </motion.div>
                </AnimatePresence>
                
                {/* Dots carousel indicators */}
                <div className="absolute bottom-6 right-8 flex items-center gap-1.5 z-20">
                  {slides.map((_, idx) => {
                    const cycle: ThemeType[] = ['blue', 'purple', 'emerald', 'rose'];
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          setActiveSlide(idx);
                          setActiveTheme(cycle[idx]);
                        }}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          activeSlide === idx 
                            ? `w-4 bg-gradient-to-r ${themeColors[activeTheme].gradient}` 
                            : 'w-1.5 bg-slate-400/40 hover:bg-slate-400/70'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* 2. BOTTOM STATS/METRIC GRID DESIGN */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`relative border rounded-[28px] p-6 shadow-2xl transition-all flex flex-col justify-between ${
                  isDark 
                    ? 'bg-gradient-to-br from-slate-900/80 to-slate-950/75 border-white/10 text-white hover:border-white/20' 
                    : 'bg-gradient-to-br from-white to-slate-50/90 border-slate-200 text-slate-900 hover:border-slate-350 shadow-md'
                }`}
              >
                <div className="space-y-4">
                  {/* Performance stars badge in top portion of metric card */}
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      isDark ? themeColors[activeTheme].accentBg.dark : themeColors[activeTheme].accentBg.light
                    }`}>
                      <Star className="w-4 h-4 fill-current text-amber-400" />
                    </div>
                    <span className={`text-[10px] font-mono tracking-widest font-bold uppercase ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}>Verified Performance</span>
                  </div>

                  {/* Dynamic Performance details */}
                  <div className="space-y-1">
                    <h3 className={`text-4xl sm:text-5xl font-extrabold tracking-tighter ${
                      isDark ? 'text-white' : 'text-slate-950'
                    }`}>
                      {settings?.metricNumber || "50+"}
                    </h3>
                    <h4 className={`text-sm font-bold tracking-tight ${
                      isDark ? themeColors[activeTheme].accentText.dark : themeColors[activeTheme].accentText.light
                    }`}>
                      {settings?.metricSubtitle || "Delivered Projects"}
                    </h4>
                  </div>

                  <p className={`text-xs leading-relaxed font-light ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {settings?.metricDescription || "Precision-engineered branding, flyers, and digital platforms across diverse industries."}
                  </p>
                </div>

                {/* Card footer details linking into client audit workflow */}
                <div className={`mt-5 border-t pt-4 flex justify-between items-center ${
                  isDark ? 'border-white/5' : 'border-slate-100'
                }`}>
                  <button
                    onClick={() => scrollToSection('audit')}
                    className={`flex items-center gap-2 text-xs font-bold transition-colors uppercase tracking-widest cursor-pointer ${
                      isDark ? 'text-white hover:text-slate-300' : 'text-slate-900 hover:text-[#00A3FF]'
                    }`}
                  >
                    <span>Get Started</span>
                    <ArrowUpRight className={`w-4 h-4 ${
                      isDark ? themeColors[activeTheme].accentText.dark : themeColors[activeTheme].accentText.light
                    }`} />
                  </button>
                  
                  <span className={`text-[8px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-md border ${
                    isDark 
                      ? 'bg-white/5 border-white/5 text-slate-500' 
                      : 'bg-slate-100 border-slate-200/40 text-slate-600'
                  }`}>
                    Secure Custody
                  </span>
                </div>
              </motion.div>

            </div>

          </div>

        </motion.div>
      </div>
    </section>
  );
}
