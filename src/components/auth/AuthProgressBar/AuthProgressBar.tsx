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
        'mx-auto flex h-1.5 w-[80%] max-w-[560px] rounded-full border border-primary/35 bg-transparent',
        className,
      )}
      role="progressbar"
      aria-valuenow={currentStep}
      aria-valuemin={0}
      aria-valuemax={totalSteps}
      aria-label={`Step ${currentStep} of ${totalSteps}`}
    >
      <div
        className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
