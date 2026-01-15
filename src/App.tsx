import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LandingPage from './components/LandingPage';
import ChatInterface from './components/ChatInterface';
import ResourcesPanel from './components/ResourcesPanel';
import LoginModal from './components/LoginModal';
import LeftSidebar from './components/LeftSidebar';
import ProgressTracker, { ProgressItem } from './components/ProgressTracker';
import { louisianaResources } from './data/resources';
import { Message } from './types';
import { sendMessage } from './services/aiService';
import { RotateCcw, BookOpen } from 'lucide-react';

type AppState = 'landing' | 'chat';

function AppContent() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [businessInfo, setBusinessInfo] = useState<{ type: string; city: string } | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [progressItems, setProgressItems] = useState<ProgressItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
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

  const handleLandingContinue = async (businessType: string, city: string, initialQuery?: string) => {
    setBusinessInfo({ type: businessType, city });
    setAppState('chat');
    incrementInteractions(); // Track interaction

    // Save as project if authenticated
    if (isAuthenticated) {
      addProject({
        name: `${businessType} Project`,
        businessType,
        city
      });
    }

    // If there's an initial query, send it immediately
    if (initialQuery) {
      await handleSendMessage(initialQuery, businessType);
    }
  };

  const handleSendMessage = async (content: string, businessType?: string) => {
    const bizType = businessType || businessInfo?.type || 'business';

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Build conversation history
      const conversationHistory = messages.map(m => ({
        role: m.role,
        content: m.content
      }));

      // Create assessment answers for context
      const assessmentAnswers = {
        stage: 'idea' as const,
        industry: bizType,
        mainChallenge: content,
        hasBusinessPlan: null
      };

      // Get AI response with progress items
      const response = await sendMessage(content, conversationHistory, assessmentAnswers);

      // Add assistant message
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.message,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);

      // Update progress items - merge new items with existing ones
      if (response.progressItems.length > 0) {
        setProgressItems(prev => {
          // Create a map of existing items by title to avoid duplicates
          const existingMap = new Map(prev.map(item => [item.title.toLowerCase(), item]));

          // Add new items that don't exist yet
          const newItems = response.progressItems.filter(
            item => !existingMap.has(item.title.toLowerCase())
          );

          return [...prev, ...newItems];
        });
      }

      incrementInteractions(); // Track interaction
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I encountered an error processing your message. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleProgress = (id: string) => {
    setProgressItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to start over?')) {
      setAppState('landing');
      setBusinessInfo(null);
      setMessages([]);
      setProgressItems([]);
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
        {appState === 'landing' && (
          <LandingPage onContinue={handleLandingContinue} />
        )}

        {appState === 'chat' && (
          <div className="h-full flex flex-col">
            {/* Header with reset button */}
            <div className="border-b border-gray-200 p-4 bg-white flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-gray-900">Louisiana Business Assistant</h2>
                {businessInfo && (
                  <p className="text-sm text-gray-600">{businessInfo.type} in {businessInfo.city}</p>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowResources(true)}
                  className="bg-white hover:bg-gray-50 text-gray-700 font-medium px-4 py-2 rounded-lg transition-all border border-gray-200 flex items-center space-x-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span className="hidden md:inline">Resources</span>
                </button>
                <button
                  onClick={handleReset}
                  className="bg-white hover:bg-gray-50 text-gray-700 font-medium px-4 py-2 rounded-lg transition-all border border-gray-200 flex items-center space-x-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span className="hidden md:inline">Start Over</span>
                </button>
              </div>
            </div>

            {/* Chat interface with progress tracker */}
            <div className="flex-1 flex overflow-hidden">
              <div className="flex-1">
                <ChatInterface
                  messages={messages}
                  onSendMessage={(content) => handleSendMessage(content)}
                  isLoading={isLoading}
                />
              </div>
              {/* Progress tracker sidebar */}
              <div className="w-80 border-l border-gray-200 bg-white hidden lg:block">
                <ProgressTracker
                  items={progressItems}
                  onToggle={handleToggleProgress}
                  title="Your Action Items"
                />
              </div>
            </div>
          </div>
        )}

        {/* Resources panel */}
        <ResourcesPanel
          resources={louisianaResources}
          isOpen={showResources}
          onClose={() => setShowResources(false)}
        />
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
