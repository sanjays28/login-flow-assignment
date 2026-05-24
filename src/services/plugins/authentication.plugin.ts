/**
 * AuthenticationPlugin — EXAMPLE PLUGIN #2
 *
 * Wraps JwtModule with token-check methods.
 * Think: "everything about validating a JWT"
 *
 *   Module (jwt-module)  →  decode(), isTokenExpired()
 *   Plugin (this file)   →  verify(), isExpired()
 *   Agent                →  agent.auth.verify(...)
 */

import { JwtModule } from '@/modules/jwt-module';
import type { IAgentPlugin, IPluginMethodMap } from '@/plugins';

export interface IAuthenticationPluginMethods extends IPluginMethodMap {
  verify(args: { jwt: string }): Promise<{ status: boolean; decoded: unknown }>;
  isExpired(args: { jwt: string }): Promise<boolean>;
}

export class AuthenticationPlugin implements IAgentPlugin<IAuthenticationPluginMethods> {
  readonly namespace = 'auth';
  readonly methods: IAuthenticationPluginMethods;
  private readonly jwtModule = new JwtModule();

  constructor() {
    this.methods = {
      verify: this.verify.bind(this),
      isExpired: this.isExpired.bind(this),
    };
  }

  async isExpired({ jwt }: { jwt: string }) {
    return this.jwtModule.isTokenExpired(jwt);
  }

  async verify({ jwt }: { jwt: string }) {
    return this.jwtModule.verify(jwt);
  }
}
