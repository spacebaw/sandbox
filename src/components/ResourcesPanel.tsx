import { Resource } from '../types';
import { ExternalLink, Building, MapPin, DollarSign, Flag } from 'lucide-react';

interface ResourcesPanelProps {
  resources: Resource[];
  isOpen: boolean;
  onClose: () => void;
}

const categoryIcons = {
  state: Building,
  local: MapPin,
  financial: DollarSign,
  federal: Flag
};

const categoryLabels = {
  state: 'State Resources',
  local: 'Local Resources',
  financial: 'Financial Resources',
  federal: 'Federal Resources'
};

export default function ResourcesPanel({ resources, isOpen, onClose }: ResourcesPanelProps) {
  if (!isOpen) return null;

  const groupedResources = resources.reduce((acc, resource) => {
    if (!acc[resource.category]) {
      acc[resource.category] = [];
    }
    acc[resource.category].push(resource);
    return acc;
  }, {} as Record<string, Resource[]>);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-material-3 z-50 overflow-y-auto">
        <div className="sticky top-0 bg-primary text-white p-6 shadow-material-2">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Louisiana Resources</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-accent-light text-2xl transition-colors"
            >
              ×
            </button>
          </div>
          <p className="text-primary-light text-sm mt-2">
            Curated resources to help your business succeed
          </p>
        </div>

        <div className="p-6 space-y-6 bg-gray-50">
          {Object.entries(groupedResources).map(([category, categoryResources]) => {
            const Icon = categoryIcons[category as keyof typeof categoryIcons];
            return (
              <div key={category}>
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-primary-light rounded-full flex items-center justify-center mr-2">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900">
                    {categoryLabels[category as keyof typeof categoryLabels]}
                  </h3>
                </div>
                <div className="space-y-2">
                  {categoryResources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-white hover:bg-gray-50 border border-gray-200 hover:border-primary rounded-lg p-4 transition-all shadow-material-1 hover:shadow-material-2 group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 group-hover:text-primary mb-1 transition-colors">
                            {resource.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {resource.description}
                          </p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary ml-2 flex-shrink-0 transition-colors" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-6 bg-white border-t border-gray-200">
          <p className="text-sm text-gray-600">
            <strong>Note:</strong> These resources are provided for informational purposes.
            Always verify information directly with the relevant agencies and organizations.
          </p>
        </div>
      </div>
    </>
  );
}
