import React, { useState, useContext } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Modal, Button, Form, Input, InputNumber, Radio } from 'antd';
import { getDatabase, ref, set, push } from 'firebase/database';

import { AppContext } from '../../pages/_app';

import { CURRENCIES } from '../../utils/constants';

export const AddTransaction = () => {
  const appContext = useContext(AppContext);
  const [form] = Form.useForm();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);

  const onSubmit = (values) => {
    const db = getDatabase();
    const walletsRef = ref(db, 'users/' + appContext?.user?.uid + '/wallets');
    set(push(walletsRef), values);
    setIsModalVisible(false);
    form.resetFields();
  };

  const onCancel = () => setIsModalVisible(false);

  return (
    <React.Fragment>
      <Button
        size='large'
        type='primary'
        icon={<PlusCircleOutlined />}
        onClick={showModal}
      >
        Add transaction
      </Button>
      <Modal
        title='Create new wallet'
        visible={isModalVisible}
        okButtonProps={{
          htmlType: 'submit',
          form: 'createWallet',
        }}
        onCancel={onCancel}
      >
        <Form id='createWallet' form={form} onFinish={onSubmit}>
          <Form.Item
            name='name'
            label='Name'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name='currency'
            label='Currency'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Radio.Group>
              {CURRENCIES.map((currency, idx) => (
                <Radio.Button key={idx} value={currency}>
                  {currency}
                </Radio.Button>
              ))}
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name='amount'
            label='Amount'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>
  );
};
