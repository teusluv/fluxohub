'use client';

import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';
import { ProductForm } from '@/components/forms/ProductForm';

export default function NewProductPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-[80px] md:ml-[260px] transition-all duration-300 flex flex-col min-h-screen">
        <Topbar />
        
        <main className="flex-1 p-6 sm:p-10">
          <div className="max-w-4xl mx-auto space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Adicionar Produto</h1>
              <p className="text-muted-foreground">
                Preencha as informações para listar um novo produto no catálogo.
              </p>
            </div>

            <ProductForm />
          </div>
        </main>
      </div>
    </div>
  );
}
