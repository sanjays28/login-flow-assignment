import type { ReactNode } from 'react';
import { cn } from '@/utils';

interface AuthFormFooterProps {
  children: ReactNode;
  className?: string;
}

export function AuthFormFooter({ children, className }: AuthFormFooterProps) {
  return (
    <div
      className={cn(
        'mt-auto pt-6 sm:pt-8',
        'pb-[max(1rem,env(safe-area-inset-bottom))]',
        className,
      )}
    >
      {children}
    </div>
  );
}
