import { useId, type InputHTMLAttributes, type SelectHTMLAttributes } from 'react';
import { cn } from '@/utils';

const COUNTRY_CODES = [
  { value: '+91', label: '+91' },
  { value: '+1', label: '+1' },
  { value: '+44', label: '+44' },
] as const;

interface PhoneInputProps {
  label?: string;
  error?: string;
  selectProps?: SelectHTMLAttributes<HTMLSelectElement>;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}

export function PhoneInput({
  label = 'Phone number',
  error,
  selectProps,
  inputProps,
}: PhoneInputProps) {
  const baseId = useId();
  const inputId = inputProps?.id ?? `${baseId}-phone`;
  const errorId = error ? `${baseId}-error` : undefined;

  return (
    <div className="w-full min-w-0">
      <label htmlFor={inputId} className="mb-2 block text-sm font-medium text-text-primary">
        {label}
      </label>
      <div className="flex gap-2 sm:gap-3">
        <select
          aria-label="Country code"
          defaultValue="+91"
          className={cn(
            'min-h-12 shrink-0 rounded-lg border bg-surface px-2 text-base text-text-primary sm:px-3',
            'focus:border-border-focus focus:outline-none focus:ring-2 focus:ring-border-focus/20',
            error ? 'border-error' : 'border-border',
          )}
          {...selectProps}
        >
          {COUNTRY_CODES.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <input
          id={inputId}
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          placeholder="9876543210"
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          className={cn(
            'min-h-12 min-w-0 flex-1 rounded-lg border bg-surface px-3 py-2 text-base text-text-primary sm:px-4',
            'placeholder:text-text-secondary',
            'focus:border-border-focus focus:outline-none focus:ring-2 focus:ring-border-focus/20',
            error ? 'border-error' : 'border-border',
          )}
          {...inputProps}
        />
      </div>
      {error && (
        <p id={errorId} className="mt-1.5 text-sm text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
