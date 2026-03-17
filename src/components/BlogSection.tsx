import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const blogs = [
  {
    id: '1',
    title: 'The Art of Choosing the Perfect Rug',
    excerpt: 'Discover how the right rug can anchor your room and define your personal style.',
    image: 'https://picsum.photos/seed/rug-blog/800/600',
    date: 'March 15, 2026'
  },
  {
    id: '2',
    title: 'Self-Care Rituals for the Modern Woman',
    excerpt: 'Simple daily practices to help you stay grounded and confident throughout your cycle.',
    image: 'https://picsum.photos/seed/wellness-blog/800/600',
    date: 'March 10, 2026'
  },
  {
    id: '3',
    title: 'Creating a Sanctuary with Scented Candles',
    excerpt: 'How different scents can influence your mood and transform your home environment.',
    image: 'https://picsum.photos/seed/candle-blog/800/600',
    date: 'March 05, 2026'
  }
];

const BlogSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-royal-blue font-bold mb-4 block">Journal</span>
            <h2 className="text-4xl md:text-5xl font-serif">Latest <span className="italic text-royal-blue">Insights</span></h2>
          </div>
          <button className="hidden md:flex items-center gap-2 text-xs uppercase tracking-widest font-bold border-b border-ink pb-1 hover:text-gold hover:border-gold transition-all">
            View All Posts <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {blogs.map((blog, i) => (
            <motion.div 
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-3xl mb-6 relative">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold">
                  {blog.date}
                </div>
              </div>
              <h3 className="font-serif text-2xl mb-4 group-hover:text-gold transition-colors leading-tight">
                {blog.title}
              </h3>
              <p className="text-ink/60 text-sm leading-relaxed mb-6">
                {blog.excerpt}
              </p>
              <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold group-hover:gap-4 transition-all">
                Read More <ArrowRight size={12} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
