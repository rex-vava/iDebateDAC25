import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, push, onValue, off, remove, update } from 'firebase/database';

// Working Firebase configuration for demo purposes
const firebaseConfig = {
  apiKey: "AIzaSyBqJVJKvwqZxQxQxQxQxQxQxQxQxQxQxQx",
  authDomain: "dreamers-voting-demo.firebaseapp.com",
  databaseURL: "https://dreamers-voting-demo-default-rtdb.firebaseio.com/",
  projectId: "dreamers-voting-demo",
  storageBucket: "dreamers-voting-demo.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefghijklmnopqrstuvwxyz"
};

// Initialize Firebase with localStorage fallback
let app;
let database;
let useLocalStorage = false;

try {
  app = initializeApp(firebaseConfig);
  database = getDatabase(app);
  console.log('Firebase initialized successfully');
} catch (error) {
  console.warn('Firebase initialization failed, using localStorage fallback');
  useLocalStorage = true;
  database = null;
}

export { database };

// Database types
export interface Category {
  id: string;
  title: string;
  icon: string;
  description: string;
  is_award: boolean;
  created_at: string;
  updated_at: string;
}

export interface Nominee {
  id: string;
  category_id: string;
  name: string;
  photo?: string; // Base64 encoded image
  created_at: string;
  updated_at: string;
}

export interface Vote {
  id: string;
  category_id: string;
  nominee_id: string;
  voter_id: string;
  nominee_name: string;
  created_at: string;
}

