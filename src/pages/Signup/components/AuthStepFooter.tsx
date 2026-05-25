import { Button } from '@/components';

interface AuthStepFooterProps {
  submitLabel: string;
  onBack?: () => void;
  backDisabled?: boolean;
  isSubmitting?: boolean;
  submitDisabled?: boolean;
  loadingLabel?: string;
  emptyHint?: string;
}

export function AuthStepFooter({
  submitLabel,
  onBack,
  backDisabled,
  isSubmitting,
  submitDisabled,
  loadingLabel,
  emptyHint,
}: AuthStepFooterProps) {
  const showEmptyHint = Boolean(emptyHint && submitDisabled && !isSubmitting);

  return (
    <div className="mt-auto pt-6 sm:pt-10">
      {showEmptyHint && (
        <p className="mb-4 text-center text-sm text-text-secondary transition-opacity duration-200">
          {emptyHint}
        </p>
      )}
      <div className="flex items-center justify-between gap-2.5">
        <Button
          type="button"
          variant="outline"
          size="step"
          onClick={onBack}
          disabled={backDisabled ?? !onBack}
        >
          Back
        </Button>
        <Button
          type="submit"
          size="step"
          isLoading={isSubmitting}
          loadingLabel={loadingLabel}
          disabled={submitDisabled}
        >
          {submitLabel}
        </Button>
      </div>
    </div>
  );
}
