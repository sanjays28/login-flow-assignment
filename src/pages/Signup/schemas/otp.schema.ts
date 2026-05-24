import { z } from 'zod';

export const otpSchema = z.object({
  otp: z.string().length(4, 'Enter the 4-digit code'),
});

export type OtpFormValues = z.infer<typeof otpSchema>;
