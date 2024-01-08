import "./EditItem.css";

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
        <label>
          Company Name:
          <input type="text" name="company" />
        </label>
        <label>
          Date:
          <input type="date" name="date" />
        </label>
        <label>
          Status:
          <select name="status">
            <option value="yellow">Yellow</option>
            <option value="green">Green</option>
            <option value="red">Red</option>
          </select>
        </label>
        <label>
          Details:
          <textarea name="details" />
        </label>
        <label>
          Contact:
          <input type="text" name="phone" placeholder="Phone number" />
          <input type="text" name="email" placeholder="Email" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}

export default CreateItem;
