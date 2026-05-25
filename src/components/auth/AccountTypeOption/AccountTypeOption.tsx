import type { ReactNode } from 'react';
import { cn } from '@/utils';

interface AccountTypeOptionProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
  icon: ReactNode;
}

export function AccountTypeOption({ label, selected, onSelect, icon }: AccountTypeOptionProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        'flex h-20 w-full items-center gap-6 rounded-2xl border px-8 text-left shadow-[0_4px_8px_0_rgba(188,203,219,0.30)]',
        'transition-all duration-150 ease-out',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus',
        'active:scale-[0.99]',
        selected
          ? 'border-primary bg-surface hover:border-primary-hover hover:shadow-[0_6px_12px_0_rgba(0,84,253,0.12)]'
          : 'border-border bg-surface hover:border-primary/40 hover:bg-surface-muted',
      )}
    >
      <span
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors duration-150',
          selected ? 'bg-primary/10 text-primary' : 'bg-surface-muted text-primary',
        )}
      >
        {icon}
      </span>
      <span
        className={cn(
          'flex-1 text-base font-medium transition-colors duration-150',
          selected ? 'text-primary' : 'text-text-primary',
        )}
      >
        {label}
      </span>
      {selected && (
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-text-inverse">
          ✓
        </span>
      )}
    </button>
  );
}
