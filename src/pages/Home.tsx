import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import WhyUs from '../components/WhyUs';
import Testimonials from '../components/Testimonials';
import BlogSection from '../components/BlogSection';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { db } from '../firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubAll = onSnapshot(collection(db, 'products'), (snapshot) => {
      setLoading(true);
      if (!snapshot.empty) {
        setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product)));
      } else {
        // Initial Seed or Fallback
        const fallback = [
          {
            id: '1',
            name: 'Ultra-Soft Cotton Pads',
            price: '1200',
            image: 'https://picsum.photos/seed/pads/600/800',
            category: 'pads',
            description: 'Premium organic cotton pads for ultimate comfort.',
            featured: true
          },
          {
            id: '2',
            name: 'Velvet Accent Chair',
            price: '45000',
            image: 'https://picsum.photos/seed/chair/600/800',
            category: 'furniture',
            description: 'A touch of luxury for your reading nook.',
            featured: true
          },
          {
            id: '3',
            name: 'Hand-Woven Silk Rug',
            price: '89000',
            image: 'https://picsum.photos/seed/rug/600/800',
            category: 'rugs',
            description: 'Artisanal silk rug with intricate patterns.'
          },
          {
            id: '4',
            name: 'Midnight Jasmine Candle',
            price: '3500',
            image: 'https://picsum.photos/seed/candle/600/800',
            category: 'candles',
            description: 'Hand-poured soy candle with calming scents.'
          }
        ];
        setProducts(fallback as Product[]);
      }
      setLoading(false);
    });

    const qFeatured = query(collection(db, 'products'), where('featured', '==', true));
    const unsubFeatured = onSnapshot(qFeatured, (snapshot) => {
      if (!snapshot.empty) {
        setFeaturedProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product)));
      } else {
        // Use fallback if no featured products in DB yet
        setFeaturedProducts(prev => prev.length > 0 ? prev : products.filter(p => p.featured));
      }
    });

    return () => {
      unsubAll();
      unsubFeatured();
    };
  }, [products.length]);

  return (
    <main>
      <Hero />

      {/* Featured Products Section */}
      <AnimatePresence>
        {featuredProducts.length > 0 && (
          <section className="py-24 bg-cream relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
              <div className="absolute top-10 left-10 w-64 h-64 border border-ink rounded-full" />
              <div className="absolute bottom-10 right-10 w-96 h-96 border border-ink rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <div className="max-w-xl">
                  <span className="text-xs uppercase tracking-[0.4em] text-royal-blue font-bold mb-4 block">The Elite Collection</span>
                  <h2 className="text-5xl md:text-7xl font-serif leading-tight">Featured <span className="italic">Masterpieces</span></h2>
                </div>
                <p className="text-ink/60 max-w-xs text-sm leading-relaxed border-l border-ink/10 pl-6">
                  A curated selection of our most exceptional pieces, representing the pinnacle of Xidon Urtia craftsmanship.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {featuredProducts.slice(0, 2).map((product, i) => (
                  <motion.div 
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="group relative"
                  >
                    <div className="aspect-[4/5] overflow-hidden rounded-[2rem] luxury-shadow mb-8 relative">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        <Link 
                          to={`/product/${product.id}`}
                          className="bg-white text-ink px-8 py-4 rounded-full text-xs uppercase tracking-widest font-bold transform translate-y-4 group-hover:translate-y-0 transition-all duration-500"
                        >
                          View Details
                        </Link>
                      </div>
                      <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-royal-blue">Featured</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-start px-2">
                      <div>
                        <h3 className="text-2xl font-serif mb-2 group-hover:text-royal-blue transition-colors">{product.name}</h3>
                        <p className="text-xs uppercase tracking-widest text-ink/40 font-bold">{product.category}</p>
                      </div>
                      <p className="text-xl font-serif text-royal-blue">Ksh. {Number(product.price).toLocaleString()}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
      </AnimatePresence>

      {/* Featured Products */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-xs uppercase tracking-[0.3em] text-royal-blue font-bold mb-4 block">Curated Selection</span>
            <h2 className="text-4xl md:text-5xl font-serif">Your <span className="italic text-royal-blue">Everyday Care</span></h2>
          </div>

          {loading ? (
            <div className="text-center py-20 text-ink/40 uppercase tracking-widest text-xs">Loading Featured...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {products.slice(0, 4).map((product, i) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="mt-20 text-center">
            <button className="border border-ink/20 px-12 py-5 text-sm uppercase tracking-widest font-bold hover:bg-ink hover:text-white transition-all">
              Explore All Products
            </button>
          </div>
        </div>
      </section>

      <WhyUs />

      {/* Instagram Style Feed */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-royal-blue font-bold mb-4 block">Social</span>
          <h2 className="text-4xl md:text-5xl font-serif">Xidon <span className="italic text-royal-blue">Moments</span></h2>
        </div>
        
        <div className="flex gap-6 animate-scroll">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex-shrink-0 w-72 h-96 rounded-3xl overflow-hidden luxury-shadow">
              <img 
                src={`https://picsum.photos/seed/moment-${i}/400/600`} 
                alt={`Moment ${i}`} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      </section>

      <Testimonials />
      <BlogSection />

      {/* Partners */}
      <section className="py-20 bg-cream border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-[10px] uppercase tracking-[0.3em] text-ink/40 mb-12 font-bold">Our Trusted Partners</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all">
            <span className="font-serif text-2xl font-bold">VOGUE</span>
            <span className="font-serif text-2xl font-bold">ELLE</span>
            <span className="font-serif text-2xl font-bold">BAZAAR</span>
            <span className="font-serif text-2xl font-bold">GLOSS</span>
            <span className="font-serif text-2xl font-bold">ALLURE</span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
