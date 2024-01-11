import "./CreateItem.css";

function CreateItem() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const name = data.get("company");
    const date = data.get("date");
    const toCall = new Date(date).toISOString().slice(0, 10);
    const status = data.get("status");
    const information = data.get("details");
    const phone = data.get("phone");
    const email = data.get("email");
    await fetch("http://localhost:5000/company/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone, information, status, toCall }),
    });
  };
  return (
    <>
      <form className="create-form" onSubmit={handleSubmit}>
        <label className="create-titles">
          Company Name:
          <input className="create-company" type="text" name="company" />
        </label>
        <label className="create-titles">
          Date:
          <input className="create-date" type="date" name="date" />
        </label>
        <label className="create-titles">
          Status:
          <select className="create-status" name="status">
            <option value="yellow">Yellow</option>
            <option value="green">Green</option>
            <option value="red">Red</option>
          </select>
        </label>
        <label className="create-titles">
          Contact:
          <input className="contact" type="text" name="phone" placeholder="Phone number" />
          <input className="contact" type="text" name="email" placeholder="Email" />
        </label>
        <label className="detail-title">
          Details:
          <textarea className="create-details" name="details" />
        </label>
        <input className="submit-button" type="submit" value="Submit" />
      </form>
    </>
  );
}

export default CreateItem;
