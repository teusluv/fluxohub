'use client';

import { AuthCard } from '@/components/auth/AuthCard';
import { RegisterForm } from '@/components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <AuthCard
      title="Criar sua conta"
      subtitle="Junte-se ao fluxohub hoje mesmo."
    >
      <RegisterForm />
    </AuthCard>
  );
}
