import React from 'react';
import { AutoComplete, Input } from 'antd';
import { HomePageStyled, FilterBar, FilterOption, SearchBar, NewsWrapper, NewsItems } from './homepage.styled';
import SelectComponent from '../../components/select';
import News from '../../components/news';

export default function HomePage() {
  return (
    <HomePageStyled>
      <FilterBar
        justify='center'
      >
        <FilterOption span={12}>
          <div>
            <SelectComponent />
          </div>
          <div>
            <SelectComponent />
          </div>
          <div>
            <SelectComponent />
          </div>
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
        <NewsItems span={11}>
          <News />
        </NewsItems>
        <NewsItems span={11}>
          <News />
        </NewsItems>
        <NewsItems span={11}>
          <News />
        </NewsItems>
        <NewsItems span={11}>
          <News />
        </NewsItems>
      </NewsWrapper>
    </HomePageStyled>
  );
}
