import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import { cn } from '@/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, className, id, ...props },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className="w-full min-w-0">
      <label htmlFor={inputId} className="mb-2 block text-sm font-medium text-text-primary">
        {label}
      </label>
      <input
        ref={ref}
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        className={cn(
          'min-h-12 w-full min-w-0 rounded-lg border bg-surface px-3 py-2 text-base text-text-primary sm:px-4',
          'placeholder:text-text-secondary',
          'focus:border-border-focus focus:outline-none focus:ring-2 focus:ring-border-focus/20',
          error ? 'border-error' : 'border-border',
          className,
        )}
        {...props}
      />
      {error && (
        <p id={errorId} className="mt-1.5 text-sm text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});
