import { useState } from "react";
import AdminCompanies from "../Components/AdminCompanies";
import AdminAccounts from "../Components/AdminAccounts";
import "./Admin.css";

function Admin() {
  const [content, setContent] = useState([]);
  const [choice, setChoice] = useState("");

  function choiceHandler(input) {
    setChoice(input);
  }

  return (
    // <div className="admin-form">

    //   <button onClick={() => {choiceHandler("companies")}}>companies</button>
    //   <button onClick={() => {choiceHandler("accounts")}}>accounts</button>
    //   <button onClick={console.log("test")}>test</button>

    //   {choice === "companies" ? (
    //     <AdminCompanies />
    //   ) : choice === "accounts" ? (
    //     <AdminAccounts />
    //   ) : null}
    // </div>
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
