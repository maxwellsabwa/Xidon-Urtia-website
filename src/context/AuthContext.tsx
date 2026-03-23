import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface User {
  username: string;
  role: 'admin';
}

interface AuthContextType {
  user: User | null;
  role: 'admin' | null;
  loading: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<'admin' | null>(null);
  const [loading, setLoading] = useState(true);

  const login = (userData: User) => {
    setUser(userData);
    setRole(userData.role);
    localStorage.setItem('admin_session', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem('admin_session');
  };

  useEffect(() => {
    const savedSession = localStorage.getItem('admin_session');
    if (savedSession) {
      try {
        const userData = JSON.parse(savedSession);
        setUser(userData);
        setRole(userData.role);
      } catch (error) {
        console.error("Failed to parse saved session:", error);
        localStorage.removeItem('admin_session');
      }
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
