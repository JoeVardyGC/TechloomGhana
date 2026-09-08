import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { doc, deleteDoc, collection, getDocs, setDoc, getFirestore } from 'firebase/firestore';
import { initializeApp, getApp } from 'firebase/app';
import { db } from '../lib/firebase';
import { 
  X, Lock, ShieldCheck, Mail, Phone, MapPin, 
  Clock, Heart, Sparkles, Palette, Edit3, 
  Trash2, Plus, Check, MessageSquare, Briefcase, UserCheck, AlertCircle, ChevronRight,
  UploadCloud, Image, Database, RefreshCw, ArrowUp, ArrowDown, Globe, Inbox
} from 'lucide-react';
import { Service, PortfolioItem, ContactSettings, SkillItem } from '../types';

export interface LeadInquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  createdAt?: any;
}

interface ImageUploadProps {
  id: string;
  label: string;
  value: string;
  onChange: (base64: string) => void;
  placeholder?: string;
  key?: any;
}

function ImageUploader({ id, label, value, onChange, placeholder }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const { showToast } = useApp();

  const handleBase64Conversion = (file: File) => {
    if (!file) return;
    if (file.size > 40 * 1024 * 1024) {
      showToast("Asset file exceeds the 40MB limit. Please upload a lighter graphic.", "error");
      return;
    }

    showToast(`Processing high-fidelity asset (${(file.size / (1024 * 1024)).toFixed(2)} MB)...`, "info");

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (!dataUrl) {
        showToast("Image reading failed.", "error");
        return;
      }

      // If already under 40KB, preserve raw byte-for-byte perfection
      if (file.size <= 40 * 1024) {
        onChange(dataUrl);
        showToast("Asset uploaded raw in pristine quality.", "success");
        return;
      }

      // Automatically normalize and optimize resolution to ensure safe Cloud sync
      const img = new window.Image();
      img.onload = () => {
        // 1000px boundary for crisp, web-optimized layouts
        const maxDimension = 1000;
        let width = img.width;
        let height = img.height;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          onChange(dataUrl);
          showToast("Asset embedded raw successfully.", "success");
          return;
        }

        const getCompressedBase64 = (w: number, h: number): string => {
          canvas.width = w;
          canvas.height = h;
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, w, h);
          ctx.drawImage(img, 0, 0, w, h);
          
          let quality = 0.82;
          let base64 = canvas.toDataURL('image/jpeg', quality);
          while (base64.length > 115000 && quality > 0.35) {
            quality -= 0.08;
            base64 = canvas.toDataURL('image/jpeg', quality);
          }
          return base64;
        };

        let currentW = width;
        let currentH = height;
        let compressedBase64 = getCompressedBase64(currentW, currentH);

        // If still too large, step-down resolution dynamically
        let attempts = 0;
        while (compressedBase64.length > 120000 && attempts < 3) {
          currentW = Math.round(currentW * 0.75);
          currentH = Math.round(currentH * 0.75);
          compressedBase64 = getCompressedBase64(currentW, currentH);
          attempts++;
        }

        onChange(compressedBase64);
        const finalEstSize = (compressedBase64.length * 0.75) / 1024;
        showToast(`Asset optimized to ${finalEstSize.toFixed(1)} KB for high-performance cloud sync.`, "success");
      };

      img.onerror = () => {
        onChange(dataUrl);
        showToast("Asset embedded successfully.", "success");
      };

      img.src = dataUrl;
    };

    reader.onerror = () => {
      showToast("Image processing failed.", "error");
    };

    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleBase64Conversion(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleBase64Conversion(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-1 w-full text-left font-sans">
      <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">{label}</label>
      
      {/* Selection zone */}
      <div 
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`relative border border-dashed rounded-xl p-4 flex flex-col md:flex-row items-center gap-4 transition-all duration-300 bg-slate-50/50 hover:bg-white ${
          dragActive ? "border-brand-blue bg-blue-50/20" : "border-slate-200"
        }`}
      >
        <div className="flex-1 space-y-2.5 w-full">
          {/* URL text fallback/direct modify */}
          <input
            type="text"
            id={id}
            placeholder={placeholder || "Paste online asset link (https://...) or upload below"}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-lg px-3 h-9 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
          />
          
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-3">
              <label className="flex items-center justify-center gap-2 h-9 px-4 rounded-lg bg-slate-200/70 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-300/40 text-xs font-semibold cursor-pointer shrink-0 transition-colors">
                <UploadCloud className="w-4 h-4 stroke-[1.8]" />
                <span>Select File</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap font-sans">
                or drag & drop graphic (PNG, JPG, SVG, supports files up to 40MB)
              </span>
            </div>

            <div className="flex items-center gap-2 pt-1.5 border-t border-slate-100">
              {value ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  ACTIVE {value.startsWith('data:') ? '(UPLOADED BASE64)' : '(CONNECTED LINK)'}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-amber-50 text-amber-600 border border-amber-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  NOT UPLOADED (NO CUSTOM IMAGE SET)
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Thumbnail Preview Area */}
        {value && (value.startsWith('data:image') || value.startsWith('http') || value.startsWith('/') || value.startsWith('.')) ? (
          <div className="relative w-16 h-16 rounded-xl border border-slate-200 bg-white shadow-sm shrink-0 overflow-hidden flex items-center justify-center">
            <img 
              src={value} 
              alt="Uploaded Asset preview" 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer"
            />
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 flex items-center justify-center text-white transition-opacity duration-200"
              title="Clear Image"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="w-16 h-16 rounded-xl border-2 border-dashed border-slate-200 bg-slate-100 flex items-center justify-center text-slate-300 shrink-0">
            <Image className="w-6 h-6 stroke-[1.5]" />
          </div>
        )}
      </div>
    </div>
  );
}

interface AdminConsoleProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AdminConsole({ isOpen = true, onClose }: AdminConsoleProps) {
  const {
    services,
    portfolio,
    testimonials,
    skills,
    settings,
    isAdmin,
    currentUser,
    loginWithGoogle,
    loginWithPasscode,
    loginWithEmail,
    loginSimulatedCurator,
    logout,
    updateSettings,
    addOrUpdateService,
    deleteService,
    addOrUpdatePortfolio,
    deletePortfolio,
    addOrUpdateSkill,
    deleteSkill,
    refreshAll,
    showToast,
    setCurrentView
  } = useApp();

  const handleClose = onClose || (() => setCurrentView('home'));

  const [activeTab, setActiveTab] = useState<'contact' | 'inquiries' | 'services' | 'portfolio' | 'testimonials' | 'skills' | 'migration'>('contact');

  // Client Inquiries State
  const [inquiries, setInquiries] = useState<LeadInquiry[]>([]);
  const [isLoadingInquiries, setIsLoadingInquiries] = useState(false);

  const fetchInquiries = async () => {
    setIsLoadingInquiries(true);
    try {
      const snap = await getDocs(collection(db, 'leadInquiries'));
      const items = snap.docs.map(d => ({
        id: d.id,
        ...d.data()
      })) as LeadInquiry[];
      items.sort((a, b) => {
        const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : (a.createdAt?.seconds ? a.createdAt.seconds * 1000 : 0);
        const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : (b.createdAt?.seconds ? b.createdAt.seconds * 1000 : 0);
        return timeB - timeA;
      });
      setInquiries(items);
    } catch (err) {
      console.error('Failed to load inquiries', err);
    } finally {
      setIsLoadingInquiries(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchInquiries();
    }
  }, [isOpen]);

  const handleDeleteInquiry = async (id: string) => {
    if (confirm('Are you sure you want to remove this client inquiry?')) {
      try {
        await deleteDoc(doc(db, 'leadInquiries', id));
        setInquiries(prev => prev.filter(i => i.id !== id));
        showToast('Inquiry removed.', 'success');
      } catch (e) {
        showToast('Failed to delete inquiry.', 'error');
      }
    }
  };

  // Prevent background scrolling and hide the main page scrollbar when Admin Console is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Database Migration States
  const [isMigrating, setIsMigrating] = useState(false);
  const [migrationStatus, setMigrationStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [migrationLogs, setMigrationLogs] = useState<string[]>([]);
  const [migrationProgress, setMigrationProgress] = useState(0);

  const runDataMigration = async () => {
    setIsMigrating(true);
    setMigrationStatus('running');
    setMigrationProgress(0);
    setMigrationLogs([]);

    const log = (msg: string) => {
      setMigrationLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
    };

    log('Initiating database migration sequence...');
    
    const sourceConfig = {
      projectId: "axial-splice-dv8b6",
      appId: "1:145542181695:web:b3e87a0e70a0cab0b0998a",
      apiKey: "AIzaSyCsZXvKMpHqs-K0B7sLL1ZFucK3bqZySX8",
      authDomain: "axial-splice-dv8b6.firebaseapp.com",
      firestoreDatabaseId: "ai-studio-cef04200-bbab-4271-a59f-307b02d8ec4f",
      storageBucket: "axial-splice-dv8b6.firebasestorage.app",
      messagingSenderId: "145542181695"
    };

    try {
      log('Sourcing original project coordinates: axial-splice-dv8b6...');
      
      let srcApp;
      try {
        srcApp = initializeApp(sourceConfig, "sourceApp");
      } catch (err) {
        srcApp = getApp("sourceApp");
      }

      const srcDb = getFirestore(srcApp, sourceConfig.firestoreDatabaseId);
      log('Remote database connection established.');

      const collectionsToMigrate = ["settings", "services", "portfolio", "testimonials", "skills"];
      let totalCopied = 0;

      for (let i = 0; i < collectionsToMigrate.length; i++) {
        const colName = collectionsToMigrate[i];
        log(`Retrieving records for collection: "${colName}"...`);

        const snapVal = await getDocs(collection(srcDb, colName)).catch((err: any) => {
          log(`Warning: Failed to fetch "${colName}". Collection may be empty: ${err.message || err}`);
          return null;
        });

        if (snapVal && !snapVal.empty) {
          log(`Collection "${colName}" loaded. Found ${snapVal.size} documents to migrate.`);
          
          let docNum = 0;
          for (const docSnap of snapVal.docs) {
            const docId = docSnap.id;
            const docData = docSnap.data();

            log(`Copying document [${docId}] to target 'techloomghana' database...`);
            await setDoc(doc(db, colName, docId), docData);
            docNum++;
            totalCopied++;
          }
          log(`Batch replication finished for "${colName}": ${docNum} documents copied.`);
        } else {
          log(`Collection "${colName}" is empty on the source project. Skipped.`);
        }

        setMigrationProgress(Math.round(((i + 1) / collectionsToMigrate.length) * 100));
      }

      log(`Ledger synchronization completed successfully! Migrated ${totalCopied} documents securely.`);
      setMigrationStatus('success');
      showToast(`Replicated ${totalCopied} documents into techloomghana successfully!`, 'success');
      refreshAll();
    } catch (e: any) {
      log(`CRITICAL ERROR during sync: ${e.message || String(e)}`);
      setMigrationStatus('error');
      showToast(`Data migration failed: ${e.message || String(e)}`, 'error');
    } finally {
      setIsMigrating(false);
    }
  };
  const [passcode, setPasscode] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authMode, setAuthMode] = useState<'passcode' | 'email'>('passcode');
  const [authError, setAuthError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionSuccess, setActionSuccess] = useState('');

  const getFriendlyErrorMessage = (errorString: string) => {
    if (!errorString) return null;
    const errorLower = errorString.toLowerCase();
    
    if (errorLower.includes('unauthorized-domain')) {
      return (
        <div className="text-left space-y-2 p-4 bg-rose-950/60 border border-rose-800/60 rounded-xl text-xs leading-relaxed">
          <p className="font-bold text-rose-300">Google Auth: Hostname Not Authorized</p>
          <p className="text-slate-300 font-light">The current environment URL is not listed in your Firebase project's Authorized Domains list (Console → Auth → Settings).</p>
          <p className="text-brand-cyan font-bold font-mono">Tip: Use the "Passcode" or "Email & Password" tabs above to sign in as Admin instantly!</p>
        </div>
      );
    }
    
    if (errorLower.includes('popup-blocked')) {
      return (
        <div className="text-center p-4 bg-amber-950/60 border border-amber-800/60 rounded-xl text-xs leading-relaxed text-amber-300">
          <p className="font-bold">OAuth Popup Blocked</p>
          <p className="text-slate-300">Please enable/allow popups for this site in your browser settings and try again.</p>
        </div>
      );
    }
    
    return (
      <div className="flex items-center gap-1.5 text-rose-400 text-xs font-semibold justify-center text-center p-3 rounded-xl bg-rose-950/20 border border-rose-900/30">
        <AlertCircle className="w-4 h-4 shrink-0" />
        <span>{errorString.replace(/FirebaseError:\s*/g, '')}</span>
      </div>
    );
  };
  
