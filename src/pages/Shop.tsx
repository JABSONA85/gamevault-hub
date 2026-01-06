import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, X, SlidersHorizontal } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import GameCard from '@/components/games/GameCard';
import { games, platforms, genres, Platform, Genre } from '@/data/games';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Get initial values from URL
  const initialPlatform = searchParams.get('platform');
  const initialSearch = searchParams.get('search') || '';

  const [search, setSearch] = useState(initialSearch);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(
    initialPlatform ? [initialPlatform as Platform] : []
  );
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const [priceRange, setPriceRange] = useState([0, 100]);

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      // Search filter
      if (search && !game.title.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }

      // Platform filter
      if (selectedPlatforms.length > 0 && !selectedPlatforms.includes(game.platform)) {
        return false;
      }

      // Genre filter
      if (selectedGenres.length > 0 && !selectedGenres.includes(game.genre)) {
        return false;
      }

      // Price filter
      if (game.price < priceRange[0] || game.price > priceRange[1]) {
        return false;
      }

      return true;
    });
  }, [search, selectedPlatforms, selectedGenres, priceRange]);

  const togglePlatform = (platform: Platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const toggleGenre = (genre: Genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    );
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedPlatforms([]);
    setSelectedGenres([]);
    setPriceRange([0, 100]);
    setSearchParams({});
  };

  const hasActiveFilters =
    search || selectedPlatforms.length > 0 || selectedGenres.length > 0 || priceRange[0] > 0 || priceRange[1] < 100;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div className="space-y-2">
        <Label>Search</Label>
        <Input
          placeholder="Search games..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-muted"
        />
      </div>

      {/* Platform */}
      <div className="space-y-3">
        <Label>Platform</Label>
        <div className="space-y-2">
          {platforms.map((platform) => (
            <div key={platform} className="flex items-center space-x-2">
              <Checkbox
                id={`platform-${platform}`}
                checked={selectedPlatforms.includes(platform)}
                onCheckedChange={() => togglePlatform(platform)}
              />
              <label
                htmlFor={`platform-${platform}`}
                className="text-sm cursor-pointer"
              >
                {platform}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Genre */}
      <div className="space-y-3">
        <Label>Genre</Label>
        <div className="space-y-2">
          {genres.map((genre) => (
            <div key={genre} className="flex items-center space-x-2">
              <Checkbox
                id={`genre-${genre}`}
                checked={selectedGenres.includes(genre)}
                onCheckedChange={() => toggleGenre(genre)}
              />
              <label
                htmlFor={`genre-${genre}`}
                className="text-sm cursor-pointer"
              >
                {genre}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <Label>Price Range: ${priceRange[0]} - ${priceRange[1]}</Label>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          min={0}
          max={100}
          step={5}
          className="py-4"
        />
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          onClick={clearFilters}
          className="w-full"
        >
          <X className="w-4 h-4 mr-2" />
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display font-bold text-3xl md:text-4xl">
              Game <span className="text-neon-cyan">Store</span>
            </h1>
            <p className="text-muted-foreground mt-1">
              {filteredGames.length} games available
            </p>
          </div>

          {/* Mobile Filter Button */}
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
                {hasActiveFilters && (
                  <span className="ml-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    !
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetHeader>
                <SheetTitle className="font-display">Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterContent />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-neon-cyan" />
                <h2 className="font-display font-semibold text-lg">Filters</h2>
              </div>
              <FilterContent />
            </div>
          </aside>

          {/* Game Grid */}
          <div className="flex-1">
            {filteredGames.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {filteredGames.map((game, index) => (
                  <GameCard key={game.id} game={game} index={index} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                  <Filter className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="font-display font-semibold text-xl mb-2">
                  No games found
                </h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters to find what you're looking for.
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Clear All Filters
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
