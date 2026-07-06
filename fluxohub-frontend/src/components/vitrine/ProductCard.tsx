import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';

export type Product = {
  id: string;
  title: string;
  priceRetail: number;
  priceWholesale?: number;
  imageUrl: string;
  stock: number;
}

export function ProductCard({ product }: { product: Product }) {
  const isSoldOut = product.stock === 0;
  const params = useParams();
  const slug = params?.tenantSlug || "loja-teste";

  return (
    <Link 
      href={isSoldOut ? "#" : `/loja/${slug}/produto/${product.id}`}
      className={`group flex flex-col gap-3 ${isSoldOut ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'}`}
      data-testid={`link-produto-${product.id}`}
      onClick={(e) => {
        if (isSoldOut) e.preventDefault();
      }}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-2 rounded-lg">
        {/* Placeholder se não tiver imagem real */}
        <div className={`absolute inset-0 bg-gray-200 flex items-center justify-center transition-transform duration-700 group-hover:scale-105 ${isSoldOut ? 'grayscale opacity-70' : ''}`}>
           <div className="text-gray-400 text-xs text-center px-4">
              {product.imageUrl ? 'Imagem do Produto' : 'Sem Imagem'}
           </div>
        </div>

        {isSoldOut && (
          <div className="absolute inset-0 bg-white/40 flex items-center justify-center z-10 backdrop-blur-sm">
            <span data-testid="tag-esgotado" className="text-black text-xs font-bold uppercase tracking-[0.2em] bg-white px-4 py-2 shadow-sm">Esgotado</span>
          </div>
        )}
      </div>
      
      {/* Tipografia refinada */}
      <div className="flex flex-col items-center text-center px-2">
        <h3 className="text-xs sm:text-sm font-medium text-gray-900 tracking-wide uppercase line-clamp-2">
          {product.title}
        </h3>
        
        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm sm:text-base font-bold text-black">
            R$ {product.priceRetail.toFixed(2)}
          </span>
        </div>
        
        {product.priceWholesale && !isSoldOut && (
          <span className="text-[10px] sm:text-xs text-gray-500 mt-1 uppercase tracking-wider">
            Atacado: R$ {product.priceWholesale.toFixed(2)}
          </span>
        )}
      </div>
    </Link>
  );
}
