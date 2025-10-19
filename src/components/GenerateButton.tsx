import { Sparkles } from "lucide-react";

interface Props {
  onClick: () => void;
  disabled: boolean;
}

export const GenerateButton = ({ onClick, disabled }: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="relative w-full max-w-[320px] h-[56px] text-base font-bold text-white rounded-full transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 group overflow-hidden"
      style={{
        background: disabled 
          ? 'hsl(var(--muted))' 
          : 'linear-gradient(135deg, hsl(217 91% 60%), hsl(270 60% 50%))',
        boxShadow: disabled 
          ? 'none' 
          : '0 0 30px hsla(217, 91%, 60%, 0.6), 0 8px 32px rgba(59, 130, 246, 0.4)',
      }}
    >
      {/* Animated glow effect */}
      {!disabled && (
        <div 
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.4), rgba(167, 139, 250, 0.4))',
            filter: 'blur(20px)',
          }}
        />
      )}
      
      {/* Button content */}
      <div className="relative z-10 flex items-center gap-2 group-hover:scale-110 transition-transform duration-300">
        <Sparkles className="w-5 h-5 animate-pulse" />
        <span className="tracking-wide">Generate Prompts</span>
      </div>
      
      {/* Shine effect */}
      {!disabled && (
        <div 
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
          }}
        />
      )}
    </button>
  );
};
