import { useState } from 'react';
import HomePage from './components/HomePage';
import Assessment from './components/Assessment';
import ChatInterface from './components/ChatInterface';
import PromptOptions from './components/PromptOptions';
import ResourcesPanel from './components/ResourcesPanel';
import { AssessmentAnswers, Message } from './types';
import { promptOptionsByStage } from './data/promptOptions';
import { louisianaResources } from './data/resources';
import { sendMessage } from './services/aiService';
import { BookOpen, RotateCcw, Zap } from 'lucide-react';

type AppState = 'welcome' | 'assessment' | 'chat';

function App() {
  const [appState, setAppState] = useState<AppState>('welcome');
  const [assessmentAnswers, setAssessmentAnswers] = useState<AssessmentAnswers | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResources, setShowResources] = useState(false);

  const handleGetStarted = () => {
    setAppState('assessment');
  };

  const handleAssessmentComplete = (answers: AssessmentAnswers) => {
    setAssessmentAnswers(answers);
    setAppState('chat');

    // Send initial welcome message based on assessment
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: getWelcomeMessage(answers),
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  };

  const handleSendMessage = async (content: string) => {
    if (!assessmentAnswers) return;

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
      // Build conversation history for API
      const conversationHistory = messages.map(m => ({
        role: m.role,
        content: m.content
      }));

      // Get AI response
      const responseText = await sendMessage(content, conversationHistory, assessmentAnswers);

      // Add assistant message
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
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

  const handleSelectPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to start over? This will clear your conversation.')) {
      setAppState('welcome');
      setAssessmentAnswers(null);
      setMessages([]);
      setShowResources(false);
    }
  };

  // Render function for fixed header
  const renderHeader = () => (
    <header className="fixed top-0 left-0 right-0 bg-navy border-b border-teal/20 shadow-industrial-lg z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Zap className="w-8 h-8 text-teal" />
          <h1 className="font-inter font-bold text-2xl text-white">Louisiana Innovation Labs</h1>
        </div>
        {appState !== 'welcome' && (
          <div className="flex space-x-3">
            {appState === 'chat' && (
              <button
                onClick={() => setShowResources(true)}
                className="bg-teal hover:bg-teal/90 text-navy font-inter font-semibold px-4 py-2 rounded-lg transition-all shadow-industrial flex items-center space-x-2"
              >
                <BookOpen className="w-5 h-5" />
                <span>Resources</span>
              </button>
            )}
            <button
              onClick={handleReset}
              className="bg-navy hover:bg-navy/80 text-white border border-teal/30 font-inter font-semibold px-4 py-2 rounded-lg transition-all shadow-industrial flex items-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Start Over</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );

  if (appState === 'welcome') {
    return (
      <div className="min-h-screen">
        {renderHeader()}
        <HomePage onGetStarted={handleGetStarted} />
      </div>
    );
  }

  if (appState === 'assessment') {
    return (
      <div className="min-h-screen bg-slate">
        {renderHeader()}
        <div className="pt-20">
          <Assessment onComplete={handleAssessmentComplete} />
        </div>
      </div>
    );
  }

  // Chat view
  const promptOptions = assessmentAnswers?.stage
    ? promptOptionsByStage[assessmentAnswers.stage]
    : [];

  return (
    <div className="h-screen flex flex-col bg-slate">
      {/* Header */}
      {renderHeader()}

      {/* Main content with padding for fixed header */}
      <div className="flex-1 overflow-hidden bg-slate pt-20">
        <div className="max-w-7xl mx-auto h-full flex flex-col lg:flex-row">
          {/* Left sidebar - Prompt options (hidden on mobile when there are messages) */}
          <div className={`lg:w-96 bg-navy/40 border-r border-teal/20 p-4 overflow-y-auto ${messages.length > 1 ? 'hidden lg:block' : ''}`}>
            <PromptOptions
              options={promptOptions}
              onSelectPrompt={handleSelectPrompt}
            />

            {/* Quick tips */}
            <div className="mt-6 bg-teal/10 rounded-lg p-4 border border-teal/30">
              <h4 className="font-inter font-semibold text-teal mb-2">💡 Quick Tips</h4>
              <ul className="text-sm text-white/80 font-inter space-y-2">
                <li>• Ask questions in your own words</li>
                <li>• Be specific about your situation</li>
                <li>• Request examples or clarification anytime</li>
                <li>• Use suggested topics to get started</li>
              </ul>
            </div>
          </div>

          {/* Chat area */}
          <div className="flex-1 flex flex-col bg-slate">
            <ChatInterface
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Resources panel */}
      <ResourcesPanel
        resources={louisianaResources}
        isOpen={showResources}
        onClose={() => setShowResources(false)}
      />
    </div>
  );
}

function getWelcomeMessage(answers: AssessmentAnswers): string {
  const stageMessages = {
    idea: "exploring your business idea",
    startup: "launching your new business",
    established: "running your established business",
    growth: "growing and scaling your business",
    transition: "navigating this business transition"
  };

  const stageText = answers.stage ? stageMessages[answers.stage] : "your business journey";

  return `Welcome! I'm here to help you with ${stageText}.

I understand your main focus is on **${answers.mainChallenge}** in the **${answers.industry}** industry.

I can help you with:
• Business planning and strategy
• Louisiana-specific regulations and resources
• Marketing and customer acquisition
• Financial planning and funding options
• Operations and management
• And much more!

**To get started**, you can:
1. Choose one of the suggested topics on the left
2. Or simply type any question you have about your business

How can I help you today?`;
}

export default App;
