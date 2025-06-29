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
    id: 'execution-excellence',
    title: 'Execution Excellence Award',
    icon: '⚡',
    description: 'Outstanding Project Implementation and Leadership',
    isAward: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'best-coordinator',
    title: 'Best Camp Coordinator',
    icon: '🏕️',
    description: 'Based on camper feedback, leadership, and dedication',
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
    id: 'involved-alumni',
    title: 'Most Involved Alumni',
    icon: '🔄',
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
  }
];

// Sample Base64 placeholder images (you can replace these with actual photos)
const samplePhotos = {
  // Professional headshot placeholder - replace with actual Base64 data
  professional: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iMzciIHI9IjE1IiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0yNSA4NUMyNSA3MS43NDUyIDM1Ljc0NTIgNjEgNDkgNjFINTFDNjQuMjU0OCA2MSA3NSA3MS43NDUyIDc1IDg1VjEwMEgyNVY4NVoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+',
  
  // Team photo placeholder
  team: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRUZGNkZGIi8+CjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjEwIiBmaWxsPSIjRkI5MjNDIi8+CjxjaXJjbGUgY3g9IjcwIiBjeT0iMzAiIHI9IjEwIiBmaWxsPSIjRkI5MjNDIi8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTUiIHI9IjEwIiBmaWxsPSIjRkI5MjNDIi8+CjxwYXRoIGQ9Ik0yMCA3NUMyMCA2OC4zNzI2IDI1LjM3MjYgNjMgMzIgNjNIMzRDNDAuNjI3NCA2MyA0NiA2OC4zNzI2IDQ2IDc1VjkwSDIwVjc1WiIgZmlsbD0iI0ZCOTIzQyIvPgo8cGF0aCBkPSJNNTQgNzVDNTQgNjguMzcyNiA1OS4zNzI2IDYzIDY2IDYzSDY4Qzc0LjYyNzQgNjMgODAgNjguMzcyNiA4MCA3NVY5MEg1NFY3NVoiIGZpbGw9IiNGQjkyM0MiLz4KPHBhdGggZD0iTTM3IDkwQzM3IDgzLjM3MjYgNDIuMzcyNiA3OCA0OSA3OEg1MUM1Ny42Mjc0IDc4IDYzIDgzLjM3MjYgNjMgOTBWMTAwSDM3VjkwWiIgZmlsbD0iI0ZCOTIzQyIvPgo8L3N2Zz4=',
  
  // Organization logo placeholder
  organization: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRkVGQ0U4Ii8+CjxyZWN0IHg9IjIwIiB5PSI0MCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRkFDQzE1Ii8+CjxyZWN0IHg9IjMwIiB5PSIyMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjRkFDQzE1Ii8+CjxyZWN0IHg9IjQ1IiB5PSIxMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjRkFDQzE1Ii8+Cjwvc3ZnPg=='
};

