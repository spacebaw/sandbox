'use client'

import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed w-full top-0 z-50 bg-navy/95 backdrop-blur-sm border-b border-teal/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              <span className="text-white">Louisiana</span>{' '}
              <span className="text-teal">Innovation Labs</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#solutions"
              className="text-gray-300 hover:text-teal transition-colors duration-200 text-sm font-medium tracking-wide"
            >
              Solutions
            </a>
            <a
              href="#about"
              className="text-gray-300 hover:text-teal transition-colors duration-200 text-sm font-medium tracking-wide"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-gray-300 hover:text-teal transition-colors duration-200 text-sm font-medium tracking-wide"
            >
              Contact
            </a>
            <button className="bg-teal hover:bg-teal-dark text-navy px-5 py-2 rounded font-semibold text-sm transition-all duration-200 shadow-lg hover:shadow-teal/50">
              Get Started
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white hover:text-teal transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate border-t border-teal/20">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <a
              href="#solutions"
              className="block px-3 py-2 text-gray-300 hover:text-teal hover:bg-navy/50 rounded transition-colors text-sm font-medium"
            >
              Solutions
            </a>
            <a
              href="#about"
              className="block px-3 py-2 text-gray-300 hover:text-teal hover:bg-navy/50 rounded transition-colors text-sm font-medium"
            >
              About
            </a>
            <a
              href="#contact"
              className="block px-3 py-2 text-gray-300 hover:text-teal hover:bg-navy/50 rounded transition-colors text-sm font-medium"
            >
              Contact
            </a>
            <button className="w-full mt-2 bg-teal hover:bg-teal-dark text-navy px-5 py-2 rounded font-semibold text-sm transition-all">
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
