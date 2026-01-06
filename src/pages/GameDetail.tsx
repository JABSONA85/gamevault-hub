import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Star, Calendar, Building2, Code2, Tag } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { getGameById, games } from '@/data/games';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import GameCard from '@/components/games/GameCard';

const GameDetail = () => {
  const { id } = useParams<{ id: string }>();
  const game = getGameById(id || '');
  const { addToCart } = useCart();

  if (!game) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-display font-bold text-3xl mb-4">Game Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The game you're looking for doesn't exist.
          </p>
          <Link to="/shop">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Shop
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    addToCart(game);
    toast.success(`${game.title} added to cart!`, {
      description: 'View your cart to checkout.',
    });
  };

  const getPlatformClass = (platform: string) => {
    if (platform.includes('PS5')) return 'platform-ps5';
    if (platform.includes('PS4')) return 'platform-ps4';
    return 'platform-xbox';
  };

  const relatedGames = games
    .filter((g) => g.id !== game.id && (g.genre === game.genre || g.platform === game.platform))
    .slice(0, 4);

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative min-h-[60vh] overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={game.coverImage}
            alt={game.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 py-12">
          {/* Back Button */}
          <Link
            to="/shop"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shop
          </Link>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Cover Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative aspect-[3/4] max-w-md mx-auto md:mx-0"
            >
              <img
                src={game.coverImage}
                alt={game.title}
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Platform Badge */}
              <span className={`platform-badge ${getPlatformClass(game.platform)}`}>
                {game.platform}
              </span>

              {/* Title */}
              <h1 className="font-display font-black text-4xl md:text-5xl leading-tight">
                {game.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(game.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold">{game.rating}</span>
                <span className="text-muted-foreground">/ 5.0</span>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {game.description}
              </p>

              {/* Meta Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Tag className="w-4 h-4 text-neon-cyan" />
                  <span className="text-muted-foreground">Genre:</span>
                  <span>{game.genre}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-neon-cyan" />
                  <span className="text-muted-foreground">Release:</span>
                  <span>{new Date(game.releaseDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="w-4 h-4 text-neon-cyan" />
                  <span className="text-muted-foreground">Publisher:</span>
                  <span>{game.publisher}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Code2 className="w-4 h-4 text-neon-cyan" />
                  <span className="text-muted-foreground">Developer:</span>
                  <span>{game.developer}</span>
                </div>
              </div>

              {/* Price & Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-display font-bold text-4xl text-neon-cyan">
                    ${game.price.toFixed(2)}
                  </span>
                  {game.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      ${game.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  className="bg-gradient-to-r from-neon-cyan to-neon-magenta hover:from-neon-cyan/90 hover:to-neon-magenta/90 text-background font-bold px-8"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
              </div>

              {/* Digital Delivery Notice */}
              <div className="p-4 rounded-xl bg-muted/50 border border-border">
                <p className="text-sm text-muted-foreground">
                  🎮 <span className="text-foreground font-medium">Digital Download</span> — 
                  You'll receive your game key instantly after purchase. Activate on your console and start playing!
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Related Games */}
      {relatedGames.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <h2 className="font-display font-bold text-2xl md:text-3xl mb-8">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedGames.map((game, index) => (
              <GameCard key={game.id} game={game} index={index} />
            ))}
          </div>
        </section>
      )}
    </Layout>
  );
};

export default GameDetail;
