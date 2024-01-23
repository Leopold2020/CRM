import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Item from "../Components/Item";
import search_icon from "../Assets/search.png";

function Home({axiosJWT}) {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  const date = new Date().toDateString();
  const today = new Date().toISOString().slice(0, 10);
  const navigate = useNavigate();

  const filterCompany = async () => {
    try {
      return await axiosJWT.post(`http://localhost:${process.env.REACT_APP_PORT || 5000}/company/filter`, {
        name: search
      }, {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
        }
      }).then((res) => {

        if (res.status === 200) {
          return res.data;
        }
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
        }
      })
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
      <div className="date-display">
        <p className="date-item">{date}</p>
      </div>
      <div className="center">
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
            filtered.map((item) =>
              item.tocall.split("T")[0] === today ? (
                <li className="list-item" key={item.id}>
                  <div className="name-div">
                    <div className="item-name">
                      <Item data={item} />
                    </div>
                  </div>
                  <div className="rest-div">
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
                    <div className="home-date">{item.tocall.split("T")[0]}</div>
                    <button className="detail-but">
                      <a className="detail-but-text" href={`/company/details/${item.name}`}>Full Details</a>
                    </button>
                    <div className="item-edit">
                      <a
                        className="edit-text"
                        href={`/company/edit/${item.name}`}
                      >
                        Edit
                      </a>
                    </div>
                  </div>
                </li>
              ) : null
            )
          ) : (
            <li className="list-item">
              <div className="item-name">No items</div>
            </li>
          )}
        </ul>
        <p className="list-title">Upcoming business:</p>
        <ul>
          {filtered !== undefined ? (
            filtered.map((item) =>
              item.tocall.split("T")[0] > today ? (
                <li className="list-item" key={item.id}>
                  <div className="name-div">
                    <div className="item-name">
                      <Item data={item} />
                    </div>
                  </div>
                  <div className="rest-div">
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
                    <div className="home-date">{item.tocall.split("T")[0]}</div>
                    <button className="detail-but">
                      <a className="detail-but-text" href={`/company/details/${item.name}`}>Full Details</a>
                    </button>
                    <div className="item-edit">
                      <a
                        href={`/company/edit/${item.name}`}
                        className="edit-text"
                      >
                        Edit
                      </a>
                    </div>
                  </div>
                </li>
              ) : null
            )
          ) : (
            <li className="list-item">
              <div className="item-name">No items</div>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}

export default Home;
