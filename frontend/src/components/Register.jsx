import React, { useState } from "react";
import "./SignIn.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  //   const token = JSON.parse(localStorage.getItem("token")).access;

  const handleSubmit = () => {
    axios
      .post("http://127.0.0.1:8000/api/register/", { email, password, location })
      .then((res) => {
        console.log(res.data);
        navigate("/signin");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="sign-in-form">
      <h2>Register</h2>
      <div className="input-field">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="input-field">
        <label htmlFor="email">Location:</label>
        <input
          type="email"
          id="email"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>
      <div className="input-field">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <a style={{color:"blue", cursor: "pointer"}} onClick={() => navigate("/register")}>Sign In Here</a>
      
      <button onClick={handleSubmit}>Register</button>
    </div>
  );
}

export default RegisterForm;
