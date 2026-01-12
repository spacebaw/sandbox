import { useState } from 'react';
import { GamificationProvider } from './contexts/GamificationContext';
import LandingPage from './components/LandingPage';
import FogOfWar from './components/FogOfWar';
import PromptPalette from './components/PromptPalette';
import ResourcesPanel from './components/ResourcesPanel';
import { louisianaResources } from './data/resources';
import { RotateCcw, BookOpen } from 'lucide-react';

type AppState = 'landing' | 'assessment' | 'palette';

function App() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [businessInfo, setBusinessInfo] = useState<{ type: string; city: string } | null>(null);
  const [showResources, setShowResources] = useState(false);

  const handleLandingContinue = (businessType: string, city: string) => {
    setBusinessInfo({ type: businessType, city });
    setAppState('assessment');
  };

  const handleAssessmentComplete = () => {
    setAppState('palette');
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to start over?')) {
      setAppState('landing');
      setBusinessInfo(null);
      setShowResources(false);
    }
  };

  return (
    <GamificationProvider>
      {appState === 'landing' && (
        <LandingPage onContinue={handleLandingContinue} />
      )}

      {appState === 'assessment' && (
        <FogOfWar onComplete={handleAssessmentComplete} />
      )}

      {appState === 'palette' && businessInfo && (
        <div className="relative min-h-screen">
          {/* Header with reset button */}
          <div className="absolute top-4 right-4 z-10 flex space-x-2">
            <button
              onClick={() => setShowResources(true)}
              className="bg-white hover:bg-gray-50 text-gray-700 font-semibold px-4 py-2 rounded-lg transition-all border border-gray-300 shadow-lg flex items-center space-x-2"
            >
              <BookOpen className="w-5 h-5" />
              <span>Resources</span>
            </button>
            <button
              onClick={handleReset}
              className="bg-white hover:bg-gray-50 text-gray-700 font-semibold px-4 py-2 rounded-lg transition-all border border-gray-300 shadow-lg flex items-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Start Over</span>
            </button>
          </div>

          <PromptPalette businessInfo={businessInfo} />

          {/* Resources panel */}
          <ResourcesPanel
            resources={louisianaResources}
            isOpen={showResources}
            onClose={() => setShowResources(false)}
          />
        </div>
      )}
    </GamificationProvider>
  );
}

export default App;
