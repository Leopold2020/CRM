import { useState, useEffect } from "react";
import "./AdminAccounts.css";

function AdminAccounts() {
  const [accounts, setAccounts] = useState([]);

  const getAccounts = async () => {
    const res = await fetch(
      `http://localhost:${process.env.REACT_APP_PORT || 5000}/account/all`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      }
    );
    return await res.json();
  };

  const handleDelete = async (id) => {
    const res = await fetch(
      `http://localhost:${process.env.REACT_APP_PORT || 5000}/account/delete`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      }
    );
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
        <li className="account-content" key={account.id}>
          <div>{account.username}</div>
          <div>{account.email}</div>
          <div>{account.role}</div>
          <div className="acc-button">
            <button className="account-edit">
              <a
                className="edit-text"
                href={`account/edit/${account.username}`}
              >
                Edit
              </a>
            </button>
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
