import { ASSETS } from '@/assets';
import { Loader } from '@/components';

export function ContainerCom() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-zinc-950 text-white">
      <img src={ASSETS.logo} alt="App logo" className="h-24 w-24" />
      <Loader />
      <p className="text-sm text-zinc-400">Starting application…</p>
    </div>
  );
}
