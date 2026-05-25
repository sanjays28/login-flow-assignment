import { motion } from 'framer-motion';
import { cn } from '@/utils';

interface AuthProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export function AuthProgressBar({ currentStep, totalSteps, className }: AuthProgressBarProps) {
  const progress = Math.min(Math.max((currentStep / totalSteps) * 100, 0), 100);

  return (
    <div
      className={cn(
        'flex h-1.5 w-full overflow-hidden rounded-full border border-primary/35 bg-transparent lg:mx-auto lg:w-[80%] lg:max-w-[560px]',
        className,
      )}
      role="progressbar"
      aria-valuenow={currentStep}
      aria-valuemin={0}
      aria-valuemax={totalSteps}
      aria-label={`Step ${currentStep} of ${totalSteps}`}
    >
      <motion.div
        className="h-full rounded-full bg-primary"
        initial={false}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      />
    </div>
  );
}
