import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";

const CreateAccount = () => {
  const navigate = useNavigate();

  const [action, setAction] = useState("Sign Up");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const create = await fetch(
      `http://localhost:${process.env.REACT_APP_PORT || 5000}/account/create`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: name,
          email: email,
          password: password,
          role: role,
        }),
      }
    );

    const response = create.json();

    if (response.status === 200) alert("User Created");
    navigate("/admin");
  };

  const roleHandler = (event) => {
    setRole(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Login" ? (
          <div></div>
        ) : (
          <div className="input">
            <img src={user_icon} alt="" />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={handleNameChange}
            />
          </div>
        )}
        <div className="input">
          <img src={email_icon} alt="" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <div className="div-status">
          <select className="role" name="role" onChange={roleHandler}>
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {action === "Sign Up" ? (
          <div className="submit" onClick={handleSubmit}>
            Sign Up
          </div>
        ) : (
          <div
            className={action === "Sign up" ? "submit gray" : "submit"}
            onClick={() => {
              setAction("Sign Up");
            }}
          >
            Sign Up
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateAccount;
