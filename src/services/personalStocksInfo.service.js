import gql from 'graphql-tag';

export const GET_STOCK_TRADING_SESSIONS = gql`
  query stockTrading($filter: StockTradingFilterInput, $limit: Int, $offset: Int) {
    stockTrading(filter: $filter, limit: $limit, offset: $offset) {
      status
      message
      total
      data {
        _id
        stockName
        investDate
      }
    }
  }
`;

export const STOCK_HISTORY = gql`
  query stockHistory($tradingKey: String!, $filter: StockTradingHistoryOptionsInput) {
    stockHistory(tradingKey: $tradingKey, filter: $filter) {
      status
      message
      pageInfo {
        total
        currentPage
      }
      data {
        _id
        tradingKey
        stock
        action
        status
        tradingTax
        totalStockTradeAmount
        stockTradeAmount
        stockTradePrice
        stockTotalTradePrice
        closingPrice
        stockTotalClosingPrice
        profitPercent
        profitAmount
        paperProfitAmount
        paperProfitPercent
        createdAt
        updatedAt
      }
    }
  }
`;
