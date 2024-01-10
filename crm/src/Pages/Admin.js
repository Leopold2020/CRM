import { useEffect, useState } from "react";
import AdminCompanies from "../Components/AdminCompanies";
import AdminAccounts from "../Components/AdminAccounts";

function Admin() {
  const [content, setContent] = useState([]);

  return (
    <div>
      <button
        onClick={() => {
          setContent(<AdminCompanies />);
        }}
      >
        Companies
      </button>
      <button
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
