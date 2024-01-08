import "./EditItem.css";

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
    <form onSubmit={handleSubmit}>
      <label>
        Company Name:
        <input type="text" name="company" defaultValue={props.data.company} />
      </label>
      <label>
        Date:
        <input type="date" name="date" defaultValue={props.data.date} />
      </label>
      <label>
        Status:
        <select name="status" defaultValue={props.data.status}>
          <option value="yellow">Yellow</option>
          <option value="green">Green</option>
          <option value="red">Red</option>
        </select>
      </label>
      <label>
        Details:
        <textarea name="details" defaultValue={props.data.details} />
      </label>
      <label>
        Contact:
        <input type="text" name="phone" defaultValue={props.data.phone} />
        <input type="text" name="email" defaultValue={props.data.email} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default EditItem;
