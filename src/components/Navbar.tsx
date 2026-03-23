import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Search, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

import Logo from './Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount } = useCart();
  const { user, role, logout } = useAuth();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Pads', path: '/pads' },
    { name: 'Tissues', path: '/tissues' },
    { name: 'Furniture', path: '/furniture' },
    { name: 'Rugs', path: '/rugs' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  if (role === 'admin') {
    navLinks.push({ name: 'Admin', path: '/admin' });
  }

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md py-3 shadow-md' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link to="/">
            <Logo variant={scrolled ? 'dark' : 'brand'} className="scale-90 sm:scale-100 origin-left" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-xs uppercase tracking-[0.2em] hover:text-royal-blue transition-colors ${location.pathname === link.path ? 'text-royal-blue font-bold' : 'text-ink/70'}`}
              >
                {link.name}
              </Link>
            ))}
            {user && (
              <button 
                onClick={handleLogout}
                className="text-xs uppercase tracking-[0.2em] text-ink/70 hover:text-royal-blue transition-colors cursor-pointer"
              >
                Logout
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <Link to={user ? (role === 'admin' ? '/admin' : '/') : '/login'} className="p-2 hover:bg-black/5 rounded-full transition-colors">
              <UserIcon size={20} className={user ? 'text-royal-blue' : ''} />
            </Link>
            <Link to="/cart" className="p-2 hover:bg-black/5 rounded-full transition-colors relative">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={cartCount}
                  className="absolute top-0 right-0 w-4 h-4 bg-royal-blue text-white text-[10px] flex items-center justify-center rounded-full border border-white"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>
            <button 
              className="md:hidden p-2 hover:bg-black/5 rounded-full transition-colors"
              onClick={() => setIsOpen(true)}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-cream z-[70] shadow-2xl p-8 flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="font-serif text-xl tracking-widest uppercase">Menu</span>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-black/5 rounded-full">
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    to={link.path}
                    className={`text-lg uppercase tracking-widest ${location.pathname === link.path ? 'text-royal-blue font-bold' : 'text-ink/70'}`}
                  >
                    {link.name}
                  </Link>
                ))}
                {user && (
                  <button 
                    onClick={handleLogout}
                    className="text-lg uppercase tracking-widest text-left text-ink/70 hover:text-royal-blue transition-colors"
                  >
                    Logout
                  </button>
                )}
              </div>

              <div className="mt-auto pt-8 border-t border-black/5">
                <p className="text-xs uppercase tracking-widest text-ink/40 mb-4">Account</p>
                <Link to={user ? '/admin' : '/login'} className="text-sm font-bold text-royal-blue">
                  {user ? `Logged in as ${role}` : 'Sign In'}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
