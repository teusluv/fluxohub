import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterFormData } from '@/lib/auth/schemas';
import { useAuth } from '@/hooks/useAuth';
import { PasswordStrengthMeter } from './PasswordStrengthMeter';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export function RegisterForm() {
  const { register: registerAction } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'CLIENTE',
    }
  });

  const passwordValue = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    setErrorMsg(null);
    try {
      await registerAction(data);
    } catch (error: any) {
      if (error.response?.data?.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg('Erro ao realizar cadastro.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {errorMsg && (
        <motion.div 
          initial={{ x: [-8, 8, -8, 8, 0] }}
          transition={{ duration: 0.4 }}
          className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400 text-sm"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </motion.div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <label
          className={`flex items-center justify-center p-3 rounded-lg border cursor-pointer transition-colors ${
            watch('role') === 'CLIENTE' ? 'bg-green-500/10 border-green-500 text-green-500' : 'bg-[#18181B] border-[#27272A] text-[#A1A1AA] hover:border-zinc-500'
          }`}
        >
          <input type="radio" value="CLIENTE" {...register('role')} className="hidden" />
          <span className="text-sm font-medium">Sou Cliente</span>
        </label>

        <label
          className={`flex items-center justify-center p-3 rounded-lg border cursor-pointer transition-colors ${
            watch('role') === 'LOJISTA' ? 'bg-green-500/10 border-green-500 text-green-500' : 'bg-[#18181B] border-[#27272A] text-[#A1A1AA] hover:border-zinc-500'
          }`}
        >
          <input type="radio" value="LOJISTA" {...register('role')} className="hidden" />
          <span className="text-sm font-medium">Sou Lojista</span>
        </label>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-[#FAFAFA]">Nome Completo</label>
        <input
          {...register('name')}
          type="text"
          placeholder="João da Silva"
          disabled={isSubmitting}
          className={`w-full bg-[#18181B] border ${errors.name ? 'border-red-500' : 'border-[#27272A]'} rounded-lg p-3 text-sm text-white focus:outline-none focus:border-green-500 transition-colors`}
        />
        {errors.name && <span className="text-red-400 text-xs">{errors.name.message}</span>}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-[#FAFAFA]">E-mail</label>
        <input
          {...register('email')}
          type="email"
          autoComplete="email"
          placeholder="voce@email.com"
          disabled={isSubmitting}
          className={`w-full bg-[#18181B] border ${errors.email ? 'border-red-500' : 'border-[#27272A]'} rounded-lg p-3 text-sm text-white focus:outline-none focus:border-green-500 transition-colors`}
        />
        {errors.email && <span className="text-red-400 text-xs">{errors.email.message}</span>}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-[#FAFAFA]">Senha</label>
        <div className="relative">
          <input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            placeholder="Crie uma senha forte"
            disabled={isSubmitting}
            className={`w-full bg-[#18181B] border ${errors.password ? 'border-red-500' : 'border-[#27272A]'} rounded-lg p-3 pr-10 text-sm text-white focus:outline-none focus:border-green-500 transition-colors`}
          />
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A1A1AA] hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && <span className="text-red-400 text-xs">{errors.password.message}</span>}
        <PasswordStrengthMeter password={passwordValue} />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-[#FAFAFA]">Confirmar Senha</label>
        <input
          {...register('confirmPassword')}
          type={showPassword ? 'text' : 'password'}
          autoComplete="new-password"
          placeholder="Repita sua senha"
          disabled={isSubmitting}
          className={`w-full bg-[#18181B] border ${errors.confirmPassword ? 'border-red-500' : 'border-[#27272A]'} rounded-lg p-3 text-sm text-white focus:outline-none focus:border-green-500 transition-colors`}
        />
        {errors.confirmPassword && <span className="text-red-400 text-xs">{errors.confirmPassword.message}</span>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Criando conta...</span>
          </>
        ) : (
          'Criar conta'
        )}
      </button>

      <div className="text-center text-sm text-[#A1A1AA] mt-6">
        Já tem uma conta?{' '}
        <Link href="/login" className="text-white hover:text-green-500 transition-colors font-medium">
          Entrar agora
        </Link>
      </div>
    </form>
  );
}
