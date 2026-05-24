import { ASSETS } from '@/assets';
import { AuthSplitLayout } from '@/components';
import { SIGNUP_LAYOUT, SIGNUP_TOTAL_STEPS } from '../config/steps.config';
import { RoleStep } from '../steps/RoleStep';
import { PhoneStep } from '../steps/PhoneStep';
import { OtpStep } from '../steps/OtpStep';
import { NameStep } from '../steps/NameStep';
import { PasswordStep } from '../steps/PasswordStep';
import { SuccessModal } from '../components/SuccessModal';
import { formatFullName } from '../utils/formatSignupSummary';
import type { SignupData } from '../types/signup.types';
import type { RoleFormValues } from '../schemas/role.schema';
import type { PhoneFormValues } from '../schemas/phone.schema';
import type { OtpFormValues } from '../schemas/otp.schema';
import type { NameFormValues } from '../schemas/name.schema';
import type { PasswordFormValues } from '../schemas/password.schema';

interface ContainerComProps {
  step: number;
  signupData: SignupData;
  onRoleSubmit: (data: RoleFormValues) => void;
  onPhoneSubmit: (data: PhoneFormValues) => void;
  onOtpSubmit: (data: OtpFormValues) => void;
  onNameSubmit: (data: NameFormValues) => void;
  onPasswordSubmit: (data: PasswordFormValues) => void;
  onBack: () => void;
}

export function ContainerCom({
  step,
  signupData,
  onRoleSubmit,
  onPhoneSubmit,
  onOtpSubmit,
  onNameSubmit,
  onPasswordSubmit,
  onBack,
}: ContainerComProps) {
  const showProgress = step < SIGNUP_TOTAL_STEPS;
  const progressStep = showProgress ? step + 1 : undefined;

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
        {step === 2 && <OtpStep onSubmit={onOtpSubmit} onBack={onBack} />}
        {step === 3 && <NameStep onSubmit={onNameSubmit} onBack={onBack} />}
        {step === 4 && <PasswordStep onSubmit={onPasswordSubmit} onBack={onBack} />}
      </AuthSplitLayout>

      {step >= SIGNUP_TOTAL_STEPS && (
        <SuccessModal
          summary={{
            accountType: signupData.accountType,
            phone: signupData.phone,
            email: signupData.email,
            name: formatFullName(signupData.firstName, signupData.lastName),
          }}
        />
      )}
    </>
  );
}
