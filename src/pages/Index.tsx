import Layout from '@/components/layout/Layout';
import HeroSlider from '@/components/home/HeroSlider';
import CategorySection from '@/components/home/CategorySection';
import FeaturesSection from '@/components/home/FeaturesSection';
import GameGrid from '@/components/games/GameGrid';
import { getFeaturedGames, getBestsellers, getNewReleases } from '@/data/games';

const Index = () => {
  const featuredGames = getFeaturedGames();
  const bestsellers = getBestsellers();
  const newReleases = getNewReleases();

  return (
    <Layout>
      {/* Hero Slider */}
      <HeroSlider games={featuredGames} />

      {/* Categories */}
      <CategorySection />

      {/* Bestsellers */}
      <div className="container mx-auto px-4">
        <GameGrid
          games={bestsellers}
          title="🔥 Bestsellers"
          subtitle="The most popular games right now"
        />
      </div>

      {/* Features */}
      <FeaturesSection />

      {/* New Releases */}
      <div className="container mx-auto px-4">
        <GameGrid
          games={newReleases}
          title="✨ New Releases"
          subtitle="Fresh titles just dropped"
        />
      </div>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-neon-cyan/20 via-neon-magenta/20 to-neon-purple/20 p-8 md:p-16 text-center">
            {/* Background Effects */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-neon-cyan rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-neon-magenta rounded-full blur-3xl" />
            </div>

            <div className="relative">
              <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl mb-4">
                Ready to Level Up?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Join thousands of gamers who trust GameVault for their digital game purchases.
                Get instant delivery, amazing deals, and 24/7 support.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="/shop"
                  className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-gradient-to-r from-neon-cyan to-neon-magenta text-background font-bold text-lg hover:opacity-90 transition-opacity"
                >
                  Browse All Games
                </a>
                <a
                  href="/auth"
                  className="inline-flex items-center justify-center px-8 py-3 rounded-full border-2 border-foreground/20 hover:border-foreground/40 font-semibold text-lg transition-colors"
                >
                  Create Account
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
