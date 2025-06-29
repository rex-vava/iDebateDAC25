import { useState, useEffect } from 'react';
import { 
  Category, 
  Nominee, 
  CategoryWithNominees, 
  initializeLocalData, 
  getFromStorage, 
  setToStorage, 
  STORAGE_KEYS 
} from '../data/localData';

export { type CategoryWithNominees };

export const useCategories = () => {
  const [categories, setCategories] = useState<CategoryWithNominees[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Initialize local storage if needed
      initializeLocalData();
      
      // Get categories and nominees from local storage
      const categoriesData: Category[] = getFromStorage(STORAGE_KEYS.CATEGORIES, []);
      const nomineesData: Nominee[] = getFromStorage(STORAGE_KEYS.NOMINEES, []);
      
      // Combine categories with their nominees
      const formattedCategories: CategoryWithNominees[] = categoriesData.map(category => ({
        ...category,
        is_award: category.isAward, // Map for compatibility
        nominees: nomineesData.filter(nominee => nominee.categoryId === category.id)
      }));

      setCategories(formattedCategories);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addNominee = async (categoryId: string, nominee: { name: string; photo?: string }) => {
    try {
      const nominees: Nominee[] = getFromStorage(STORAGE_KEYS.NOMINEES, []);
      
      const newNominee: Nominee = {
        id: `nominee_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        categoryId,
        name: nominee.name.trim(),
        photo: nominee.photo,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      const updatedNominees = [...nominees, newNominee];
      setToStorage(STORAGE_KEYS.NOMINEES, updatedNominees);
      
      // Refresh categories
      await fetchCategories();
      return true;
    } catch (err) {
      console.error('Error adding nominee:', err);
      setError(err instanceof Error ? err.message : 'Failed to add nominee');
      return false;
    }
  };

  const removeNominee = async (categoryId: string, nomineeId: string) => {
    try {
      const nominees: Nominee[] = getFromStorage(STORAGE_KEYS.NOMINEES, []);
      const updatedNominees = nominees.filter(nominee => nominee.id !== nomineeId);
      setToStorage(STORAGE_KEYS.NOMINEES, updatedNominees);
      
      // Also remove any votes for this nominee
      const votes = getFromStorage(STORAGE_KEYS.VOTES, []);
      const updatedVotes = votes.filter((vote: any) => vote.nomineeId !== nomineeId);
      setToStorage(STORAGE_KEYS.VOTES, updatedVotes);
      
      // Refresh categories
      await fetchCategories();
      return true;
    } catch (err) {
      console.error('Error removing nominee:', err);
      setError(err instanceof Error ? err.message : 'Failed to remove nominee');
      return false;
    }
  };

  const updateNomineePhoto = async (nomineeId: string, photo: string) => {
    try {
      const nominees: Nominee[] = getFromStorage(STORAGE_KEYS.NOMINEES, []);
      const updatedNominees = nominees.map(nominee => 
        nominee.id === nomineeId 
          ? { ...nominee, photo: photo || undefined, updatedAt: new Date().toISOString() }
          : nominee
      );
      setToStorage(STORAGE_KEYS.NOMINEES, updatedNominees);
      
      // Refresh categories
      await fetchCategories();
      return true;
    } catch (err) {
      console.error('Error updating nominee photo:', err);
      setError(err instanceof Error ? err.message : 'Failed to update photo');
      return false;
    }
  };

  const updateCategory = async (categoryId: string, updates: Partial<Category>) => {
    try {
      const categories: Category[] = getFromStorage(STORAGE_KEYS.CATEGORIES, []);
      const updatedCategories = categories.map(category => 
        category.id === categoryId 
          ? { ...category, ...updates, updatedAt: new Date().toISOString() }
          : category
      );
      setToStorage(STORAGE_KEYS.CATEGORIES, updatedCategories);
      
      // Refresh categories
      await fetchCategories();
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
    refetch: fetchCategories
  };
};