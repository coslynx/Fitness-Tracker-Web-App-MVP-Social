import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthContext } from '../hooks/useAuthContext';
import UserDashboard from '../components/UserDashboard';
import AuthenticationService from '../services/AuthenticationService'; 

const IndexPage: React.FC = () => {
  const router = useRouter();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  return (
    <div className="container">
      {!user && (
        <>
          <h1 className="title">Welcome to Fitness Tracker!</h1>
          <p className="description">Track your fitness goals, monitor your progress, and stay motivated!</p>
          <button className="button" onClick={() => router.push('/login')}>Sign Up or Login</button>
        </>
      )}
    </div>
  );
};

export default IndexPage;