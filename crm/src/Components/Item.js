import "./Item.css";

function Item(props) {
  return (
    <>
        <div className="dropdown">
          <div className="company-name">{props.data.company}</div>
          <div className="dropdown-content">
          <div className="desc">{props.data.details}</div>
          <div className="desc">{props.data.contact}</div>
          </div>
        </div>
        
      <div className="date">{props.data.date}</div>
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
      <div className="details">{props.data.details}</div>
      <div className="contact">{props.data.contact}</div>


    </>
  );
}

export default Item;
