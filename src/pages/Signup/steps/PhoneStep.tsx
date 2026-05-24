import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PhoneInput } from '@/components';
import { phoneSchema, type PhoneFormValues } from '../schemas/phone.schema';
import { STEP_COPY } from '../config/steps.config';
import { AuthStepFooter } from '../components/AuthStepFooter';

interface PhoneStepProps {
  onSubmit: (data: PhoneFormValues) => void;
  onBack: () => void;
}

export function PhoneStep({ onSubmit, onBack }: PhoneStepProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phone: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col">
      <h2 className="text-lg font-normal leading-snug text-text-primary sm:text-xl">
        {STEP_COPY.phone.heading}
      </h2>

      <div className="mt-8">
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <PhoneInput
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={errors.phone?.message}
            />
          )}
        />
      </div>

      <AuthStepFooter
        submitLabel={STEP_COPY.phone.cta}
        onBack={onBack}
        isSubmitting={isSubmitting}
      />
    </form>
  );
}
