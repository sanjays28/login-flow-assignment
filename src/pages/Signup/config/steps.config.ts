export const SIGNUP_LAYOUT = {
  eyebrow: "Let's get started",
  title: 'Create your account',
  description: 'Follow the steps to create your account.',
  illustrationAlt: 'Person filling a signup form',
} as const;

// 4 form steps (role, phone, otp, password); success shows at step 4
export const SIGNUP_TOTAL_STEPS = 4;

export const STEP_COPY = {
  role: {
    heading: 'To join us tell us what type of account you are opening',
    cta: 'Continue',
  },
  phone: {
    heading: 'Enter your phone number',
    cta: 'Continue',
  },
  otp: {
    heading: 'Enter the 4-digit code we sent to',
    resend: 'Resend code',
    cta: 'Verify',
  },
  password: {
    heading: 'Create a secure password for your account',
    fields: {
      password: { label: 'Password', placeholder: 'Min. 8 characters' },
      confirm: { label: 'Confirm password', placeholder: 'Re-enter password' },
    },
    cta: 'Create account',
  },
} as const;
