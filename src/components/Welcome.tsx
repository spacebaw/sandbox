import { Sparkles, Target, MessageCircle, BookOpen } from 'lucide-react';

interface WelcomeProps {
  onGetStarted: () => void;
}

export default function Welcome({ onGetStarted }: WelcomeProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="max-w-4xl w-full animate-fade-in">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-6 shadow-material-2">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Louisiana Business Assistant
          </h1>
          <p className="text-xl text-gray-700 mb-2">
            Your AI-Powered Guide to Small Business Success
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get personalized guidance, access Louisiana resources, and plan your business journey with the help of artificial intelligence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 shadow-material-2 hover:shadow-material-3 transition-shadow">
            <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Personalized Assessment</h3>
            <p className="text-gray-600 text-sm">
              Tell us about your business stage and get customized guidance tailored to your needs
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-material-2 hover:shadow-material-3 transition-shadow">
            <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">AI-Powered Conversations</h3>
            <p className="text-gray-600 text-sm">
              Ask questions and get instant answers from an AI trained to help small businesses
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-material-2 hover:shadow-material-3 transition-shadow">
            <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Louisiana Resources</h3>
            <p className="text-gray-600 text-sm">
              Access curated state and local resources designed to support your business
            </p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onGetStarted}
            className="bg-primary hover:bg-primary-dark text-white font-bold py-4 px-8 rounded-lg text-lg transition-all transform hover:scale-105 shadow-material-2 hover:shadow-material-3"
          >
            Get Started
          </button>
          <p className="text-gray-500 text-sm mt-4">
            100% Free • No Account Required • Privacy Focused
          </p>
        </div>

        <div className="mt-12 bg-white rounded-lg p-6 shadow-material-1 border border-gray-200">
          <h4 className="font-semibold mb-3 flex items-center text-gray-900">
            <Sparkles className="w-5 h-5 mr-2 text-accent" />
            What is AI and how can it help me?
          </h4>
          <p className="text-gray-600 text-sm leading-relaxed">
            Artificial Intelligence (AI) is like having a knowledgeable business advisor available 24/7.
            This tool uses AI to understand your questions and provide helpful guidance based on vast knowledge
            about business planning, Louisiana resources, and entrepreneurship. Think of it as a conversation
            with an expert who's here to help you succeed - just type your questions naturally, as if you're
            talking to a friend.
          </p>
        </div>
      </div>
    </div>
  );
}
