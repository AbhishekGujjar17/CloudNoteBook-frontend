import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const { showAlert } = props;
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = credentials;

    const response = await fetch(
      `https://cloudnotebooks.herokuapp.com/api/auth/login`,
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ email, password }),
      }
    );

    const json = await response.json();
    // console.log(json);

    if (json.success) {
      localStorage.setItem("token", json.token);
      showAlert("Logged in Successfully", "success");
      navigate("/");
    } else {
      showAlert("Invalid Credentials", "danger");
    }
  };
  return (
    <div className="container my-3">
      <h2>Login to Use CloudBook</h2>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            onChange={handleChange}
            name="email"
            value={credentials.email}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={handleChange}
            name="password"
            value={credentials.password}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
