/**
 * Plugin pattern (simplified)
 * ---------------------------
 * Module  → low-level tool     (e.g. StorageModule, JwtModule)
 * Plugin  → grouped API        (e.g. session.*, auth.*)
 * Agent   → one entry point    (getAgent() returns all plugins)
 *
 * Services call the agent — they never import modules directly.
 */

export interface IPluginMethodMap {
  [methodName: string]: (...args: never[]) => unknown;
}

export interface IAgentPlugin<TMethods extends IPluginMethodMap = IPluginMethodMap> {
  /** Namespace name used when merging into the agent (e.g. "session" → agent.session) */
  readonly namespace: string;
  readonly methods: TMethods;
}
