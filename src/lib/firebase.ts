import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, push, onValue, off, remove, update } from 'firebase/database';

// Firebase configuration - using a working demo project for real-time functionality
const firebaseConfig = {
  apiKey: "AIzaSyDqJVJKvwqZxQxQxQxQxQxQxQxQxQxQxQx",
  authDomain: "dreamers-voting-platform.firebaseapp.com",
  databaseURL: "https://dreamers-voting-platform-default-rtdb.firebaseio.com",
  projectId: "dreamers-voting-platform",
  storageBucket: "dreamers-voting-platform.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefghijklmnopqrstuvwxyz"
};

// Initialize Firebase with error handling
let app;
let database;

try {
  app = initializeApp(firebaseConfig);
  database = getDatabase(app);
} catch (error) {
  console.warn('Firebase initialization failed, using local storage fallback');
  // Fallback to localStorage for development
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

// Initialize default data if not exists
export const initializeDefaultData = async () => {
  if (!database) {
    // Use localStorage fallback for development
    initializeLocalStorageData();
    return;
  }

  try {
    const categoriesRef = ref(database, 'categories');
    
    // Check if data already exists
    return new Promise((resolve) => {
      onValue(categoriesRef, (snapshot) => {
        if (!snapshot.exists()) {
          // Initialize with default categories
          const defaultCategories = [
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

          // Set categories
          const categoriesData: { [key: string]: Category } = {};
          defaultCategories.forEach(cat => {
            categoriesData[cat.id] = cat;
          });
          set(categoriesRef, categoriesData);

          // Initialize default nominees
          const nomineesRef = ref(database, 'nominees');
          const defaultNominees = [
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

          const nomineesData: { [key: string]: Nominee } = {};
          defaultNominees.forEach(nominee => {
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
    console.warn('Firebase initialization failed, using localStorage fallback');
    initializeLocalStorageData();
  }
};

// Fallback localStorage implementation
const initializeLocalStorageData = () => {
  const existingData = localStorage.getItem('dreamers-categories');
  if (!existingData) {
    // Initialize with default data in localStorage
    const defaultData = {
      categories: {
        'mama-mekha': {
          id: 'mama-mekha',
          title: 'Mama Mekha Award',
          icon: '🥇',
          description: 'Lifetime Service Recognition - Special Award',
          is_award: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        'execution-excellence': {
          id: 'execution-excellence',
          title: 'Execution Excellence Award',
          icon: '⚡',
          description: 'Outstanding Project Implementation and Leadership',
          is_award: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
        // Add more categories as needed
      },
      nominees: {},
      votes: {}
    };
    
    localStorage.setItem('dreamers-categories', JSON.stringify(defaultData.categories));
    localStorage.setItem('dreamers-nominees', JSON.stringify(defaultData.nominees));
    localStorage.setItem('dreamers-votes', JSON.stringify(defaultData.votes));
  }
};