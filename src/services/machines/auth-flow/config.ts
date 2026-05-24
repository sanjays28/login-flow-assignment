import { v4 as uuidv4 } from 'uuid';
import {
  failureAction,
  onEntryAction,
  onExitAction,
  successAction,
  type StateMachineConfig,
} from '@/modules/state-machine-module';
import { submitCredentialsState, storeSessionState } from './states';

const config: StateMachineConfig = {
  id: 'auth.flow',
  initial: 'IDLE',
  predictableActionArguments: true,
  context: {},
  states: {
    IDLE: {
      on: {
        START: { target: 'SUBMIT_CREDENTIALS', actions: [successAction] },
      },
    },
    SUBMIT_CREDENTIALS: {
      entry: [onEntryAction],
      exit: [onExitAction],
      invoke: {
        id: 'submitCredentialsState',
        src: submitCredentialsState,
        onDone: { target: 'STORE_SESSION', actions: [successAction] },
        onError: { target: 'ERROR', actions: [failureAction] },
      },
    },
    STORE_SESSION: {
      entry: [onEntryAction],
      exit: [onExitAction],
      invoke: {
        id: 'storeSessionState',
        src: storeSessionState,
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

export const AUTH_FLOW_CONFIG = config;
