import React from 'react';
import { useCart } from '../context/CartContext';
import { motion } from 'motion/react';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, total, cartCount } = useCart();

  if (cartCount === 0) {
    return (
      <div className="pt-32 pb-24 min-h-[70vh] flex flex-col items-center justify-center px-6">
        <div className="w-24 h-24 bg-royal-blue/5 rounded-full flex items-center justify-center mb-8">
          <ShoppingBag size={40} className="text-royal-blue/30" />
        </div>
        <h1 className="text-3xl font-serif mb-4">Your cart is empty</h1>
        <p className="text-ink/60 mb-10 text-center max-w-md">
          It seems you haven't added any of our artisanal pieces to your collection yet.
        </p>
        <Link 
          to="/" 
          className="bg-royal-blue text-white px-10 py-4 text-sm uppercase tracking-widest font-bold hover:bg-ink transition-all"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-cream/30 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-serif mb-12">Your <span className="italic text-royal-blue">Collection</span></h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {cart.map((item) => (
              <motion.div 
                layout
                key={item.id}
                className="bg-white p-6 rounded-3xl shadow-sm flex flex-col sm:flex-row gap-6 items-center"
              >
                <div className="w-32 h-40 rounded-2xl overflow-hidden flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div className="flex-grow text-center sm:text-left">
                  <p className="text-[10px] uppercase tracking-widest text-royal-blue font-bold mb-1">{item.category}</p>
                  <h3 className="text-xl font-serif mb-2">{item.name}</h3>
                  <p className="text-ink/60 text-sm mb-4 line-clamp-1">{item.description}</p>
                  <p className="font-bold text-lg">Ksh. {item.price.toLocaleString()}</p>
                </div>
                
                <div className="flex flex-col items-center sm:items-end gap-4">
                  <div className="flex items-center border border-ink/10 rounded-full px-4 py-2 bg-cream/20">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:text-royal-blue transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="mx-4 font-bold min-w-[20px] text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:text-royal-blue transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 hover:text-red-600 transition-colors flex items-center gap-2 text-xs uppercase tracking-widest font-bold"
                  >
                    <Trash2 size={14} />
                    Remove
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-3xl shadow-xl sticky top-32 border border-royal-blue/5">
              <h2 className="text-2xl font-serif mb-8 uppercase tracking-widest">Summary</h2>
              
              <div className="flex flex-col gap-4 mb-8">
                <div className="flex justify-between text-ink/60">
                  <span>Subtotal ({cartCount} items)</span>
                  <span>Ksh. {total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-ink/60">
                  <span>Shipping</span>
                  <span className="text-emerald-600 font-bold">Free</span>
                </div>
                <div className="h-px bg-ink/5 my-2"></div>
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-royal-blue">Ksh. {total.toLocaleString()}</span>
                </div>
              </div>
              
              <button className="w-full bg-royal-blue text-white py-5 rounded-2xl text-sm uppercase tracking-widest font-bold hover:bg-ink transition-all flex items-center justify-center gap-3 shadow-xl shadow-royal-blue/20">
                Complete Checkout
                <ArrowRight size={18} />
              </button>
              
              <p className="text-[10px] text-center mt-6 text-ink/40 uppercase tracking-widest leading-relaxed">
                Secure payment powered by Xidon Urtia. <br />
                Free delivery on all premium orders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
