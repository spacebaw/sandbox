'use client'

import { ArrowRight, Zap, Target, Rocket } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background gradient accent */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal/5 via-transparent to-slate/30 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative">
          <div className="max-w-4xl">
            {/* Animated headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6 animate-fade-in-up">
              <span className="text-white">Enough thinking.</span>
              <br />
              <span className="text-teal">Start building.</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Transform your ideas into reality with Louisiana Innovation Labs.
              We deliver executive-grade solutions that drive results, not presentations.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <button className="group bg-teal hover:bg-teal-dark text-navy px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-teal/50 flex items-center justify-center gap-2">
                Launch Your Project
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>
              <button className="bg-transparent border-2 border-teal text-teal hover:bg-teal/10 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200">
                View Case Studies
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl">
            <div className="bg-slate/50 backdrop-blur border border-teal/20 rounded-lg p-6 animate-slide-in" style={{ animationDelay: '0.6s' }}>
              <Zap className="text-teal mb-3" size={32} />
              <div className="text-3xl font-bold text-white mb-1">Fast</div>
              <div className="text-gray-400 text-sm font-medium">Rapid deployment cycles</div>
            </div>

            <div className="bg-slate/50 backdrop-blur border border-teal/20 rounded-lg p-6 animate-slide-in" style={{ animationDelay: '0.8s' }}>
              <Target className="text-teal mb-3" size={32} />
              <div className="text-3xl font-bold text-white mb-1">Precise</div>
              <div className="text-gray-400 text-sm font-medium">Targeted solutions</div>
            </div>

            <div className="bg-slate/50 backdrop-blur border border-teal/20 rounded-lg p-6 animate-slide-in" style={{ animationDelay: '1s' }}>
              <Rocket className="text-teal mb-3" size={32} />
              <div className="text-3xl font-bold text-white mb-1">Scalable</div>
              <div className="text-gray-400 text-sm font-medium">Built for growth</div>
            </div>
          </div>
        </div>

        {/* Decorative grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00BFA610_1px,transparent_1px),linear-gradient(to_bottom,#00BFA610_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-20" />
      </section>

      {/* Additional sections can be added here */}
      <section id="solutions" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-4">Solutions That Scale</h2>
          <p className="text-gray-300 text-lg max-w-3xl">
            From concept to execution, we build systems that work.
            No fluff, no delays—just results.
          </p>
        </div>
      </section>
    </div>
  )
}
