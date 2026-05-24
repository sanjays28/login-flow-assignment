import { z } from 'zod';

export const phoneSchema = z.object({
  countryCode: z.string().min(1),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^\d{10}$/, 'Enter a valid 10-digit phone number'),
});

export type PhoneFormValues = z.infer<typeof phoneSchema>;
