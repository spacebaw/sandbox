import { motion } from 'framer-motion';
import { CheckCircle, Circle, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export interface ProgressItem {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  category?: string;
}

interface ProgressTrackerProps {
  items: ProgressItem[];
  onToggle?: (id: string) => void;
  title?: string;
}

export default function ProgressTracker({ items, onToggle, title = "Your Progress" }: ProgressTrackerProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  // Group items by category if they have categories
  const categorizedItems: Record<string, ProgressItem[]> = {};
  const uncategorizedItems: ProgressItem[] = [];

  items.forEach(item => {
    if (item.category) {
      if (!categorizedItems[item.category]) {
        categorizedItems[item.category] = [];
      }
      categorizedItems[item.category].push(item);
    } else {
      uncategorizedItems.push(item);
    }
  });

  const totalItems = items.length;
  const completedItems = items.filter(item => item.completed).length;
  const progressPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  if (items.length === 0) {
    return (
      <div className="p-6 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-sm text-gray-500">
          Your progress will appear here as you chat
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between text-left"
        >
          <div>
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="text-xs text-gray-600 mt-1">
              {completedItems} of {totalItems} completed
            </p>
          </div>
          {isExpanded ? (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-400" />
          )}
        </button>

        {/* Progress bar */}
        <div className="mt-3">
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-green-500"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">{progressPercentage}% complete</p>
        </div>
      </div>

      {/* Items list */}
      {isExpanded && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Uncategorized items */}
          {uncategorizedItems.length > 0 && (
            <div className="space-y-2">
              {uncategorizedItems.map((item, index) => (
                <ProgressItemCard
                  key={item.id}
                  item={item}
                  index={index}
                  onToggle={onToggle}
                />
              ))}
            </div>
          )}

          {/* Categorized items */}
          {Object.entries(categorizedItems).map(([category, categoryItems]) => (
            <div key={category} className="space-y-2">
              <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                {category}
              </h4>
              {categoryItems.map((item, index) => (
                <ProgressItemCard
                  key={item.id}
                  item={item}
                  index={index}
                  onToggle={onToggle}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProgressItemCard({
  item,
  index,
  onToggle
}: {
  item: ProgressItem;
  index: number;
  onToggle?: (id: string) => void;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={() => onToggle?.(item.id)}
      className={`w-full text-left p-3 rounded-lg border transition-all ${
        item.completed
          ? 'bg-green-50 border-green-200'
          : 'bg-gray-50 border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-0.5">
          {item.completed ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
          ) : (
            <Circle className="w-5 h-5 text-gray-400" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p
            className={`text-sm font-medium ${
              item.completed ? 'text-green-900 line-through' : 'text-gray-900'
            }`}
          >
            {item.title}
          </p>
          {item.description && (
            <p
              className={`text-xs mt-1 ${
                item.completed ? 'text-green-700' : 'text-gray-600'
              }`}
            >
              {item.description}
            </p>
          )}
        </div>
      </div>
    </motion.button>
  );
}
