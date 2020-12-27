import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import { startOfDay, endOfDay, subDays, format } from 'date-fns';
import HighchartsReact from 'highcharts-react-official';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { PERSONAL_PROPERTY } from '../../services/personnalProperty.service';

const ChartWrapper = styled.div`
  padding: 1rem;
  margin: auto;
  width: 1024px;
`;

const defaultPersonalProperty = { personalPropertySession: { data: [] } };
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
  const { data: personalProperty = defaultPersonalProperty, loading, error } = useQuery(PERSONAL_PROPERTY, {
    variables: {
      filter: {
        fromDate: subDays(startOfDay(new Date()), 30),
        endDate: endOfDay(new Date())
      }
    }
  });
  useEffect(() => {
    const { personalPropertySession: { data: propertyData } } = personalProperty;
    setChartOption({
      ...chartOptions,
      xAxis: {
        categories: propertyData.map(property => format(new Date(property.date), 'MM-dd'))
      },
      series: [
        {
          name: '',
          data: propertyData.map(property => property.price)
        }
      ]
    });
  }, [personalProperty]);
  return (
    <ChartWrapper>
      <HighchartsReact
        containerProps = {{ className: 'chart-container' }}
        highcharts={Highcharts}
        options={chartOptions}
      />
    </ChartWrapper>
  );
}
