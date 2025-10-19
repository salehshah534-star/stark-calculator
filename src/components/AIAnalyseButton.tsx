import { Bot, Loader2, Sparkles } from "lucide-react";

interface Props {
  onClick: () => void;
  isAnalyzing: boolean;
  disabled: boolean;
}

export const AIAnalyseButton = ({ onClick, isAnalyzing, disabled }: Props) => {
  return (
    <div className="flex justify-center my-6">
      <button
        onClick={onClick}
        disabled={disabled || isAnalyzing}
        className="relative flex items-center justify-center gap-3 px-8 py-4 text-white font-bold text-base rounded-full transition-all duration-300 hover-lift disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group overflow-hidden shadow-[var(--shadow-button)] hover:shadow-[var(--shadow-button-hover)] active-press"
        style={{
          width: '240px',
          height: '56px',
          background: disabled 
            ? 'hsl(var(--muted))' 
            : 'var(--gradient-ocean)',
        }}
      >
        {/* Pulsing background effect */}
        {isAnalyzing && (
          <div 
            className="absolute inset-0 rounded-full animate-pulse"
            style={{
              background: 'radial-gradient(circle, rgba(96, 165, 250, 0.6), transparent)',
            }}
          />
        )}
        
        {/* Button content */}
        <div className="relative z-10 flex items-center gap-3">
          {isAnalyzing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="tracking-wide">Analyzing...</span>
              <Sparkles className="w-4 h-4 animate-pulse" />
            </>
          ) : (
            <>
              <Bot className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              <span className="tracking-wider">AI ANALYSE</span>
              <Sparkles className="w-4 h-4 animate-pulse" />
            </>
          )}
        </div>
        
        {/* Hover glow effect */}
        {!disabled && !isAnalyzing && (
          <div 
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'radial-gradient(circle, rgba(96, 165, 250, 0.4), transparent)',
              filter: 'blur(15px)',
            }}
          />
        )}
      </button>
    </div>
  );
};
