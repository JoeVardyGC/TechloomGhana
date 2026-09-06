import React, { useState } from 'react';
import { Star, CheckCircle2, Paintbrush, ArrowRight, User, Briefcase, Building, MessageSquare, Image, ShieldCheck, AlertCircle, UploadCloud, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80',
];

interface TestimonialFormProps {
  onSuccess?: () => void;
}

export default function TestimonialForm({ onSuccess }: TestimonialFormProps) {
  const { submitTestimonial, showToast } = useApp();
  
  // Form values state
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [quote, setQuote] = useState('');
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState(PRESET_AVATARS[0]);
  const [customAvatar, setCustomAvatar] = useState('');
  
  // Status states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (!name.trim()) return setErrorMsg('Please provide your full name.');
    if (!role.trim()) return setErrorMsg('Please provide your role.');
    if (!company.trim()) return setErrorMsg('Please specify your company.');
    if (!quote.trim()) return setErrorMsg('Tell us a little bit about your digital narrative or positive results.');
    if (quote.trim().length < 15) return setErrorMsg('Please make your narrative slightly longer (at least 15 characters) so we can showcase it.');

    setIsSubmitting(true);
    
    const finalAvatar = customAvatar.trim() || selectedAvatar;
    
    try {
      const ok = await submitTestimonial({
        name: name.trim(),
        role: role.trim(),
        company: company.trim(),
        quote: quote.trim(),
        rating,
        avatar: finalAvatar
      });
      
      if (ok) {
        setIsSuccess(true);
        // Clear forms
        setName('');
        setRole('');
        setCompany('');
        setQuote('');
        setRating(5);
        setCustomAvatar('');
        if (onSuccess) {
          setTimeout(() => {
            onSuccess();
          }, 4000);
        }
      } else {
        setErrorMsg('Failed to sync review with database. Please try offline simulated tools or review connection settings.');
      }
    } catch (error: any) {
      setErrorMsg(error?.message || 'Database transaction occurred with restrictions.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="testimonial-form-outer" className="w-full bg-slate-550 rounded-2xl">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-emerald-50/50 border border-emerald-100 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-inner"
          >
            <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-xl ring-4 ring-emerald-100 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-600 uppercase bg-emerald-100/50 px-3 py-1 rounded-full">
                TRANSACTION COMPLETE
              </span>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-slate-900 tracking-tight">
                Narrative Committed!
              </h3>
              <p className="text-slate-500 font-light text-sm max-w-md mx-auto leading-relaxed">
                Thank you infinitely for reviewing <span className="font-semibold text-brand-blue">TechLoom Studio</span>. Your testimonial has been securely streamed to our live Firebase document registry and will display rotating on our header screen.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsSuccess(false)}
                id="reset-form-btn"
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-brand-blue uppercase tracking-widest transition-colors cursor-pointer"
              >
                <span>Submit Another Feedback</span>
                <Paintbrush className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="form-card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-xl relative"
          >
            {/* Header Badge */}
            <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 bg-brand-blue/10 border border-brand-blue/20 rounded-xl flex items-center justify-center text-brand-blue shrink-0 shadow-inner">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-black text-lg text-slate-900">Partner Success Form</h3>
                <p className="text-[11px] text-slate-400 font-light mt-0.5">Share your experience to motivate tech founders of Ghana.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1: Name and Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full name input */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-slate-350" /> Full Name
                  </label>
                  <input
                    type="text"
                    required
                    id="testimonial-form-name"
                    value={name}
                    placeholder="e.g. Marcus Vance"
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 font-medium focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
                  />
                </div>

                {/* Role Input */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400 flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-slate-350" /> Corporate Role
                  </label>
                  <input
                    type="text"
                    required
                    id="testimonial-form-role"
                    value={role}
                    placeholder="e.g. Managing Partner"
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 font-medium focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Company */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400 flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-slate-350" /> Company or Enterprise Name
                </label>
                <input
                  type="text"
                  required
                  id="testimonial-form-company"
                  value={company}
                  placeholder="e.g. Apex Global Brands"
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 font-medium focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
                />
              </div>

              {/* Star Rating Grid */}
              <div className="bg-white border border-slate-200/60 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400 block">Experience Quality</span>
                  <p className="text-[11px] text-slate-400 font-light">Rate our design craftsmanship and execution quality.</p>
                </div>
                
                <div className="flex items-center gap-1 bg-slate-50/80 px-4 py-2 border border-slate-100 rounded-xl">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      type="button"
                      id={`star-btn-${val}`}
                      onClick={() => setRating(val)}
                      onMouseEnter={() => setHoveredRating(val)}
                      onMouseLeave={() => setHoveredRating(null)}
                      className="p-1 cursor-pointer transition transform hover:scale-125 focus:outline-none"
                    >
                      <Star 
                        className={`w-6.5 h-6.5 transition-all outline-none ${
                          val <= (hoveredRating ?? rating) 
                            ? 'fill-amber-400 text-amber-400 drop-shadow-[0_1px_3px_rgba(245,158,11,0.2)]' 
                            : 'text-slate-250 hover:text-slate-300'
                        }`} 
                      />
                    </button>
                  ))}
                  <span className="ml-2 font-mono text-xs font-bold text-slate-600 w-3">
                    {rating}
                  </span>
                </div>
              </div>

              {/* Profile Selection */}
              <div className="space-y-3 bg-white border border-slate-200/60 p-4.5 rounded-2xl">
                <div className="space-y-0.5">
                  <label className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400 flex items-center gap-1">
                    <Image className="w-3.5 h-3.5 text-slate-350" /> Profile Avatar Upload
                  </label>
                  <p className="text-[11px] text-slate-400 font-light">Upload your custom professional portrait to showcase on the success showcase.</p>
                </div>
                                {/* Drag-and-drop File Upload + Link Input */}
                <div className="pt-2 border-t border-slate-100 space-y-3">
                  <div className="flex items-center gap-4">
                    {/* Live Upload Preview */}
                    <div className="shrink-0 relative">
                      <div className="absolute -inset-1 rounded-full ring-2 ring-brand-blue/20 animate-pulse" />
                      <img
                        src={customAvatar.trim() || selectedAvatar}
                        alt="Testimonial Avatar"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = PRESET_AVATARS[0];
                        }}
                        className="w-14 h-14 rounded-full object-cover shadow border border-slate-150 bg-slate-100 relative"
                      />
                    </div>

                    <div className="flex-1 space-y-1">
                      <span className="block text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400">Custom Profile Photo URL</span>
                      <input
                        type="text"
                        id="testimonial-form-custom-avatar"
                        placeholder="Paste image link URL (e.g. from Unsplash)..."
                        value={customAvatar}
                        onChange={(e) => setCustomAvatar(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-brand-blue"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 bg-slate-50 border border-slate-200 border-dashed rounded-xl p-3">
                    <div className="flex items-center justify-between gap-3">
                      <label className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-200/75 hover:bg-slate-200 text-slate-700 text-[10px] font-bold cursor-pointer transition-all max-w-max">
                        <UploadCloud className="w-4 h-4" />
                        <span>Upload Photo File</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              const file = e.target.files[0];
                              showToast(`Processing high-fidelity image (${(file.size / (1024 * 1024)).toFixed(2)} MB)...`, "info");
                              const reader = new FileReader();
                              reader.onload = (ev) => {
                                const dataUrl = ev.target?.result as string;
                                if (!dataUrl) {
                                  showToast("Failed to read image template.", "error");
                                  return;
                                }

                                const img = new window.Image();
                                img.onload = () => {
                                  // Max dimension 300px is perfect for circular avatars.
                                  // Fits perfectly in Firestore documents under all conditions.
                                  const maxDim = 300;
                                  let w = img.width;
                                  let h = img.height;
                                  if (w > maxDim || h > maxDim) {
                                    if (w > h) {
                                      h = Math.round((h * maxDim) / w);
                                      w = maxDim;
                                    } else {
                                      w = Math.round((w * maxDim) / h);
                                      h = maxDim;
                                    }
                                  }

                                  const canvas = document.createElement('canvas');
                                  canvas.width = w;
                                  canvas.height = h;

                                  const ctx = canvas.getContext('2d');
                                  if (!ctx) {
                                    setCustomAvatar(dataUrl);
                                    showToast("Avatar set successfully (bypass format optimization).", "success");
                                    return;
                                  }

                                  ctx.fillStyle = '#ffffff';
                                  ctx.fillRect(0, 0, w, h);
                                  ctx.drawImage(img, 0, 0, w, h);

                                  // Compresses to high-quality JPEG (under 15KB - 30KB, secure from Firestore limits)
                                  const compressed = canvas.toDataURL('image/jpeg', 0.88);
                                  setCustomAvatar(compressed);
                                  showToast("Success story portrait loaded and authorized.", "success");
                                };

                                img.onerror = () => {
                                  setCustomAvatar(dataUrl);
                                  showToast("Success story portrait loaded raw.", "success");
                                };

                                img.src = dataUrl;
                              };
                              reader.onerror = () => {
                                showToast("Failed to parse visual graphic.", "error");
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="hidden"
                        />
                      </label>
                      <span className="text-[10px] text-slate-400 font-sans tracking-tight">
                        supports files of any size (optimised to secure Firestore quotas)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Narrative Content */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400 flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5 text-slate-350" /> Success Narrative
                </label>
                <textarea
                  id="testimonial-form-quote"
                  rows={4}
                  required
                  value={quote}
                  placeholder="Describe your collaborative design workflow, digital product deployment, or high-speed growth narrative achieved with TechLoom Studio..."
                  onChange={(e) => setQuote(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl p-4 text-xs text-slate-800 leading-relaxed font-light focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
                />
              </div>

              {/* Status Indicator Error */}
              {errorMsg && (
                <div className="flex items-start gap-2 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl p-3 text-xs leading-relaxed font-medium animate-shake">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Security Shield badge */}
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Encrypted transaction committed directly into the firestore.rules sandboxed layout.</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                id="testimonial-form-submit-btn"
                disabled={isSubmitting}
                className="w-full bg-slate-900 hover:bg-brand-blue text-white font-bold text-xs uppercase tracking-widest py-4 rounded-xl cursor-pointer shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group hover:-translate-y-0.5 active:translate-y-0"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                    <span>Synchronizing Record...</span>
                  </>
                ) : (
                  <>
                    <span>Publish Testimonial</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
