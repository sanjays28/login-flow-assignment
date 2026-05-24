export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api',
  endpoints: {
    login: '/auth/login',
    signup: '/auth/signup',
  },
} as const;
