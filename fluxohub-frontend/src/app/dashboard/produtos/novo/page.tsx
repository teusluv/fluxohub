"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, CheckCircle2, UploadCloud, Loader2, ArrowLeft } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const productSchema = z.object({
  title: z.string().min(3, "Título muito curto"),
  priceRetail: z.number().min(0.1, "Preço de varejo inválido"),
  priceWholesale: z.number().optional(),
  variations: z.array(z.object({
    size: z.string().min(1, "Obrigatório"),
    stock: z.number().min(0, "Estoque inválido")
  })).min(1, "Adicione pelo menos uma variação")
});

export default function FastProductCreate() {
  const router = useRouter();
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    priceRetail: "",
    priceWholesale: "",
    variations: [{ size: "", stock: "" }]
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleImageCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("A imagem deve ter no máximo 5MB");
        return;
      }
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const addVariationRow = () => {
    setFormData(prev => ({
      ...prev,
      variations: [...prev.variations, { size: "", stock: "" }]
    }));
  };

  const removeVariationRow = (index: number) => {
    if (formData.variations.length === 1) return;
    setFormData(prev => ({
      ...prev,
      variations: prev.variations.filter((_, i) => i !== index)
    }));
  };

  const handleVariationChange = (index: number, field: "size" | "stock", value: string) => {
    const newVars = [...formData.variations];
    newVars[index][field] = value;
    setFormData(prev => ({ ...prev, variations: newVars }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!image) {
      toast.error("Tire uma foto do produto!");
      return;
    }

    const payloadToValidate = {
      title: formData.title,
      priceRetail: Number(formData.priceRetail.replace(",", ".")),
      priceWholesale: formData.priceWholesale ? Number(formData.priceWholesale.replace(",", ".")) : undefined,
      variations: formData.variations.map(v => ({
        size: v.size.toUpperCase(),
        stock: parseInt(v.stock, 10) || 0
      }))
    };

    const validation = productSchema.safeParse(payloadToValidate);
    
    if (!validation.success) {
      const formattedErrors: { [key: string]: string } = {};
      validation.error.issues.forEach(issue => {
        formattedErrors[issue.path.join(".")] = issue.message;
      });
      setErrors(formattedErrors);
      toast.error("Corrija os erros destacados no formulário.");
      return;
    }

    setIsLoading(true);

    try {
      // Simula upload de S3 e POST /api/products
      await new Promise((resolve, reject) => {
        setTimeout(() => resolve(true), 1500); // 1.5s network delay
      });

      setIsSuccess(true);
      toast.success("Produto publicado com sucesso!", { id: "toast-sucesso" });
      
      // Reset after success
      setTimeout(() => {
        setIsSuccess(false);
        setImage(null);
        setPreviewUrl(null);
        setFormData({ title: "", priceRetail: "", priceWholesale: "", variations: [{ size: "", stock: "" }] });
      }, 2000);

    } catch (err) {
      toast.error("Falha de conexão. O produto não foi salvo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 sm:p-6 pb-24">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="p-2 bg-gray-900 rounded-full hover:bg-gray-800 transition-colors">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Cadastro Relâmpago</h1>
      </header>
      
      <motion.form 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-6 max-w-md mx-auto"
        onSubmit={handleSubmit}
      >
        <label className="relative flex flex-col items-center justify-center w-full aspect-square sm:aspect-[4/3] border-2 border-dashed border-gray-700 rounded-3xl cursor-pointer bg-gray-900 overflow-hidden hover:border-green-500 transition-colors shadow-inner">
          {previewUrl ? (
             // eslint-disable-next-line @next/next/no-img-element
            <img src={previewUrl} alt="Preview" className="object-cover w-full h-full opacity-90" />
          ) : (
            <div className="flex flex-col items-center gap-3 text-gray-400">
              <Camera size={48} className="text-gray-500" strokeWidth={1.5} />
              <span className="text-sm font-medium uppercase tracking-widest text-gray-500">Tocar para Câmera</span>
            </div>
          )}
          <input 
            type="file" 
            accept="image/*" 
            capture="environment"
            className="hidden" 
            onChange={handleImageCapture}
          />
        </label>
        
        <div className="space-y-4">
          <div>
            <input 
              data-testid="input-titulo"
              type="text" 
              placeholder="Título (Ex: Vestido Floral)" 
              disabled={isLoading || isSuccess}
              className={`w-full bg-gray-900 border ${errors.title ? 'border-red-500' : 'border-gray-800'} rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-white transition-colors`}
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
            />
            {errors.title && <span className="text-red-500 text-xs ml-2 mt-1 block">{errors.title}</span>}
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <input 
                data-testid="input-preco-varejo"
                type="text" 
                inputMode="decimal"
                placeholder="Varejo R$" 
                disabled={isLoading || isSuccess}
                className={`w-full bg-gray-900 border ${errors.priceRetail ? 'border-red-500' : 'border-gray-800'} rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-white transition-colors`}
                value={formData.priceRetail}
                onChange={e => setFormData({...formData, priceRetail: e.target.value})}
              />
            </div>
            <div className="flex-1">
              <input 
                type="text" 
                inputMode="decimal"
                placeholder="Atacado R$" 
                disabled={isLoading || isSuccess}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-white transition-colors"
                value={formData.priceWholesale}
                onChange={e => setFormData({...formData, priceWholesale: e.target.value})}
              />
            </div>
          </div>

          {/* Dinâmico de Variações */}
          <div className="bg-gray-900 p-4 rounded-2xl border border-gray-800 space-y-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Tamanhos e Estoque</span>
            </div>
            
            {formData.variations.map((vari, idx) => (
              <div key={idx} className="flex gap-2">
                <input 
                  data-testid={`input-variacao-${idx}-tamanho`}
                  type="text" 
                  placeholder="Tam" 
                  disabled={isLoading || isSuccess}
                  className="w-1/3 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-white uppercase text-center"
                  value={vari.size}
                  onChange={e => handleVariationChange(idx, "size", e.target.value)}
                />
                <input 
                  data-testid={`input-variacao-${idx}-estoque`}
                  type="number" 
                  placeholder="Estoque" 
                  disabled={isLoading || isSuccess}
                  className="w-1/3 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-white text-center"
                  value={vari.stock}
                  onChange={e => handleVariationChange(idx, "stock", e.target.value)}
                />
                {formData.variations.length > 1 && (
                  <button 
                    type="button" 
                    onClick={() => removeVariationRow(idx)}
                    disabled={isLoading || isSuccess}
                    className="flex-1 bg-red-950/30 text-red-500 rounded-lg font-bold hover:bg-red-900/50 transition-colors"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            
            <button 
              type="button" 
              onClick={addVariationRow}
              disabled={isLoading || isSuccess}
              className="w-full py-2 border border-dashed border-gray-700 rounded-lg text-sm text-gray-400 font-bold hover:text-white hover:border-gray-500 transition-colors mt-2"
            >
              + Adicionar Variação
            </button>
          </div>
        </div>
        
        <button 
          data-testid="btn-salvar-produto"
          type="submit" 
          disabled={isLoading || isSuccess}
          aria-busy={isLoading}
          className={`w-full py-4.5 rounded-2xl flex items-center justify-center gap-2 font-bold text-lg transition-all ${
            isSuccess ? "bg-green-500 text-white" : "bg-white text-black hover:bg-gray-200 active:scale-95"
          } ${(isLoading || isSuccess) ? "opacity-90 cursor-not-allowed" : ""}`}
        >
          {isLoading ? <Loader2 className="animate-spin" /> : isSuccess ? <CheckCircle2 /> : <UploadCloud size={22} />}
          {isLoading ? "Enviando..." : isSuccess ? "Publicado!" : "Publicar Produto"}
        </button>
      </motion.form>
    </div>
  );
}
