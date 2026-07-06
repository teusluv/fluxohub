'use client';

import { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';
import { Package, Settings, Home, Users, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSelect = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-[20vh] p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="w-full max-w-xl bg-card border border-border rounded-xl shadow-2xl overflow-hidden"
          >
            <Command className="w-full">
              <Command.Input 
                autoFocus 
                placeholder="Pesquisar ferramentas, produtos..." 
                className="w-full px-4 py-4 bg-transparent border-b border-border text-foreground outline-none placeholder:text-muted-foreground"
              />
              <Command.List className="max-h-[300px] overflow-y-auto p-2">
                <Command.Empty className="p-4 text-sm text-center text-muted-foreground">
                  Nenhum resultado encontrado.
                </Command.Empty>
                
                <Command.Group heading="Navegação" className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                  <Command.Item 
                    onSelect={() => handleSelect('/')}
                    className="flex items-center gap-2 px-2 py-2 mt-1 rounded-md text-sm text-foreground hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors aria-selected:bg-primary aria-selected:text-primary-foreground"
                  >
                    <Home size={16} /> Dashboard
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => handleSelect('/produtos')}
                    className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-foreground hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors aria-selected:bg-primary aria-selected:text-primary-foreground"
                  >
                    <Package size={16} /> Produtos
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => handleSelect('/configuracoes')}
                    className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-foreground hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors aria-selected:bg-primary aria-selected:text-primary-foreground"
                  >
                    <Settings size={16} /> Configurações
                  </Command.Item>
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
