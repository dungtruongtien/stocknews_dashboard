import styled from 'styled-components';
import { Layout } from 'antd';

const { Header, Sider } = Layout;

export const HeaderStyled = styled(Header)`
  padding: 0 1rem;
`;

export const LayoutStyled = styled(Layout)`
  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }

  .site-layout .site-layout-background {
    background: #fff;
  }
`;


export const SiderStyled = styled(Sider)`
  background: #31373c;
`;
