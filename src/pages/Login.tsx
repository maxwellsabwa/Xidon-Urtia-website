import React, { useState } from 'react';
import { auth, googleProvider, signInWithPopup, signInWithEmailAndPassword } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { LogIn, Mail, Lock, ShieldCheck } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isEmailLogin, setIsEmailLogin] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      setError('Google login failed. Please try again.');
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error: any) {
      console.error('Login failed:', error);
      setError(error.message || 'Invalid credentials.');
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

        {!isEmailLogin ? (
          <div className="space-y-4">
            <button 
              onClick={handleGoogleLogin}
              className="w-full bg-royal-blue text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-ink transition-all shadow-lg"
            >
              <LogIn size={20} />
              Sign in with Google
            </button>
            
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-black/5"></div></div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest"><span className="bg-white px-4 text-ink/30">Or</span></div>
            </div>

            <button 
              onClick={() => setIsEmailLogin(true)}
              className="w-full border border-black/10 text-ink py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-black/5 transition-all"
            >
              <Mail size={20} />
              Sign in with Email
            </button>
          </div>
        ) : (
          <form onSubmit={handleEmailLogin} className="space-y-4 text-left">
            <div>
              <label className="text-[10px] uppercase tracking-widest text-ink/40 mb-1 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/30" size={18} />
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@xidonurtia.com"
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
              className="w-full bg-royal-blue text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-ink transition-all shadow-lg mt-6"
            >
              Login to Dashboard
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-black/5"></div></div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest"><span className="bg-white px-4 text-ink/30">Quick Access</span></div>
            </div>

            <button 
              type="button"
              onClick={() => {
                setEmail('admin@xidonurtia.com');
                setPassword('admin123');
              }}
              className="w-full bg-ink text-white py-3 rounded-xl text-xs uppercase tracking-widest font-bold hover:bg-royal-blue transition-all"
            >
              Autofill Demo Admin
            </button>

            <button 
              type="button"
              onClick={() => setIsEmailLogin(false)}
              className="w-full text-xs uppercase tracking-widest text-ink/40 hover:text-royal-blue transition-colors mt-4"
            >
              Back to Google Login
            </button>
          </form>
        )}
      </motion.div>
    </main>
  );
};

export default Login;
