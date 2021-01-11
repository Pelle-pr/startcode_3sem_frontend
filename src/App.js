import "./styles/Navbar.css";
import Header from "./components/Header";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import apiFacade from "./facades/apiFacade";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let history = useHistory();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleRegister = () => {
    setShowRegister(!showRegister);
  };

  const handleLogin = () => {
    setShowLogin(!showLogin);
  };

  const setLoginStatus = (status, pageToGoTo) => {
    setIsLoggedIn(status);
    history.push(pageToGoTo);
  };

  const logout = () => {
    apiFacade.logout();
    setLoginStatus(false);
    setShowLogin(false);
    setShowRegister(false);
  };

  return (
    <div className="App">
      <Header
        isLoggedIn={isLoggedIn}
        loginMsg={isLoggedIn ? "Log out" : "Login"}
        setLoginStatus={setLoginStatus}
        handleLogin={handleLogin}
        showLogin={showLogin}
        handleRegister={handleRegister}
        showRegister={showRegister}
        logout={logout}
      />
    </div>
  );
}
