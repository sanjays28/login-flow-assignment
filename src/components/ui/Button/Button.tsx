import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/utils';
import { Loader } from '../Loader/Loader';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'default' | 'step';
  fullWidth?: boolean;
  isLoading?: boolean;
  loadingLabel?: string;
}

export function Button({
  variant = 'primary',
  size = 'default',
  fullWidth = false,
  isLoading = false,
  loadingLabel = 'Please wait…',
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium',
        'transition-all duration-150 ease-out',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus',
        'active:scale-[0.98]',
        'disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100',
        size === 'default' && 'min-h-11 rounded-full px-6 text-sm sm:min-h-12 sm:text-base',
        size === 'step' &&
          'h-auto min-h-0 w-64 max-w-full shrink-0 rounded-[38px] px-8 py-4 text-sm',
        fullWidth && 'w-full',
        variant === 'primary' &&
          'bg-primary text-text-inverse hover:bg-primary-hover active:bg-[#003db8]',
        variant === 'outline' &&
          (size === 'step'
            ? 'border-0 bg-surface text-primary outline outline-2 outline-offset-[-2px] outline-border hover:bg-surface-muted hover:outline-primary/50 active:bg-surface-muted'
            : 'border border-border bg-surface text-primary hover:border-primary hover:bg-surface-muted active:bg-surface-muted'),
        variant === 'ghost' && 'text-text-link hover:bg-surface-muted active:bg-surface-muted/80',
        className,
      )}
      disabled={isDisabled}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader className="h-4 w-4 shrink-0 border-2 border-current border-t-transparent" />
          <span>{loadingLabel}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
