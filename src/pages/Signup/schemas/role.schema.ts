import { z } from 'zod';

export const roleSchema = z.object({
  accountType: z.enum(['personal', 'business'], {
    message: 'Select an account type',
  }),
});

export type RoleFormValues = z.infer<typeof roleSchema>;

export const ACCOUNT_TYPES = [
  { value: 'personal' as const, label: 'Personal' },
  { value: 'business' as const, label: 'Business' },
];
