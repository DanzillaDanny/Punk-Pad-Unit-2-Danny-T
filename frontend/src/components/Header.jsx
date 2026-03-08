import React from "react";
import { Link } from "react-router-dom";
import desktopLogo from "./desktopLogo.png";
import "./Header.css";

const Header = ({ isLoggedIn, onLogout }) => {
  return (
    <header>
      {/*the logo links to the home page*/}
      <Link to="/"><img src={desktopLogo} alt="Punk Pad logo" className="logo" />
      </Link>
       <nav className="buttons-container">
      {isLoggedIn ? (
        <>
          <Link to="/UserAccountPage" className="header-link primary-punk-btn">
            Account
          </Link>
          <button onClick={onLogout} className="header-link secondary-punk-btn">
            Log Out
          </button>
        </>
      ) : (
        <>
          <Link to="/signup" className="header-link primary-punk-btn">
            Create Account
          </Link>
          <Link to="/login" className="header-link secondary-punk-btn">
            Log In
          </Link>
        </>
      )}
      </nav>
    </header>
  );
};

export default Header;
