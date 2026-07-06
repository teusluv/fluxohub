import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-lg">
        <div className="w-24 h-24 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-6">
          <SearchX size={48} strokeWidth={1.5} />
        </div>
        <h2 className="text-4xl font-black font-display text-gray-900 tracking-tight mb-4">
          Página não encontrada
        </h2>
        <p className="text-gray-500 text-base mb-8 leading-relaxed">
          O lojista ou a vitrine que você está procurando pode ter mudado de endereço ou não existe mais na nossa plataforma.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center bg-black text-white font-bold px-8 py-3.5 rounded-full hover:bg-gray-900 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-black/10"
        >
          Explorar o Marketplace
        </Link>
      </div>
    </div>
  );
}
