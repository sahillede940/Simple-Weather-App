import React, { useState } from "react";
import "./SignIn.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //   const token = JSON.parse(localStorage.getItem("token")).access;

  const handleSubmit = () => {
    axios
      .post("http://127.0.0.1:8000/api/signin/", { email, password })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", JSON.stringify(res.data.token));
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="sign-in-form">
      <h2>Sign In</h2>
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
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {/* new to website */}
      <a style={{color:"blue", cursor: "pointer"}} onClick={() => navigate("/register")}>Register Here</a>
      <button onClick={handleSubmit}>Sign In</button>
    </div>
  );
}

export default SignInForm;
