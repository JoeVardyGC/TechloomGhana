import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import TestimonialForm from './TestimonialForm';

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80',
];

export default function Testimonials() {
  const { testimonials, loading } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(true);
  const rotationTimer = useRef<NodeJS.Timeout | null>(null);

  // Form toggle state
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (isRotating && testimonials.length > 0) {
      rotationTimer.current = setInterval(() => {
        handleNext();
      }, 6000);
    } else {
      if (rotationTimer.current) {
        clearInterval(rotationTimer.current);
      }
    }

    return () => {
      if (rotationTimer.current) clearInterval(rotationTimer.current);
    };
  }, [currentIndex, isRotating, testimonials.length]);

  const handlePrev = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold tracking-widest text-brand-blue uppercase px-3 py-1 bg-brand-blue/5 rounded-full inline-block">
            Success Stories
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight leading-tight">
            What Our Partners{' '}
            <span className="blue-gradient-text font-black">Say About Us</span>
          </h2>
          <p className="text-slate-500 text-lg font-light leading-relaxed">
            Real feedback from high-growth business owners, corporate marketing teams, and startup founders who scaled using Techloom.
          </p>
        </div>

        {loading && testimonials.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-3">
            <div className="w-8 h-8 rounded-full border-2 border-brand-blue/20 border-t-brand-blue animate-spin" />
            <span className="text-xs text-slate-400 font-mono tracking-wider">Synchronizing Reviews...</span>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-12 text-slate-400 font-mono text-xs">
            No testimonials archived yet. Be the very first to submit!
          </div>
        ) : (
          /* Carousel Sheet Layout */
          <div 
            className="max-w-4xl mx-auto relative px-4 md:px-12 mb-12"
            onMouseEnter={() => setIsRotating(false)}
            onMouseLeave={() => setIsRotating(true)}
          >
            {/* Large Quote graphic mark background */}
            <div className="absolute -top-10 -left-4 text-slate-100 -z-5 pointer-events-none">
              <Quote className="w-24 h-24 stroke-[1.5] text-slate-100/50" />
            </div>

            <div className="bg-slate-50 border border-slate-100/80 rounded-3xl p-6 sm:p-12 relative overflow-hidden shadow-xl shadow-slate-100/30">
              <AnimatePresence mode="wait">
                {testimonials.map((testimonial, i) => {
                  if (i !== currentIndex) return null;

                  return (
                    <motion.div
                      key={testimonial.id || i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.35 }}
                      className="flex flex-col md:flex-row gap-8 items-center"
                    >
                      {/* Column A: Client Avatar */}
                      <div className="shrink-0 relative">
                        {/* Decorative ring surrounding avatar */}
                        <div className="absolute -inset-1.5 rounded-full ring-2 ring-brand-blue/15 animate-pulse" />
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = PRESET_AVATARS[0];
                          }}
                          referrerPolicy="no-referrer"
                          className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover shadow-md relative"
                        />
                      </div>

                      {/* Column B: Star Rating, Name, Role Quote */}
                      <div className="flex-1 space-y-4 text-center md:text-left">
                        {/* Rating Stars row */}
                        <div className="flex items-center justify-center md:justify-start gap-1">
                          {Array.from({ length: testimonial.rating }).map((_, idx) => (
                            <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                          ))}
                        </div>

                        {/* Actual Quote text */}
                        <blockquote className="text-slate-700 text-base sm:text-lg leading-relaxed font-light italic">
                          "{testimonial.quote}"
                        </blockquote>

                        {/* Author credentials */}
                        <div>
                          <cite className="not-italic font-display font-extrabold text-slate-900 block text-base">
                            {testimonial.name}
                          </cite>
                          <span className="text-xs font-semibold text-brand-blue uppercase tracking-wider block mt-0.5">
                            {testimonial.role} &middot; <span className="text-slate-500 font-medium">{testimonial.company}</span>
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Left Navigation Arrow */}
            <button
              onClick={handlePrev}
              id="testimonial-prev-arrow"
              className="absolute left-[-16px] md:left-[-24px] top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border border-slate-200/80 hover:border-slate-350 shadow-md flex items-center justify-center text-slate-600 hover:text-slate-900 transition-all cursor-pointer z-10 hover:scale-105 active:scale-95"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Right Navigation Arrow */}
            <button
              onClick={handleNext}
              id="testimonial-next-arrow"
              className="absolute right-[-16px] md:right-[-24px] top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border border-slate-200/80 hover:border-slate-350 shadow-md flex items-center justify-center text-slate-600 hover:text-slate-900 transition-all cursor-pointer z-10 hover:scale-105 active:scale-95"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Floating Indicator Dots */}
        {testimonials.length > 0 && (
          <div className="flex items-center justify-center gap-1.5 mt-4 mb-16">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex ? 'w-6 bg-brand-blue shadow-sm shadow-brand-blue/20' : 'w-2 bg-slate-300'
                }`}
                aria-label={`Slide target ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* USER CAN LEAVE A TESTIMONIAL BUTTON & SECTION */}
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-6">
            <button
              onClick={() => setShowForm(!showForm)}
              id="write-testimonial-toggle-btn"
              className="group inline-flex items-center gap-2 bg-slate-900 text-white hover:bg-brand-blue font-bold text-xs uppercase tracking-wider px-6 py-4.5 rounded-xl shadow-lg transition-all cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
            >
              <Plus className={`w-4 h-4 transition-transform duration-300 ${showForm ? 'rotate-45' : ''}`} />
              <span>{showForm ? 'Hide Feedback Panel' : 'Share Your Success Story'}</span>
            </button>
          </div>

          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.3 }}
                className="mt-4 text-left"
              >
                <TestimonialForm onSuccess={() => setShowForm(false)} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
