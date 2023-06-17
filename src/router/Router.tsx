import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from 'pages/HomePage';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />{' '}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
