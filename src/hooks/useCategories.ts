import { useState, useEffect } from 'react';
import { supabase, Category, Nominee } from '../lib/supabase';

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

  const fetchCategories = async () => {
    try {
      setLoading(true);
      
      // Fetch categories with their nominees
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select(`
          *,
          nominees (
            id,
            name,
            photo
          )
        `)
        .order('created_at');

      if (categoriesError) throw categoriesError;

      const formattedCategories = categoriesData?.map(cat => ({
        ...cat,
        nominees: cat.nominees || []
      })) || [];

      setCategories(formattedCategories);
      setError(null);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();

    // Set up real-time subscriptions for instant updates
    const categoriesSubscription = supabase
      .channel('categories-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'categories' },
        (payload) => {
          console.log('Categories updated:', payload);
          fetchCategories();
        }
      )
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'nominees' },
        (payload) => {
          console.log('Nominees updated:', payload);
          fetchCategories();
        }
      )
      .subscribe();

    return () => {
      categoriesSubscription.unsubscribe();
    };
  }, []);

  const addNominee = async (categoryId: string, nominee: { name: string; photo?: string }) => {
    try {
      const { error } = await supabase
        .from('nominees')
        .insert({
          category_id: categoryId,
          name: nominee.name.trim(),
          photo: nominee.photo || null
        });

      if (error) throw error;
      
      // Real-time subscription will automatically update the UI
      return true;
    } catch (err) {
      console.error('Error adding nominee:', err);
      setError(err instanceof Error ? err.message : 'Failed to add nominee');
      return false;
    }
  };

  const removeNominee = async (categoryId: string, nomineeId: string) => {
    try {
      const { error } = await supabase
        .from('nominees')
        .delete()
        .eq('id', nomineeId);

      if (error) throw error;
      
      // Real-time subscription will automatically update the UI
      return true;
    } catch (err) {
      console.error('Error removing nominee:', err);
      setError(err instanceof Error ? err.message : 'Failed to remove nominee');
      return false;
    }
  };

  const updateNomineePhoto = async (nomineeId: string, photo: string) => {
    try {
      const { error } = await supabase
        .from('nominees')
        .update({ 
          photo: photo || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', nomineeId);

      if (error) throw error;
      
      // Real-time subscription will automatically update the UI
      return true;
    } catch (err) {
      console.error('Error updating nominee photo:', err);
      setError(err instanceof Error ? err.message : 'Failed to update photo');
      return false;
    }
  };

  const updateCategory = async (categoryId: string, updates: Partial<Category>) => {
    try {
      const { error } = await supabase
        .from('categories')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', categoryId);

      if (error) throw error;
      
      // Real-time subscription will automatically update the UI
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