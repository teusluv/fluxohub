import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Fallback simulando Geist Local
import { Toaster } from 'sonner';
import './globals.css';

// Usando Inter como fallback das "Geist" para evitar errors enquanto fontes locais não são injetadas no monorepo
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'fluxohub | Admin Panel',
  description: 'Painel administrativo do marketplace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Forçando a classe "dark" como padrão conforme exigido
    <html lang="pt-BR" className="dark">
      <body className={`${inter.variable} font-sans min-h-screen bg-background`}>
        {children}
        {/* Toaster do Sonner configurado para design dark */}
        <Toaster 
          theme="dark" 
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'hsl(var(--card))',
              color: 'hsl(var(--foreground))',
              border: '1px solid hsl(var(--border))',
            }
          }}
        />
      </body>
    </html>
  );
}
