import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import { mainNavBar, accountNavBar } from "../../utils/content";
import logoPath from "../../images/logo.png";
import navButton from "../../images/navTabButton.svg";

function Header(props) {

  return (
    <header className="header">
      <Link to="/" className="header__logo link-effect">
        <img className="header__logo" src={logoPath} alt="Logo" />
      </Link>
      <div className="header__links-container">
        {props.windowSize <= 768 ? (
          <>
            <span></span>
            <span></span>
            <img
              onClick={props.onClick}
              className="header__navBar-button link-effect"
              src={navButton}
              alt="Menu"
            />
          </>
        ) : (
          <>
            <Navigation content={mainNavBar}></Navigation>
            {props.loggedIn ? (
              <>
                <Navigation mode="orange" content={accountNavBar}></Navigation>
                <Link
                  to="/"
                  className="header__login-link link-effect"
                  onClick={props.onLogout}
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <span></span>
                <Link to="/login" className="header__login-link link-effect">
                  Login
                </Link>
              </>
            )}
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
