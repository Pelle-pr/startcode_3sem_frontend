import "./styles/Navbar.css";
import Header from "./components/Header";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let history = useHistory();

  const setLoginStatus = (status, pageToGoTo) => {
    setIsLoggedIn(status);
    history.push(pageToGoTo);
  };

  return (
    <div className="App">
      <Header
        isLoggedIn={isLoggedIn}
        loginMsg={isLoggedIn ? "Log out" : "Login"}
        setLoginStatus={setLoginStatus}
      />
    </div>
  );
}
