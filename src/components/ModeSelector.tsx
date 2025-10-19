import { useEffect } from "react";
import { Hand, Bot } from "lucide-react";

type Mode = "manual" | "ai-advanced";

interface Props {
  mode: Mode;
  onChange: (mode: Mode) => void;
}

export const ModeSelector = ({ mode, onChange }: Props) => {
  useEffect(() => {
    // Load from localStorage on mount
    const saved = localStorage.getItem('kxf-mode');
    if (saved === 'manual' || saved === 'ai-advanced') {
      onChange(saved);
    }
  }, []);

  const handleModeChange = (newMode: Mode) => {
    onChange(newMode);
    localStorage.setItem('kxf-mode', newMode);
  };

  return (
    <div className="flex justify-center mb-6">
      <div className="inline-flex glass rounded-full p-1.5 shadow-[var(--shadow-card)] border border-primary/20" style={{ width: '320px', height: '60px' }}>
        <button
          onClick={() => handleModeChange('manual')}
          className={`flex-1 flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 hover-lift ${
            mode === 'manual'
              ? 'bg-primary text-primary-foreground shadow-[var(--shadow-button)]'
              : 'text-muted-foreground hover:text-foreground hover:bg-primary/5'
          }`}
        >
          <Hand className="w-5 h-5" />
          <span>Manual</span>
        </button>
        
        <button
          onClick={() => handleModeChange('ai-advanced')}
          className={`flex-1 flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 hover-lift ${
            mode === 'ai-advanced'
              ? 'text-primary-foreground shadow-[var(--shadow-button)]'
              : 'text-muted-foreground hover:text-foreground hover:bg-primary/5'
          }`}
          style={mode === 'ai-advanced' ? {
            background: 'var(--gradient-ocean)'
          } : undefined}
        >
          <Bot className="w-5 h-5" />
          <span>AI Advanced</span>
        </button>
      </div>
    </div>
  );
};
