import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { PERSONAL_PROPERTY } from '../../services/personnalProperty.service';
import PersonalPropertyHeader from './header';

const ChartWrapper = styled.div`
  padding: 1rem;
  width: 1024px;
`;

const defaultPersonalProperty = { personalPropertyAgg: { data: [] } };
const chartOptionsDefault = {
  chart: {
    type: 'line'
  },
  title: {
    text: 'Tài sản cá nhân'
  },
  xAxis: {
    categories: []
  },
  yAxis: {
    title: {
      text: null
    }
  },
  credits: {
    enabled: false
  },
  legend: {
    enabled: false
  },
  plotOptions: {
    line: {
      dataLabels: {
        enabled: false
      },
      enableMouseTracking: true
    }
  },
  series: [{
    name: '',
    data: []
  }]
};

export default function PersonalProperty() {
  const [chartOptions, setChartOption] = useState(chartOptionsDefault);
  const { data: personalProperty = defaultPersonalProperty, refetch } = useQuery(PERSONAL_PROPERTY, {
    variables: {
      filter: { aggType: 'DATE' }
    }
  });
  useEffect(() => {
    const { personalPropertyAgg: { data: propertyData } } = personalProperty;
    console.log('propertyData------', propertyData);
    setChartOption({
      ...chartOptions,
      xAxis: {
        categories: propertyData.map(property => property.text)
      },
      series: [
        {
          name: '',
          data: propertyData.map(property => property.price)
        }
      ]
    });
  }, [personalProperty]);

  const changeAggType = (value) => {
    console.log('value-----', value);
    refetch({
      filter: { aggType: value.toUpperCase() }
    });
  };

  return (
    <>
      <PersonalPropertyHeader changeAggType={changeAggType} />
      <ChartWrapper>
        <HighchartsReact
          containerProps={{ className: 'chart-container' }}
          highcharts={Highcharts}
          options={chartOptions}
        />
      </ChartWrapper>
    </>
  );
}
