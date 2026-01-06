import { Game } from '@/data/games';
import GameCard from './GameCard';

interface GameGridProps {
  games: Game[];
  title?: string;
  subtitle?: string;
}

const GameGrid = ({ games, title, subtitle }: GameGridProps) => {
  return (
    <section className="py-12">
      {(title || subtitle) && (
        <div className="mb-8">
          {title && (
            <h2 className="font-display font-bold text-2xl md:text-3xl lg:text-4xl">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-2 text-muted-foreground">{subtitle}</p>
          )}
        </div>
      )}
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {games.map((game, index) => (
          <GameCard key={game.id} game={game} index={index} />
        ))}
      </div>
    </section>
  );
};

export default GameGrid;
