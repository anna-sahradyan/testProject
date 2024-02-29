import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import HeaderComponent from './components/header/HeaderComponent';
import FilterComponent from './page/search/FilterComponent';
import Auth from './page/Auth/Auth'

const App = () => {
  return (
    <>
      <HeaderComponent />
      <Toaster />
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/auth'} element={<Auth />} />
        <Route path={'/filter'} element={<FilterComponent />} />
      </Routes>
    </>
  );
};

export default App;
