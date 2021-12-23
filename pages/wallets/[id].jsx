import React from 'react';
import { useRouter } from 'next/router';

import getLayout from '../../utils/getLayout';

const Wallet = () => {
  const router = useRouter();
  const { id } = router.query;

  return <p>Wallet: {id}</p>;
};

export default Wallet;

Wallet.getLayout = getLayout({ title: 'Wallet' });
