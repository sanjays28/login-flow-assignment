import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { VApplication } from '@/application';
import StartupContainer from '@/pages/Startup/container';
import { AppRoutes } from '@/routes/AppRoutes';

function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    VApplication.getInstance()
      .bootstrap()
      .then(() => setReady(true))
      .catch(() => setReady(true));
  }, []);

  if (!ready) {
    return <StartupContainer />;
  }

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
