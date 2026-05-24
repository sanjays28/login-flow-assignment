export const StorageKeys = {
  ID_TOKEN: 'idToken',
  USER_PROFILE: 'userProfile',
} as const;

export type StorageKey = (typeof StorageKeys)[keyof typeof StorageKeys];
