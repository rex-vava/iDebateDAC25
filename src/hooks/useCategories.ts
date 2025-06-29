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
      setError(null);
      
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

      if (categoriesError) {
        console.error('Supabase query error:', categoriesError);
        throw new Error(`Database error: ${categoriesError.message}`);
      }

      const formattedCategories = categoriesData?.map(cat => ({
        ...cat,
        nominees: cat.nominees || []
      })) || [];

      setCategories(formattedCategories);
    } catch (err) {
      console.error('Error fetching categories:', err);
      
      let errorMessage = 'Failed to fetch categories';
      
      if (err instanceof Error) {
        if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
          errorMessage = 'Unable to connect to database. Please check your Supabase configuration and ensure your project is set up correctly.';
        } else if (err.message.includes('Supabase is not properly configured')) {
          errorMessage = err.message;
        } else {
          errorMessage = err.message;
        }
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();

    // Only set up subscriptions if we successfully connected
    let categoriesSubscription: any = null;
    
    if (!error) {
      categoriesSubscription = supabase
        .channel('categories-changes')
        .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'categories' },
          () => fetchCategories()
        )
        .on('postgres_changes',
          { event: '*', schema: 'public', table: 'nominees' },
          () => fetchCategories()
        )
        .subscribe();
    }

    return () => {
      if (categoriesSubscription) {
        categoriesSubscription.unsubscribe();
      }
    };
  }, [error]);

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
      
      // Refresh categories to get updated data
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
      const { error } = await supabase
        .from('nominees')
        .delete()
        .eq('id', nomineeId);

      if (error) throw error;
      
      // Refresh categories to get updated data
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
      const { error } = await supabase
        .from('nominees')
        .update({ 
          photo: photo || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', nomineeId);

      if (error) throw error;
      
      // Refresh categories to get updated data
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
      const { error } = await supabase
        .from('categories')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', categoryId);

      if (error) throw error;
      
      // Refresh categories to get updated data
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