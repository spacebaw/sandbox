import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  forced?: boolean; // If true, user must login (no close button)
}

export default function LoginModal({ isOpen, onClose, forced = false }: LoginModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        if (!name.trim()) {
          setError('Please enter your name');
          setLoading(false);
          return;
        }
        await register(name, email, password);
      }
      // Close modal on success
      onClose();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setError('');
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={forced ? undefined : onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button - only show if not forced */}
            {!forced && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            )}

            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-b from-green-400 to-green-100 rounded-full mx-auto mb-4" />
              {forced && (
                <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-sm text-green-800">
                    Create an account to save your progress and continue
                  </p>
                </div>
              )}
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {mode === 'login' ? 'Welcome back' : 'Create your account'}
              </h2>
              <p className="text-gray-600 text-sm">
                {mode === 'login'
                  ? 'Sign in to access your projects'
                  : 'Get started with Louisiana Business Assistant'}
              </p>
            </div>

            {/* Error message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 flex items-start space-x-2"
              >
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{error}</p>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 transition-colors"
                    placeholder="John Doe"
                    required
                  />
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 transition-colors"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 transition-colors"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300 text-white font-medium py-3 rounded-lg transition-colors"
              >
                {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            {/* Toggle mode */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
                <button
                  onClick={switchMode}
                  className="text-gray-900 font-medium hover:underline"
                >
                  {mode === 'login' ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
