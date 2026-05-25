import { useEffect, useState } from 'react';
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Button } from '@/components';
import { ROUTES } from '@/config';
import SignupContainer from '@/pages/Signup/container';
import { authService } from '@/services';

function HomePage() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    authService.isLoggedIn().then(setLoggedIn);
  }, []);

  const handleLogout = async () => {
    await authService.logout();
    navigate(ROUTES.SIGNUP);
  };

  if (loggedIn === null) {
    return null;
  }

  if (!loggedIn) {
    return <Navigate to={ROUTES.SIGNUP} replace />;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-zinc-950 text-white">
      <h1 className="text-3xl font-semibold">You are logged in</h1>
      <p className="text-zinc-400">Home screen — work here</p>
      <Button onClick={handleLogout}>Log out</Button>
      <Link to={ROUTES.SIGNUP} className="text-sm text-violet-400 hover:underline">
        Back to signup
      </Link>
    </div>
  );
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.SIGNUP} element={<SignupContainer />} />
      <Route path="*" element={<Navigate to={ROUTES.SIGNUP} replace />} />
    </Routes>
  );
}