  // Skills edit state
  const [editingSkill, setEditingSkill] = useState<SkillItem | null>(null);
  
  // Service edit state
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [newService, setNewService] = useState<Omit<Service, 'details'>>({ id: '', title: '', description: '', iconName: 'Palette' });
  const [serviceDetailsString, setServiceDetailsString] = useState('');

  // Portfolio edit state
  const [editingPortfolio, setEditingPortfolio] = useState<PortfolioItem | null>(null);
  const [newPortfolio, setNewPortfolio] = useState<Omit<PortfolioItem, 'scope'>>({
    id: '',
    title: '',
    category: 'Branding',
    image: '',
    description: '',
    client: '',
    challenge: '',
    solution: '',
    projectLink: '',
    githubLink: ''
  });
  const [portfolioScopeString, setPortfolioScopeString] = useState('');
  const [portfolioExtraImagesString, setPortfolioExtraImagesString] = useState('');
  const [extraImagesArray, setExtraImagesArray] = useState<string[]>(['', '', '', '']);

  // Contact form state initialized from context
  const [contactForm, setContactForm] = useState<ContactSettings>({
    email: settings?.email || 'techloomgh@yahoo.com',
    phone: settings?.phone || '+233 256 259 336',
    secondaryPhone: settings?.secondaryPhone || '+233 504 041 694',
    location: settings?.location || 'TechLoom Studio, 3rd Floor, Airport Gate Towers, Airport Residential Area, Accra, Ghana',
    openingHours: settings?.openingHours || 'Monday – Saturday, 8:30 AM – 7:00 PM GMT',
    avgResponseTime: settings?.avgResponseTime || 'Average response: under 12 hours for new submissions.',
    socialImpactText: settings?.socialImpactText || "Every project finances the Joe Vardy Al-Hikmah Foundation, educating Accra's underserved youth in modern tech skills.",
    agencySlogan: settings?.agencySlogan || 'We design clean flyers, professional company branding, and fast websites that make Ghanaian businesses look trusted and win more customers.',
    heroBgImage: settings?.heroBgImage || '',
    facebookLink: settings?.facebookLink || '',
    twitterLink: settings?.twitterLink || '',
    instagramLink: settings?.instagramLink || '',
    youtubeLink: settings?.youtubeLink || '',
    linkedinLink: settings?.linkedinLink || '',
    githubLink: settings?.githubLink || '',
    metricNumber: settings?.metricNumber || '100+',
    metricSubtitle: settings?.metricSubtitle || 'Delivered Projects',
    metricDescription: settings?.metricDescription || 'Clean flyers, company branding, and modern websites delivered for businesses across Ghana and beyond.',
    hqTitle: settings?.hqTitle || 'Our Studio',
    hqSubtitle: settings?.hqSubtitle || '& Community Hub',
    socialImpactTitle: settings?.socialImpactTitle || '10% Social Impact Investment',
    socialImpactCardTitle: settings?.socialImpactCardTitle || 'Financing The Future Of Accra',
    heroTitleLine1: settings?.heroTitleLine1 || 'Design That Makes',
    heroTitleLine2: settings?.heroTitleLine2 || 'Your Brand Impossible To Ignore.',
    heroDescription: settings?.heroDescription || 'We design clean brand identities, eye-catching flyers, and fast modern websites that help Ghanaian and international businesses stand out and grow.',
    heroBadgeText: settings?.heroBadgeText || 'Creative Excellence & Strategy',
    heroCardImage: settings?.heroCardImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    heroCardText: settings?.heroCardText || 'Complete brand identity, professional logo design, and brand guidelines built to make your business trusted.',
    heroCardImage1: settings?.heroCardImage1 || '',
    heroCardText1: settings?.heroCardText1 || '',
    heroCardImage2: settings?.heroCardImage2 || '',
    heroCardText2: settings?.heroCardText2 || '',
    heroCardImage3: settings?.heroCardImage3 || '',
    heroCardText3: settings?.heroCardText3 || '',
    heroCardImage4: settings?.heroCardImage4 || '',
    heroCardText4: settings?.heroCardText4 || '',
    selectedHomepagePortfolios: settings?.selectedHomepagePortfolios || [],
    selectedHomepageWebPortfolios: settings?.selectedHomepageWebPortfolios || []
  });

  // Sync settings when loaded from database
  useEffect(() => {
    if (settings) {
      setContactForm({
        email: settings.email || 'techloomgh@yahoo.com',
        phone: settings.phone || '+233 256 259 336',
        secondaryPhone: settings.secondaryPhone || '+233 504 041 694',
        location: settings.location || 'TechLoom Studio, 3rd Floor, Airport Gate Towers, Airport Residential Area, Accra, Ghana',
        openingHours: settings.openingHours || 'Monday – Saturday, 8:30 AM – 7:00 PM GMT',
        avgResponseTime: settings.avgResponseTime || 'Average response: under 12 hours for new submissions.',
        socialImpactText: settings.socialImpactText || 'Every project finances the Joe Vardy Al-Hikmah Foundation, educating Accra\'s underserved youth in modern tech skills.',
        agencySlogan: settings.agencySlogan || 'We design clean flyers, professional company branding, and fast websites that make Ghanaian businesses look trusted and win more customers.',
        heroBgImage: settings.heroBgImage || '',
        facebookLink: settings.facebookLink || '',
        twitterLink: settings.twitterLink || '',
        instagramLink: settings.instagramLink || '',
        youtubeLink: settings.youtubeLink || '',
        linkedinLink: settings.linkedinLink || '',
        githubLink: settings.githubLink || '',
        metricNumber: settings.metricNumber || '100+',
        metricSubtitle: settings.metricSubtitle || 'Delivered Projects',
        metricDescription: settings.metricDescription || 'Clean flyers, company branding, and modern websites delivered for businesses across Ghana and beyond.',
        hqTitle: settings.hqTitle || 'Our Studio',
        hqSubtitle: settings.hqSubtitle || '& Community Hub',
        socialImpactTitle: settings.socialImpactTitle || '10% Social Impact Investment',
        socialImpactCardTitle: settings.socialImpactCardTitle || 'Financing The Future Of Accra',
        heroTitleLine1: settings.heroTitleLine1 || 'Design That Makes',
        heroTitleLine2: settings.heroTitleLine2 || 'Your Brand Impossible To Ignore.',
        heroDescription: settings.heroDescription || 'We design clean brand identities, eye-catching flyers, and fast modern websites that help Ghanaian and international businesses stand out and grow.',
        heroBadgeText: settings.heroBadgeText || 'Creative Excellence & Strategy',
        heroCardImage: settings.heroCardImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
        heroCardText: settings.heroCardText || 'Complete brand identity, professional logo design, and brand guidelines built to make your business trusted.',
        heroCardImage1: settings.heroCardImage1 || '',
        heroCardText1: settings.heroCardText1 || '',
        heroCardImage2: settings.heroCardImage2 || '',
        heroCardText2: settings.heroCardText2 || '',
        heroCardImage3: settings.heroCardImage3 || '',
        heroCardText3: settings.heroCardText3 || '',
        heroCardImage4: settings.heroCardImage4 || '',
        heroCardText4: settings.heroCardText4 || '',
        selectedHomepagePortfolios: settings.selectedHomepagePortfolios || [],
        selectedHomepageWebPortfolios: settings.selectedHomepageWebPortfolios || []
      });
    }
  }, [settings]);

  const triggerSuccess = (msg: string) => {
    setActionSuccess(msg);
    setTimeout(() => setActionSuccess(''), 3000);
  };

