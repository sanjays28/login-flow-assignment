import { useState } from 'react';
import { ContainerCom } from './container.com';
import type { RoleFormValues } from '../schemas/role.schema';
import type { PhoneFormValues } from '../schemas/phone.schema';
import type { OtpFormValues } from '../schemas/otp.schema';
import type { PasswordFormValues } from '../schemas/password.schema';

type SignupData = Partial<RoleFormValues & PhoneFormValues & OtpFormValues & PasswordFormValues>;

export default function SignupContainer() {
  const [step, setStep] = useState(0);
  const [signupData, setSignupData] = useState<SignupData>({});

  const merge = (data: Partial<SignupData>) => setSignupData((prev) => ({ ...prev, ...data }));

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <ContainerCom
      step={step}
      signupData={signupData}
      onRoleSubmit={(data) => {
        merge(data);
        next();
      }}
      onPhoneSubmit={(data) => {
        merge(data);
        next();
      }}
      onOtpSubmit={(data) => {
        merge(data);
        next();
      }}
      onPasswordSubmit={(data) => {
        merge(data);
        next();
      }}
      onBack={back}
    />
  );
}
