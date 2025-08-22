import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

type PromptCategory = 'image' | 'video' | 'music' | 'app';

// This hook manages checking and decrementing user's daily prompt limits.
export const usePromptLimits = () => {
  const { user, profile, refreshProfile } = useAuth();
  const [loading, setLoading] = useState(false);

  const checkAndDecrementLimit = async (category: PromptCategory): Promise<boolean> => {
    // First, ensure the user is authenticated.
    if (!user || !profile) {
      toast.error('You must be signed in to generate prompts.');
      return false;
    }

    setLoading(true);

    try {
      // Check the user's current limit for the given category.
      const currentCount = profile[`daily_${category}_count` as keyof typeof profile] as number;
      
      if (currentCount <= 0) {
        toast.error(`You have reached your daily limit for ${category} prompts. Please try again tomorrow.`);
        return false;
      }

      // If limits are okay, call the Supabase RPC function to decrement the count on the backend.
      const { error } = await supabase.rpc('decrement_prompt_count', {
        category: category
      });

      if (error) {
        console.error('Error decrementing prompt count:', error);
        toast.error('There was an issue updating your prompt count.');
        return false;
      }

      // After successfully decrementing, refresh the local profile data.
      await refreshProfile();
      
      toast.success('Prompt generated successfully!');
      return true;

    } catch (error) {
      console.error('An error occurred in checkAndDecrementLimit:', error);
      toast.error('An unexpected error occurred while checking your limits.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Function to get the remaining count for display purposes.
  const getRemainingCount = (category: PromptCategory): number => {
    if (!profile) return 0;
    return profile[`daily_${category}_count` as keyof typeof profile] as number;
  };

  return {
    checkAndDecrementLimit,
    getRemainingCount,
    loading,
    isAuthenticated: !!user,
    profile
  };
};