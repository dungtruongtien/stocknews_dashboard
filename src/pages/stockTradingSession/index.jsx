import React from 'react';
import { AutoComplete, Input, Table } from 'antd';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useQuery } from '@apollo/react-hooks';
import { GET_STOCK_TRADING_SESSIONS } from '../../services/personalStocksInfo.service';
import { moneyFormatter } from '../../util/formatter';

const columns = [
  {
    title: 'Ngày Giao Dịch',
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
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.status.localeCompare(b.status),
    render: (text) => {
      const color = text === 'hold' ? '#1739b5' : '#ff0000';
      return (<p style={{ color }}>{text.toUpperCase()}</p>);
    }
  },
  {
    title: 'Vốn',
    dataIndex: 'stockTotalTradePrice',
    key: 'stockTotalTradePrice',
    render: (text, record) => {
      const { stockTotalTradePrice } = record;
      return (<p>{moneyFormatter(stockTotalTradePrice)}</p>);
    }
  },
  {
    title: 'Lời/Lỗ (Giấy tờ)',
    dataIndex: 'profitAmount',
    key: 'profitAmount',
    render: (text, record) => {
      const { paperProfitAmount, paperProfitPercent } = record;
      const color = paperProfitPercent < 0 ? '#dc0a0d' : '#0dbd31';
      return (<p style={{ color }}>{moneyFormatter(paperProfitAmount)} ({paperProfitPercent}%)</p>);
    }
  },
  {
    title: 'Lời/Lỗ (Thực tế)',
    dataIndex: 'profitAmount',
    key: 'profitAmount',
    render: (text, record) => {
      const { profitAmount, profitPercent } = record;
      const color = profitPercent < 0 ? '#dc0a0d' : '#0dbd31';
      return (<p style={{ color }}>{moneyFormatter(profitAmount)} ({profitPercent}%)</p>);
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
