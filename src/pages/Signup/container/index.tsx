import { useState } from 'react';
import { simulateDelay } from '@/utils';
import { ContainerCom } from './container.com';
import type { SignupData } from '../types/signup.types';

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
      onRoleSubmit={async (data) => {
        merge(data);
        await simulateDelay(400);
        next();
      }}
      onPhoneSubmit={async (data) => {
        merge(data);
        await simulateDelay(900);
        next();
      }}
      onOtpSubmit={async (data) => {
        merge(data);
        await simulateDelay(900);
        next();
      }}
      onNameSubmit={async (data) => {
        merge(data);
        await simulateDelay(500);
        next();
      }}
      onPasswordSubmit={async (data) => {
        merge(data);
        await simulateDelay(1200);
        next();
      }}
      onBack={back}
    />
  );
}
