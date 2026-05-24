import { createMachine, interpret } from 'xstate';
import { waitFor } from 'xstate/lib/waitFor';
import type { StartProcessingOptions } from './types';

export class StateMachineProcessor {
  async startProcessing({
    machineConfig,
    machineType,
    startEvent = { type: 'START' },
  }: StartProcessingOptions) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const machine = createMachine(machineConfig as any);
    const interpreter = interpret(machine).onTransition((state) => {
      console.debug(`[${machineType}] state=${JSON.stringify(state.value)}`);
    });

    const actor = interpreter.start();
    interpreter.send(startEvent);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const doneState: any = await waitFor(
      actor,
      (state) => state.matches('END') || state.matches('ERROR'),
      { timeout: 60_000 },
    );

    if (doneState.matches('ERROR')) {
      throw new Error(String(doneState.event?.data ?? 'State machine failed'));
    }

    return doneState.context;
  }
}

export * from './actions';
export * from './types';
