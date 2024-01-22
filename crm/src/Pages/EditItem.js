import { useParams } from "react-router-dom";
import "./CreateItem.css";
import { useEffect, useState } from "react";

function EditItem({axiosJWT}) {
  const [company, setCompany] = useState({});
  const companyName = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const id = company.id;
    const name = data.get("company");
    const date = data.get("date");
    const toCall = new Date(date).toISOString().slice(0, 10);
    const status = data.get("status");
    const information = data.get("details");
    const email = data.get("email");
    const phone = data.get("phone");
    await axiosJWT.post(`http://localhost:${process.env.REACT_APP_PORT || 5000}/company/update`, {
      id: id,
      name: name,
      toCall: toCall,
      status: status,
      information: information,
      email: email,
      phone: phone,
    }, {
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
      },
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
      if (res.status === 200) {
        alert("Company updated");
      }
    });
  };

  const getCompany = async () => {
    const res = await axiosJWT.get(
      `http://localhost:${process.env.REACT_APP_PORT || 5000}/company/use/${companyName.company}`,
      {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
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
    <>
      <button>
        <a href={`/home`}>Go back</a>
      </button>
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
    </>
  );
}

export default EditItem;
