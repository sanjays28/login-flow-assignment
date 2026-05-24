import { z } from 'zod';
import { isValidInternationalPhone } from '@/utils/phone/validatePhone';

export const phoneSchema = z.object({
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .refine(isValidInternationalPhone, 'Enter a valid phone number'),
});

export type PhoneFormValues = z.infer<typeof phoneSchema>;
