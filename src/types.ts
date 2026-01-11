export type BusinessStage =
  | 'idea'
  | 'startup'
  | 'established'
  | 'growth'
  | 'transition';

export interface AssessmentAnswers {
  stage: BusinessStage | null;
  hasBusinessPlan: boolean | null;
  mainChallenge: string | null;
  industry: string | null;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface PromptOption {
  id: string;
  title: string;
  description: string;
  prompt: string;
  icon: string;
}

export interface Resource {
  title: string;
  description: string;
  url: string;
  category: 'state' | 'local' | 'federal' | 'financial';
}
