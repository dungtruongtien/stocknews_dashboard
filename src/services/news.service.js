import gql from 'graphql-tag';

export const NEWS = gql`
    query news {
        news {
            status
            message
            data {
                link
                title   
                shortDescription
                originLink
                createdDate
            }
        }
    }
`;
