export const SIGNUP_LAYOUT = {
  eyebrow: "Let's get started",
  title: 'Create your account',
  description: 'Follow the steps to create your account.',
  illustrationAlt: 'Person filling a signup form',
} as const;

// 5 form steps (role, phone, otp, name, password); success shows at step 5
export const SIGNUP_TOTAL_STEPS = 5;

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
    title: 'OTP Verification',
    subtitle: 'An OTP has been sent to your mobile number',
    resendPrefix: 'Did not receive OTP?',
    resendLink: 'Resend OTP',
    cta: 'Verify',
  },
  name: {
    heading: 'What is your name?',
    fields: {
      firstName: { label: 'First name', placeholder: 'John' },
      lastName: { label: 'Last name', placeholder: 'Doe' },
    },
    cta: 'Continue',
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

export const SUCCESS_COPY = {
  title: "You're all set!",
  subtitle: "Here's a quick summary of your account details",
  security: 'Your account is secured with bank-grade security',
  cta: 'Go to login',
} as const;
