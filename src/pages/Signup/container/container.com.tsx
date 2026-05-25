import { AnimatePresence } from 'framer-motion';
import { ASSETS } from '@/assets';
import { AuthSplitLayout, AuthStepTransition } from '@/components';
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

type SubmitHandler<T> = (data: T) => void | Promise<void>;

interface ContainerComProps {
  step: number;
  signupData: SignupData;
  onRoleSubmit: SubmitHandler<RoleFormValues>;
  onPhoneSubmit: SubmitHandler<PhoneFormValues>;
  onOtpSubmit: SubmitHandler<OtpFormValues>;
  onNameSubmit: SubmitHandler<NameFormValues>;
  onPasswordSubmit: SubmitHandler<PasswordFormValues>;
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
        <AnimatePresence mode="wait">
          {step === 0 && (
            <AuthStepTransition stepKey={0}>
              <RoleStep onSubmit={onRoleSubmit} />
            </AuthStepTransition>
          )}
          {step === 1 && (
            <AuthStepTransition stepKey={1}>
              <PhoneStep onSubmit={onPhoneSubmit} onBack={onBack} />
            </AuthStepTransition>
          )}
          {step === 2 && (
            <AuthStepTransition stepKey={2}>
              <OtpStep onSubmit={onOtpSubmit} onBack={onBack} />
            </AuthStepTransition>
          )}
          {step === 3 && (
            <AuthStepTransition stepKey={3}>
              <NameStep onSubmit={onNameSubmit} onBack={onBack} />
            </AuthStepTransition>
          )}
          {step === 4 && (
            <AuthStepTransition stepKey={4}>
              <PasswordStep onSubmit={onPasswordSubmit} onBack={onBack} />
            </AuthStepTransition>
          )}
        </AnimatePresence>
      </AuthSplitLayout>

      <AnimatePresence>
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
      </AnimatePresence>
    </>
  );
}
