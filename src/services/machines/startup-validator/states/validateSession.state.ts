import type { StartupService } from '@/services';

export const validateSessionState = async (context: { processor: StartupService }) => {
  const { processor } = context;
  const token = await processor.agent.session.getToken();

  if (!token) {
    return true;
  }

  const result = await processor.agent.auth.verify({ jwt: token });
  if (!result.status) {
    await processor.agent.session.clearSession();
  }

  return true;
};
