'use client';

import { Search, Bell, User } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function Topbar() {
  const pathname = usePathname();
  
  // Breadcrumb dinâmico simples
  const paths = pathname.split('/').filter(Boolean);
  const breadcrumb = paths.length === 0 ? 'Dashboard' : paths[0].charAt(0).toUpperCase() + paths[0].slice(1);

  return (
    <header className="h-16 bg-background/80 backdrop-blur-md border-b border-border flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold text-foreground">{breadcrumb}</h1>
      </div>

      <div className="flex items-center gap-4">
        <button 
          className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 border border-border rounded-md text-sm text-muted-foreground hover:bg-muted transition-colors"
          title="Command Palette (Cmd+K)"
        >
          <Search size={16} />
          <span>Pesquisar...</span>
          <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-background border border-border text-[10px] font-mono">
            <span>⌘</span>K
          </kbd>
        </button>

        <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-2 w-2 h-2 bg-blue-500 rounded-full border border-background"></span>
        </button>

        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground cursor-pointer">
          <User size={16} />
        </div>
      </div>
    </header>
  );
}
