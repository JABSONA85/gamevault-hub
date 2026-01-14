import React, { createContext, useContext } from 'react';
import { useAuth } from './AuthContext';
import { useGames, useAddGame, useUpdateGame, useDeleteGame, Game } from '@/hooks/useGames';
import { useOrders, useUpdateOrderStatus, Order } from '@/hooks/useOrders';

interface AdminContextType {
  isAdmin: boolean;
  isLoading: boolean;
  games: Game[];
  gamesLoading: boolean;
  addGame: (game: Omit<Game, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateGame: (id: string, updates: Partial<Game>) => Promise<void>;
  deleteGame: (id: string) => Promise<void>;
  orders: Order[];
  ordersLoading: boolean;
  updateOrderStatus: (id: string, status: Order['status']) => Promise<void>;
  logout: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdmin, isLoading: authLoading, signOut } = useAuth();
  const { data: games = [], isLoading: gamesLoading } = useGames();
  const { data: orders = [], isLoading: ordersLoading } = useOrders();
  
  const addGameMutation = useAddGame();
  const updateGameMutation = useUpdateGame();
  const deleteGameMutation = useDeleteGame();
  const updateOrderStatusMutation = useUpdateOrderStatus();

  const addGame = async (game: Omit<Game, 'id' | 'created_at' | 'updated_at'>) => {
    await addGameMutation.mutateAsync(game);
  };

  const updateGame = async (id: string, updates: Partial<Game>) => {
    await updateGameMutation.mutateAsync({ id, ...updates });
  };

  const deleteGame = async (id: string) => {
    await deleteGameMutation.mutateAsync(id);
  };

  const updateOrderStatus = async (id: string, status: Order['status']) => {
    await updateOrderStatusMutation.mutateAsync({ id, status });
  };

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        isLoading: authLoading,
        games,
        gamesLoading,
        addGame,
        updateGame,
        deleteGame,
        orders,
        ordersLoading,
        updateOrderStatus,
        logout: signOut,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
