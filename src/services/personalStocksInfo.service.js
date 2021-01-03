import gql from 'graphql-tag';

export const GET_STOCK_TRADING_SESSIONS = gql`
  query stockTradingSessions($filter: StockTradingSessionsFilter){
    stockTradingSessions(filter: $filter) {
      status
      message
      pageInfo {
        total
        currentPage
      }
      data {
        _id
        stock
        createdAt
        status
        tradingKey
        profitAmount
        profitPercent
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
        createdAt
        updatedAt
      }
    }
  }
`;
