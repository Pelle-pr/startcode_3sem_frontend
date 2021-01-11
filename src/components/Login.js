import React, { useState } from "react";
import apiFacade from "../facades/apiFacade";
import { Modal } from "react-bootstrap";
import printError from "../utils/error";
import { useLocation } from "react-router-dom";

export const Login = ({
  isLoggedIn,
  setLoginStatus,
  handleShowLogin,
  showLogin,
}) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  //If redirected from protected page
  const { state } = useLocation();
  const from = state ? state.from : "/";

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    apiFacade
      .login(user)
      .then((res) => setLoginStatus(!isLoggedIn, from))
      .catch((promise) => {
        if (promise.fullError) {
          printError(promise, setError);
        } else {
          setError("No response from API. Make sure it is running.");
        }
      });
  };

  return (
    <Modal show={showLogin} onHide={handleShowLogin}>
      <Modal.Header closeButton>
        <Modal.Title style={{ marginLeft: "44.5%" }}>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
          <label>Username</label>
          <br />
          <input
            onChange={handleChange}
            value={user.username}
            name="username"
          ></input>
          <br />
          <label>Password</label>
          <br />
          <input
            onChange={handleChange}
            type="password"
            value={user.password}
            name="password"
          ></input>
          <br />
          <br />
          <input
            type="submit"
            value="Log in"
            className="btn btn-secondary"
          ></input>
          <br />
          <br />
          <p style={{ color: "red" }}>{error}</p>
        </form>
      </Modal.Body>
    </Modal>
  );
};
