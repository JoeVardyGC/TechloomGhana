import React, { useState, ChangeEvent, FormEvent, MouseEvent } from 'react';
import { Mail, MapPin, Phone, Clock, Heart, Sparkles, ArrowUpRight, Copy, Check, Send, Loader2, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';

export default function ContactStudio() {
  const { settings, showToast } = useApp();
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Fallbacks for brand settings
  const email = settings?.email || 'hello@techloom.tech';
  const phone = settings?.phone || '+233 256 259 336';
  const phoneDigits = phone.replace(/[^0-9]/g, '');
  const location = settings?.location || 'TechLoom Studio, 3rd Floor, Airport Gate Towers, Airport Residential Area, Accra, Ghana';
  const openingHours = settings?.openingHours || 'Monday – Saturday (08:30 – 19:00 GHS)';
  const avgResponseTime = settings?.avgResponseTime || 'Average response: under 12 hours for new submissions.';
  const socialImpactText = settings?.socialImpactText || "Every project finances the Joe Vardy Al-Hikmah Foundation, educating Accra's underserved youth in modern tech skills.";

  const whatsappUrl = `https://wa.me/${phoneDigits}?text=${encodeURIComponent('Hi TechLoom, I would like to consult regarding a design, branding or web platform project.')}`;
  const telUrl = `tel:${phoneDigits ? `+${phoneDigits}` : '+233256259336'}`;

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [state, setState] = useState<'IDLE' | 'PROCESSING' | 'SUCCESS'>('IDLE');

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(email);
      setCopiedEmail(true);
      showToast(`Copied ${email} to clipboard!`, 'success');
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setFormErrors({
      ...formErrors,
      [e.target.name]: '',
    });
  };

  const validate = () => {
    let isValid = true;
    const errors = { name: '', email: '', phone: '', message: '' };

    if (!formData.name.trim()) {
      errors.name = 'Please provide your name';
      isValid = false;
    }
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please provide a valid email address';
      isValid = false;
    }
    if (!formData.message.trim()) {
      errors.message = 'Please provide a short description of your project';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setState('PROCESSING');

    // Concurrently save to Firestore and dispatch email via backend
    const firestorePromise = addDoc(collection(db, 'leadInquiries'), {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      message: formData.message.trim(),
      createdAt: serverTimestamp()
    }).catch(err => {
      console.error('Firestore save failed:', err);
    });

    const emailPromise = fetch('/api/send-consultation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        message: formData.message.trim()
      })
    }).catch(emailErr => {
      console.warn('Nodemailer backend delivery notice:', emailErr);
    });

    await Promise.all([firestorePromise, emailPromise]);

    setState('SUCCESS');
    showToast('Consultation inquiry sent! Our director will contact you promptly.', 'success');

    // Trigger celebration confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <section id="audit" className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden transition-colors duration-300 border-t border-slate-100 dark:border-slate-850">
      {/* Visual background accents (ibelick inspired) */}
      <div className="absolute top-[20%] right-[-100px] w-96 h-96 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-[-100px] w-80 h-80 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold tracking-widest text-brand-blue uppercase px-4 py-1.5 bg-brand-blue/5 dark:bg-brand-blue/10 rounded-full inline-block">
            Accra Studio & Global Consultation
          </span>
          <h2 className="font-display font-[900] text-3xl sm:text-5xl text-slate-900 dark:text-white tracking-tight leading-tight">
            Have a Project?{' '}
            <span className="blue-gradient-text font-black">Let's Connect</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg font-light leading-relaxed">
            Reach out directly by phone, WhatsApp, or email—or send us your project details below for a free creative consultation within 12 hours.
          </p>
        </div>

        {/* Master 2-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: Coordinates, Direct Phone, WhatsApp & Social Impact (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Channels Card */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl border border-slate-800">
              <div className="space-y-1">
                <span className="block text-[10px] font-mono uppercase tracking-widest text-brand-cyan">
                  Direct Communications
                </span>
                <h3 className="font-display font-extrabold text-xl text-white">
                  Get in Touch Instantly
                </h3>
              </div>

              <div className="space-y-3.5">
                
                {/* 1. Direct Phone Call Button */}
                <a
                  href={telUrl}
                  className="group flex items-center gap-4 p-3.5 bg-slate-950/50 hover:bg-brand-blue/15 rounded-2xl border border-white/10 hover:border-brand-blue/40 transition-all cursor-pointer"
                  title={`Call ${phone}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/15 flex items-center justify-center text-brand-cyan shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                    <Phone className="w-5 h-5 stroke-[1.8]" />
                  </div>
                  <div className="flex-1 leading-snug truncate">
                    <span className="block text-[9px] font-mono uppercase tracking-wider text-slate-400">Direct Phone Call</span>
                    <span className="text-sm font-semibold text-white group-hover:text-brand-cyan transition-colors block truncate">{phone}</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-brand-blue/20 text-brand-cyan px-2 py-0.5 rounded uppercase shrink-0">Call Now</span>
                </a>

                {/* 2. Direct WhatsApp Chat Button */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-3.5 bg-slate-950/50 hover:bg-emerald-500/15 rounded-2xl border border-white/10 hover:border-emerald-500/40 transition-all cursor-pointer"
                  title="Chat on WhatsApp"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400 shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <MessageSquare className="w-5 h-5 stroke-[1.8]" />
                  </div>
                  <div className="flex-1 leading-snug truncate">
                    <span className="block text-[9px] font-mono uppercase tracking-wider text-slate-400">WhatsApp Direct Line</span>
                    <span className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors block truncate">{phone}</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded uppercase shrink-0">Chat</span>
                </a>

                {/* 3. Official Email with Click-To-Copy */}
                <div className="group flex items-center gap-4 p-3.5 bg-slate-950/50 hover:bg-slate-800/80 rounded-2xl border border-white/10 hover:border-brand-blue/40 transition-all">
                  <a
                    href={`mailto:${email}`}
                    className="w-10 h-10 rounded-xl bg-brand-blue/15 flex items-center justify-center text-brand-blue shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-colors cursor-pointer"
                    title={`Email ${email}`}
                  >
                    <Mail className="w-5 h-5 stroke-[1.8]" />
                  </a>
                  <a
                    href={`mailto:${email}`}
                    className="flex-1 leading-snug truncate cursor-pointer"
                  >
                    <span className="block text-[9px] font-mono uppercase tracking-wider text-slate-400">Official Email</span>
                    <span className="text-sm font-semibold text-white group-hover:text-brand-cyan transition-colors block truncate">{email}</span>
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer shrink-0"
                    title="Copy Email Address"
                    aria-label="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

              </div>
            </div>

            {/* Studio Physical Location & Hours */}
            <div className="bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">Accra Studio Hub</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">{location}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-800 text-xs">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  {openingHours}
                </span>
                <span className="font-mono text-[10px] font-bold text-brand-blue bg-brand-blue/5 dark:bg-brand-blue/10 px-2 py-0.5 rounded">
                  {avgResponseTime}
                </span>
              </div>
            </div>

            {/* 10% Foundation Banner */}
            <div className="relative overflow-hidden bg-gradient-to-br from-brand-blue to-brand-cyan text-white rounded-3xl p-6 shadow-xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase">
                <Heart className="w-4 h-4 fill-white/30" />
                <span>10% Social Impact Investment</span>
              </div>
              <p className="text-xs text-white/90 leading-relaxed font-light">
                {socialImpactText}
              </p>
            </div>

          </div>

          {/* RIGHT COLUMN: The Interactive Consultation Request Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-10 shadow-xl relative">
            <div className="mb-6 space-y-2">
              <h3 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white tracking-tight">
                Request Free Brand Consultation
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                Tell us about your brand goals or upcoming website launch. We'll review your project and get back to you with custom insights and a tailored timeline.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {state === 'SUCCESS' ? (
                <motion.div
                  key="success-message"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 text-center bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 rounded-2xl space-y-4"
                >
                  <div className="w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
                    <Check className="w-7 h-7 stroke-[2.5]" />
                  </div>
                  <h4 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                    Inquiry Received Successfully!
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.name}</strong>! Your inquiry is logged in our Accra studio pipeline. We will reach you via <strong>{formData.email}</strong> {formData.phone ? `or phone (${formData.phone})` : ''} within 12 hours.
                  </p>
                  <button
                    onClick={() => {
                      setState('IDLE');
                      setFormData({ name: '', email: '', phone: '', message: '' });
                    }}
                    className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold transition-all cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name Field */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                        Your Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Samuel Mensah"
                        className={`w-full text-base sm:text-sm px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all ${
                          formErrors.name ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200 dark:border-slate-700'
                        }`}
                      />
                      {formErrors.name && (
                        <p className="text-[11px] text-rose-500 font-medium">{formErrors.name}</p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="name@company.com"
                        className={`w-full text-base sm:text-sm px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all ${
                          formErrors.email ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200 dark:border-slate-700'
                        }`}
                      />
                      {formErrors.email && (
                        <p className="text-[11px] text-rose-500 font-medium">{formErrors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Phone / WhatsApp Field */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Phone Number / WhatsApp <span className="text-slate-400 font-normal">(Optional for faster response)</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +233 24 000 0000"
                      className="w-full text-base sm:text-sm px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all"
                    />
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Project Goals & Requirements <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Describe what you want to build (e.g. Brand Identity, Corporate Website, Marketing Flyers, or Complete Rebrand)..."
                      className={`w-full text-base sm:text-sm px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all resize-none ${
                        formErrors.message ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200 dark:border-slate-700'
                      }`}
                    />
                    {formErrors.message && (
                      <p className="text-[11px] text-rose-500 font-medium">{formErrors.message}</p>
                    )}
                  </div>

                  {/* Submit Button with Kinetics spring physics */}
                  <motion.button
                    type="submit"
                    disabled={state === 'PROCESSING'}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan hover:from-brand-blue/90 hover:to-brand-cyan/95 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {state === 'PROCESSING' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Project Consultation</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
