import { useId, useRef, type ClipboardEvent, type KeyboardEvent } from 'react';
import { cn } from '@/utils';

const OTP_LENGTH = 4;

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function OTPInput({ value, onChange, error }: OTPInputProps) {
  const baseId = useId();
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const digits = Array.from({ length: OTP_LENGTH }, (_, index) => value[index] ?? '');
  const errorId = error ? `${baseId}-error` : undefined;

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
      <div className="flex w-full gap-2 sm:gap-3" role="group" aria-label="One-time password">
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
            aria-describedby={errorId}
            className={cn(
              'aspect-square min-h-12 min-w-0 flex-1 rounded-lg border bg-surface text-center text-lg font-medium text-text-primary sm:h-14 sm:max-w-14 sm:flex-none sm:text-xl',
              'focus:border-border-focus focus:outline-none focus:ring-2 focus:ring-border-focus/20',
              error ? 'border-error' : 'border-border',
            )}
            onChange={(event) => updateDigit(index, event.target.value)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            onPaste={handlePaste}
          />
        ))}
      </div>
      {error && (
        <p id={errorId} className="mt-2 text-sm text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
