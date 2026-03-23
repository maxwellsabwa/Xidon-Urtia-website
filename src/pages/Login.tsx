import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { LogIn, User, Lock, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        login(data.user);
        navigate('/admin');
      } else {
        setError(data.message || 'Invalid credentials.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Connection error. Please try again.');
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
            <label className="text-[10px] uppercase tracking-widest text-ink/40 mb-1 block">Username</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/30" size={18} />
              <input 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
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
      </motion.div>
    </main>
  );
};

export default Login;
