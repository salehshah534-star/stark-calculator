import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Lock, Unlock } from "lucide-react";
import { Character } from "@/types";
import { CharacterManagement } from "./CharacterManagement";

interface Props {
  characters: Character[];
  onChange: (characters: Character[]) => void;
}

export const SidebarCharacters = ({ characters, onChange }: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('sidebar_locked');
    if (saved) setIsLocked(saved === 'true');
  }, []);

  const handleLockToggle = () => {
    const newValue = !isLocked;
    setIsLocked(newValue);
    localStorage.setItem('sidebar_locked', String(newValue));
  };

  return (
    <>
      <aside
        className={`fixed left-0 top-5 bottom-5 glass border-cyber rounded-r-2xl transition-all duration-300 z-40 backdrop-blur-xl ${
          isCollapsed ? "w-[50px]" : "w-[340px]"
        }`}
        style={{ 
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(96, 165, 250, 0.2)',
          background: 'rgba(255, 255, 255, 0.05)',
        }}
      >
        {/* Arrow button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-12 glass-strong border border-primary rounded-r-lg hover:glow-primary transition-all duration-300 flex items-center justify-center group"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-primary group-hover:scale-125 transition-transform duration-300" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-primary group-hover:scale-125 transition-transform duration-300" />
          )}
        </button>

        {/* Content */}
        {!isCollapsed && (
          <div className="p-5 h-full overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <span className="text-2xl">👥</span>
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Characters
                </span>
              </h2>
              <button
                onClick={handleLockToggle}
                className="w-8 h-8 flex items-center justify-center rounded-lg glass-strong hover:glow-primary transition-all duration-300 hover:scale-110"
                title="Lock to save data"
              >
                {isLocked ? (
                  <Lock className="w-[18px] h-[18px] text-primary animate-pulse" />
                ) : (
                  <Unlock className="w-[18px] h-[18px] text-muted-foreground" />
                )}
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <CharacterManagement characters={characters} onChange={onChange} />
            </div>
          </div>
        )}
      </aside>

      {/* Spacer for collapsed sidebar */}
      <div className={`transition-all duration-300 ${isCollapsed ? "w-[50px]" : "w-[340px]"}`} />
    </>
  );
};
