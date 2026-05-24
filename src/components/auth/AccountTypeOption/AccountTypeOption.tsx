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
        'flex w-full items-center gap-4 rounded-2xl border-2 px-5 py-4 text-left transition-colors',
        selected ? 'border-primary bg-surface' : 'border-border bg-surface hover:border-primary/40',
      )}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-muted text-primary">
        {icon}
      </span>
      <span
        className={cn(
          'flex-1 text-base font-medium',
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
