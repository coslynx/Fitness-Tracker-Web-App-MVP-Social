import type { AppProps } from 'next/app'; 
import { useAuthContext } from '../hooks/useAuthContext';
import UserDashboard from '../components/UserDashboard';
import LoginPage from '../pages/login'; 

function MyApp({ Component, pageProps }: AppProps) {
  const { user, isLoading } = useAuthContext(); 

  if (isLoading) {
    return (
      <div>Loading...</div>
    );
  }

  if (!user) { 
    return (
      <LoginPage />
    );
  }

  return (
    <UserDashboard /> 
  );
}

export default MyApp;