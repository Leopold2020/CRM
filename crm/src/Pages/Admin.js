import { useState } from "react";
import AdminCompanies from "../Components/AdminCompanies";
import AdminAccounts from "../Components/AdminAccounts";
import "./Admin.css";

function Admin({axiosJWT}) {
  const [content, setContent] = useState([]);
  const [choice, setChoice] = useState("");

  function choiceHandler(input) {
    setChoice(input);
  }

  return (
    <div className="admin-form">
      <button
        className="CompanyButton"
        onClick={() => {
          setContent(<AdminCompanies axiosJWT={axiosJWT} />);
        }}
      >
        Companies
      </button>
      <button
        className="AccountButton"
        onClick={() => {
          setContent(<AdminAccounts axiosJWT={axiosJWT} />);
        }}
      >
        Accounts
      </button>
      {content}
    </div>
  );
}

export default Admin;
