import type { ReactNode } from 'react';
import { cn } from '@/utils';

interface AuthFormCardProps {
  children: ReactNode;
  className?: string;
}

export function AuthFormCard({ children, className }: AuthFormCardProps) {
  return (
    <div
      className={cn(
        'w-full max-w-[440px] rounded-2xl bg-surface p-6 shadow-[0_4px_24px_rgba(26,31,54,0.08)] sm:p-8',
        className,
      )}
    >
      {children}
    </div>
  );
}
