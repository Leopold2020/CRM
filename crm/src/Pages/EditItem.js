import "./EditItem.css";

function EditItem(props) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const company = data.get("company");
    const date = data.get("date");
    const status = data.get("status");
    const details = data.get("details");
    const contact = data.get("contact");
    await fetch("http://localhost:5000/edit-item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ company, date, status, details, contact }),
    });
    return await response.json();
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
        <input type="text" name="contact" defaultValue={props.data.contact} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default EditItem;
