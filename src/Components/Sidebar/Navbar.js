import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const history = useNavigate();

  const logout = async () => {
    localStorage.removeItem('token');
    history('/login');
  }

  return (
    <header className="fixed-top fixed-top d-flex justify-content-between">
      <img
        src={require("../Assets/Media/Images/logo.png")}
        className="header-logo"
        alt="Rise Higher Education"
      />
      <ul className="header-navigation">
        <li className="hovicon effect-8">
          <a href="/">
            <img
              src={require("../Assets/Media/Images/avatar.png")}
              alt="avatar"
            />
          </a>
        </li>
        <li className="hovicon effect-8">
          <a href="/" onClick={logout}>
            <img
              src={require("../Assets/Media/Images/icon-logout.png")}
              width={30}
              alt="Logout"
            />
          </a>
        </li>
      </ul>
    </header>
  );
};

export default Navbar;
