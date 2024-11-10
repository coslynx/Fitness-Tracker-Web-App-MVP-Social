// src/hooks/useFetch.ts

import { useState, useEffect } from 'react';
import axios from 'axios'; 

interface FetchOptions {
  headers?: { [key: string]: string };
  body?: any;
}

interface UseFetchResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

export const useFetch = <T>(url: string, token?: string, options?: FetchOptions): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(url, {
          headers: {
            ...options?.headers,
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          data: options?.body,
        });

        setData(response.data);
      } catch (error: any) {
        console.error('API Error:', error); 
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, token, options]);

  return { data, isLoading, error };
};