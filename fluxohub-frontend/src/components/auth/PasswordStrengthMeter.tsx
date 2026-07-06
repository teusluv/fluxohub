import { motion } from 'framer-motion';

interface Props {
  password?: string;
}

export function PasswordStrengthMeter({ password = '' }: Props) {
  const getStrength = (pass: string) => {
    let score = 0;
    if (!pass) return score;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score;
  };

  const score = getStrength(password);

  const colors = ['bg-zinc-800', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];
  const labels = ['Muito fraca', 'Fraca', 'Razoável', 'Boa', 'Forte'];

  return (
    <div className="mt-2 space-y-2">
      <div className="flex h-1 gap-1">
        {[1, 2, 3, 4].map((index) => (
          <div key={index} className="h-full flex-1 rounded-full bg-[#27272A] overflow-hidden">
            <motion.div
              className={`h-full ${colors[score]}`}
              initial={{ width: 0 }}
              animate={{ width: score >= index ? '100%' : '0%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          </div>
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: score > 0 ? 1 : 0 }}
        className="text-xs text-right text-[#A1A1AA]"
      >
        Força: <span className="font-medium text-white">{labels[score]}</span>
      </motion.p>
    </div>
  );
}
