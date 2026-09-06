import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, collection, getDocs, setDoc, serverTimestamp, writeBatch } from 'firebase/firestore';
import { initializeAuth, browserLocalPersistence, getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getAnalytics, isSupported, Analytics } from 'firebase/analytics';
import { SERVICES, PORTFOLIO, TESTIMONIALS } from '../data';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore & Auth with dynamic compatibility to bypass IndexedDB iframe blockages
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || undefined);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Analytics with environment support guard (Skip in sandbox/localhost environments to prevent Failed to fetch errors)
export let analytics: Analytics | null = null;

const isSandbox = typeof window !== 'undefined' && (
  window.location.hostname.includes('ais-') ||
  window.location.hostname.includes('localhost') ||
  window.location.hostname.includes('0.0.0.0') ||
  window.location.hostname.includes('127.0.0.1')
);

if (!isSandbox) {
  isSupported().then((yes) => {
    if (yes) {
      analytics = getAnalytics(app);
    }
  }).catch((err) => {
    console.warn("Firebase Analytics could not be loaded in this environment:", err);
  });
} else {
  console.log("Firebase Analytics initialization skipped in preview/sandbox environment.");
}

// Auto-seed default database records if they are clean/empty
export async function seedDefaultDataIfEmpty(force = false) {
  try {
    // If not forced, only allow write operations if the user is authenticated as the designated host admin
    const isAdminUser = auth.currentUser?.email === 'joevardy2004@gmail.com';
    if (!isAdminUser && !force) {
      console.log('Skipping Firestore auto-seeding: active session is not signed in as the authorized Google admin.');
      return;
    }

    // 1. Settings Seeding
    try {
      const contactDocRef = doc(db, 'settings', 'contact');
      const contactSnap = await getDoc(contactDocRef).catch(() => null);

      if (!contactSnap || !contactSnap.exists()) {
        await setDoc(contactDocRef, {
          email: "hello@techloom.tech",
          phone: "+233 256 259 336",
          location: "TechLoom Studio, 3rd Floor, Airport Gate Towers, Airport Residential Area, Accra, Ghana",
          openingHours: "Monday – Saturday (08:30 – 19:00 GHS)",
          avgResponseTime: "Average response: under 12 hours for new submissions.",
          socialImpactText: "Every project finances the Joe Vardy Al-Hikmah Foundation, educating Accra's underserved youth in modern tech skills.",
          agencySlogan: "Weaving digital excellence. We custom-engineer premium visual branding, high-speed platforms, and cinematically animated narratives designed to make Ghana businesses look truly world-class.",
          heroBgImage: "",
          facebookLink: "#",
          twitterLink: "#",
          instagramLink: "#",
          youtubeLink: "#",
          linkedinLink: "#",
          githubLink: "#",
          metricNumber: "50+",
          metricSubtitle: "Delivered Projects",
          metricDescription: "Precision-engineered branding, flyers, and digital platforms across diverse industries.",
          hqTitle: "Accra Studio",
          hqSubtitle: "& Creative Hub",
          socialImpactTitle: "10% Social Impact Investment",
          socialImpactCardTitle: "Financing The Future Of Accra",
          heroTitleLine1: "Design That Makes",
          heroTitleLine2: "Your Brand Impossible To Ignore.",
          heroDescription: "We custom-engineer premium visual branding, high-speed digital platforms, and high-converting marketing flyers crafted to position your enterprise ahead of the competition.",
          heroBadgeText: "Creative Excellence & Strategy",
          heroCardImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
          heroCardText: "Complete visual identity frameworks, logo systems, and comprehensive brand guidelines engineered to build deep trust."
        });
        console.log('Seeded settings collection.');
      }
    } catch (err) {
      console.warn('Failed to seed settings record:', err);
    }

    // 2. Services Seeding
    try {
      const servicesSnap = await getDocs(collection(db, 'services')).catch(() => null);
      if (!servicesSnap || servicesSnap.empty) {
        const batch = writeBatch(db);
        SERVICES.forEach((service) => {
          const docRef = doc(collection(db, 'services'), service.id);
          batch.set(docRef, service);
        });
        await batch.commit();
        console.log('Seeded services collection.');
      }
    } catch (err) {
      console.warn('Failed to seed services collection:', err);
    }

    // 3. Portfolio Seeding
    try {
      const portfolioSnap = await getDocs(collection(db, 'portfolio')).catch(() => null);
      if (!portfolioSnap || portfolioSnap.empty) {
        const batch = writeBatch(db);
        PORTFOLIO.forEach((project) => {
          const docRef = doc(collection(db, 'portfolio'), project.id);
          batch.set(docRef, project);
        });
        await batch.commit();
        console.log('Seeded portfolio collection.');
      }
    } catch (err) {
      console.warn('Failed to seed portfolio collection:', err);
    }

    // 4. Testimonials Seeding
    try {
      const testimonialsSnap = await getDocs(collection(db, 'testimonials')).catch(() => null);
      if (!testimonialsSnap || testimonialsSnap.empty) {
        const batch = writeBatch(db);
        TESTIMONIALS.forEach((testimonial) => {
          const docRef = doc(collection(db, 'testimonials'), testimonial.id);
          batch.set(docRef, {
            ...testimonial,
            createdAt: new Date().toISOString()
          });
        });
        await batch.commit();
        console.log('Seeded testimonials collection.');
      }
    } catch (err) {
      console.warn('Failed to seed testimonials collection:', err);
    }

    // 5. Skills Seeding
    try {
      const skillsSnap = await getDocs(collection(db, 'skills')).catch(() => null);
      if (!skillsSnap || skillsSnap.empty) {
        const batch = writeBatch(db);
        const DEFAULT_SKILLS = [
          {
            id: 'wc1',
            title: 'Creative Excellence',
            description: 'We combine pristine artistic creativity with deliberate business strategy to deliver designs that convert.',
            iconName: 'Sparkles',
            percentage: 98
          },
          {
            id: 'wc2',
            title: 'Client-Focused Approach',
            description: 'We do not deal in generic ideas. Every line, gradient, and word is tailored specifically to your exact company goals.',
            iconName: 'UserCheck',
            percentage: 95
          },
          {
            id: 'wc3',
            title: 'Fast Turnaround',
            description: 'We respect your speed demands. High-quality production-ready assets are delivered precisely on schedule.',
            iconName: 'Zap',
            percentage: 92
          },
          {
            id: 'wc4',
            title: 'Affordable Solutions',
            description: 'Access elite agency-level quality and senior design talent without paying millions in inflated corporate agency fees.',
            iconName: 'DollarSign',
            percentage: 88
          }
        ];
        DEFAULT_SKILLS.forEach((skill) => {
          const docRef = doc(collection(db, 'skills'), skill.id);
          batch.set(docRef, skill);
        });
        await batch.commit();
        console.log('Seeded skills collection.');
      }
    } catch (err) {
      console.warn('Failed to seed skills collection:', err);
    }
  } catch (error) {
    console.warn('Error during auto-seeding wrapper execution:', error);
  }
}

// Security & Error Helpers
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
    },
    operationType,
    path
  };
  console.warn('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export { app };
