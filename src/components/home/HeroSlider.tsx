import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Game } from '@/data/games';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

interface HeroSliderProps {
  games: Game[];
}

const HeroSlider = ({ games }: HeroSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % games.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [games.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + games.length) % games.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % games.length);
  };

  const handleAddToCart = () => {
    addToCart(games[currentIndex]);
    toast.success(`${games[currentIndex].title} added to cart!`);
  };

  const currentGame = games[currentIndex];

  return (
    <div className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      {/* Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <img
            src={currentGame.coverImage}
            alt={currentGame.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Animated particles/grid effect */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, hsl(180 100% 50% / 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 50%, hsl(300 100% 50% / 0.1) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            {/* Platform Badge */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`inline-block px-3 py-1.5 text-sm font-bold uppercase tracking-wider rounded mb-4 ${
                currentGame.platform.includes('PS') 
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600' 
                  : 'bg-gradient-to-r from-green-500 to-emerald-600'
              }`}
            >
              {currentGame.platform}
            </motion.span>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display font-black text-4xl md:text-5xl lg:text-6xl leading-tight mb-4"
            >
              {currentGame.title}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted-foreground mb-6 line-clamp-3"
            >
              {currentGame.shortDescription}
            </motion.p>

            {/* Price & Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center gap-4"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-display font-bold text-3xl md:text-4xl text-neon-cyan">
                  ${currentGame.price.toFixed(2)}
                </span>
                {currentGame.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${currentGame.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <div className="flex gap-3">
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  className="bg-gradient-to-r from-neon-cyan to-neon-magenta hover:from-neon-cyan/90 hover:to-neon-magenta/90 text-background font-bold px-8"
                >
                  Add to Cart
                </Button>
                <Link to={`/game/${currentGame.id}`}>
                  <Button size="lg" variant="outline" className="border-border hover:border-neon-cyan">
                    Learn More
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-1/2 translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
        <Button
          variant="ghost"
          size="icon"
          onClick={goToPrevious}
          className="pointer-events-auto w-12 h-12 rounded-full bg-background/50 backdrop-blur-sm border border-border hover:border-neon-cyan hover:bg-background/80"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={goToNext}
          className="pointer-events-auto w-12 h-12 rounded-full bg-background/50 backdrop-blur-sm border border-border hover:border-neon-cyan hover:bg-background/80"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {games.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'w-8 bg-gradient-to-r from-neon-cyan to-neon-magenta' 
                : 'bg-muted-foreground/50 hover:bg-muted-foreground'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
