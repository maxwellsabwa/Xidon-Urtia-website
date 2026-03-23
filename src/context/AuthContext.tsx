import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { auth, db, onAuthStateChanged } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface User {
  uid: string;
  email: string | null;
  username?: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  role: 'admin' | 'user' | null;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<'admin' | 'user' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Check for admin role in Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        let userRole: 'admin' | 'user' = 'user';
        
        if (userDoc.exists()) {
          userRole = userDoc.data().role || 'user';
        } else if (firebaseUser.email === 'maxwellsabwa@gmail.com' || firebaseUser.email?.includes('admin@luxury.com')) {
          // Default admin for the owner - bootstrap if not exists
          userRole = 'admin';
          try {
            await setDoc(doc(db, 'users', firebaseUser.uid), {
              email: firebaseUser.email,
              role: 'admin',
              createdAt: new Date().toISOString()
            }, { merge: true });
          } catch (e) {
            console.error("Failed to bootstrap admin role:", e);
          }
        }

        const userData: User = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          role: userRole
        };

        setUser(userData);
        setRole(userRole);
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = () => {
    auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, logout }}>
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
