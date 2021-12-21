import React from 'react';
import { initializeApp } from 'firebase/app';

import '../styles/variables.less';

const MyApp = ({ Component, pageProps }) => {
  const firebaseConfig = {
    apiKey: 'AIzaSyBJoBvblW3VnIZ0vjK-6vF6PfQaZ6WCApc',
    authDomain: 'money-tracker-f2c6a.firebaseapp.com',
    projectId: 'money-tracker-f2c6a',
    storageBucket: 'money-tracker-f2c6a.appspot.com',
    messagingSenderId: '500663819238',
    appId: '1:500663819238:web:5223ec9299251bd77fd427',
    measurementId: 'G-LPVCJY39F0',
  };

  // Initialize Firebase
  initializeApp(firebaseConfig);

  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(<Component {...pageProps} />);
};

export default MyApp;
