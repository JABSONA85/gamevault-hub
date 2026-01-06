import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft, CreditCard } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    email: '',
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const subtotal = cart.total;
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Order placed successfully!', {
      description: 'Check your email for download links.',
    });
    clearCart();
    navigate('/');
  };

  if (cart.items.length === 0 && !isCheckingOut) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            <h1 className="font-display font-bold text-3xl mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any games yet. Start exploring our collection!
            </p>
            <Link to="/shop">
              <Button size="lg" className="bg-gradient-to-r from-neon-cyan to-neon-magenta text-background">
                Browse Games
              </Button>
            </Link>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/shop"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>
        </div>

        <h1 className="font-display font-bold text-3xl md:text-4xl mb-8">
          {isCheckingOut ? 'Checkout' : 'Shopping Cart'}
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items / Checkout Form */}
          <div className="lg:col-span-2 space-y-4">
            {!isCheckingOut ? (
              <AnimatePresence>
                {cart.items.map((item) => (
                  <motion.div
                    key={item.game.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex gap-4 p-4 rounded-xl bg-card border border-border"
                  >
                    {/* Image */}
                    <Link to={`/game/${item.game.id}`} className="shrink-0">
                      <img
                        src={item.game.coverImage}
                        alt={item.game.title}
                        className="w-20 h-28 md:w-24 md:h-32 object-cover rounded-lg"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <Link to={`/game/${item.game.id}`}>
                        <h3 className="font-display font-semibold text-lg line-clamp-1 hover:text-neon-cyan transition-colors">
                          {item.game.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.game.platform} • {item.game.genre}
                      </p>

                      {/* Quantity & Price */}
                      <div className="flex flex-wrap items-center gap-4 mt-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.game.id, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.game.id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>

                        <div className="font-display font-bold text-xl text-neon-cyan">
                          ${(item.game.price * item.quantity).toFixed(2)}
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-auto text-muted-foreground hover:text-destructive"
                          onClick={() => removeFromCart(item.game.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            ) : (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleCheckout}
                className="space-y-6 p-6 rounded-xl bg-card border border-border"
              >
                <div className="space-y-4">
                  <h3 className="font-display font-semibold text-lg flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-neon-cyan" />
                    Payment Details
                  </h3>

                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={checkoutForm.email}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, email: e.target.value })}
                        required
                        className="bg-muted"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name">Name on Card</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={checkoutForm.name}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                        required
                        className="bg-muted"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="4242 4242 4242 4242"
                        value={checkoutForm.cardNumber}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, cardNumber: e.target.value })}
                        required
                        className="bg-muted"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          value={checkoutForm.expiry}
                          onChange={(e) => setCheckoutForm({ ...checkoutForm, expiry: e.target.value })}
                          required
                          className="bg-muted"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={checkoutForm.cvv}
                          onChange={(e) => setCheckoutForm({ ...checkoutForm, cvv: e.target.value })}
                          required
                          className="bg-muted"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsCheckingOut(false)}
                    className="flex-1"
                  >
                    Back to Cart
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-neon-cyan to-neon-magenta text-background"
                  >
                    Complete Purchase
                  </Button>
                </div>
              </motion.form>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 rounded-xl bg-card border border-border space-y-4">
              <h3 className="font-display font-semibold text-lg">Order Summary</h3>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between font-display font-bold text-xl">
                <span>Total</span>
                <span className="text-neon-cyan">${total.toFixed(2)}</span>
              </div>

              {!isCheckingOut && (
                <Button
                  size="lg"
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full bg-gradient-to-r from-neon-cyan to-neon-magenta text-background font-bold"
                >
                  Proceed to Checkout
                </Button>
              )}

              <p className="text-xs text-center text-muted-foreground">
                Secure checkout powered by Stripe
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
