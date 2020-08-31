import React from 'react';
import { AutoComplete, Input, Table } from 'antd';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useQuery } from '@apollo/react-hooks';
import { GET_STOCK_TRADING_SESSIONS } from '../../services/personalStocksInfo.service';
import { moneyFormatter } from '../../util/formatter';

const columns = [
  {
    title: 'Ngày Mua',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (text) => {
      return <p>{format(new Date(text), 'yyyy/MM/dd')}</p>;
    }
  },
  {
    title: 'Cổ Phiếu',
    dataIndex: 'stock',
    key: 'stock'
  },
  {
    title: 'Trạng Thái',
    dataIndex: 'status',
    key: 'status',
    render: (text) => {
      const color = text === 'hold' ? '#abad1f' : '#dc0a0d';
      return (<p style={{ color }}>{text.toUpperCase()}</p>);
    }
  },
  {
    title: 'Lời/Lỗ',
    dataIndex: 'totalProfitOrLostAmount',
    key: 'totalProfitOrLostAmount',
    render: (text, record) => {
      const { totalProfitOrLostAmount, totalProfitOrLostPercent } = record;
      const color = totalProfitOrLostPercent < 0 ? '#dc0a0d' : '#0dbd31';
      return (<p style={{ color }}>{moneyFormatter(totalProfitOrLostAmount)} ({totalProfitOrLostPercent}%)</p>);
    }
  },
  {
    title: 'Action',
    dataIndex: 'tradingKey',
    key: 'tradingKey',
    render: (text) => {
      return (<Link to={`/stock-trading-session/history/${text}`}>Show History</Link>);
    }
  }
];

export default function StockTradingSession() {
  const {
    data: stockTradingSessions = { stockTradingSessions: { data: [], pageInfo: { total: 0, pageSize: 0 } } },
    loading: stockTradingSessionsLoading,
    refetch
    // error: personalStockInfoError,
  } = useQuery(GET_STOCK_TRADING_SESSIONS, {
    variables: {
      filter: {
        limit: 10,
        page: 1
      }
    },
    fetchPolicy: 'no-cache'
  });

  const onPageChange = (page) => {
    refetch({
      filter: {
        limit: 10,
        page
      }
    });
  };

  return (
    <>
      <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between' }}>
        <AutoComplete
          dropdownMatchSelectWidth={252}
          style={{
            width: 350
          }}
        >
          <Input.Search size="large" placeholder="Search Here" enterButton />
        </AutoComplete>
      </div>
      <div>
        <Table
          pagination={{
            total: stockTradingSessions.stockTradingSessions.pageInfo.total,
            pageSize: 10,
            onChange: onPageChange
          }}
          loading={stockTradingSessionsLoading}
          dataSource={stockTradingSessions.stockTradingSessions.data}
          columns={columns}
          rowKey="_id"
        />;
      </div>
    </>
  );
}
