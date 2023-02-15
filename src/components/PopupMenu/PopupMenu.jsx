import React from "react";
import { Link } from "react-router-dom";

import Navigation from "../Navigation/Navigation";
import { mainNavBar, accountNavBar } from "../../utils/content";
import closeIcon from "../../images/closeIcon.svg";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function PopupMenu({ isOpen, onClose, loggedIn, onLogout }) {

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if (!isOpen) return;
    const closeByEscape = e => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, [isOpen, onClose]);

  const handleOverlay = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <section
      className={`popupMenu ${isOpen ? "popupMenu_opened" : ""}`}
      onClick={handleOverlay}
    >
      <dir className="popupMenu__container">
        <img
          className="popupMenu__close-button link-effect"
          src={closeIcon}
          alt="Close"
          onClick={onClose}
        />

        <Navigation mode="vertical-small" content={mainNavBar} onClose={onClose}></Navigation>

        {loggedIn ? (
          <div className="popupMenu__account">
            <p className="popupMenu__title">{currentUser.name}</p>
            <Navigation
              mode="vertical-small"
              content={accountNavBar}
              onClick={onClose}
            ></Navigation>
            <Link to="" className="popupMenu__item link-effect" onClick={onLogout}>
              Logout
            </Link>
          </div>
        ) : (
          <Link to="/login" className="popupMenu__item link-effect" onClick={onClose}>
            Login
          </Link>
        )}
      </dir>
    </section>
  );
}

export default PopupMenu;
