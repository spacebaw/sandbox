import { Sparkles, Target, MessageCircle, BookOpen } from 'lucide-react';

interface WelcomeProps {
  onGetStarted: () => void;
}

export default function Welcome({ onGetStarted }: WelcomeProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-louisiana-blue to-blue-900">
      <div className="max-w-4xl w-full animate-fade-in">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-louisiana-gold rounded-full mb-6">
            <Sparkles className="w-10 h-10 text-louisiana-blue" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Louisiana Business Assistant
          </h1>
          <p className="text-xl text-blue-100 mb-2">
            Your AI-Powered Guide to Small Business Success
          </p>
          <p className="text-blue-200 max-w-2xl mx-auto">
            Get personalized guidance, access Louisiana resources, and plan your business journey with the help of artificial intelligence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
            <Target className="w-8 h-8 mb-4 text-louisiana-gold" />
            <h3 className="text-lg font-semibold mb-2">Personalized Assessment</h3>
            <p className="text-blue-100 text-sm">
              Tell us about your business stage and get customized guidance tailored to your needs
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
            <MessageCircle className="w-8 h-8 mb-4 text-louisiana-gold" />
            <h3 className="text-lg font-semibold mb-2">AI-Powered Conversations</h3>
            <p className="text-blue-100 text-sm">
              Ask questions and get instant answers from an AI trained to help small businesses
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
            <BookOpen className="w-8 h-8 mb-4 text-louisiana-gold" />
            <h3 className="text-lg font-semibold mb-2">Louisiana Resources</h3>
            <p className="text-blue-100 text-sm">
              Access curated state and local resources designed to support your business
            </p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onGetStarted}
            className="bg-louisiana-gold hover:bg-yellow-500 text-louisiana-blue font-bold py-4 px-8 rounded-lg text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Get Started
          </button>
          <p className="text-blue-200 text-sm mt-4">
            100% Free • No Account Required • Privacy Focused
          </p>
        </div>

        <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
          <h4 className="font-semibold mb-3 flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-louisiana-gold" />
            What is AI and how can it help me?
          </h4>
          <p className="text-blue-100 text-sm leading-relaxed">
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
