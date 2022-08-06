import React from 'react';
import {
  Redirect
} from 'react-router-dom';

export default function Homepage() {
  return <Redirect to="/stock-trading" />;
}
