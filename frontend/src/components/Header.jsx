import React from "react";
import { Link } from "react-router-dom";
import desktopLogo from "./desktopLogo.png";
import "./Header.css";

const Header = () => {
  return (
    <header>
      {/*the logo links to the home page*/}
      <Link to="/"><img src={desktopLogo} alt="Punk Pad logo" className="logo" />
      </Link>
       <nav className = "buttons-container">
      <Link to= "/Signup" className="header-link primary-punk-btn">
      Create Account
      </Link>
      <Link to="/Login" className="header-link secondary-punk-btn">
      Log In
      </Link>
      <Link to= "/UserAccountPage" className="header-link primary-punk-btn">
      User
      </Link>
      </nav>
    </header>
  );
};

export default Header;
