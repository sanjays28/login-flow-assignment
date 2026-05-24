import { v4 as uuidv4 } from 'uuid';
import {
  failureAction,
  onEntryAction,
  onExitAction,
  successAction,
  type StateMachineConfig,
} from '@/modules/state-machine-module';
import { validateSessionState } from './states';

const config: StateMachineConfig = {
  id: 'startup.validator',
  initial: 'IDLE',
  predictableActionArguments: true,
  context: {},
  states: {
    IDLE: {
      on: {
        START: { target: 'VALIDATE_SESSION', actions: [successAction] },
      },
    },
    VALIDATE_SESSION: {
      entry: [onEntryAction],
      exit: [onExitAction],
      invoke: {
        id: 'validateSessionState',
        src: validateSessionState,
        onDone: { target: 'END', actions: [successAction] },
        onError: { target: 'ERROR', actions: [failureAction] },
      },
    },
    END: { type: 'final' },
    ERROR: { type: 'final' },
  },
  extendContextWith(extContext) {
    this.id = uuidv4();
    this.context = { ...this.context, ...extContext };
    return this;
  },
};

export const STARTUP_VALIDATOR_CONFIG = config;
