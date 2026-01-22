import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Download, 
  Package, 
  User, 
  Settings, 
  Clock, 
  Gamepad2,
  ExternalLink,
  Check,
  X,
  Loader2
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/AuthContext';
import { useUserOrders } from '@/hooks/useOrders';
import { useGames, Game } from '@/hooks/useGames';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { format } from 'date-fns';

const MyVault = () => {
  const navigate = useNavigate();
  const { user, profile, isLoading: authLoading, signOut } = useAuth();
  const { data: orders, isLoading: ordersLoading } = useUserOrders(user?.id);
  const { data: games } = useGames();
  
  const [profileForm, setProfileForm] = useState({
    username: profile?.username || '',
    email: profile?.email || '',
  });
  const [isUpdating, setIsUpdating] = useState(false);

  // Redirect if not authenticated
  if (!authLoading && !user) {
    navigate('/auth');
    return null;
  }

  if (authLoading) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-neon-cyan" />
        </div>
      </Layout>
    );
  }

  // Get completed orders for purchased games
  const completedOrders = orders?.filter(order => order.status === 'completed') || [];
  const purchasedGameIds = completedOrders.flatMap(order => 
    order.items.map(item => item.gameId)
  );
  const purchasedGames = games?.filter(game => purchasedGameIds.includes(game.id)) || [];

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          username: profileForm.username,
          email: profileForm.email 
        })
        .eq('user_id', user.id);
      
      if (error) throw error;
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error('Failed to update profile', { description: error.message });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    toast.success('Signed out successfully');
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: React.ReactNode }> = {
      completed: { variant: 'default', icon: <Check className="w-3 h-3" /> },
      pending: { variant: 'secondary', icon: <Clock className="w-3 h-3" /> },
      cancelled: { variant: 'destructive', icon: <X className="w-3 h-3" /> },
      refunded: { variant: 'outline', icon: <X className="w-3 h-3" /> },
    };
    const config = variants[status] || variants.pending;
    return (
      <Badge variant={config.variant} className="gap-1">
        {config.icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-cyan to-neon-magenta flex items-center justify-center">
              <Gamepad2 className="w-8 h-8 text-background" />
            </div>
            <div>
              <h1 className="font-display font-bold text-3xl">My Vault</h1>
              <p className="text-muted-foreground">
                Welcome back, {profile?.username || user?.email?.split('@')[0]}!
              </p>
            </div>
          </div>
        </motion.div>

        {/* Main Tabs */}
        <Tabs defaultValue="games" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="games" className="gap-2">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">My Games</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="gap-2">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* My Games Tab */}
          <TabsContent value="games">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Purchased Games</CardTitle>
                  <CardDescription>
                    Access your game library and download your purchases
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {purchasedGames.length === 0 ? (
                    <div className="text-center py-12">
                      <Gamepad2 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                      <h3 className="font-semibold text-lg mb-2">No games yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Start building your collection by purchasing games from our shop.
                      </p>
                      <Button 
                        onClick={() => navigate('/shop')}
                        className="bg-gradient-to-r from-neon-cyan to-neon-magenta text-background"
                      >
                        Browse Games
                      </Button>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {purchasedGames.map((game) => (
                        <GameCard key={game.id} game={game} />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>
                    View all your past purchases and order status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {ordersLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin text-neon-cyan" />
                    </div>
                  ) : orders?.length === 0 ? (
                    <div className="text-center py-12">
                      <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                      <h3 className="font-semibold text-lg mb-2">No orders yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Your order history will appear here after your first purchase.
                      </p>
                      <Button 
                        onClick={() => navigate('/shop')}
                        className="bg-gradient-to-r from-neon-cyan to-neon-magenta text-background"
                      >
                        Start Shopping
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders?.map((order) => (
                        <div
                          key={order.id}
                          className="p-4 rounded-lg border bg-muted/50"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                            <div>
                              <p className="font-mono text-sm text-muted-foreground">
                                Order #{order.id.slice(0, 8)}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {format(new Date(order.created_at), 'PPP')}
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              {getStatusBadge(order.status)}
                              <span className="font-bold text-neon-cyan">
                                ${order.total.toFixed(2)}
                              </span>
                            </div>
                          </div>
                          <Separator className="my-3" />
                          <div className="space-y-2">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span>{item.gameTitle} x{item.quantity}</span>
                                <span className="text-muted-foreground">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>
                    Manage your account information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-4 max-w-md">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={profileForm.username}
                        onChange={(e) => setProfileForm({ ...profileForm, username: e.target.value })}
                        placeholder="Your username"
                        className="bg-muted"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                        placeholder="your@email.com"
                        className="bg-muted"
                        disabled
                      />
                      <p className="text-xs text-muted-foreground">
                        Email cannot be changed from here
                      </p>
                    </div>
                    <Button 
                      type="submit" 
                      disabled={isUpdating}
                      className="bg-gradient-to-r from-neon-cyan to-neon-magenta text-background"
                    >
                      {isUpdating ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        'Save Changes'
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account preferences and security
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Account Information</h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="text-muted-foreground">Email:</span>{' '}
                        {user?.email}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Account ID:</span>{' '}
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          {user?.id.slice(0, 12)}...
                        </code>
                      </p>
                      <p>
                        <span className="text-muted-foreground">Member since:</span>{' '}
                        {user?.created_at && format(new Date(user.created_at), 'PPP')}
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-semibold mb-2">Sign Out</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Sign out of your account on this device
                    </p>
                    <Button 
                      variant="destructive" 
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

// Game card component for purchased games
const GameCard = ({ game }: { game: Game }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg border bg-muted/50">
      <img
        src={game.image}
        alt={game.title}
        className="w-full sm:w-32 h-24 object-cover rounded-lg"
      />
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold">{game.title}</h3>
            <p className="text-sm text-muted-foreground">{game.genre} • {game.platform}</p>
          </div>
          {game.download_url ? (
            <Button 
              size="sm" 
              asChild
              className="bg-gradient-to-r from-neon-cyan to-neon-magenta text-background"
            >
              <a href={game.download_url} target="_blank" rel="noopener noreferrer">
                <Download className="w-4 h-4 mr-2" />
                Download
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </Button>
          ) : (
            <Badge variant="secondary">Coming Soon</Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyVault;
