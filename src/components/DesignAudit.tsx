import { useState, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, User, Phone, CheckCircle, Award, ShieldCheck, Sparkles, Loader2, MessageSquare, Send } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import confetti from 'canvas-confetti';

export default function DesignAudit() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [state, setState] = useState<'IDLE' | 'PROCESSING' | 'SUCCESS'>('IDLE');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error
    setFormErrors({
      ...formErrors,
      [e.target.name]: '',
    });
  };

  const validate = () => {
    let isValid = true;
    const errors = { name: '', email: '', message: '' };

    if (!formData.name.trim()) {
      errors.name = 'Please provide your name';
      isValid = false;
    }
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please provide a valid email format';
      isValid = false;
    }
    if (!formData.message.trim()) {
      errors.message = 'Please provide your message';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setState('PROCESSING');

    // Fire the Firestore save and backend email dispatch concurrently
    const firestorePromise = addDoc(collection(db, 'leadInquiries'), {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      message: formData.message.trim(),
      createdAt: serverTimestamp()
    }).catch(err => {
      console.error('Firestore save note:', err);
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
      console.error('Backend delivery notification:', emailErr);
    });

    await Promise.all([firestorePromise, emailPromise]);

    setState('SUCCESS');

    // Trigger responsive celebration confetti
    confetti({
      particleCount: 120,
      spread: 75,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.75 }
      });
    }, 200);

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.75 }
      });
    }, 350);
  };

  const whatsappMessageSample = encodeURIComponent(
    `*NEW WEBSITE INQUIRY*\n` +
    `--------------------------\n` +
    `*Name:* ${formData.name}\n` +
    `*Email:* ${formData.email}\n` +
    `*Phone:* ${formData.phone || 'Not provided'}\n` +
    `*Message:* ${formData.message}\n` +
    `--------------------------\n` +
    `Sent from Techloom Ghana Portal`
  );
  const directWhatsAppUrl = `https://wa.me/233256259336?text=${whatsappMessageSample}`;

  return (
    <section id="audit" className="py-24 bg-slate-50 dark:bg-slate-950/80 relative overflow-hidden transition-colors duration-300">
      {/* Visual glowing accents */}
      <div className="absolute top-[20%] left-[-150px] w-96 h-96 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-150px] w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column Description */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold tracking-widest text-brand-blue uppercase px-3 py-1 bg-brand-blue/5 dark:bg-brand-blue/10 rounded-full inline-block">
              Get In Touch
            </span>
            <h2 className="font-display font-[900] text-3xl sm:text-5xl text-slate-900 dark:text-white tracking-tight leading-tight">
              Have a Project? <br />
              <span className="blue-gradient-text">Let's Connect</span>
            </h2>
            
            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed font-light">
              Send us a direct message. We review every inquiry personally and will get back to you within 24 hours.
            </p>

            <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                  <strong className="text-slate-700 dark:text-slate-200">Direct Delivery</strong>: Your message is sent straight to our inbox (<code className="text-brand-blue">techloomghana@yahoo.com</code>) and WhatsApp team.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 flex items-center justify-center shrink-0 mt-0.5">
                  <Award className="w-4 h-4" />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                  <strong className="text-slate-700 dark:text-slate-200">Personal Touch</strong>: Receive customized, non-templated responses curated specifically for your requirements.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-brand-blue flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                  <strong className="text-slate-700 dark:text-slate-200">Spam-Safe</strong>: We strictly respect your privacy. We will never share your contact information.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column Form or Success Message */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              
              <AnimatePresence mode="wait">
                
                {/* STATE A: IDLE INPUT FORM */}
                {state === 'IDLE' && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="space-y-1">
                      <h3 className="font-display font-[800] text-xl text-slate-900 dark:text-white">
                        Send Email Inquiry
                      </h3>
                      <p className="text-xs text-slate-400">
                        Please fill in your details below to send a direct message.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} id="contact-message-form" className="space-y-4">
                      
                      {/* Name input */}
                      <div className="space-y-1">
                        <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          Your Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`w-full bg-slate-50/50 dark:bg-slate-800/60 border rounded-xl py-3 pl-11 pr-4 text-sm font-medium text-slate-900 dark:text-white focus:outline-hidden focus:border-brand-blue focus:bg-white dark:focus:bg-slate-800 transition-all ${
                              formErrors.name ? 'border-rose-300 ring-2 ring-rose-50 dark:ring-rose-950' : 'border-slate-200 dark:border-slate-700'
                            }`}
                            placeholder="e.g. John Doe"
                          />
                        </div>
                        {formErrors.name && (
                          <span className="block text-[10px] text-rose-500 font-semibold">{formErrors.name}</span>
                        )}
                      </div>

                      {/* Email Address */}
                      <div className="space-y-1">
                        <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full bg-slate-50/50 dark:bg-slate-800/60 border rounded-xl py-3 pl-11 pr-4 text-sm font-medium text-slate-900 dark:text-white focus:outline-hidden focus:border-brand-blue focus:bg-white dark:focus:bg-slate-800 transition-all ${
                              formErrors.email ? 'border-rose-300 ring-2 ring-rose-50 dark:ring-rose-950' : 'border-slate-200 dark:border-slate-700'
                            }`}
                            placeholder="e.g. john@company.com"
                          />
                        </div>
                        {formErrors.email && (
                          <span className="block text-[10px] text-rose-500 font-semibold">{formErrors.email}</span>
                        )}
                      </div>

                      {/* Phone / WhatsApp (Optional) */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            Phone / WhatsApp Number
                          </label>
                          <span className="text-[10px] font-mono text-slate-400">Optional</span>
                        </div>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full bg-slate-50/50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-11 pr-4 text-sm font-medium text-slate-900 dark:text-white focus:outline-hidden focus:border-brand-blue focus:bg-white dark:focus:bg-slate-800 transition-all"
                            placeholder="e.g. +233 24 123 4567"
                          />
                        </div>
                      </div>

                      {/* Message area */}
                      <div className="space-y-1">
                        <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          Message *
                        </label>
                        <div className="relative">
                          <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows={4}
                            className={`w-full bg-slate-50/50 dark:bg-slate-800/60 border rounded-xl py-3 pl-11 pr-4 text-sm font-medium text-slate-900 dark:text-white focus:outline-hidden focus:border-brand-blue focus:bg-white dark:focus:bg-slate-800 transition-all ${
                              formErrors.message ? 'border-rose-300 ring-2 ring-rose-50 dark:ring-rose-950' : 'border-slate-200 dark:border-slate-700'
                            }`}
                            placeholder="Describe your project, question, or goals..."
                          />
                        </div>
                        {formErrors.message && (
                          <span className="block text-[10px] text-rose-500 font-semibold">{formErrors.message}</span>
                        )}
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        id="contact-submit-btn"
                        className="w-full bg-gradient-to-r from-brand-blue to-brand-cyan hover:from-brand-blue/90 hover:to-brand-cyan/90 text-white font-bold text-sm tracking-wide py-4 px-6 rounded-xl shadow-lg shadow-brand-blue/20 hover:shadow-xl transition-all duration-300 cursor-pointer mt-4 flex items-center justify-center gap-2"
                      >
                        <Send className="w-4 h-4 text-white" />
                        <span>Submit Inquiry</span>
                      </button>

                    </form>
                  </motion.div>
                )}

                {/* STATE B: PROCESSING */}
                {state === 'PROCESSING' && (
                  <motion.div
                    key="processing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-16 gap-6 text-center"
                  >
                    <Loader2 className="w-12 h-12 text-brand-blue animate-spin" />
                    <div className="space-y-2">
                      <h3 className="font-display font-extrabold text-lg text-slate-900 dark:text-white">
                        Submitting your inquiry...
                      </h3>
                      <p className="text-xs text-slate-400">
                        Dispatching to inbox & WhatsApp pipeline
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* STATE C: SUBMITTED SUCCESS */}
                {state === 'SUCCESS' && (
                  <motion.div
                    key="success"
                    initial={{ scale: 0.85, opacity: 0, y: 15, rotate: -2 }}
                    animate={{ 
                      scale: [0.85, 1.06, 0.97, 1],
                      opacity: 1,
                      y: 0,
                      rotate: [0, 3, -2, 1.5, -0.5, 0]
                    }}
                    transition={{ 
                      duration: 0.8,
                      ease: "easeOut"
                    }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-12 text-center space-y-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-500 flex items-center justify-center shadow-inner animate-bounce">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    
                    <div className="space-y-2 pb-2">
                      <h2 className="font-display font-black text-4xl sm:text-5xl text-slate-900 dark:text-white tracking-tight">
                        Submitted
                      </h2>
                      <p className="text-slate-600 dark:text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                        Your inquiry has been submitted! Our team will receive it at <strong className="text-brand-blue">techloomghana@yahoo.com</strong> and via our WhatsApp notification line (<strong className="text-emerald-500">+233 256 259 336</strong>).
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                      {/* Optional WhatsApp Quick Sample Chat */}
                      <a
                        href={directWhatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-5 py-3 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Open Chat on WhatsApp</span>
                      </a>

                      <button
                        onClick={() => {
                          setFormData({ name: '', email: '', phone: '', message: '' });
                          setState('IDLE');
                        }}
                        className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-brand-blue bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-5 py-3 rounded-xl transition-colors cursor-pointer"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
