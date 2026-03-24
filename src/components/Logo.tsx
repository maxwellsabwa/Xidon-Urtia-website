import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'brand';
}

const Logo: React.FC<LogoProps> = ({ className = '', variant = 'brand' }) => {
  // The user will upload the new logo to /logo.png
  const logoUrl = "/logo.png";
  
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`relative w-14 h-14 rounded-full flex items-center justify-center shadow-xl overflow-hidden border-2 border-royal-blue/20 bg-royal-blue`}>
        <img 
          src={logoUrl} 
          alt="Xidon Urtia Logo" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Fallback to SVG if PNG is not yet uploaded
            (e.target as HTMLImageElement).src = "/logo.svg";
          }}
        />
      </div>
    </div>
  );
};

export default Logo;
