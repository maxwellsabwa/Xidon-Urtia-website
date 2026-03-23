import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShoppingBag, Heart, ChevronLeft, Star, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() } as Product);
        } else {
          console.error("No such product!");
          navigate('/');
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="pt-40 pb-24 text-center">
        <div className="w-12 h-12 border-4 border-royal-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-xs uppercase tracking-widest text-ink/40">Loading Masterpiece...</p>
      </div>
    );
  }

  if (!product) return null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <main className="pt-32 pb-24 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-ink/40 hover:text-royal-blue transition-colors mb-12"
        >
          <ChevronLeft size={16} /> Back to Collection
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Image Gallery */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="aspect-[4/5] rounded-[2rem] overflow-hidden luxury-shadow bg-white"
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            
            <div className="grid grid-cols-4 gap-4">
              {[product.image, product.image, product.image, product.image].map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-royal-blue' : 'border-transparent opacity-50'}`}
                >
                  <img src={img} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xs uppercase tracking-[0.3em] text-royal-blue font-bold">{product.category}</span>
                <div className="h-px w-8 bg-royal-blue/20"></div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="fill-gold text-gold" />
                  ))}
                  <span className="text-[10px] font-bold text-ink/40 ml-1">(48 Reviews)</span>
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-serif mb-6">{product.name}</h1>
              <p className="text-3xl font-light text-royal-blue">
                {product.price.toString().startsWith('Ksh.') ? product.price : `Ksh. ${product.price}`}
              </p>
            </div>

            <p className="text-ink/60 leading-relaxed text-lg">
              {product.description}
            </p>

            <div className="space-y-6 pt-6 border-t border-black/5">
              <div className="flex items-center gap-6">
                <div className="flex items-center border border-ink/10 rounded-full px-6 py-3 bg-white">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-xl hover:text-royal-blue transition-colors"
                  >-</button>
                  <span className="mx-8 font-bold text-lg min-w-[20px] text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-xl hover:text-royal-blue transition-colors"
                  >+</button>
                </div>
                
                <button 
                  onClick={handleAddToCart}
                  className="flex-grow bg-royal-blue text-white py-4 rounded-full font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-ink transition-all shadow-xl shadow-royal-blue/20"
                >
                  <ShoppingBag size={18} />
                  Add to Sanctuary
                </button>
                
                <button className="p-4 border border-ink/10 rounded-full hover:bg-luxury-pink transition-colors">
                  <Heart size={20} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
                <div className="flex items-center gap-3 p-4 bg-white rounded-2xl luxury-shadow">
                  <Truck className="text-royal-blue" size={20} />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest">Free Delivery</p>
                    <p className="text-[10px] text-ink/40">Orders over Ksh. 5000</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-2xl luxury-shadow">
                  <ShieldCheck className="text-royal-blue" size={20} />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest">Secure Payment</p>
                    <p className="text-[10px] text-ink/40">100% Protected</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-2xl luxury-shadow">
                  <RotateCcw className="text-royal-blue" size={20} />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest">Easy Returns</p>
                    <p className="text-[10px] text-ink/40">30 Day Policy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
