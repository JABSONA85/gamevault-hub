import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const categories = [
  {
    name: 'PlayStation 5',
    platform: 'PS5',
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&q=80',
    gradient: 'from-blue-600 to-indigo-800',
    count: 8,
  },
  {
    name: 'PlayStation 4',
    platform: 'PS4',
    image: 'https://images.unsplash.com/photo-1592155931584-901ac15763e3?w=600&q=80',
    gradient: 'from-blue-500 to-blue-700',
    count: 2,
  },
  {
    name: 'Xbox Series X|S',
    platform: 'Xbox Series X/S',
    image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=600&q=80',
    gradient: 'from-green-500 to-emerald-700',
    count: 4,
  },
  {
    name: 'Xbox One',
    platform: 'Xbox One',
    image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=600&q=80',
    gradient: 'from-green-600 to-green-800',
    count: 1,
  },
];

const CategorySection = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
            Browse by <span className="text-neon-cyan">Platform</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find the perfect games for your console. Instant digital delivery on all platforms.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.platform}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={`/shop?platform=${encodeURIComponent(category.platform)}`}
                className="block relative aspect-square overflow-hidden rounded-2xl group"
              >
                {/* Background Image */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-70 group-hover:opacity-80 transition-opacity`} />

                {/* Content */}
                <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end">
                  <h3 className="font-display font-bold text-lg md:text-xl lg:text-2xl text-white mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-white/80">
                    {category.count} games available
                  </p>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-2xl transition-colors duration-300" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
