import React from 'react';

import getLayout from '../utils/getLayout';

import { useAuth } from '../hooks/useAuth';

import { Spin } from '../components/Spin';

const DELAY = 500;

export default function Dashboard() {
  const isLoading = useAuth({ delay: DELAY });

  return (
    <div>
      <h1>Dashboard</h1>

      {isLoading && <Spin isFullScreen={true} size='large' />}
    </div>
  );
}

Dashboard.getLayout = getLayout({ title: 'Dashboard' });
