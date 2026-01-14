import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import {
  Home,
  FolderOpen,
  Clock,
  Settings,
  LogOut,
  Plus,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';

interface LeftSidebarProps {
  onNavigate?: (view: string) => void;
  currentView?: string;
}

export default function LeftSidebar({ onNavigate, currentView = 'home' }: LeftSidebarProps) {
  const { user, projects, logout } = useAuth();
  const [isCollapsed] = useState(false);

  const menuItems = [
    { id: 'home', icon: Home, label: 'Home', count: null },
    { id: 'projects', icon: FolderOpen, label: 'Projects', count: projects.length },
    { id: 'history', icon: Clock, label: 'History', count: null },
    { id: 'settings', icon: Settings, label: 'Settings', count: null }
  ];

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={`${
        isCollapsed ? 'w-20' : 'w-64'
      } bg-gray-50 border-r border-gray-200 flex flex-col transition-all duration-300`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-b from-green-400 to-green-100 rounded-full" />
              <span className="font-semibold text-gray-900">Louisiana</span>
            </div>
          )}
          {isCollapsed && (
            <div className="w-8 h-8 bg-gradient-to-b from-green-400 to-green-100 rounded-full mx-auto" />
          )}
        </div>
      </div>

      {/* User info */}
      {user && (
        <div className="p-4 border-b border-gray-200">
          <div className={`${isCollapsed ? 'text-center' : ''}`}>
            <div className={`${
              isCollapsed ? 'w-10 h-10 mx-auto' : 'w-10 h-10'
            } bg-gray-200 rounded-full flex items-center justify-center mb-2`}>
              <span className="text-sm font-medium text-gray-700">
                {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
              </span>
            </div>
            {!isCollapsed && (
              <>
                <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                <p className="text-xs text-gray-600 truncate">{user.email}</p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate?.(item.id)}
              className={`w-full flex items-center ${
                isCollapsed ? 'justify-center' : 'justify-between'
              } px-3 py-2.5 rounded-lg transition-colors ${
                isActive
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-700 hover:bg-white/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className="w-5 h-5" />
                {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
              </div>
              {!isCollapsed && item.count !== null && item.count > 0 && (
                <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Recent Projects */}
      {!isCollapsed && projects.length > 0 && (
        <div className="px-3 pb-3">
          <div className="mb-2 px-3 flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500 uppercase">Recent Projects</span>
          </div>
          <div className="space-y-1">
            {projects.slice(0, 3).map((project) => (
              <button
                key={project.id}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/50 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{project.name}</p>
                    <p className="text-xs text-gray-600 truncate">{project.city}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* New Project button */}
      <div className="p-3 border-t border-gray-200">
        <button
          className={`w-full flex items-center ${
            isCollapsed ? 'justify-center' : 'justify-center space-x-2'
          } px-3 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors`}
        >
          <Plus className="w-5 h-5" />
          {!isCollapsed && <span className="text-sm font-medium">New Project</span>}
        </button>
      </div>

      {/* Logout */}
      <div className="p-3 border-t border-gray-200">
        <button
          onClick={logout}
          className={`w-full flex items-center ${
            isCollapsed ? 'justify-center' : 'space-x-3'
          } px-3 py-2.5 text-gray-700 hover:bg-white/50 rounded-lg transition-colors`}
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </motion.div>
  );
}
