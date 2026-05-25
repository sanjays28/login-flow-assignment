import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components';
import { nameSchema, type NameFormValues } from '../schemas/name.schema';
import { STEP_COPY } from '../config/steps.config';
import { AuthStepFooter } from '../components/AuthStepFooter';

const { heading, fields, cta } = STEP_COPY.name;

interface NameStepProps {
  onSubmit: (data: NameFormValues) => void;
  onBack: () => void;
  defaultValues?: NameFormValues;
  isSubmitting?: boolean;
}

export function NameStep({
  onSubmit,
  onBack,
  defaultValues,
  isSubmitting: isSubmittingFlow,
}: NameStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: isSubmittingForm },
  } = useForm<NameFormValues>({
    resolver: zodResolver(nameSchema),
    defaultValues: defaultValues ?? { firstName: '', lastName: '' },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col">
      <h2 className="text-xl font-bold leading-snug text-text-primary sm:text-2xl">{heading}</h2>

      <div className="mt-8 space-y-4">
        <Input
          label={fields.firstName.label}
          placeholder={fields.firstName.placeholder}
          hint={fields.firstName.hint}
          autoComplete="given-name"
          error={errors.firstName?.message}
          {...register('firstName')}
        />
        <Input
          label={fields.lastName.label}
          placeholder={fields.lastName.placeholder}
          hint={fields.lastName.hint}
          autoComplete="family-name"
          error={errors.lastName?.message}
          {...register('lastName')}
        />
      </div>

      <AuthStepFooter
        submitLabel={cta}
        onBack={onBack}
        isSubmitting={isSubmittingFlow ?? isSubmittingForm}
      />
    </form>
  );
}
