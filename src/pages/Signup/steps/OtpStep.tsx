import { useState } from 'react';
import { OTPInput } from '@/components';
import { otpSchema, type OtpFormValues } from '../schemas/otp.schema';
import { STEP_COPY } from '../config/steps.config';
import { AuthStepFooter } from '../components/AuthStepFooter';

interface OtpStepProps {
  onSubmit: (data: OtpFormValues) => void;
  onBack: () => void;
}

export function OtpStep({ onSubmit, onBack }: OtpStepProps) {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { title, subtitle, resendPrefix, resendLink, cta } = STEP_COPY.otp;

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

  const handleResend = () => {
    setOtp('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
      <h2 className="text-xl font-bold leading-snug text-text-primary sm:text-2xl">{title}</h2>
      <p className="mt-2 text-sm text-[#9BA3AF]">{subtitle}</p>

      <div className="mt-8 w-fit max-w-full">
        <OTPInput value={otp} onChange={handleChange} error={error} />

        <p className="mt-4 text-right text-sm text-[#9BA3AF]">
          {resendPrefix}{' '}
          <button
            type="button"
            className="font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:underline"
            onClick={handleResend}
          >
            {resendLink}
          </button>
        </p>
      </div>

      <AuthStepFooter
        submitLabel={cta}
        onBack={onBack}
        isSubmitting={isSubmitting}
        submitDisabled={otp.length < 4}
      />
    </form>
  );
}
