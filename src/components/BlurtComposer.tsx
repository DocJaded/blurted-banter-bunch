
import React, { useState, useRef, useEffect } from 'react';
import { toast } from "sonner";

interface BlurtComposerProps {
  onSendBlurt: (text: string) => void;
  maxLength: number;
}

const BlurtComposer: React.FC<BlurtComposerProps> = ({ onSendBlurt, maxLength }) => {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const remainingChars = maxLength - text.length;
  const isOverLimit = remainingChars < 0;
  
  useEffect(() => {
    // Auto-resize textarea based on content
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) {
      toast.error("Can't send an empty Blurt!");
      return;
    }
    
    if (isOverLimit) {
      toast.error(`Your Blurt exceeds the ${maxLength} character limit`);
      return;
    }
    
    onSendBlurt(text.trim());
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-[#e2e2e7] bg-white p-4 shadow-sm transition-all">
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What's on your mind? (234 chars max)"
        className="w-full resize-none border-0 bg-transparent p-0 text-sm focus:outline-none focus:ring-0"
        rows={1}
      />
      
      <div className="mt-3 flex items-center justify-between">
        <div className={cn(
          "character-counter text-blurt-secondary",
          remainingChars <= 20 && remainingChars > 0 && "text-amber-500",
          isOverLimit && "text-blurt-error"
        )}>
          {remainingChars} characters left
        </div>
        
        <button
          type="submit"
          className="blurt-button"
          disabled={!text.trim() || isOverLimit}
        >
          Blurt!
        </button>
      </div>
    </form>
  );
};

export default BlurtComposer;

// Helper function to conditionally join class names
function cn(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
