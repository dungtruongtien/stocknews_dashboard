import React, { useEffect, useState } from 'react';
import Search from 'antd/lib/input/Search';
import { format } from 'date-fns';
import { useQuery } from '@apollo/react-hooks';
import { Pagination, Spin } from 'antd';
import {
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

const sortFields = [
  {
    value: 'createdDate',
    text: 'Created Date'
  },
  {
    value: 'publishedDate',
    text: 'Published Date'
  }
];

const sortTypes = [
  {
    value: 'DESC',
    text: 'DESC'
  },
  {
    value: 'ASC',
    text: 'ASC'
  }
];

export default function NewsPage() {
  const [sortField, setSortField] = useState('createdDate');
  const [sortType, setSortType] = useState('DESC');
  const [pageInfo, setPageInfo] = useState({ currentPage: 0, pageSize: 10, total: 0 });
  const {
    loading,
    data: stockNewsData = initNewsData,
    refetch: getNewsData
  } = useQuery(NEWS, {
    variables: {
      filter: { from: 0, size: 10 },
      sort: [{ [sortField]: sortType }]
    },
    fetchPolicy: 'no-cache'
  });

  useEffect(() => {
    if (stockNewsData.news) {
      const { news: { pageInfo: { currentPage, total } } } = stockNewsData;
      setPageInfo({ currentPage, total, pageSize: 10 });
    }
  }, [stockNewsData]);

  const { news: { data: newsData } } = stockNewsData;

  const onSortFieldChange = (value) => {
    setSortField(value);
    const { currentPage, pageSize } = pageInfo;
    getNewsData({
      filter: { from: (currentPage - 1) * pageSize, size: 10 },
      sort: [{ [value]: sortType }]
    });
  };

  const onSortTypeChange = (value) => {
    setSortType(value);
    const { currentPage, pageSize } = pageInfo;
    getNewsData({
      filter: { from: (currentPage - 1) * pageSize, size: 10 },
      sort: [{ [sortField]: value }]
    });
  };

  const onPageChange = (page, pageSize) => {
    getNewsData({
      filter: { from: (page - 1) * pageSize, size: 10 },
      sort: [{ [sortField]: sortType }]
    });
  };

  const onPageSearch = (searchValue) => {
    if (searchValue) {
      getNewsData({
        filter: {
          from: 0,
          size: 10,
          query: {
            bool: {
              should: [
                { match: { title: searchValue } },
                { match: { shortDescription: searchValue } },
                { match: { link: searchValue } }
              ]
            }
          }
        },
        sort: [{ [sortField]: sortType }]
      });
    }
  };

  return (
    <div>
      <FilterBar justify='center'>
        <FilterOption span={12}>
          <SelectComponent
            onChange={onSortFieldChange}
            style={{ fontSize: 12 }}
            defaultValue={'createdDate'}
            options={sortFields}
          />
          <SelectComponent
            options={sortTypes}
            defaultValue={'DESC'}
            onChange={onSortTypeChange}
            style={{ fontSize: 12 }}
          />
        </FilterOption>
        <SearchBar span={12}>
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onPageSearch}
          />
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
    </div>
  );
}
