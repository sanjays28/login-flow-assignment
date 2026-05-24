import type { ReactNode } from 'react';
import { cn } from '@/utils';

interface AuthFormBodyProps {
  children: ReactNode;
  className?: string;
}

export function AuthFormBody({ children, className }: AuthFormBodyProps) {
  return <div className={cn('flex flex-1 flex-col gap-4 sm:gap-5', className)}>{children}</div>;
}
