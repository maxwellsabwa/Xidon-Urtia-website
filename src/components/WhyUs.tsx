import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Sparkles, Heart, Leaf } from 'lucide-react';

const features = [
  {
    icon: <ShieldCheck size={32} />,
    title: 'Premium Quality',
    description: 'We source only the finest materials for our products, ensuring durability and luxury.'
  },
  {
    icon: <Sparkles size={32} />,
    title: 'Artisanal Design',
    description: 'Every piece of furniture and rug is crafted with attention to detail and artistic vision.'
  },
  {
    icon: <Heart size={32} />,
    title: 'Gentle Care',
    description: 'Our feminine hygiene line is designed to be skin-friendly and provide ultimate comfort.'
  },
  {
    icon: <Leaf size={32} />,
    title: 'Sustainable Choice',
    description: 'We are committed to ethical sourcing and reducing our environmental footprint.'
  }
];

const WhyUs = () => {
  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2">
            <div className="relative">
              <img 
                src="https://picsum.photos/seed/luxury-lifestyle/800/1000" 
                alt="Luxury Lifestyle" 
                className="rounded-3xl luxury-shadow w-full aspect-[4/5] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-royal-blue/10 rounded-3xl -z-10 hidden md:block" />
              <div className="absolute -top-10 -left-10 w-48 h-48 bg-luxury-pink/20 rounded-full -z-10 hidden md:block" />
            </div>
          </div>

          <div className="lg:w-1/2">
            <span className="text-xs uppercase tracking-[0.3em] text-royal-blue font-bold mb-4 block">Our Mission</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">Why Choose <span className="italic text-royal-blue">Xidon Urtia?</span></h2>
            <p className="text-ink/70 mb-12 text-lg leading-relaxed">
              At Xidon Urtia, we believe that luxury should be part of your everyday routine. We curate products that bring comfort, confidence, and elegance to your life.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              {features.map((f, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col gap-4"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-royal-blue luxury-shadow">
                    {f.icon}
                  </div>
                  <h4 className="font-serif text-xl">{f.title}</h4>
                  <p className="text-sm text-ink/60 leading-relaxed">{f.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
