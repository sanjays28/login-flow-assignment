interface AuthProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function AuthProgressBar({ currentStep, totalSteps }: AuthProgressBarProps) {
  const progress = Math.min(Math.max((currentStep / totalSteps) * 100, 0), 100);

  return (
    <div
      className="mb-5 h-1 w-full overflow-hidden rounded-full bg-surface-muted sm:mb-8"
      role="progressbar"
      aria-valuenow={currentStep}
      aria-valuemin={0}
      aria-valuemax={totalSteps}
      aria-label={`Step ${currentStep} of ${totalSteps}`}
    >
      <div
        className="h-full bg-primary transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
