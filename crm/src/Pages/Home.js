import './Home.css';

function Home() {
  // const getDate = async () => {
  //   await fetch("http://localhost:5000/get-date", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   return await response.json();
  // };

  return (
    <>
      <div classname="navbar">
        {/* <p classname="date">{getDate}</p> */}
        <p classname="list-title">Today's business:</p>
        {/* <ul>
          {list.map((item) => (
            <li classname="list-item">
              <p>{item.details}</p>
              <div
                id="circle"
                style={{
                  backgroundColor:
                    data.status[0] === "yellow"
                      ? "yellow"
                      : data.status[0] === "green"
                      ? "green"
                      : data.status[0] === "red"
                      ? "red"
                      : "white",
                }}
              />
              <button classname="admin-button">Edit</button>
            </li>
          ))}
        </ul> */}
      </div>
      <ul classname="footer">
        <li classname="footer-item">stuff</li>
      </ul>
    </>
  );
}

export default Home;