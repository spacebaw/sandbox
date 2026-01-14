import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export interface Project {
  id: string;
  name: string;
  businessType: string;
  city: string;
  createdAt: Date;
  lastModified: Date;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  projects: Project[];
  interactionCount: number;
  showLoginPrompt: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  incrementInteractions: () => void;
  dismissLoginPrompt: () => void;
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'lastModified'>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const INTERACTION_THRESHOLD = 3; // Show login after 3 interactions

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [interactionCount, setInteractionCount] = useState(0);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login - in production, this would call an API
    // For now, just check localStorage for registered users
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const foundUser = users.find((u: any) => u.email === email && u.password === password);

    if (foundUser) {
      const userData = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        createdAt: new Date(foundUser.createdAt)
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setShowLoginPrompt(false);
    } else {
      throw new Error('Invalid email or password');
    }
  };

  const register = async (name: string, email: string, password: string) => {
    // Mock registration - in production, this would call an API
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

    // Check if email already exists
    if (users.some((u: any) => u.email === email)) {
      throw new Error('Email already registered');
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, // In production, this would be hashed on the backend
      createdAt: new Date()
    };

    users.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(users));

    // Auto-login after registration
    const userData = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt
    };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setShowLoginPrompt(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setProjects([]);
    setInteractionCount(0);
  };

  const incrementInteractions = () => {
    if (!user) {
      const newCount = interactionCount + 1;
      setInteractionCount(newCount);

      if (newCount >= INTERACTION_THRESHOLD) {
        setShowLoginPrompt(true);
      }
    }
  };

  const dismissLoginPrompt = () => {
    setShowLoginPrompt(false);
  };

  const addProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'lastModified'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: new Date(),
      lastModified: new Date()
    };

    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        projects,
        interactionCount,
        showLoginPrompt,
        login,
        register,
        logout,
        incrementInteractions,
        dismissLoginPrompt,
        addProject
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
