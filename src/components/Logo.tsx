import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'brand';
}

const Logo: React.FC<LogoProps> = ({ className = '', variant = 'brand' }) => {
  const logoUrl = "https://storage.googleapis.com/static.ai.studio/v1/projects/ais-dev-zgjgm46rodiqkmqlhv3usp-647841361541/images/88888888-8888-8888-8888-888888888888.png";
  const [imgSrc, setImgSrc] = React.useState(logoUrl);
  
  // Luxury lotus logo as a fallback
  const fallbackLogo = "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop";
  
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`relative w-12 h-12 rounded-full flex items-center justify-center shadow-lg overflow-hidden border border-logo-gold/20 bg-white`}>
        <img 
          src={imgSrc} 
          alt="Xidon Urtia Logo" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
          onError={() => setImgSrc(fallbackLogo)}
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
