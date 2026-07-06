import ProductCard from "@/components/ui/ProductCard";
import { Filter, SlidersHorizontal, ChevronDown } from "lucide-react";

export default function Catalog() {
  const dummyProducts = [
    { id: "1", name: "CyberDeck Pro Keyboard", price: 149.99, rating: 4.8, reviews: 124, category: "Eletrônicos", image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80" },
    { id: "2", name: "Neon Noise Cancelling Headphones", price: 299.00, rating: 4.9, reviews: 342, category: "Eletrônicos", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80" },
    { id: "3", name: "Urban Streetwear Hoodie", price: 89.50, rating: 4.5, reviews: 56, category: "Roupas", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80" },
    { id: "4", name: "Smart Holographic Watch", price: 199.99, rating: 4.7, reviews: 89, category: "Acessórios", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80" },
    { id: "5", name: "Quantum Gaming Mouse", price: 79.99, rating: 4.6, reviews: 210, category: "Games", image: "https://images.unsplash.com/photo-1527814050087-17936173b9e4?auto=format&fit=crop&w=800&q=80" },
    { id: "6", name: "Techwear Cargo Pants", price: 110.00, rating: 4.4, reviews: 45, category: "Roupas", image: "https://images.unsplash.com/photo-1622445272461-c458007e9e51?auto=format&fit=crop&w=800&q=80" },
    { id: "7", name: "LED RGB Room Strip", price: 29.99, rating: 4.2, reviews: 512, category: "Casa Inteligente", image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80" },
    { id: "8", name: "VR Headset Nexus X", price: 499.00, rating: 4.9, reviews: 890, category: "Eletrônicos", image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=800&q=80" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Catálogo de Produtos</h1>
          <p className="text-gray-400 mt-1">Mostrando 8 resultados de milhares</p>
        </div>
        
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none glass px-4 py-2 rounded-lg text-white flex items-center justify-center space-x-2 border border-white/10 hover:border-neon-green transition-all">
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filtros</span>
          </button>
          <div className="relative flex-1 md:flex-none">
            <select className="w-full glass appearance-none px-4 py-2 pr-10 rounded-lg text-white border border-white/10 focus:outline-none focus:border-neon-green">
              <option>Mais Relevantes</option>
              <option>Menor Preço</option>
              <option>Maior Preço</option>
              <option>Mais Vendidos</option>
            </select>
            <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-6">
          {/* Categories */}
          <div className="glass-card p-5 rounded-xl border border-white/5">
            <h3 className="font-semibold text-white mb-4 flex items-center">
              <Filter className="w-4 h-4 mr-2 text-neon-green" /> Categorias
            </h3>
            <ul className="space-y-2">
              {['Eletrônicos', 'Roupas', 'Acessórios', 'Casa Inteligente', 'Games'].map((cat) => (
                <li key={cat}>
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input type="checkbox" className="form-checkbox bg-dark-surface border-white/20 text-neon-green focus:ring-neon-green rounded" />
                    <span className="text-gray-300 group-hover:text-white transition-colors">{cat}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Range */}
          <div className="glass-card p-5 rounded-xl border border-white/5">
            <h3 className="font-semibold text-white mb-4">Preço</h3>
            <div className="flex items-center space-x-2">
              <input type="number" placeholder="Min" className="w-full bg-dark-surface border border-white/10 rounded p-2 text-white text-sm focus:border-neon-green focus:outline-none" />
              <span className="text-gray-500">-</span>
              <input type="number" placeholder="Max" className="w-full bg-dark-surface border border-white/10 rounded p-2 text-white text-sm focus:border-neon-green focus:outline-none" />
            </div>
            <button className="mt-4 w-full bg-white/5 hover:bg-neon-green/10 text-white hover:text-neon-green border border-white/10 hover:border-neon-green transition-all rounded py-2 text-sm font-medium">
              Aplicar
            </button>
          </div>
          
          {/* Condition */}
          <div className="glass-card p-5 rounded-xl border border-white/5">
            <h3 className="font-semibold text-white mb-4">Condição</h3>
            <ul className="space-y-2">
              <li>
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input type="radio" name="condition" className="form-radio bg-dark-surface border-white/20 text-neon-green focus:ring-neon-green" />
                  <span className="text-gray-300 group-hover:text-white transition-colors">Novo</span>
                </label>
              </li>
              <li>
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input type="radio" name="condition" className="form-radio bg-dark-surface border-white/20 text-neon-green focus:ring-neon-green" />
                  <span className="text-gray-300 group-hover:text-white transition-colors">Usado</span>
                </label>
              </li>
            </ul>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {dummyProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
          
          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <div className="flex space-x-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-lg glass border border-white/10 text-gray-400 hover:text-white hover:border-neon-green transition-all">
                &laquo;
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-neon-green text-black font-bold">
                1
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg glass border border-white/10 text-gray-400 hover:text-white hover:border-neon-green transition-all">
                2
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg glass border border-white/10 text-gray-400 hover:text-white hover:border-neon-green transition-all">
                3
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg glass border border-white/10 text-gray-400 hover:text-white hover:border-neon-green transition-all">
                &raquo;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
