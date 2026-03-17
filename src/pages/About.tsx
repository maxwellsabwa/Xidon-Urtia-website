import React from 'react';
import { motion } from 'motion/react';

const About = () => {
  return (
    <main className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20 items-center mb-32">
          <div className="lg:w-1/2">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-xs uppercase tracking-[0.3em] text-royal-blue font-bold mb-4 block"
            >
              Our Story
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-serif mb-8 leading-tight"
            >
              Elegance <br />
              <span className="italic text-royal-blue">Redefined.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-ink/70 leading-relaxed mb-8"
            >
              Founded in 2024, Xidon Urtia was born from a simple vision: to create a lifestyle brand that celebrates the multifaceted nature of the modern woman. We believe that luxury isn't just about price—it's about the quality of the moments you create.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-ink/70 leading-relaxed"
            >
              Whether it's the comfort of our premium feminine care products or the artisanal beauty of our hand-woven rugs, every item in our collection is chosen with intention. We bridge the gap between essential care and aesthetic pleasure.
            </motion.p>
          </div>
          <div className="lg:w-1/2 relative">
            <img 
              src="https://picsum.photos/seed/founder/800/1000" 
              alt="Our Vision" 
              className="rounded-3xl luxury-shadow w-full aspect-[4/5] object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-2xl luxury-shadow hidden md:block">
              <p className="font-serif text-2xl italic mb-2">"Luxury is a feeling."</p>
              <p className="text-xs uppercase tracking-widest text-gold font-bold">— Xidon Urtia Founder</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center p-12 bg-baby-blue/10 rounded-3xl">
            <h3 className="font-serif text-3xl mb-4">Our Values</h3>
            <p className="text-ink/60 leading-relaxed">Integrity, elegance, and empowerment in everything we do.</p>
          </div>
          <div className="text-center p-12 bg-luxury-pink/10 rounded-3xl">
            <h3 className="font-serif text-3xl mb-4">Our Vision</h3>
            <p className="text-ink/60 leading-relaxed">To be the global benchmark for luxury lifestyle essentials.</p>
          </div>
          <div className="text-center p-12 bg-gold/10 rounded-3xl">
            <h3 className="font-serif text-3xl mb-4">Our Promise</h3>
            <p className="text-ink/60 leading-relaxed">Uncompromising quality and exceptional service for our clients.</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;
