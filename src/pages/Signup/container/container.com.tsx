import { ASSETS } from '@/assets';
import { AuthSplitLayout } from '@/components';
import { SIGNUP_LAYOUT, SIGNUP_TOTAL_STEPS } from '../config/steps.config';
import { RoleStep } from '../steps/RoleStep';
import { PhoneStep } from '../steps/PhoneStep';
import { OtpStep } from '../steps/OtpStep';
import { PasswordStep } from '../steps/PasswordStep';
import { SuccessModal } from '../components/SuccessModal';
import type { RoleFormValues } from '../schemas/role.schema';
import type { PhoneFormValues } from '../schemas/phone.schema';
import type { OtpFormValues } from '../schemas/otp.schema';
import type { PasswordFormValues } from '../schemas/password.schema';

// Steps 0-1 have no progress bar; steps 2-4 show it (1-3 of 3)
const PROGRESS_OFFSET = 2;
const PROGRESS_TOTAL = 3;

interface ContainerComProps {
  step: number;
  signupData: { phone?: string; countryCode?: string };
  onRoleSubmit: (data: RoleFormValues) => void;
  onPhoneSubmit: (data: PhoneFormValues) => void;
  onOtpSubmit: (data: OtpFormValues) => void;
  onPasswordSubmit: (data: PasswordFormValues) => void;
  onBack: () => void;
}

export function ContainerCom({
  step,
  signupData,
  onRoleSubmit,
  onPhoneSubmit,
  onOtpSubmit,
  onPasswordSubmit,
  onBack,
}: ContainerComProps) {
  const progressStep = step >= PROGRESS_OFFSET ? step - PROGRESS_OFFSET + 1 : undefined;
  const phone =
    signupData.countryCode && signupData.phone
      ? `${signupData.countryCode} ${signupData.phone}`
      : '';

  return (
    <>
      <AuthSplitLayout
        eyebrow={SIGNUP_LAYOUT.eyebrow}
        title={SIGNUP_LAYOUT.title}
        description={SIGNUP_LAYOUT.description}
        illustrationSrc={ASSETS.signupIllustration}
        illustrationAlt={SIGNUP_LAYOUT.illustrationAlt}
        progressStep={progressStep}
        progressTotal={progressStep !== undefined ? PROGRESS_TOTAL : undefined}
      >
        {step === 0 && <RoleStep onSubmit={onRoleSubmit} />}
        {step === 1 && <PhoneStep onSubmit={onPhoneSubmit} onBack={onBack} />}
        {step === 2 && <OtpStep phone={phone} onSubmit={onOtpSubmit} onBack={onBack} />}
        {step >= 3 && <PasswordStep onSubmit={onPasswordSubmit} onBack={onBack} />}
      </AuthSplitLayout>

      {step >= SIGNUP_TOTAL_STEPS && <SuccessModal />}
    </>
  );
}
