import { Children, useId } from 'react';
import { CountrySelector, usePhoneInput, type CountryIso2 } from 'react-international-phone';
import 'react-international-phone/style.css';
import { cn } from '@/utils';

interface PhoneInputProps {
  label?: string;
  error?: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

const preferredCountries: CountryIso2[] = ['in', 'us', 'gb', 'ae', 'sg'];

const fieldBorder = (error?: string) =>
  cn(
    'border bg-surface transition-colors',
    'focus-within:border-primary focus-within:outline-none',
    error ? 'border-error' : 'border-[#B8CCE0]',
  );

export function PhoneInput({
  label = 'Mobile Number',
  error,
  hint,
  value,
  onChange,
  onBlur,
}: PhoneInputProps) {
  const baseId = useId();
  const inputId = `${baseId}-phone`;
  const errorId = error ? `${baseId}-error` : undefined;
  const hintId = hint && !error ? `${baseId}-hint` : undefined;

  const { country, setCountry, inputValue, handlePhoneValueChange, inputRef } = usePhoneInput({
    defaultCountry: 'in',
    preferredCountries,
    value,
    disableDialCodeAndPrefix: true,
    disableFormatting: false,
    onChange: ({ phone }) => onChange(phone),
  });

  return (
    <div className="w-full min-w-0">
      <label htmlFor={inputId} className="mb-2 block text-sm font-normal text-[#7A90AD]">
        {label}
        <span className="text-[#7A90AD]">*</span>
      </label>

      <div className="phone-input-row flex gap-3">
        <CountrySelector
          selectedCountry={country.iso2}
          onSelect={(selected) => setCountry(selected.iso2)}
          preferredCountries={preferredCountries}
          flagClassName="phone-input-flag"
          dropdownArrowClassName="phone-input-arrow"
          renderButtonWrapper={({ children, rootProps }) => {
            const items = Children.toArray(children);

            return (
              <button
                {...rootProps}
                type="button"
                className={cn('phone-input-country-btn', fieldBorder(error))}
              >
                <span className="phone-input-country-content">
                  {items[0]}
                  <span className="phone-input-dial-code">+{country.dialCode}</span>
                  {items.slice(1)}
                </span>
              </button>
            );
          }}
        />

        <input
          ref={inputRef}
          id={inputId}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          value={inputValue}
          onChange={handlePhoneValueChange}
          onBlur={onBlur}
          placeholder="9876543210"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : hintId}
          className={cn(
            'phone-input-number min-h-12 flex-1 rounded-lg px-4 text-base text-text-primary',
            'placeholder:text-[#9CA3AF]',
            fieldBorder(error),
          )}
        />
      </div>

      {error ? (
        <p id={errorId} className="mt-1.5 text-sm text-error" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="mt-1.5 text-sm text-text-secondary">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
