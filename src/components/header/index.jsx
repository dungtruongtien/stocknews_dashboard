import React from 'react';
import { Avatar } from 'antd';
import { UserOutlined, BellOutlined } from '@ant-design/icons';
import { HeaderStyled, Logo, User } from './header.styled';

export default function Header() {
  return (
    <HeaderStyled>
      <Logo span={12}>
        <img src="logo.png" alt=""/>
      </Logo>
      <User span={12}>
        <div className='notification-icon'>
          <BellOutlined />
        </div>
        <div className='user-avatar'>
          <Avatar size={64} icon={<UserOutlined />} />
        </div>
      </User>
    </HeaderStyled>
  );
}
