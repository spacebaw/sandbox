import { ArrowRight } from 'lucide-react';

interface HomePageProps {
  onGetStarted: () => void;
}

function HomePage({ onGetStarted }: HomePageProps) {
  return (
    <div className="min-h-screen bg-slate">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background accents */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy/30 rounded-full blur-3xl"></div>
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-48">
          <div className="text-center">
            {/* Main Headline */}
            <h1 className="font-inter font-black text-6xl sm:text-7xl lg:text-8xl xl:text-9xl text-white mb-8 animate-tighten leading-[0.9]">
              Enough thinking.
              <br />
              <span className="text-teal">Start building.</span>
            </h1>

            {/* Subheading */}
            <p className="font-inter text-xl sm:text-2xl lg:text-3xl text-white/80 max-w-3xl mx-auto mb-12 font-light">
              Louisiana Innovation Labs turns your ideas into reality.
              Get AI-powered guidance tailored for Louisiana entrepreneurs.
            </p>

            {/* CTA Button */}
            <button
              onClick={onGetStarted}
              className="group inline-flex items-center space-x-3 bg-teal hover:bg-teal/90 text-navy font-inter font-bold text-lg px-10 py-5 rounded-lg transition-all duration-300 shadow-industrial-lg hover:shadow-teal/50 hover:scale-105"
            >
              <span>Launch Your Vision</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Supporting text */}
            <p className="mt-8 text-white/60 font-inter text-sm">
              Free tools and resources for Louisiana small businesses
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative bg-navy/40 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-teal/20 rounded-lg mb-4">
                <span className="text-3xl">💡</span>
              </div>
              <h3 className="font-inter font-bold text-xl text-white mb-2">Smart Assessment</h3>
              <p className="text-white/70 font-inter">
                Get personalized guidance based on your business stage and industry
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-teal/20 rounded-lg mb-4">
                <span className="text-3xl">🤖</span>
              </div>
              <h3 className="font-inter font-bold text-xl text-white mb-2">AI-Powered Chat</h3>
              <p className="text-white/70 font-inter">
                Ask questions naturally and get instant, expert-level answers
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-teal/20 rounded-lg mb-4">
                <span className="text-3xl">📚</span>
              </div>
              <h3 className="font-inter font-bold text-xl text-white mb-2">Louisiana Resources</h3>
              <p className="text-white/70 font-inter">
                Access curated state and local resources to support your growth
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
