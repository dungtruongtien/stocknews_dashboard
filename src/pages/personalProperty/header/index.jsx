import React from 'react';
import SelectComponent from '../../../components/select';
import { HeaderStyled } from './header.styled';

const options = [
  {
    value: 'date',
    text: 'Agg by Date'
  },
  {
    value: 'month',
    text: 'Agg by Month'
  }
];

export default function PersonalPropertyHeader({ changeAggType }) {
  return (
    <HeaderStyled>
      <SelectComponent onChange={changeAggType} style={{ width: 'auto' }} defaultValue='date' options={options} />
    </HeaderStyled>
  );
}
