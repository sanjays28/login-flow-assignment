import type { SignupData } from '@/pages/Signup/types/signup.types';

export const completeSignupState = async (context: {
  signupData: SignupData;
  processor: { completeSignup: (data: SignupData) => Promise<SignupData> };
}) => {
  return context.processor.completeSignup(context.signupData);
};
