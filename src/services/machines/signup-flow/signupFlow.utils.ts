const DISPLAY_STEP_MAP: Record<string, number> = {
  role: 0,
  submittingRole: 0,
  phone: 1,
  submittingPhone: 1,
  otp: 2,
  submittingOtp: 2,
  name: 3,
  submittingName: 3,
  password: 4,
  submittingPassword: 4,
  completing: 4,
  success: 5,
};

const SUBMITTING_STATES = new Set([
  'submittingRole',
  'submittingPhone',
  'submittingOtp',
  'submittingName',
  'submittingPassword',
  'completing',
]);

export function getSignupDisplayStep(stateValue: string): number {
  return DISPLAY_STEP_MAP[stateValue] ?? 0;
}

export function isSignupStepSubmitting(stateValue: string): boolean {
  return SUBMITTING_STATES.has(stateValue);
}

export function isSignupSuccess(stateValue: string): boolean {
  return stateValue === 'success';
}
