import { useEffect, useState } from 'react';
import { Loader, OTPInput } from '@/components';
import { simulateDelay } from '@/utils';
import { otpSchema, type OtpFormValues } from '../schemas/otp.schema';
import { STEP_COPY } from '../config/steps.config';
import { AuthStepFooter } from '../components/AuthStepFooter';

interface OtpStepProps {
  onSubmit: (data: OtpFormValues) => void | Promise<void>;
  onBack: () => void;
}

export function OtpStep({ onSubmit, onBack }: OtpStepProps) {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendMessage, setResendMessage] = useState('');

  const {
    title,
    subtitle,
    inputHint,
    emptyHint,
    resendPrefix,
    resendLink,
    resendSent,
    resendSending,
    resendCooldownSeconds,
    resendCooldown: formatCooldown,
    loadingLabel,
    cta,
  } = STEP_COPY.otp;

  useEffect(() => {
    if (resendCooldown <= 0) return;

    const timer = window.setInterval(() => {
      setResendCooldown((current) => Math.max(current - 1, 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [resendCooldown]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const result = otpSchema.safeParse({ otp });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setError('');
    setIsSubmitting(true);
    try {
      await onSubmit(result.data);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (value: string) => {
    setOtp(value);
    if (error) setError('');
    if (resendMessage) setResendMessage('');
  };

  const handleResend = async () => {
    if (isResending || resendCooldown > 0) return;

    setIsResending(true);
    setError('');
    setResendMessage('');

    await simulateDelay(800);

    setOtp('');
    setResendMessage(resendSent);
    setResendCooldown(resendCooldownSeconds);
    setIsResending(false);
  };

  const canResend = !isResending && resendCooldown <= 0;

  return (
    <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
      <h2 className="text-xl font-bold leading-snug text-text-primary sm:text-2xl">{title}</h2>
      <p className="mt-2 text-sm text-[#9BA3AF]">{subtitle}</p>

      <div className="mt-8 w-fit max-w-full">
        <OTPInput
          value={otp}
          onChange={handleChange}
          error={error}
          hint={!error && otp.length === 0 ? inputHint : undefined}
        />

        <p className="mt-4 text-right text-sm text-[#9BA3AF]">
          {resendPrefix}{' '}
          {canResend ? (
            <button
              type="button"
              className="inline-flex items-center gap-1.5 font-semibold text-primary transition-colors duration-150 hover:underline focus-visible:outline-none focus-visible:underline active:opacity-70"
              onClick={handleResend}
            >
              {resendLink}
            </button>
          ) : (
            <span className="inline-flex items-center gap-1.5 font-semibold text-text-secondary">
              {isResending && (
                <Loader className="h-3.5 w-3.5 border-2 border-primary border-t-transparent" />
              )}
              {isResending ? resendSending : formatCooldown(resendCooldown)}
            </span>
          )}
        </p>

        {resendMessage && (
          <p className="mt-2 text-right text-sm text-success transition-opacity duration-200">
            {resendMessage}
          </p>
        )}
      </div>

      <AuthStepFooter
        submitLabel={cta}
        onBack={onBack}
        isSubmitting={isSubmitting}
        loadingLabel={loadingLabel}
        submitDisabled={otp.length < 4}
        emptyHint={emptyHint}
      />
    </form>
  );
}
