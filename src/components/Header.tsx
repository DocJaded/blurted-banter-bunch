
import React from 'react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn("py-5 px-6 backdrop-blur-lg bg-white/70 sticky top-0 z-10 border-b border-[#e2e2e7]/50", className)}>
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-semibold tracking-tight text-blurt-dark">
            Blurt!
          </h1>
          <span className="ml-2 text-xs text-blurt-secondary bg-blurt-secondary/10 px-2 py-0.5 rounded-full">
            beta
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
