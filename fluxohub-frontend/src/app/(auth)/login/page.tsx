'use client';

import { AuthCard } from '@/components/auth/AuthCard';
import { LoginForm } from '@/components/auth/LoginForm';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const isRegistered = searchParams.get('registered') === 'true';
  const sessionExpired = searchParams.get('session') === 'expired';

  return (
    <AuthCard
      title="Bem-vindo de volta"
      subtitle="Faça login para acessar sua conta."
    >
      <AnimatePresence>
        {isRegistered && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6 p-3 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg text-sm text-center"
          >
            Cadastro realizado com sucesso! Faça login.
          </motion.div>
        )}
        
        {sessionExpired && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6 p-3 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-lg text-sm text-center"
          >
            Sua sessão expirou. Por favor, logue novamente.
          </motion.div>
        )}
      </AnimatePresence>

      <LoginForm />
    </AuthCard>
  );
}
