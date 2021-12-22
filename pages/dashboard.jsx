import React, { useContext } from 'react';
import { Row, Col, Card, Button, Collapse } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

import getLayout from '../utils/getLayout';

import { AppContext } from '../pages/_app';

import styles from '../styles/Dashboard.module.less';

const mockData = [
  {
    name: 'Wallet 1',
    currency: 'BYR',
    amount: 300.55,
  },
  {
    name: 'Wallet 2',
    currency: 'EUR',
    amount: -1301.29,
  },
  {
    name: 'Wallet 3',
    currency: 'USD',
    amount: 22455.91,
  },
];

const CardTitle = (props) => {
  return (
    <div className={styles.cardHeadTitleWrapper}>
      <span className={styles.cardHeadTitle}>{props.title}</span>
      <Button size='large' type='primary' icon={<PlusCircleOutlined />}>
        Add
      </Button>
    </div>
  );
};

const WalletHeader = (props) => {
  return (
    <div className={styles.walletInfo}>
      <span className={styles.walletCurrency}>{props.wallet.currency}</span>
      <span className={styles.walletName}>{props.wallet.name}</span>{' '}
      <span
        className={`${styles.walletAmount} ${
          props.wallet.amount < 0 && styles.walletAmountNegative
        }`}
      >
        {props.wallet.amount}
      </span>
    </div>
  );
};

export default function Dashboard() {
  const appContext = useContext(AppContext);
  console.log('appContext', appContext);
  return (
    <div className={styles.container}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title={<CardTitle title='Wallets' />}>
            <Collapse>
              {mockData.map((wallet, idx) => (
                <Collapse.Panel
                  header={<WalletHeader wallet={wallet} />}
                  key={idx}
                >
                  Wallet Description
                </Collapse.Panel>
              ))}
            </Collapse>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

Dashboard.getLayout = getLayout({ title: 'Dashboard' });
