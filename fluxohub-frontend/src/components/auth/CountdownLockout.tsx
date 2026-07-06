import { useEffect, useState } from 'react';
import { Lock } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  initialSeconds: number;
  onExpire: () => void;
}

export function CountdownLockout({ initialSeconds, onExpire }: Props) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) {
      onExpire();
      return;
    }

    const interval = setInterval(() => {
      setSeconds((s) => s - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, onExpire]);

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const timeString = `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg p-4 flex items-center justify-center gap-3 mb-6"
    >
      <Lock className="w-5 h-5" />
      <span className="text-sm font-medium">Tente novamente em {timeString}</span>
    </motion.div>
  );
}
