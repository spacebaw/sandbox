import { motion } from 'framer-motion';
import { MapPin, Target } from 'lucide-react';

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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative"
    >
      {/* Main card */}
      <div className="relative bg-white rounded-2xl border border-gray-200 p-8 max-w-2xl mx-auto">
        {/* Business name */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-semibold text-center mb-2 text-gray-900"
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6"
        >
          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 text-gray-700 mt-1 flex-shrink-0" />
            <p className="text-gray-700 text-sm leading-relaxed">
              {insight.cityInsight}
            </p>
          </div>
        </motion.div>

        {/* Quick wins section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center space-x-2 mb-3">
            <Target className="w-5 h-5 text-gray-700" />
            <h3 className="font-semibold text-gray-900">Quick wins:</h3>
          </div>
          <div className="space-y-2 mb-6">
            {insight.quickWins.map((win, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.05 }}
                className="flex items-center space-x-2"
              >
                <div className="w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-gray-700 text-sm">{win}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Button */}
        <button
          onClick={onContinue}
          className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-4 rounded-xl transition-colors flex items-center justify-center space-x-2"
        >
          <span>Continue →</span>
        </button>

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
