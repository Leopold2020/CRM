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

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:5000/account/delete`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    if (res.status === 200) {
      alert("Account deleted");
      window.location.reload();
    } else {
      alert("Something went wrong");
    }
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
          <p>{account.username}</p>
          <p>{account.email}</p>
          <p>{account.role}</p>
          <div className="acc-button">
            <a className="account-edit" href={`/edit/${account.username}`}>
              Edit
            </a>
            <button
              className="acc-del"
              onClick={() => {
                handleDelete(account.id);
              }}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </div>
  );
}

export default AdminAccounts;
