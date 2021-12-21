import { useEffect, useState } from 'react';
import Router from 'next/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const useAuth = ({
  defaultRedirectUrl = '/dashboard',
  shouldRedirect = true,
  delay = 500,
} = {}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      let redirectUrl = defaultRedirectUrl;
      if (!user) {
        redirectUrl = '/login';
      }

      setTimeout(() => {
        if (shouldRedirect || redirectUrl !== Router.pathname) {
          Router.push(redirectUrl);
        }

        setIsLoading(false);
      }, delay);
    });
  }, []);

  return isLoading;
};
