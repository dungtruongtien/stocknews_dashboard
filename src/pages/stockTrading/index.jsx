import React from 'react';
import { AutoComplete, Input, Table } from 'antd';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useQuery } from '@apollo/react-hooks';
import { GET_STOCK_TRADING_SESSIONS } from '../../services/personalStocksInfo.service';

const columns = [
  {
    title: 'Ngày Giao Dịch',
    dataIndex: 'investDate',
    key: 'investDate',
    render: (text) => {
      return <p>{format(new Date(text), 'yyyy/MM/dd')}</p>;
    }
  },
  {
    title: 'Cổ Phiếu',
    dataIndex: 'stockName',
    key: 'stockName'
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

export default function StockTrading() {
  const {
    data: stockTrading = { stockTrading: { data: [], total: 0 } },
    loading: stockTradingLoading,
    refetch
    // error: personalStockInfoError,
  } = useQuery(GET_STOCK_TRADING_SESSIONS, {
    variables: {
      limit: 10,
      offset: 0
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
            total: stockTrading.stockTrading.total,
            pageSize: 10,
            onChange: onPageChange
          }}
          loading={stockTradingLoading}
          dataSource={stockTrading.stockTrading.data}
          columns={columns}
          rowKey="_id"
        />;
      </div>
    </>
  );
}
