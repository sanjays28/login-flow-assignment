import { StateMachineProcessor } from '@/modules/state-machine-module';
import type { SignupData } from '@/pages/Signup/types/signup.types';
import { getAgent, type TAgent } from './agent';
import { AUTH_FLOW_CONFIG } from './machines/auth-flow';
import { STARTUP_VALIDATOR_CONFIG } from './machines/startup-validator';
import type { AuthCredentials } from './machines/auth-flow/states/submitCredentials.state';

export class StartupService {
  readonly agent: TAgent = getAgent();
  private readonly smp = new StateMachineProcessor();

  async validateStartup() {
    await this.smp.startProcessing({
      machineConfig: STARTUP_VALIDATOR_CONFIG.extendContextWith({ processor: this }),
      machineType: 'STARTUP_VALIDATOR',
    });
  }
}

export class AuthService {
  readonly agent: TAgent = getAgent();
  private readonly smp = new StateMachineProcessor();

  async runAuthFlow(flow: 'login' | 'signup', credentials: AuthCredentials) {
    return this.smp.startProcessing({
      machineConfig: AUTH_FLOW_CONFIG.extendContextWith({
        processor: this,
        flow,
        credentials,
      }),
      machineType: 'AUTH_FLOW',
    });
  }

  async logout() {
    await this.agent.session.clearSession();
  }

  async isLoggedIn() {
    return this.agent.session.isLoggedIn();
  }

  /** Mock auth request — swap with fetch() when API is ready. */
  async submitAuthRequest(_endpoint: string, credentials: AuthCredentials) {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const mockToken = btoa(
      JSON.stringify({
        email: credentials.email,
        exp: Math.floor(Date.now() / 1000) + 3600,
      }),
    );

    return {
      token: mockToken,
      profile: { email: credentials.email },
    };
  }
}

export class SignupFlowService {
  async completeSignup(signupData: SignupData): Promise<SignupData> {
    if (signupData.password) {
      await authService.runAuthFlow('signup', {
        email: signupData.phone ?? signupData.email ?? 'user@example.com',
        password: signupData.password,
      });
    }

    return signupData;
  }
}

export const startupService = new StartupService();
export const authService = new AuthService();
export const signupFlowService = new SignupFlowService();
