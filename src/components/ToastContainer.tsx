import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastContainerProps {
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
}

export default function ToastContainer({ toasts, removeToast }: ToastContainerProps) {
  return (
    <div 
      id="global-toast-viewport"
      className="fixed bottom-6 right-6 z-[99999] flex flex-col gap-3 w-full max-w-sm pointer-events-none select-none font-sans"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => {
          // Dynamic icon & color styling pairs
          let Icon = Info;
          let borderTheme = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl';
          let iconColor = 'text-brand-blue';
          let glowDot = 'bg-brand-blue animate-pulse';

          if (toast.type === 'success') {
            Icon = CheckCircle2;
            borderTheme = 'border-emerald-500/35 bg-white dark:bg-slate-900 shadow-[0_8px_30px_rgb(16,185,129,0.08)]';
            iconColor = 'text-emerald-500';
            glowDot = 'bg-emerald-500';
          } else if (toast.type === 'error') {
            Icon = AlertCircle;
            borderTheme = 'border-rose-500/35 bg-white dark:bg-slate-900 shadow-[0_8px_30px_rgb(244,63,94,0.08)]';
            iconColor = 'text-rose-500';
            glowDot = 'bg-rose-500';
          }

          return (
            <motion.div
              layout
              key={toast.id}
              initial={{ opacity: 0, y: 35, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className={`pointer-events-auto relative overflow-hidden flex items-start gap-3.5 border p-4 rounded-2xl ${borderTheme}`}
            >
              {/* Soft decorative bottom accent line representing lifetime */}
              <motion.div 
                className={`absolute bottom-0 left-0 h-[3px] ${glowDot}`}
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: (toast.duration || 4500) / 1000, ease: 'linear' }}
              />

              {/* Status Graphic Icon with soft background sphere */}
              <div className="shrink-0 relative flex items-center justify-center w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <Icon className={`w-5 h-5 ${iconColor}`} />
              </div>

              {/* Toast Message details content */}
              <div className="flex-1 min-w-0 pr-2 pt-0.5">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-100 leading-relaxed tracking-tight break-words">
                  {toast.message}
                </p>
              </div>

              {/* Precise close micro-button */}
              <button
                type="button"
                id={`close-toast-${toast.id}`}
                onClick={() => removeToast(toast.id)}
                className="shrink-0 p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer"
              >
                <X className="w-4 h-4 stroke-[2]" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
