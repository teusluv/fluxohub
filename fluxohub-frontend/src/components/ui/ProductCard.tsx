import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
}

export default function ProductCard({ id, name, price, rating, reviews, image, category }: ProductCardProps) {
  return (
    <div className="group glass-card rounded-xl overflow-hidden hover:border-neon-green/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(57,255,20,0.1)] flex flex-col h-full">
      <Link href={`/product/${id}`} className="relative aspect-square overflow-hidden bg-dark-surface block">
        <img 
          src={image} 
          alt={name} 
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider text-gray-300">
          {category}
        </div>
      </Link>
      
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <Link href={`/product/${id}`}>
            <h3 className="text-lg font-semibold text-white group-hover:text-neon-green transition-colors line-clamp-2">
              {name}
            </h3>
          </Link>
          <div className="flex items-center mt-2 space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium text-white">{rating}</span>
            <span className="text-sm text-gray-500">({reviews})</span>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-white">
            ${price.toFixed(2)}
          </span>
          <button className="h-10 w-10 rounded-full bg-dark-surface-alt flex items-center justify-center border border-white/10 hover:border-neon-green hover:bg-neon-green/10 text-white hover:text-neon-green transition-all group/btn">
            <ShoppingCart className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
