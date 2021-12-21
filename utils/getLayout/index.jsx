import React from 'react';
import { PageHeader, Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import Router from 'next/router';
import { getAuth, signOut } from 'firebase/auth';

import styles from '../../styles/Layout.module.less';

const onLogout = () => {
  const auth = getAuth();
  signOut(auth)
    .then((res) => {
      console.log('Log out successfuly: ', res);
      Router.push('/login');
    })
    .catch((error) => {
      console.log('Error while log out: ', error);
    });
};

const onBack = () => Router.back();

export default function getLayout({ title, subTitle = '' }) {
  return function getWrappedPage(page) {
    return (
      <React.Fragment>
        <PageHeader
          className={styles.sitePageHeader}
          onBack={onBack}
          title={title}
          subTitle={subTitle}
          ghost={false}
          extra={[
            <Button
              key='1'
              type='primary'
              onClick={onLogout}
              icon={<LogoutOutlined />}
              size='large'
            >
              Log out
            </Button>,
          ]}
        />

        <main>{page}</main>
      </React.Fragment>
    );
  };
}
