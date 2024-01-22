import React, { useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./App.css";
import "./Pages/Login.js";
import "./Pages/Home.js";
import Login from "./Pages/Login.js";
import Home from "./Pages/Home.js";
import Header from "./Components/Header.js";
import AdminHeader from "./Components/AdminHeader.js";
import CreateItem from "./Pages/CreateItem.js";
import EditItem from "./Pages/EditItem.js";
import Admin from "./Pages/Admin.js";
import CreateAccount from "./Pages/CreateAccount.js";
import Footer from "./Components/Footer.js";
import EditAccount from "./Pages/EditAccount.js";
import ItemDetails from "./Pages/ItemDetails.js";
const helmetContext = {};

function App() {
  const [user, setUser] = React.useState();

  function changeUser(input) {
    setUser(input);
  }

  useEffect(() => {
    setUser(sessionStorage.getItem("role"));
  }, []);

  return (
    <HelmetProvider context={helmetContext}>
      <BrowserRouter>
        <div className="page">
          {user === "employee" ? (
            <Header />
          ) : user === "admin" ? (
            <AdminHeader />
          ) : null}
          {/* {navbar} */}
          <Routes>
            <Route index element={<Login changeUser={changeUser} />} />
            <Route path="login" element={<Login changeUser={changeUser} />} />
            <Route path="home" element={<Home />} />
            <Route path="company/edit/:company" element={<EditItem />} />
            <Route path="account/edit/:account" element={<EditAccount />} />
            <Route path="create-item" element={<CreateItem />} />
            <Route path="admin" element={<Admin />} />
            <Route path="company/:company" element={<ItemDetails />} />
            <Route path="*" element={<h2>404 Not Found</h2>} />
            <Route path="create-account" element={<CreateAccount />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
