import { assign } from 'xstate';
import type { SignupData } from '@/pages/Signup/types/signup.types';

export interface SignupFlowContext extends Record<string, unknown> {
  signupData: SignupData;
  error?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mergeSignupData = assign<SignupFlowContext, any>((context, event) => ({
  ...context,
  signupData: { ...context.signupData, ...event.data },
  error: undefined,
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const assignError = assign<SignupFlowContext, any>((context, event) => ({
  ...context,
  error: String(event.data ?? 'Something went wrong. Please try again.'),
}));
