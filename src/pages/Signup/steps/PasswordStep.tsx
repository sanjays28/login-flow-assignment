import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components';
import { passwordSchema, type PasswordFormValues } from '../schemas/password.schema';
import { STEP_COPY } from '../config/steps.config';
import { AuthStepFooter } from '../components/AuthStepFooter';

const { fields, cta, loadingLabel } = STEP_COPY.password;

interface PasswordStepProps {
  onSubmit: (data: PasswordFormValues) => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

export function PasswordStep({
  onSubmit,
  onBack,
  isSubmitting: isSubmittingFlow,
}: PasswordStepProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: isSubmittingForm },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col">
      <h2 className="text-lg font-normal leading-snug text-text-primary sm:text-xl">
        Create a <span className="font-semibold">secure password</span> for your account
      </h2>

      <div className="mt-8 space-y-4">
        <div className="relative">
          <Input
            label={fields.password.label}
            type={showPassword ? 'text' : 'password'}
            placeholder={fields.password.placeholder}
            hint={fields.password.hint}
            error={errors.password?.message}
            {...register('password')}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-9 rounded-md p-1 text-text-secondary transition-colors duration-150 hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus active:scale-95"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>

        <div className="relative">
          <Input
            label={fields.confirm.label}
            type={showConfirm ? 'text' : 'password'}
            placeholder={fields.confirm.placeholder}
            hint={fields.confirm.hint}
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />
          <button
            type="button"
            onClick={() => setShowConfirm((prev) => !prev)}
            className="absolute right-3 top-9 rounded-md p-1 text-text-secondary transition-colors duration-150 hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus active:scale-95"
            aria-label={showConfirm ? 'Hide password' : 'Show password'}
          >
            {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
      </div>

      <AuthStepFooter
        submitLabel={cta}
        onBack={onBack}
        isSubmitting={isSubmittingFlow ?? isSubmittingForm}
        loadingLabel={loadingLabel}
      />
    </form>
  );
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M1 12C1 12 5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.12 14.12a3 3 0 1 1-4.24-4.24"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="1"
        y1="1"
        x2="23"
        y2="23"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
