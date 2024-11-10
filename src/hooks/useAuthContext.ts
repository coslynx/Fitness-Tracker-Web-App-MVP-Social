import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../utils/constants';
import { User, LoginCredentials } from '../utils/types';
import AuthenticationService from '../services/AuthenticationService';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  loginUser: (credentials: LoginCredentials) => Promise<void>;
  logoutUser: () => Promise<void>;
  getCurrentUser: () => User | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  error: null,
  loginUser: async () => {},
  logoutUser: async () => {},
  getCurrentUser: () => null,
});

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const currentUser = await AuthenticationService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        setError('Failed to fetch user');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const loginUser = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await AuthenticationService.loginUser(credentials);
      setUser(user);
    } catch (error) {
      setError('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  const logoutUser = async () => {
    setIsLoading(true);
    try {
      await AuthenticationService.logoutUser();
      setUser(null);
    } catch (error) {
      setError('Failed to logout');
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentUser = () => {
    return user;
  };

  const contextValue: AuthContextType = {
    user,
    isLoading,
    error,
    loginUser,
    logoutUser,
    getCurrentUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);