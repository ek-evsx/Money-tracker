import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { Row, Col, Card } from 'antd';
import { getDatabase, ref, onValue } from 'firebase/database';

import { CircularProgress } from '../../components/CircularProgress';

import getLayout from '../../utils/getLayout';
import { DELAY } from '../../utils/constants';

import { AppContext } from '../_app';

import styles from '../../styles/Wallets.module.less';

const getProgressBarColor = (amount) => {
  if (amount > 0) {
    return 'green';
  } else if (amount < 0) {
    return 'red';
  } else {
    return 'yellow';
  }
};

export default function Wallet() {
  const appContext = useContext(AppContext);

  const router = useRouter();

  const [walletData, setWalletData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (appContext?.user?.uid) {
      const db = getDatabase();
      const walletRef = ref(
        db,
        `/users/${appContext?.user?.uid}/wallets/${router?.query?.id}`
      );

      onValue(walletRef, (snapshot) => {
        setIsLoading(true);

        setWalletData({ ...snapshot.val(), percentage: 100 });

        setTimeout(() => setIsLoading(false), DELAY);
      });
    }
  }, [appContext?.user?.uid]);

  return (
    <Row className={styles.container}>
      <Col span={8} offset={8}>
        <Card loading={isLoading}>
          <Row justify='center'>
            <h2>{walletData?.name}</h2>
          </Row>

          <Row justify='center' className={styles.progressContainer}>
            {!isLoading && walletData && (
              <CircularProgress
                color={getProgressBarColor(walletData?.amount)}
                size={150}
                strokeWidth={15}
                percentage={walletData?.percentage}
                text={walletData?.amount}
              />
            )}
          </Row>

          <Row justify='center'>
            <h1>{walletData?.currency}</h1>
          </Row>
        </Card>
      </Col>
    </Row>
  );
}

Wallet.getLayout = getLayout({ title: 'Wallet' });
