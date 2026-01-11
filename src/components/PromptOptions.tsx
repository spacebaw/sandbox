import { PromptOption } from '../types';
import { Sparkles } from 'lucide-react';

interface PromptOptionsProps {
  options: PromptOption[];
  onSelectPrompt: (prompt: string) => void;
}

export default function PromptOptions({ options, onSelectPrompt }: PromptOptionsProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center mb-4">
        <Sparkles className="w-5 h-5 text-accent mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">
          Suggested Topics
        </h3>
      </div>
      <div className="space-y-2">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelectPrompt(option.prompt)}
            className="w-full bg-white hover:bg-gray-50 border border-gray-200 hover:border-primary rounded-lg p-4 text-left transition-all shadow-material-1 hover:shadow-material-2 group"
          >
            <div className="flex items-start space-x-3">
              <span className="text-2xl">{option.icon}</span>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 group-hover:text-primary mb-1">
                  {option.title}
                </div>
                <div className="text-sm text-gray-600">
                  {option.description}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
