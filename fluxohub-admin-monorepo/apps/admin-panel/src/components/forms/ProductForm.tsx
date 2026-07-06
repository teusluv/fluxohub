'use client';

import { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createProductSchema, type CreateProductInput } from '@fluxohub/shared-schemas';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Save, AlertCircle, Loader2 } from 'lucide-react';

export function ProductForm() {
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid },
    reset
  } = useForm<CreateProductInput>({
    resolver: zodResolver(createProductSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      sku: '',
      description: '',
      price: 0,
      baseStock: 0,
      weightKg: 0,
      lengthCm: 0,
      widthCm: 0,
      heightCm: 0,
      categoryId: '123e4567-e89b-12d3-a456-426614174000', // Mock UUID for test
    }
  });

  const formValues = watch();
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Unsaved Changes Guard
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  // 2. Auto-save Debounced (2 segundos)
  useEffect(() => {
    if (!isDirty || !isValid) return;

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(async () => {
      setIsAutoSaving(true);
      
      // Simula a request HTTP pro backend
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setLastSaved(new Date());
      setIsAutoSaving(false);
      reset(formValues, { keepDirty: false }); // Reseta o dirtiness para o guard não encher o saco
      
      toast.success('Rascunho salvo', {
        description: 'Seu progresso foi salvo automaticamente.',
        duration: 2000,
      });

    }, 2000);

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [formValues, isDirty, isValid, reset]);

  const onSubmit = async (data: CreateProductInput) => {
    // Submit Final Publicar Produto
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 1500)),
      {
        loading: 'Publicando produto no catálogo...',
        success: () => {
          reset(data);
          return 'Produto publicado com sucesso!';
        },
        error: 'Erro ao publicar produto',
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      
      {/* HEADER FEEDBACK */}
      <div className="flex items-center justify-between p-4 bg-muted/50 border border-border rounded-lg">
        <div className="flex items-center gap-3">
          {isAutoSaving ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-blue-500 text-sm font-medium">
              <Loader2 size={16} className="animate-spin" /> Salvando...
            </motion.div>
          ) : lastSaved ? (
            <span className="flex items-center gap-2 text-green-500 text-sm font-medium">
              <Save size={16} /> Salvo às {lastSaved.toLocaleTimeString()}
            </span>
          ) : isDirty ? (
            <span className="flex items-center gap-2 text-yellow-500 text-sm font-medium">
              <AlertCircle size={16} /> Alterações não salvas
            </span>
          ) : (
            <span className="text-muted-foreground text-sm">Formulário sincronizado</span>
          )}
        </div>

        <Button type="submit" disabled={!isValid || isAutoSaving}>
          Publicar Produto
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* BLOCO 1: INFOS BÁSICAS */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b border-border pb-2">Informações Básicas</h3>
          
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Produto</Label>
            <Input id="name" {...register('name')} placeholder="Ex: Camiseta Oversized" />
            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="sku">SKU (Código Interno)</Label>
            <Input id="sku" {...register('sku')} placeholder="Ex: CAM-OVER-01" />
            {errors.sku && <p className="text-xs text-destructive">{errors.sku.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Input id="description" {...register('description')} placeholder="Detalhes do produto..." />
            {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
          </div>
        </div>

        {/* BLOCO 2: PREÇO E ESTOQUE */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b border-border pb-2">Precificação e Estoque</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Preço Base (R$)</Label>
              <Input id="price" type="number" step="0.01" {...register('price', { valueAsNumber: true })} />
              {errors.price && <p className="text-xs text-destructive">{errors.price.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="promoPrice">Preço Promocional (R$)</Label>
              <Input id="promoPrice" type="number" step="0.01" {...register('promoPrice', { valueAsNumber: true })} />
              {errors.promoPrice && <p className="text-xs text-destructive">{errors.promoPrice.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="baseStock">Estoque Inicial</Label>
            <Input id="baseStock" type="number" {...register('baseStock', { valueAsNumber: true })} />
            {errors.baseStock && <p className="text-xs text-destructive">{errors.baseStock.message}</p>}
          </div>
        </div>
      </div>
    </form>
  );
}
