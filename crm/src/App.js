import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './Pages/Login.js';
import './Pages/Home.js';
const helmetContext = {};
import Login from './Pages/Login.js';
import Home from './Pages/Home.js';
import Header from './Components/Header.js';
import Item from './Pages/Item.js';
import EditItem from './EditItem.js';

function App() {
  return (
    <HelmetProvider context={helmetContext}>
    <BrowserRouter>
    <Header />
    <Routes>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="item" element={<Item />} />
      <Route path="edit-item" element={<EditItem />} />
      <Route path="*" element={<h2>404 Not Found</h2>} />
    </Routes>
  </BrowserRouter>
  </HelmetProvider>
  );
}

export default App;
