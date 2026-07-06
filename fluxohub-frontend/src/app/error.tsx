"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertOctagon } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Diretriz de Prod: Nunca expor console.log pro cliente em ambiente de produção.
    // Aqui um Sentry ou Datadog capturaria o log silenciosamente.
    if (process.env.NODE_ENV !== "production") {
      console.error(error);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-3xl p-8 shadow-xl border border-gray-100 text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertOctagon size={32} />
        </div>
        <h2 className="text-2xl font-black font-display text-gray-900 tracking-tight mb-3">
          Ops, ocorreu uma falha
        </h2>
        <p className="text-gray-500 text-sm mb-8 leading-relaxed">
          Nossos servidores encontraram um comportamento inesperado. Fique tranquilo, não perdemos seus dados.
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => reset()}
            className="w-full bg-black text-white font-bold py-3.5 rounded-full hover:bg-gray-900 transition-colors"
          >
            Tentar Novamente
          </button>
          <Link
            href="/"
            className="w-full bg-white text-gray-900 font-bold py-3.5 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Voltar para o Início
          </Link>
        </div>
      </div>
    </div>
  );
}
