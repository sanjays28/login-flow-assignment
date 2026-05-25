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
    hint: 'We will send a one-time password to verify your number.',
    loadingLabel: 'Sending code…',
    cta: 'Continue',
  },
  otp: {
    title: 'OTP Verification',
    subtitle: 'An OTP has been sent to your mobile number',
    inputHint: 'Enter the 4-digit code sent to your phone.',
    resendPrefix: 'Did not receive OTP?',
    resendLink: 'Resend OTP',
    resendSent: 'A new code has been sent.',
    resendSending: 'Sending…',
    resendCooldownSeconds: 30,
    resendCooldown: (seconds: number) => `Resend in ${seconds}s`,
    cta: 'Verify',
    loadingLabel: 'Verifying…',
  },
  name: {
    heading: 'What is your name?',
    fields: {
      firstName: { label: 'First name', placeholder: 'John', hint: 'As it appears on your ID.' },
      lastName: { label: 'Last name', placeholder: 'Doe', hint: 'Your family or surname.' },
    },
    cta: 'Continue',
  },
  password: {
    heading: 'Create a secure password for your account',
    fields: {
      password: {
        label: 'Password',
        placeholder: 'Min. 8 characters',
        hint: 'Use at least 8 characters with letters and numbers.',
      },
      confirm: {
        label: 'Confirm password',
        placeholder: 'Re-enter password',
        hint: 'Must match the password above.',
      },
    },
    cta: 'Create account',
    loadingLabel: 'Creating account…',
  },
} as const;

export const SUCCESS_COPY = {
  title: "You're all set!",
  subtitle: "Here's a quick summary of your account details",
  security: 'Your account is secured with bank-grade security',
  cta: 'Go to dashboard',
} as const;
