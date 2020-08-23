import React from 'react';
import { NewsHeader, NewsContent } from './news.styled';

export default function News() {
  return (
    <div style={{ width: '100%' }}>
      <NewsHeader justify='center'>
        <p>Source: aaaaaaaa</p>
        <p>Date Created: bbbbbb</p>
      </NewsHeader>
      <NewsContent>
        <div className='news-image'>
          <img src='https://via.placeholder.com/150' alt='' />
        </div>
        <div>
          <p>Link</p>
          <p>Short Description</p>
        </div>
      </NewsContent>
    </div>
  );
}
