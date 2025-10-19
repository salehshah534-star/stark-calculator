export const Header = () => {
  return (
    <header className="w-full mt-8 mb-16 px-10 relative">
      <div className="absolute inset-0 flex items-center justify-center opacity-30 blur-3xl">
        <div className="w-96 h-96 bg-primary rounded-full animate-pulse"></div>
      </div>
      <h1 
        className="text-[48px] md:text-4xl sm:text-[28px] font-bold text-center tracking-[3px] animate-title-font relative z-10"
        style={{
          background: 'linear-gradient(90deg, #60A5FA 0%, #A78BFA 20%, #F472B6 40%, #FBBF24 60%, #34D399 80%, #60A5FA 100%)',
          backgroundSize: '200% 100%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'gradient-shift 6s linear infinite',
          filter: 'drop-shadow(0 0 20px rgba(96, 165, 250, 0.5)) drop-shadow(0 0 40px rgba(167, 139, 250, 0.3))',
          lineHeight: 1.2,
        }}
      >
        KXF CREATIVE
      </h1>
      <div className="flex justify-center mt-2">
        <div className="h-1 w-32 rounded-full gradient-animated"></div>
      </div>
    </header>
  );
};
