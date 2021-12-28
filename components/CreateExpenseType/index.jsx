import React, { useContext, useState } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import {
  blue,
  orange,
  yellow,
  green,
  purple,
  red,
  gold,
} from '@ant-design/colors';
import { Modal, Button, Form, Input, Tooltip, Tag } from 'antd';
import { getDatabase, ref, set, push } from 'firebase/database';

import { AppContext } from '../../pages/_app';

import styles from './CreateExpenseType.module.less';

const COLORS_MAP = [
  {
    color: blue,
    name: 'BLUE',
  },
  {
    color: purple,
    name: 'PURPLE',
  },
  {
    color: orange,
    name: 'ORANGE',
  },
  {
    color: gold,
    name: 'GOLD',
  },
  {
    color: yellow,
    name: 'YELLOW',
  },
  {
    color: green,
    name: 'GREEN',
  },
  {
    color: red,
    name: 'RED',
  },
];

const AVERAGE_INDEX = 5;

const ColorTooltipBody = (props) => {
  const onColorClick = (color) => () => {
    props.onCloseTooltip();
    props.onColorChanged(color);
  };

  return props?.colors?.map(
    (color, idx) =>
      !props.expenseTypes.find((type) => type.color === color) && (
        <div
          className={styles.colorShade}
          style={{
            background: color,
            color: idx >= 5 ? 'white' : 'black',
          }}
          onClick={onColorClick(color)}
        >
          {props?.name?.toLowerCase()}-{idx + 1}
        </div>
      )
  );
};

export const CreateExpenseType = (props) => {
  const appContext = useContext(AppContext);
  const [form] = Form.useForm();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tooltipColor, setTootltipColor] = useState(null);

  const showModal = () => setIsModalVisible(true);

  const onSubmit = (values) => {
    const db = getDatabase();
    const expenseTypesRef = ref(
      db,
      'users/' + appContext?.user?.uid + '/expenseTypes'
    );
    set(push(expenseTypesRef), values);
    setIsModalVisible(false);
    form.resetFields();
  };

  const onCancel = () => setIsModalVisible(false);

  const onColorChanged = (color) => form.setFieldsValue({ color });

  const onTooltipClick = (color) => () => setTootltipColor(color);

  return (
    <React.Fragment>
      <Button
        size='large'
        type='primary'
        icon={<PlusCircleOutlined />}
        onClick={showModal}
      >
        Add
      </Button>
      <Modal
        title='Create new expense type'
        visible={isModalVisible}
        okButtonProps={{
          htmlType: 'submit',
          form: 'createExpenseType',
        }}
        onCancel={onCancel}
      >
        <Form id='createExpenseType' form={form} onFinish={onSubmit}>
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
            name='color'
            label='Color'
            rules={[
              {
                required: true,
              },
            ]}
          >
            {COLORS_MAP.map((colorData) => (
              <Tooltip
                key={colorData.name}
                trigger='click'
                title={
                  <ColorTooltipBody
                    onColorChanged={onColorChanged}
                    colors={colorData.color}
                    onCloseTooltip={onTooltipClick(null)}
                    expenseTypes={props.expenseTypes}
                    name={colorData.name}
                  />
                }
                visible={tooltipColor === colorData.name}
                overlayClassName={styles.tooltipContent}
                placement='bottom'
                onClick={onTooltipClick(colorData.name)}
              >
                <div
                  className={styles.colorPicker}
                  style={{
                    background: colorData.color[AVERAGE_INDEX],
                  }}
                ></div>
              </Tooltip>
            ))}
          </Form.Item>

          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.color !== currentValues.color ||
              prevValues.name !== currentValues.name
            }
          >
            {({ getFieldValue }) => (
              <Tag color={getFieldValue('color')}>{getFieldValue('name')}</Tag>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>
  );
};
