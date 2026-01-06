import { motion } from 'framer-motion';
import { Zap, Shield, Clock, Headphones } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Instant Delivery',
    description: 'Get your game keys immediately after purchase. No waiting, start playing in seconds.',
    color: 'text-neon-cyan',
  },
  {
    icon: Shield,
    title: 'Secure Payments',
    description: 'Your transactions are protected with bank-level encryption and security.',
    color: 'text-neon-green',
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Shop anytime, anywhere. Our store never sleeps, and neither do your gaming needs.',
    color: 'text-neon-magenta',
  },
  {
    icon: Headphones,
    title: 'Premium Support',
    description: 'Got questions? Our gaming experts are here to help you around the clock.',
    color: 'text-neon-purple',
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 px-4 bg-card/50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
            Why Choose <span className="text-neon-magenta">GameVault</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're not just a store. We're your gateway to the best gaming experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors group"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-neon-cyan/5 to-neon-magenta/5" />

              <div className="relative">
                <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-4 ${feature.color}`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
