import { assign } from 'xstate';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const successAction = assign((context: any, event: any) => ({
  ...context,
  result: event.data,
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const failureAction = assign((context: any, event: any) => ({
  ...context,
  error: event.data,
}));

export const onEntryAction = () => undefined;
export const onExitAction = () => undefined;
