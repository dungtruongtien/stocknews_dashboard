import { AutoComplete, Input, Table } from 'antd';
import React from 'react';
import { format } from 'date-fns';
import { useQuery } from '@apollo/react-hooks';
import { STOCK_HISTORY } from '../../services/personalStocksInfo.service';
import { moneyFormatter } from '../../util/formatter';

const columns = [
  {
    title: 'Ngày',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (text) => {
      return <p>{format(new Date(text), 'yyyy/MM/dd')}</p>;
    }
  },
  {
    title: 'Mua/Bán CP',
    dataIndex: 'stockTradeAmount',
    key: 'stockTradeAmount',
    render: (text, record) => {
      const { action } = record;
      let actionStr = '';
      switch (action) {
      case 'additionBuy':
        actionStr = '(Mua Thêm)';
        break;
      case 'subtractionSell':
        actionStr = '(Bán Bớt)';
        break;
      case 'buy':
        actionStr = '(Mua)';
        break;
      case 'sell':
        actionStr = '(Bán)';
        break;
      default:
        break;
      }
      return <p>{text} {actionStr}</p>;
    }
  },
  {
    title: 'Giá Đóng Cửa',
    dataIndex: 'closingPrice',
    key: 'closingPrice'
  },
  {
    title: '% Lời/Lỗ',
    dataIndex: 'profitOrLostPercent',
    key: 'profitOrLostPercent',
    render: (text, record) => {
      console.log('text-------', text, typeof text);
      const { stockTotalClosingPrice, stockTotalTradePrice } = record;
      const profitOrLostAmount = parseInt(stockTotalClosingPrice, 10) - parseInt(stockTotalTradePrice, 10);
      const color = text < 0 ? '#dc0a0d' : '#0dbd31';
      return (<p style={{ color }}>{moneyFormatter(profitOrLostAmount)} ({text}%)</p>);
    }
  }
];

export default function HistoryStockTrading({ match }) {
  const {
    data: stockHistory = { stockHistory: { data: [], pageInfo: { total: 0, currentPage: 1 } } },
    refetch,
    loading: stockHistoryLoading
    // error: personalStockInfoError,
  } = useQuery(STOCK_HISTORY, {
    variables: {
      tradingKey: match.params.tradingKey,
      filter: {
        limit: 10,
        page: 1
      }
    },
    fetchPolicy: 'no-cache'
  });

  const { stockHistory: stockHistoryData } = stockHistory;

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
        <p style={{ fontSize: '2rem' }}>Cổ Phiếu: {stockHistoryData.data[0] && stockHistoryData.data[0].stock}</p>
      </div>
      <Table
        pagination={{ total: stockHistoryData.pageInfo.total, pageSize: 10, onChange: onPageChange }}
        loading={stockHistoryLoading}
        dataSource={stockHistoryData.data}
        columns={columns}
        rowKey="_id"
      />;
    </>
  );
}
