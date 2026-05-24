import { Button } from '@/components';

interface AuthStepFooterProps {
  submitLabel: string;
  onBack?: () => void;
  backDisabled?: boolean;
  isSubmitting?: boolean;
  submitDisabled?: boolean;
}

export function AuthStepFooter({
  submitLabel,
  onBack,
  backDisabled,
  isSubmitting,
  submitDisabled,
}: AuthStepFooterProps) {
  return (
    <div className="mt-auto flex items-center justify-between gap-2.5 pt-10">
      <Button
        type="button"
        variant="outline"
        size="step"
        onClick={onBack}
        disabled={backDisabled ?? !onBack}
      >
        Back
      </Button>
      <Button type="submit" size="step" isLoading={isSubmitting} disabled={submitDisabled}>
        {submitLabel}
      </Button>
    </div>
  );
}
