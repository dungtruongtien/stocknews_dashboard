import gql from 'graphql-tag';

export const NEWS = gql`
    query news($filter: StockNewsFilter, $sort: [StockNewsSort]) {
        news(filter: $filter, sort: $sort) {
            status
            message
            pageInfo {
                total
                currentPage
            }
            data {
                link
                title   
                shortDescription
                originLink
                createdDate
                image
                publishedDate
            }
        }
    }
`;
