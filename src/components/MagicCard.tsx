import { motion } from 'framer-motion';
import { Sparkles, MapPin, Target, TrendingUp } from 'lucide-react';

interface MagicCardProps {
  businessType: string;
  city: string;
  onContinue: () => void;
}

interface BusinessInsight {
  name: string;
  tagline: string;
  cityInsight: string;
  quickWins: string[];
}

function generateBusinessInsight(businessType: string, city: string): BusinessInsight {
  // Simple business name generation based on type
  const businessNames: Record<string, string> = {
    'coffee shop': 'Brew & Bloom',
    'restaurant': 'Bayou Kitchen',
    'bakery': 'Sweet Louisiana',
    'boutique': 'Southern Style Co.',
    'tech startup': 'CodeBayou',
    'consulting': 'Pelican Advisory',
    'salon': 'Magnolia Beauty',
    'gym': 'FitBayou',
    'default': 'Louisiana Business'
  };

  const name = businessNames[businessType.toLowerCase()] || businessNames['default'];

  const taglines: Record<string, string> = {
    'coffee shop': 'Where Louisiana mornings begin',
    'restaurant': 'Authentic flavors, modern twist',
    'bakery': 'Handcrafted treats daily',
    'boutique': 'Your southern wardrobe destination',
    'tech startup': 'Innovation with southern hospitality',
    'consulting': 'Expert guidance for local businesses',
    'salon': 'Transform your look',
    'gym': 'Fitness meets Louisiana culture',
    'default': 'Building success in Louisiana'
  };

  const tagline = taglines[businessType.toLowerCase()] || taglines['default'];

  const cityInsight = `${city} is perfect for your ${businessType}! The local market shows strong demand, and Louisiana's business-friendly environment offers excellent tax incentives for new entrepreneurs.`;

  const quickWins = [
    `Register on GeauxBiz in under 15 minutes`,
    `Apply for Louisiana Small Business grants`,
    `Connect with ${city} Chamber of Commerce`,
    `Get your Federal EIN (free, 5 minutes)`
  ];

  return { name, tagline, cityInsight, quickWins };
}

export default function MagicCard({ businessType, city, onContinue }: MagicCardProps) {
  const insight = generateBusinessInsight(businessType, city);

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.6
      }}
      className="relative"
    >
      {/* Sparkle effect overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, times: [0, 0.5, 1] }}
        className="absolute -inset-2 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 rounded-3xl blur-xl opacity-30"
      />

      {/* Main card */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto border-2 border-purple-200">
        {/* Header with icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
          className="flex items-center justify-center mb-6"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
        </motion.div>

        {/* Business name with gradient */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
        >
          {insight.name}
        </motion.h2>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-600 text-lg mb-6 italic"
        >
          "{insight.tagline}"
        </motion.p>

        {/* Location insight */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 mb-6"
        >
          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
            <p className="text-gray-700 text-sm leading-relaxed">
              {insight.cityInsight}
            </p>
          </div>
        </motion.div>

        {/* Quick wins section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center space-x-2 mb-3">
            <Target className="w-5 h-5 text-purple-600" />
            <h3 className="font-bold text-gray-900">Your Quick Wins:</h3>
          </div>
          <div className="space-y-2 mb-6">
            {insight.quickWins.map((win, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="flex items-center space-x-2"
              >
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-gray-700 text-sm">{win}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onContinue}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
        >
          <TrendingUp className="w-5 h-5" />
          <span>Let's Build This! →</span>
        </motion.button>

        {/* Subtle hint text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="text-center text-gray-500 text-xs mt-4"
        >
          Get personalized guidance every step of the way
        </motion.p>
      </div>
    </motion.div>
  );
}
