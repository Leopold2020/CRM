import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './Pages/Login.js';
import './Pages/Home.js';
const helmetContext = {};

function App() {
  return (
    <HelmetProvider context={helmetContext}>
    <BrowserRouter>
    <Links />
    <Routes>
      <Route index element={<Home />} />
      <Route path="" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<h2>404 Not Found</h2>} />
    </Routes>
  </BrowserRouter>
  </HelmetProvider>
  );
}

export default App;
