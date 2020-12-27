import React, { useState } from 'react';
import {
  Route, Switch, BrowserRouter, Link
} from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  MoneyCollectOutlined
} from '@ant-design/icons';
import Header from '../components/header';
import NewsPage from '../pages/news';
import { HeaderStyled, LayoutStyled } from './layout.styled';
import Homepage from '../pages/homepage';
import StockTradingSession from '../pages/stockTradingSession';
import HistoryStockTrading from '../pages/stockTradingSession/HistoryStockTrading';
import PersonalProperty from '../pages/personalProperty';

const { Content, Footer, Sider } = Layout;

const listMenu = [
  {
    to: '/news',
    pathName: 'news'
  },
  {
    to: '/stock-trading-session',
    pathName: 'stock-trading-session'
  }
];

export default function LayoutPage() {
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  const getActiveMenu = () => {
    const pathName = window.location.pathname.split('/');
    const currentPath = pathName[1];
    const menuIdx = listMenu.findIndex((menu) => menu.pathName === currentPath);
    return menuIdx ? `${menuIdx + 1}` : '1';
  };

  return (
    <LayoutStyled style={{ minHeight: '100vh' }}>
      <BrowserRouter>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={[getActiveMenu()]} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              <Link to='/news'>News</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              <Link to='/stock-trading-session'>Stock Owner Info</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<MoneyCollectOutlined />}>
              <Link to='/personal-property'>Personal Property</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
          <HeaderStyled className="site-layout-background">
            <Header />
          </HeaderStyled>
          <Content style={{ margin: '0 16px' }}>
            <Content>
              <Switch>
                <Route exact path='/' component={Homepage} />
                <Route exact path='/news' component={NewsPage} />
                <Route exact path='/stock-trading-session' component={StockTradingSession} />
                <Route exact path='/personal-property' component={PersonalProperty} />
                <Route exact path='/stock-trading-session/history/:tradingKey' component={HistoryStockTrading} />
              </Switch>
            </Content>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Stock News ©2020 Created by TDungIT</Footer>
        </Layout>
      </BrowserRouter>
    </LayoutStyled>
  );
}
