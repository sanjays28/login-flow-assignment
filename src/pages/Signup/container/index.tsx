import {
  getSignupDisplayStep,
  isSignupStepSubmitting,
  isSignupSuccess,
} from '@/services/machines/signup-flow';
import { ContainerCom } from './container.com';
import { useSignupFlow } from '../hooks/useSignupFlow';
import type { SignupData } from '../types/signup.types';

export default function SignupContainer() {
  const { state, send } = useSignupFlow();

  if (!state) {
    return null;
  }

  const stateValue = String(state.value);
  const step = getSignupDisplayStep(stateValue);
  const isSubmitting = isSignupStepSubmitting(stateValue);
  const signupData = state.context.signupData as SignupData;

  return (
    <ContainerCom
      step={step}
      signupData={signupData}
      flowError={state.context.error}
      isSubmitting={isSubmitting}
      onRoleSubmit={(data) => send({ type: 'SUBMIT', data })}
      onPhoneSubmit={(data) => send({ type: 'SUBMIT', data })}
      onOtpSubmit={(data) => send({ type: 'SUBMIT', data })}
      onNameSubmit={(data) => send({ type: 'SUBMIT', data })}
      onPasswordSubmit={(data) => send({ type: 'SUBMIT', data })}
      onBack={() => send({ type: 'BACK' })}
      showSuccess={isSignupSuccess(stateValue)}
    />
  );
}
