import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Gamepad2,
  ShoppingCart,
  BarChart3,
  LogOut,
  Home,
} from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import { Button } from '@/components/ui/button';

const navItems = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'Games', path: '/admin/games', icon: Gamepad2 },
  { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
  { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
];

const AdminSidebar = () => {
  const location = useLocation();
  const { logout } = useAdmin();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border flex flex-col z-50">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link to="/admin" className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-magenta">
            <Gamepad2 className="w-5 h-5 text-background" />
          </div>
          <div>
            <span className="font-display font-bold text-lg bg-gradient-to-r from-neon-cyan to-neon-magenta bg-clip-text text-transparent">
              GameVault
            </span>
            <p className="text-xs text-muted-foreground">Admin Panel</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}>
              <motion.div
                whileHover={{ x: 4 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-gradient-to-r from-neon-cyan/20 to-neon-magenta/20 text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-neon-cyan' : ''}`} />
                <span className="font-medium">{item.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 w-1 h-8 bg-gradient-to-b from-neon-cyan to-neon-magenta rounded-r"
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-border space-y-2">
        <Link to="/">
          <Button variant="ghost" className="w-full justify-start">
            <Home className="w-4 h-4 mr-2" />
            Back to Store
          </Button>
        </Link>
        <Button
          variant="ghost"
          onClick={logout}
          className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
