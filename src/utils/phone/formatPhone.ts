import { parsePhoneNumberFromString } from 'libphonenumber-js';

export function formatPhoneDisplay(phone: string): string {
  const parsed = parsePhoneNumberFromString(phone);
  return parsed?.formatInternational() ?? phone;
}
