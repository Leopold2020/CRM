import { useEffect, useState } from "react";
import AdminCompanies from "../Components/AdminCompanies";
import AdminAccounts from "../Components/AdminAccounts";
import "./Admin.css";

function Admin() {
  const [content, setContent] = useState([]);

  return (
    <div className="admin-form">
      <button
      className="CompanyButton"
        onClick={() => {
          setContent(<AdminCompanies />);
        }}
      >
        Companies
      </button>
      <button
      className="AccountButton"
        onClick={() => {
          setContent(<AdminAccounts />);
        }}
      >
        Accounts
      </button>
      {content}
    </div>
  );
}

export default Admin;
