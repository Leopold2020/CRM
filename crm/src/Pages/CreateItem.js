import { useState } from "react";
import "./CreateItem.css";

function CreateItem() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [information, setInformation] = useState("");
  const [status, setStatus] = useState("");
  const [toCall, setToCall] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(
      `http://localhost:${process.env.REACT_APP_PORT || 5000}/company/create`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone,
          information: information,
          status: status,
          toCall: toCall,
        }),
      }
    ).then((res) => {
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
        alert("Company created");
      }
    });
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const handleInformationChange = (e) => {
    setInformation(e.target.value);
  };
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };
  const handleToCallChange = (e) => {
    const date = new Date(e.target.value).toISOString().slice(0, 10);
    setToCall(date);
  };
  return (
    <>
      <button className="back-but">
        <a className="back-but-text" href={`/home`}>Go back</a>
      </button>
      <form className="create-form" onSubmit={handleSubmit}>
        <label className="create-titles">
          Company Name:
          <input
            className="create-company"
            type="text"
            name="company"
            onChange={handleNameChange}
          />
        </label>
        <label className="create-titles">
          Date:
          <input
            className="create-date"
            type="date"
            name="date"
            onChange={handleToCallChange}
          />
        </label>
        <label className="create-titles">
          Status:
          <select
            className="create-status"
            name="status"
            onChange={handleStatusChange}
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
            placeholder="Phone number"
            onChange={handlePhoneChange}
          />
          <input
            className="contact"
            type="text"
            name="email"
            placeholder="Email"
            onChange={handleEmailChange}
          />
        </label>
        <label className="detail-title">
          Details:
          <textarea
            className="create-details"
            name="details"
            onChange={handleInformationChange}
          />
        </label>
        <input className="submit-button" type="submit" value="Submit" />
      </form>
    </>
  );
}

export default CreateItem;
