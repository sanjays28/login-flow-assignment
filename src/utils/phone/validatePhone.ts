import { isValidPhoneNumber } from 'libphonenumber-js';

export function isValidInternationalPhone(phone: string): boolean {
  if (!phone.trim()) return false;

  try {
    return isValidPhoneNumber(phone);
  } catch {
    return false;
  }
}
