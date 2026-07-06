import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '@/lib/auth/schemas';
import { useAuth } from '@/hooks/useAuth';
import { CountdownLockout } from './CountdownLockout';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export function LoginForm() {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [lockoutSeconds, setLockoutSeconds] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setErrorMsg(null);
    try {
      await login(data);
    } catch (error: any) {
      if (error.response?.data) {
        const { error: errType, message, retryAfter } = error.response.data;
        if (errType === 'account_locked' && retryAfter) {
          setLockoutSeconds(retryAfter);
        } else if (errType === 'rate_limit_exceeded' && retryAfter) {
          setLockoutSeconds(retryAfter);
        } else {
          setErrorMsg(message || 'Erro ao realizar login.');
        }
      } else {
        setErrorMsg('Serviço indisponível no momento.');
      }
    }
  };

  if (lockoutSeconds !== null) {
    return (
      <CountdownLockout 
        initialSeconds={lockoutSeconds} 
        onExpire={() => setLockoutSeconds(null)} 
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-[#FAFAFA]">Senha</label>
          <Link href="/esqueci-minha-senha" className="text-xs text-green-500 hover:underline">
            Esqueceu a senha?
          </Link>
        </div>
        <div className="relative">
          <input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="••••••••"
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
      </div>

      <div className="flex items-center gap-2">
        <input
          {...register('rememberMe')}
          id="rememberMe"
          type="checkbox"
          className="w-4 h-4 rounded border-[#27272A] bg-[#18181B] text-green-500 focus:ring-green-500 focus:ring-offset-[#111111]"
        />
        <label htmlFor="rememberMe" className="text-sm text-[#A1A1AA] cursor-pointer">
          Manter-me conectado (30 dias)
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Entrando...</span>
          </>
        ) : (
          'Entrar'
        )}
      </button>

      <div className="text-center text-sm text-[#A1A1AA] mt-6">
        Não tem uma conta?{' '}
        <Link href="/cadastro" className="text-white hover:text-green-500 transition-colors font-medium">
          Criar conta
        </Link>
      </div>
    </form>
  );
}
