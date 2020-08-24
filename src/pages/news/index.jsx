import React, { useEffect } from 'react';
import { format } from 'date-fns';
import { useLazyQuery } from '@apollo/react-hooks';
import { AutoComplete, Input, Pagination, Spin } from 'antd';
import { HomePageStyled,
  FilterBar,
  FilterOption,
  SearchBar,
  NewsWrapper,
  NewsItems,
  PaginationWrapper
} from './news.styled';
import SelectComponent from '../../components/select';
import News from '../../components/news';
import { NEWS } from '../../services/news.service';

const initNewsData = {
  news: {
    pageInfo: {
      total: 0,
      currentPage: 1
    },
    data: []
  }
};

export default function NewsPage() {
  const [
    getNewsData,
    { loading, error, data: stockNewsData = initNewsData }
  ] = useLazyQuery(NEWS, { fetchPolicy: 'no-cache' });
  const { news: { pageInfo, data: newsData } } = stockNewsData;
  useEffect(() => {
    async function fetchNewsData() {
      getNewsData({
        variables: { from: 0, size: 10 }
      });
    }
    fetchNewsData();
  }, []);

  const onPageChange = (page, pageSize) => {
    getNewsData({
      variables: { from: (page - 1) * pageSize, size: 10 }
    });
  };

  return (
    <HomePageStyled>
      <FilterBar justify='center'>
        <FilterOption span={12}>
          <div><SelectComponent /></div>
          <div><SelectComponent /></div>
          <div><SelectComponent /></div>
        </FilterOption>
        <SearchBar span={12}>
          <AutoComplete
            dropdownMatchSelectWidth={252}
            style={{
              width: 500
            }}
          >
            <Input.Search size="large" placeholder="Search Here" enterButton />
          </AutoComplete>
        </SearchBar>
      </FilterBar>
      <NewsWrapper justify='space-between'>
        {loading && <div className="example">
          <Spin />
        </div>}
        {newsData.map((news, idx) => {
          const { link, title, createdDate, image, originLink, shortDescription } = news;
          const formattedCreatedDate = format(new Date(createdDate), 'yyyy-MM-dd');
          return (<NewsItems key={idx} span={11}>
            <News
              image={image}
              createdDate={formattedCreatedDate}
              originLink={originLink}
              shortDescription={shortDescription}
              link={link}
              title={title}
            />
          </NewsItems>);
        })}
      </NewsWrapper>
      <PaginationWrapper>
        <Pagination onChange={onPageChange} defaultCurrent={1} current={pageInfo.currentPage} total={pageInfo.total} />
      </PaginationWrapper>
    </HomePageStyled>
  );
}
