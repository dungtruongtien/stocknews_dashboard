import gql from 'graphql-tag';

export const PERSONAL_PROPERTY = gql`
  query personalPropertySession($filter: PersonalPropertyFilter!) {
    personalPropertySession(filter: $filter) {
      status
      message
      data {
        _id
        date
        price
        financialPlanning {
          targetPercent
          targetPrice
          actualResultMonthPercent
        }
      }
    }
}
`;
