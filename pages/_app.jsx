import React from 'react';
import { initializeApp } from 'firebase/app';

import { useAuth } from '../hooks/useAuth';

import { FIREBASE } from '../utils/config';
import { DELAY } from '../utils/constants';

import { Spin } from '../components/Spin';

import '../styles/variables.less';
import '../styles/globals.css';

export const AppContext = React.createContext({});

const MyApp = ({ Component, pageProps }) => {
  // Initialize Firebase
  initializeApp(FIREBASE);

  const [isLoading, user] = useAuth({ delay: DELAY });

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <AppContext.Provider value={{ user }}>
      {isLoading && <Spin isFullScreen={true} size='large' />}
      <AppContext.Consumer>
        {(value) => getLayout(<Component {...pageProps} />, value)}
      </AppContext.Consumer>
    </AppContext.Provider>
  );
};

export default MyApp;
