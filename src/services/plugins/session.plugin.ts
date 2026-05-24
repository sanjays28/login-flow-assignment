/**
 * SessionPlugin — EXAMPLE PLUGIN #1
 *
 * Wraps StorageModule with login-specific methods.
 * Think: "everything about saving/reading the user session"
 *
 *   Module (storage-module)  →  generic get/set/remove
 *   Plugin (this file)       →  saveSession(), getToken(), isLoggedIn()
 *   Agent                    →  agent.session.saveSession(...)
 */

import { StorageKeys } from '@/config';
import { StorageModule } from '@/modules/storage-module';
import type { IAgentPlugin, IPluginMethodMap } from '@/plugins';

export interface ISessionPluginMethods extends IPluginMethodMap {
  saveSession(args: { token: string; profile: Record<string, unknown> }): Promise<void>;
  getToken(): Promise<string | null>;
  clearSession(): Promise<void>;
  isLoggedIn(): Promise<boolean>;
}

export class SessionPlugin implements IAgentPlugin<ISessionPluginMethods> {
  readonly namespace = 'session';
  readonly methods: ISessionPluginMethods;
  private readonly storage = new StorageModule();

  constructor() {
    this.methods = {
      saveSession: this.saveSession.bind(this),
      getToken: this.getToken.bind(this),
      clearSession: this.clearSession.bind(this),
      isLoggedIn: this.isLoggedIn.bind(this),
    };
  }

  async saveSession({ token, profile }: { token: string; profile: Record<string, unknown> }) {
    this.storage.set(StorageKeys.ID_TOKEN, token);
    this.storage.set(StorageKeys.USER_PROFILE, JSON.stringify(profile));
  }

  async getToken() {
    return this.storage.get(StorageKeys.ID_TOKEN);
  }

  async clearSession() {
    this.storage.remove(StorageKeys.ID_TOKEN);
    this.storage.remove(StorageKeys.USER_PROFILE);
  }

  async isLoggedIn() {
    return Boolean(await this.getToken());
  }
}
