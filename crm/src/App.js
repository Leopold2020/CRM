import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./Pages/Login.js";
import Home from "./Pages/Home.js";

function App() {
  return (
    <BrowserRouter>
      <Links />
      <Routes>
        <Route index element={<Home />} />
        <Route path="" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<h2>404 Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
