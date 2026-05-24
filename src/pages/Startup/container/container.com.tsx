import { Loader } from '@/components';

export function ContainerCom() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background px-page-x">
      <Loader />
      <p className="text-sm text-text-secondary">Starting application…</p>
    </div>
  );
}