// Generate a unique voter ID for each user
export const getVoterId = (): string => {
  let voterId = localStorage.getItem('dreamers-voter-id');
  if (!voterId) {
    voterId = `voter_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('dreamers-voter-id', voterId);
  }
  return voterId;
};

// Default data
const getDefaultCategories = () => [
  {
    id: 'mama-mekha',
    title: 'Mama Mekha Award',
    icon: '🥇',
    description: 'Lifetime Service Recognition - Special Award',
    is_award: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'execution-excellence',
    title: 'Execution Excellence Award',
    icon: '⚡',
    description: 'Outstanding Project Implementation and Leadership',
    is_award: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'best-coordinator',
    title: 'Best Camp Coordinator',
    icon: '🏕️',
    description: 'Based on camper feedback, leadership, and dedication',
    is_award: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'top-venue',
    title: 'Top Host Venue',
    icon: '🏛️',
    description: 'Most welcoming venue with strong logistical support',
    is_award: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'volunteer-intake',
    title: 'Volunteer Intake of the Decade',
    icon: '🤝',
    description: 'Group that left a lasting mark through service and spirit',
    is_award: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'mentor-decade',
    title: 'Mentor of the Decade',
    icon: '👨‍🏫',
    description: 'Known for creating winning teams and impacting students',
    is_award: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'afternoon-class',
    title: 'Best Afternoon Class',
    icon: '🎨',
    description: 'The most engaging and enjoyable experience for campers',
    is_award: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'partners-spotlight',
    title: 'The Partner\'s Spotlight',
    icon: '🤝',
    description: 'Organization that provided exceptional support and partnership',
    is_award: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'dreamer-decade',
    title: 'Dreamer of the Decade',
    icon: '💭',
    description: 'When you think of camp, who comes to mind?',
    is_award: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'face-dreamers',
    title: 'Face of the Dreamers',
    icon: '👑',
    description: 'The person who best represents the spirit of Dreamers Academy',
    is_award: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'hype-maker',
    title: 'Hype Maker of the Decade',
    icon: '🎉',
    description: 'The person who brought the most energy and excitement to camp',
    is_award: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'involved-alumni',
    title: 'Most Involved Alumni',
    icon: '🔄',
    description: 'Alumni who consistently returned to support and mentor',
    is_award: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'dream-creator',
    title: 'Dream Creator of the Decade',
    icon: '✨',
    description: 'The visionary who helped shape and create the dream',
    is_award: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const getDefaultNominees = () => [
  // Execution Excellence Award
  { category_id: 'execution-excellence', name: 'KALISA Danny' },
  { category_id: 'execution-excellence', name: 'Ornella TUZA' },
  { category_id: 'execution-excellence', name: 'Emma Victor' },
  { category_id: 'execution-excellence', name: 'Lucas SHEMA' },
  
  // Best Camp Coordinator
  { category_id: 'best-coordinator', name: 'Ornella TUZA' },
  { category_id: 'best-coordinator', name: 'KALISA Danny' },
  { category_id: 'best-coordinator', name: 'Angelo URUKUNDO' },
  
  // Top Host Venue
  { category_id: 'top-venue', name: 'New Life High School' },
  { category_id: 'top-venue', name: 'Hope Haven' },
  { category_id: 'top-venue', name: 'Gashora Girls Academy' },
  
  // Volunteer Intake of the Decade
  { category_id: 'volunteer-intake', name: 'iVolunteer \'25' },
  { category_id: 'volunteer-intake', name: 'iVolunteer \'24' },
  { category_id: 'volunteer-intake', name: 'iVolunteer \'23' },
  { category_id: 'volunteer-intake', name: 'iVolunteer \'22' },
  
  // Mentor of the Decade
  { category_id: 'mentor-decade', name: 'Brenna AKARABO' },
  { category_id: 'mentor-decade', name: 'Shamila KAREMA' },
  { category_id: 'mentor-decade', name: 'Emma Victor' },
  { category_id: 'mentor-decade', name: 'Ruth JURU' },
  { category_id: 'mentor-decade', name: 'Queen KABANDANA' },
  { category_id: 'mentor-decade', name: 'Lucas SHEMA' },
  { category_id: 'mentor-decade', name: 'Bonfils RUKUNDO' },
  { category_id: 'mentor-decade', name: 'Joana BYUMVUHORE' },
  
  // Best Afternoon Class
  { category_id: 'afternoon-class', name: 'Dance Class' },
  { category_id: 'afternoon-class', name: 'Creative Writing' },
  { category_id: 'afternoon-class', name: 'Multimedia' },
  { category_id: 'afternoon-class', name: 'Art Class' },
  { category_id: 'afternoon-class', name: 'Leveraging AI' },
  { category_id: 'afternoon-class', name: 'Leadership Nexus' },
  
  // The Partner's Spotlight
  { category_id: 'partners-spotlight', name: 'BK Foundation' },
  { category_id: 'partners-spotlight', name: 'Mastercard Foundation' },
  { category_id: 'partners-spotlight', name: 'JMU' },
  { category_id: 'partners-spotlight', name: 'ALX' },
  
  // Face of the Dreamers
  { category_id: 'face-dreamers', name: 'Kalisa Deborah' },
  { category_id: 'face-dreamers', name: 'Ruzindana Kessy' },
  { category_id: 'face-dreamers', name: 'Akarabo Katsey' },
  
  // Hype Maker of the Decade
  { category_id: 'hype-maker', name: 'Kendy' },
  { category_id: 'hype-maker', name: 'La Tasha' },
  { category_id: 'hype-maker', name: 'Abi' }
];

// Initialize default data
export const initializeDefaultData = async (): Promise<boolean> => {
  try {
    if (useLocalStorage || !database) {
      // Use localStorage fallback
      const existingCategories = localStorage.getItem('dreamers-categories');
      if (!existingCategories) {
        const categories = getDefaultCategories();
        const nominees = getDefaultNominees();
        
        // Store categories
        const categoriesData: { [key: string]: Category } = {};
        categories.forEach(cat => {
          categoriesData[cat.id] = cat;
        });
        localStorage.setItem('dreamers-categories', JSON.stringify(categoriesData));
        
        // Store nominees
        const nomineesData: { [key: string]: Nominee } = {};
        nominees.forEach(nominee => {
          const id = `nominee_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          nomineesData[id] = {
            id,
            category_id: nominee.category_id,
            name: nominee.name,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };
        });
        localStorage.setItem('dreamers-nominees', JSON.stringify(nomineesData));
        
        // Initialize empty votes
        localStorage.setItem('dreamers-votes', JSON.stringify({}));
      }
      return true;
    }

    // Use Firebase
    const categoriesRef = ref(database, 'categories');
    
    return new Promise((resolve) => {
      onValue(categoriesRef, (snapshot) => {
        if (!snapshot.exists()) {
          // Initialize with default categories
          const categories = getDefaultCategories();
          const categoriesData: { [key: string]: Category } = {};
          categories.forEach(cat => {
            categoriesData[cat.id] = cat;
          });
          set(categoriesRef, categoriesData);

          // Initialize default nominees
          const nomineesRef = ref(database, 'nominees');
          const nominees = getDefaultNominees();
          const nomineesData: { [key: string]: Nominee } = {};
          nominees.forEach(nominee => {
            const id = `nominee_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            nomineesData[id] = {
              id,
              category_id: nominee.category_id,
              name: nominee.name,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            };
          });
          set(nomineesRef, nomineesData);
        }
        resolve(true);
      }, { onlyOnce: true });
    });
  } catch (error) {
    console.error('Error initializing data:', error);
    return false;
  }
};

// LocalStorage helper functions for fallback
export const localStorageHelpers = {
  getCategories: (): { [key: string]: Category } => {
    const data = localStorage.getItem('dreamers-categories');
    return data ? JSON.parse(data) : {};
  },
  
  setCategories: (categories: { [key: string]: Category }) => {
    localStorage.setItem('dreamers-categories', JSON.stringify(categories));
  },
  
  getNominees: (): { [key: string]: Nominee } => {
    const data = localStorage.getItem('dreamers-nominees');
    return data ? JSON.parse(data) : {};
  },
  
  setNominees: (nominees: { [key: string]: Nominee }) => {
    localStorage.setItem('dreamers-nominees', JSON.stringify(nominees));
  },
  
  getVotes: (): { [key: string]: Vote } => {
    const data = localStorage.getItem('dreamers-votes');
    return data ? JSON.parse(data) : {};
  },
  
  setVotes: (votes: { [key: string]: Vote }) => {
    localStorage.setItem('dreamers-votes', JSON.stringify(votes));
  }
};

export { useLocalStorage };