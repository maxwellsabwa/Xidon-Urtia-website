import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'brand';
}

const Logo: React.FC<LogoProps> = ({ className = '', variant = 'brand' }) => {
  const isBrand = variant === 'brand';
  const isLight = variant === 'light';
  
  const bgColor = isBrand ? 'bg-royal-blue' : 'bg-transparent';
  const iconColor = isBrand || isLight ? 'text-logo-gold' : 'text-royal-blue';
  const textColor = isBrand || isLight ? 'text-white' : 'text-royal-blue';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`relative w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${bgColor} overflow-hidden border border-logo-gold/20`}>
        {/* Lotus Icon SVG */}
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          className={`w-8 h-8 ${iconColor}`}
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
          <path d="M12 22s4-4.5 4-11.8A4 4 0 0 0 12 6a4 4 0 0 0-4 4.2c0 7.3 4 11.8 4 11.8z" />
          <path d="M12 22s-12-2-12-7 4-5 4-5 2 5 2 5" />
          <path d="M12 22s12-2 12-7-4-5-4-5-2 5-2 5" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className={`font-serif text-xl tracking-[0.15em] uppercase leading-none font-bold ${textColor}`}>
          Xidon Urtia
        </span>
        <span className={`text-[8px] uppercase tracking-[0.2em] mt-1 font-medium ${isBrand || isLight ? 'text-logo-gold/80' : 'text-royal-blue/60'}`}>
          Handmade Products • Est 2020
        </span>
      </div>
    </div>
  );
};

export default Logo;
