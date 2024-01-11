import "./CreateItem.css";

function EditItem(props) {
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
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, toCall, status, information, email, phone }),
    });
  };
  return (
    <form className="create-form" onSubmit={handleSubmit}>
      <label className="create-titles">
        Company Name:
        <input className="create-company" type="text" name="company" defaultValue={props.company} />
      </label>
      <label className="create-titles">
        Date:
        <input className="create-date" type="date" name="date" defaultValue={props.date} />
      </label>
      <label className="create-titles">
        Status:
        <select className="create-status" name="status" defaultValue={props.status}>
          <option value="yellow">Yellow</option>
          <option value="green">Green</option>
          <option value="red">Red</option>
        </select>
      </label>
      <label className="create-titles">
        Contact:
        <input className="contact" type="text" name="phone" defaultValue={props.phone} />
        <input className="contact" type="text" name="email" defaultValue={props.email} />
      </label>
      <label className="detail-title">
        Details:
        <textarea className="create-details" name="details" defaultValue={props.details} />
      </label>
      <input className="submit-button" type="submit" value="Submit" />
    </form>
  );
}

export default EditItem;
