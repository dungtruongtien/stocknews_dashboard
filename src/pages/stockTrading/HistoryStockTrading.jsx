import { AutoComplete, Input, Table } from 'antd';
import React from 'react';
import { format } from 'date-fns';
import { useQuery } from '@apollo/react-hooks';
import { STOCK_HISTORY } from '../../services/stockTrading.service';
import { moneyFormatter } from '../../util/formatter';

const columns = [
  {
    title: 'Ngày',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (text) => {
      return <p>{format(new Date(text), 'dd/MM/yyyy')}</p>;
    }
  },
  {
    title: 'Mua/Bán CP',
    dataIndex: 'action',
    key: 'action',
    render: (text) => {
      switch (text) {
        case 'BUY':
          return 'Mua';
        case 'SELL':
          return 'Bán';
        default:
          return '';
      }
    }
  },
  {
    title: 'Giá Đóng Cửa',
    dataIndex: 'closingPrice',
    key: 'closingPrice'
  },
  {
    title: 'Lời/Lỗ',
    dataIndex: 'profitAmount',
    key: 'profitAmount',
    render: (profitAmount, record) => {
      const { profitPercent } = record;
      const color = profitPercent < 0 ? '#dc0a0d' : '#0dbd31';
      return (<p style={{ color }}>{moneyFormatter(profitAmount)} ({profitPercent}%)</p>);
    }
  },
  {
    title: 'Lời/Lỗ (Thực tế)',
    dataIndex: 'totalProfitAmount',
    key: 'totalProfitAmount',
    render: (totalProfitAmount) => {
      const color = totalProfitAmount < 0 ? '#dc0a0d' : '#0dbd31';
      return (<p style={{ color }}>{moneyFormatter(totalProfitAmount)}</p>);
    }
  }
];

export default function HistoryStockTrading({ match }) {
  const {
    data: stockTradingItems = { stockTradingItems: { data: [], pageInfo: { total: 0, currentPage: 1 } } },
    refetch,
    loading: stockHistoryLoading
    // error: personalStockInfoError,
  } = useQuery(STOCK_HISTORY, {
    variables: {
      limit: 10,
      page: 0,
      filter: {
        tradingKey: match.params.tradingKey,
      }
    },
    fetchPolicy: 'no-cache'
  });

  const onPageChange = (page) => {
    refetch({
      tradingKey: match.params.tradingKey,
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
      <div style={{ padding: '1rem', paddingBottom: 0 }}>
        <p style={{ fontSize: '2rem' }}>Cổ Phiếu: {stockTradingItems.stockTradingItems.data[0] && stockTradingItems.stockTradingItems.data[0].stockName}</p>
      </div>
      <Table
        pagination={{ total: stockTradingItems.stockTradingItems.total, pageSize: 10, onChange: onPageChange }}
        loading={stockHistoryLoading}
        dataSource={stockTradingItems.stockTradingItems.data}
        columns={columns}
        rowKey="_id"
      />;
    </>
  );
}
