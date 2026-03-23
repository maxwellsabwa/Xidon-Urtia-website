import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { UserPlus, User, Mail, Lock, ShieldCheck } from 'lucide-react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create user profile in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: 'user', // Default role
        createdAt: new Date().toISOString()
      });

      navigate('/admin'); // Redirect to dashboard or profile
    } catch (error: any) {
      console.error('Sign up failed:', error);
      if (error.code === 'auth/email-already-in-use') {
        setError('This email is already in use.');
      } else if (error.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else if (error.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else {
        setError('Sign up failed. Please try again.');
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
          <UserPlus className="text-royal-blue" size={32} />
        </div>
        
        <span className="text-xs uppercase tracking-[0.3em] text-royal-blue font-bold mb-2 block">Join the Sanctuary</span>
        <h1 className="text-3xl font-serif mb-8">Create <span className="italic text-royal-blue">Account</span></h1>
        
        {error && (
          <div className="bg-red-50 text-red-600 text-xs p-3 rounded-lg mb-6 text-left">
            {error}
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-4 text-left">
          <div>
            <label className="text-[10px] uppercase tracking-widest text-ink/40 mb-1 block">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/30" size={18} />
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
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
                placeholder="Create a password"
                className="w-full bg-cream/50 border border-black/5 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-royal-blue transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-widest text-ink/40 mb-1 block">Confirm Password</label>
            <div className="relative">
              <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/30" size={18} />
              <input 
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full bg-cream/50 border border-black/5 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-royal-blue transition-colors"
                required
              />
            </div>
          </div>
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-royal-blue text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-ink transition-all flex items-center justify-center gap-3 shadow-lg shadow-royal-blue/20 disabled:opacity-50 mt-4"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>Sign Up <UserPlus size={18} /></>
            )}
          </button>
        </form>

        <p className="mt-8 text-xs text-ink/40">
          Already have an account? <Link to="/login" className="text-royal-blue font-bold hover:underline">Login</Link>
        </p>
      </motion.div>
    </main>
  );
};

export default SignUp;
