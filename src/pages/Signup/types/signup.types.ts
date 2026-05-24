import type { NameFormValues } from '../schemas/name.schema';
import type { OtpFormValues } from '../schemas/otp.schema';
import type { PasswordFormValues } from '../schemas/password.schema';
import type { PhoneFormValues } from '../schemas/phone.schema';
import type { RoleFormValues } from '../schemas/role.schema';

export type SignupData = Partial<
  RoleFormValues &
    PhoneFormValues &
    OtpFormValues &
    NameFormValues &
    PasswordFormValues & {
      email?: string;
    }
>;
