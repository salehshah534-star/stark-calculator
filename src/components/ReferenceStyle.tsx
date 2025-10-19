import { Textarea } from "@/components/ui/textarea";
import { Maximize2 } from "lucide-react";
import { useState } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const ReferenceStyle = ({ value, onChange }: Props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="space-y-3">
      <div className="relative">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Example: Semi-realistic 90s 2D animation style, cel animation aesthetic, warm lighting, nostalgic feel..."
          className="w-full font-sans resize-none border-2 border-input bg-background/50 backdrop-blur-sm focus:border-primary focus:ring-2 focus:ring-primary/50 rounded-xl p-5 custom-scrollbar transition-all duration-300 hover:border-primary/50 shadow-sm hover:shadow-md"
          style={{ height: expanded ? '200px' : '100px', lineHeight: '1.6' }}
        />
        
        {/* Expand button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="absolute bottom-3 right-3 p-1.5 bg-white border border-primary rounded-md hover:bg-primary hover:text-white transition-all"
          title="Expand"
          style={{ boxShadow: "var(--shadow-button)" }}
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>
      
      <p className="text-xs text-muted-foreground italic">
        ℹ️ Style phrase ALWAYS appears first in every prompt
      </p>
    </div>
  );
};
