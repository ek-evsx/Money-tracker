import React from 'react';

import { useAuth } from '../hooks/useAuth';

import getLayout from '../utils/getLayout';
import { DELAY } from '../utils/constants';

import { Spin } from '../components/Spin';

export default function Home() {
  const isLoading = useAuth({ delay: DELAY });

  return (
    <React.Fragment>
      {isLoading && <Spin isFullScreen={true} size='large' />}
    </React.Fragment>
  );
}

Home.getLayout = getLayout({ title: 'Home' });
