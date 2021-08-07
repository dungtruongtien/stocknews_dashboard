import gql from 'graphql-tag';

export const BINACE_COIN_PROFILE_SUBSCRIPTION = gql`
  subscription binanceCoinProfile {
    binanceCoinProfile {
      streamName
      price
    }
}`;


export const GET_LIST_COINS = gql`
query coins {
  coins {
    _id
    name
    costPrice
    currentPrice
    totalCostPrice
    abbreviations
  }
}`;
