/**
 * Agent — single entry point for all plugins.
 *
 * Usage in services / state machines:
 *   agent.session.saveSession({ token, profile })
 *   agent.session.isLoggedIn()
 *   agent.auth.verify({ jwt: token })
 */

import {
  AuthenticationPlugin,
  type IAuthenticationPluginMethods,
} from './plugins/authentication.plugin';
import { SessionPlugin, type ISessionPluginMethods } from './plugins/session.plugin';

const sessionPlugin = new SessionPlugin();
const authPlugin = new AuthenticationPlugin();

export type TAgent = {
  session: ISessionPluginMethods;
  auth: IAuthenticationPluginMethods;
};

export const getAgent = (): TAgent => ({
  session: sessionPlugin.methods,
  auth: authPlugin.methods,
});
