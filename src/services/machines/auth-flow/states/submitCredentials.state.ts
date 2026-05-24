import type { AuthService } from '@/services';
import { API_CONFIG } from '@/config';

export interface AuthCredentials {
  email: string;
  password: string;
}

export const submitCredentialsState = async (context: {
  processor: AuthService;
  flow: 'login' | 'signup';
  credentials: AuthCredentials;
}) => {
  const { processor, flow, credentials } = context;
  const endpoint = flow === 'login' ? API_CONFIG.endpoints.login : API_CONFIG.endpoints.signup;

  // Replace with real API call when backend is available.
  const response = await processor.submitAuthRequest(endpoint, credentials);
  return response;
};
