import { useState, useEffect } from "react";
import Account from "./Account";

function AdminAccounts() {
  const [accounts, setAccounts] = useState([]);

  const getAccounts = async () => {
    const res = await fetch("http://localhost:5000/account/all", {
      method: "GET",
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  };

  useEffect(() => {
    getAccounts().then((res) => {
      setAccounts(res);
    });
  }, []);
  return (
    <ul>
      {accounts.map((account) => (
        <li>
          <Account data={account} />
        </li>
      ))}
    </ul>
  );
}

export default AdminAccounts;
