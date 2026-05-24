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
        'flex h-20 w-full items-center gap-6 rounded-2xl border px-8 text-left shadow-[0_4px_8px_0_rgba(188,203,219,0.30)] transition-colors',
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
