export const OceanWaveBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e27] via-[#162447] to-[#1f4068]" />
      
      {/* Wave Layers */}
      <svg
        className="absolute bottom-0 left-0 w-full h-full"
        viewBox="0 0 1440 800"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0.05)" />
          </linearGradient>
          <linearGradient id="wave-gradient-2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(96, 165, 250, 0.15)" />
            <stop offset="100%" stopColor="rgba(96, 165, 250, 0.08)" />
          </linearGradient>
          <linearGradient id="wave-gradient-3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(147, 197, 253, 0.2)" />
            <stop offset="100%" stopColor="rgba(147, 197, 253, 0.1)" />
          </linearGradient>
        </defs>
        
        {/* Wave Layer 1 - Deepest */}
        <path
          fill="url(#wave-gradient-1)"
          d="M0,400 C320,450 640,350 960,400 C1280,450 1440,400 1440,400 L1440,800 L0,800 Z"
        >
          <animate
            attributeName="d"
            dur="15s"
            repeatCount="indefinite"
            values="
              M0,400 C320,450 640,350 960,400 C1280,450 1440,400 1440,400 L1440,800 L0,800 Z;
              M0,420 C320,370 640,470 960,420 C1280,370 1440,420 1440,420 L1440,800 L0,800 Z;
              M0,400 C320,450 640,350 960,400 C1280,450 1440,400 1440,400 L1440,800 L0,800 Z"
          />
        </path>
        
        {/* Wave Layer 2 - Middle */}
        <path
          fill="url(#wave-gradient-2)"
          d="M0,480 C360,520 720,440 1080,480 C1320,500 1440,480 1440,480 L1440,800 L0,800 Z"
        >
          <animate
            attributeName="d"
            dur="12s"
            repeatCount="indefinite"
            values="
              M0,480 C360,520 720,440 1080,480 C1320,500 1440,480 1440,480 L1440,800 L0,800 Z;
              M0,460 C360,420 720,500 1080,460 C1320,440 1440,460 1440,460 L1440,800 L0,800 Z;
              M0,480 C360,520 720,440 1080,480 C1320,500 1440,480 1440,480 L1440,800 L0,800 Z"
          />
        </path>
        
        {/* Wave Layer 3 - Surface */}
        <path
          fill="url(#wave-gradient-3)"
          d="M0,560 C400,600 800,520 1200,560 C1360,580 1440,560 1440,560 L1440,800 L0,800 Z"
        >
          <animate
            attributeName="d"
            dur="10s"
            repeatCount="indefinite"
            values="
              M0,560 C400,600 800,520 1200,560 C1360,580 1440,560 1440,560 L1440,800 L0,800 Z;
              M0,540 C400,500 800,580 1200,540 C1360,520 1440,540 1440,540 L1440,800 L0,800 Z;
              M0,560 C400,600 800,520 1200,560 C1360,580 1440,560 1440,560 L1440,800 L0,800 Z"
          />
        </path>
      </svg>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-300 rounded-full animate-float-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};
