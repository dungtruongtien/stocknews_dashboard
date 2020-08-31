import { Row, Col } from 'antd';
import styled from 'styled-components';


export const HeaderStyled = styled(Row)`
    /* padding: 1rem; */
`;

export const Logo = styled(Col)`
    img {
        border-radius: 50%;
    } 
`;

export const User = styled(Col)`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    div {
        margin-right: 1rem;
    }
`;
