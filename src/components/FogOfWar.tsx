import { motion, AnimatePresence } from 'framer-motion';
import { useGamification, ActionCard } from '../contexts/GamificationContext';
import { CheckCircle, Lock } from 'lucide-react';
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
              whileHover={!isLocked && !card.completed ? { y: -2 } : {}}
              whileTap={!isLocked && !card.completed ? { scale: 0.98 } : {}}
              className={`relative p-4 rounded-xl transition-all ${
                card.completed
                  ? 'bg-gray-900 text-white shadow-sm'
                  : isLocked
                  ? 'bg-gray-50 text-gray-400 cursor-not-allowed opacity-50'
                  : 'bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Card content */}
              <div className="text-center">
                <div className="text-3xl mb-2">{card.icon}</div>
                <div className={`font-semibold mb-1 ${card.completed ? 'text-white' : 'text-gray-900'}`}>
                  {card.title}
                </div>
                <div className={`text-xs ${card.completed ? 'text-gray-300' : 'text-gray-600'}`}>
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
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-4xl mx-auto py-8">
        {/* Header with progress */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-semibold mb-2 text-gray-900">
            Tell us about your business
          </h1>
          <p className="text-gray-600 mb-6">
            Choose what best describes your situation
          </p>

          {/* Progress indicator */}
          <div className="flex items-center justify-center space-x-2 mb-6">
            <span className="text-sm text-gray-500">Progress:</span>
            <div className="flex-1 max-w-xs h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gray-900"
                initial={{ width: '10%' }}
                animate={{ width: `${readinessScore}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
            <span className="text-sm font-medium text-gray-900">{readinessScore}%</span>
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
              <div className="bg-gray-900 rounded-full p-6 shadow-2xl">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Card sections */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          {renderCardSection('Where are you starting?', stageCards, false)}
          {renderCardSection('What\'s your industry?', industryCards, !completedStage)}
          {renderCardSection('What\'s your main goal?', challengeCards, !completedIndustry)}
        </motion.div>

        {/* Louisiana Compliance Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: allComplete ? 1 : 0.5, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`bg-gray-50 border border-gray-200 rounded-2xl p-6 ${
            !allComplete ? 'opacity-50' : ''
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold flex items-center space-x-2 text-gray-900">
              <span>🏛️</span>
              <span>Louisiana Compliance Checklist</span>
            </h3>
            {!allComplete && <Lock className="w-5 h-5 text-gray-400" />}
          </div>

          {allComplete ? (
            <>
              <p className="text-gray-600 mb-4">
                We'll help you navigate these Louisiana requirements:
              </p>
              <div className="space-y-2 mb-6">
                {achievements.slice(0, 5).map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3 bg-white rounded-lg p-3 border border-gray-200"
                  >
                    <span className="text-2xl">{achievement.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{achievement.title}</div>
                      <div className="text-xs text-gray-600">{achievement.description}</div>
                    </div>
                    {achievement.completed && (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    )}
                  </motion.div>
                ))}
              </div>
              <button
                onClick={onComplete}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-4 rounded-xl transition-colors"
              >
                Continue →
              </button>
            </>
          ) : (
            <p className="text-gray-600">
              Complete the sections above to unlock your Louisiana compliance checklist
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
