import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { LogIn, User, Lock, ShieldCheck } from 'lucide-react';
import { auth, signInWithEmailAndPassword } from '../firebase';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // Map usernames to dummy emails if they don't look like emails
      let loginEmail = email;
      if (!email.includes('@')) {
        if (email === 'admin') loginEmail = 'admin@luxury.com';
        else if (email === 'knight') loginEmail = 'knight@luxury.com';
        else loginEmail = `${email}@luxury.com`;
      }

      await signInWithEmailAndPassword(auth, loginEmail, password);
      navigate('/admin');
    } catch (error: any) {
      console.error('Login failed:', error);
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        setError('Invalid credentials. Please check your email/username and password.');
      } else if (error.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-32 pb-24 min-h-screen flex items-center justify-center bg-cream px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 sm:p-12 rounded-3xl luxury-shadow max-w-md w-full text-center"
      >
        <div className="w-16 h-16 bg-royal-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="text-royal-blue" size={32} />
        </div>
        
        <span className="text-xs uppercase tracking-[0.3em] text-royal-blue font-bold mb-2 block">Secure Access</span>
        <h1 className="text-3xl font-serif mb-8">Admin <span className="italic text-royal-blue">Portal</span></h1>
        
        {error && (
          <div className="bg-red-50 text-red-600 text-xs p-3 rounded-lg mb-6 text-left">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-left">
          <div>
            <label className="text-[10px] uppercase tracking-widest text-ink/40 mb-1 block">Email or Username</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/30" size={18} />
              <input 
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email or username"
                className="w-full bg-cream/50 border border-black/5 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-royal-blue transition-colors"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="text-[10px] uppercase tracking-widest text-ink/40 mb-1 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/30" size={18} />
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-cream/50 border border-black/5 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-royal-blue transition-colors"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-royal-blue text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-ink transition-all shadow-lg mt-6 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : (
              <>
                <LogIn size={20} />
                Login to Dashboard
              </>
            )}
          </button>
        </form>
        <div className="mt-8 pt-8 border-t border-black/5">
          <p className="text-[10px] text-ink/40 uppercase tracking-widest leading-relaxed">
            Note: Admin accounts must be created in the Firebase Console. 
            Use your registered email or mapped username to access.
          </p>
        </div>
      </motion.div>
    </main>
  );
};

export default Login;
