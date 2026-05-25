import { simulateDelay } from '@/utils';

export const submitStepState =
  (delayMs: number) => async (_context: unknown, event: { data?: Record<string, unknown> }) => {
    await simulateDelay(delayMs);
    return event.data ?? {};
  };
