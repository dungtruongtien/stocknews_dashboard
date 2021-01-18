import gql from 'graphql-tag';

export const PERSONAL_PROPERTY = gql`
  query personalPropertyAgg($filter: PersonalPropertyFilter!) {
    personalPropertyAgg(filter: $filter) {
      status
      message
      data {
        text
        price
      }
    }
}
`;
