import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'default' | 'step';
  fullWidth?: boolean;
  isLoading?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'default',
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
        'inline-flex items-center justify-center font-medium transition-colors',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus',
        'disabled:cursor-not-allowed disabled:opacity-50',
        size === 'default' && 'min-h-11 rounded-full px-6 text-sm sm:min-h-12 sm:text-base',
        size === 'step' &&
          'h-auto min-h-0 w-64 max-w-full shrink-0 rounded-[38px] px-8 py-4 text-sm',
        fullWidth && 'w-full',
        variant === 'primary' && 'bg-primary text-text-inverse hover:bg-primary-hover',
        variant === 'outline' &&
          (size === 'step'
            ? 'border-0 bg-surface text-primary outline outline-2 outline-offset-[-2px] outline-border hover:outline-primary/40'
            : 'border border-border bg-surface text-primary hover:border-primary hover:bg-surface-muted'),
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
