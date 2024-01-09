import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./Pages/Login.js";
import "./Pages/Home.js";
import Login from "./Pages/Login.js";
import Home from "./Pages/Home.js";
import Header from "./Components/Header.js";
import CreateItem from "./Pages/CreateItem.js";
import EditItem from "./Pages/EditItem.js";
const helmetContext = {};

function App() {
  return (
    <HelmetProvider context={helmetContext}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="edit/:company" element={<EditItem />} />
          <Route path="create-item" element={<CreateItem />} />
          <Route path="*" element={<h2>404 Not Found</h2>} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
