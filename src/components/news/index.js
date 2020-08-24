import React from 'react';
import { NewsHeader, NewsContent } from './news.styled';

export default function News({
  source = 'Source Link',
  createdDate = 'YYYY-MM-DD',
  link = 'News Link',
  title = '',
  shortDescription = 'News Short Description',
  img = 'https://via.placeholder.com/150'
}) {
  return (
    <div style={{ width: '100%' }}>
      <NewsHeader justify='center'>
        <p>Source: {source}</p>
        <p>Date Created: {createdDate}</p>
      </NewsHeader>
      <NewsContent>
        <div className='news-image'>
          <img src={img} alt='' />
        </div>
        <div>
          <a href={link}>{title}</a>
          <p>{shortDescription}</p>
        </div>
      </NewsContent>
    </div>
  );
}
