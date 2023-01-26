import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import { mainNavBar, accountNavBar } from "../../utils/content";
import logoPath from "../../images/logo.png";
import navButton from "../../images/navTabButton.svg";

function Header(props) {
  const [windowSize, setwindowSize] = React.useState(window.innerWidth);

  React.useEffect(() => {
    var resizeTimer;
    window.onresize = function() {
      if (resizeTimer) {
        clearTimeout(resizeTimer);
      }
      resizeTimer = setTimeout(function() {
        setwindowSize(window.innerWidth);
      }, 200);
    };
  }, [windowSize]);

  return (
    <header className="header">
      <Link to="/" className="header__logo link-effect">
        <img className="header__logo" src={logoPath} alt="Logo" />
      </Link>
      <div className="header__links-container">
        {windowSize <= 768 ? (
          <img
            onClick={props.onClick}
            className="header__navBar-button link-effect"
            src={navButton}
            alt="Menu"
          />
        ) : (
          <>
            <Navigation content={mainNavBar}></Navigation>
            {props.loggedIn ? (
              <>
                <Navigation mode="orange" content={accountNavBar}></Navigation>
                <Link to="/" className="header__login-link link-effect" onClick={props.onLogout}>
                  Logout
                </Link>
              </>
            ) : (
              <Link to="/login" className="header__login-link link-effect">
                Login
              </Link>
            )}
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
