import React, { useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./Pages/Login.js";
import "./Pages/Home.js";
import Login from "./Pages/Login.js";
import Home from "./Pages/Home.js";
import Header from "./Components/Header.js";
import AdminHeader from "./Components/AdminHeader.js";
import CreateItem from "./Pages/CreateItem.js";
import EditItem from "./Pages/EditItem.js";
import Admin from "./Pages/Admin.js";
const helmetContext = {};

function App() {
  const [user, setUser] = React.useState();

  useEffect(() => {
    setUser(sessionStorage.getItem("role"));
  }, []);

  return (
    <HelmetProvider context={helmetContext}>
      <BrowserRouter>
        {user === 'employee' ? (
          <Header />
        ) : user === 'admin' ? (
          <AdminHeader />
        ) : null}
        {/* {navbar} */}
        <Routes>
          <Route index element={<Login setUser={setUser} />} />
          <Route path="login" element={<Login setUser={setUser} />} />
          <Route path="home" element={<Home />} />
          <Route path="edit/:company" element={<EditItem />} />
          <Route path="create-item" element={<CreateItem />} />
          <Route path="admin" element={<Admin />} />
          <Route path="*" element={<h2>404 Not Found</h2>} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
