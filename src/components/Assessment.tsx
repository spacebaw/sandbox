import { useState } from 'react';
import { BusinessStage, AssessmentAnswers } from '../types';
import { ChevronRight, Lightbulb, Rocket, Building2, TrendingUp, RefreshCw } from 'lucide-react';

interface AssessmentProps {
  onComplete: (answers: AssessmentAnswers) => void;
}

const stages: { value: BusinessStage; label: string; icon: React.ReactNode; description: string }[] = [
  {
    value: 'idea',
    label: 'I have an idea',
    icon: <Lightbulb className="w-6 h-6" />,
    description: "I'm thinking about starting a business"
  },
  {
    value: 'startup',
    label: 'Starting up',
    icon: <Rocket className="w-6 h-6" />,
    description: "I'm launching my business now"
  },
  {
    value: 'established',
    label: 'Established',
    icon: <Building2 className="w-6 h-6" />,
    description: "My business is up and running"
  },
  {
    value: 'growth',
    label: 'Growing',
    icon: <TrendingUp className="w-6 h-6" />,
    description: "I'm ready to scale and expand"
  },
  {
    value: 'transition',
    label: 'Transitioning',
    icon: <RefreshCw className="w-6 h-6" />,
    description: "Making major changes or planning succession"
  }
];

const industries = [
  'Retail',
  'Food & Beverage',
  'Healthcare',
  'Professional Services',
  'Construction',
  'Technology',
  'Tourism & Hospitality',
  'Manufacturing',
  'Agriculture',
  'Other'
];

const challenges = [
  'Finding customers',
  'Managing finances',
  'Understanding regulations',
  'Marketing and branding',
  'Hiring and managing staff',
  'Securing funding',
  'Business planning',
  'General guidance'
];

export default function Assessment({ onComplete }: AssessmentProps) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<AssessmentAnswers>({
    stage: null,
    hasBusinessPlan: null,
    mainChallenge: null,
    industry: null
  });

  const handleStageSelect = (stage: BusinessStage) => {
    setAnswers({ ...answers, stage });
    setStep(2);
  };

  const handleIndustrySelect = (industry: string) => {
    setAnswers({ ...answers, industry });
    setStep(3);
  };

  const handleChallengeSelect = (challenge: string) => {
    const updatedAnswers = { ...answers, mainChallenge: challenge };
    setAnswers(updatedAnswers);
    onComplete(updatedAnswers);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
      <div className="max-w-3xl w-full">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className={`w-3 h-3 rounded-full transition-colors ${step >= 1 ? 'bg-primary' : 'bg-gray-300'}`} />
            <div className={`w-12 h-1 transition-colors ${step >= 2 ? 'bg-primary' : 'bg-gray-300'}`} />
            <div className={`w-3 h-3 rounded-full transition-colors ${step >= 2 ? 'bg-primary' : 'bg-gray-300'}`} />
            <div className={`w-12 h-1 transition-colors ${step >= 3 ? 'bg-primary' : 'bg-gray-300'}`} />
            <div className={`w-3 h-3 rounded-full transition-colors ${step >= 3 ? 'bg-primary' : 'bg-gray-300'}`} />
          </div>
          <p className="text-center text-gray-600 text-sm">Step {step} of 3</p>
        </div>

        {/* Step 1: Business Stage */}
        {step === 1 && (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">
              Where are you in your business journey?
            </h2>
            <p className="text-gray-600 text-center mb-8">
              This helps us provide the most relevant guidance for your situation
            </p>
            <div className="space-y-3">
              {stages.map((stage) => (
                <button
                  key={stage.value}
                  onClick={() => handleStageSelect(stage.value)}
                  className="w-full bg-white hover:bg-gray-50 rounded-lg p-5 flex items-center justify-between transition-all shadow-material-1 hover:shadow-material-2 group border border-gray-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center group-hover:bg-primary transition-colors">
                      <div className="text-primary group-hover:text-white transition-colors">
                        {stage.icon}
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">{stage.label}</div>
                      <div className="text-sm text-gray-600">{stage.description}</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Industry */}
        {step === 2 && (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">
              What industry is your business in?
            </h2>
            <p className="text-gray-600 text-center mb-8">
              This helps us provide industry-specific resources and advice
            </p>
            <div className="grid grid-cols-2 gap-3">
              {industries.map((industry) => (
                <button
                  key={industry}
                  onClick={() => handleIndustrySelect(industry)}
                  className="bg-white hover:bg-primary hover:text-white rounded-lg p-4 font-semibold text-gray-900 transition-all shadow-material-1 hover:shadow-material-2 border border-gray-200"
                >
                  {industry}
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(1)}
              className="mt-6 text-primary hover:text-primary-dark underline mx-auto block font-medium"
            >
              ← Go back
            </button>
          </div>
        )}

        {/* Step 3: Main Challenge */}
        {step === 3 && (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">
              What's your biggest challenge right now?
            </h2>
            <p className="text-gray-600 text-center mb-8">
              We'll prioritize helping you with this first
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {challenges.map((challenge) => (
                <button
                  key={challenge}
                  onClick={() => handleChallengeSelect(challenge)}
                  className="bg-white hover:bg-primary hover:text-white rounded-lg p-4 font-semibold text-gray-900 transition-all shadow-material-1 hover:shadow-material-2 text-left border border-gray-200"
                >
                  {challenge}
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(2)}
              className="mt-6 text-primary hover:text-primary-dark underline mx-auto block font-medium"
            >
              ← Go back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
