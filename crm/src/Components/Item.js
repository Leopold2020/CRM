import "./Item.css";
import EditItem from "../Pages/EditItem";

function Item(props) {
  return (
    <>
      <div className="dropdown">
        <div className="company-name">{props.data.company}</div>
        <div className="dropdown-content">
          <div className="desc">{props.data.information}</div>
          <div className="desc">{props.data.phone}</div>
          <div className="desc">{props.data.email}</div>
          <EditItem data={props.data} />
        </div>
      </div>

      <div className="date">{props.data.toCall}</div>
      <div
        className="status"
        id="circle"
        style={{
          backgroundColor:
            props.data.status[0] === "yellow"
              ? "yellow"
              : props.data.status[0] === "green"
              ? "green"
              : props.data.status[0] === "red"
              ? "red"
              : "white",
        }}
      />
      <div className="details">{props.data.information}</div>
      <div className="contact">{props.data.phone}</div>
      <div className="contact">{props.data.email}</div>
    </>
  );
}

export default Item;
