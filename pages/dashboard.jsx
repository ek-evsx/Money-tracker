import React from 'react';
import { Row, Col } from 'antd';

import getLayout from '../utils/getLayout';

import { WalletCard } from '../components/WalletCard';

import styles from '../styles/Dashboard.module.less';

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <WalletCard />
        </Col>
      </Row>
    </div>
  );
}

Dashboard.getLayout = getLayout({ title: 'Dashboard' });
