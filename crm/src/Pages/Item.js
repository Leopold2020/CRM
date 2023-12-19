import "./Item.css";
import { useNavigate, useLocation } from "react-router-dom";

function Item() {
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state.item;

  return (
    <>
      <div className="company-name">{item.data.company}</div>
      <div className="date">{item.data.date}</div>
      <div
        className="status"
        id="circle"
        style={{
          backgroundColor:
            item.data.status[0] === "yellow"
              ? "yellow"
              : item.data.status[0] === "green"
              ? "green"
              : item.data.status[0] === "red"
              ? "red"
              : "white",
        }}
      />
      <div className="details">{item.data.details}</div>
      <div className="contact">{item.data.contact}</div>
      <button className="back-button" onClick={navigate("/home")}>
        Back
      </button>
    </>
  );
}

export default Item;
