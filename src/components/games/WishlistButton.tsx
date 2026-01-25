import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useWishlist, useToggleWishlist } from '@/hooks/useWishlist';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface WishlistButtonProps {
  gameId: string;
  gameTitle: string;
  variant?: 'icon' | 'full';
  className?: string;
}

const WishlistButton = ({ gameId, gameTitle, variant = 'icon', className }: WishlistButtonProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: wishlist } = useWishlist();
  const { toggle, isLoading } = useToggleWishlist();

  const isInWishlist = wishlist?.some(item => item.game_id === gameId) ?? false;

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error('Please sign in to add to wishlist');
      navigate('/auth');
      return;
    }

    try {
      const added = await toggle(gameId);
      if (added) {
        toast.success(`${gameTitle} added to wishlist`);
      } else {
        toast.success(`${gameTitle} removed from wishlist`);
      }
    } catch (error) {
      toast.error('Failed to update wishlist');
    }
  };

  if (variant === 'full') {
    return (
      <Button
        variant={isInWishlist ? 'secondary' : 'outline'}
        onClick={handleClick}
        disabled={isLoading}
        className={cn('gap-2', className)}
      >
        <Heart
          className={cn('w-4 h-4', isInWishlist && 'fill-current text-red-500')}
        />
        {isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      disabled={isLoading}
      className={cn(
        'rounded-full hover:bg-muted/80',
        isInWishlist && 'text-red-500',
        className
      )}
    >
      <Heart
        className={cn(
          'w-5 h-5 transition-all',
          isInWishlist && 'fill-current'
        )}
      />
    </Button>
  );
};

export default WishlistButton;
