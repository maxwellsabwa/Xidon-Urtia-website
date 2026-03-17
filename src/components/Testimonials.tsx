import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: '1',
    name: 'Sophia Reynolds',
    text: 'The quality of the rugs is simply unmatched. It transformed my living room into a sanctuary of comfort and style.',
    rating: 5,
    role: 'Interior Designer'
  },
  {
    id: '2',
    name: 'Elena Vance',
    text: 'Xidon Urtia understands the modern woman. Their feminine care products are a game changer—gentle and reliable.',
    rating: 5,
    role: 'Wellness Coach'
  },
  {
    id: '3',
    name: 'Isabella Chen',
    text: 'The scented candles create such a luxury atmosphere. I look forward to lighting one every evening after work.',
    rating: 5,
    role: 'Lifestyle Blogger'
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <span className="text-xs uppercase tracking-[0.3em] text-royal-blue font-bold mb-4 block">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-serif">Real Stories. <span className="italic text-royal-blue">Real Comfort.</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {testimonials.map((t, index) => (
            <motion.div 
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-cream p-10 rounded-3xl relative luxury-shadow"
            >
              <Quote className="absolute top-6 right-6 text-luxury-pink/20" size={48} />
              
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={14} className="fill-gold text-gold" />
                ))}
              </div>

              <p className="text-ink/70 italic leading-relaxed mb-8 text-lg">
                "{t.text}"
              </p>

              <div>
                <h4 className="font-serif text-xl mb-1">{t.name}</h4>
                <p className="text-xs uppercase tracking-widest text-ink/40">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-ink" />
      </div>
    </section>
  );
};

export default Testimonials;
