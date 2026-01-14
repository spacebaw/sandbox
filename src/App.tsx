import { useState, useEffect } from 'react';
import { GamificationProvider } from './contexts/GamificationContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LandingPage from './components/LandingPage';
import FogOfWar from './components/FogOfWar';
import PromptPalette from './components/PromptPalette';
import ResourcesPanel from './components/ResourcesPanel';
import LoginModal from './components/LoginModal';
import LeftSidebar from './components/LeftSidebar';
import { louisianaResources } from './data/resources';
import { RotateCcw, BookOpen } from 'lucide-react';

type AppState = 'landing' | 'assessment' | 'palette';

function AppContent() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [businessInfo, setBusinessInfo] = useState<{ type: string; city: string } | null>(null);
  const [showResources, setShowResources] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const {
    isAuthenticated,
    showLoginPrompt,
    dismissLoginPrompt,
    incrementInteractions,
    addProject
  } = useAuth();

  // Show login modal when prompted
  useEffect(() => {
    if (showLoginPrompt) {
      setShowLoginModal(true);
    }
  }, [showLoginPrompt]);

  const handleLandingContinue = (businessType: string, city: string) => {
    setBusinessInfo({ type: businessType, city });
    setAppState('assessment');
    incrementInteractions(); // Track interaction

    // Save as project if authenticated
    if (isAuthenticated) {
      addProject({
        name: `${businessType} Project`,
        businessType,
        city
      });
    }
  };

  const handleAssessmentComplete = () => {
    setAppState('palette');
    incrementInteractions(); // Track interaction
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to start over?')) {
      setAppState('landing');
      setBusinessInfo(null);
      setShowResources(false);
    }
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
    dismissLoginPrompt();
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar - only show when authenticated */}
      {isAuthenticated && <LeftSidebar currentView="home" />}

      {/* Main content */}
      <div className="flex-1 overflow-auto">
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
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={handleCloseLoginModal}
        forced={showLoginPrompt}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
