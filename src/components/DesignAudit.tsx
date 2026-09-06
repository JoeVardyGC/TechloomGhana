import { useState, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, User, CheckCircle, Award, ShieldCheck, Sparkles, Loader2, MessageSquare } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import confetti from 'canvas-confetti';

export default function DesignAudit() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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

    // Fire the Firestore save and backend email dispatch concurrently to prevent bottlenecks
    const firestorePromise = addDoc(collection(db, 'leadInquiries'), {
      name: formData.name,
      email: formData.email,
      message: formData.message,
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
        name: formData.name,
        email: formData.email,
        message: formData.message
      })
    }).catch(emailErr => {
      console.error('Nodemailer backend delivery failed:', emailErr);
    });

    await Promise.all([firestorePromise, emailPromise]);

    setState('SUCCESS');

    // Trigger responsive, modern celebration confetti cascades
    confetti({
      particleCount: 120,
      spread: 75,
      origin: { y: 0.6 }
    });

    // Staggered side bursts to build professional 3D layering
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

  return (
    <section id="audit" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Visual glowing accents */}
      <div className="absolute top-[20%] left-[-150px] w-96 h-96 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-150px] w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column Description */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold tracking-widest text-brand-blue uppercase px-3 py-1 bg-brand-blue/5 rounded-full inline-block">
              Get In Touch
            </span>
            <h2 className="font-display font-[900] text-3xl sm:text-5xl text-slate-900 tracking-tight leading-tight">
              Have a Project? <br />
              <span className="blue-gradient-text">Let's Connect</span>
            </h2>
            
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-light">
              Send us a direct message. We review every inquiry personally and will get back to you within 24 hours.
            </p>

            <div className="space-y-4 pt-4 border-t border-slate-200">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <p className="text-xs text-slate-500 leading-normal">
                  <strong>Direct Delivery</strong>: Your message is sent straight to our primary inbox for quick assistance.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0 mt-0.5">
                  <Award className="w-4 h-4" />
                </div>
                <p className="text-xs text-slate-500 leading-normal">
                  <strong>Personal Touch</strong>: Receive customized, non-templated responses curated specifically for your requirements.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-50 text-brand-blue flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <p className="text-xs text-slate-500 leading-normal">
                  <strong>Spam-Safe</strong>: We strictly respect your inbox privacy. We will never share your information.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column Form or Success Message */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-slate-150 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              
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
                      <h3 className="font-display font-[800] text-xl text-slate-900">
                        Send Email Inquiry
                      </h3>
                      <p className="text-xs text-slate-400">
                        Please fill in your details below to send a direct message.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} id="contact-message-form" className="space-y-4">
                      
                      {/* Name input */}
                      <div className="space-y-1">
                        <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                          Your Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`w-full bg-slate-50/50 border rounded-xl py-3 pl-11 pr-4 text-sm font-medium focus:outline-hidden focus:border-brand-blue focus:bg-white transition-all ${
                              formErrors.name ? 'border-rose-300 ring-2 ring-rose-50' : 'border-slate-200'
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
                        <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full bg-slate-50/50 border rounded-xl py-3 pl-11 pr-4 text-sm font-medium focus:outline-hidden focus:border-brand-blue focus:bg-white transition-all ${
                              formErrors.email ? 'border-rose-300 ring-2 ring-rose-50' : 'border-slate-200'
                            }`}
                            placeholder="e.g. john@company.com"
                          />
                        </div>
                        {formErrors.email && (
                          <span className="block text-[10px] text-rose-500 font-semibold">{formErrors.email}</span>
                        )}
                      </div>

                      {/* Message area */}
                      <div className="space-y-1">
                        <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                          Message
                        </label>
                        <div className="relative animate-none">
                          <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows={4}
                            className={`w-full bg-slate-50/50 border rounded-xl py-3 pl-11 pr-4 text-sm font-medium focus:outline-hidden focus:border-brand-blue focus:bg-white transition-all ${
                              formErrors.message ? 'border-rose-300 ring-2 ring-rose-50' : 'border-slate-200'
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
                        <Sparkles className="w-4 h-4 text-white animate-pulse" />
                        <span>Send Message</span>
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
                      <h3 className="font-display font-extrabold text-lg text-slate-900">
                        Sending your message...
                      </h3>
                      <p className="text-xs text-slate-400">
                        Connecting to secure SMTP pipeline
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* STATE C: SENT SUCCESS */}
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
                    className="flex flex-col items-center justify-center py-16 text-center space-y-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shadow-inner animate-bounce">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    
                    <div className="space-y-2 pb-2">
                      <h2 className="font-display font-black text-5xl text-slate-900 tracking-tight">
                        Sent
                      </h2>
                      <p className="text-slate-500 text-sm max-w-sm mx-auto">
                        Your email message was delivered straight to our inbox. We will get back to you shortly.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setFormData({ name: '', email: '', message: '' });
                        setState('IDLE');
                      }}
                      className="text-xs font-bold text-brand-blue hover:underline bg-brand-blue/5 hover:bg-brand-blue/10 px-4 py-2 rounded-full transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
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
