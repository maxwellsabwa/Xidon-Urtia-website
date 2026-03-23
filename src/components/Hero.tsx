import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const Hero = () => {
  const [content, setContent] = useState({
    heroTitle: 'Elegance in Every Detail',
    heroSubtitle: 'Discover a curated collection of premium feminine care, bespoke furniture, and artisanal home accents designed for the modern woman.',
    heroImage: 'https://picsum.photos/seed/luxury-interior/1920/1080'
  });

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'pageContent', 'home'), (doc) => {
      if (doc.exists()) {
        setContent(doc.data() as any);
      }
    });
    return () => unsub();
  }, []);

  return (
    <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden bg-royal-blue/5">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={content.heroImage} 
          alt="Hero Background" 
          className="w-full h-full object-cover opacity-50"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/80 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="max-w-2xl">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-xs uppercase tracking-[0.4em] text-royal-blue mb-6 font-bold"
          >
            Est. 2020 • Handmade Excellence
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-serif leading-[1.1] mb-8 text-ink"
          >
            {content.heroTitle.split(' ').map((word, i) => (
              <React.Fragment key={i}>
                {i === content.heroTitle.split(' ').length - 2 ? <br /> : null}
                <span className={i >= content.heroTitle.split(' ').length - 2 ? "italic text-royal-blue" : ""}>
                  {word}{' '}
                </span>
              </React.Fragment>
            ))}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-ink/70 mb-12 leading-relaxed max-w-lg"
          >
            {content.heroSubtitle}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-6"
          >
            <button className="bg-royal-blue text-cream px-10 py-5 text-sm uppercase tracking-widest font-bold hover:bg-ink transition-all flex items-center gap-3 group shadow-xl shadow-royal-blue/20">
              Shop Collection
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border border-royal-blue/20 text-ink px-10 py-5 text-sm uppercase tracking-widest font-bold hover:bg-white transition-all">
              Our Story
            </button>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <motion.div 
        animate={{ 
          y: [0, -30, 0],
          rotate: [0, 10, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-10 w-80 h-80 rounded-full border border-royal-blue/10 -z-10 hidden lg:flex items-center justify-center overflow-hidden p-12"
      >
        <img 
          src="https://storage.googleapis.com/static.ai.studio/v1/projects/ais-dev-zgjgm46rodiqkmqlhv3usp-647841361541/images/88888888-8888-8888-8888-888888888888.png"
          alt="Decorative Logo"
          className="w-full h-full object-contain opacity-10 hover:opacity-30 transition-opacity duration-700 mix-blend-multiply"
          referrerPolicy="no-referrer"
        />
      </motion.div>
      <motion.div 
        animate={{ 
          y: [0, 30, 0],
          rotate: [0, -10, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-royal-blue/5 blur-3xl -z-10"
      />
    </section>
  );
};

export default Hero;
