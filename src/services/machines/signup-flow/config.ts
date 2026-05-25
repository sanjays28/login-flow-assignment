import { v4 as uuidv4 } from 'uuid';
import {
  failureAction,
  onEntryAction,
  onExitAction,
  successAction,
  type StateMachineConfig,
} from '@/modules/state-machine-module';
import { assignError, mergeSignupData } from './actions';
import { completeSignupState, submitStepState } from './states';

const config: StateMachineConfig = {
  id: 'signup.flow',
  initial: 'role',
  predictableActionArguments: true,
  context: {
    signupData: {},
  },
  states: {
    role: {
      on: {
        SUBMIT: { target: 'submittingRole' },
      },
    },
    submittingRole: {
      entry: [onEntryAction],
      exit: [onExitAction],
      invoke: {
        id: 'submitRole',
        src: submitStepState(400),
        onDone: { target: 'phone', actions: [mergeSignupData, successAction] },
        onError: { target: 'role', actions: [failureAction, assignError] },
      },
    },
    phone: {
      on: {
        SUBMIT: { target: 'submittingPhone' },
        BACK: { target: 'role' },
      },
    },
    submittingPhone: {
      entry: [onEntryAction],
      exit: [onExitAction],
      invoke: {
        id: 'submitPhone',
        src: submitStepState(900),
        onDone: { target: 'otp', actions: [mergeSignupData, successAction] },
        onError: { target: 'phone', actions: [failureAction, assignError] },
      },
    },
    otp: {
      on: {
        SUBMIT: { target: 'submittingOtp' },
        BACK: { target: 'phone' },
      },
    },
    submittingOtp: {
      entry: [onEntryAction],
      exit: [onExitAction],
      invoke: {
        id: 'submitOtp',
        src: submitStepState(900),
        onDone: { target: 'name', actions: [mergeSignupData, successAction] },
        onError: { target: 'otp', actions: [failureAction, assignError] },
      },
    },
    name: {
      on: {
        SUBMIT: { target: 'submittingName' },
        BACK: { target: 'otp' },
      },
    },
    submittingName: {
      entry: [onEntryAction],
      exit: [onExitAction],
      invoke: {
        id: 'submitName',
        src: submitStepState(500),
        onDone: { target: 'password', actions: [mergeSignupData, successAction] },
        onError: { target: 'name', actions: [failureAction, assignError] },
      },
    },
    password: {
      on: {
        SUBMIT: { target: 'submittingPassword' },
        BACK: { target: 'name' },
      },
    },
    submittingPassword: {
      entry: [onEntryAction],
      exit: [onExitAction],
      invoke: {
        id: 'submitPassword',
        src: submitStepState(300),
        onDone: { target: 'completing', actions: [mergeSignupData, successAction] },
        onError: { target: 'password', actions: [failureAction, assignError] },
      },
    },
    completing: {
      entry: [onEntryAction],
      exit: [onExitAction],
      invoke: {
        id: 'completeSignup',
        src: completeSignupState,
        onDone: { target: 'success', actions: [successAction] },
        onError: { target: 'password', actions: [failureAction, assignError] },
      },
    },
    success: { type: 'final' },
  },
  extendContextWith(extContext) {
    this.id = uuidv4();
    this.context = { ...this.context, ...extContext };
    return this;
  },
};

export const SIGNUP_FLOW_CONFIG = config;
