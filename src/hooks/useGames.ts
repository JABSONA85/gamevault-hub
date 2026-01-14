import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Game {
  id: string;
  title: string;
  description: string;
  price: number;
  original_price: number | null;
  image: string;
  platform: string;
  genre: string;
  release_date: string | null;
  publisher: string | null;
  developer: string | null;
  rating: number | null;
  is_featured: boolean | null;
  is_new: boolean | null;
  is_on_sale: boolean | null;
  download_url: string | null;
  created_at: string;
  updated_at: string;
}

export const useGames = () => {
  return useQuery({
    queryKey: ['games'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Game[];
    },
  });
};

export const useGame = (id: string | undefined) => {
  return useQuery({
    queryKey: ['game', id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      
      if (error) throw error;
      return data as Game | null;
    },
    enabled: !!id,
  });
};

export const useFeaturedGames = () => {
  return useQuery({
    queryKey: ['featured-games'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .eq('is_featured', true)
        .order('rating', { ascending: false });
      
      if (error) throw error;
      return data as Game[];
    },
  });
};

export const useNewReleases = () => {
  return useQuery({
    queryKey: ['new-releases'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .eq('is_new', true)
        .order('release_date', { ascending: false });
      
      if (error) throw error;
      return data as Game[];
    },
  });
};

export const useOnSaleGames = () => {
  return useQuery({
    queryKey: ['on-sale-games'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .eq('is_on_sale', true)
        .order('rating', { ascending: false });
      
      if (error) throw error;
      return data as Game[];
    },
  });
};

export const useAddGame = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (game: Omit<Game, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('games')
        .insert(game)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['games'] });
    },
  });
};

export const useUpdateGame = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Game> & { id: string }) => {
      const { data, error } = await supabase
        .from('games')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['games'] });
    },
  });
};

export const useDeleteGame = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('games')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['games'] });
    },
  });
};
