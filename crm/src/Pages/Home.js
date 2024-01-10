import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Item from "../Components/Item";
import search_icon from "../Assets/search.png";

function Home() {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  const date = new Date().toDateString();
  const navigate = useNavigate();

  const filterCompany = async () => {
    try {
      const filter = await fetch("http://localhost:5000/company/filter", {
        method: "POST",
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: search,
        }),
      });

      if (filter.status === 200) {
        const res = await filter.json();
        if (res.status === 401) {
          alert("Unauthorized");
          return [];
        }
        if (res.status === 403) {
          alert("Forbidden");
          return [];
        }
        if (res === undefined) {
          alert("You need to login first");
          return [];
        } else {
          return res;
        }
      } else {
        alert("You need to login first");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTyping = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
  };

  const handleSearch = async () => {
    const filteredList = await filterCompany(search);
    setFiltered(filteredList);
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <>
      <div className="navbar" />
      <p className="date-item">{date}</p>
      <div className="search-div">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={handleTyping}
          placeholder="Search"
        />
        <button className="search-button" onClick={handleSearch}>
          <img className="search-img" src={search_icon} alt="" />
        </button>
      </div>
      <button
        className="create-button"
        onClick={() => {
          navigate("/create-item");
        }}
      >
        Create New Customer
      </button>
      <p className="list-title">Today's business:</p>
      <ul>
        {filtered !== undefined ? (
          filtered.map((item) => (
            <li className="list-item" key={item.id}>
              <div className="item-name">
                <Item data={item} />
              </div>
              <div
                className="status"
                id="circle"
                style={{
                  backgroundColor:
                    item.status === "yellow"
                      ? "yellow"
                      : item.status === "green"
                      ? "green"
                      : item.status === "red"
                      ? "red"
                      : "white",
                }}
              />
              <div className="item-edit">
                <a href={`/edit/${item.name}`}>Edit</a>
              </div>
            </li>
          ))
        ) : (
          <li className="list-item">
            <div className="item-name">No items</div>
          </li>
        )}
      </ul>
      <ul className="footer">
        <li className="footer-item">
          <div>stuff</div>
        </li>
      </ul>
    </>
  );
}

export default Home;
