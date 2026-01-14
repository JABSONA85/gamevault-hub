import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, ShoppingCart, Gamepad2, Star } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdmin } from '@/context/AdminContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const AdminAnalytics = () => {
  const { games, gamesLoading, orders, ordersLoading } = useAdmin();

  // Revenue data (mock)
  const revenueData = [
    { name: 'Mon', revenue: 420, orders: 8 },
    { name: 'Tue', revenue: 380, orders: 6 },
    { name: 'Wed', revenue: 520, orders: 10 },
    { name: 'Thu', revenue: 450, orders: 9 },
    { name: 'Fri', revenue: 680, orders: 14 },
    { name: 'Sat', revenue: 890, orders: 18 },
    { name: 'Sun', revenue: 720, orders: 15 },
  ];

  // Platform distribution
  const platformData = [
    { name: 'PS5', value: games.filter((g) => g.platform === 'PS5').length, color: '#6366f1' },
    { name: 'PS4', value: games.filter((g) => g.platform === 'PS4').length, color: '#3b82f6' },
    { name: 'Xbox Series', value: games.filter((g) => g.platform === 'Xbox Series X/S').length, color: '#22c55e' },
    { name: 'Xbox One', value: games.filter((g) => g.platform === 'Xbox One').length, color: '#16a34a' },
  ];

  // Genre distribution
  const genreData = games.reduce((acc, game) => {
    const existing = acc.find((item) => item.genre === game.genre);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ genre: game.genre, count: 1 });
    }
    return acc;
  }, [] as { genre: string; count: number }[]);

  // Top games by simulated sales
  const topGames = games
    .slice(0, 5)
    .map((game, index) => ({
      ...game,
      sales: Math.floor(Math.random() * 50) + 10 - index * 5,
      revenue: (Math.floor(Math.random() * 50) + 10 - index * 5) * game.price,
    }));

  const totalRevenue = orders
    .filter((o) => o.status === 'completed')
    .reduce((sum, o) => sum + o.total, 0);

  const avgRating = games.length > 0 
    ? games.reduce((sum, g) => sum + (g.rating || 0), 0) / games.length 
    : 0;

  if (gamesLoading || ordersLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin w-8 h-8 border-2 border-neon-cyan border-t-transparent rounded-full" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-display font-bold text-3xl">Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Track your store performance and insights
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Total Revenue', value: `$${totalRevenue.toFixed(2)}`, icon: DollarSign, color: 'text-neon-green' },
            { title: 'Total Orders', value: orders.length, icon: ShoppingCart, color: 'text-neon-cyan' },
            { title: 'Total Games', value: games.length, icon: Gamepad2, color: 'text-neon-magenta' },
            { title: 'Avg Rating', value: avgRating.toFixed(1), icon: Star, color: 'text-yellow-400' },
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    <TrendingUp className="w-4 h-4 text-neon-green" />
                  </div>
                  <p className="mt-4 text-2xl font-display font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-display">Revenue This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00ffff" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#00ffff" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1a1a1a',
                        border: '1px solid #333',
                        borderRadius: '8px',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#00ffff"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Platform Distribution */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-display">Games by Platform</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={platformData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {platformData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1a1a1a',
                        border: '1px solid #333',
                        borderRadius: '8px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {platformData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm">{item.name}: {item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Genre Bar Chart */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display">Games by Genre</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={genreData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="genre" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a1a1a',
                      border: '1px solid #333',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="count" fill="#ff00ff" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Games */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display">Top Selling Games</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topGames.map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-lg bg-muted/50"
                >
                  <span className="font-display font-bold text-2xl text-muted-foreground w-8">
                    #{index + 1}
                  </span>
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-12 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{game.title}</p>
                    <p className="text-sm text-muted-foreground">{game.platform}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display font-bold text-neon-cyan">
                      ${game.revenue.toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground">{game.sales} sales</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminAnalytics;
