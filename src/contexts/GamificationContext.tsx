import { createContext, useContext, useState, ReactNode } from 'react';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  completed: boolean;
  points: number;
}

export interface ActionCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  completed: boolean;
  category: 'stage' | 'industry' | 'challenge';
}

interface GamificationContextType {
  readinessScore: number;
  achievements: Achievement[];
  actionCards: ActionCard[];
  completeActionCard: (id: string) => void;
  unlockAchievement: (id: string) => void;
  incrementScore: (points: number) => void;
  resetProgress: () => void;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

const initialAchievements: Achievement[] = [
  {
    id: 'geauxbiz-registered',
    title: 'The Official Seal',
    description: 'Register on GeauxBiz portal',
    icon: '🏛️',
    completed: false,
    points: 20
  },
  {
    id: 'ein-obtained',
    title: 'Tax Identity',
    description: 'Obtain Federal EIN',
    icon: '🎯',
    completed: false,
    points: 15
  },
  {
    id: 'business-structure',
    title: 'Structure Set',
    description: 'Choose business structure (LLC, Corp, etc.)',
    icon: '🏗️',
    completed: false,
    points: 15
  },
  {
    id: 'sales-tax',
    title: 'Sales Tax Ready',
    description: 'Register for Louisiana Sales Tax',
    icon: '💰',
    completed: false,
    points: 10
  },
  {
    id: 'business-license',
    title: 'Licensed to Operate',
    description: 'Obtain local business license',
    icon: '📜',
    completed: false,
    points: 10
  }
];

const initialActionCards: ActionCard[] = [
  {
    id: 'stage-idea',
    title: 'Just Getting Started',
    description: 'I have an idea',
    icon: '💡',
    completed: false,
    category: 'stage'
  },
  {
    id: 'stage-startup',
    title: 'Ready to Launch',
    description: 'Starting my business now',
    icon: '🚀',
    completed: false,
    category: 'stage'
  },
  {
    id: 'stage-established',
    title: 'Up and Running',
    description: 'My business is established',
    icon: '🏢',
    completed: false,
    category: 'stage'
  },
  {
    id: 'stage-growth',
    title: 'Time to Scale',
    description: 'Ready to grow',
    icon: '📈',
    completed: false,
    category: 'stage'
  },
  {
    id: 'industry-retail',
    title: 'Retail Business',
    description: 'Selling products to customers',
    icon: '🛍️',
    completed: false,
    category: 'industry'
  },
  {
    id: 'industry-food',
    title: 'Food & Beverage',
    description: 'Restaurant, cafe, or food service',
    icon: '🍽️',
    completed: false,
    category: 'industry'
  },
  {
    id: 'industry-tech',
    title: 'Technology',
    description: 'Software, apps, or tech services',
    icon: '💻',
    completed: false,
    category: 'industry'
  },
  {
    id: 'industry-services',
    title: 'Professional Services',
    description: 'Consulting, legal, accounting, etc.',
    icon: '💼',
    completed: false,
    category: 'industry'
  },
  {
    id: 'challenge-customers',
    title: 'Finding Customers',
    description: 'Need help with marketing',
    icon: '🎯',
    completed: false,
    category: 'challenge'
  },
  {
    id: 'challenge-funding',
    title: 'Securing Funding',
    description: 'Need capital to grow',
    icon: '💵',
    completed: false,
    category: 'challenge'
  }
];

export function GamificationProvider({ children }: { children: ReactNode }) {
  const [readinessScore, setReadinessScore] = useState(10);
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [actionCards, setActionCards] = useState<ActionCard[]>(initialActionCards);

  const completeActionCard = (id: string) => {
    setActionCards(prev =>
      prev.map(card =>
        card.id === id ? { ...card, completed: true } : card
      )
    );
    // Each action card adds 10% to readiness
    incrementScore(10);
  };

  const unlockAchievement = (id: string) => {
    setAchievements(prev =>
      prev.map(achievement =>
        achievement.id === id
          ? { ...achievement, completed: true }
          : achievement
      )
    );
    const achievement = achievements.find(a => a.id === id);
    if (achievement) {
      incrementScore(achievement.points);
    }
  };

  const incrementScore = (points: number) => {
    setReadinessScore(prev => Math.min(100, prev + points));
  };

  const resetProgress = () => {
    setReadinessScore(10);
    setAchievements(initialAchievements);
    setActionCards(initialActionCards);
  };

  return (
    <GamificationContext.Provider
      value={{
        readinessScore,
        achievements,
        actionCards,
        completeActionCard,
        unlockAchievement,
        incrementScore,
        resetProgress
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
}

export function useGamification() {
  const context = useContext(GamificationContext);
  if (context === undefined) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
}
