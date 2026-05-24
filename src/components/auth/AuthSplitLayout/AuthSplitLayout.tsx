import type { ReactNode } from 'react';
import { cn } from '@/utils';
import { AuthProgressBar } from '../AuthProgressBar/AuthProgressBar';

interface AuthSplitLayoutProps {
  children: ReactNode;
  eyebrow: string;
  title: string;
  description?: string;
  illustrationSrc?: string;
  illustrationAlt?: string;
  progressStep?: number;
  progressTotal?: number;
  className?: string;
}

export function AuthSplitLayout({
  children,
  eyebrow,
  title,
  description,
  illustrationSrc,
  illustrationAlt = '',
  progressStep,
  progressTotal,
  className,
}: AuthSplitLayoutProps) {
  return (
    <div className={cn('auth-page relative flex min-h-svh flex-row bg-background', className)}>
      {/* Left — sits on the gray bg, above the wave pseudo-element */}
      <aside className="relative z-10 flex flex-1 flex-col px-10 py-12 lg:px-16">
        <p className="text-sm font-medium text-text-secondary">{eyebrow}</p>
        <h1 className="mt-3 text-3xl font-bold leading-tight text-text-primary xl:text-4xl">
          {title}
        </h1>
        {description && <p className="mt-3 max-w-sm text-sm text-text-secondary">{description}</p>}

        {illustrationSrc && (
          <div className="mt-auto pt-8">
            <img
              src={illustrationSrc}
              alt={illustrationAlt}
              className="h-auto w-full max-w-[680px] object-contain object-left-bottom"
            />
          </div>
        )}
      </aside>

      {/* Right — card centered with even margin on all sides within the half-panel */}
      <section className="relative z-10 flex w-1/2 shrink-0 items-center justify-center p-8">
        <div className="flex h-[895px] w-full max-w-[708px] max-h-[calc(100svh-64px)] flex-col rounded-2xl bg-surface px-16 pt-11 pb-10 shadow-[-16px_4px_35px_0_rgba(0,0,0,0.03)]">
          {progressStep !== undefined && progressTotal !== undefined && (
            <AuthProgressBar currentStep={progressStep} totalSteps={progressTotal} />
          )}
          <div className="flex flex-1 flex-col">{children}</div>
        </div>
      </section>
    </div>
  );
}
