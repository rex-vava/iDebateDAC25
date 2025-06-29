import { useState, useEffect } from 'react';
import { database, Category, Nominee, initializeDefaultData } from '../lib/firebase';
import { ref, onValue, off } from 'firebase/database';

export interface CategoryWithNominees extends Category {
  nominees: Array<{
    id: string;
    name: string;
    photo?: string;
  }>;
}

export const useCategories = () => {
  const [categories, setCategories] = useState<CategoryWithNominees[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Initialize default data if needed
        await initializeDefaultData();
        
        // Set up real-time listeners
        const categoriesRef = ref(database, 'categories');
        const nomineesRef = ref(database, 'nominees');
        
        let categoriesData: { [key: string]: Category } = {};
        let nomineesData: { [key: string]: Nominee } = {};
        let dataLoaded = { categories: false, nominees: false };
        
        const updateCategories = () => {
          if (dataLoaded.categories && dataLoaded.nominees) {
            const formattedCategories = Object.values(categoriesData).map(cat => ({
              ...cat,
              nominees: Object.values(nomineesData)
                .filter(nominee => nominee.category_id === cat.id)
                .map(nominee => ({
                  id: nominee.id,
                  name: nominee.name,
                  photo: nominee.photo
                }))
            }));
            
            setCategories(formattedCategories);
            setLoading(false);
          }
        };
        
        // Listen to categories
        onValue(categoriesRef, (snapshot) => {
          if (snapshot.exists()) {
            categoriesData = snapshot.val();
          }
          dataLoaded.categories = true;
          updateCategories();
        });
        
        // Listen to nominees
        onValue(nomineesRef, (snapshot) => {
          if (snapshot.exists()) {
            nomineesData = snapshot.val();
          } else {
            nomineesData = {};
          }
          dataLoaded.nominees = true;
          updateCategories();
        });
        
        setError(null);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch categories');
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup listeners on unmount
    return () => {
      const categoriesRef = ref(database, 'categories');
      const nomineesRef = ref(database, 'nominees');
      off(categoriesRef);
      off(nomineesRef);
    };
  }, []);

  return {
    categories,
    loading,
    error,
    refetch: () => {} // Not needed with real-time updates
  };
};