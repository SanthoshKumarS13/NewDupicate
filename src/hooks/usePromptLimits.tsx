import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

type PromptCategory = 'image' | 'video' | 'music' | 'app';

export const usePromptLimits = () => {
  const { user, profile, refreshProfile } = useAuth();
  const [loading, setLoading] = useState(false);

  const checkAndDecrementLimit = async (category: PromptCategory): Promise<boolean> => {
    if (!user || !profile) {
      toast.error('Please sign in to generate prompts');
      return false;
    }

    setLoading(true);

    try {
      // Check current limit
      const currentCount = profile[`daily_${category}_count` as keyof typeof profile] as number;
      
      if (currentCount <= 0) {
        toast.error(`You've reached your daily limit for ${category} prompts. Please try again tomorrow.`);
        return false;
      }

      // Decrement the count using RPC function
      const { error } = await supabase.rpc('decrement_prompt_count', {
        category: category
      });

      if (error) {
        console.error('Error decrementing count:', error);
        toast.error('Failed to update prompt count');
        return false;
      }

      // Refresh the profile to get updated counts
      await refreshProfile();
      
      return true;
    } catch (error) {
      console.error('Error checking prompt limit:', error);
      toast.error('An error occurred while checking your prompt limit');
      return false;
    } finally {
      setLoading(false);
    }
  };

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