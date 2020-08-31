import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const defaultStyle = { width: 120 };

export default function SelectComponent({ defaultValue, style = {}, options = [], onChange }) {
  return (
    <Select onChange={onChange} defaultValue={defaultValue} style={{ ...defaultStyle, ...style }}>
      {/* <Option value='none'>-- Select</Option> */}
      {options.map((option, idx) => {
        return (<Option key={idx} value={option.value}>{option.text}</Option>);
      })}
    </Select>
  );
}
