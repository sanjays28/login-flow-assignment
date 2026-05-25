import { useEffect, useRef, useState } from 'react';
import { createMachine, interpret } from 'xstate';
import type { StateMachineConfig } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MachineState = any;

export function useStateMachine(machineConfig: StateMachineConfig) {
  const [state, setState] = useState<MachineState | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const serviceRef = useRef<any>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const machine = createMachine(machineConfig as any);
    const service = interpret(machine).onTransition(setState);

    serviceRef.current = service;
    service.start();

    return () => {
      service.stop();
      serviceRef.current = null;
    };
  }, [machineConfig.id]);

  const send = (event: { type: string; data?: Record<string, unknown> }) => {
    serviceRef.current?.send(event);
  };

  return { state, send };
}
