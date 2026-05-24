import { useState } from 'react';
import { Button, OTPInput } from '@/components';
import { otpSchema, type OtpFormValues } from '../schemas/otp.schema';
import { STEP_COPY } from '../config/steps.config';

interface OtpStepProps {
  phone: string;
  onSubmit: (data: OtpFormValues) => void;
  onBack: () => void;
}

export function OtpStep({ phone, onSubmit, onBack }: OtpStepProps) {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const result = otpSchema.safeParse({ otp });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setError('');
    setIsSubmitting(true);
    await onSubmit(result.data);
    setIsSubmitting(false);
  };

  const handleChange = (value: string) => {
    setOtp(value);
    if (error) setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
      <h2 className="text-lg font-normal leading-snug text-text-primary sm:text-xl">
        Enter the <span className="font-semibold">4-digit code</span> we sent to
      </h2>
      <p className="mt-1 text-base font-semibold text-text-primary">{phone}</p>

      <div className="mt-8">
        <OTPInput value={otp} onChange={handleChange} error={error} />
      </div>

      <button
        type="button"
        className="mt-4 self-start text-sm text-primary hover:underline focus-visible:outline-none focus-visible:underline"
        onClick={() => onBack()}
      >
        {STEP_COPY.otp.resend}
      </button>

      <div className="mt-auto flex gap-3 pt-10">
        <Button type="button" variant="outline" className="min-w-[100px]" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" className="flex-1" isLoading={isSubmitting} disabled={otp.length < 4}>
          {STEP_COPY.otp.cta}
        </Button>
      </div>
    </form>
  );
}
