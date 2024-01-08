import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Item from "../Components/Item";

function Home() {
  const [search, setSearch] = useState("");
  const [list, setList] = useState([]);

  const date = new Date().toDateString();

  const navigate = useNavigate();

  const getList = async () => {
    await fetch("http://localhost:5000/company/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  setList(getList());

  // const handleSearch = async () => {}
  //   await fetch("http://localhost:5000/search", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ search: search }),
  //   });
  //   return await response.json();
  // };

  const handleTyping = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div classname="navbar" />
      <p classname="date">{date}</p>
      <input
        classname="search-bar"
        type="text"
        onChange={handleTyping}
        placeholder="Search"
      />
      <button classname="search-button" /*onClick={handleSearch}*/>
        Search
      </button>
      <button className="create-button" onClick={navigate("/create-item")}>
        Create New Customer
      </button>
      <p classname="list-title">Today's business:</p>
      <ul>
        {list.length > 0 ? (
          list.map((item) => (
            <li classname="list-item">
              <div classname="item-name">
                {item.data.company}
                <Item data={item.data} />
              </div>
              <div
                classname="status"
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
          ))
        ) : (
          <li classname="list-item">No items</li>
        )}
      </ul>
      <ul classname="footer">
        <li classname="footer-item">stuff</li>
      </ul>
    </>
  );
}

export default Home;
