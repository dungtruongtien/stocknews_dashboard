/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import { useQuery, useSubscription } from '@apollo/react-hooks';
import { Spin, Table } from 'antd';
import { BINACE_COIN_PROFILE_SUBSCRIPTION, GET_LIST_COINS } from '../../services/coin.service';

const columns = [
  {
    title: 'Coin',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Tổng Vốn',
    dataIndex: 'totalCostPrice',
    key: 'totalCostPrice',
    render: (text) => {
      return `${text} USDT`;
    }
  },
  {
    title: 'Giá Vốn',
    dataIndex: 'costPrice',
    key: 'costPrice',
    render: (text) => {
      return parseFloat(text.toFixed(4));
    }
  },
  {
    title: 'Giá Hiện Tại',
    dataIndex: 'currentPrice',
    key: 'currentPrice',
    render: (text) => {
      return text === 0 ? 0 : parseFloat(parseFloat(text).toFixed(4));
    }
  },
  {
    title: 'Lợi nhuận',
    dataIndex: 'profit',
    key: 'profit',
    render: (text, record) => {
      const { currentPrice, costPrice } = record;
      const profit = ((currentPrice - costPrice) / costPrice) * 100;
      return parseFloat(profit.toFixed(2));
    }
  }
];

export default function CoinTradingPorfolio() {
  const [currentListCoinProfiles, setCurrentListCoinProfiles] = useState([
    {
      currentPrice: 0.0,
      profit: 0,
      name: '',
      abbreviations: '',
      costPrice: 0.0
    }
  ]);

  const {
    data: binanceCoinProfileStreams = { binanceCoinProfile: { streamName: '', price: 0 } }
  } = useSubscription(BINACE_COIN_PROFILE_SUBSCRIPTION);

  const {
    loading: getListCoinsLoading,
    data: coinsData = { coins: [{ currentPrice: 0.0, profit: 0, name: '', abbreviations: '', costPrice: 0.0 }] }
  } = useQuery(GET_LIST_COINS);

  useEffect(() => {
    setCurrentListCoinProfiles(coinsData.coins);
  }, [coinsData]);

  useEffect(() => {
    setCurrentListCoinProfiles((coinProfiles) => handleCoinchange(coinProfiles, binanceCoinProfileStreams));
  }, [binanceCoinProfileStreams]);

  const handleCoinchange = (coinProfiles, streamData) => {
    return coinProfiles.map((coinProfile) => {
      const { binanceCoinProfile: { streamName, price } } = streamData;
      const { abbreviations } = coinProfile;
      if (streamName.includes(abbreviations)) {
        return {
          ...coinProfile,
          currentPrice: price
        };
      }
      return coinProfile;
    });
  };


  return (
    <>
      {getListCoinsLoading ? <Spin /> :
        <Table
          pagination={<></>}
          // loading={stockHistoryLoading}
          dataSource={currentListCoinProfiles}
          columns={columns}
          rowKey="abbreviations"
        />}
    </>
  );
}
