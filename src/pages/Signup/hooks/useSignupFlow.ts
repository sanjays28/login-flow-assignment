import { useMemo } from 'react';
import { useStateMachine } from '@/modules/state-machine-module';
import { SIGNUP_FLOW_CONFIG } from '@/services/machines/signup-flow';
import { signupFlowService } from '@/services';

export interface SignupFlowEvent {
  type: 'SUBMIT' | 'BACK';
  data?: Record<string, unknown>;
}

export function useSignupFlow() {
  const machineConfig = useMemo(
    () => SIGNUP_FLOW_CONFIG.extendContextWith({ processor: signupFlowService }),
    [],
  );

  return useStateMachine(machineConfig);
}
