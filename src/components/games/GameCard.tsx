import { motion } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Game } from '@/data/games';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import WishlistButton from './WishlistButton';
import { toast } from 'sonner';

interface GameCardProps {
  game: Game;
  index?: number;
}

const GameCard = ({ game, index = 0 }: GameCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="game-card group"
    >
      <Link to={`/game/${game.id}`}>
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={game.coverImage}
            alt={game.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60" />
          
          {/* Platform Badge */}
          <span className={`platform-badge absolute top-3 left-3 ${getPlatformClass(game.platform)}`}>
            {game.platform}
          </span>

          {/* Wishlist Button */}
          <div className="absolute top-3 right-3 z-10">
            {game.originalPrice ? (
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 text-xs font-bold bg-destructive text-destructive-foreground rounded">
                  -{Math.round((1 - game.price / game.originalPrice) * 100)}%
                </span>
                <WishlistButton 
                  gameId={game.id} 
                  gameTitle={game.title}
                  className="bg-background/80 backdrop-blur-sm hover:bg-background"
                />
              </div>
            ) : (
              <WishlistButton 
                gameId={game.id} 
                gameTitle={game.title}
                className="bg-background/80 backdrop-blur-sm hover:bg-background"
              />
            )}
          </div>

          {/* Quick Add Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <Button
              onClick={handleAddToCart}
              className="w-full bg-gradient-to-r from-neon-cyan to-neon-magenta hover:from-neon-cyan/90 hover:to-neon-magenta/90 text-background font-semibold"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          {/* Genre */}
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            {game.genre}
          </span>

          {/* Title */}
          <h3 className="font-display font-semibold text-lg leading-tight line-clamp-2 group-hover:text-neon-cyan transition-colors">
            {game.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{game.rating}</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 pt-2">
            <span className="font-display font-bold text-xl text-neon-cyan">
              ${game.price.toFixed(2)}
            </span>
            {game.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${game.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default GameCard;
