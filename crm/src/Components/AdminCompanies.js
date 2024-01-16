import { useEffect, useState } from "react";
import Item from "../Components/Item";

function AdminCompanies() {
  const [company, setCompany] = useState([]);

  const getCompanies = async () => {
    const response = await fetch("http://localhost:5000/company/filter", {
      method: "POST",
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "",
      }),
    });

    const res = await response.json();
    if (res.status === 401) {
      alert("Unauthorized");
      return [];
    }
    if (res.status === 403) {
      alert("Forbidden");
      return [];
    }
    if (res === undefined) {
      alert("You need to login first");
      return [];
    } else {
      return res;
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:5000/company/delete`, {
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
      alert("Company deleted");
      window.location.reload();
    } else {
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    getCompanies().then((res) => {
      setCompany(res);
    });
  }, []);

  return (
    <ul>
      {company !== undefined ? (
        company.map((comp) => (
          <li key={comp.id}>
            <Item data={comp} />
            <div className="company-edit">
              <a href={`/edit/${comp.name}`}>Edit</a>
              <button
                className="company-del"
                onClick={() => {
                  handleDelete(comp.id);
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))
      ) : (
        <div>Nothing to show</div>
      )}
    </ul>
  );
}

export default AdminCompanies;
