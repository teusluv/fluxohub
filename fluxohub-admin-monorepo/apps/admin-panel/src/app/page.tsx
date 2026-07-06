'use client';

import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { toast } from 'sonner';

export default function Home() {
  const handleTestToast = () => {
    toast.success('Sucesso!', {
      description: 'Configurações salvas há poucos segundos.',
    });
  };

  return (
    <div className="flex min-h-screen bg-background">
      <CommandPalette />
      <Sidebar />
      
      {/* O main tem marginLeft de 80px (collapsed) ou 260px (aberto). Para simplificar o layout sem context, usaremos margin left fixo responsivo baseado no estado ou apenas pl-20 até pl-64 */}
      {/* Na UI Master exigia sidebar fixed, então compensamos o espaço */}
      <div className="flex-1 ml-[80px] md:ml-[260px] transition-all duration-300 flex flex-col min-h-screen">
        <Topbar />
        
        <main className="flex-1 p-6 sm:p-10">
          <div className="max-w-5xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
            <p className="text-muted-foreground">
              Bem-vindo ao fluxohub Admin. A sua arquitetura Monorepo está ativa.
            </p>

            <div className="grid gap-4 md:grid-cols-3">
              {[1, 2, 3].map((card) => (
                <div key={card} className="p-6 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all">
                  <div className="h-4 w-1/3 bg-muted rounded animate-soft-pulse mb-4"></div>
                  <div className="h-8 w-1/2 bg-muted rounded animate-soft-pulse mb-2"></div>
                  <div className="h-3 w-1/4 bg-muted rounded animate-soft-pulse"></div>
                </div>
              ))}
            </div>

            <button 
              onClick={handleTestToast}
              className="px-4 py-2 bg-foreground text-background font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              Testar Toaster Nativo
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
