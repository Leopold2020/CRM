import { useState, useEffect } from "react";
import "./AdminAccounts.css";

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
    <div className="admn-acc-ul">
      {accounts.map((account) => (
        <li className="account-content">
            <div>{account.username}</div>
            <div>{account.email}</div>
            <div>{account.role}</div>
            <div className="acc-button">
              <a className="account-edit" href={`/edit/${account.username}`}>Edit</a>
            <button className='acc-del'>Delete</button>
            </div>
        </li>
      ))}
    </div>
  );
}

export default AdminAccounts;
