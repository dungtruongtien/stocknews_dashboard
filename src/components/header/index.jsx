import React from 'react';
import { Avatar } from 'antd';
import { UserOutlined, BellOutlined } from '@ant-design/icons';
import { HeaderStyled, User } from './header.styled';

export default function Header() {
  return (
    <HeaderStyled justify='flex-end' align='center'>
      <User span={24}>
        <div className='notification-icon'>
          <BellOutlined />
        </div>
        <div className='user-avatar'>
          <Avatar size={32} icon={<UserOutlined />} />
        </div>
      </User>
    </HeaderStyled>
  );
}
