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
    <header className="w-full mt-8 mb-16 px-10 relative z-20">
      <div className="absolute inset-0 flex items-center justify-center opacity-20 blur-3xl pointer-events-none">
        <div className="w-96 h-96 bg-primary rounded-full animate-pulse"></div>
      </div>
      <h1 
        className="text-[72px] md:text-[56px] sm:text-[40px] font-bold text-center tracking-[3px] relative z-30 min-h-[90px] hover:scale-105 transition-transform duration-300"
        style={{
          fontFamily: `'${fonts[fontIndex]}', sans-serif`,
          color: 'hsl(217 91% 60%)',
          textShadow: '0 0 40px rgba(59, 130, 246, 0.8), 0 0 80px rgba(59, 130, 246, 0.5), 0 4px 20px rgba(0, 0, 0, 0.5)',
          lineHeight: 1.2,
          transition: 'font-family 0.3s ease',
          filter: 'drop-shadow(0 0 30px rgba(59, 130, 246, 0.6))',
        }}
      >
        {displayText}
        <span className="animate-pulse">|</span>
      </h1>
      <div className="flex justify-center mt-2">
        <div className="h-1 w-32 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse shadow-[var(--shadow-glow)]"></div>
      </div>
    </header>
  );
};
