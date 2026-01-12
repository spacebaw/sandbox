import { motion, AnimatePresence } from 'framer-motion';
import { useGamification, ActionCard } from '../contexts/GamificationContext';
import { CheckCircle, Lock, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface FogOfWarProps {
  onComplete: () => void;
}

export default function FogOfWar({ onComplete }: FogOfWarProps) {
  const { readinessScore, actionCards, completeActionCard, achievements } = useGamification();
  const [showCelebration, setShowCelebration] = useState(false);

  const stageCards = actionCards.filter(card => card.category === 'stage');
  const industryCards = actionCards.filter(card => card.category === 'industry');
  const challengeCards = actionCards.filter(card => card.category === 'challenge');

  const completedStage = stageCards.some(card => card.completed);
  const completedIndustry = industryCards.some(card => card.completed);
  const completedChallenge = challengeCards.some(card => card.completed);

  const allComplete = completedStage && completedIndustry && completedChallenge;

  const handleCardClick = (card: ActionCard) => {
    if (!card.completed) {
      completeActionCard(card.id);

      // Show celebration effect
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 1000);

      // Check if all sections are complete
      const updatedCompleted =
        (card.category === 'stage' || completedStage) &&
        (card.category === 'industry' || completedIndustry) &&
        (card.category === 'challenge' || completedChallenge);

      if (updatedCompleted) {
        setTimeout(() => {
          // Auto-advance after brief delay
        }, 1500);
      }
    }
  };

  const renderCardSection = (title: string, cards: ActionCard[], isLocked: boolean) => {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
            <span>{title}</span>
            {cards.some(c => c.completed) && (
              <CheckCircle className="w-5 h-5 text-green-500" />
            )}
          </h3>
          {isLocked && (
            <div className="flex items-center space-x-1 text-gray-400 text-sm">
              <Lock className="w-4 h-4" />
              <span>Complete previous step</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {cards.map((card) => (
            <motion.button
              key={card.id}
              onClick={() => !isLocked && handleCardClick(card)}
              disabled={isLocked || card.completed}
              whileHover={!isLocked && !card.completed ? { scale: 1.05, rotate: 1 } : {}}
              whileTap={!isLocked && !card.completed ? { scale: 0.95 } : {}}
              className={`relative p-4 rounded-xl transition-all ${
                card.completed
                  ? 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg'
                  : isLocked
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'
                  : 'bg-white hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 border-2 border-gray-200 hover:border-purple-400 shadow-md hover:shadow-xl'
              }`}
            >
              {/* Card content */}
              <div className="text-center">
                <div className="text-3xl mb-2">{card.icon}</div>
                <div className={`font-semibold mb-1 ${card.completed ? 'text-white' : 'text-gray-900'}`}>
                  {card.title}
                </div>
                <div className={`text-xs ${card.completed ? 'text-green-100' : 'text-gray-600'}`}>
                  {card.description}
                </div>
              </div>

              {/* Completed checkmark */}
              {card.completed && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="absolute top-2 right-2"
                >
                  <CheckCircle className="w-6 h-6 text-white" />
                </motion.div>
              )}

              {/* Locked overlay */}
              {isLocked && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Lock className="w-8 h-8 text-gray-300" />
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 p-4">
      <div className="max-w-4xl mx-auto py-8">
        {/* Header with progress */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Build Your Business Profile
          </h1>
          <p className="text-gray-600 mb-6">
            Unlock your path by choosing what fits you best
          </p>

          {/* Progress ring */}
          <div className="relative inline-flex items-center justify-center">
            <svg className="w-32 h-32 transform -rotate-90">
              {/* Background ring */}
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="#E5E7EB"
                strokeWidth="8"
                fill="none"
              />
              {/* Progress ring */}
              <motion.circle
                cx="64"
                cy="64"
                r="56"
                stroke="url(#gradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                initial={{ strokeDasharray: '0 352' }}
                animate={{
                  strokeDasharray: `${(readinessScore / 100) * 352} 352`
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#9333EA" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-bold text-purple-600">{readinessScore}%</span>
              <span className="text-xs text-gray-600">Ready</span>
            </div>
          </div>
        </motion.div>

        {/* Celebration effect */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
            >
              <div className="bg-white rounded-full p-8 shadow-2xl">
                <Sparkles className="w-16 h-16 text-yellow-500" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Card sections */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-6 mb-6"
        >
          {renderCardSection('Where are you starting?', stageCards, false)}
          {renderCardSection('What\'s your industry?', industryCards, !completedStage)}
          {renderCardSection('What\'s your main goal?', challengeCards, !completedIndustry)}
        </motion.div>

        {/* Louisiana Compliance Quest */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: allComplete ? 1 : 0.5, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-xl p-6 text-white ${
            !allComplete ? 'opacity-50' : ''
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold flex items-center space-x-2">
              <span>🏛️</span>
              <span>The Official Seal</span>
            </h3>
            {!allComplete && <Lock className="w-6 h-6" />}
          </div>

          {allComplete ? (
            <>
              <p className="text-purple-100 mb-4">
                Your Louisiana compliance checklist - we'll help you knock these out:
              </p>
              <div className="space-y-2 mb-6">
                {achievements.slice(0, 5).map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3 bg-white/10 rounded-lg p-3 backdrop-blur"
                  >
                    <span className="text-2xl">{achievement.icon}</span>
                    <div className="flex-1">
                      <div className="font-semibold">{achievement.title}</div>
                      <div className="text-xs text-purple-200">{achievement.description}</div>
                    </div>
                    {achievement.completed && (
                      <CheckCircle className="w-5 h-5 text-green-300" />
                    )}
                  </motion.div>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onComplete}
                className="w-full bg-white text-purple-600 font-bold py-4 rounded-xl hover:bg-gray-50 transition-all shadow-lg"
              >
                Let's Get Started! →
              </motion.button>
            </>
          ) : (
            <p className="text-purple-100">
              Complete the sections above to unlock your Louisiana compliance checklist
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
