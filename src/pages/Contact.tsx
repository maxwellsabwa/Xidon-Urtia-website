import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  return (
    <main className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-xs uppercase tracking-[0.3em] text-royal-blue font-bold mb-4 block">Get in Touch</span>
          <h1 className="text-5xl md:text-7xl font-serif mb-6">Contact <span className="italic text-royal-blue">Us</span></h1>
          <p className="text-ink/60 max-w-2xl mx-auto text-lg leading-relaxed">
            We'd love to hear from you. Whether you have a question about our collections or just want to say hello.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-20">
          <div className="lg:w-1/3 flex flex-col gap-12">
            <div className="flex gap-6 items-start">
              <div className="w-14 h-14 rounded-2xl bg-luxury-pink/20 flex items-center justify-center text-ink flex-shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-serif text-xl mb-2">Email Us</h4>
                <p className="text-ink/60">concierge@xidonurtia.com</p>
                <p className="text-ink/60">press@xidonurtia.com</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-14 h-14 rounded-2xl bg-baby-blue/20 flex items-center justify-center text-ink flex-shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-serif text-xl mb-2">Call Us</h4>
                <p className="text-ink/60">+1 (555) 123-4567</p>
                <p className="text-ink/60">Mon - Fri, 9am - 6pm EST</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center text-ink flex-shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-serif text-xl mb-2">Visit Us</h4>
                <p className="text-ink/60">742 Luxury Avenue</p>
                <p className="text-ink/60">New York, NY 10001</p>
              </div>
            </div>
          </div>

          <div className="lg:w-2/3 bg-white p-12 rounded-3xl luxury-shadow">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-ink/40">Full Name</label>
                <input 
                  type="text" 
                  className="bg-cream border-none p-4 rounded-xl focus:ring-2 focus:ring-luxury-pink outline-none transition-all"
                  placeholder="Jane Doe"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-ink/40">Email Address</label>
                <input 
                  type="email" 
                  className="bg-cream border-none p-4 rounded-xl focus:ring-2 focus:ring-luxury-pink outline-none transition-all"
                  placeholder="jane@example.com"
                />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-ink/40">Subject</label>
                <select className="bg-cream border-none p-4 rounded-xl focus:ring-2 focus:ring-luxury-pink outline-none transition-all">
                  <option>General Inquiry</option>
                  <option>Order Support</option>
                  <option>Press & Media</option>
                  <option>Partnerships</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-ink/40">Message</label>
                <textarea 
                  rows={6}
                  className="bg-cream border-none p-4 rounded-xl focus:ring-2 focus:ring-luxury-pink outline-none transition-all resize-none"
                  placeholder="How can we help you?"
                />
              </div>
              <div className="md:col-span-2">
                <button className="w-full bg-ink text-cream py-5 rounded-xl uppercase tracking-widest font-bold hover:bg-luxury-pink hover:text-ink transition-all flex items-center justify-center gap-3">
                  Send Message <Send size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
