import gql from 'graphql-tag';

export const NEWS = gql`
    query news($from: Int, $size: Int) {
        news(from: $from, size: $size) {
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
            }
        }
    }
`;
