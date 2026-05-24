import type { AuthService } from '@/services';

export const storeSessionState = async (context: {
  processor: AuthService;
  result?: { token: string; profile: Record<string, unknown> };
}) => {
  const { processor, result } = context;

  if (!result?.token) {
    throw new Error('Missing auth token');
  }

  await processor.agent.session.saveSession({
    token: result.token,
    profile: result.profile,
  });

  return true;
};
