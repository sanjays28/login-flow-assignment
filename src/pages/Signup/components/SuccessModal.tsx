import { useNavigate } from 'react-router-dom';
import { Button } from '@/components';
import { ROUTES } from '@/config/route.config';
import { SUCCESS_COPY } from '../config/steps.config';
import { formatNationalPhone, getAccountTypeLabel, maskEmail } from '../utils/formatSignupSummary';

export interface SignupSummary {
  accountType?: string;
  phone?: string;
  email?: string;
  name?: string;
}

interface SuccessModalProps {
  summary: SignupSummary;
}

export function SuccessModal({ summary }: SuccessModalProps) {
  const navigate = useNavigate();
  const { title, subtitle, security, cta } = SUCCESS_COPY;

  const rows = [
    { label: 'Account Type', value: getAccountTypeLabel(summary.accountType) },
    summary.email ? { label: 'Email', value: maskEmail(summary.email) ?? summary.email } : null,
    summary.name ? { label: 'Name', value: summary.name } : null,
    { label: 'Mobile Number', value: formatNationalPhone(summary.phone) },
  ].filter((row): row is { label: string; value: string } => row !== null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-surface p-8 shadow-[0_16px_48px_rgba(26,31,54,0.16)]">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary">
          <CheckIcon />
        </div>

        <h2 className="mt-5 text-center text-xl font-bold text-text-primary sm:text-2xl">
          {title}
        </h2>
        <p className="mt-2 text-center text-sm text-text-secondary">{subtitle}</p>

        <div className="mt-6 space-y-3 rounded-2xl bg-surface-muted px-5 py-4">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between gap-4 text-sm">
              <span className="text-text-secondary">{row.label}</span>
              <span className="font-semibold text-text-primary">{row.value}</span>
            </div>
          ))}
        </div>

        <p className="mt-4 flex items-center justify-center gap-2 text-xs text-text-secondary">
          <SecurityCheckIcon />
          {security}
        </p>

        <Button size="step" className="mt-6 w-full" onClick={() => navigate(ROUTES.LOGIN)}>
          {cta}
        </Button>
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="text-primary"
    >
      <polyline
        points="20 6 9 17 4 12"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SecurityCheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="shrink-0 text-success"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <polyline
        points="8 12 11 15 16 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
