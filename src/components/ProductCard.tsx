import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Heart, Check, ExternalLink } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-white mb-6 luxury-shadow rounded-2xl">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
        </Link>
        
        <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          <Link 
            to={`/product/${product.id}`}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg hover:bg-royal-blue hover:text-white transition-colors"
          >
            <ExternalLink size={18} />
          </Link>
          <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg hover:bg-luxury-pink transition-colors">
            <Heart size={18} />
          </button>
          <button 
            onClick={handleAddToCart}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg hover:bg-royal-blue hover:text-white transition-colors"
          >
            <ShoppingBag size={18} />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/20 to-transparent">
          <button 
            onClick={handleAddToCart}
            className="w-full bg-white py-3 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-ink hover:text-white transition-colors flex items-center justify-center gap-2"
          >
            {isAdded ? (
              <>
                <Check size={14} className="text-royal-blue" />
                Added to Cart
              </>
            ) : (
              'Add to Cart'
            )}
          </button>
        </div>

        <AnimatePresence>
          {isAdded && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute top-4 left-4 bg-royal-blue text-white px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold shadow-lg flex items-center gap-2"
            >
              <Check size={12} />
              Added
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="text-center">
        <p className="text-[10px] uppercase tracking-widest text-ink/40 mb-1">{product.category}</p>
        <h3 className="font-serif text-lg mb-2 group-hover:text-gold transition-colors">{product.name}</h3>
        <p className="font-medium text-ink/80">{product.price.toString().startsWith('Ksh.') ? product.price : `Ksh. ${product.price}`}</p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
