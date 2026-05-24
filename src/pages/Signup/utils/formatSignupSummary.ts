import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { ACCOUNT_TYPES } from '../schemas/role.schema';

export function getAccountTypeLabel(accountType?: string): string {
  return ACCOUNT_TYPES.find((type) => type.value === accountType)?.label ?? '—';
}

export function formatNationalPhone(phone?: string): string {
  if (!phone) return '—';

  const parsed = parsePhoneNumberFromString(phone);
  if (parsed) {
    return parsed.nationalNumber;
  }

  return phone.replace(/\D/g, '');
}

export function maskEmail(email?: string): string | undefined {
  if (!email) return undefined;

  const [localPart, domain] = email.split('@');
  if (!domain) return email;

  const visible = localPart.slice(0, 2);
  return `${visible}••••@${domain}`;
}

export function formatFullName(firstName?: string, lastName?: string): string | undefined {
  const name = [firstName, lastName].filter(Boolean).join(' ').trim();
  return name || undefined;
}
