import React from 'react';
import { NewsHeader, NewsContent } from './news.styled';

export default function News({
  originLink = 'Source Link',
  createdDate = 'YYYY-MM-DD',
  link = 'News Link',
  title = '',
  shortDescription = 'News Short Description',
  image = 'https://via.placeholder.com/150'
}) {
  return (
    <div style={{ width: '100%' }}>
      <NewsHeader justify='center'>
        <a target="_blank" rel="noopener noreferrer" href={originLink}>Source: {originLink}</a>
        <p>Date Created: {createdDate}</p>
      </NewsHeader>
      <NewsContent>
        <div className='news-image'>
          <img src={image} width='150' height='150' alt='' />
        </div>
        <div>
          <a target="_blank" rel="noopener noreferrer" href={link}>{title}</a>
          <p>{shortDescription}</p>
        </div>
      </NewsContent>
    </div>
  );
}
