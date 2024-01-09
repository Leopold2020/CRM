import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Item from "../Components/Item";
import search_icon from "../Assets/search.png";

function Home() {
  const [search, setSearch] = useState("");
  // const [list, setList] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const date = new Date().toDateString();
  const navigate = useNavigate();

  // const getList = async () => {
  //   const res = await fetch("http://localhost:5000/company/all", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   return await res.json();
  // };

  const filterCompany = async (props) => {
    const res = await fetch("http://localhost:5000/company/filter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: props }),
    });
    return await res.json();
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
    // setList(getList());
    // setFiltered(list);
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
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <li className="list-item">
              <div className="item-name">
                {item.name}
                <Item data={item} />
              </div>
              <div
                className="status"
                id="circle"
                style={{
                  backgroundColor:
                    item.status[0] === "yellow"
                      ? "yellow"
                      : item.status[0] === "green"
                      ? "green"
                      : item.status[0] === "red"
                      ? "red"
                      : "white",
                }}
              />
              <button className="admin-button" onClick={() => {navigate("/edit-item")}}>
                Edit
              </button>
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
