import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onContinue: (businessType: string, city: string, initialQuery?: string) => void;
}

const goalButtons = [
  { id: 'start', label: 'Start a Business', prompt: 'I want to start a business in Louisiana' },
  { id: 'grow', label: 'Grow Revenue', prompt: 'I want to grow my business revenue' },
  { id: 'funding', label: 'Get Funding', prompt: 'I need help securing funding for my business' },
  { id: 'compliance', label: 'Navigate Compliance', prompt: 'I need help with Louisiana business compliance' },
  { id: 'marketing', label: 'Improve Marketing', prompt: 'I want to improve my marketing strategy' },
  { id: 'operations', label: 'Optimize Operations', prompt: 'I want to optimize my business operations' }
];

export default function LandingPage({ onContinue }: LandingPageProps) {
  const [input, setInput] = useState('');

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
        // Skip magic card, go directly to chat with the query
        onContinue(parsed.businessType, parsed.city, input);
      }
    }
  };

  const handleGoalClick = (prompt: string) => {
    // Clicking a goal button goes directly to chat with that prompt
    const parsed = parseInput(prompt);
    if (parsed) {
      onContinue(parsed.businessType, parsed.city, prompt);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
              {/* Logo orb */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="mb-12 flex justify-center"
              >
                <div className="w-16 h-16 bg-gradient-to-b from-green-400 to-green-100 rounded-full shadow-lg" />
              </motion.div>

              {/* Greeting */}
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl font-semibold mb-4 text-gray-900"
              >
                Good evening
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-gray-600 mb-12"
              >
                How can I help you with your Louisiana business?
              </motion.p>

              {/* Goal buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mb-8"
              >
                <p className="text-sm text-gray-500 mb-4">Choose a goal or write your own</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                  {goalButtons.map((goal, index) => (
                    <motion.button
                      key={goal.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      onClick={() => handleGoalClick(goal.prompt)}
                      className="px-4 py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-sm text-gray-700 transition-all text-left"
                    >
                      {goal.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Input form */}
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="How can I help you today?"
                    className="w-full px-6 py-4 pr-14 text-base text-gray-900 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-gray-300 transition-colors placeholder-gray-400"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim()}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-200 disabled:cursor-not-allowed rounded-lg transition-colors"
                  >
                    <ArrowRight className="w-5 h-5 text-white" />
                  </button>
                </div>
              </motion.form>

          {/* Footer note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 text-xs text-gray-400"
          >
            Louisiana Business Assistant can make mistakes. Please verify important information.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
