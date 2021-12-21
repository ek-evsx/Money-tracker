import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { GoogleOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export const GoogleButton = (props) => {
  return (
    <Button
      type='secondary'
      size='large'
      icon={<GoogleOutlined />}
      onClick={props.onClick}
    >
      {props.text}
    </Button>
  );
};

const GoogleAuthLogin = (props) => {
  return (
    <GoogleLogin
      clientId='221599445360-45r8cti029t42m8ii1vf6okh5l1182oe.apps.googleusercontent.com'
      buttonText={props.buttonText}
      onSuccess={props.onSuccess}
      onFailure={props.onFailure}
      cookiePolicy={'single_host_origin'}
      isSignedIn={true}
    />
  );
};

const GoogleAuthLogout = (props) => {
  return (
    <GoogleLogout
      clientId='221599445360-45r8cti029t42m8ii1vf6okh5l1182oe.apps.googleusercontent.com'
      buttonText={props.buttonText}
      onLogoutSuccess={props.onSuccess}
    />
  );
};

export const GoogleAuth = {
  Login: GoogleAuthLogin,
  Logout: GoogleAuthLogout,
};
