import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

export interface WishlistItem {
  id: string;
  user_id: string;
  game_id: string;
  created_at: string;
}

export const useWishlist = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['wishlist', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('wishlists')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as WishlistItem[];
    },
    enabled: !!user,
  });
};

export const useWishlistWithGames = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['wishlist-with-games', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('wishlists')
        .select(`
          id,
          created_at,
          games (
            id,
            title,
            price,
            original_price,
            image,
            genre,
            platform,
            is_on_sale
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
};

export const useIsInWishlist = (gameId: string) => {
  const { data: wishlist } = useWishlist();
  return wishlist?.some(item => item.game_id === gameId) ?? false;
};

export const useAddToWishlist = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (gameId: string) => {
      if (!user) throw new Error('Must be logged in');
      
      const { data, error } = await supabase
        .from('wishlists')
        .insert({ user_id: user.id, game_id: gameId })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      queryClient.invalidateQueries({ queryKey: ['wishlist-with-games'] });
    },
  });
};

export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (gameId: string) => {
      if (!user) throw new Error('Must be logged in');
      
      const { error } = await supabase
        .from('wishlists')
        .delete()
        .eq('user_id', user.id)
        .eq('game_id', gameId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      queryClient.invalidateQueries({ queryKey: ['wishlist-with-games'] });
    },
  });
};

export const useToggleWishlist = () => {
  const addToWishlist = useAddToWishlist();
  const removeFromWishlist = useRemoveFromWishlist();
  const { data: wishlist } = useWishlist();

  const toggle = async (gameId: string) => {
    const isInWishlist = wishlist?.some(item => item.game_id === gameId);
    
    if (isInWishlist) {
      await removeFromWishlist.mutateAsync(gameId);
      return false;
    } else {
      await addToWishlist.mutateAsync(gameId);
      return true;
    }
  };

  return {
    toggle,
    isLoading: addToWishlist.isPending || removeFromWishlist.isPending,
  };
};
