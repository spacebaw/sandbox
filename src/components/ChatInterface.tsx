import { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { ArrowRight, Loader } from 'lucide-react';

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
  isLoading: boolean;
}

export default function ChatInterface({ messages, onSendMessage, isLoading }: ChatInterfaceProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-12 max-w-2xl mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-b from-green-400 to-green-100 rounded-full" />
            <p className="text-lg font-semibold mb-2 text-gray-900">How can I help you today?</p>
            <p className="text-sm text-gray-600">Ask me anything about starting or growing your Louisiana business.</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex space-x-3 max-w-3xl ${
                  message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.role === 'user'
                      ? 'bg-gray-900 text-white text-xs font-medium'
                      : 'bg-gradient-to-b from-green-400 to-green-100'
                  }`}
                >
                  {message.role === 'user' ? 'U' : 'AI'}
                </div>
                <div
                  className={`rounded-xl p-4 ${
                    message.role === 'user'
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-50 border border-gray-200 text-gray-900'
                  }`}
                >
                  <div className="whitespace-pre-wrap leading-relaxed text-sm">
                    {message.content}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex space-x-3 max-w-3xl">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-b from-green-400 to-green-100 flex items-center justify-center text-xs">
                AI
              </div>
              <div className="rounded-xl p-4 bg-gray-50 border border-gray-200">
                <Loader className="w-5 h-5 text-gray-900 animate-spin" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-4 md:p-6 bg-white">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
              className="w-full px-6 py-4 pr-14 text-base text-gray-900 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-gray-300 transition-colors placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-200 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              <ArrowRight className="w-5 h-5 text-white" />
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-3 text-center">
            Louisiana Business Assistant can make mistakes. Please verify important information.
          </p>
        </form>
      </div>
    </div>
  );
}
