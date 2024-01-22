import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
      <button>
        <a href={`/home`}>Go back</a>
      </button>
      <p>Company Details</p>
      <p>{company.name}</p>
      <p>{company.tocall.split("T")[0]}</p>
      <p>{company.status}</p>
      <p>{company.information}</p>
      <div>
        <p>{company.phone}</p>
        <p>{company.email}</p>
      </div>
    </div>
  );
}

export default ItemDetails;
