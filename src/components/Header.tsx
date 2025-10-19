import { useState, useEffect } from 'react';

export const Header = () => {
  const [displayText, setDisplayText] = useState('');
  const [fontIndex, setFontIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const fullText = 'KXF CREATIVE';
  const fonts = [
    'Orbitron',
    'Rajdhani',
    'Audiowide',
    'Electrolize',
    'Saira',
    'Quantico'
  ];

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = 1000;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < fullText.length) {
          setDisplayText(fullText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(fullText.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setFontIndex((prev) => (prev + 1) % fonts.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, fontIndex]);

  return (
    <header className="w-full mt-8 mb-16 px-10 relative">
      <div className="absolute inset-0 flex items-center justify-center opacity-30 blur-3xl">
        <div className="w-96 h-96 bg-primary rounded-full animate-pulse"></div>
      </div>
      <h1 
        className="text-[72px] md:text-[56px] sm:text-[40px] font-bold text-center tracking-[3px] relative z-10 min-h-[90px] hover:scale-105 transition-transform duration-300"
        style={{
          fontFamily: `'${fonts[fontIndex]}', sans-serif`,
          background: 'linear-gradient(135deg, hsl(217 91% 60%), hsl(213 97% 69%), hsl(217 91% 60%))',
          backgroundSize: '200% 100%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'gradient-shift 6s linear infinite',
          textShadow: '0 0 60px rgba(59, 130, 246, 0.5)',
          lineHeight: 1.2,
          transition: 'font-family 0.3s ease',
        }}
      >
        {displayText}
        <span className="animate-pulse" style={{ 
          color: 'hsl(217 91% 60%)',
          WebkitTextFillColor: 'hsl(217 91% 60%)'
        }}>|</span>
      </h1>
      <div className="flex justify-center mt-2">
        <div className="h-1 w-32 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse"></div>
      </div>
    </header>
  );
};
