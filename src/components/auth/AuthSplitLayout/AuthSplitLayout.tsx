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
  const showProgress = progressStep !== undefined && progressTotal !== undefined;

  return (
    <div
      className={cn(
        'auth-page relative flex min-h-svh flex-col lg:flex-row bg-background',
        className,
      )}
    >
      {/* Left — illustration panel, desktop only */}
      <aside className="relative z-10 hidden lg:flex lg:flex-1 lg:flex-col px-10 py-12 lg:px-16">
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

      {/* Right — full width on mobile, half on desktop */}
      <section className="relative z-10 flex flex-1 flex-col p-4 pt-8 sm:p-6 sm:pt-10 lg:w-1/2 lg:flex-none lg:shrink-0 lg:items-center lg:justify-center lg:p-8">
        <div className="flex w-full flex-1 flex-col lg:max-w-[708px] lg:flex-none">
          {showProgress && (
            <AuthProgressBar
              currentStep={progressStep}
              totalSteps={progressTotal}
              className="mb-3"
            />
          )}
          <div
            className={cn(
              'flex flex-1 flex-col w-full rounded-2xl bg-surface shadow-[-16px_4px_35px_0_rgba(0,0,0,0.03)]',
              'px-5 pt-8 pb-6 sm:px-10 sm:pt-10 sm:pb-8 lg:px-16 lg:pt-11 lg:pb-10',
              'lg:h-[895px] lg:flex-none',
              showProgress ? 'lg:max-h-[calc(100svh-88px)]' : 'lg:max-h-[calc(100svh-64px)]',
            )}
          >
            <div className="flex flex-1 flex-col">{children}</div>
          </div>
        </div>
      </section>
    </div>
  );
}
