import React from 'react';
import { Spin as BaseSpin } from 'antd';

import styles from './Spin.module.less';

export const Spin = (props) => {
  const Container = (containerProps) =>
    props.isFullScreen ? (
      <div className={styles.container}>{containerProps.children}</div>
    ) : (
      <React.Fragment>{containerProps.children}</React.Fragment>
    );

  return (
    <Container>
      <BaseSpin
        delay={props.delay}
        size={props.size}
        wrapperClassName={styles.spin}
      />
    </Container>
  );
};
