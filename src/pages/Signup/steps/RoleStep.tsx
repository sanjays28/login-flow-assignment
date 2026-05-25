import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AccountTypeOption } from '@/components';
import { PersonIcon, BriefcaseIcon } from '@/components/auth/AccountTypeOption/account-type-icons';
import { ACCOUNT_TYPES, roleSchema, type RoleFormValues } from '../schemas/role.schema';
import { STEP_COPY } from '../config/steps.config';
import { AuthStepFooter } from '../components/AuthStepFooter';

const ACCOUNT_TYPE_ICONS = {
  personal: <PersonIcon />,
  business: <BriefcaseIcon />,
} as const;

interface RoleStepProps {
  onSubmit: (data: RoleFormValues) => void | Promise<void>;
  defaultValues?: RoleFormValues;
}

export function RoleStep({ onSubmit, defaultValues }: RoleStepProps) {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RoleFormValues>({
    resolver: zodResolver(roleSchema),
    defaultValues: defaultValues ?? { accountType: 'personal' },
  });

  const selected = useWatch({ control, name: 'accountType' });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col">
      <h2 className="max-w-[453px] text-2xl font-normal leading-9 text-text-primary">
        To join us tell us <span className="font-medium">what type of account</span> you are opening
      </h2>

      <fieldset className="mt-12 space-y-3">
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

      <AuthStepFooter submitLabel={STEP_COPY.role.cta} backDisabled isSubmitting={isSubmitting} />
    </form>
  );
}
