/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { Row, Col } from 'antd';

export const HomePageStyled = styled.div`

`;

export const FilterBar = styled(Row)`
    padding: 1rem;
`;

export const FilterOption = styled(Col)`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    div {
        margin-right: 1rem;
    }
`;

export const SearchBar = styled(Col)`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

export const NewsWrapper = styled(Row)`
    padding: 1rem;
`;

export const NewsItems = styled(Col)`
    margin-bottom: 2rem;
    border: 1px solid #e4e1e1;
    padding: 1rem;
`;
