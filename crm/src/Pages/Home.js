import "./Home.css";
import useNavigate from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const getDate = async () => {
    await fetch("http://localhost:5000/get-date", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  };
  const date = getDate();

  const getList = async () => {
    await fetch("http://localhost:5000/get-list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date: date }),
    });
    return await response.json();
  };
  const list = getList();

  return (
    <>
      <div classname="navbar" />
      <p classname="date">{date}</p>
      <p classname="list-title">Today's business:</p>
      <ul>
        {list.map((item) => (
          <li classname="list-item">
            <button classname="item-details" onClick={navigate("/item")}>
              {item.data.company}
            </button>
            <div
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
            <button classname="admin-button" onClick={navigate("/edit-item")}>
              Edit
            </button>
          </li>
        ))}
      </ul>
      <ul classname="footer">
        <li classname="footer-item">stuff</li>
      </ul>
    </>
  );
}

export default Home;
