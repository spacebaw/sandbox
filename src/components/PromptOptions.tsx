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
        <Sparkles className="w-5 h-5 text-louisiana-gold mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">
          Suggested Topics
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelectPrompt(option.prompt)}
            className="bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-louisiana-blue rounded-lg p-4 text-left transition-all transform hover:scale-102 shadow-sm group"
          >
            <div className="flex items-start space-x-3">
              <span className="text-2xl">{option.icon}</span>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 group-hover:text-louisiana-blue mb-1">
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
