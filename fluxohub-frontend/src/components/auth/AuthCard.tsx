import { motion } from 'framer-motion';
import Link from 'next/link';

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthCard({ children, title, subtitle }: AuthCardProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0A0A0A] text-[#FAFAFA]">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-[440px] bg-[#111111] sm:border sm:border-[#27272A] sm:rounded-2xl p-6 sm:p-10 shadow-2xl"
      >
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="mb-6 hover:opacity-80 transition-opacity">
            <h1 className="text-2xl font-bold tracking-tighter text-white">fluxohub<span className="text-green-500">.</span></h1>
          </Link>
          <h2 className="text-2xl font-semibold text-center mb-2">{title}</h2>
          <p className="text-sm text-[#A1A1AA] text-center">{subtitle}</p>
        </div>

        {children}
      </motion.div>
    </div>
  );
}
