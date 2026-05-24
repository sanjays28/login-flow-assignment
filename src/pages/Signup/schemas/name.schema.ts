import { z } from 'zod';

export const nameSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name is too long'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name is too long'),
});

export type NameFormValues = z.infer<typeof nameSchema>;
