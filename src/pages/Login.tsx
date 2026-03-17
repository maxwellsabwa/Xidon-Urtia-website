import React from 'react';
import { auth, googleProvider, signInWithPopup } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { LogIn } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <main className="pt-32 pb-24 min-h-screen flex items-center justify-center bg-cream">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-12 rounded-3xl luxury-shadow max-w-md w-full text-center"
      >
        <span className="text-xs uppercase tracking-[0.3em] text-royal-blue font-bold mb-4 block">Welcome Back</span>
        <h1 className="text-4xl font-serif mb-8">Admin <span className="italic text-royal-blue">Portal</span></h1>
        
        <p className="text-ink/60 mb-10">
          Please sign in with your Google account to access the administrative dashboard.
        </p>

        <button 
          onClick={handleLogin}
          className="w-full bg-royal-blue text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-ink transition-all shadow-lg"
        >
          <LogIn size={20} />
          Sign in with Google
        </button>
      </motion.div>
    </main>
  );
};

export default Login;
