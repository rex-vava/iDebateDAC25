export interface Category {
  id: string;
  title: string;
  icon: string;
  description: string;
  isAward: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Nominee {
  id: string;
  categoryId: string;
  name: string;
  photo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Vote {
  id: string;
  categoryId: string;
  nomineeId: string;
  voterId: string;
  createdAt: string;
}

export interface CategoryWithNominees extends Category {
  nominees: Nominee[];
  is_award: boolean; // Add compatibility field
}

// Default categories data
export const defaultCategories: Category[] = [
  {
    id: 'mama-mekha',
    title: 'Mama Mekha Award',
    icon: '🥇',
    description: 'Lifetime Service Recognition - Special Award',
    isAward: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'best-camp-director',
    title: 'Best Camp Director',
    icon: '🎯',
    description: 'Outstanding leadership and vision in camp direction',
    isAward: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'top-venue',
    title: 'Top Host Venue',
    icon: '🏛️',
    description: 'Most welcoming venue with strong logistical support',
    isAward: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'volunteer-intake',
    title: 'Volunteer Intake of the Decade',
    icon: '🤝',
    description: 'Group that left a lasting mark through service and spirit',
    isAward: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'mentor-decade',
    title: 'Mentor of the Decade',
    icon: '👨‍🏫',
    description: 'Known for creating winning teams and impacting students',
    isAward: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'afternoon-class',
    title: 'Best Afternoon Class',
    icon: '🎨',
    description: 'The most engaging and enjoyable experience for campers',
    isAward: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'partners-spotlight',
    title: 'The Partner\'s Spotlight',
    icon: '🤝',
    description: 'Organization that provided exceptional support and partnership',
    isAward: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'dreamer-decade',
    title: 'Dreamer of the Decade',
    icon: '💭',
    description: 'When you think of camp, who comes to mind?',
    isAward: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'face-dreamers',
    title: 'Face of the Dreamers',
    icon: '👑',
    description: 'The person who best represents the spirit of Dreamers Academy',
    isAward: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'hype-maker',
    title: 'Hype Maker of the Decade',
    icon: '🎉',
    description: 'The person who brought the most energy and excitement to camp',
    isAward: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'alumni-decade',
    title: 'Alumni of the Decade',
    icon: '🎓',
    description: 'Alumni who consistently returned to support and mentor',
    isAward: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'dream-creator',
    title: 'Dream Creator of the Decade',
    icon: '✨',
    description: 'The visionary who helped shape and create the dream',
    isAward: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'execution-excellence',
    title: 'Execution Excellence Award',
    icon: '⚡',
    description: 'Outstanding Project Implementation and Leadership',
    isAward: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Default nominees data with all the provided nominees
export const defaultNominees: Nominee[] = [
  // Best Camp Director
  {
    id: 'director-1',
    categoryId: 'best-camp-director',
    name: 'Ornella TUZA',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'director-2',
    categoryId: 'best-camp-director',
    name: 'Angelo Urukundo',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'director-3',
    categoryId: 'best-camp-director',
    name: 'Wesley',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'director-4',
    categoryId: 'best-camp-director',
    name: 'Amanda',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'director-5',
    categoryId: 'best-camp-director',
    name: 'Nelson',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'director-6',
    categoryId: 'best-camp-director',
    name: 'Bangaly',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'director-7',
    categoryId: 'best-camp-director',
    name: 'Bruce Jesh',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  // Top Host Venue
  {
    id: 'venue-1',
    categoryId: 'top-venue',
    name: 'New Life High School',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'venue-2',
    categoryId: 'top-venue',
    name: 'Hope Haven',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'venue-3',
    categoryId: 'top-venue',
    name: 'Saint Vincent Muhoza',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'venue-4',
    categoryId: 'top-venue',
    name: 'Gashora Girls Academy',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  // Volunteer Intake of the Decade
  {
    id: 'vol-1',
    categoryId: 'volunteer-intake',
    name: 'iVolunteer \'2024-25',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'vol-2',
    categoryId: 'volunteer-intake',
    name: 'iVolunteer \'2023-24',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'vol-3',
    categoryId: 'volunteer-intake',
    name: 'iVolunteer \'2022-23',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'vol-4',
    categoryId: 'volunteer-intake',
    name: 'iVolunteer \'2021-22',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  // Mentor of the Decade
  {
    id: 'mentor-1',
    categoryId: 'mentor-decade',
    name: 'Karema Teta Shamira',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'mentor-2',
    categoryId: 'mentor-decade',
    name: 'Emma Victor',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'mentor-3',
    categoryId: 'mentor-decade',
    name: 'Keza Kestia',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'mentor-4',
    categoryId: 'mentor-decade',
    name: 'Lucas Shema',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'mentor-5',
    categoryId: 'mentor-decade',
    name: 'Queen Kabandana',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'mentor-6',
    categoryId: 'mentor-decade',
    name: 'Joana Byumvohore',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'mentor-7',
    categoryId: 'mentor-decade',
    name: 'Ally hamis Rwemera',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  // Best Afternoon Class
  {
    id: 'class-1',
    categoryId: 'afternoon-class',
    name: 'Dance Class',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'class-2',
    categoryId: 'afternoon-class',
    name: 'Creative writing',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'class-3',
    categoryId: 'afternoon-class',
    name: 'Multimedia',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'class-4',
    categoryId: 'afternoon-class',
    name: 'Art class',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'class-5',
    categoryId: 'afternoon-class',
    name: 'Leadership Nexus',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  // The Partner's Spotlight
  {
    id: 'partner-1',
    categoryId: 'partners-spotlight',
    name: 'BK Foundation',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'partner-2',
    categoryId: 'partners-spotlight',
    name: 'Mastercard Foundation',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'partner-3',
    categoryId: 'partners-spotlight',
    name: 'JMU',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'partner-4',
    categoryId: 'partners-spotlight',
    name: 'ALX',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'partner-5',
    categoryId: 'partners-spotlight',
    name: 'Vanderbilt',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'partner-6',
    categoryId: 'partners-spotlight',
    name: 'Weber state university',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'partner-7',
    categoryId: 'partners-spotlight',
    name: 'Never Again',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  // Dreamer of the Decade
  {
    id: 'dreamer-1',
    categoryId: 'dreamer-decade',
    name: 'KALISA Danny',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'dreamer-2',
    categoryId: 'dreamer-decade',
    name: 'Rukundo Bonfils',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'dreamer-3',
    categoryId: 'dreamer-decade',
    name: 'Abi benie',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'dreamer-4',
    categoryId: 'dreamer-decade',
    name: 'Eva',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'dreamer-5',
    categoryId: 'dreamer-decade',
    name: 'Christelle Maiga',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'dreamer-6',
    categoryId: 'dreamer-decade',
    name: 'Ndahiro Clever',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'dreamer-7',
    categoryId: 'dreamer-decade',
    name: 'King Kitoko',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'dreamer-8',
    categoryId: 'dreamer-decade',
    name: 'Karenzi Boris',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'dreamer-9',
    categoryId: 'dreamer-decade',
    name: 'Christian Bahire',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'dreamer-10',
    categoryId: 'dreamer-decade',
    name: 'Ornella Ikirezi Tuza',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'dreamer-11',
    categoryId: 'dreamer-decade',
    name: 'Sonia NYANTABA',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  // Face of the Dreamers
  {
    id: 'face-1',
    categoryId: 'face-dreamers',
    name: 'Kalisa Deborah',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'face-2',
    categoryId: 'face-dreamers',
    name: 'Ruzindana Kessy',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'face-3',
    categoryId: 'face-dreamers',
    name: 'Akarabo Katsey',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'face-4',
    categoryId: 'face-dreamers',
    name: 'Ashley Mutoni',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  // Hype Maker of the Decade
  {
    id: 'hype-1',
    categoryId: 'hype-maker',
    name: 'Cyimana',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'hype-2',
    categoryId: 'hype-maker',
    name: 'Lebon',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'hype-3',
    categoryId: 'hype-maker',
    name: 'Uwase LaTasha Muganga',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'hype-4',
    categoryId: 'hype-maker',
    name: 'Wesley',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'hype-5',
    categoryId: 'hype-maker',
    name: 'Bangaly',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'hype-6',
    categoryId: 'hype-maker',
    name: 'Nelson',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'hype-7',
    categoryId: 'hype-maker',
    name: 'Jesh',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  // Alumni of the Decade
  {
    id: 'alumni-1',
    categoryId: 'alumni-decade',
    name: 'Kalisa Danny',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'alumni-2',
    categoryId: 'alumni-decade',
    name: 'Kirenga Sherif',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'alumni-3',
    categoryId: 'alumni-decade',
    name: 'Minega Jerry',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'alumni-4',
    categoryId: 'alumni-decade',
    name: 'Iriza Jade',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'alumni-5',
    categoryId: 'alumni-decade',
    name: 'Gloria munana',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'alumni-6',
    categoryId: 'alumni-decade',
    name: 'Ingride cyuzuzo',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'alumni-7',
    categoryId: 'alumni-decade',
    name: 'Dadi',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'alumni-8',
    categoryId: 'alumni-decade',
    name: 'Captain Franck',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'alumni-9',
    categoryId: 'alumni-decade',
    name: 'Jean David Tuyishime',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'alumni-10',
    categoryId: 'alumni-decade',
    name: 'Diakite Bangaly',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'alumni-11',
    categoryId: 'alumni-decade',
    name: 'Christian Bahire',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  // Dream Creator of the Decade
  {
    id: 'creator-1',
    categoryId: 'dream-creator',
    name: 'Ngoga Guillaume',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'creator-2',
    categoryId: 'dream-creator',
    name: 'Dave Hemsworth',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'creator-3',
    categoryId: 'dream-creator',
    name: 'Lebon Israel',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'creator-4',
    categoryId: 'dream-creator',
    name: 'Babu',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'creator-5',
    categoryId: 'dream-creator',
    name: 'BETA',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'creator-6',
    categoryId: 'dream-creator',
    name: 'JayD',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'creator-7',
    categoryId: 'dream-creator',
    name: 'Kingly Diakite',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  // Execution Excellence Award
  {
    id: 'exec-1',
    categoryId: 'execution-excellence',
    name: 'Danny Kalisa',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'exec-2',
    categoryId: 'execution-excellence',
    name: 'Abi Benie Umwari',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'exec-3',
    categoryId: 'execution-excellence',
    name: 'Asingizwe Joie Colette',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'exec-4',
    categoryId: 'execution-excellence',
    name: 'Arsene Maurice',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'exec-5',
    categoryId: 'execution-excellence',
    name: 'Hakidu Shema',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'exec-6',
    categoryId: 'execution-excellence',
    name: 'Ornella Ikirezi',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'exec-7',
    categoryId: 'execution-excellence',
    name: 'Kitoko',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'exec-8',
    categoryId: 'execution-excellence',
    name: 'Mutezintare Isimbi Sumaya',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'exec-9',
    categoryId: 'execution-excellence',
    name: 'Mfuranzima Divin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'exec-10',
    categoryId: 'execution-excellence',
    name: 'Abatesi Nadine',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'exec-11',
    categoryId: 'execution-excellence',
    name: 'Cyuzuzo Kendy',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Generate a unique voter ID for each user
export const getVoterId = (): string => {
  let voterId = localStorage.getItem('dreamers-voter-id');
  if (!voterId) {
    voterId = `voter_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('dreamers-voter-id', voterId);
  }
  return voterId;
};

// Local storage keys
export const STORAGE_KEYS = {
  CATEGORIES: 'dreamers-categories',
  NOMINEES: 'dreamers-nominees',
  VOTES: 'dreamers-votes',
  PHOTOS: 'dreamers-photos'
};

// Initialize local storage with default data
export const initializeLocalData = () => {
  if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(defaultCategories));
  }
  if (!localStorage.getItem(STORAGE_KEYS.NOMINEES)) {
    localStorage.setItem(STORAGE_KEYS.NOMINEES, JSON.stringify(defaultNominees));
  }
  if (!localStorage.getItem(STORAGE_KEYS.VOTES)) {
    localStorage.setItem(STORAGE_KEYS.VOTES, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.PHOTOS)) {
    localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify({}));
  }
};

// Utility functions for local storage operations
export const getFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage key ${key}:`, error);
    return defaultValue;
  }
};

export const setToStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to localStorage key ${key}:`, error);
  }
};

// Photo upload utilities
export const uploadPhoto = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('File must be an image'));
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      reject(new Error('File size must be less than 5MB'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      resolve(result);
    };
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    reader.readAsDataURL(file);
  });
};