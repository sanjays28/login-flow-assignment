import { cn } from '@/utils';

interface FieldHintProps {
  children: React.ReactNode;
  variant?: 'default' | 'empty';
  className?: string;
}

export function FieldHint({ children, variant = 'default', className }: FieldHintProps) {
  return (
    <p
      className={cn(
        'mt-2 text-sm transition-opacity duration-200',
        variant === 'empty' ? 'text-text-secondary/80' : 'text-text-secondary',
        className,
      )}
    >
      {children}
    </p>
  );
}
