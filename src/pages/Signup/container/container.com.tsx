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
import { formatPhoneDisplay } from '@/utils/phone/formatPhone';
import type { OtpFormValues } from '../schemas/otp.schema';
import type { PasswordFormValues } from '../schemas/password.schema';

interface ContainerComProps {
  step: number;
  signupData: { phone?: string };
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
  const showProgress = step < SIGNUP_TOTAL_STEPS;
  const progressStep = showProgress ? step + 1 : undefined;
  const phone = signupData.phone ? formatPhoneDisplay(signupData.phone) : '';

  return (
    <>
      <AuthSplitLayout
        eyebrow={SIGNUP_LAYOUT.eyebrow}
        title={SIGNUP_LAYOUT.title}
        description={SIGNUP_LAYOUT.description}
        illustrationSrc={ASSETS.signupIllustration}
        illustrationAlt={SIGNUP_LAYOUT.illustrationAlt}
        progressStep={progressStep}
        progressTotal={showProgress ? SIGNUP_TOTAL_STEPS : undefined}
      >
        {step === 0 && <RoleStep onSubmit={onRoleSubmit} />}
        {step === 1 && <PhoneStep onSubmit={onPhoneSubmit} onBack={onBack} />}
        {step === 2 && <OtpStep phone={phone} onSubmit={onOtpSubmit} onBack={onBack} />}
        {step >= 3 && step < SIGNUP_TOTAL_STEPS && (
          <PasswordStep onSubmit={onPasswordSubmit} onBack={onBack} />
        )}
      </AuthSplitLayout>

      {step >= SIGNUP_TOTAL_STEPS && <SuccessModal />}
    </>
  );
}
