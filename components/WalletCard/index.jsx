import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Card, Collapse, Empty, Button, Modal } from 'antd';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { DeleteOutlined } from '@ant-design/icons';

import { AppContext } from '../../pages/_app';

import { CreateWallet } from '../CreateWallet';

import styles from './WalletCard.module.less';

const getUserWalletsPath = (userId) => 'users/' + userId + '/wallets';

const CardTitle = (props) => {
  return (
    <div className={styles.cardHeadTitleWrapper}>
      <span className={styles.cardHeadTitle}>{props.title}</span>
      <CreateWallet />
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

export const WalletCard = () => {
  const appContext = useContext(AppContext);
  const [wallets, setWallets] = useState([]);
  const [walletToDelete, setWalletToDelete] = useState(null);

  useEffect(() => {
    if (appContext?.user?.uid) {
      const db = getDatabase();
      const userWalletsRef = ref(db, getUserWalletsPath(appContext?.user?.uid));

      onValue(userWalletsRef, (snapshot) => {
        const fetchedWallets = [];
        const values = snapshot.val();

        Object.keys(values).forEach((key) =>
          fetchedWallets.push({
            id: key,
            ...values[key],
          })
        );

        setWallets(fetchedWallets);
      });
    }
  }, [appContext?.user?.uid]);

  const onConfirmDelete = () => {
    const db = getDatabase();
    const userWalletsRef = ref(
      db,
      `${getUserWalletsPath(appContext?.user?.uid)}/${walletToDelete.id}`
    );

    remove(userWalletsRef).then(setWalletToDelete(null)).catch(console.error);

    setWalletToDelete(null);
  };

  const onCancelDelete = () => setWalletToDelete(null);

  const onDelete = (wallet) => () => setWalletToDelete(wallet);

  return (
    <Card
      className={styles.walletCard}
      hoverable
      title={<CardTitle title='Wallets' />}
    >
      {wallets?.length ? (
        <Collapse>
          {wallets?.map((wallet, idx) => (
            <Collapse.Panel header={<WalletHeader wallet={wallet} />} key={idx}>
              <Row>
                <Col span={19}>Wallet Description</Col>
                <Col span={5}>
                  <Row justify='space-between'>
                    <Button href={`/wallets/${wallet.id}`} type='primary' ghost>
                      Details
                    </Button>

                    <Button
                      icon={<DeleteOutlined />}
                      onClick={onDelete(wallet)}
                      danger
                      type='primary'
                    >
                      Delete
                    </Button>
                    <Modal
                      visible={walletToDelete}
                      title='Are you shure?'
                      onCancel={onCancelDelete}
                      onOk={onConfirmDelete}
                    >
                      <p>
                        Your wallet &quot;{walletToDelete?.name}&quot; would be
                        deleted!
                      </p>
                      <p>Please confirm or decline your action.</p>
                    </Modal>
                  </Row>
                </Col>
              </Row>
            </Collapse.Panel>
          ))}
        </Collapse>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </Card>
  );
};
