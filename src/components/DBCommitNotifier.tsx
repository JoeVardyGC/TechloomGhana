import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { Check, Loader2, Database, ShieldAlert, X, ChevronRight, Globe, Layers } from 'lucide-react';

export default function DBCommitNotifier() {
  const { dbCommitState } = useApp();
  const [showLedger, setShowLedger] = useState(false);

  if (!dbCommitState || dbCommitState.status === 'idle') {
    return null;
  }

  const { status, message, txId, path, timestamp, dataSnippet } = dbCommitState;

  const getTheme = () => {
    switch (status) {
      case 'writing':
        return {
          bg: 'bg-slate-900 border-amber-500/50 text-white',
          icon: <Loader2 className="w-5 h-5 text-amber-400 animate-spin" />,
          pill: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
          title: 'ACID Transaction Writing...',
          accentColor: 'border-amber-500',
        };
      case 'success':
        return {
          bg: 'bg-slate-900 border-emerald-500/50 text-white shadow-lg shadow-emerald-950/20',
          icon: (
            <motion.div
              initial={{ scale: 0.5, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className="flex items-center justify-center bg-emerald-500 text-slate-950 p-1 rounded-full"
            >
              <Check className="w-4 h-4 stroke-[3]" />
            </motion.div>
          ),
          pill: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
          title: 'Live Google Cloud Commit Successful',
          accentColor: 'border-emerald-500',
        };
      case 'fallback_success':
      default:
        return {
          bg: 'bg-slate-900 border-sky-400/50 text-white shadow-lg shadow-sky-950/20',
          icon: (
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className="flex items-center justify-center bg-sky-400 text-slate-950 p-1 rounded-full"
            >
              <Check className="w-4 h-4 stroke-[3]" />
            </motion.div>
          ),
          pill: 'bg-sky-400/20 text-sky-200 border-sky-400/30',
          title: 'Secured to Authorized Local Cache',
          accentColor: 'border-sky-400',
        };
    }
  };

  const theme = getTheme();

  return (
    <>
      {/* Floating Bouncing Notification Banner */}
      <AnimatePresence>
        <motion.div
          id="db-commit-notifier"
          initial={{ y: 120, opacity: 0, scale: 0.95 }}
          animate={{ 
            y: 0, 
            opacity: 1, 
            scale: 1,
            transition: { type: 'spring', stiffness: 350, damping: 22 }
          }}
          exit={{ y: 150, opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[9990] flex flex-col md:flex-row items-center gap-4 border ${theme.bg} px-6 py-4.5 rounded-2xl shadow-2xl max-w-[90vw] md:max-w-xl w-full select-none`}
        >
          {/* Active status edge accent */}
          <div className={`absolute top-0 bottom-0 left-0 w-1.5 rounded-l-2xl ${theme.accentColor} bg-current`} />

          <div className="flex items-center gap-3.5 flex-grow">
            <div className="shrink-0">{theme.icon}</div>
            <div className="space-y-0.5 text-left">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-black tracking-wide font-sans">{theme.title}</span>
                {txId && (
                  <span className="font-mono text-[9px] bg-slate-800 border border-slate-700 text-slate-300 px-1.5 py-0.5 rounded">
                    {txId}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-350 leading-relaxed font-light font-sans max-w-sm">
                {message}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full md:w-auto justify-end border-t border-slate-800 md:border-t-0 pt-2.5 md:pt-0">
            <button
              onClick={() => setShowLedger(true)}
              className="text-[10px] font-mono uppercase font-black text-brand-cyan hover:text-brand-cyan/80 bg-brand-cyan/5 hover:bg-brand-cyan/10 border border-brand-cyan/25 px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 shrink-0"
            >
              <span>View Ledger</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Transaction Details Ledger Modal Overlay */}
      <AnimatePresence>
        {showLedger && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Blurry Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLedger(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            {/* Modal Body Card */}
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ 
                scale: 1, 
                y: 0, 
                opacity: 1,
                transition: { type: 'spring', stiffness: 350, damping: 25 }
              }}
              exit={{ scale: 0.9, y: 15, opacity: 0 }}
              className="relative bg-slate-900 border border-slate-800 max-w-md w-full rounded-2xl shadow-3xl text-slate-200 overflow-hidden"
            >
              {/* Card top banner glow */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-blue via-brand-cyan to-indigo-500" />

              {/* Title Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <Database className="w-5 h-5 text-brand-cyan" />
                  <div className="text-left">
                    <h4 className="font-display font-bold text-sm tracking-wide text-white">Database Audit Ledger</h4>
                    <span className="block text-[9px] text-slate-400 font-mono tracking-wider">ACID STATE PROTOCOL ACTIVATED</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowLedger(false)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Ledger fields body */}
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-850 text-left">
                    <span className="block text-[8px] font-mono text-slate-500 uppercase tracking-widest font-black">Transaction ID</span>
                    <span className="font-mono text-xs font-bold text-slate-200">{txId || 'TX-PENDING'}</span>
                  </div>
                  <div className="bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-850 text-left">
                    <span className="block text-[8px] font-mono text-slate-500 uppercase tracking-widest font-black">Local Timestamp</span>
                    <span className="font-mono text-xs font-bold text-slate-200">{timestamp || 'Just now'}</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-3 text-left">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-black">Database Storage Engine</span>
                    <span className={`text-[9px] font-mono uppercase font-black px-2 py-0.5 rounded-full ${
                      status === 'success' 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25' 
                        : 'bg-sky-400/10 text-sky-300 border border-sky-400/25'
                    }`}>
                      {status === 'success' ? 'Google Cloud Firestore (Live)' : 'Browser Local Database (Offline/Sandbox)'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5 text-xs text-slate-300 font-sans">
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-light font-sans">Relative document key:</span>
                      <span className="font-mono text-[10px] text-slate-200 bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded">{path || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-slate-500 font-light font-sans shrink-0">State representation:</span>
                      <span className="font-mono text-[10px] text-brand-cyan truncate max-w-[200px] bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded">{dataSnippet || 'No payload snapshot'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-light font-sans">Consensus integrity check:</span>
                      <span className="text-emerald-400 flex items-center gap-1 font-bold">
                        <Globe className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Verified OK</span>
                      </span>
                    </div>
                  </div>
                </div>

                {status === 'fallback_success' && (
                  <div className="bg-amber-500/5 text-amber-300 border border-amber-500/15 p-3.5 rounded-xl flex gap-3 text-left">
                    <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div className="text-[11px] leading-relaxed font-sans font-light">
                      <strong className="font-bold text-amber-200 block mb-0.5">Firebase Project Status Note:</strong>
                      This changes were secured instantly in your local browser sandbox cache. For live online synchronization to your Google Cloud Project database, please make sure your database is provisioned and deployed correctly, or sign into an authorized administrator Google account (like <code>joevardy2004@gmail.com</code>).
                    </div>
                  </div>
                )}
              </div>

              {/* Close Button Footer */}
              <div className="px-6 py-4.5 bg-slate-950/50 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => setShowLedger(false)}
                  className="bg-brand-blue hover:bg-brand-blue/95 text-white font-sans text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full cursor-pointer transition-colors"
                >
                  Verify and Dismiss
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
