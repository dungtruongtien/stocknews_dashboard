import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import HomePage from './pages/homepage';
import Header from './components/header';

function App() {
  return (
    <>
      <Header />
      <HomePage />
    </>
  );
}

export default App;
