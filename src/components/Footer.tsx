import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-ink text-cream pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="mb-6 block">
            <Logo variant="light" />
          </Link>
          <p className="text-cream/60 text-sm leading-relaxed mb-8">
            Crafting elegance for your everyday life. From premium feminine care to artisanal furniture and home accents.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center hover:bg-cream hover:text-ink transition-all">
              <Instagram size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center hover:bg-cream hover:text-ink transition-all">
              <Facebook size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center hover:bg-cream hover:text-ink transition-all">
              <Twitter size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-serif text-lg mb-6 uppercase tracking-widest">Shop</h4>
          <ul className="flex flex-col gap-4 text-sm text-cream/60">
            <li><Link to="/pads" className="hover:text-royal-blue transition-colors">Feminine Pads</Link></li>
            <li><Link to="/tissues" className="hover:text-royal-blue transition-colors">Luxury Tissues</Link></li>
            <li><Link to="/furniture" className="hover:text-royal-blue transition-colors">Bespoke Furniture</Link></li>
            <li><Link to="/rugs" className="hover:text-royal-blue transition-colors">Premium Rugs</Link></li>
            <li><Link to="/candles" className="hover:text-royal-blue transition-colors">Scented Candles</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg mb-6 uppercase tracking-widest">Company</h4>
          <ul className="flex flex-col gap-4 text-sm text-cream/60">
            <li><Link to="/about" className="hover:text-royal-blue transition-colors">Our Story</Link></li>
            <li><Link to="/contact" className="hover:text-royal-blue transition-colors">Contact Us</Link></li>
            <li><a href="#" className="hover:text-royal-blue transition-colors">Sustainability</a></li>
            <li><a href="#" className="hover:text-royal-blue transition-colors">Shipping & Returns</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg mb-6 uppercase tracking-widest">Contact</h4>
          <ul className="flex flex-col gap-4 text-sm text-cream/60">
            <li className="flex items-center gap-3">
              <Phone size={14} className="text-royal-blue" />
              <a href="tel:0768303439" className="hover:text-royal-blue transition-colors">0768303439</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={14} className="text-royal-blue" />
              <a href="mailto:xidonurtia@gmail.com" className="hover:text-royal-blue transition-colors">xidonurtia@gmail.com</a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={14} className="text-royal-blue mt-1" />
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Katani,Mavoko+Sub-county,Machakos" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-royal-blue transition-colors"
              >
                Katani, Mavoko Sub-county, Machakos
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[10px] uppercase tracking-widest text-cream/40">
          © 2026 Xidon Urtia. All rights reserved.
        </p>
        <div className="flex gap-8 text-[10px] uppercase tracking-widest text-cream/40">
          <a href="#" className="hover:text-cream transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-cream transition-colors">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
