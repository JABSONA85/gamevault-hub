import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Json } from '@/integrations/supabase/types';

export interface OrderItem {
  gameId: string;
  gameTitle: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  user_id: string | null;
  customer_name: string;
  customer_email: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled' | 'refunded';
  created_at: string;
  updated_at: string;
}

interface RawOrder {
  id: string;
  user_id: string | null;
  customer_name: string;
  customer_email: string;
  items: Json;
  total: number;
  status: 'pending' | 'completed' | 'cancelled' | 'refunded';
  created_at: string;
  updated_at: string;
}

const transformOrder = (raw: RawOrder): Order => ({
  ...raw,
  items: (raw.items as unknown) as OrderItem[],
});

export const useOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return (data as RawOrder[]).map(transformOrder);
    },
  });
};

export const useUserOrders = (userId: string | undefined) => {
  return useQuery({
    queryKey: ['user-orders', userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return (data as RawOrder[]).map(transformOrder);
    },
    enabled: !!userId,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (order: {
      user_id: string;
      customer_name: string;
      customer_email: string;
      items: OrderItem[];
      total: number;
    }) => {
      const { data, error } = await supabase
        .from('orders')
        .insert({
          ...order,
          items: order.items as unknown as Json,
        })
        .select()
        .single();
      
      if (error) throw error;
      return transformOrder(data as RawOrder);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['user-orders'] });
    },
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: Order['status'] }) => {
      const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return transformOrder(data as RawOrder);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};
