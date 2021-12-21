import React from 'react';
import { initializeApp } from 'firebase/app';

import { FIREBASE } from '../utils/config';

import '../styles/variables.less';

const MyApp = ({ Component, pageProps }) => {
  // Initialize Firebase
  initializeApp(FIREBASE);

  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(<Component {...pageProps} />);
};

export default MyApp;
