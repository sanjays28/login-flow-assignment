import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
}

export function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50',
        variant === 'primary' && 'bg-violet-600 text-white hover:bg-violet-700',
        variant === 'ghost' && 'text-violet-600 hover:bg-violet-50',
        className,
      )}
      {...props}
    />
  );
}
