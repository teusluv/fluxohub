"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export type StoreInfo = {
  id: string;
  name: string;
  slug: string;
  category: string;
  productCount: number;
  logoUrl?: string;
  isNew?: boolean;
}

export function StoreCard({ store }: { store: StoreInfo }) {
  return (
    <Link href={`/loja/${store.slug}`}>
      <motion.article 
        initial={{ opacity: 0, scale: 0.95 }} 
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ y: -6, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
        className="group flex flex-col bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl transition-all duration-300 cursor-pointer relative overflow-hidden"
      >
        {/* Banner Superior com Gradiente Dinâmico */}
        <div className="h-24 w-full bg-gradient-to-r from-gray-800 dark:from-gray-950 to-black relative">
          {store.isNew && (
            <span className="absolute top-4 right-4 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full z-10 shadow-sm">
              Nova
            </span>
          )}
        </div>
        
        <div className="px-6 pb-6 pt-0 relative flex-1 flex flex-col">
          {/* Logo Circular Sobreposta */}
          <div className="h-16 w-16 -mt-8 mb-4 bg-white dark:bg-gray-800 rounded-full border-[3px] border-white dark:border-gray-900 shadow-sm flex flex-shrink-0 items-center justify-center overflow-hidden z-10 transition-colors">
             {store.logoUrl ? (
               // eslint-disable-next-line @next/next/no-img-element
               <img src={store.logoUrl} alt={store.name} className="h-full w-full object-cover" />
             ) : (
               <span className="text-gray-800 dark:text-white text-xl font-bold font-display">{store.name.charAt(0)}</span>
             )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors line-clamp-1">
              {store.name}
            </h3>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">{store.category}</p>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center transition-colors">
             <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
               <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
               {store.productCount} Produtos
             </span>
             <span className="text-xs font-bold text-black dark:text-white uppercase flex items-center group-hover:translate-x-1 transition-transform">
               Visitar <span className="ml-1 text-red-600 dark:text-red-500">&rarr;</span>
             </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
