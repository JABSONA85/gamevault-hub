import React, { createContext, useContext, useState, useEffect } from 'react';
import { Game, games as initialGames } from '@/data/games';

interface Order {
  id: string;
  customerEmail: string;
  customerName: string;
  items: { gameId: string; gameTitle: string; price: number; quantity: number }[];
  total: number;
  status: 'pending' | 'completed' | 'refunded';
  createdAt: string;
}

interface AdminContextType {
  isAdmin: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  games: Game[];
  addGame: (game: Omit<Game, 'id'>) => void;
  updateGame: (id: string, game: Partial<Game>) => void;
  deleteGame: (id: string) => void;
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'createdAt'>) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Demo orders
const demoOrders: Order[] = [
  {
    id: 'ord-001',
    customerEmail: 'john.doe@email.com',
    customerName: 'John Doe',
    items: [{ gameId: 'god-of-war-ragnarok', gameTitle: 'God of War Ragnarök', price: 59.99, quantity: 1 }],
    total: 65.99,
    status: 'completed',
    createdAt: '2024-01-05T10:30:00Z',
  },
  {
    id: 'ord-002',
    customerEmail: 'jane.smith@email.com',
    customerName: 'Jane Smith',
    items: [
      { gameId: 'elden-ring', gameTitle: 'Elden Ring', price: 49.99, quantity: 1 },
      { gameId: 'spider-man-2', gameTitle: "Marvel's Spider-Man 2", price: 69.99, quantity: 1 },
    ],
    total: 131.98,
    status: 'completed',
    createdAt: '2024-01-04T14:22:00Z',
  },
  {
    id: 'ord-003',
    customerEmail: 'mike.wilson@email.com',
    customerName: 'Mike Wilson',
    items: [{ gameId: 'call-of-duty-mw3', gameTitle: 'Call of Duty: Modern Warfare III', price: 69.99, quantity: 1 }],
    total: 76.99,
    status: 'pending',
    createdAt: '2024-01-06T09:15:00Z',
  },
  {
    id: 'ord-004',
    customerEmail: 'sarah.jones@email.com',
    customerName: 'Sarah Jones',
    items: [{ gameId: 'fc-25', gameTitle: 'EA Sports FC 25', price: 59.99, quantity: 1 }],
    total: 65.99,
    status: 'completed',
    createdAt: '2024-01-03T16:45:00Z',
  },
  {
    id: 'ord-005',
    customerEmail: 'alex.brown@email.com',
    customerName: 'Alex Brown',
    items: [{ gameId: 'halo-infinite', gameTitle: 'Halo Infinite', price: 39.99, quantity: 1 }],
    total: 43.99,
    status: 'refunded',
    createdAt: '2024-01-02T11:00:00Z',
  },
];

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [games, setGames] = useState<Game[]>(initialGames);
  const [orders, setOrders] = useState<Order[]>(demoOrders);

  useEffect(() => {
    const adminSession = localStorage.getItem('gamevault-admin');
    if (adminSession === 'true') {
      setIsAdmin(true);
    }

    const savedGames = localStorage.getItem('gamevault-games');
    if (savedGames) {
      try {
        setGames(JSON.parse(savedGames));
      } catch (e) {
        console.error('Failed to load games');
      }
    }

    const savedOrders = localStorage.getItem('gamevault-orders');
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (e) {
        console.error('Failed to load orders');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('gamevault-games', JSON.stringify(games));
  }, [games]);

  useEffect(() => {
    localStorage.setItem('gamevault-orders', JSON.stringify(orders));
  }, [orders]);

  const login = (email: string, password: string): boolean => {
    // Demo admin credentials
    if (email === 'admin@gamevault.com' && password === 'admin123') {
      setIsAdmin(true);
      localStorage.setItem('gamevault-admin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('gamevault-admin');
  };

  const addGame = (game: Omit<Game, 'id'>) => {
    const newGame: Game = {
      ...game,
      id: `game-${Date.now()}`,
    };
    setGames((prev) => [...prev, newGame]);
  };

  const updateGame = (id: string, updates: Partial<Game>) => {
    setGames((prev) =>
      prev.map((game) => (game.id === id ? { ...game, ...updates } : game))
    );
  };

  const deleteGame = (id: string) => {
    setGames((prev) => prev.filter((game) => game.id !== id));
  };

  const addOrder = (order: Omit<Order, 'id' | 'createdAt'>) => {
    const newOrder: Order = {
      ...order,
      id: `ord-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [...prev, newOrder]);
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === id ? { ...order, status } : order))
    );
  };

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        login,
        logout,
        games,
        addGame,
        updateGame,
        deleteGame,
        orders,
        addOrder,
        updateOrderStatus,
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
