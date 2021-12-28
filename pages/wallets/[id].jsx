import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { Row, Col, Card, Empty, Table, Tag } from 'antd';
import { getDatabase, ref, onValue } from 'firebase/database';
import { PieChart, Pie, Cell } from 'recharts';
import { blue } from '@ant-design/colors';

import { CircularProgress } from '../../components/CircularProgress';
import { CreateExpenseType } from '../../components/CreateExpenseType';

import getLayout from '../../utils/getLayout';
import { DELAY } from '../../utils/constants';

import { AppContext } from '../_app';

import styles from '../../styles/Wallets.module.less';

const OUTCOMING = 'outcoming';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Transaction type',
    dataIndex: 'transactionType',
    key: 'transactionType',
    align: 'center',
    render: (text) => (
      <Tag color={text === OUTCOMING ? 'volcano' : 'green'}>
        {text.toUpperCase()}
      </Tag>
    ),
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    align: 'center',
    render: (amount, transaction) => {
      const isOutcoming = transaction.transactionType === OUTCOMING;
      return (
        <div
          className={
            isOutcoming ? styles.negativeAmount : styles.positiveAmount
          }
        >
          {isOutcoming && '-'}
          {amount}
        </div>
      );
    },
  },
  {
    title: 'Expenses type',
    dataIndex: 'expensesType',
    key: 'expensesType',
    align: 'center',
    render: (expensesType) =>
      expensesType ? (
        <Tag color={expensesType.color}>{expensesType?.name}</Tag>
      ) : (
        '-'
      ),
  },
  {
    title: 'Comments',
    dataIndex: 'comments',
    key: 'comments',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: (date) => new Date(date).toLocaleDateString(),
  },
];

const transactionData = [
  {
    key: '1',
    name: 'Salary',
    transactionType: 'incoming',
    amount: 1000,
    comments: 'Salary',
    date: Date.now(),
  },
  {
    key: '2',
    name: 'Buy a dinner',
    transactionType: 'outcoming',
    amount: 10,
    expensesType: {
      name: 'Food',
      color: blue[5],
    },
    comments: 'Buy a dinner in a restaurant.',
    date: Date.now(),
  },
];

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill='white'
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline='central'
      fontWeight={700}
      fontSize='22px'
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

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
  const [expenseTypes, setExpenseTypes] = useState(null);
  // const [transactions, setTransactions] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (appContext?.user?.uid) {
      const db = getDatabase();
      const walletRef = ref(
        db,
        `/users/${appContext?.user?.uid}/wallets/${router?.query?.id}`
      );
      const expenseTypesRef = ref(
        db,
        `/users/${appContext?.user?.uid}/expenseTypes`
      );

      onValue(expenseTypesRef, (snapshot) => {
        setIsLoading(true);

        const value = snapshot.val();

        const parsedValue = Object.keys(value).map((id) => ({
          ...value[id],
          id,
        }));

        setExpenseTypes(parsedValue);

        setTimeout(() => setIsLoading(false), DELAY);
      });

      onValue(walletRef, (snapshot) => {
        setIsLoading(true);

        setWalletData({ ...snapshot.val(), percentage: 100 });

        setTimeout(() => setIsLoading(false), DELAY);
      });
    }
  }, [appContext?.user?.uid]);

  return (
    <React.Fragment>
      <Row className={styles.container} gutter={[10, 10]}>
        <Col span={8}>
          <Row>
            <Col span={24}>
              <Card loading={isLoading} className={styles.halfCardContainer}>
                <Row justify='center'>
                  <h1>{walletData?.name}</h1>
                </Row>

                <Row justify='center' className={styles.progressContainer}>
                  {!isLoading && walletData && (
                    <CircularProgress
                      color={getProgressBarColor(walletData?.amount)}
                      size={230}
                      strokeWidth={20}
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

          <Row className={styles.expensesChartContainer}>
            <Col span={24}>
              <Card loading={isLoading} className={styles.halfCardContainer}>
                <Row justify='space-between'>
                  <h1>Expense types</h1>
                  <div>
                    <CreateExpenseType expenseTypes={expenseTypes} />
                  </div>
                </Row>

                <Row>
                  <Col span={18}>
                    <PieChart width={315} height={315}>
                      <Pie
                        data={data}
                        cx='50%'
                        cy='50%'
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={155}
                        fill='#8884d8'
                        dataKey='value'
                      >
                        {data?.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </Col>

                  <Col span={6}>
                    {expenseTypes?.map((type) => (
                      <Row key={type.id} className={styles.expenseTagRow}>
                        <Tag color={type.color}>{type.name}</Tag>
                      </Row>
                    ))}
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Col>

        <Col span={16}>
          <Card loading={isLoading} className={styles.cardContainer}>
            <h1>Transactions list:</h1>
            {transactionData ? (
              <Table columns={columns} dataSource={transactionData} />
            ) : (
              <div className={styles.emptyContainer}>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
}

Wallet.getLayout = getLayout({ title: 'Wallet' });
