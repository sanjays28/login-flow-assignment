import type { ReactNode } from 'react';
import { cn } from '@/utils';

interface AuthSplitLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  illustrationSrc?: string;
  illustrationAlt?: string;
  className?: string;
}

export function AuthSplitLayout({
  children,
  title,
  subtitle,
  illustrationSrc,
  illustrationAlt = '',
  className,
}: AuthSplitLayoutProps) {
  return (
    <div
      className={cn('flex min-h-svh flex-col bg-background lg:min-h-screen lg:flex-row', className)}
    >
      <aside className="relative flex shrink-0 flex-col bg-surface px-page-x py-6 sm:py-8 lg:w-1/2 lg:max-w-[50%] lg:py-page-y">
        <div className="absolute inset-x-0 top-0 h-1.5 bg-accent" aria-hidden="true" />

        <div className="mx-auto flex w-full max-w-md flex-col lg:min-h-full lg:justify-center">
          {illustrationSrc ? (
            <img
              src={illustrationSrc}
              alt={illustrationAlt}
              className="mx-auto mb-4 h-36 w-auto max-w-[220px] object-contain sm:mb-6 sm:h-44 sm:max-w-[280px] lg:mb-10 lg:h-auto lg:max-w-sm"
            />
          ) : (
            <div
              className="mx-auto mb-4 h-36 w-full max-w-[220px] rounded-xl bg-surface-muted sm:mb-6 sm:h-44 sm:max-w-[280px] lg:mb-10 lg:aspect-square lg:h-auto lg:max-w-sm"
              aria-hidden="true"
            />
          )}

          <h1 className="text-2xl font-semibold text-text-primary sm:text-3xl">{title}</h1>
          {subtitle && (
            <p className="mt-1.5 text-sm text-text-secondary sm:mt-2 sm:text-base">{subtitle}</p>
          )}
        </div>
      </aside>

      <section className="flex flex-1 flex-col bg-surface px-page-x py-6 sm:py-8 lg:w-1/2 lg:max-w-[50%] lg:py-page-y">
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col">{children}</div>
      </section>
    </div>
  );
}
