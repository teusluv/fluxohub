import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import { ArrowRight, Zap, Shield, Rocket } from "lucide-react";

export default function Home() {
  const dummyProducts = [
    { id: "1", name: "CyberDeck Pro Keyboard", price: 149.99, rating: 4.8, reviews: 124, category: "Eletrônicos", image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80" },
    { id: "2", name: "Neon Noise Cancelling Headphones", price: 299.00, rating: 4.9, reviews: 342, category: "Eletrônicos", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80" },
    { id: "3", name: "Urban Streetwear Hoodie", price: 89.50, rating: 4.5, reviews: 56, category: "Roupas", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80" },
    { id: "4", name: "Smart Holographic Watch", price: 199.99, rating: 4.7, reviews: 89, category: "Acessórios", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80" },
  ];

  const categories = ["Eletrônicos", "Roupas", "Acessórios", "Casa Inteligente", "Games", "Fitness"];

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=2564&q=80" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight">
            Descubra o Futuro do <span className="text-neon-green neon-text-green">Comércio</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            O FluxoHub conecta você aos melhores lojistas do mercado. Produtos exclusivos, entrega rápida e uma experiência de compra next-gen.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="/catalog" className="px-8 py-4 bg-neon-green text-black font-bold rounded-full hover:bg-[#32e011] hover:shadow-[0_0_20px_rgba(57,255,20,0.4)] transition-all flex items-center">
              Explorar Catálogo <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link href="#" className="px-8 py-4 bg-glass border border-white/10 text-white font-semibold rounded-full hover:bg-white/5 transition-all">
              Seja um Lojista
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
            {categories.map((cat) => (
              <Link key={cat} href={`/catalog?cat=${cat.toLowerCase()}`} className="flex-shrink-0 px-6 py-3 glass-card rounded-full text-white font-medium hover:border-neon-green hover:text-neon-green transition-colors">
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-white">Trending Now</h2>
              <p className="text-gray-400 mt-2">Os produtos mais desejados do momento.</p>
            </div>
            <Link href="/catalog" className="text-neon-green hover:underline font-medium flex items-center">
              Ver todos <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dummyProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-dark-surface-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="glass p-8 rounded-2xl flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-neon-green/10 flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-neon-green" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Velocidade Extrema</h3>
              <p className="text-gray-400">Plataforma otimizada para compras em segundos, sem travamentos.</p>
            </div>
            <div className="glass p-8 rounded-2xl flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-neon-purple/10 flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-neon-purple" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Compra Segura</h3>
              <p className="text-gray-400">Seus dados e pagamentos protegidos por criptografia de ponta a ponta.</p>
            </div>
            <div className="glass p-8 rounded-2xl flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-neon-blue/10 flex items-center justify-center mb-6">
                <Rocket className="w-8 h-8 text-neon-blue" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Entrega Expressa</h3>
              <p className="text-gray-400">Logística conectada com os melhores parceiros para entrega rápida.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
