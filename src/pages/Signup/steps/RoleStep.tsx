import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AccountTypeOption, Button } from '@/components';
import { PersonIcon, BriefcaseIcon } from '@/components/auth/AccountTypeOption/account-type-icons';
import { ACCOUNT_TYPES, roleSchema, type RoleFormValues } from '../schemas/role.schema';
import { STEP_COPY } from '../config/steps.config';

const ACCOUNT_TYPE_ICONS = {
  personal: <PersonIcon />,
  business: <BriefcaseIcon />,
} as const;

interface RoleStepProps {
  onSubmit: (data: RoleFormValues) => void;
}

export function RoleStep({ onSubmit }: RoleStepProps) {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RoleFormValues>({
    resolver: zodResolver(roleSchema),
    defaultValues: { accountType: 'personal' },
  });

  const selected = useWatch({ control, name: 'accountType' });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col">
      <h2 className="text-lg font-normal leading-snug text-text-primary sm:text-xl">
        To join us tell us <span className="font-semibold">what type of account</span> you are
        opening
      </h2>

      <fieldset className="mt-8 space-y-3">
        <legend className="sr-only">Account type</legend>
        {ACCOUNT_TYPES.map((type) => (
          <AccountTypeOption
            key={type.value}
            label={type.label}
            icon={ACCOUNT_TYPE_ICONS[type.value]}
            selected={selected === type.value}
            onSelect={() => setValue('accountType', type.value, { shouldValidate: true })}
          />
        ))}
      </fieldset>

      {errors.accountType && (
        <p className="mt-2 text-sm text-error" role="alert">
          {errors.accountType.message}
        </p>
      )}

      <div className="mt-auto flex gap-3 pt-10">
        <Button type="button" variant="outline" className="min-w-[100px]" disabled>
          Back
        </Button>
        <Button type="submit" className="flex-1" isLoading={isSubmitting}>
          {STEP_COPY.role.cta}
        </Button>
      </div>
    </form>
  );
}
