import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./ItemDetails.css";

function ItemDetails() {
  const companyName = useParams().company;
  const [company, setCompany] = useState("");

  const getCompany = async () => {
    const res = await fetch(
      `http://localhost:${
        process.env.REACT_APP_PORT || 5000
      }/company/use/${companyName}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    setCompany(data);
  };

  useEffect(() => {
    getCompany();
  }, []);
  return (
    <div>
      <button className="back-but">
        <a className="back-but-text" href={`/home`}>Go back</a>
      </button>
      <div className="details-div">
      <p className="details-title">Company Details</p>
      <p className="details-comp-name">{company.name}</p>
      <p>{company.date}</p>
      <p>Status: {company.status}</p>
      <div>
        <p>Company Phone Number: {company.phone}</p>
        <p>Company Email: {company.email}</p>
      </div>
        <div className="info-div">
          <p>{company.information}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemDetails;
