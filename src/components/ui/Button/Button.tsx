import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
  fullWidth?: boolean;
  isLoading?: boolean;
}

export function Button({
  variant = 'primary',
  fullWidth = false,
  isLoading = false,
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      className={cn(
        'inline-flex min-h-12 items-center justify-center rounded-lg px-4 text-sm font-medium transition-colors sm:text-base',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus',
        'disabled:cursor-not-allowed disabled:opacity-50',
        fullWidth && 'w-full',
        variant === 'primary' && 'bg-primary text-text-inverse hover:bg-primary-hover',
        variant === 'ghost' && 'text-text-link hover:bg-surface-muted',
        className,
      )}
      disabled={isDisabled}
      {...props}
    >
      {isLoading ? 'Please wait…' : children}
    </button>
  );
}
