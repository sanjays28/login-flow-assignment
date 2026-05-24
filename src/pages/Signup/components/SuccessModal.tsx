import { useNavigate } from 'react-router-dom';
import { Button } from '@/components';
import { ROUTES } from '@/config/route.config';

export function SuccessModal() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-3xl bg-surface p-8 text-center shadow-[0_16px_48px_rgba(26,31,54,0.16)]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
          <CheckIcon />
        </div>

        <h2 className="mt-5 text-xl font-bold text-text-primary sm:text-2xl">Account created!</h2>
        <p className="mt-2 text-sm text-text-secondary">
          Welcome! Your account has been set up successfully.
        </p>

        <Button className="mt-8 w-full" onClick={() => navigate(ROUTES.LOGIN)}>
          Go to login
        </Button>
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="text-success"
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
