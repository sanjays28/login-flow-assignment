export interface StateMachineConfig {
  id: string;
  initial: string;
  predictableActionArguments: true;
  context: Record<string, unknown>;
  states: Record<string, unknown>;
  extendContextWith: (extContext: Record<string, unknown>) => StateMachineConfig;
}

export interface StartProcessingOptions {
  machineConfig: StateMachineConfig;
  machineType: string;
  startEvent?: { type: string; [key: string]: unknown };
}
