import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  deleteDoc, 
  FirestoreDataConverter, 
  QueryDocumentSnapshot, 
  DocumentData,
  CollectionReference,
  DocumentReference
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { Service, PortfolioItem, ContactSettings, Testimonial, SkillItem } from '../types';

// ============================================================================
// 1. COLLECTON SCHEMAS (FirestoreDataConverters)
// Enforces type mapping, object instantiation, and exact data structures
// during Firestore read and write cycles.
// ============================================================================

/**
 * Schema converter for Service Entity
 */
export const serviceConverter: FirestoreDataConverter<Service> = {
  toFirestore(service: Service): DocumentData {
    // Rigidly map payload block to schema definition
    return {
      id: service.id,
      title: service.title,
      description: service.description,
      iconName: service.iconName,
      details: Array.isArray(service.details) ? service.details : [],
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Service {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      title: String(data.title || ''),
      description: String(data.description || ''),
      iconName: String(data.iconName || 'HelpCircle'),
      details: Array.isArray(data.details) ? data.details.map(String) : [],
    };
  }
};

/**
 * Schema converter for PortfolioItem Entity
 */
export const portfolioConverter: FirestoreDataConverter<PortfolioItem> = {
  toFirestore(item: PortfolioItem): DocumentData {
    const rawCat = (item.category || '').toLowerCase().trim();
    const isWeb = rawCat.includes('web') || rawCat.includes('software') || rawCat.includes('app') || !!item.projectLink;
    const category = isWeb ? 'Web & Software Projects' : 'Graphic Design';

    const payload: DocumentData = {
      id: item.id,
      title: item.title,
      category,
      image: item.image,
      description: item.description,
      client: item.client,
      scope: Array.isArray(item.scope) ? item.scope : [],
      challenge: item.challenge,
      solution: item.solution,
    };
    if (item.extraImages) payload.extraImages = item.extraImages;
    if (item.projectLink) payload.projectLink = item.projectLink;
    if (item.githubLink) payload.githubLink = item.githubLink;
    return payload;
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): PortfolioItem {
    const data = snapshot.data();
    const rawCat = String(data.category || '').toLowerCase().trim();
    const isWeb = rawCat.includes('web') || rawCat.includes('software') || rawCat.includes('app') || !!data.projectLink;
    const category = isWeb ? 'Web & Software Projects' : 'Graphic Design';

    return {
      id: snapshot.id,
      title: String(data.title || ''),
      category,
      image: String(data.image || ''),
      description: String(data.description || ''),
      client: String(data.client || ''),
      scope: Array.isArray(data.scope) ? data.scope.map(String) : [],
      challenge: String(data.challenge || ''),
      solution: String(data.solution || ''),
      extraImages: Array.isArray(data.extraImages) ? data.extraImages.map(String) : undefined,
      projectLink: data.projectLink ? String(data.projectLink) : undefined,
      githubLink: data.githubLink ? String(data.githubLink) : undefined,
    };
  }
};

/**
 * Schema converter for ContactSettings Entity
 */
export const contactSettingsConverter: FirestoreDataConverter<ContactSettings> = {
  toFirestore(settings: ContactSettings): DocumentData {
    return {
      email: settings.email,
      phone: settings.phone,
      secondaryPhone: settings.secondaryPhone || '+233 504 041 694',
      location: settings.location,
      openingHours: settings.openingHours,
      avgResponseTime: settings.avgResponseTime,
      socialImpactText: settings.socialImpactText,
      agencySlogan: settings.agencySlogan,
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
      hqSubtitle: settings.hqSubtitle || '& Creative Hub',
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
      selectedHomepageWebPortfolios: settings.selectedHomepageWebPortfolios || [],
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): ContactSettings {
    const data = snapshot.data();
    return {
      email: String(data.email || 'techloomgh@yahoo.com'),
      phone: String(data.phone || '+233 256 259 336'),
      secondaryPhone: String(data.secondaryPhone || '+233 504 041 694'),
      location: String(data.location || 'Accra, Ghana'),
      openingHours: String(data.openingHours || 'Monday – Saturday, 8:30 AM – 7:00 PM GMT'),
      avgResponseTime: String(data.avgResponseTime || 'under 12 hours'),
      socialImpactText: String(data.socialImpactText || ''),
      agencySlogan: String(data.agencySlogan || ''),
      heroBgImage: data.heroBgImage ? String(data.heroBgImage) : undefined,
      facebookLink: data.facebookLink ? String(data.facebookLink) : undefined,
      twitterLink: data.twitterLink ? String(data.twitterLink) : undefined,
      instagramLink: data.instagramLink ? String(data.instagramLink) : undefined,
      youtubeLink: data.youtubeLink ? String(data.youtubeLink) : undefined,
      linkedinLink: data.linkedinLink ? String(data.linkedinLink) : undefined,
      githubLink: data.githubLink ? String(data.githubLink) : undefined,
      metricNumber: data.metricNumber ? String(data.metricNumber) : undefined,
      metricSubtitle: data.metricSubtitle ? String(data.metricSubtitle) : undefined,
      metricDescription: data.metricDescription ? String(data.metricDescription) : undefined,
      hqTitle: data.hqTitle ? String(data.hqTitle) : undefined,
      hqSubtitle: data.hqSubtitle ? String(data.hqSubtitle) : undefined,
      socialImpactTitle: data.socialImpactTitle ? String(data.socialImpactTitle) : undefined,
      socialImpactCardTitle: data.socialImpactCardTitle ? String(data.socialImpactCardTitle) : undefined,
      heroTitleLine1: data.heroTitleLine1 ? String(data.heroTitleLine1) : undefined,
      heroTitleLine2: data.heroTitleLine2 ? String(data.heroTitleLine2) : undefined,
      heroDescription: data.heroDescription ? String(data.heroDescription) : undefined,
      heroBadgeText: data.heroBadgeText ? String(data.heroBadgeText) : undefined,
      heroCardImage: data.heroCardImage ? String(data.heroCardImage) : undefined,
      heroCardText: data.heroCardText ? String(data.heroCardText) : undefined,
      heroCardImage1: data.heroCardImage1 ? String(data.heroCardImage1) : undefined,
      heroCardText1: data.heroCardText1 ? String(data.heroCardText1) : undefined,
      heroCardImage2: data.heroCardImage2 ? String(data.heroCardImage2) : undefined,
      heroCardText2: data.heroCardText2 ? String(data.heroCardText2) : undefined,
      heroCardImage3: data.heroCardImage3 ? String(data.heroCardImage3) : undefined,
      heroCardText3: data.heroCardText3 ? String(data.heroCardText3) : undefined,
      heroCardImage4: data.heroCardImage4 ? String(data.heroCardImage4) : undefined,
      heroCardText4: data.heroCardText4 ? String(data.heroCardText4) : undefined,
      selectedHomepagePortfolios: Array.isArray(data.selectedHomepagePortfolios) ? data.selectedHomepagePortfolios.map(String) : [],
      selectedHomepageWebPortfolios: Array.isArray(data.selectedHomepageWebPortfolios) ? data.selectedHomepageWebPortfolios.map(String) : [],
    };
  }
};

/**
 * Schema converter for Testimonial Entity
 */
export const testimonialConverter: FirestoreDataConverter<Testimonial> = {
  toFirestore(testi: Testimonial): DocumentData {
    return {
      id: testi.id,
      name: testi.name,
      role: testi.role,
      company: testi.company,
      quote: testi.quote,
      rating: Number(testi.rating || 5),
      avatar: testi.avatar,
      createdAt: testi.createdAt || new Date().toISOString(),
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Testimonial {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      name: String(data.name || ''),
      role: String(data.role || ''),
      company: String(data.company || ''),
      quote: String(data.quote || ''),
      rating: typeof data.rating === 'number' ? data.rating : 5,
      avatar: String(data.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80'),
      createdAt: data.createdAt ? String(data.createdAt) : undefined,
    };
  }
};

/**
 * Schema converter for SkillItem Entity
 */
export const skillConverter: FirestoreDataConverter<SkillItem> = {
  toFirestore(skill: SkillItem): DocumentData {
    return {
      id: skill.id,
      title: skill.title,
      description: skill.description,
      iconName: skill.iconName,
      percentage: Number(skill.percentage || 0),
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): SkillItem {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      title: String(data.title || ''),
      description: String(data.description || ''),
      iconName: String(data.iconName || 'Sparkles'),
      percentage: typeof data.percentage === 'number' ? data.percentage : 0,
    };
  }
};

// ============================================================================
// 2. SCHEMA VALIDATION GUARDS (The Anti-Update-Gap Schema Checkers)
// Validates boundaries, types, sizes, regex IDs, protect against DB injections
// ============================================================================

export function isValidId(id: string): boolean {
  return typeof id === 'string' && id.length > 0 && id.length <= 128 && /^[a-zA-Z0-9_\-]+$/.test(id);
}

export function validateServiceSchema(service: Service): void {
  if (!isValidId(service.id)) {
    throw new Error('Schema Violation: id must be a sanitised string matching ^[a-zA-Z0-9_\\-]+$ up to 128 chars.');
  }
  if (typeof service.title !== 'string' || service.title.trim().length === 0 || service.title.length > 200) {
    throw new Error('Schema Violation: title is required and must remain under 200 characters.');
  }
  if (typeof service.description !== 'string' || service.description.length > 1000) {
    throw new Error('Schema Violation: description must remain under 1000 characters.');
  }
  if (typeof service.iconName !== 'string' || service.iconName.length > 100) {
    throw new Error('Schema Violation: iconName must be a valid Lucide icon key.');
  }
  if (!Array.isArray(service.details)) {
    throw new Error('Schema Violation: details list must be an array.');
  }
  if (service.details.length > 30) {
    throw new Error('Schema Violation: details array is capped at 30 items for display sanity.');
  }
}

export function validatePortfolioSchema(item: PortfolioItem): void {
  if (!isValidId(item.id)) {
    throw new Error('Schema Violation: id must be a sanitised string matching ^[a-zA-Z0-9_\\-]+$ up to 128 chars.');
  }
  if (typeof item.title !== 'string' || item.title.trim().length === 0 || item.title.length > 200) {
    throw new Error('Schema Violation: title is required and must remain under 200 characters.');
  }
  if (typeof item.description !== 'string' || item.description.length > 2000) {
    throw new Error('Schema Violation: description must remain under 2000 characters.');
  }
  if (typeof item.client !== 'string' || item.client.length > 200) {
    throw new Error('Schema Violation: client must remain under 200 characters.');
  }
  if (typeof item.category !== 'string' || item.category.trim().length === 0 || item.category.length > 100) {
    throw new Error('Schema Violation: category is required and must remain under 100 characters.');
  }
  if (typeof item.image !== 'string' || item.image.length > 25000000) { // allows base64 payload up to ~25MB
    throw new Error('Schema Violation: Primary cover image is required (URL or robust base64 upload).');
  }
  if (!Array.isArray(item.scope)) {
    throw new Error('Schema Violation: scope deliverables must be an array.');
  }
  if (item.scope.length > 20) {
    throw new Error('Schema Violation: scope items count is capped at 20.');
  }
  if (typeof item.challenge !== 'string' || item.challenge.length > 3000) {
    throw new Error('Schema Violation: Challenge details must not exceed 3000 characters.');
  }
  if (typeof item.solution !== 'string' || item.solution.length > 3000) {
    throw new Error('Schema Violation: Solution details must not exceed 3000 characters.');
  }
  if (item.projectLink && (typeof item.projectLink !== 'string' || item.projectLink.length > 2000)) {
    throw new Error('Schema Violation: projectLink must be a string under 2000 characters.');
  }
  if (item.githubLink && (typeof item.githubLink !== 'string' || item.githubLink.length > 2000)) {
    throw new Error('Schema Violation: githubLink must be a string under 2000 characters.');
  }
}

export function validateContactSettingsSchema(settings: ContactSettings): void {
  if (typeof settings.email !== 'string' || !settings.email.includes('@') || settings.email.length > 200) {
    throw new Error('Schema Violation: email coordinates is required and must be a valid email format.');
  }
  if (typeof settings.phone !== 'string' || settings.phone.length > 50) {
    throw new Error('Schema Violation: phone contact details is required and must be under 50 characters.');
  }
  if (settings.secondaryPhone && (typeof settings.secondaryPhone !== 'string' || settings.secondaryPhone.length > 50)) {
    throw new Error('Schema Violation: secondaryPhone must be under 50 characters.');
  }
  if (typeof settings.location !== 'string' || settings.location.length > 500) {
    throw new Error('Schema Violation: location address string must remain under 500 characters.');
  }
  if (typeof settings.agencySlogan !== 'string' || settings.agencySlogan.length > 500) {
    throw new Error('Schema Violation: agencySlogan must remain under 500 characters.');
  }
}

export function validateSkillSchema(skill: SkillItem): void {
  if (!isValidId(skill.id)) {
    throw new Error('Schema Violation: id must be a sanitised string matching ^[a-zA-Z0-9_\\-]+$ up to 128 chars.');
  }
  if (typeof skill.title !== 'string' || skill.title.trim().length === 0 || skill.title.length > 200) {
    throw new Error('Schema Violation: title is required and must remain under 200 characters.');
  }
  if (typeof skill.description !== 'string' || skill.description.length > 1000) {
    throw new Error('Schema Violation: description must remain under 1000 characters.');
  }
  if (typeof skill.iconName !== 'string' || skill.iconName.length > 100) {
    throw new Error('Schema Violation: iconName must be a valid Lucide icon key.');
  }
  if (typeof skill.percentage !== 'number' || skill.percentage < 0 || skill.percentage > 100) {
    throw new Error('Schema Violation: percentage must be a number between 0 and 100.');
  }
}

// ============================================================================
// 3. SECURE COLLECTION REFERENCE RETRIEVAL
// Enables strict typing directly at the Firestore collection references level
// ============================================================================

export function getServicesCollection(): CollectionReference<Service> {
  return collection(db, 'services').withConverter(serviceConverter);
}

export function getPortfolioCollection(): CollectionReference<PortfolioItem> {
  return collection(db, 'portfolio').withConverter(portfolioConverter);
}

export function getSettingsDocRef(): DocumentReference<ContactSettings> {
  return doc(db, 'settings', 'contact').withConverter(contactSettingsConverter);
}

export function getTestimonialsCollection(): CollectionReference<Testimonial> {
  return collection(db, 'testimonials').withConverter(testimonialConverter);
}

export function getSkillsCollection(): CollectionReference<SkillItem> {
  return collection(db, 'skills').withConverter(skillConverter);
}

// ============================================================================
// 4. ADMIN & CLIENT CRUD DYNAMIC MANAGEMENT INTERFACES (Services Layer)
// Wraps operations with strict schemas, validation guards and error handlers.
// ============================================================================

export const FirestoreService = {
  // --- Services Collection CRUD ---
  async fetchServices(): Promise<Service[]> {
    const path = 'services';
    try {
      const snap = await getDocs(getServicesCollection());
      return snap.docs.map(d => d.data());
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
      return [];
    }
  },

  async setService(service: Service): Promise<void> {
    const path = `services/${service.id}`;
    try {
      validateServiceSchema(service);
      const docRef = doc(db, 'services', service.id).withConverter(serviceConverter);
      await setDoc(docRef, service);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  },

  async deleteService(id: string): Promise<void> {
    const path = `services/${id}`;
    try {
      if (!isValidId(id)) throw new Error('Invalid project/service ID provided.');
      const docRef = doc(db, 'services', id);
      await deleteDoc(docRef);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  },

  // --- Portfolio Collection CRUD ---
  async fetchPortfolio(): Promise<PortfolioItem[]> {
    const path = 'portfolio';
    try {
      const snap = await getDocs(getPortfolioCollection());
      return snap.docs.map(d => d.data());
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
      return [];
    }
  },

  async setPortfolioItem(item: PortfolioItem): Promise<void> {
    const path = `portfolio/${item.id}`;
    try {
      validatePortfolioSchema(item);
      const docRef = doc(db, 'portfolio', item.id).withConverter(portfolioConverter);
      await setDoc(docRef, item);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  },

  async deletePortfolioItem(id: string): Promise<void> {
    const path = `portfolio/${id}`;
    try {
      if (!isValidId(id)) throw new Error('Invalid portfolio identifier.');
      const docRef = doc(db, 'portfolio', id);
      await deleteDoc(docRef);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  },

  // --- Settings Collection Operations ---
  async fetchContactSettings(): Promise<ContactSettings | null> {
    const path = 'settings/contact';
    try {
      const snap = await getDoc(getSettingsDocRef());
      return snap.exists() ? snap.data() : null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
      return null;
    }
  },

  async setContactSettings(settings: ContactSettings): Promise<void> {
    const path = 'settings/contact';
    try {
      validateContactSettingsSchema(settings);
      await setDoc(getSettingsDocRef(), settings);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  },

  // --- Testimonials Collection CRUD ---
  async fetchTestimonials(): Promise<Testimonial[]> {
    const path = 'testimonials';
    try {
      const snap = await getDocs(getTestimonialsCollection());
      const list = snap.docs.map(d => d.data());
      // Sort newest custom testimonials first
      return list.sort((a, b) => {
        const tA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const tB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return tB - tA;
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
      return [];
    }
  },

  async addTestimonial(testimonial: Testimonial): Promise<void> {
    const path = `testimonials/${testimonial.id}`;
    try {
      if (!isValidId(testimonial.id)) {
        throw new Error('Testimonial ID must match a sanitised string identifier.');
      }
      if (typeof testimonial.name !== 'string' || testimonial.name.trim().length === 0) {
        throw new Error('Testimonial name is required.');
      }
      if (typeof testimonial.quote !== 'string' || testimonial.quote.trim().length === 0) {
        throw new Error('Testimonial experience quote content is required.');
      }
      const docRef = doc(db, 'testimonials', testimonial.id).withConverter(testimonialConverter);
      await setDoc(docRef, testimonial);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  },

  // --- Skills Collection CRUD ---
  async fetchSkills(): Promise<SkillItem[]> {
    const path = 'skills';
    try {
      const snap = await getDocs(getSkillsCollection());
      return snap.docs.map(d => d.data());
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
      return [];
    }
  },

  async setSkill(skill: SkillItem): Promise<void> {
    const path = `skills/${skill.id}`;
    try {
      validateSkillSchema(skill);
      const docRef = doc(db, 'skills', skill.id).withConverter(skillConverter);
      await setDoc(docRef, skill);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  },

  async deleteSkill(id: string): Promise<void> {
    const path = `skills/${id}`;
    try {
      if (!isValidId(id)) throw new Error('Invalid skill ID provided.');
      const docRef = doc(db, 'skills', id);
      await deleteDoc(docRef);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  }
};
