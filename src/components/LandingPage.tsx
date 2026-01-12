import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagicCard from './MagicCard';
import { Sparkles, Zap } from 'lucide-react';

interface LandingPageProps {
  onContinue: (businessType: string, city: string) => void;
}

export default function LandingPage({ onContinue }: LandingPageProps) {
  const [input, setInput] = useState('');
  const [showMagicCard, setShowMagicCard] = useState(false);
  const [parsedData, setParsedData] = useState<{ businessType: string; city: string } | null>(null);

  const parseInput = (text: string): { businessType: string; city: string } | null => {
    // Simple parsing logic - look for "a [business type] in [city]"
    const patterns = [
      /(?:start|open|launch|create)\s+(?:a|an)\s+([^in]+?)\s+in\s+([^.!?]+)/i,
      /([^in]+?)\s+in\s+([^.!?]+)/i,
      /(?:a|an)\s+([^in]+?)\s+in\s+([^.!?]+)/i
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        return {
          businessType: match[1].trim(),
          city: match[2].trim()
        };
      }
    }

    // Fallback: if they just typed something, extract what we can
    const words = text.split(' ');
    if (words.length >= 3) {
      const cityIndex = words.findIndex(w => w.toLowerCase() === 'in');
      if (cityIndex > 0 && cityIndex < words.length - 1) {
        return {
          businessType: words.slice(0, cityIndex).join(' '),
          city: words.slice(cityIndex + 1).join(' ')
        };
      }
    }

    // If we can't parse, use defaults
    return {
      businessType: text || 'business',
      city: 'Louisiana'
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const parsed = parseInput(input);
      if (parsed) {
        setParsedData(parsed);
        setShowMagicCard(true);
      }
    }
  };

  const handleContinue = () => {
    if (parsedData) {
      onContinue(parsedData.businessType, parsedData.city);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <AnimatePresence mode="wait">
          {!showMagicCard ? (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {/* Logo/Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="mb-8 flex justify-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-2xl">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-600 bg-clip-text text-transparent"
              >
                Louisiana Business Magic
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto"
              >
                Tell us your dream, and watch the magic happen
              </motion.p>

              {/* Magic Input Form */}
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-8"
              >
                <div className="relative max-w-3xl mx-auto">
                  <motion.input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="I want to start a coffee shop in Lafayette..."
                    whileFocus={{ scale: 1.02 }}
                    className="w-full px-8 py-6 text-2xl text-gray-800 bg-white rounded-2xl shadow-2xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-200 transition-all placeholder-gray-400"
                  />
                  <motion.button
                    type="submit"
                    disabled={!input.trim()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    <Zap className="w-5 h-5" />
                    <span>Create Magic</span>
                  </motion.button>
                </div>
              </motion.form>

              {/* Example prompts */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="max-w-2xl mx-auto"
              >
                <p className="text-sm text-gray-600 mb-3">Try these examples:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {[
                    'a bakery in New Orleans',
                    'a tech startup in Baton Rouge',
                    'a consulting firm in Shreveport',
                    'a boutique in Lafayette'
                  ].map((example, index) => (
                    <motion.button
                      key={example}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setInput(`I want to start ${example}`)}
                      className="px-4 py-2 bg-white hover:bg-purple-50 border border-purple-200 rounded-lg text-sm text-gray-700 transition-all shadow-sm hover:shadow-md"
                    >
                      {example}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-12 flex items-center justify-center space-x-6 text-sm text-gray-600"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>AI-Powered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>Louisiana-Specific</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>Free to Use</span>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="magic-card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {parsedData && (
                <MagicCard
                  businessType={parsedData.businessType}
                  city={parsedData.city}
                  onContinue={handleContinue}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
