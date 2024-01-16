import { useParams } from "react-router-dom";
import "./CreateItem.css";
import { useEffect, useState } from "react";

function EditItem() {
  const [company, setCompany] = useState({});
  const companyName = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const name = data.get("company");
    const date = data.get("date");
    const toCall = new Date(date).toISOString().slice(0, 10);
    const status = data.get("status");
    const information = data.get("details");
    const email = data.get("email");
    const phone = data.get("phone");
    await fetch("http://localhost:5000/company/update", {
      method: "POST",
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ name, toCall, status, information, email, phone }),
    }).then((res) => {
      if (res.status === 401) {
        alert("Unauthorized");
      }
      if (res.status === 403) {
        alert("Forbidden");
      }
      if (res === undefined) {
        alert("You need to login first");
      }
    });
  };

  const getCompany = async () => {
    const res = await fetch(
      `http://localhost:5000/company/use/${companyName.company}`,
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

  useEffect(() => {
    getCompany().then((res) => {
      setCompany(res);
    });
  }, []);

  return (
    <form className="create-form" onSubmit={handleSubmit}>
      <label className="create-titles">
        Company Name:
        <input
          className="create-company"
          type="text"
          name="company"
          defaultValue={company.name}
        />
      </label>
      <label className="create-titles">
        Date:
        <input
          className="create-date"
          type="date"
          name="date"
          defaultValue={company.toCall}
        />
      </label>
      <label className="create-titles">
        Status:
        <select
          className="create-status"
          name="status"
          defaultValue={company.status}
        >
          <option value="yellow">Yellow</option>
          <option value="green">Green</option>
          <option value="red">Red</option>
        </select>
      </label>
      <label className="create-titles">
        Contact:
        <input
          className="contact"
          type="number"
          name="phone"
          defaultValue={company.phone}
        />
        <input
          className="contact"
          type="text"
          name="email"
          defaultValue={company.email}
        />
      </label>
      <label className="detail-title">
        Details:
        <textarea
          className="create-details"
          name="details"
          defaultValue={company.information}
        />
      </label>
      <input className="submit-button" type="submit" value="Submit" />
    </form>
  );
}

export default EditItem;
