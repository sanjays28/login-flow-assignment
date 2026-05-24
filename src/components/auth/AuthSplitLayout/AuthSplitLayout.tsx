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
    <div
      className={cn(
        'flex min-h-svh items-center justify-center bg-white px-4 py-8 sm:px-6 lg:px-8',
        className,
      )}
    >
      <div className="flex w-full max-w-5xl flex-row overflow-hidden rounded-3xl shadow-[0_8px_40px_rgba(26,31,54,0.10)]">
        {/* Left panel — gray background with wave texture */}
        <aside className="auth-left-panel relative flex min-h-[580px] flex-1 flex-col overflow-hidden bg-background px-10 py-12">
          <p className="relative z-10 text-sm font-medium text-text-secondary">{eyebrow}</p>
          <h1 className="relative z-10 mt-3 text-3xl font-bold leading-tight text-text-primary xl:text-4xl">
            {title}
          </h1>
          {description && (
            <p className="relative z-10 mt-3 max-w-sm text-sm text-text-secondary">{description}</p>
          )}

          {illustrationSrc && (
            <div className="relative z-10 mt-auto flex items-end pt-8">
              <img
                src={illustrationSrc}
                alt={illustrationAlt}
                className="w-full max-w-[360px] object-contain object-left-bottom"
              />
            </div>
          )}
        </aside>

        {/* Right panel — white, form lives here */}
        <section className="flex w-[440px] shrink-0 flex-col bg-surface px-10 py-12">
          {progressStep !== undefined && progressTotal !== undefined && (
            <AuthProgressBar currentStep={progressStep} totalSteps={progressTotal} />
          )}
          {children}
        </section>
      </div>
    </div>
  );
}