  const handlePasscodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode) return;
    setIsSubmitting(true);
    setAuthError('');
    try {
      const ok = await loginWithPasscode(passcode);
      if (ok) {
        setAuthError('');
        setPasscode('');
        if (settings) {
          setContactForm(settings);
        }
      } else {
        setAuthError('Access denied. Incorrect passcode coordinate.');
      }
    } catch (err: any) {
      setAuthError(err?.message || 'Verification of passcode failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !passwordInput) {
      setAuthError('Please fill in both email and password.');
      return;
    }
    setIsSubmitting(true);
    setAuthError('');
    try {
      await loginWithEmail(emailInput, passwordInput);
      setAuthError('');
      setEmailInput('');
      setPasswordInput('');
      if (settings) {
        setContactForm(settings);
      }
    } catch (err: any) {
      setAuthError(err?.message || 'Email & Password verification failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      if (settings) {
        setContactForm(settings);
      }
    } catch (err: any) {
      setAuthError(err?.message || 'Google Auth verification failed.');
    }
  };

  const saveContactSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      const ok = await updateSettings(contactForm);
      if (ok) {
        triggerSuccess('Global coordinates saved to Firestore successfully!');
      }
    } catch (err: any) {
      console.error(err);
      setAuthError(err?.message || 'Error saving settings. Make sure you are authenticated via Google.');
    }
  };

  const handleEditServiceClick = (service: Service) => {
    setEditingService(service);
    setNewService({
      id: service.id,
      title: service.title,
      description: service.description,
      iconName: service.iconName
    });
    setServiceDetailsString(service.details.join('\n'));
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newService.id || !newService.title || !newService.description) return;
    setAuthError('');
    
    const details = serviceDetailsString.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const servicePayload: Service = {
      id: newService.id,
      title: newService.title,
      description: newService.description,
      iconName: newService.iconName,
      details
    };

    try {
      const ok = await addOrUpdateService(servicePayload);
      if (ok) {
        triggerSuccess(editingService ? 'Service updated successfully!' : 'Service created successfully!');
        setEditingService(null);
        setNewService({ id: '', title: '', description: '', iconName: 'Palette' });
        setServiceDetailsString('');
      }
    } catch (err: any) {
      console.error(err);
      setAuthError(err?.message || 'Failed to save service. Check Google Sign-In authentication status.');
    }
  };

  const handleDeleteService = async (id: string) => {
    if (confirm('Are you premium assured about deleting this service specialty?')) {
      setAuthError('');
      try {
        const ok = await deleteService(id);
        if (ok) {
          triggerSuccess('Service specialty removed from database.');
        }
      } catch (err: any) {
        console.error(err);
        setAuthError(err?.message || 'Failed to delete service. Check Google Sign-In authentication status.');
      }
    }
  };

  const handleEditPortfolioClick = (project: PortfolioItem) => {
    setEditingPortfolio(project);
    setNewPortfolio({
      id: project.id,
      title: project.title,
      category: project.category,
      image: project.image,
      description: project.description,
      client: project.client,
      challenge: project.challenge,
      solution: project.solution,
      projectLink: project.projectLink || '',
      githubLink: project.githubLink || ''
    });
    setPortfolioScopeString(project.scope.join(', '));
    setPortfolioExtraImagesString(project.extraImages ? project.extraImages.join(', ') : '');
    const extras = project.extraImages || [];
    const initialSlots = [...extras];
    while (initialSlots.length < 4) {
      initialSlots.push('');
    }
    setExtraImagesArray(initialSlots);
  };

  const handleSavePortfolio = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPortfolio.id || !newPortfolio.title || !newPortfolio.image || !newPortfolio.description) return;
    setAuthError('');

    const scope = portfolioScopeString.split(',').map(item => item.trim()).filter(item => item.length > 0);
    const extraImagesFromInput = portfolioExtraImagesString.split(',').map(item => item.trim()).filter(item => item.length > 0);
    const extraImagesFromUploaders = extraImagesArray.map(item => item.trim()).filter(item => item.length > 0);
    const uniqueExtraImages = Array.from(new Set([...extraImagesFromUploaders, ...extraImagesFromInput])).filter(Boolean);

    const portfolioPayload: PortfolioItem = {
      ...newPortfolio,
      scope,
      category: newPortfolio.category || 'Branding',
      ...(uniqueExtraImages.length > 0 ? { extraImages: uniqueExtraImages } : {}),
      ...(newPortfolio.projectLink ? { projectLink: newPortfolio.projectLink } : {}),
      ...(newPortfolio.githubLink ? { githubLink: newPortfolio.githubLink } : {})
    };

    try {
      const ok = await addOrUpdatePortfolio(portfolioPayload);
      if (ok) {
        triggerSuccess(editingPortfolio ? 'Portfolio Project updated in Firestore!' : 'Portfolio Project created in Firestore!');
        setEditingPortfolio(null);
        setNewPortfolio({
          id: '',
          title: '',
          category: 'Branding',
          image: '',
          description: '',
          client: '',
          challenge: '',
          solution: '',
          projectLink: '',
          githubLink: ''
        });
        setPortfolioScopeString('');
        setPortfolioExtraImagesString('');
        setExtraImagesArray(['', '', '', '']);
      }
    } catch (err: any) {
      console.error(err);
      setAuthError(err?.message || 'Failed to save portfolio. Check Google Sign-In authentication status.');
    }
  };

  const handleDeletePortfolio = async (id: string) => {
    if (confirm('Are you absolutely certain about deleting this portfolio project?')) {
      setAuthError('');
      try {
        const ok = await deletePortfolio(id);
        if (ok) {
          triggerSuccess('Portfolio project permanently removed.');
        }
      } catch (err: any) {
        console.error(err);
        setAuthError(err?.message || 'Failed to delete portfolio entry.');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950 flex font-sans">
      {/* Main Fullscreen Workspace Shell */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="w-full h-full flex flex-col md:flex-row overflow-hidden relative"
      >
        {!isAdmin ? (
          /* LOCK SCREEN / GATEWAY VIEW */
          <div className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-950 text-slate-100 min-h-screen relative overflow-y-auto">
            {/* Ambient Background Glows */}
            <div className="absolute top-[10%] left-[20%] w-[35rem] h-[35rem] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[10%] right-[20%] w-[35rem] h-[35rem] bg-brand-cyan/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-md mx-auto relative z-10 space-y-8 bg-slate-900/60 border border-slate-800/80 p-8 sm:p-10 rounded-3xl backdrop-blur-xl shadow-2xl">
              <button 
                onClick={handleClose}
                className="absolute top-4 right-4 px-3 py-1.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer border border-slate-700 flex items-center gap-1.5 text-xs"
                title="Return to site"
              >
                <span>Exit</span>
                <X className="w-3.5 h-3.5" />
              </button>

              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-tr from-slate-900 to-slate-800 border border-slate-700/60 text-slate-100 mx-auto flex items-center justify-center rounded-2xl shadow-xl">
                  <Lock className="w-7 h-7 text-brand-cyan" />
                </div>
                <h3 className="font-display font-[900] text-2xl tracking-normal text-white">Security Gateway</h3>
                <p className="text-slate-400 text-xs font-light max-w-xs mx-auto leading-relaxed">
                  Provide credentials or administrator passcode to unlock database editing capabilities.
                </p>
              </div>

              {/* Login Method Tabs */}
              <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-850/80 max-w-xs mx-auto">
                <button
                  type="button"
                  onClick={() => { setAuthMode('passcode'); setAuthError(''); }}
                  className={`flex-1 py-1.5 text-[10px] font-mono uppercase tracking-wider rounded-lg font-bold transition-all cursor-pointer ${
                    authMode === 'passcode' 
                      ? 'bg-gradient-to-r from-slate-900 to-slate-800 text-brand-cyan shadow border border-slate-700/30' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Passcode
                </button>
                <button
                  type="button"
                  onClick={() => { setAuthMode('email'); setAuthError(''); }}
                  className={`flex-1 py-1.5 text-[10px] font-mono uppercase tracking-wider rounded-lg font-bold transition-all cursor-pointer ${
                    authMode === 'email' 
                      ? 'bg-gradient-to-r from-slate-900 to-slate-800 text-brand-cyan shadow border border-slate-700/30' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Email & Password
                </button>
              </div>

              {/* Passcode Access */}
              {authMode === 'passcode' ? (
                <form onSubmit={handlePasscodeSubmit} className="space-y-4">
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-mono tracking-widest uppercase font-bold text-slate-400">Passcode Code</label>
                    <input
                      type="password"
                      placeholder="Enter security passcode..."
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      disabled={isSubmitting}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-blue disabled:opacity-50 transition-all font-mono"
                    />
                  </div>
                  {getFriendlyErrorMessage(authError)}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white text-xs font-bold uppercase tracking-wider py-4 rounded-xl transition-all cursor-pointer shadow-md shadow-brand-blue/10 font-mono disabled:opacity-50 flex items-center justify-center"
                  >
                    {isSubmitting ? 'Verifying passcode...' : 'Verify Access Code'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-mono tracking-widest uppercase font-bold text-slate-400">Admin Email</label>
                    <input
                      type="email"
                      placeholder="e.g. joevardy2004@gmail.com"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      disabled={isSubmitting}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-blue disabled:opacity-50 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-mono tracking-widest uppercase font-bold text-slate-400">Security Password</label>
                    <input
                      type="password"
                      placeholder="Enter account security password..."
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      disabled={isSubmitting}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-blue disabled:opacity-50 transition-all font-mono"
                    />
                  </div>
                  {getFriendlyErrorMessage(authError)}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white text-xs font-bold uppercase tracking-wider py-4 rounded-xl transition-all cursor-pointer shadow-md shadow-brand-blue/10 font-mono disabled:opacity-50 flex items-center justify-center"
                  >
                    {isSubmitting ? 'Verifying credentials...' : 'Verify Email & Password'}
                  </button>
                </form>
              )}

              {/* OAuth Google Sign In */}
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-slate-800"></div>
                <span className="flex-shrink mx-4 text-slate-500 text-[9px] font-mono uppercase tracking-widest bg-transparent z-10 px-2">Or Verify via</span>
                <div className="flex-grow border-t border-slate-800"></div>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-2.5 bg-slate-950 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-900 text-slate-200 font-bold text-xs uppercase tracking-wider py-4 rounded-xl shadow-inner transition-all cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5.04c1.61 0 3.09.55 4.22 1.62l3.15-3.15C17.43 1.68 14.9 1 12 1 7.35 1 3.37 3.59 1.42 7.42l3.86 3C6.18 7.37 8.87 5.04 12 5.04z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.47h6.45c-.28 1.47-1.11 2.71-2.36 3.55l3.67 2.85c2.14-1.97 3.73-4.88 3.73-8.51z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.58c-.24-.71-.38-1.48-.38-2.28s.14-1.57.38-2.28L1.42 7.42C.51 9.21 0 11.23 0 13.34s.51 4.13 1.42 5.92l3.86-3c-.24-.71-.38-1.48-.38-2.28z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.67-2.85c-1.01.68-2.31 1.09-3.95 1.09-3.13 0-5.82-2.33-6.72-5.38l-3.86 3C3.37 20.41 7.35 23 12 23z"
                  />
                </svg>
                <span>Google Administrator Account</span>
              </button>



              {authError && authError.toLowerCase().includes('unauthorized-domain') && (
                <div className="bg-amber-950/20 border border-amber-850/40 rounded-2xl p-5 space-y-3 pb-4 text-left animate-fadeIn">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
                    <Sparkles className="w-4 h-4 text-amber-400 animate-pulse shrink-0" />
                    <span>Authorized Domain Setup Required</span>
                  </div>
                  <p className="text-slate-400 font-light leading-relaxed text-[11px]">
                    Your Firebase Auth project is rejecting sign-ins from this preview sandbox port. To fix this:
                  </p>
                  <ol className="list-decimal pl-4 space-y-1.5 text-slate-400 font-light text-[11px] leading-relaxed">
                    <li>Go to the <a href="https://console.firebase.google.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-cyan hover:underline">Firebase Console</a>.</li>
                    <li>Select project <code className="font-mono bg-slate-950 px-1 py-0.5 rounded text-[10px] font-bold text-amber-200">techloomghana</code>.</li>
                    <li>Head directly to <strong className="font-semibold text-slate-300">Authentication &gt; Settings &gt; Authorized domains</strong>.</li>
                    <li>Press <strong className="font-semibold text-slate-300">Add domain</strong> and paste:
                      <div className="mt-1 flex items-center justify-between bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 font-mono text-[10px] font-bold select-all overflow-x-auto text-slate-300">
                        {window.location.hostname}
                      </div>
                    </li>
                  </ol>
                  <div className="mt-1 pt-3 border-t border-slate-800">
                    <p className="text-[11px] font-light leading-relaxed text-amber-200">
                      💡 <strong className="font-bold text-amber-300">Quick Workaround:</strong> Type passcode <code className="font-mono bg-amber-900/30 border border-amber-850 px-1.5 py-0.5 rounded text-[10px] font-black text-white select-all tracking-wider">LoomAdmin2026</code> into the <strong>Passcode Code</strong> field above to log in instantly!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* FULL SCREEN LANDSCAPE COMMAND WORKSPACE */
          <div className="flex-grow flex flex-col md:flex-row overflow-hidden w-full h-full">
            
            {/* SIDEBAR NAVIGATION RAIL (Desktop) */}
            <div className="hidden md:flex flex-col w-72 bg-slate-950 border-r border-slate-800/80 p-6 flex-shrink-0 justify-between h-full text-left font-sans select-none z-10 shrink-0">
              <div className="space-y-8">
                {/* Brand Identity / Header info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-brand-blue/15 rounded-xl border border-brand-blue/30 shadow-inner">
                      <ShieldCheck className="w-5.5 h-5.5 text-brand-cyan animate-pulse" />
                    </div>
                    <div>
                      <h4 className="font-display font-black text-sm tracking-tight text-white uppercase">Control Center</h4>
                      <p className="text-[9px] font-mono tracking-widest text-slate-500 uppercase">Live Database sync</p>
                    </div>
                  </div>
                  
                  {/* Sync Status bar */}
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[9px] font-mono bg-slate-900 border border-slate-800/60 text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>ONLINE CLOUD SERVER</span>
                  </div>
                </div>

                {/* Dashboard Vertical Menu buttons */}
                <div className="space-y-1.5">
                  <span className="block text-[9px] font-mono font-bold tracking-widest text-slate-500 uppercase pb-1 pl-1">
                    System Parameters
                  </span>

                  {/* Tab Button 1: Contact */}
                  <button
                    onClick={() => setActiveTab('contact')}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'contact'
                        ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20 border border-transparent'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 stroke-[1.8]" />
                      <span>Coordinates & Slogan</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  </button>

                  {/* Tab Button: Client Inquiries */}
                  <button
                    onClick={() => {
                      setActiveTab('inquiries');
                      fetchInquiries();
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'inquiries'
                        ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20 border border-transparent'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Inbox className="w-4 h-4 stroke-[1.8]" />
                      <span>Client Inquiries</span>
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${activeTab === 'inquiries' ? 'bg-white/20 text-white' : 'bg-slate-900 text-slate-500'}`}>
                      {inquiries.length}
                    </span>
                  </button>

                  {/* Tab Button 2: Services */}
                  <button
                    onClick={() => setActiveTab('services')}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'services'
                        ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20 border border-transparent'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Briefcase className="w-4 h-4 stroke-[1.8]" />
                      <span>Service Specialties</span>
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${activeTab === 'services' ? 'bg-white/20 text-white' : 'bg-slate-900 text-slate-500'}`}>
                      {services.length}
                    </span>
                  </button>

                  {/* Tab Button 3: Portfolio */}
                  <button
                    onClick={() => setActiveTab('portfolio')}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'portfolio'
                        ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20 border border-transparent'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Image className="w-4 h-4 stroke-[1.8]" />
                      <span>Portfolio Items</span>
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${activeTab === 'portfolio' ? 'bg-white/20 text-white' : 'bg-slate-900 text-slate-500'}`}>
                      {portfolio.length}
                    </span>
                  </button>

                  {/* Tab Button 4: Testimonials */}
                  <button
                    onClick={() => setActiveTab('testimonials')}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'testimonials'
                        ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20 border border-transparent'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <MessageSquare className="w-4 h-4 stroke-[1.8]" />
                      <span>Testimonials</span>
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${activeTab === 'testimonials' ? 'bg-white/20 text-white' : 'bg-slate-900 text-slate-500'}`}>
                      {testimonials.length}
                    </span>
                  </button>

                  {/* Tab Button 5: Skills */}
                  <button
                    onClick={() => setActiveTab('skills')}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'skills'
                        ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20 border border-transparent'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <UserCheck className="w-4 h-4 stroke-[1.8]" />
                      <span>Skill Gauges</span>
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${activeTab === 'skills' ? 'bg-white/20 text-white' : 'bg-slate-900 text-slate-500'}`}>
                      {skills?.length || 0}
                    </span>
                  </button>

                  {/* Tab Button 6: Migration */}
                  <button
                    onClick={() => setActiveTab('migration')}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'migration'
                        ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20 border border-transparent'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Database className="w-4 h-4 stroke-[1.8]" />
                      <span>Cloud Migration</span>
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${activeTab === 'migration' ? 'bg-white/20 text-white' : 'bg-slate-900 text-slate-500'}`}>
                      Sync
                    </span>
                  </button>
                </div>
              </div>

              {/* Profile Card and Exit button */}
              <div className="space-y-4 border-t border-slate-800/80 pt-6">
                <div className="bg-slate-900/60 rounded-2xl p-3 border border-slate-800 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-blue to-teal-500 flex items-center justify-center font-display font-black text-xs text-white uppercase tracking-tight">
                    AD
                  </div>
                  <div className="overflow-hidden">
                    <span className="block text-[11px] font-bold text-white truncate">Administrator</span>
                    <span className="block text-[9px] font-mono text-emerald-400 animate-pulse tracking-tight truncate">Live Edit Active</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={logout}
                    className="w-full py-2.5 text-center bg-slate-900 hover:bg-rose-500/10 border border-slate-800 hover:border-rose-500/30 text-slate-400 hover:text-rose-400 rounded-xl text-[10px] font-bold uppercase tracking-wider font-mono transition-all cursor-pointer duration-200"
                  >
                    Exit Admin Mode & Lock
                  </button>
                </div>
              </div>
            </div>

            {/* MAIN WORKSPACE CANVAS (Right Panel on Desktop, Full Column on Mobile) */}
            <div className="flex-grow flex flex-col min-w-0 bg-slate-50 overflow-hidden relative">
              
              {/* TOP ACTION DOCK */}
              <div className="h-16 border-b border-slate-200/80 bg-white shadow-xs px-6 flex items-center justify-between flex-shrink-0">
                {/* Left side: Breadcrumb / Active status on mobile */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono bg-slate-100 text-slate-500 px-2 py-0.5 rounded shrink-0 uppercase tracking-wider">
                    {activeTab}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 hidden sm:inline">/</span>
                  <span className="text-xs font-black text-slate-800 hidden sm:inline font-display uppercase tracking-wider">
                    Configure Elements
                  </span>
                </div>

                {/* Right side: Exit buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleClose}
                    className="p-2 sm:px-4 sm:py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 font-sans hover:bg-slate-200 shadow-inner flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span className="hidden sm:inline">Exit to Website</span>
                  </button>
                </div>
              </div>

              {/* Status Indicator Banners */}
              <AnimatePresence>
                {actionSuccess && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-emerald-50 border-b border-emerald-100 text-emerald-700 px-6 py-3.5 text-xs font-bold text-center flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4 bg-emerald-550 text-white rounded-full p-0.5" />
                    <span>{actionSuccess}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* HORIZONTAL MOBILE MENU TABS (Hidden on Desktop) */}
              <div className="md:hidden flex border-b border-slate-100 bg-white overflow-x-auto gap-2 shrink-0 p-2.5">
                <button
                  onClick={() => setActiveTab('contact')}
                  className={`px-3 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === 'contact' ? 'bg-brand-blue text-white' : 'bg-slate-50 text-slate-450 hover:bg-slate-100'
                  }`}
                >
                  Coordinates
                </button>
                <button
                  onClick={() => {
                    setActiveTab('inquiries');
                    fetchInquiries();
                  }}
                  className={`px-3 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === 'inquiries' ? 'bg-brand-blue text-white' : 'bg-slate-50 text-slate-450 hover:bg-slate-100'
                  }`}
                >
                  Inquiries ({inquiries.length})
                </button>
                <button
                  onClick={() => setActiveTab('services')}
                  className={`px-3 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === 'services' ? 'bg-brand-blue text-white' : 'bg-slate-50 text-slate-450 hover:bg-slate-100'
                  }`}
                >
                  Specialties ({services.length})
                </button>
                <button
                  onClick={() => setActiveTab('portfolio')}
                  className={`px-3 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === 'portfolio' ? 'bg-brand-blue text-white' : 'bg-slate-50 text-slate-450 hover:bg-slate-100'
                  }`}
                >
                  Projects ({portfolio.length})
                </button>
                <button
                  onClick={() => setActiveTab('testimonials')}
                  className={`px-3 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === 'testimonials' ? 'bg-brand-blue text-white' : 'bg-slate-50 text-slate-450 hover:bg-slate-100'
                  }`}
                >
                  Reviews ({testimonials.length})
                </button>
                <button
                  onClick={() => setActiveTab('skills')}
                  className={`px-3 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === 'skills' ? 'bg-brand-blue text-white' : 'bg-slate-50 text-slate-450 hover:bg-slate-100'
                  }`}
                >
                  Skills ({skills?.length || 0})
                </button>
                <button
                  onClick={() => setActiveTab('migration')}
                  className={`px-3 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === 'migration' ? 'bg-brand-blue text-white' : 'bg-slate-50 text-slate-450 hover:bg-slate-100'
                  }`}
                >
                  Cloud Migration
                </button>
              </div>

              {/* SCROLLABLE FORM DESK (Holds active dynamic workspace elements) */}
              <div className="flex-grow overflow-y-auto p-6 md:p-10 text-slate-800">
                <div className="max-w-4xl mx-auto space-y-8 text-left">
                  
                  {/* Console Error banner */}
                  {authError && (
                    <div className="bg-rose-50 border border-rose-100 p-5 rounded-2xl flex flex-col gap-2.5 shrink-0 animate-fadeIn text-rose-800 text-xs font-light leading-relaxed">
                      <div className="flex items-center gap-2 text-rose-950 font-bold">
                        <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
                        <span>Database Mutation Restricted</span>
                      </div>
                      <div>
                        {authError.startsWith('{') ? (
                          (() => {
                            try {
                              const parsed = JSON.parse(authError);
                              return (
                                <div className="space-y-1">
                                  <p>The remote database is offline or rejected this request: <strong>{parsed.error || 'Permission Denied'}</strong>.</p>
                                  <p className="font-mono text-[10px] text-slate-500 mt-1">Operation: {parsed.operationType.toUpperCase()} | Path: {parsed.path || 'unknown'}</p>
                                  {(!parsed.authInfo || !parsed.authInfo.email) && (
                                    <p className="mt-3 text-amber-800 font-normal">
                                      💡 <strong>Required Action:</strong> You are logged in with the local security passcode. To persist these modifications directly to your digital agency cloud database, please sign out of Admin mode, then authenticate using <strong>Google Sign-In</strong> with an authorized admin account (like <code>joevardy2004@gmail.com</code>).
                                    </p>
                                  )}
                                </div>
                              );
                            } catch {
                              return <p>{authError}</p>;
                            }
                          })()
                        ) : (
                          <div className="space-y-1">
                            <p>{authError}</p>
                            {(authError.toLowerCase().includes('could not reach cloud firestore') || authError.toLowerCase().includes('offline') || authError.toLowerCase().includes('backend')) && (
                              <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-100 text-amber-900 space-y-2 text-xs">
                                <p className="font-bold">⚠️ Connection Issue or Firestore Database Not Created</p>
                                <p>This occurs when the client tries to synchronize but the Cloud Firestore Database has not been initialized/activated on your personal physical Google Cloud project yet.</p>
                                <p className="font-semibold">How to Enable Firestore in 20 Seconds:</p>
                                <ol className="list-decimal list-inside space-y-1 pl-1 text-[11px]">
                                  <li>Open your <a href="https://console.firebase.google.com/project/techloomghana/firestore" target="_blank" rel="noopener noreferrer" className="underline font-bold text-blue-600 hover:text-blue-800">Firebase Firestore Console (techloomghana)</a>.</li>
                                  <li>Click the <strong className="bg-amber-100/50 px-1 rounded font-normal">Create database</strong> action banner.</li>
                                  <li>Choose your geographic hosting area, select <strong className="bg-amber-100/50 px-1 rounded font-normal">Production mode</strong> (the application's secure security rules are already prepared and deployed!), and click <strong className="bg-amber-100/50 px-1 rounded font-normal">Enable</strong>.</li>
                                </ol>
                                <p className="text-[10px] text-slate-500 pt-1">Once enabled on your console, refresh the agency window to connect and synchronize all dynamic specialties.</p>
                              </div>
                            )}
                            {!currentUser && (
                              <p className="mt-3 text-amber-800 font-normal">
                                💡 <strong>Required Action:</strong> You are logged in with the local security passcode. To persist these modifications directly to your digital agency cloud database, please sign out of Admin mode, then authenticate using <strong>Google Sign-In</strong> with an authorized admin account (like <code>joevardy2004@gmail.com</code>).
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Operational Controls for Workspace */}
                  <div className="pt-1">
                    {/* Console Session Active User Banner (Mobile only) */}
                    <div className="md:hidden bg-slate-100 border border-slate-200/65 px-4.5 py-3 rounded-2xl flex flex-wrap items-center justify-between gap-3 mb-6">
                      <span className="text-[11px] font-semibold text-slate-600">
                        Session: <strong className="text-slate-800">Admin Mode Active</strong>
                      </span>
                      <button
                        onClick={logout}
                        className="text-[10px] font-black text-rose-500 hover:text-rose-600 uppercase tracking-widest cursor-pointer"
                      >
                        Exit Mode
                      </button>
                    </div>
                  </div>

                  <div className="pt-2">
                {/* TAB 1: CONTACT SETTINGS */}
                {activeTab === 'contact' && (
                  <form onSubmit={saveContactSettings} className="space-y-6">
                    <h4 className="font-display font-extrabold text-lg text-slate-900 border-b border-slate-100 pb-2">
                      Update Dynamic Coordinates
                    </h4>

                    {/* Slogan */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Agency Slogan Banner</label>
                      <textarea
                        rows={3}
                        value={contactForm.agencySlogan}
                        onChange={(e) => setContactForm({ ...contactForm, agencySlogan: e.target.value })}
                        className="w-full bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-brand-blue transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Official Correspondence Email</label>
                        <input
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          className="w-full bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-brand-blue transition-all"
                        />
                      </div>

                      {/* Phone */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Primary WhatsApp Hotline Number</label>
                        <input
                          type="text"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          className="w-full bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-brand-blue transition-all"
                        />
                      </div>

                      {/* Secondary Phone */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Secondary WhatsApp / Contact Line</label>
                        <input
                          type="text"
                          value={contactForm.secondaryPhone || ''}
                          onChange={(e) => setContactForm({ ...contactForm, secondaryPhone: e.target.value })}
                          placeholder="+233 504 041 694"
                          className="w-full bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-brand-blue transition-all"
                        />
                      </div>

                      {/* Opening Hours */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Operational Hours</label>
                        <input
                          type="text"
                          value={contactForm.openingHours}
                          onChange={(e) => setContactForm({ ...contactForm, openingHours: e.target.value })}
                          className="w-full bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-brand-blue transition-all"
                        />
                      </div>

                      {/* Response Time */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Average Response Benchmark</label>
                        <input
                          type="text"
                          value={contactForm.avgResponseTime}
                          onChange={(e) => setContactForm({ ...contactForm, avgResponseTime: e.target.value })}
                          className="w-full bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-brand-blue transition-all"
                        />
                      </div>
                    </div>

                    {/* Location */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Physical Studio HQ Address</label>
                      <input
                        type="text"
                        value={contactForm.location}
                        onChange={(e) => setContactForm({ ...contactForm, location: e.target.value })}
                        className="w-full bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-brand-blue transition-all"
                      />
                    </div>

                    {/* Impact Text */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Youth Foundation Philanthropy Detail</label>
                      <textarea
                        rows={3}
                        value={contactForm.socialImpactText}
                        onChange={(e) => setContactForm({ ...contactForm, socialImpactText: e.target.value })}
                        className="w-full bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-brand-blue transition-all"
                      />
                    </div>

                    {/* NEW: Hero Section Background Customization */}
                    <div className="pt-4 border-t border-slate-100">
                      <ImageUploader
                        id="hero-bg-uploader"
                        label="Hero Section Custom Background Image"
                        value={contactForm.heroBgImage || ''}
                        onChange={(base64) => setContactForm({ ...contactForm, heroBgImage: base64 })}
                        placeholder="Paste network asset link or upload a custom image for the Hero background"
                      />
                    </div>

                    {/* NEW: Social Connection Shortcuts */}
                    <div className="space-y-4 pt-4 border-t border-slate-100">
                      <h5 className="text-xs font-bold text-slate-600 uppercase tracking-widest font-display">Social Connection Shortcuts</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Facebook Link</label>
                          <input
                            type="text"
                            placeholder="https://facebook.com/username"
                            value={contactForm.facebookLink || ''}
                            onChange={(e) => setContactForm({ ...contactForm, facebookLink: e.target.value })}
                            className="w-full bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue transition-all"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Twitter Link</label>
                          <input
                            type="text"
                            placeholder="https://twitter.com/username"
                            value={contactForm.twitterLink || ''}
                            onChange={(e) => setContactForm({ ...contactForm, twitterLink: e.target.value })}
                            className="w-full bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue transition-all"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Instagram Link</label>
                          <input
                            type="text"
                            placeholder="https://instagram.com/username"
                            value={contactForm.instagramLink || ''}
                            onChange={(e) => setContactForm({ ...contactForm, instagramLink: e.target.value })}
                            className="w-full bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue transition-all"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Youtube Link</label>
                          <input
                            type="text"
                            placeholder="https://youtube.com/channel"
                            value={contactForm.youtubeLink || ''}
                            onChange={(e) => setContactForm({ ...contactForm, youtubeLink: e.target.value })}
                            className="w-full bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue transition-all"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">LinkedIn Link</label>
                          <input
                            type="text"
                            placeholder="https://linkedin.com/company/username"
                            value={contactForm.linkedinLink || ''}
                            onChange={(e) => setContactForm({ ...contactForm, linkedinLink: e.target.value })}
                            className="w-full bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue transition-all"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">GitHub Link</label>
                          <input
                            type="text"
                            placeholder="https://github.com/username"
                            value={contactForm.githubLink || ''}
                            onChange={(e) => setContactForm({ ...contactForm, githubLink: e.target.value })}
                            className="w-full bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* NEW: Performance Metric Details */}
                    <div className="space-y-4 pt-4 border-t border-slate-100">
                      <h5 className="text-xs font-bold text-slate-600 uppercase tracking-widest font-display">Performance Metrics & Verify Cards</h5>
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Metric Highlight Number (e.g. 1000+)</label>
                            <input
                              type="text"
                              value={contactForm.metricNumber || ''}
                              onChange={(e) => setContactForm({ ...contactForm, metricNumber: e.target.value })}
                              className="w-full bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Metric Subtitle Title</label>
                            <input
                              type="text"
                              value={contactForm.metricSubtitle || ''}
                              onChange={(e) => setContactForm({ ...contactForm, metricSubtitle: e.target.value })}
                              className="w-full bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800"
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Metric Core Description</label>
                          <input
                            type="text"
                            value={contactForm.metricDescription || ''}
                            onChange={(e) => setContactForm({ ...contactForm, metricDescription: e.target.value })}
                            className="w-full bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800"
                          />
                        </div>
                      </div>
                    </div>

                    {/* NEW: Headquarters and Impact Content Titles */}
                    <div className="space-y-4 pt-4 border-t border-slate-100">
                      <h5 className="text-xs font-bold text-slate-600 uppercase tracking-widest font-display">Headquarters & Social Impact Content Labels</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">HQ Title Header (e.g. Our Studio)</label>
                          <input
                            type="text"
                            value={contactForm.hqTitle || ''}
                            onChange={(e) => setContactForm({ ...contactForm, hqTitle: e.target.value })}
                            className="w-full bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">HQ Title Subheader (e.g. & Community Hub)</label>
                          <input
                            type="text"
                            value={contactForm.hqSubtitle || ''}
                            onChange={(e) => setContactForm({ ...contactForm, hqSubtitle: e.target.value })}
                            className="w-full bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Social Impact Badge Title (e.g. 10% Social Impact Investment)</label>
                          <input
                            type="text"
                            value={contactForm.socialImpactTitle || ''}
                            onChange={(e) => setContactForm({ ...contactForm, socialImpactTitle: e.target.value })}
                            className="w-full bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Social Impact Card Title / Topic</label>
                          <input
                            type="text"
                            value={contactForm.socialImpactCardTitle || ''}
                            onChange={(e) => setContactForm({ ...contactForm, socialImpactCardTitle: e.target.value })}
                            className="w-full bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800"
                          />
                        </div>
                      </div>
                    </div>

                    {/* NEW: Customizable Hero / Header Section Texts */}
                    <div className="space-y-4 pt-4 border-t border-slate-100">
                      <h5 className="text-xs font-bold text-slate-600 uppercase tracking-widest font-display">Hero & Header Section Text Customization</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold font-semibold text-brand-blue">Hero Heading Line 1</label>
                          <input
                            type="text"
                            placeholder="e.g. Your Cosmic Path"
                            value={contactForm.heroTitleLine1 || ''}
                            onChange={(e) => setContactForm({ ...contactForm, heroTitleLine1: e.target.value })}
                            className="w-full bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:border-brand-blue"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold font-semibold text-brand-blue">Hero Heading Line 2</label>
                          <input
                            type="text"
                            placeholder="e.g. To Clarity."
                            value={contactForm.heroTitleLine2 || ''}
                            onChange={(e) => setContactForm({ ...contactForm, heroTitleLine2: e.target.value })}
                            className="w-full bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:border-brand-blue"
                          />
                        </div>
                        <div className="space-y-1 md:col-span-2">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold font-semibold text-brand-blue">Hero Badge Text</label>
                          <input
                            type="text"
                            placeholder="e.g. 5 Second Transition Loop"
                            value={contactForm.heroBadgeText || ''}
                            onChange={(e) => setContactForm({ ...contactForm, heroBadgeText: e.target.value })}
                            className="w-full bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:border-brand-blue"
                          />
                        </div>
                        <div className="space-y-1 md:col-span-2">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold font-semibold text-brand-blue">Hero Description Text</label>
                          <textarea
                            rows={3}
                            placeholder="Through in-depth astrology readings..."
                            value={contactForm.heroDescription || ''}
                            onChange={(e) => setContactForm({ ...contactForm, heroDescription: e.target.value })}
                            className="w-full bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:border-brand-blue"
                          />
                        </div>
                        <div className="space-y-1 md:col-span-2">
                          <ImageUploader
                            id="hero-card-image-uploader"
                            label="Hero Interactive Card Default Image"
                            value={contactForm.heroCardImage || ''}
                            onChange={(base64OrLink) => setContactForm({ ...contactForm, heroCardImage: base64OrLink })}
                            placeholder="Paste network asset link or upload a custom image for the Hero interactive card illustration"
                          />
                        </div>
                        <div className="space-y-1 md:col-span-2">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold font-semibold text-brand-blue">Hero Interactive Card Default Description Text</label>
                          <textarea
                            rows={3}
                            placeholder="Whether you are seeking guidance..."
                            value={contactForm.heroCardText || ''}
                            onChange={(e) => setContactForm({ ...contactForm, heroCardText: e.target.value })}
                            className="w-full bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:border-brand-blue"
                          />
                        </div>

                        {/* Separator line for Slide contents */}
                        <div className="border-t border-slate-200/60 my-2 md:col-span-2 pt-4">
                          <h4 className="text-sm font-bold text-slate-800">4-Slide Carousel Contents</h4>
                          <p className="text-[10px] text-slate-500 font-normal">Provide 4 distinct images and customized details for each of the automatic fading slide cards synced with the cosmic accent themes.</p>
                        </div>

                        {/* SLIDE 1 */}
                        <div className="space-y-4 md:col-span-2 p-4 border border-blue-100 rounded-2xl bg-blue-50/15">
                          <span className="text-[10px] font-mono font-bold text-brand-blue uppercase">Slide 1 (Blue Accent Theme / Horizon)</span>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <ImageUploader
                                id="hero-card-slide-1"
                                label="Slide 1 Showcase Image"
                                value={contactForm.heroCardImage1 || ''}
                                onChange={(base64OrLink) => setContactForm({ ...contactForm, heroCardImage1: base64OrLink })}
                                placeholder="Slide 1 picture (Optional - fallback to default)"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">Slide 1 Details Text</label>
                              <textarea
                                rows={3}
                                placeholder="Details shown for slide 1"
                                value={contactForm.heroCardText1 || ''}
                                onChange={(e) => setContactForm({ ...contactForm, heroCardText1: e.target.value })}
                                className="w-full bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:border-brand-blue"
                              />
                            </div>
                          </div>
                        </div>

                        {/* SLIDE 2 */}
                        <div className="space-y-4 md:col-span-2 p-4 border border-purple-100 rounded-2xl bg-purple-50/15">
                          <span className="text-[10px] font-mono font-bold text-indigo-500 uppercase">Slide 2 (Purple Accent Theme / Zenith)</span>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <ImageUploader
                                id="hero-card-slide-2"
                                label="Slide 2 Showcase Image"
                                value={contactForm.heroCardImage2 || ''}
                                onChange={(base64OrLink) => setContactForm({ ...contactForm, heroCardImage2: base64OrLink })}
                                placeholder="Slide 2 picture"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">Slide 2 Details Text</label>
                              <textarea
                                rows={3}
                                placeholder="Details shown for slide 2"
                                value={contactForm.heroCardText2 || ''}
                                onChange={(e) => setContactForm({ ...contactForm, heroCardText2: e.target.value })}
                                className="w-full bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:border-brand-blue"
                              />
                            </div>
                          </div>
                        </div>

                        {/* SLIDE 3 */}
                        <div className="space-y-4 md:col-span-2 p-4 border border-emerald-100 rounded-2xl bg-emerald-50/15">
                          <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase">Slide 3 (Emerald Accent Theme / Nadir)</span>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <ImageUploader
                                id="hero-card-slide-3"
                                label="Slide 3 Showcase Image"
                                value={contactForm.heroCardImage3 || ''}
                                onChange={(base64OrLink) => setContactForm({ ...contactForm, heroCardImage3: base64OrLink })}
                                placeholder="Slide 3 picture"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">Slide 3 Details Text</label>
                              <textarea
                                rows={3}
                                placeholder="Details shown for slide 3"
                                value={contactForm.heroCardText3 || ''}
                                onChange={(e) => setContactForm({ ...contactForm, heroCardText3: e.target.value })}
                                className="w-full bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:border-brand-blue"
                              />
                            </div>
                          </div>
                        </div>

                        {/* SLIDE 4 */}
                        <div className="space-y-4 md:col-span-2 p-4 border border-rose-100 rounded-2xl bg-rose-50/15">
                          <span className="text-[10px] font-mono font-bold text-rose-500 uppercase">Slide 4 (Rose Accent Theme / Eclipse)</span>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <ImageUploader
                                id="hero-card-slide-4"
                                label="Slide 4 Showcase Image"
                                value={contactForm.heroCardImage4 || ''}
                                onChange={(base64OrLink) => setContactForm({ ...contactForm, heroCardImage4: base64OrLink })}
                                placeholder="Slide 4 picture"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">Slide 4 Details Text</label>
                              <textarea
                                rows={3}
                                placeholder="Details shown for slide 4"
                                value={contactForm.heroCardText4 || ''}
                                onChange={(e) => setContactForm({ ...contactForm, heroCardText4: e.target.value })}
                                className="w-full bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:border-brand-blue"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 bg-slate-900 hover:bg-black text-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-sm w-full md:w-auto"
                    >
                      <span>Commit Coordinates to Firestore</span>
                    </button>
                  </form>
                )}

                {/* TAB: CLIENT INQUIRIES & MESSAGES */}
                {activeTab === 'inquiries' && (
                  <div className="space-y-6">
                    {/* Header bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                      <div>
                        <div className="flex items-center gap-2.5">
                          <h4 className="font-display font-bold text-base text-slate-900">
                            Client Inquiries &amp; Messages
                          </h4>
                          <span className="text-[11px] font-mono font-bold bg-brand-blue/10 text-brand-blue px-2.5 py-0.5 rounded-full border border-brand-blue/20">
                            {inquiries.length} Messages
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          Direct submissions received from the website contact form and client inquiry section.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={fetchInquiries}
                        disabled={isLoadingInquiries}
                        className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isLoadingInquiries ? 'animate-spin text-brand-blue' : ''}`} />
                        <span>Refresh Messages</span>
                      </button>
                    </div>

                    {/* Inquiry Cards List */}
                    {isLoadingInquiries ? (
                      <div className="p-12 text-center text-slate-400 text-xs">
                        <RefreshCw className="w-6 h-6 animate-spin mx-auto text-brand-blue mb-2" />
                        Loading inquiries...
                      </div>
                    ) : inquiries.length === 0 ? (
                      <div className="p-12 text-center bg-slate-50 rounded-2xl border border-slate-100 text-slate-400 text-xs space-y-2">
                        <Inbox className="w-10 h-10 mx-auto text-slate-300 stroke-[1.5]" />
                        <p className="font-bold text-slate-600">No client messages yet</p>
                        <p className="text-slate-400 max-w-sm mx-auto">
                          When visitors submit inquiries through the contact form, their name, email, phone number, and project details will appear here.
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-4">
                        {inquiries.map((inquiry) => {
                          const dateString = inquiry.createdAt?.toDate 
                            ? inquiry.createdAt.toDate().toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })
                            : inquiry.createdAt?.seconds 
                              ? new Date(inquiry.createdAt.seconds * 1000).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })
                              : 'Recent';

                          const cleanPhone = (inquiry.phone || '').replace(/[^0-9]/g, '');
                          const waText = encodeURIComponent(`Hi ${inquiry.name}, thank you for reaching out to Techloom Ghana regarding your inquiry.`);
                          const waUrl = cleanPhone ? `https://wa.me/${cleanPhone}?text=${waText}` : null;

                          return (
                            <div 
                              key={inquiry.id}
                              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-4"
                            >
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                                <div>
                                  <h5 className="font-display font-black text-sm text-slate-900">
                                    {inquiry.name}
                                  </h5>
                                  <span className="text-[10px] font-mono text-slate-400">
                                    Received: {dateString}
                                  </span>
                                </div>

                                <div className="flex items-center gap-2">
                                  {inquiry.email && (
                                    <a
                                      href={`mailto:${inquiry.email}?subject=${encodeURIComponent(`Techloom Ghana - Response for ${inquiry.name}`)}`}
                                      className="inline-flex items-center gap-1.5 bg-brand-blue hover:bg-brand-blue/90 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-xs transition-all cursor-pointer"
                                    >
                                      <Mail className="w-3.5 h-3.5" />
                                      <span>Reply via Email</span>
                                    </a>
                                  )}

                                  {waUrl && (
                                    <a
                                      href={waUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-xs transition-all cursor-pointer"
                                    >
                                      <MessageSquare className="w-3.5 h-3.5" />
                                      <span>WhatsApp</span>
                                    </a>
                                  )}

                                  <button
                                    type="button"
                                    onClick={() => handleDeleteInquiry(inquiry.id)}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                                    title="Delete this message"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>

                              {/* Contact Details info pills */}
                              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-650">
                                <span className="inline-flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/60 font-mono text-[11px]">
                                  <Mail className="w-3.5 h-3.5 text-brand-blue" />
                                  <a href={`mailto:${inquiry.email}`} className="hover:underline">{inquiry.email}</a>
                                </span>

                                {inquiry.phone && (
                                  <span className="inline-flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/60 font-mono text-[11px]">
                                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                                    <a href={`tel:${inquiry.phone}`} className="hover:underline">{inquiry.phone}</a>
                                  </span>
                                )}
                              </div>

                              {/* Message body */}
                              <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-150">
                                <p className="text-xs text-slate-700 leading-relaxed font-sans whitespace-pre-wrap">
                                  {inquiry.message}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 2: SERVICES SPECIALTIES */}
                {activeTab === 'services' && (
                  <div className="space-y-10">
                    <form onSubmit={handleSaveService} className="bg-slate-50 p-5 rounded-2xl border border-slate-150 space-y-4">
                      <h4 className="font-display font-semibold text-sm text-slate-900 border-b border-slate-100 pb-2 flex items-center justify-between">
                        <span>{editingService ? `Editing service: ${editingService.id}` : 'Create New Service specialty card'}</span>
                        {editingService && (
                          <button
                            type="button"
                            onClick={() => {
                              setEditingService(null);
                              setNewService({ id: '', title: '', description: '', iconName: 'Palette' });
                              setServiceDetailsString('');
                            }}
                            className="text-xs text-rose-500 hover:underline"
                          >
                            Cancel Editing
                          </button>
                        )}
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono font-bold text-slate-400 uppercase">Service Unique Slug (Identifier)</label>
                          <input
                            type="text"
                            placeholder="e.g. logo-branding"
                            disabled={!!editingService}
                            value={newService.id}
                            onChange={(e) => setNewService({ ...newService, id: e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '') })}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 h-11 text-xs text-slate-800"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-mono font-bold text-slate-400 uppercase">Service Banner Title</label>
                          <input
                            type="text"
                            placeholder="e.g. Logo & Spatial Branding"
                            value={newService.title}
                            onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 h-11 text-xs text-slate-800"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-mono font-bold text-slate-400 uppercase">Lucide-React Icon Name</label>
                          <select
                            value={newService.iconName}
                            onChange={(e) => setNewService({ ...newService, iconName: e.target.value })}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 h-11 text-xs text-slate-800"
                          >
                            <option value="Palette">Palette (Palette & Drawing)</option>
                            <option value="Award">Award (Badge & Logo)</option>
                            <option value="Layers">Layers (UI/UX layouts)</option>
                            <option value="Instagram">Instagram (Social Media)</option>
                            <option value="Printer">Printer (Printing Solutions)</option>
                            <option value="TrendingUp">TrendingUp (Digital Marketing)</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-mono font-bold text-slate-400 uppercase">Specialization Description Summary</label>
                        <input
                          type="text"
                          placeholder="Detailed short overview..."
                          value={newService.description}
                          onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 h-11 text-xs text-slate-800"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-mono font-bold text-slate-400 uppercase">Sub-Bullets Detail list (One item per line)</label>
                        <textarea
                          rows={3}
                          placeholder="Marketing & promotional pamphlets&#10;Geometric brand systems"
                          value={serviceDetailsString}
                          onChange={(e) => setServiceDetailsString(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-800"
                        />
                      </div>

                      <button
                        type="submit"
                        className="bg-slate-900 text-white hover:bg-black px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider"
                      >
                        {editingService ? 'Commit Changes' : 'Publish Service card'}
                      </button>
                    </form>

                    {/* List Existing Services */}
                    <div className="space-y-3">
                      <h5 className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">Active service offerings</h5>
                      <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden bg-white">
                        {services.map((service) => (
                          <div key={service.id} className="p-4 flex items-center justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-slate-900">{service.title}</span>
                                <span className="text-[9px] font-mono bg-slate-100 text-slate-550 px-2 py-0.5 rounded">ID: {service.id}</span>
                              </div>
                              <p className="text-xs text-slate-400 font-light mt-1">{service.description}</p>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                onClick={() => handleEditServiceClick(service)}
                                className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-600 transition"
                                title="Edit Service"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteService(service.id)}
                                className="p-2 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg text-rose-500 transition"
                                title="Delete Service"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: PORTFOLIO SHOWCASE */}
                {activeTab === 'portfolio' && (
                  <div className="space-y-10">
                    <form onSubmit={handleSavePortfolio} className="bg-slate-50 p-5 rounded-2xl border border-slate-150 space-y-4">
                      <h4 className="font-display font-semibold text-sm text-slate-900 border-b border-slate-100 pb-2 flex items-center justify-between">
                        <span>{editingPortfolio ? `Editing project: ${editingPortfolio.id}` : 'Create New Portfolio Asset Card'}</span>
                        {editingPortfolio && (
                          <button
                            type="button"
                            onClick={() => {
                              setEditingPortfolio(null);
                              setNewPortfolio({
                                id: '',
                                title: '',
                                category: 'Branding',
                                image: '',
                                description: '',
                                client: '',
                                challenge: '',
                                solution: '',
                                projectLink: ''
                              });
                              setPortfolioScopeString('');
                              setPortfolioExtraImagesString('');
                            }}
                            className="text-xs text-rose-500 hover:underline"
                          >
                            Cancel Editing
                          </button>
                        )}
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono font-bold text-slate-400 uppercase">Project Identifier Unique Slug</label>
                          <input
                            type="text"
                            placeholder="e.g. apex-rebranding"
                            disabled={!!editingPortfolio}
                            value={newPortfolio.id}
                            onChange={(e) => setNewPortfolio({ ...newPortfolio, id: e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '') })}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 h-11 text-xs text-slate-800"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-mono font-bold text-slate-400 uppercase">Project Category Field</label>
                          <input
                            type="text"
                            list="categories-list"
                            placeholder="Select or enter custom category..."
                            value={newPortfolio.category}
                            onChange={(e) => setNewPortfolio({ ...newPortfolio, category: e.target.value })}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 h-11 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                          />
                          <datalist id="categories-list">
                            {Array.from(new Set(['Branding', 'Flyer Design', 'Social Media Design', 'Website Design', ...portfolio.map(p => p.category)])).map(cat => (
                              <option key={cat} value={cat} />
                            ))}
                          </datalist>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-mono font-bold text-slate-400 uppercase">Project Title Banner</label>
                          <input
                            type="text"
                            placeholder="Headline banner..."
                            value={newPortfolio.title}
                            onChange={(e) => setNewPortfolio({ ...newPortfolio, title: e.target.value })}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 h-11 text-xs text-slate-800"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-mono font-bold text-slate-400 uppercase">Client Brand Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Zenith Tech"
                          value={newPortfolio.client}
                          onChange={(e) => setNewPortfolio({ ...newPortfolio, client: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 h-11 text-xs text-slate-800"
                        />
                      </div>

                      <div className="col-span-1 md:col-span-2">
                        <ImageUploader
                          id="portfolio-primary-image-uploader"
                          label="Project Primary Cover Image"
                          value={newPortfolio.image}
                          onChange={(base64String) => setNewPortfolio({ ...newPortfolio, image: base64String })}
                          placeholder="Paste image URL link or drag & drop / choose a local file to upload"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-mono font-bold text-slate-400 uppercase">Compact Subtitle Description</label>
                        <input
                          type="text"
                          placeholder="Summarized branding output..."
                          value={newPortfolio.description}
                          onChange={(e) => setNewPortfolio({ ...newPortfolio, description: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 h-11 text-xs text-slate-800"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-mono font-bold text-slate-400 uppercase">Project Scope & Deliverables (Comma Separated)</label>
                        <input
                           type="text"
                           placeholder="Identity Blueprints, Vector layouts, Social design grids"
                           value={portfolioScopeString}
                           onChange={(e) => setPortfolioScopeString(e.target.value)}
                           className="w-full bg-white border border-slate-200 rounded-xl px-3 h-11 text-xs text-slate-800"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono font-bold text-slate-400 uppercase">Live View Project Link (Behance / Website)</label>
                          <input
                            type="url"
                            placeholder="e.g. https://www.behance.net/gallery/... or live website link"
                            value={newPortfolio.projectLink || ''}
                            onChange={(e) => setNewPortfolio({ ...newPortfolio, projectLink: e.target.value })}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 h-11 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-mono font-bold text-slate-400 uppercase">GitHub Repository Link (Optional)</label>
                          <input
                            type="url"
                            placeholder="e.g. https://github.com/techloom/..."
                            value={newPortfolio.githubLink || ''}
                            onChange={(e) => setNewPortfolio({ ...newPortfolio, githubLink: e.target.value })}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 h-11 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                          />
                        </div>
                      </div>

                      <div className="space-y-4 p-4 bg-slate-50/70 border border-slate-200/50 rounded-2xl">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-200/50 pb-3">
                          <div className="flex flex-col gap-1">
                            <span className="text-xs font-display font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                              <span>Project Showcase Grid Gallery</span>
                              <span className="text-[10px] font-mono font-bold bg-slate-200 text-slate-650 px-2 py-0.5 rounded-full">
                                {extraImagesArray.filter(Boolean).length} Active
                              </span>
                            </span>
                            <span className="text-[10px] text-slate-400 leading-normal">
                              These images (plus the primary cover) form the full-quality slideshow/carousel inside the project details. You can upload 20 or more images.
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setExtraImagesArray(prev => [...prev, ''])}
                            className="inline-flex items-center gap-1.5 bg-brand-blue hover:bg-brand-blue/90 text-white font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all shadow-sm shrink-0 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Slot</span>
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          {extraImagesArray.map((value, idx) => (
                            <div key={idx} className="relative bg-white/60 p-3 rounded-xl border border-slate-150 shadow-2xs space-y-2 group">
                              <div className="flex items-center justify-between">
                                <span className="text-[9px] font-mono font-bold text-slate-400 uppercase">
                                  Gallery Image {idx + 1}
                                </span>
                                <div className="flex items-center gap-1.5">
                                  {idx > 0 && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const updated = [...extraImagesArray];
                                        const temp = updated[idx];
                                        updated[idx] = updated[idx - 1];
                                        updated[idx - 1] = temp;
                                        setExtraImagesArray(updated);
                                      }}
                                      className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition cursor-pointer"
                                      title="Move Up"
                                    >
                                      <ArrowUp className="w-3 h-3" />
                                    </button>
                                  )}
                                  {idx < extraImagesArray.length - 1 && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const updated = [...extraImagesArray];
                                        const temp = updated[idx];
                                        updated[idx] = updated[idx + 1];
                                        updated[idx + 1] = temp;
                                        setExtraImagesArray(updated);
                                      }}
                                      className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition cursor-pointer"
                                      title="Move Down"
                                    >
                                      <ArrowDown className="w-3 h-3" />
                                    </button>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updated = [...extraImagesArray];
                                      updated.splice(idx, 1);
                                      if (updated.length < 4) {
                                        while (updated.length < 4) {
                                          updated.push('');
                                        }
                                      }
                                      setExtraImagesArray(updated);
                                    }}
                                    className="text-[9px] text-rose-500 hover:text-rose-700 font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer transition pl-1.5 border-l border-slate-200"
                                    title="Delete this image slot"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                    <span>Remove</span>
                                  </button>
                                </div>
                              </div>
                              <ImageUploader
                                id={`portfolio-extra-image-${idx}`}
                                label=""
                                value={value}
                                onChange={(val) => {
                                  const updated = [...extraImagesArray];
                                  updated[idx] = val;
                                  setExtraImagesArray(updated);
                                }}
                                placeholder={`Paste link or upload Showcase Image ${idx + 1}`}
                              />
                            </div>
                          ))}
                        </div>

                        {/* Add image slot bottom alternative shortcut */}
                        <div className="flex justify-center pt-2">
                          <button
                            type="button"
                            onClick={() => setExtraImagesArray(prev => [...prev, ''])}
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-slate-700 bg-white border border-slate-250 hover:bg-slate-50 hover:border-slate-350 active:scale-95 rounded-xl transition cursor-pointer shadow-xs"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Add Showcase Gallery Slot</span>
                          </button>
                        </div>

                        {/* Text fallback input just in case */}
                        <div className="pt-2 border-t border-slate-200/40 space-y-1">
                          <label className="text-[8px] font-mono text-slate-400 uppercase font-bold">Or raw comma-separated URLs fallback list</label>
                          <input
                            type="text"
                            placeholder="https://images.unsplash.com/photo-1, https://images.unsplash.com/photo-2..."
                            value={portfolioExtraImagesString}
                            onChange={(e) => setPortfolioExtraImagesString(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 h-9 text-[10px] text-slate-800 focus:outline-none focus:border-brand-blue"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono font-bold text-slate-400 uppercase">The Client Challenge Narrative</label>
                          <textarea
                            rows={3}
                            placeholder="Detail what business metrics was suffering..."
                            value={newPortfolio.challenge}
                            onChange={(e) => setNewPortfolio({ ...newPortfolio, challenge: e.target.value })}
                            className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-800"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-mono font-bold text-slate-400 uppercase">The Design Solution Execution</label>
                          <textarea
                            rows={3}
                            placeholder="Detail how TechLoom solved the challenge with premium design..."
                            value={newPortfolio.solution}
                            onChange={(e) => setNewPortfolio({ ...newPortfolio, solution: e.target.value })}
                            className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-800"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="bg-slate-900 text-white hover:bg-black px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider"
                      >
                        {editingPortfolio ? 'Update Project Details' : 'Publish Portfolio Project'}
                      </button>
                    </form>

                    {/* List Existing Projects */}
                    <div className="space-y-6">
                      {/* 1. Homepage Featured Web Platforms Selection (Top Showcase) */}
                      <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 space-y-4 shadow-md">
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-cyan-400" />
                            <h4 className="font-display font-bold text-sm text-white">
                              Homepage Featured Web Platforms (Top Showcase)
                            </h4>
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            Pin which live web applications appear in the top browser-frame showcase on the homepage. Only pinned platforms are displayed.
                          </p>
                        </div>

                        {/* Selection Count Indicator badge */}
                        <div className="flex items-center gap-2">
                          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                            (settings?.selectedHomepageWebPortfolios?.length || 0) > 0 
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                              : 'bg-slate-800 text-slate-400 border border-slate-700'
                          }`}>
                            Selected: {settings?.selectedHomepageWebPortfolios?.length || 0} Web Projects Pinned
                          </span>
                          {settings?.selectedHomepageWebPortfolios && settings.selectedHomepageWebPortfolios.length > 0 && (
                            <button
                              type="button"
                              onClick={async () => {
                                if (settings) {
                                  await updateSettings({
                                    ...settings,
                                    selectedHomepageWebPortfolios: []
                                  });
                                  showToast("Cleared featured homepage web selections.", "info");
                                }
                              }}
                              className="text-xs text-slate-400 hover:text-rose-400 hover:underline cursor-pointer"
                            >
                              Reset Web Pins
                            </button>
                          )}
                        </div>

                        {/* Grid of web platforms */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {portfolio
                            .filter(p => p.category === 'Website Design' || !!p.projectLink)
                            .map((project) => {
                              const isFeatured = settings?.selectedHomepageWebPortfolios?.includes(project.id) || false;
                              return (
                                <button
                                  key={`feat-web-${project.id}`}
                                  type="button"
                                  onClick={async () => {
                                    const current = settings?.selectedHomepageWebPortfolios || [];
                                    let updated: string[] = [];
                                    if (isFeatured) {
                                      updated = current.filter(id => id !== project.id);
                                    } else {
                                      updated = [...current, project.id];
                                    }

                                    if (settings) {
                                      await updateSettings({
                                        ...settings,
                                        selectedHomepageWebPortfolios: updated
                                      });
                                    }
                                  }}
                                  className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                                    isFeatured 
                                      ? 'bg-cyan-950/40 border-cyan-500/50 text-white shadow-xs' 
                                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                                  }`}
                                >
                                  <div className="flex items-center gap-2.5 overflow-hidden">
                                    <img src={project.image} alt={project.title} className="w-8 h-8 object-cover rounded bg-slate-800 shrink-0" />
                                    <div className="overflow-hidden">
                                      <p className="text-xs font-bold truncate leading-snug">{project.title}</p>
                                      <p className="text-[9px] font-mono text-cyan-400 truncate">{project.projectLink || 'Web Platform'}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="shrink-0 pl-2">
                                    <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all border ${
                                      isFeatured 
                                        ? 'bg-cyan-500 border-cyan-500 text-slate-950' 
                                        : 'bg-slate-800 border-slate-700'
                                    }`}>
                                      {isFeatured && (
                                        <Check className="w-3.5 h-3.5 shrink-0" strokeWidth={3} />
                                      )}
                                    </div>
                                  </div>
                                </button>
                              );
                            })}
                        </div>
                      </div>

                      {/* 2. Homepage Featured Graphic Design Selection (Lower Showcase) */}
                      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-150 space-y-4">
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-2">
                            <Palette className="w-4 h-4 text-brand-blue" />
                            <h4 className="font-display font-bold text-sm text-slate-900">
                              Homepage Featured Graphic Designs (Lower Showcase)
                            </h4>
                          </div>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            Toggle which graphic design showcases appear in the brand artistry showcase on the homepage. Defaults to top 6 design showcases if none are pinned.
                          </p>
                        </div>

                        {/* Selection Count Indicator badge */}
                        <div className="flex items-center gap-2">
                          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                            (settings?.selectedHomepagePortfolios?.length || 0) > 0 
                              ? 'bg-emerald-55 text-emerald-600 border border-emerald-100' 
                              : 'bg-amber-50 text-amber-600 border border-amber-100'
                          }`}>
                            Selected: {settings?.selectedHomepagePortfolios?.length || 0} Design Showcases Pinned
                          </span>
                          {settings?.selectedHomepagePortfolios && settings.selectedHomepagePortfolios.length > 0 && (
                            <button
                              type="button"
                              onClick={async () => {
                                if (settings) {
                                  await updateSettings({
                                    ...settings,
                                    selectedHomepagePortfolios: []
                                  });
                                  showToast("Cleared featured homepage design selections.", "info");
                                }
                              }}
                              className="text-xs text-slate-400 hover:text-rose-500 hover:underline cursor-pointer"
                            >
                              Reset Design Pins
                            </button>
                          )}
                        </div>

                        {/* Grid / list of graphic design portfolios to fast toggle */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
                          {portfolio
                            .filter(p => p.category !== 'Website Design')
                            .map((project) => {
                              const isFeatured = settings?.selectedHomepagePortfolios?.includes(project.id) || false;
                              return (
                                <button
                                  key={`feat-${project.id}`}
                                  type="button"
                                  onClick={async () => {
                                    const current = settings?.selectedHomepagePortfolios || [];
                                    let updated: string[] = [];
                                    if (isFeatured) {
                                      updated = current.filter(id => id !== project.id);
                                    } else {
                                      updated = [...current, project.id];
                                    }

                                    if (settings) {
                                      await updateSettings({
                                        ...settings,
                                        selectedHomepagePortfolios: updated
                                      });
                                    }
                                  }}
                                  className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                                    isFeatured 
                                      ? 'bg-blue-50/70 border-brand-blue/30 text-slate-900 shadow-2xs' 
                                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-350'
                                  }`}
                                >
                                  <div className="flex items-center gap-2.5 overflow-hidden">
                                    <img src={project.image} alt={project.title} className="w-8 h-8 object-cover rounded bg-slate-100 shrink-0" />
                                    <div className="overflow-hidden">
                                      <p className="text-xs font-bold truncate leading-snug">{project.title}</p>
                                      <p className="text-[9px] font-mono uppercase tracking-wider text-slate-400 truncate">{project.category}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="shrink-0 pl-2">
                                    <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all border ${
                                      isFeatured 
                                        ? 'bg-brand-blue border-brand-blue text-white' 
                                        : 'bg-white border-slate-300'
                                    }`}>
                                      {isFeatured && (
                                        <Check className="w-3.5 h-3.5 shrink-0" strokeWidth={3} />
                                      )}
                                    </div>
                                  </div>
                                </button>
                              );
                            })}
                        </div>
                      </div>

                      <div className="space-y-3 pt-4 border-t border-slate-100">
                        <h5 className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">Active Cases inside portfolio</h5>
                      <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden bg-white">
                        {portfolio.map((project) => (
                          <div key={project.id} className="p-4 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <img src={project.image} alt={project.title} className="w-12 h-10 object-cover rounded-md bg-slate-100 border border-slate-200" />
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-slate-900 leading-none">{project.title}</span>
                                  <span className="text-[8px] font-mono bg-blue-50 text-brand-blue px-2 py-0.5 rounded font-bold uppercase leading-none">{project.category}</span>
                                </div>
                                <p className="text-[10px] text-slate-400 font-light mt-1">Client: {project.client}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                onClick={() => handleEditPortfolioClick(project)}
                                className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-600 transition"
                                title="Edit Project"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeletePortfolio(project.id)}
                                className="p-2 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg text-rose-500 transition"
                                title="Delete Project"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: TESTIMONIALS */}
              {activeTab === 'testimonials' && (
                  <div className="space-y-6">
                    <h4 className="font-display font-extrabold text-lg text-slate-900 border-b border-slate-100 pb-2">
                      Review Submissions & Moderation
                    </h4>
                    <p className="text-xs text-slate-500">
                      These reviews are synchronized across Firestore. You may delete spam or irrelevant review submissions immediately.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {testimonials.map((testi) => (
                        <div key={testi.id} className="bg-slate-50 border border-slate-150 p-4 rounded-2xl flex flex-col justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2.5">
                              <img src={testi.avatar} alt={testi.name} className="w-9 h-9 rounded-full object-cover border border-slate-200" />
                              <div>
                                <h5 className="text-xs font-bold text-slate-900">{testi.name}</h5>
                                <p className="text-[10px] text-slate-400 font-semibold">{testi.role}, {testi.company}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-0.5">
                              {Array.from({ length: testi.rating }).map((_, i) => (
                                <span key={i} className="text-amber-400 text-xs text-[10px]">★</span>
                              ))}
                            </div>
                            <p className="text-xs text-slate-500 font-light italic leading-relaxed">
                              "{testi.quote}"
                            </p>
                          </div>
                          
                          <div className="pt-2 border-t border-slate-200/50 flex justify-between items-center">
                            <span className="text-[9px] font-mono text-slate-400">ID: {testi.id}</span>
                            <button
                              onClick={async () => {
                                if (confirm('Are you absolutely verified about deleting this testimonial submission?')) {
                                  // Simply delete testimonial
                                  try {
                                    await deleteDoc(doc(db, 'testimonials', testi.id));
                                    triggerSuccess('Review removed from Firestore.');
                                    refreshAll();
                                  } catch (error) {
                                    console.warn('Testimonial deletion error:', error);
                                  }
                                }
                              }}
                              className="text-[10px] text-rose-500 hover:text-rose-700 font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Moderate Delete</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'skills' && (
                  <div className="space-y-6 animate-fadeIn pb-12">
                    <div className="flex justify-between items-center shrink-0">
                      <div>
                        <h4 className="text-sm font-bold text-slate-800 uppercase tracking-widest font-display">Technical Skill indicators</h4>
                        <p className="text-xs text-slate-400 font-light mt-0.5">Customise circular gauges displayed under the 'Why Partner With Us' section.</p>
                      </div>
                      {!editingSkill && (
                        <button
                          onClick={() => {
                            setEditingSkill({ id: 'wc_' + Math.random().toString(36).substring(2, 7), title: '', description: '', iconName: 'Cpu', percentage: 90 });
                          }}
                          className="bg-brand-blue hover:bg-brand-blue/95 text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-full flex items-center gap-1.5 shadow-md shadow-brand-blue/10 cursor-pointer transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add New Skill Gauge</span>
                        </button>
                      )}
                    </div>

                    {/* Skill Form Editor */}
                    {editingSkill && (
                      <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-4 animate-scaleUp">
                        <div className="flex justify-between items-center">
                          <h5 className="text-xs font-black text-slate-700 uppercase tracking-widest">
                            {editingSkill.id && skills?.some(s => s.id === editingSkill.id) ? 'Edit Skill parameters' : 'Create New Skill indicator'}
                          </h5>
                          <button
                            onClick={() => setEditingSkill(null)}
                            className="text-slate-400 hover:text-slate-600 cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Skill ID (Permanent Slug)</label>
                            <input
                              type="text"
                              disabled={skills?.some(s => s.id === editingSkill.id)}
                              value={editingSkill.id}
                              onChange={(e) => setEditingSkill({ ...editingSkill, id: e.target.value.toLowerCase().replace(/[^a-z0-9_\-]/g, '') })}
                              placeholder="e.g. backend-dev"
                              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-blue disabled:bg-slate-100 disabled:text-slate-400 transition-all"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Skill Title</label>
                            <input
                              type="text"
                              value={editingSkill.title}
                              onChange={(e) => setEditingSkill({ ...editingSkill, title: e.target.value })}
                              placeholder="e.g. Full-Stack Web Architecture"
                              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-blue transition-all"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Description (Core Competencies Summarised)</label>
                          <textarea
                            rows={2}
                            value={editingSkill.description}
                            onChange={(e) => setEditingSkill({ ...editingSkill, description: e.target.value })}
                            placeholder="Detail your engineering/design proficiency..."
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue transition-all resize-none"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                          <div className="space-y-1">
                            <div className="flex justify-between items-center">
                              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Proficiency percentage</label>
                              <span className="text-xs font-mono font-bold text-brand-blue bg-brand-blue/5 px-2 py-0.5 rounded-full">{editingSkill.percentage}%</span>
                            </div>
                            <input
                              type="range"
                              min="1"
                              max="100"
                              value={editingSkill.percentage}
                              onChange={(e) => setEditingSkill({ ...editingSkill, percentage: Number(e.target.value) })}
                              className="w-full accent-brand-blue h-1 bg-slate-200 rounded-lg cursor-pointer animate-pulse"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Core Symbol / Tech Logo</label>
                            <select
                              value={editingSkill.iconName}
                              onChange={(e) => setEditingSkill({ ...editingSkill, iconName: e.target.value })}
                              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-blue transition-all cursor-pointer"
                            >
                              <option value="Cpu">Cpu (Computing/Logic)</option>
                              <option value="Code">Code (Development)</option>
                              <option value="Layers">Layers (Stack/Architecture)</option>
                              <option value="Sparkles">Sparkles (Creative Excellence)</option>
                              <option value="UserCheck">UserCheck (Client focus)</option>
                              <option value="Zap">Zap (Performance/Speed)</option>
                              <option value="DollarSign">DollarSign (Affordable/Finance)</option>
                              <option value="Settings">Settings (Automations)</option>
                              <option value="PenTool">PenTool (Design/Illustration)</option>
                              <option value="Database">Database (Filing/Records)</option>
                              <option value="Laptop">Laptop (Responsive Products)</option>
                              <option value="Globe">Globe (Global Outreach)</option>
                              <option value="tech-php">PHP Technology Logo</option>
                              <option value="tech-javascript">JavaScript Language Logo</option>
                              <option value="tech-typescript">TypeScript Compiler Logo</option>
                              <option value="tech-react">React Web Library Logo</option>
                              <option value="tech-nodejs">Node.js Execution Engine</option>
                              <option value="tech-laravel">Laravel PHP Framework</option>
                              <option value="tech-wordpress">WordPress CMS Ecosystem</option>
                              <option value="tech-python">Python Scripting Language</option>
                              <option value="tech-tailwindcss">Tailwind CSS Utility UI</option>
                              <option value="tech-html5">HTML5 Web Core Markup</option>
                              <option value="tech-css3">CSS3 Style Specification</option>
                              <option value="tech-figma">Figma Collaborative Design</option>
                              <option value="tech-mysql">MySQL Relational Index</option>
                              <option value="tech-mongodb">MongoDB NoSQL Schema Doc</option>
                              <option value="tech-docker">Docker Container Workspace</option>
                              <option value="tech-git">Git Decentralized Revision</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex gap-2 justify-end pt-2">
                          <button
                            type="button"
                            onClick={() => setEditingSkill(null)}
                            className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-[10px] font-bold uppercase tracking-wider px-4 py-2.5 rounded-full cursor-pointer transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={async () => {
                              if (!editingSkill.id || !editingSkill.title.trim()) {
                                alert('Skill slug ID and title are mandatory fields.');
                                return;
                              }
                              const ok = await addOrUpdateSkill(editingSkill);
                              if (ok) {
                                triggerSuccess('Skill indicator published successfully!');
                                setEditingSkill(null);
                                refreshAll();
                              }
                            }}
                            className="bg-brand-blue hover:bg-brand-blue/95 text-white text-[10px] font-bold uppercase tracking-wider px-5 py-2.5 rounded-full flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Save Skill indicator</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Skill Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {skills?.map((skill) => (
                        <div key={skill.id} className="bg-slate-50 border border-slate-200/60 p-5 rounded-2xl flex flex-col justify-between hover:bg-white hover:border-brand-blue/15 hover:shadow-lg transition-all duration-300">
                          <div className="space-y-2">
                            <div className="flex justify-between items-start">
                              <h5 className="text-xs font-bold text-slate-800 font-display flex items-center gap-1.5">
                                <span className="p-1 px-1.5 bg-brand-blue/5 text-brand-blue text-[10px] font-mono rounded">
                                  {skill.percentage}%
                                </span>
                                <span>{skill.title}</span>
                              </h5>
                              <span className="text-[10px] font-mono text-slate-400 bg-slate-100 rounded px-1.5 py-0.5">
                                {skill.iconName}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 font-light leading-relaxed line-clamp-2">
                              {skill.description}
                            </p>
                          </div>

                          <div className="pt-3 mt-4 border-t border-slate-100/80 flex justify-between items-center">
                            <span className="text-[9px] font-mono text-slate-300">ID: {skill.id}</span>
                            <div className="flex gap-3">
                              <button
                                onClick={() => setEditingSkill(skill)}
                                className="text-[10px] text-slate-400 hover:text-brand-blue font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors"
                              >
                                <Edit3 className="w-3 h-3" />
                                <span>Edit Parameters</span>
                              </button>
                              <button
                                onClick={async () => {
                                  if (confirm(`Do you want to permanently delete custom proficiency '${skill.title}'?`)) {
                                    const ok = await deleteSkill(skill.id);
                                    if (ok) {
                                      triggerSuccess('Technical proficiency purged.');
                                      refreshAll();
                                    }
                                  }
                                }}
                                className="text-[10px] text-rose-500 hover:text-rose-700 font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors"
                              >
                                <Trash2 className="w-3 h-3" />
                                <span>Purge</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'migration' && (
                  <div className="space-y-6 animate-fadeIn pb-12">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 uppercase tracking-widest font-display">Cloud Database Synchronization</h4>
                      <p className="text-xs text-slate-400 font-light mt-0.5">
                        Migrate all records from the temporary AI Studio development database to your personal active <strong className="font-semibold text-slate-600">techloomghana</strong> project securely.
                      </p>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-sm">
                      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                        <div className="space-y-1">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-50 text-brand-blue border border-blue-100 uppercase">
                            Source Database Active
                          </span>
                          <p className="text-xs text-slate-500">
                            Source: <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-[10px] text-slate-700">axial-splice-dv8b6 (ai-studio)</code>
                          </p>
                          <p className="text-xs text-slate-500">
                            Destination: <code className="font-mono bg-emerald-50 text-emerald-700 px-1 py-0.5 rounded text-[10px]">techloomghana (default)</code>
                          </p>
                        </div>

                        <button
                          onClick={runDataMigration}
                          disabled={isMigrating}
                          className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all cursor-pointer ${
                            isMigrating
                              ? 'bg-slate-400 cursor-not-allowed shadow-none'
                              : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/10 hover:shadow-emerald-600/20'
                          }`}
                        >
                          <RefreshCw className={`w-4 h-4 ${isMigrating ? 'animate-spin' : ''}`} />
                          <span>{isMigrating ? 'Synchronizing Records...' : 'Start Database Migration'}</span>
                        </button>
                      </div>

                      {/* Info / Caution Alert */}
                      <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/60 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <div className="space-y-1 text-xs">
                          <p className="font-bold text-amber-800">Migration Safety &amp; Safeguards</p>
                          <p className="text-slate-600 leading-relaxed font-light">
                            This operation copies records from the AI Studio default instance into your custom Firebase project. Existing identical document IDs on your personal project will be updated with the latest versions. It will migrate settings coordinates, specialty services, portfolio projects, testimonials, and circular skill gauges automatically.
                          </p>
                        </div>
                      </div>

                      {/* Permission / Rule Issue Troubleshooting Guide */}
                      {migrationStatus === 'error' && (
                        <div className="p-5 rounded-2xl bg-slate-50 border border-rose-200 shadow-sm space-y-4 animate-fadeIn">
                          <div className="flex gap-2.5 items-center pb-2.5 border-b border-slate-200/50">
                            <span className="w-2 h-2 rounded-full bg-rose-500 block animate-pulse shrink-0" />
                            <h5 className="text-xs font-bold text-rose-800 uppercase tracking-wider font-mono">Why did this fail? (Missing or Insufficient Permissions)</h5>
                          </div>
                          
                          <div className="text-[11px] leading-relaxed text-slate-600 space-y-3">
                            <p className="font-light">
                              The migration script connects to your remote <strong className="font-bold text-slate-800">techloomghana</strong> Firestore database. Since you logged into this Admin Console using the local passkey bypass rather than Google Sign-In, Firebase treats these write requests as <strong>unauthenticated</strong>.
                            </p>
                            <p className="font-light">
                              Unless your Firebase security rules are configured to accept unauthenticated writes, your Firestore instance will reject this migration.
                            </p>
                            
                            <div className="bg-white p-4.5 rounded-xl border border-slate-200 space-y-2.5">
                              <p className="font-bold text-slate-800">🚀 Solution 1: Temporarily relax Firestore Security Rules (Takes 30 Seconds)</p>
                              <ol className="list-decimal pl-4 space-y-1.5 font-light text-slate-600">
                                <li>Open your <a href="https://console.firebase.google.com/project/techloomghana/firestore/rules" target="_blank" rel="noopener noreferrer" className="text-brand-blue font-semibold hover:underline">Firebase Console Firestore Rules Tab</a></li>
                                <li>Paste this temporary rule configuration:
                                  <pre className="mt-1.5 p-3 rounded bg-slate-900 text-teal-400 font-mono text-[9px] select-all overflow-x-auto whitespace-pre-wrap leading-normal">
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}`}
                                  </pre>
                                </li>
                                <li>Click <strong className="font-semibold text-slate-800">Publish</strong>.</li>
                                <li>Return here and click <strong className="font-semibold text-slate-800">Start Database Migration</strong> again to sync all records.</li>
                                <li>Once successful, copy the safe, hardened rules of your project from <code className="font-mono bg-slate-100 p-0.5 text-rose-600">firestore.rules</code> and paste them back in the Firebase Console rules editor to secure your DB!</li>
                              </ol>
                            </div>

                            <div className="bg-white p-4.5 rounded-xl border border-slate-200 space-y-2">
                              <p className="font-bold text-slate-800">🔒 Alternative: Authorize the Hostname for Google Sign-In</p>
                              <ol className="list-decimal pl-4 space-y-1 font-light text-slate-600">
                                <li>Copy this dynamic preview host: <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-[10px] text-brand-blue select-all font-semibold">ais-dev-m3tcstqic7ei7opyen7ijt-104396658673.europe-west1.run.app</code></li>
                                <li>Go to your <strong className="font-semibold text-slate-800">Firebase Console</strong> &rarr; <strong className="font-semibold text-slate-800">Authentication</strong> &rarr; <strong className="font-semibold text-slate-800">Settings</strong> &rarr; <strong className="font-semibold text-slate-800">Authorized Domains</strong>.</li>
                                <li>Click <strong className="font-semibold text-slate-800">Add Domain</strong> and paste the copied host URL.</li>
                                <li>Once added, sign out of this Admin Console, then re-authenticate using the secure <strong className="font-semibold text-slate-800">Google Sign-In</strong> button with your admin email (e.g. <code className="text-emerald-700">joevardy2004@gmail.com</code>). Writes will then be authenticated and succeed seamlessly!</li>
                              </ol>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Progress bar container */}
                      {(migrationStatus === 'running' || migrationStatus === 'success' || migrationStatus === 'error') && (
                        <div className="space-y-3.5 animate-scaleUp">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-bold text-slate-700">Migration Progress Indicator</span>
                            <span className="font-mono font-bold text-brand-blue">{migrationProgress}%</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200/40">
                            <div 
                              className="bg-gradient-to-r from-brand-blue to-emerald-500 h-full transition-all duration-300"
                              style={{ width: `${migrationProgress}%` }}
                            />
                          </div>

                          {/* Output status logs panel */}
                          <div className="space-y-1.5">
                            <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Migration Console Logs</span>
                            <div className="bg-slate-950 text-slate-200 p-4 rounded-2xl font-mono text-[10px] space-y-1.5 max-h-60 overflow-y-auto block leading-normal border border-slate-900 shadow-inner">
                              {migrationLogs.map((logStr, lIdx) => (
                                <div key={lIdx} className="border-l-2 border-slate-800 pl-2 py-0.5 hover:bg-slate-900/45 transition-colors">
                                  {logStr}
                                </div>
                              ))}
                              {migrationLogs.length === 0 && <span className="text-slate-500 italic">Console is quiet... awaiting orders.</span>}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
      </motion.div>
    </div>
  );
}
