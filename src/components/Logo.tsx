import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'brand';
}

const Logo: React.FC<LogoProps> = ({ className = '', variant = 'brand' }) => {
  const logoUrl = "/logo.svg";
  
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`relative w-12 h-12 rounded-full flex items-center justify-center shadow-lg overflow-hidden border border-logo-gold/20 bg-white`}>
        <img 
          src={logoUrl} 
          alt="Xidon Urtia Logo" 
          className="w-full h-full object-contain p-1"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="flex flex-col">
        <span className={`font-serif text-xl tracking-[0.15em] uppercase leading-none font-bold ${variant === 'light' ? 'text-white' : 'text-ink'}`}>
          Xidon Urtia
        </span>
        <span className={`text-[8px] uppercase tracking-[0.2em] mt-1 font-medium ${variant === 'light' ? 'text-white/60' : 'text-royal-blue/80'}`}>
          Handmade Products • Est 2020
        </span>
      </div>
    </div>
  );
};

export default Logo;
