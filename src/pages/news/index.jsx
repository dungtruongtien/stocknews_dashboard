import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { AutoComplete, Input } from 'antd';
import { HomePageStyled, FilterBar, FilterOption, SearchBar, NewsWrapper, NewsItems } from './news.styled';
import SelectComponent from '../../components/select';
import News from '../../components/news';
import { NEWS } from '../../services/news.service';

export default function NewsPage() {
  const { loading, error, data: stockNewsData = { news: { data: [] } } } = useQuery(NEWS);
  console.log('stockNewsData---------', stockNewsData && stockNewsData.news.data);
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
        {stockNewsData.news.data.map((news, idx) => {
          const { link, title, createdDate } = news;
          return (<NewsItems key={idx} span={11}>
            <News createdDate={createdDate} link={link} title={title} />
          </NewsItems>);
        })}
      </NewsWrapper>
    </HomePageStyled>
  );
}
