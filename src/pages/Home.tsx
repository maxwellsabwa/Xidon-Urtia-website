import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import WhyUs from '../components/WhyUs';
import Testimonials from '../components/Testimonials';
import BlogSection from '../components/BlogSection';
import { motion } from 'motion/react';
import { Product } from '../types';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'products'), (snapshot) => {
      setLoading(true);
      if (!snapshot.empty) {
        setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product)));
      } else {
        // Initial Seed or Fallback
        setProducts([
          {
            id: '1',
            name: 'Ultra-Soft Cotton Pads',
            price: '1200',
            image: 'https://picsum.photos/seed/pads/600/800',
            category: 'pads',
            description: 'Premium organic cotton pads for ultimate comfort.'
          },
          {
            id: '2',
            name: 'Velvet Accent Chair',
            price: '45000',
            image: 'https://picsum.photos/seed/chair/600/800',
            category: 'furniture',
            description: 'A touch of luxury for your reading nook.'
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
        ]);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return (
    <main>
      <Hero />

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
