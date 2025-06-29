import { useState, useEffect } from 'react';
import { database, Category, Nominee, initializeDefaultData, localStorageHelpers, useLocalStorage } from '../lib/firebase';
import { ref, onValue, off, set, push, update, remove } from 'firebase/database';

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
        
        // Initialize default data
        await initializeDefaultData();
        
        if (useLocalStorage || !database) {
          // Use localStorage fallback
          const categoriesData = localStorageHelpers.getCategories();
          const nomineesData = localStorageHelpers.getNominees();
          
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
          return;
        }
        
        // Use Firebase with real-time updates
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
      if (database) {
        const categoriesRef = ref(database, 'categories');
        const nomineesRef = ref(database, 'nominees');
        off(categoriesRef);
        off(nomineesRef);
      }
    };
  }, []);

  const addNominee = async (categoryId: string, nominee: { name: string; photo?: string }) => {
    try {
      if (useLocalStorage || !database) {
        // Use localStorage
        const nominees = localStorageHelpers.getNominees();
        const id = `nominee_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        nominees[id] = {
          id,
          category_id: categoryId,
          name: nominee.name.trim(),
          photo: nominee.photo || undefined,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        localStorageHelpers.setNominees(nominees);
        
        // Trigger re-fetch
        window.location.reload();
        return true;
      }

      const nomineesRef = ref(database, 'nominees');
      const newNomineeRef = push(nomineesRef);
      
      await set(newNomineeRef, {
        id: newNomineeRef.key,
        category_id: categoryId,
        name: nominee.name.trim(),
        photo: nominee.photo || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
      
      return true;
    } catch (err) {
      console.error('Error adding nominee:', err);
      setError(err instanceof Error ? err.message : 'Failed to add nominee');
      return false;
    }
  };

  const removeNominee = async (categoryId: string, nomineeId: string) => {
    try {
      if (useLocalStorage || !database) {
        // Use localStorage
        const nominees = localStorageHelpers.getNominees();
        delete nominees[nomineeId];
        localStorageHelpers.setNominees(nominees);
        
        // Remove votes for this nominee
        const votes = localStorageHelpers.getVotes();
        Object.keys(votes).forEach(voteKey => {
          if (votes[voteKey].nominee_id === nomineeId) {
            delete votes[voteKey];
          }
        });
        localStorageHelpers.setVotes(votes);
        
        // Trigger re-fetch
        window.location.reload();
        return true;
      }

      const nomineeRef = ref(database, `nominees/${nomineeId}`);
      await remove(nomineeRef);
      
      // Also remove any votes for this nominee
      const votesRef = ref(database, 'votes');
      const votesSnapshot = await new Promise<any>((resolve) => {
        onValue(votesRef, resolve, { onlyOnce: true });
      });
      
      if (votesSnapshot.exists()) {
        const votesData = votesSnapshot.val();
        const votesToRemove = Object.keys(votesData).filter(key => 
          votesData[key].nominee_id === nomineeId
        );
        
        for (const voteKey of votesToRemove) {
          const voteRef = ref(database, `votes/${voteKey}`);
          await remove(voteRef);
        }
      }
      
      return true;
    } catch (err) {
      console.error('Error removing nominee:', err);
      setError(err instanceof Error ? err.message : 'Failed to remove nominee');
      return false;
    }
  };

  const updateNomineePhoto = async (nomineeId: string, photo: string) => {
    try {
      if (useLocalStorage || !database) {
        // Use localStorage
        const nominees = localStorageHelpers.getNominees();
        if (nominees[nomineeId]) {
          nominees[nomineeId].photo = photo || undefined;
          nominees[nomineeId].updated_at = new Date().toISOString();
          localStorageHelpers.setNominees(nominees);
          
          // Trigger re-fetch
          window.location.reload();
        }
        return true;
      }

      const nomineeRef = ref(database, `nominees/${nomineeId}`);
      await update(nomineeRef, { 
        photo: photo || null,
        updated_at: new Date().toISOString()
      });
      
      return true;
    } catch (err) {
      console.error('Error updating nominee photo:', err);
      setError(err instanceof Error ? err.message : 'Failed to update photo');
      return false;
    }
  };

  const updateCategory = async (categoryId: string, updates: Partial<Category>) => {
    try {
      if (useLocalStorage || !database) {
        // Use localStorage
        const categories = localStorageHelpers.getCategories();
        if (categories[categoryId]) {
          categories[categoryId] = {
            ...categories[categoryId],
            ...updates,
            updated_at: new Date().toISOString()
          };
          localStorageHelpers.setCategories(categories);
          
          // Trigger re-fetch
          window.location.reload();
        }
        return true;
      }

      const categoryRef = ref(database, `categories/${categoryId}`);
      await update(categoryRef, {
        ...updates,
        updated_at: new Date().toISOString()
      });
      
      return true;
    } catch (err) {
      console.error('Error updating category:', err);
      setError(err instanceof Error ? err.message : 'Failed to update category');
      return false;
    }
  };

  return {
    categories,
    loading,
    error,
    addNominee,
    removeNominee,
    updateNomineePhoto,
    updateCategory,
    refetch: () => {} // Not needed with real-time updates
  };
};