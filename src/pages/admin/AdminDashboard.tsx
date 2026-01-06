import { motion } from 'framer-motion';
import { DollarSign, ShoppingCart, Gamepad2, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdmin } from '@/context/AdminContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdminDashboard = () => {
  const { games, orders } = useAdmin();

  const totalRevenue = orders
    .filter((o) => o.status === 'completed')
    .reduce((sum, o) => sum + o.total, 0);

  const totalOrders = orders.length;
  const completedOrders = orders.filter((o) => o.status === 'completed').length;
  const pendingOrders = orders.filter((o) => o.status === 'pending').length;

  const stats = [
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-neon-green',
      bgColor: 'bg-neon-green/10',
    },
    {
      title: 'Total Orders',
      value: totalOrders.toString(),
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'text-neon-cyan',
      bgColor: 'bg-neon-cyan/10',
    },
    {
      title: 'Games Listed',
      value: games.length.toString(),
      change: '+3',
      trend: 'up',
      icon: Gamepad2,
      color: 'text-neon-magenta',
      bgColor: 'bg-neon-magenta/10',
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '-0.4%',
      trend: 'down',
      icon: TrendingUp,
      color: 'text-neon-purple',
      bgColor: 'bg-neon-purple/10',
    },
  ];

  const recentOrders = orders.slice(0, 5);

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-display font-bold text-3xl">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's what's happening with your store.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <div
                      className={`flex items-center gap-1 text-sm ${
                        stat.trend === 'up' ? 'text-neon-green' : 'text-destructive'
                      }`}
                    >
                      {stat.trend === 'up' ? (
                        <ArrowUpRight className="w-4 h-4" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4" />
                      )}
                      {stat.change}
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-2xl font-display font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-display">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                  >
                    <div>
                      <p className="font-medium">{order.customerName}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.items.length} item(s) • {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-display font-bold text-neon-cyan">
                        ${order.total.toFixed(2)}
                      </p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          order.status === 'completed'
                            ? 'bg-neon-green/20 text-neon-green'
                            : order.status === 'pending'
                            ? 'bg-yellow-500/20 text-yellow-500'
                            : 'bg-destructive/20 text-destructive'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-display">Order Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Completed</span>
                    <span className="text-sm font-medium">{completedOrders}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-neon-green rounded-full"
                      style={{ width: `${(completedOrders / totalOrders) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Pending</span>
                    <span className="text-sm font-medium">{pendingOrders}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-500 rounded-full"
                      style={{ width: `${(pendingOrders / totalOrders) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Refunded</span>
                    <span className="text-sm font-medium">
                      {orders.filter((o) => o.status === 'refunded').length}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-destructive rounded-full"
                      style={{
                        width: `${
                          (orders.filter((o) => o.status === 'refunded').length / totalOrders) * 100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-neon-cyan/10 to-neon-magenta/10 border border-border">
                <p className="text-sm text-muted-foreground mb-1">Top Selling Game</p>
                <p className="font-display font-bold">God of War Ragnarök</p>
                <p className="text-sm text-neon-cyan">$59.99 • 24 sales</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
