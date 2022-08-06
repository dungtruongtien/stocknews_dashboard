import gql from 'graphql-tag';

export const GET_STOCK_TRADING = gql`
  query stockTrading($filter: StockTradingFilterInput, $limit: Int, $offset: Int) {
    stockTrading(filter: $filter, limit: $limit, offset: $offset) {
      status
      message
      total
      data {
        _id
        stockName
        investDate
        tradingKey
      }
    }
  }
`;

export const STOCK_HISTORY = gql`
  query stockTradingItems($filter: StockTradingItemFilterInput, $limit: Int, $offset: Int) {
    stockTradingItems(filter: $filter, limit: $limit, offset: $offset) {
      status
      message
      total
      data {
        _id
        action
        closingPrice
        profitAmount
        profitPercent
        totalProfitAmount
        createdAt
      }
    }
  }
`;
