import React from 'react';
import { Card, Divider, Row, Button } from 'antd';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import Router from 'next/router';
import { GoogleOutlined } from '@ant-design/icons';

import { ROUTES } from '../utils/constants';

import styles from '../styles/Login.module.less';

const onSignIn = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;

      if (user) {
        Router.push(ROUTES.dashboard);
      }
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('errorCode', errorCode, errorMessage);

      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error('credential', credential);
    });
};

export default function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <Card className={styles.card}>
          <h1 className={styles.title}>Login</h1>

          <Divider />

          <Row justify='center'>
            <Button
              type='secondary'
              size='large'
              icon={<GoogleOutlined />}
              onClick={onSignIn}
            >
              Sign in with Google
            </Button>
          </Row>
        </Card>
      </div>
    </div>
  );
}
