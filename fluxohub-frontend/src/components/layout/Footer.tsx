import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-dark-surface border-t border-white/10 py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-2xl font-bold tracking-tighter text-white">
              fluxo<span className="text-neon-green">hub</span>
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              O coração do comércio, agora no mundo digital. O maior ecossistema de vendas da nuvem.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Comprar</h3>
            <ul className="space-y-3">
              <li><Link href="/catalog" className="text-sm text-gray-400 hover:text-neon-green transition-colors">Catálogo</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-neon-green transition-colors">Ofertas em Alta</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-neon-green transition-colors">Lançamentos</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Lojista</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-gray-400 hover:text-neon-green transition-colors">Venda no FluxoHub</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-neon-green transition-colors">Painel Admin</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-neon-green transition-colors">Taxas e Condições</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Suporte</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-gray-400 hover:text-neon-green transition-colors">FAQ</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-neon-green transition-colors">Contato</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-neon-green transition-colors">Termos de Uso</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} FluxoHub. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="text-xs text-gray-500">Beta Version</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
