import { cn } from '@/utils';

interface LoaderProps {
  className?: string;
}

export function Loader({ className }: LoaderProps) {
  return (
    <div
      className={cn(
        'h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent',
        className,
      )}
      role="status"
      aria-label="Loading"
    />
  );
}
