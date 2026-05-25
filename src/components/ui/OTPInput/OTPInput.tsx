import { useId, useRef, type ClipboardEvent, type KeyboardEvent } from 'react';
import { cn } from '@/utils';

const OTP_LENGTH = 4;

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
}

export function OTPInput({ value, onChange, error, hint }: OTPInputProps) {
  const baseId = useId();
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const digits = Array.from({ length: OTP_LENGTH }, (_, index) => value[index] ?? '');
  const errorId = error ? `${baseId}-error` : undefined;
  const hintId = hint && !error ? `${baseId}-hint` : undefined;
  const isEmpty = value.length === 0;

  const updateDigit = (index: number, digit: string) => {
    const sanitized = digit.replace(/\D/g, '').slice(-1);
    const nextDigits = Array.from({ length: OTP_LENGTH }, (_, i) => value[i] ?? '');
    nextDigits[index] = sanitized;
    onChange(nextDigits.join(''));

    if (sanitized && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    onChange(pasted);

    const focusIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <div className="w-full min-w-0">
      <div className="flex gap-3" role="group" aria-label="One-time password">
        {digits.map((digit, index) => (
          <input
            key={`${baseId}-${index}`}
            ref={(element) => {
              inputRefs.current[index] = element;
            }}
            type="text"
            inputMode="numeric"
            autoComplete={index === 0 ? 'one-time-code' : 'off'}
            maxLength={1}
            value={digit}
            aria-label={`Digit ${index + 1} of ${OTP_LENGTH}`}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : hintId}
            className={cn(
              'h-14 w-14 rounded-2xl border bg-surface text-center text-xl font-semibold text-text-primary',
              'transition-all duration-150 ease-out',
              'hover:border-primary/50',
              'focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20',
              'active:scale-[0.97]',
              error ? 'border-error hover:border-error' : 'border-border-input',
              isEmpty && !error && 'bg-surface-muted/40',
            )}
            onChange={(event) => updateDigit(index, event.target.value)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            onPaste={handlePaste}
          />
        ))}
      </div>
      {error ? (
        <p id={errorId} className="mt-2 text-sm text-error" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="mt-2 text-sm text-text-secondary">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