// Default nominees data with embedded Base64 photos
export const defaultNominees: Nominee[] = [
  // Execution Excellence Award
  {
    id: 'exec-1',
    categoryId: 'execution-excellence',
    name: 'KALISA Danny',
    photo: samplePhotos.professional, // Replace with actual Base64 photo
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'exec-2',
    categoryId: 'execution-excellence',
    name: 'Ornella TUZA',
    photo: samplePhotos.professional, // Replace with actual Base64 photo
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'exec-3',
    categoryId: 'execution-excellence',
    name: 'Emma Victor',
    photo: samplePhotos.professional, // Replace with actual Base64 photo
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'exec-4',
    categoryId: 'execution-excellence',
    name: 'Lucas SHEMA',
    photo: samplePhotos.professional, // Replace with actual Base64 photo
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  
  // Best Camp Coordinator
  {
    id: 'coord-1',
    categoryId: 'best-coordinator',
    name: 'Ornella TUZA',
    photo: samplePhotos.professional, // Replace with actual Base64 photo
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'coord-2',
    categoryId: 'best-coordinator',
    name: 'KALISA Danny',
    photo: samplePhotos.professional, // Replace with actual Base64 photo
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'coord-3',
    categoryId: 'best-coordinator',
    name: 'Angelo URUKUNDO',
    photo: samplePhotos.professional, // Replace with actual Base64 photo
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  
  // Top Host Venue
  {
    id: 'venue-1',
    categoryId: 'top-venue',
    name: 'New Life High School',
    photo: samplePhotos.organization, // Replace with actual Base64 photo
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'venue-2',
    categoryId: 'top-venue',
    name: 'Hope Haven',
    photo: samplePhotos.organization, // Replace with actual Base64 photo
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'venue-3',
    categoryId: 'top-venue',
    name: 'Gashora Girls Academy',
    photo: samplePhotos.organization, // Replace with actual Base64 photo
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  
  // Volunteer Intake of the Decade
  {
    id: 'vol-1',
    categoryId: 'volunteer-intake',
    name: 'iVolunteer \'25',
    photo: samplePhotos.team, // Replace with actual Base64 photo
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'vol-2',
    categoryId: 'volunteer-intake',
    name: 'iVolunteer \'24',
    photo: samplePhotos.team, // Replace with actual Base64 photo
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'vol-3',
    categoryId: 'volunteer-intake',
    name: 'iVolunteer \'23',
    photo: samplePhotos.team, // Replace with actual Base64 photo
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'vol-4',
    categoryId: 'volunteer-intake',
    name: 'iVolunteer \'22',
    photo: samplePhotos.team, // Replace with actual Base64 photo
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  
  // Mentor of the Decade
  {
    id: 'mentor-1',
    categoryId: 'mentor-decade',
    name: 'Brenna AKARABO',
    photo: samplePhotos.professional, // Replace with actual Base64 photo
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'mentor-2',
    categoryId: 'mentor-decade',
    name: 'Shamila KAREMA',
    photo: samplePhotos.professional, // Replace with actual Base64 photo
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'mentor-3',
    categoryId: 'mentor-decade',
    name: 'Emma Victor',
    photo: samplePhotos.professional, // Replace with actual Base64 photo
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'mentor-4',
    categoryId: 'mentor-decade',
    name: 'Ruth JURU',
    photo: samplePhotos.professional, // Replace with actual Base64 photo
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'mentor-5',
    categoryId: 'mentor-decade',
    name: 'Queen KABANDANA',
    photo: samplePhotos.professional, // Replace with actual Base64 photo
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'mentor-6',
    categoryId: 'mentor-decade',
    name: 'Lucas SHEMA',
    photo: samplePhotos.professional, // Replace with actual Base64 photo
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'mentor-7',
    categoryId: 'mentor-decade',
    name: 'Bonfils RUKUNDO',
    photo: samplePhotos.professional, // Replace with actual Base64 photo
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'mentor-8',
    categoryId: 'mentor-decade',
    name: 'Joana BYUMVUHORE',
    photo: samplePhotos.professional, // Replace with actual Base64 photo
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
    name: 'Creative Writing',
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
    name: 'Art Class',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'class-5',
    categoryId: 'afternoon-class',
    name: 'Leveraging AI',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'class-6',
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
    photo: samplePhotos.organization, // Replace with actual Base64 photo
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'partner-2',
    categoryId: 'partners-spotlight',
    name: 'Mastercard Foundation',
    photo: samplePhotos.organization, // Replace with actual Base64 photo
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'partner-3',
    categoryId: 'partners-spotlight',
    name: 'JMU',
    photo: samplePhotos.organization, // Replace with actual Base64 photo
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'partner-4',
    categoryId: 'partners-spotlight',
    name: 'ALX',
    photo: samplePhotos.organization, // Replace with actual Base64 photo
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  
  // Face of the Dreamers
  {
    id: 'face-1',
    categoryId: 'face-dreamers',
    name: 'Kalisa Deborah',
    photo: samplePhotos.professional, // Replace with actual Base64 photo
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'face-2',
    categoryId: 'face-dreamers',
    name: 'Ruzindana Kessy',
    photo: samplePhotos.professional, // Replace with actual Base64 photo
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'face-3',
    categoryId: 'face-dreamers',
    name: 'Akarabo Katsey',
    photo: samplePhotos.professional, // Replace with actual Base64 photo
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  
  // Hype Maker of the Decade
  {
    id: 'hype-1',
    categoryId: 'hype-maker',
    name: 'Kendy',
    photo: samplePhotos.professional, // Replace with actual Base64 photo
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'hype-2',
    categoryId: 'hype-maker',
    name: 'La Tasha',
    photo: samplePhotos.professional, // Replace with actual Base64 photo
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'hype-3',
    categoryId: 'hype-maker',
    name: 'Abi',
    photo: samplePhotos.professional, // Replace with actual Base64 photo
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

// Helper function to convert image file to Base64 (for development use)
export const convertImageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      console.log(`Base64 for ${file.name}:`);
      console.log(base64String);
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Instructions for adding real photos:
/*
TO ADD REAL PHOTOS:

1. Convert your images to Base64:
   - Use an online converter like https://base64.guru/converter/encode/image
   - Or use the convertImageToBase64 function above in the browser console
   - Or use this command line: `base64 -i your-image.jpg`

2. Replace the placeholder values in the samplePhotos object above with your actual Base64 strings

3. Update the photo property for each nominee with the appropriate Base64 string

Example:
{
  id: 'exec-1',
  categoryId: 'execution-excellence',
  name: 'KALISA Danny',
  photo: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...', // Your actual Base64 string here
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}

4. The photos will then be embedded in your application and available globally when deployed

Note: Keep file sizes reasonable (under 100KB per image when possible) to avoid large bundle sizes.
*/