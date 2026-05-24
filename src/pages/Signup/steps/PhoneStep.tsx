import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, PhoneInput } from '@/components';
import { phoneSchema, type PhoneFormValues } from '../schemas/phone.schema';
import { STEP_COPY } from '../config/steps.config';

interface PhoneStepProps {
  onSubmit: (data: PhoneFormValues) => void;
  onBack: () => void;
}

export function PhoneStep({ onSubmit, onBack }: PhoneStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      countryCode: '+91',
      phone: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col">
      <h2 className="text-lg font-normal leading-snug text-text-primary sm:text-xl">
        {STEP_COPY.phone.heading}
      </h2>

      <div className="mt-8">
        <PhoneInput
          error={errors.phone?.message}
          selectProps={register('countryCode')}
          inputProps={register('phone')}
        />
      </div>

      <div className="mt-auto flex gap-3 pt-10">
        <Button type="button" variant="outline" className="min-w-[100px]" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" className="flex-1" isLoading={isSubmitting}>
          {STEP_COPY.phone.cta}
        </Button>
      </div>
    </form>
  );
}
