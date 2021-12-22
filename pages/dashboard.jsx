import React from 'react';

import getLayout from '../utils/getLayout';

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}

Dashboard.getLayout = getLayout({ title: 'Dashboard' });
