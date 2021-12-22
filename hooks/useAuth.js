import { useEffect, useState } from 'react';
import Router from 'next/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { ROUTES, DELAY } from '../utils/constants';

export const useAuth = ({
  defaultRedirectUrl = ROUTES.dashboard,
  shouldRedirect = true,
  delay = DELAY,
} = {}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      let redirectUrl = defaultRedirectUrl;
      if (!user) {
        redirectUrl = ROUTES.login;
      } else {
        setUser(user);
      }

      setTimeout(() => {
        if (shouldRedirect || redirectUrl !== Router.pathname) {
          Router.push(redirectUrl);
        }

        setIsLoading(false);
      }, delay);
    });
  }, []);

  return [isLoading, user];
};
