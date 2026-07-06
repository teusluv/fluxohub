"use client";
import { useState } from "react";
import { Star, ShoppingCart, Heart, Share2, ShieldCheck, Truck } from "lucide-react";

export default function ProductDetails() {
  const [selectedColor, setSelectedColor] = useState("preto");
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  // Mock product data
  const product = {
    name: "CyberDeck Pro Keyboard",
    price: 149.99,
    rating: 4.8,
    reviews: 124,
    description: "Um teclado mecânico de última geração projetado para máxima performance. Switches ultra responsivos, iluminação RGB neon personalizável e corpo em alumínio aeroespacial. A escolha definitiva para programadores e gamers competitivos.",
    colors: [
      { id: "preto", hex: "#000000" },
      { id: "branco", hex: "#FFFFFF" },
      { id: "neon", hex: "#39FF14" }
    ],
    sizes: ["P", "M", "G"],
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1200&q=80",
    seller: "TechNinja Store"
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
      {/* Breadcrumb */}
      <nav className="flex text-sm text-gray-400 mb-8">
        <a href="/" className="hover:text-neon-green transition-colors">Home</a>
        <span className="mx-2">/</span>
        <a href="/catalog" className="hover:text-neon-green transition-colors">Eletrônicos</a>
        <span className="mx-2">/</span>
        <span className="text-gray-200">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Image */}
        <div className="space-y-4">
          <div className="aspect-square rounded-2xl overflow-hidden glass-card border border-white/10 relative">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
            <button className="absolute top-4 right-4 p-3 rounded-full glass hover:bg-white/10 transition-colors">
              <Heart className="w-5 h-5 text-white hover:text-red-500 transition-colors" />
            </button>
          </div>
          {/* Thumbnails placeholder */}
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square rounded-lg glass-card border border-white/10 bg-dark-surface overflow-hidden cursor-pointer hover:border-neon-green transition-colors">
                <img src={product.image} alt="Thumbnail" className="w-full h-full object-cover opacity-70 hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="flex flex-col">
          <div className="mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-neon-green">Em destaque</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{product.name}</h1>
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
              ))}
            </div>
            <span className="text-sm font-medium text-white">{product.rating}</span>
            <span className="text-sm text-gray-500 hover:text-neon-green cursor-pointer underline underline-offset-4">({product.reviews} avaliações)</span>
          </div>

          <div className="text-4xl font-black text-white mb-6">
            ${product.price.toFixed(2)}
          </div>

          <p className="text-gray-400 mb-8 leading-relaxed">
            {product.description}
          </p>

          <hr className="border-white/10 mb-8" />

          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-white mb-3">Cor: <span className="text-gray-400 capitalize">{selectedColor}</span></h3>
            <div className="flex space-x-3">
              {product.colors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setSelectedColor(color.id)}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor === color.id ? 'border-neon-green scale-110' : 'border-transparent'}`}
                  style={{ backgroundColor: color.hex }}
                  aria-label={`Selecionar cor ${color.id}`}
                />
              ))}
            </div>
          </div>

          {/* Quantity & Buy Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex items-center glass rounded-lg border border-white/10 h-14">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 text-gray-400 hover:text-white text-xl">-</button>
              <span className="w-10 text-center text-white font-medium">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-4 text-gray-400 hover:text-white text-xl">+</button>
            </div>
            
            <button className="flex-1 bg-neon-green hover:bg-[#32e011] text-black font-bold text-lg rounded-lg h-14 flex items-center justify-center transition-all hover:shadow-[0_0_20px_rgba(57,255,20,0.4)]">
              <ShoppingCart className="w-5 h-5 mr-2" /> Comprar Agora
            </button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-2 gap-4 mt-auto pt-6 border-t border-white/10">
            <div className="flex items-center space-x-3 text-sm text-gray-400">
              <ShieldCheck className="w-5 h-5 text-neon-green" />
              <span>Garantia de 30 dias FluxoHub</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-400">
              <Truck className="w-5 h-5 text-neon-purple" />
              <span>Frete Expresso disponível</span>
            </div>
          </div>
          
          <div className="mt-6 text-sm text-gray-500 flex items-center justify-between">
            <span>Vendido e entregue por <strong className="text-white">{product.seller}</strong></span>
            <button className="flex items-center hover:text-white transition-colors">
              <Share2 className="w-4 h-4 mr-1" /> Compartilhar
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
