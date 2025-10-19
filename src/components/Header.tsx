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
        className="text-[72px] md:text-[56px] sm:text-[40px] font-bold text-center tracking-[3px] relative z-10 min-h-[90px]"
        style={{
          fontFamily: `'${fonts[fontIndex]}', sans-serif`,
          background: 'linear-gradient(90deg, #60A5FA 0%, #A78BFA 20%, #F472B6 40%, #FBBF24 60%, #34D399 80%, #60A5FA 100%)',
          backgroundSize: '200% 100%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'gradient-shift 6s linear infinite',
          filter: 'drop-shadow(0 0 20px rgba(96, 165, 250, 0.5)) drop-shadow(0 0 40px rgba(167, 139, 250, 0.3))',
          lineHeight: 1.2,
          transition: 'font-family 0.3s ease',
        }}
      >
        {displayText}
        <span className="animate-pulse">|</span>
      </h1>
      <div className="flex justify-center mt-2">
        <div className="h-1 w-32 rounded-full gradient-animated"></div>
      </div>
    </header>
  );
};
